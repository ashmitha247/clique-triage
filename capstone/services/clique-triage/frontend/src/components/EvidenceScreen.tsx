import { motion } from "framer-motion";
import type { MatchSignal } from "../types/workspace";
import { MatchSignals } from "./MatchSignals";

interface EvidenceScreenProps {
  signals: MatchSignal[];
}

export function EvidenceScreen({ signals }: EvidenceScreenProps) {
  return (
    <div className="focus-screen">
      <motion.div
        className="evidence-card phase-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="focus-label">Why we think this</div>
        <MatchSignals signals={signals} />
      </motion.div>
    </div>
  );
}
