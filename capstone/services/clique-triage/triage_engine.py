#!/usr/bin/env python3
"""
Clique Triage Engine — heuristic core + hybrid RAG retrieval.

Reads isolated build errors, RAG-indexed external evidence, and recent git
activity; prunes noise, ranks investigation leads, and writes a pre-sorted
workspace payload for downstream UI rendering.

RAG layer: BM25 + TF-IDF + reciprocal rank fusion over mock_internet/rag_corpus.json
Git/elimination rules remain deterministic guardrails on top of retrieval.
"""

from __future__ import annotations

import json
import re
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

from rag.retriever import HybridRetriever, RetrievalHit, build_rag_query

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
MOCK_INTERNET_DIR = BASE_DIR / "mock_internet"

ISOLATED_ERROR_PATH = DATA_DIR / "isolated_error.json"
EXTERNAL_EVIDENCE_PATH = MOCK_INTERNET_DIR / "external_evidence.json"
RAG_CORPUS_PATH = MOCK_INTERNET_DIR / "rag_corpus.json"
FAILED_BUILD_LOG_PATH = DATA_DIR / "failed_build.log"
GIT_LOG_FIXTURE_PATH = DATA_DIR / "git_log_fixture.json"
OUTPUT_PATH = DATA_DIR / "investigation_workspace.json"

TEMPORAL_PROXIMITY_HOURS = 6
RAG_TOP_K = 6

ELIMINATED_EXTENSIONS = {".css", ".md"}
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico", ".bmp", ".tiff"}

TRACE_FILE_PATTERN = re.compile(
    r'File "([^"]+)", line (\d+)',
)
BUILD_FAILURE_TIMESTAMP_PATTERN = re.compile(
    r"\[CRITICAL\]\s+(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)",
)

DEMO_SCENARIO_FILES = {
    "payment_gateway.py",
    "checkout.css",
    "README.md",
}


def load_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def write_json(path: Path, payload: dict[str, Any]) -> None:
    with path.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, indent=2)
        handle.write("\n")


def parse_iso_timestamp(value: str) -> datetime:
    normalized = value.replace("Z", "+00:00")
    parsed = datetime.fromisoformat(normalized)
    if parsed.tzinfo is None:
        return parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def extract_build_failure_timestamp() -> str:
    if FAILED_BUILD_LOG_PATH.exists():
        log_text = FAILED_BUILD_LOG_PATH.read_text(encoding="utf-8")
        match = BUILD_FAILURE_TIMESTAMP_PATTERN.search(log_text)
        if match:
            return match.group(1)

    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def extract_traceback_source_leads(isolated_error: dict[str, Any]) -> list[dict[str, Any]]:
    traceback_text = isolated_error.get("traceback", "")
    leads: list[dict[str, Any]] = []
    seen_files: set[str] = set()

    for match in TRACE_FILE_PATTERN.finditer(traceback_text):
        full_path = match.group(1)
        line_number = int(match.group(2))
        file_name = Path(full_path).name

        if file_name in seen_files:
            continue
        seen_files.add(file_name)

        leads.append(
            {
                "type": "source_file",
                "strength": "high",
                "reason": "present in isolated exception traceback",
                "file": file_name,
                "path": full_path,
                "line": line_number,
            }
        )

    return leads


def score_community_issues(
    isolated_error: dict[str, Any],
    external_evidence: dict[str, Any],
) -> list[dict[str, Any]]:
    exception_text = isolated_error.get("exception", "")
    traceback_text = isolated_error.get("traceback", "")
    combined_error_text = f"{exception_text}\n{traceback_text}".lower()

    priority_leads: list[dict[str, Any]] = []

    for issue in external_evidence.get("community_issues", []):
        needle = issue.get("traceback_contains", "")
        if not needle:
            continue

        if needle.lower() in combined_error_text:
            priority_leads.append(
                {
                    "type": "community_issue",
                    "strength": "high",
                    "reason": "traceback overlap",
                    "issue_id": issue.get("issue_id"),
                    "title": issue.get("title"),
                    "timestamp": issue.get("timestamp"),
                    "url": issue.get("url"),
                    "traceback_match": needle,
                }
            )

    return priority_leads


def release_within_temporal_window(
    release_timestamp: str,
    build_failure_timestamp: str,
) -> tuple[bool, float | None]:
    failure_time = parse_iso_timestamp(build_failure_timestamp)
    window_start = failure_time - timedelta(hours=TEMPORAL_PROXIMITY_HOURS)
    release_time = parse_iso_timestamp(release_timestamp)

    if release_time < window_start or release_time > failure_time:
        return False, None

    delta = failure_time - release_time
    return True, round(delta.total_seconds() / 3600, 2)


def leads_from_rag_hits(
    hits: list[RetrievalHit],
    build_failure_timestamp: str,
) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    community_leads: list[dict[str, Any]] = []
    release_leads: list[dict[str, Any]] = []

    for hit in hits:
        if hit.source_type == "noise":
            continue

        if hit.source_type == "community_issue":
            community_leads.append(
                {
                    "type": "community_issue",
                    "strength": "high",
                    "reason": f"RAG hybrid retrieval (RRF={hit.rrf_score})",
                    "issue_id": hit.metadata.get("issue_id"),
                    "title": hit.metadata.get("title", hit.snippet),
                    "timestamp": hit.metadata.get("timestamp"),
                    "url": hit.metadata.get("url"),
                    "traceback_match": hit.snippet,
                    "rag_doc_id": hit.doc_id,
                    "rag_score": hit.rrf_score,
                }
            )
            continue

        if hit.source_type == "package_release":
            release_ts = hit.metadata.get("timestamp", "")
            in_window, hours_before = release_within_temporal_window(release_ts, build_failure_timestamp)
            if not in_window:
                continue

            release_leads.append(
                {
                    "type": "package_release",
                    "strength": "high",
                    "reason": f"RAG hybrid retrieval + temporal proximity (RRF={hit.rrf_score})",
                    "package": hit.metadata.get("package"),
                    "version": hit.metadata.get("version"),
                    "released_at": release_ts,
                    "changes": hit.snippet,
                    "hours_before_failure": hours_before,
                    "rag_doc_id": hit.doc_id,
                    "rag_score": hit.rrf_score,
                }
            )

    return community_leads, release_leads


def run_rag_retrieval(isolated_error: dict[str, Any]) -> tuple[list[RetrievalHit], str]:
    retriever = HybridRetriever.from_corpus_file(RAG_CORPUS_PATH)
    query = build_rag_query(isolated_error)
    hits = retriever.search(query, top_k=RAG_TOP_K)
    return hits, query


def rag_hits_to_payload(hits: list[RetrievalHit], query: str) -> dict[str, Any]:
    return {
        "query": query,
        "method": "hybrid_bm25_tfidf_rrf",
        "top_k": RAG_TOP_K,
        "hits": [
            {
                "doc_id": hit.doc_id,
                "source_type": hit.source_type,
                "rrf_score": hit.rrf_score,
                "bm25_rank": hit.bm25_rank,
                "tfidf_rank": hit.tfidf_rank,
                "snippet": hit.snippet,
            }
            for hit in hits
        ],
    }


def score_package_releases(
    build_failure_timestamp: str,
    external_evidence: dict[str, Any],
) -> list[dict[str, Any]]:
    failure_time = parse_iso_timestamp(build_failure_timestamp)
    window_start = failure_time - timedelta(hours=TEMPORAL_PROXIMITY_HOURS)

    priority_leads: list[dict[str, Any]] = []

    for release in external_evidence.get("public_releases", []):
        release_time = parse_iso_timestamp(release.get("timestamp", ""))
        if release_time < window_start or release_time > failure_time:
            continue

        delta = failure_time - release_time
        hours_before_failure = round(delta.total_seconds() / 3600, 2)

        priority_leads.append(
            {
                "type": "package_release",
                "strength": "high",
                "reason": "temporal proximity",
                "package": release.get("package"),
                "version": release.get("version"),
                "released_at": release.get("timestamp"),
                "changes": release.get("changes"),
                "hours_before_failure": hours_before_failure,
            }
        )

    return priority_leads


def is_eliminated_file(file_path: str) -> bool:
    suffix = Path(file_path).suffix.lower()
    if suffix in ELIMINATED_EXTENSIONS:
        return True
    if suffix in IMAGE_EXTENSIONS:
        return True
    return False


def elimination_reason_for_file(file_path: str) -> str:
    suffix = Path(file_path).suffix.lower()
    if suffix == ".css":
        return "non-functional asset (.css)"
    if suffix == ".md":
        return "non-functional asset (.md)"
    if suffix in IMAGE_EXTENSIONS:
        return f"non-functional asset ({suffix})"
    return "non-functional asset"


def parse_git_log_output(raw_output: str) -> list[dict[str, Any]]:
    commits: list[dict[str, Any]] = []
    current_commit: dict[str, Any] | None = None

    for line in raw_output.splitlines():
        stripped = line.strip()
        if not stripped:
            continue

        if "|" in stripped and not stripped.startswith(" "):
            parts = stripped.split("|", 4)
            if len(parts) == 5:
                commit_hash, author_name, author_email, subject, commit_date = parts
                current_commit = {
                    "hash": commit_hash,
                    "author": author_email or author_name,
                    "date": commit_date,
                    "subject": subject,
                    "files": [],
                }
                commits.append(current_commit)
                continue

        if current_commit is not None:
            current_commit["files"].append(stripped)

    return commits


def load_git_commits_from_subprocess() -> list[dict[str, Any]] | None:
    try:
        completed = subprocess.run(
            [
                "git",
                "log",
                "-n",
                "5",
                "--pretty=format:%H|%an|%ae|%s|%aI",
                "--name-only",
            ],
            check=True,
            capture_output=True,
            text=True,
            cwd=BASE_DIR,
        )
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None

    commits = parse_git_log_output(completed.stdout)
    if not commits:
        return None

    return commits


def load_git_commits_from_fixture() -> list[dict[str, Any]]:
    fixture = load_json(GIT_LOG_FIXTURE_PATH)
    return fixture.get("commits", [])


def commits_cover_demo_scenario(commits: list[dict[str, Any]]) -> bool:
    observed_files: set[str] = set()
    for commit in commits:
        for file_path in commit.get("files", []):
            observed_files.add(Path(file_path).name)

    return DEMO_SCENARIO_FILES.issubset(observed_files)


def load_git_commits() -> tuple[list[dict[str, Any]], str]:
    subprocess_commits = load_git_commits_from_subprocess()
    if subprocess_commits and commits_cover_demo_scenario(subprocess_commits):
        return subprocess_commits, "git_subprocess"

    fixture_commits = load_git_commits_from_fixture()
    return fixture_commits, "git_log_fixture"


def classify_git_commits(
    commits: list[dict[str, Any]],
) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    repository_leads: list[dict[str, Any]] = []
    discarded: list[dict[str, Any]] = []

    for commit in commits:
        files = commit.get("files", [])
        eliminated_files = [file_path for file_path in files if is_eliminated_file(file_path)]

        if eliminated_files:
            primary_reason = elimination_reason_for_file(eliminated_files[0])
            discarded.append(
                {
                    "commit": commit.get("hash"),
                    "subject": commit.get("subject"),
                    "author": commit.get("author"),
                    "date": commit.get("date"),
                    "files": eliminated_files,
                    "reason": primary_reason,
                }
            )
            continue

        active_files = [file_path for file_path in files if not is_eliminated_file(file_path)]
        if not active_files:
            continue

        repository_leads.append(
            {
                "type": "repository_commit",
                "strength": "medium",
                "reason": "recent functional code change",
                "commit": commit.get("hash"),
                "subject": commit.get("subject"),
                "author": commit.get("author"),
                "date": commit.get("date"),
                "files": active_files,
            }
        )

    return repository_leads, discarded


def merge_priority_leads(*lead_groups: list[dict[str, Any]]) -> list[dict[str, Any]]:
    merged: list[dict[str, Any]] = []
    seen_keys: set[str] = set()

    for group in lead_groups:
        for lead in group:
            if lead.get("type") == "source_file":
                dedupe_key = f"source_file:{lead.get('file')}"
            elif lead.get("type") == "community_issue":
                dedupe_key = f"community_issue:{lead.get('issue_id')}"
            elif lead.get("type") == "package_release":
                dedupe_key = f"package_release:{lead.get('package')}:{lead.get('version')}"
            elif lead.get("type") == "repository_commit":
                dedupe_key = f"repository_commit:{lead.get('commit')}"
            else:
                dedupe_key = json.dumps(lead, sort_keys=True)

            if dedupe_key in seen_keys:
                continue
            seen_keys.add(dedupe_key)
            merged.append(lead)

    strength_rank = {"high": 0, "medium": 1, "low": 2}
    merged.sort(key=lambda item: strength_rank.get(item.get("strength", "low"), 99))
    return merged


def build_investigation_workspace() -> dict[str, Any]:
    isolated_error = load_json(ISOLATED_ERROR_PATH)
    external_evidence = load_json(EXTERNAL_EVIDENCE_PATH)

    build_failure_timestamp = extract_build_failure_timestamp()

    rag_hits, rag_query = run_rag_retrieval(isolated_error)
    rag_community_leads, rag_release_leads = leads_from_rag_hits(rag_hits, build_failure_timestamp)

    traceback_leads = extract_traceback_source_leads(isolated_error)
    community_leads = score_community_issues(isolated_error, external_evidence)
    release_leads = score_package_releases(build_failure_timestamp, external_evidence)

    git_commits, git_source = load_git_commits()
    repository_leads, discarded = classify_git_commits(git_commits)

    priority_leads = merge_priority_leads(
        traceback_leads,
        rag_community_leads,
        rag_release_leads,
        community_leads,
        release_leads,
        repository_leads,
    )

    return {
        "build_failure_timestamp": build_failure_timestamp,
        "isolated_exception": isolated_error.get("exception"),
        "isolated_service": isolated_error.get("service"),
        "git_source": git_source,
        "rag_retrieval": rag_hits_to_payload(rag_hits, rag_query),
        "priority_leads": priority_leads,
        "discarded": discarded,
    }


def main() -> int:
    missing_paths = [
        path
        for path in (
            ISOLATED_ERROR_PATH,
            EXTERNAL_EVIDENCE_PATH,
            RAG_CORPUS_PATH,
            FAILED_BUILD_LOG_PATH,
            GIT_LOG_FIXTURE_PATH,
        )
        if not path.exists()
    ]
    if missing_paths:
        for path in missing_paths:
            print(f"Missing required input: {path}", file=sys.stderr)
        return 1

    workspace = build_investigation_workspace()
    write_json(OUTPUT_PATH, workspace)

    print(
        "✓ Triage engine complete. "
        f"RAG retrieved {len(workspace['rag_retrieval']['hits'])} chunks; "
        f"ranked {len(workspace['priority_leads'])} priority leads and "
        f"discarded {len(workspace['discarded'])} non-functional commit signals."
    )
    print(f"✓ Investigation workspace saved to {OUTPUT_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
