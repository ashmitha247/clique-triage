import { AnimatePresence, motion } from "framer-motion";
import type { EliminatedItem } from "../types/workspace";

interface EliminationSequenceProps {
  items: EliminatedItem[];
  activeIndex: number;
}

export function EliminationSequence({ items, activeIndex }: EliminationSequenceProps) {
  const item = items[activeIndex];
  if (!item) return null;

  const isDeprioritized = item.status === "deprioritized";

  return (
    <div className="elimination-stage">
      <AnimatePresence mode="wait">
        <motion.div
          key={item.name}
          className="elimination-card phase-card"
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -16 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="elimination-label">Evaluating candidate</div>

          <div className="elimination-target-wrap">
            <motion.span
              className="elimination-filename"
              initial={{ opacity: 1 }}
              animate={{ opacity: isDeprioritized ? 0.55 : 0.9 }}
              transition={{ delay: 1.4, duration: 0.45 }}
            >
              {item.name}
            </motion.span>
            {!isDeprioritized && (
              <motion.svg
                className="elimination-slash"
                viewBox="0 0 200 40"
                preserveAspectRatio="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.2 }}
              >
                <motion.line
                  x1="0"
                  y1="38"
                  x2="200"
                  y2="2"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray="280"
                  initial={{ strokeDashoffset: 280, opacity: 0 }}
                  animate={{ strokeDashoffset: 0, opacity: 0.9 }}
                  transition={{ delay: 1.35, duration: 0.55, ease: "easeOut" }}
                />
              </motion.svg>
            )}
          </div>

          <motion.div
            className={`elimination-verdict slide-verdict${isDeprioritized ? " verdict-deprioritized" : " verdict-eliminated"}`}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: isDeprioritized ? 2.4 : 2.0, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {isDeprioritized ? "DEPRIORITIZED" : "ELIMINATED"}
          </motion.div>

          <motion.div
            className="elimination-reason-block"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isDeprioritized ? 2.65 : 2.25, duration: 0.45 }}
          >
            <span className="elimination-reason-label">Reason</span>
            <span className="elimination-reason-text">{item.reason}</span>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="elimination-progress">
        {items.map((entry, index) => (
          <span
            key={entry.name}
            className={`elimination-dot${index < activeIndex ? " dot-done" : ""}${index === activeIndex ? " dot-active" : ""}`}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}
