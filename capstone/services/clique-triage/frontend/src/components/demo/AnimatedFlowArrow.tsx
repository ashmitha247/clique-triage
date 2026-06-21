import { motion } from "framer-motion";

interface AnimatedFlowArrowProps {
  direction?: "vertical" | "horizontal";
  delay?: number;
}

export function AnimatedFlowArrow({ direction = "vertical", delay = 0 }: AnimatedFlowArrowProps) {
  if (direction === "horizontal") {
    return (
      <motion.span
        className="animated-flow-arrow animated-flow-arrow-horizontal"
        aria-hidden
        initial={{ opacity: 0.3, x: -4 }}
        animate={{ opacity: [0.35, 1, 0.35], x: [0, 4, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay }}
      >
        →
      </motion.span>
    );
  }

  return (
    <div className="today-flow-connector animated-flow-connector" aria-hidden>
      <span className="today-flow-line" />
      <motion.span
        className="today-flow-arrow animated-flow-arrow"
        initial={{ opacity: 0.4, y: -2 }}
        animate={{ opacity: [0.4, 1, 0.4], y: [0, 3, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay }}
      >
        ▼
      </motion.span>
    </div>
  );
}
