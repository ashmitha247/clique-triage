import { motion } from "framer-motion";
import { fmtStreamTime } from "../lib/transformWorkspace";
import type { StreamEvent } from "../types/workspace";

interface TimelineScreenProps {
  events: StreamEvent[];
  visibleCount: number;
}

function eventMarker(tone: StreamEvent["tone"]): string {
  if (tone === "star") return "★";
  return "●";
}

export function TimelineScreen({ events, visibleCount }: TimelineScreenProps) {
  const visible = events.slice(0, visibleCount);

  return (
    <div className="focus-screen">
      <motion.div
        className="timeline-card phase-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="focus-label">Incident timeline reconstructed</div>
        <div className="timeline-rail timeline-rail-hero">
          {visible.map((event, index) => {
            const isLast = index === visible.length - 1;
            const toneClass =
              event.tone === "critical"
                ? "timeline-event timeline-critical"
                : event.tone === "star"
                  ? "timeline-event timeline-star"
                  : "timeline-event";

            return (
              <motion.div
                key={`${event.timestamp}-${event.label}`}
                className={toneClass}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="timeline-node-col">
                  <span className={`timeline-marker marker-${event.tone}`}>
                    {eventMarker(event.tone)}
                  </span>
                  {!isLast && <span className="timeline-segment" aria-hidden />}
                </div>
                <div className="timeline-content">
                  <div className="timeline-row">
                    <span className="timeline-time">{fmtStreamTime(event.timestamp)}</span>
                    <span className="timeline-label">{event.label}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
