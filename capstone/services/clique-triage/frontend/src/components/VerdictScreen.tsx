import { motion } from "framer-motion";
import type { LikelyCause } from "../types/workspace";

interface VerdictScreenProps {
  cause: LikelyCause;
  primaryLeadLabel: string;
  primaryLeadUrl?: string;
}

export function VerdictScreen({ cause, primaryLeadLabel, primaryLeadUrl }: VerdictScreenProps) {
  return (
    <div className="focus-screen">
      <motion.div
        className="verdict-card phase-card verdict-glow"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="focus-label">Root Cause Candidate</div>
        <div className="verdict-headline">{cause.headline}</div>
        <div className="verdict-detail">{cause.detail}</div>
        <div className="verdict-linked">{primaryLeadLabel}</div>
        {primaryLeadUrl && (
          <a className="cause-link" href={primaryLeadUrl} target="_blank" rel="noreferrer">
            View community report →
          </a>
        )}
      </motion.div>
    </div>
  );
}
