import { motion } from "framer-motion";
import type { InvestigationLead } from "../types/workspace";

interface VerdictScreenProps {
  lead: InvestigationLead;
  primaryLeadUrl?: string;
}

export function VerdictScreen({ lead, primaryLeadUrl }: VerdictScreenProps) {
  return (
    <div className="focus-screen">
      <motion.div
        className="verdict-card phase-card verdict-glow"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="focus-label">Most likely investigation lead</div>
        <div className="verdict-headline">{lead.primary}</div>

        <div className="verdict-supporting-block">
          <div className="verdict-supporting-label">Supporting evidence</div>
          <ul className="verdict-supporting-list">
            {lead.supporting.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {primaryLeadUrl && (
          <a className="cause-link" href={primaryLeadUrl} target="_blank" rel="noreferrer">
            View community report →
          </a>
        )}
      </motion.div>
    </div>
  );
}
