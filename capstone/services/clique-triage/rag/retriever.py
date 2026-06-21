"""
Hybrid RAG retriever — Hoopla-style pipeline adapted for incident evidence.

  1. Chunk corpus (release notes, issue bodies, commit context, decoy noise)
  2. BM25 keyword retrieval (pure Python — no numpy)
  3. TF-IDF cosine similarity
  4. Reciprocal Rank Fusion (RRF) to merge rankings
"""

from __future__ import annotations

import json
import math
import re
from collections import Counter
from dataclasses import dataclass
from pathlib import Path
from typing import Any

TOKEN_PATTERN = re.compile(r"[a-zA-Z_][a-zA-Z0-9_]*|\d+\.\d+\.\d+")


def tokenize(text: str) -> list[str]:
    return [token.lower() for token in TOKEN_PATTERN.findall(text)]


@dataclass(frozen=True)
class CorpusDocument:
    doc_id: str
    source_type: str
    text: str
    metadata: dict[str, Any]


@dataclass(frozen=True)
class RetrievalHit:
    doc_id: str
    source_type: str
    rrf_score: float
    bm25_rank: int
    tfidf_rank: int
    snippet: str
    metadata: dict[str, Any]


class BM25Index:
    """Okapi BM25 without external dependencies."""

    def __init__(self, tokenized_corpus: list[list[str]], k1: float = 1.5, b: float = 0.75) -> None:
        self.k1 = k1
        self.b = b
        self.corpus = tokenized_corpus
        self.doc_count = len(tokenized_corpus)
        self.avg_doc_len = sum(len(doc) for doc in tokenized_corpus) / max(self.doc_count, 1)
        self.doc_freqs: Counter[str] = Counter()
        self.doc_lens = [len(doc) for doc in tokenized_corpus]

        for doc in tokenized_corpus:
            for term in set(doc):
                self.doc_freqs[term] += 1

    def _idf(self, term: str) -> float:
        freq = self.doc_freqs.get(term, 0)
        return math.log(1 + (self.doc_count - freq + 0.5) / (freq + 0.5))

    def score(self, query_tokens: list[str]) -> list[float]:
        scores = [0.0] * self.doc_count
        query_terms = Counter(query_tokens)

        for term, q_freq in query_terms.items():
            if term not in self.doc_freqs:
                continue

            idf = self._idf(term)
            for doc_index, doc in enumerate(self.corpus):
                term_freq = doc.count(term)
                if term_freq == 0:
                    continue

                doc_len = self.doc_lens[doc_index]
                numerator = term_freq * (self.k1 + 1)
                denominator = term_freq + self.k1 * (1 - self.b + self.b * doc_len / self.avg_doc_len)
                scores[doc_index] += idf * (numerator / denominator) * q_freq

        return scores


class TfidfIndex:
    """TF-IDF vectors with cosine similarity — pure Python."""

    def __init__(self, documents: list[str]) -> None:
        self.doc_count = len(documents)
        self.tokenized = [tokenize(doc) for doc in documents]
        self.doc_freqs: Counter[str] = Counter()

        for doc in self.tokenized:
            for term in set(doc):
                self.doc_freqs[term] += 1

        self.vectors = [self._vector(doc) for doc in self.tokenized]

    def _idf(self, term: str) -> float:
        freq = self.doc_freqs.get(term, 0)
        return math.log((self.doc_count + 1) / (freq + 1)) + 1

    def _vector(self, tokens: list[str]) -> dict[str, float]:
        counts = Counter(tokens)
        length = len(tokens) or 1
        return {term: (count / length) * self._idf(term) for term, count in counts.items()}

    @staticmethod
    def _cosine(a: dict[str, float], b: dict[str, float]) -> float:
        if not a or not b:
            return 0.0

        shared = set(a) & set(b)
        dot = sum(a[term] * b[term] for term in shared)
        norm_a = math.sqrt(sum(value * value for value in a.values()))
        norm_b = math.sqrt(sum(value * value for value in b.values()))
        if norm_a == 0 or norm_b == 0:
            return 0.0
        return dot / (norm_a * norm_b)

    def score(self, query_text: str) -> list[float]:
        query_vec = self._vector(tokenize(query_text))
        return [self._cosine(query_vec, doc_vec) for doc_vec in self.vectors]


class HybridRetriever:
    """BM25 + TF-IDF hybrid search with reciprocal rank fusion."""

    RRF_K = 60

    def __init__(self, documents: list[CorpusDocument]) -> None:
        if not documents:
            raise ValueError("RAG corpus must contain at least one document")

        self.documents = documents
        texts = [doc.text for doc in documents]
        self.tokenized_corpus = [tokenize(text) for text in texts]
        self.bm25 = BM25Index(self.tokenized_corpus)
        self.tfidf = TfidfIndex(texts)

    @classmethod
    def from_corpus_file(cls, path: Path) -> HybridRetriever:
        payload = json.loads(path.read_text(encoding="utf-8"))
        documents: list[CorpusDocument] = []

        for entry in payload.get("documents", []):
            metadata = {key: value for key, value in entry.items() if key not in {"doc_id", "source_type", "text"}}
            documents.append(
                CorpusDocument(
                    doc_id=entry["doc_id"],
                    source_type=entry.get("source_type", "unknown"),
                    text=entry["text"],
                    metadata=metadata,
                )
            )

        return cls(documents)

    @staticmethod
    def _rank_scores(scores: list[float]) -> list[tuple[int, float]]:
        return sorted(enumerate(scores), key=lambda item: item[1], reverse=True)

    @staticmethod
    def _rrf_merge(
        bm25_ranked: list[tuple[int, float]],
        tfidf_ranked: list[tuple[int, float]],
        k: int,
    ) -> dict[int, tuple[float, int, int]]:
        fused: dict[int, tuple[float, int, int]] = {}

        for rank, (doc_index, _score) in enumerate(bm25_ranked, start=1):
            previous = fused.get(doc_index, (0.0, 0, 0))
            fused[doc_index] = (previous[0] + 1.0 / (k + rank), rank, previous[2])

        for rank, (doc_index, _score) in enumerate(tfidf_ranked, start=1):
            previous = fused.get(doc_index, (0.0, 0, 0))
            fused[doc_index] = (previous[0] + 1.0 / (k + rank), previous[1], rank)

        return fused

    def search(self, query_text: str, top_k: int = 5) -> list[RetrievalHit]:
        query_tokens = tokenize(query_text)
        if not query_tokens:
            return []

        bm25_ranked = self._rank_scores(self.bm25.score(query_tokens))
        tfidf_ranked = self._rank_scores(self.tfidf.score(query_text))
        fused = self._rrf_merge(bm25_ranked, tfidf_ranked, self.RRF_K)

        ordered = sorted(fused.items(), key=lambda item: item[1][0], reverse=True)[:top_k]
        hits: list[RetrievalHit] = []

        for doc_index, (rrf_score, bm25_rank, tfidf_rank) in ordered:
            doc = self.documents[doc_index]
            snippet = doc.text[:160].replace("\n", " ")
            if len(doc.text) > 160:
                snippet += "…"

            hits.append(
                RetrievalHit(
                    doc_id=doc.doc_id,
                    source_type=doc.source_type,
                    rrf_score=round(rrf_score, 6),
                    bm25_rank=bm25_rank,
                    tfidf_rank=tfidf_rank,
                    snippet=snippet,
                    metadata=doc.metadata,
                )
            )

        return hits


def build_rag_query(isolated_error: dict[str, Any]) -> str:
    """Expand traceback + exception into a retrieval query."""
    exception = isolated_error.get("exception", "")
    traceback = isolated_error.get("traceback", "")
    service = isolated_error.get("service", "")

    tokens: list[str] = [exception, traceback, service]

    for match in re.finditer(r"site-packages/([^/]+)/", traceback):
        tokens.append(match.group(1))

    for match in re.finditer(r"(\w+\.py)", traceback):
        tokens.append(match.group(1))

    return " ".join(tokens)
