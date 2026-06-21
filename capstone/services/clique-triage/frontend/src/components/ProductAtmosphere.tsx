import { motion } from "framer-motion";

const ARROWS = [
  { x: "8%", y: "12%", rotate: 25, delay: 0 },
  { x: "88%", y: "18%", rotate: -140, delay: 0.4 },
  { x: "92%", y: "72%", rotate: -30, delay: 0.8 },
  { x: "6%", y: "78%", rotate: 155, delay: 1.2 },
];

export function ProductAtmosphere() {
  return (
    <div className="product-atmosphere" aria-hidden>
      <div className="product-atmosphere-grid" />
      {ARROWS.map((arrow) => (
        <motion.span
          key={`${arrow.x}-${arrow.y}`}
          className="product-atmosphere-arrow"
          style={{ left: arrow.x, top: arrow.y, rotate: `${arrow.rotate}deg` }}
          initial={{ opacity: 0.15 }}
          animate={{ opacity: [0.12, 0.45, 0.12], x: [0, 6, 0], y: [0, -4, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: arrow.delay }}
        >
          →
        </motion.span>
      ))}
    </div>
  );
}
