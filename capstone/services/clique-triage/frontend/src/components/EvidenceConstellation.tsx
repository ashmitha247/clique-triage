import { motion } from "framer-motion";
import type { ConstellationEdge, ConstellationNode } from "../types/workspace";

interface EvidenceConstellationProps {
  nodes: ConstellationNode[];
  edges: ConstellationEdge[];
  revealOrder: string[];
  visibleNodeCount: number;
  focusNodeId: string;
  focused: boolean;
  primaryLeadLabel: string;
}

function nodeById(nodes: ConstellationNode[], id: string) {
  return nodes.find((node) => node.id === id);
}

export function EvidenceConstellation({
  nodes,
  edges,
  revealOrder,
  visibleNodeCount,
  focusNodeId,
  focused,
  primaryLeadLabel,
}: EvidenceConstellationProps) {
  const visibleIds = new Set(revealOrder.slice(0, visibleNodeCount));

  return (
    <div className="constellation-view phase-card">
      <div className="session-label">Connecting signals</div>

      <svg className="constellation-svg" viewBox="0 0 400 320" aria-hidden>
        {edges.map((edge) => {
          const from = nodeById(nodes, edge.from);
          const to = nodeById(nodes, edge.to);
          if (!from || !to) return null;
          const visible = visibleIds.has(edge.from) && visibleIds.has(edge.to);
          if (!visible) return null;

          return (
            <motion.line
              key={`${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="rgba(161, 161, 170, 0.45)"
              strokeWidth="1.5"
              strokeDasharray="120"
              initial={{ strokeDashoffset: 120, opacity: 0 }}
              animate={{ strokeDashoffset: 0, opacity: 1 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            />
          );
        })}

        {nodes.map((node) => {
          const visible = visibleIds.has(node.id);
          if (!visible) return null;

          const isFocus = node.id === focusNodeId;
          const dimmed = focused && !isFocus;

          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <motion.circle
                r={isFocus && focused ? 10 : 7}
                fill={isFocus && focused ? "rgba(251, 191, 36, 0.9)" : "rgba(161, 161, 170, 0.7)"}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: dimmed ? 0.35 : 1,
                }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                style={
                  isFocus && focused
                    ? { filter: "drop-shadow(0 0 14px rgba(251, 191, 36, 0.65))" }
                    : undefined
                }
              />
              <motion.text
                y={-16}
                textAnchor="middle"
                className="constellation-node-label"
                initial={{ opacity: 0 }}
                animate={{ opacity: dimmed ? 0.35 : 0.9 }}
                transition={{ delay: 0.25, duration: 0.45 }}
              >
                {node.label}
              </motion.text>
              {node.sublabel && (
                <motion.text
                  y={24}
                  textAnchor="middle"
                  className="constellation-node-sub"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: dimmed ? 0.25 : 0.6 }}
                  transition={{ delay: 0.35, duration: 0.45 }}
                >
                  {node.sublabel}
                </motion.text>
              )}
            </g>
          );
        })}
      </svg>

      {focused && (
        <motion.div
          className="constellation-focus-label phase-card-inset"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {primaryLeadLabel}
        </motion.div>
      )}
    </div>
  );
}
