import { motion } from "framer-motion";
import type { EcosystemCard } from "../types/workspace";

interface EcosystemEvidencePhaseProps {
  cards: EcosystemCard[];
  visibleCount: number;
}

const KIND_LABEL: Record<EcosystemCard["kind"], string> = {
  release: "Release Notes",
  issue: "GitHub Issue",
  community: "Community Signal",
  rag: "Hybrid RAG Hit",
};

export function EcosystemEvidencePhase({ cards, visibleCount }: EcosystemEvidencePhaseProps) {
  const visible = cards.slice(0, visibleCount);

  return (
    <div className="focus-screen">
      <motion.div
        className="focus-status"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Running hybrid RAG retrieval (BM25 + TF-IDF)…
      </motion.div>

      <div className="ecosystem-stack">
        {visible.map((card) => (
          <motion.div
            key={card.id}
            className="ecosystem-card phase-card"
            initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ecosystem-kind">{KIND_LABEL[card.kind]}</div>
            <div className="ecosystem-title">{card.title}</div>
            <div className="ecosystem-detail">{card.detail}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
