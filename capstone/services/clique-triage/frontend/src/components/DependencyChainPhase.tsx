import { motion } from "framer-motion";
import type { DependencyLink } from "../types/workspace";

interface DependencyChainPhaseProps {
  chain: DependencyLink[];
  visibleCount: number;
}

export function DependencyChainPhase({ chain, visibleCount }: DependencyChainPhaseProps) {
  const visible = chain.slice(0, visibleCount);

  return (
    <div className="focus-screen">
      <motion.div
        className="focus-status"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Searching dependency graph…
      </motion.div>

      <div className="dependency-chain">
        {visible.map((link, index) => (
          <motion.div
            key={link.id}
            className="dependency-link-wrap"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {index > 0 && (
              <motion.span
                className="dependency-arrow"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.35 }}
                aria-hidden
              >
                ↓
              </motion.span>
            )}
            <motion.div
              className="dependency-node phase-card-inset"
              animate={
                index === visible.length - 1
                  ? {
                      boxShadow: [
                        "0 0 0 rgba(99, 102, 241, 0)",
                        "0 0 20px rgba(99, 102, 241, 0.2)",
                        "0 0 0 rgba(99, 102, 241, 0)",
                      ],
                    }
                  : undefined
              }
              transition={{ duration: 1.2, repeat: index === visible.length - 1 ? 1 : 0 }}
            >
              {link.label}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
