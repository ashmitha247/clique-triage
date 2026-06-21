import type { ReactNode } from "react";
import type { GuidedStep, GuidedStepCopy } from "../types/workspace";

interface GuidedShellProps {
  step: Exclude<GuidedStep, "loading" | "landing" | "done" | "error">;
  copy: GuidedStepCopy;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  children: ReactNode;
}

const STEP_NUMBERS: Record<Exclude<GuidedStep, "loading" | "landing" | "done" | "error">, number> = {
  step1: 1,
  step2: 2,
  step3: 3,
  step4: 4,
};

export function GuidedShell({ step, copy, onBack, onNext, nextLabel = "Next", children }: GuidedShellProps) {
  const current = STEP_NUMBERS[step];

  return (
    <div className="guided-shell">
      <header className="guided-topbar">
        <div className="guided-brand">
          <span className="guided-brand-name">Clique</span>
          <span className="guided-brand-sep">·</span>
          <span className="guided-brand-value">Know what to investigate first</span>
        </div>
        <div className="guided-dots" aria-label={`Step ${current} of 4`}>
          {[1, 2, 3, 4].map((n) => (
            <span key={n} className={`guided-dot${n === current ? " guided-dot-active" : ""}${n < current ? " guided-dot-done" : ""}`} />
          ))}
        </div>
      </header>

      <div className="guided-step-header">
        <h2 className="guided-step-title">{copy.title}</h2>
        <p className="guided-step-subtitle">{copy.subtitle}</p>
      </div>

      <div className="guided-step-body">{children}</div>

      {copy.caption && <p className="guided-step-caption">{copy.caption}</p>}

      <footer className="guided-nav">
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn-primary" onClick={onNext}>
          {nextLabel}
        </button>
      </footer>
    </div>
  );
}
