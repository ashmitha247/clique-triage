import { motion } from "framer-motion";
import type { MatchSignal } from "../types/workspace";

interface MatchSignalsProps {
  signals: MatchSignal[];
  visible?: boolean;
}

function SignalBar({ filled, total }: { filled: number; total: number }) {
  const blocks = Array.from({ length: total }, (_, i) => (
    <span key={i} className={i < filled ? "signal-block signal-filled" : "signal-block"} />
  ));
  return <span className="signal-bar">{blocks}</span>;
}

export function MatchSignals({ signals, visible = true }: MatchSignalsProps) {
  return (
    <motion.div
      className="match-signals"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
      transition={{ duration: 0.4 }}
    >
      <div className="match-signals-label">Match Signals</div>
      {signals.map((signal) => (
        <div key={signal.label} className="match-signal-row">
          <SignalBar filled={signal.filled} total={signal.total} />
          <span className="match-signal-name">{signal.label}</span>
        </div>
      ))}
    </motion.div>
  );
}
