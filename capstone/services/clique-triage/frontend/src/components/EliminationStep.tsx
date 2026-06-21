import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { EliminatedItem, EvidenceSummary } from "../types/workspace";

interface EliminationStepProps {
  items: EliminatedItem[];
  summary: EvidenceSummary;
}

export function EliminationStep({ items, summary }: EliminationStepProps) {
  const [animating, setAnimating] = useState(false);
  const [animIndex, setAnimIndex] = useState(-1);

  const discarded = items.filter((e) => e.status === "eliminated");
  const deprioritized = items.filter((e) => e.status === "deprioritized");

  const resolvedCount = animating && animIndex >= 0 ? animIndex + 1 : items.length;

  const visibleDiscarded = discarded.filter((entry) => {
    const idx = items.indexOf(entry);
    return idx >= 0 && idx < resolvedCount;
  });

  const visibleDeprioritized = deprioritized.filter((entry) => {
    const idx = items.indexOf(entry);
    return idx >= 0 && idx < resolvedCount;
  });

  const activeItem =
    animating && animIndex >= 0 && animIndex < items.length ? items[animIndex] : null;
  const animationComplete = animating && animIndex >= items.length - 1;

  useEffect(() => {
    if (!animating || animIndex < 0 || animIndex >= items.length) return;

    const item = items[animIndex];
    const delay = item.status === "deprioritized" ? 2200 : 1800;
    const timer = setTimeout(() => {
      setAnimIndex((prev) => Math.min(prev + 1, items.length - 1));
    }, delay);

    return () => clearTimeout(timer);
  }, [animating, animIndex, items]);

  function startAnimation() {
    setAnimating(true);
    setAnimIndex(0);
  }

  function showFullSummary() {
    setAnimating(false);
    setAnimIndex(-1);
  }

  return (
    <div className="elimination-step">
      <div className="elimination-layout elimination-layout-static">
        <aside className="elimination-summary phase-card">
          <div className="elimination-summary-head">
            <span className="elimination-summary-label">Evidence examined</span>
            <span className="elimination-summary-count">{summary.examinedCount}</span>
          </div>

          <div className="elimination-summary-section">
            <div className="elimination-summary-title">Discarded</div>
            {visibleDiscarded.length === 0 ? (
              <p className="elimination-summary-empty">None yet</p>
            ) : (
              <ul className="elimination-summary-list">
                {visibleDiscarded.map((entry) => (
                  <li key={entry.name} className="summary-item summary-discarded">
                    <span className="summary-mark" aria-hidden>
                      ✗
                    </span>
                    {entry.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {visibleDeprioritized.length > 0 && (
            <div className="elimination-summary-section">
              <div className="elimination-summary-title">Deprioritized</div>
              <ul className="elimination-summary-list">
                {visibleDeprioritized.map((entry) => (
                  <li key={entry.name} className="summary-item summary-deprioritized">
                    <span className="summary-mark" aria-hidden>
                      −
                    </span>
                    {entry.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="elimination-summary-section">
            <div className="elimination-summary-title">Ranked</div>
            <ul className="elimination-summary-list">
              {summary.ranked.map((entry) => (
                <li key={entry.name} className="summary-item summary-ranked">
                  <span className="summary-mark" aria-hidden>
                    ✓
                  </span>
                  {entry.name}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="elimination-main">
          {animating && activeItem && !animationComplete ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.name}
                className="elimination-card phase-card"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                <div className="elimination-label">Ruling out</div>
                <div className="elimination-filename">{activeItem.name}</div>
                <div
                  className={`elimination-verdict${activeItem.status === "deprioritized" ? " verdict-deprioritized" : " verdict-eliminated"}`}
                >
                  {activeItem.status === "deprioritized" ? "DEPRIORITIZED" : "ELIMINATED"}
                </div>
                <div className="elimination-reason-text">{activeItem.reason}</div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="elimination-static-summary phase-card">
              <p className="elimination-static-lead">
                Clique examined <strong>{summary.examinedCount}</strong> signals and kept{" "}
                <strong>{summary.ranked.length}</strong> ranked leads.
              </p>
              <p className="elimination-static-detail">
                Styling commits, unrelated releases, and stable files were ruled out so you can
                focus on what might explain this failure.
              </p>
              {!animating && (
                <button type="button" className="btn-secondary btn-animate" onClick={startAnimation}>
                  Play elimination replay
                </button>
              )}
              {animationComplete && (
                <button type="button" className="btn-secondary btn-animate" onClick={showFullSummary}>
                  Show full summary
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
