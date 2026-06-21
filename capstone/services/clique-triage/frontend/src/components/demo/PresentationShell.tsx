import type { ReactNode } from "react";

export type PresentationAct = "intro" | "research" | "workflow" | "architecture";

interface PresentationShellProps {
  act: PresentationAct;
  title?: string;
  subtitle?: string;
  showStepHeader?: boolean;
  onBack?: () => void;
  onNext: () => void;
  nextLabel: string;
  showBack?: boolean;
  children: ReactNode;
}

const ACT_INDEX: Record<PresentationAct, number> = {
  intro: 0,
  research: 1,
  workflow: 2,
  architecture: 3,
};

const ACT_LABELS = ["Intro", "Research", "Today", "Approach", "Product"];

export function PresentationShell({
  act,
  title,
  subtitle,
  showStepHeader = true,
  onBack,
  onNext,
  nextLabel,
  showBack = true,
  children,
}: PresentationShellProps) {
  const current = ACT_INDEX[act];

  return (
    <div className="presentation-canvas">
      <div className="presentation-pattern" aria-hidden />
      <svg className="presentation-wave presentation-wave-top" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
        <path d="M0,64 C360,120 720,0 1080,48 C1260,72 1380,96 1440,80 L1440,0 L0,0 Z" fill="rgba(99,102,241,0.06)" />
      </svg>
      <svg className="presentation-wave presentation-wave-bottom" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
        <path d="M0,48 C240,96 480,16 720,56 C960,96 1200,32 1440,64 L1440,120 L0,120 Z" fill="rgba(14,165,233,0.07)" />
      </svg>

      <div className="presentation-shell">
        <header className="presentation-topbar">
          <div className="presentation-brand">
            <span className="presentation-brand-name">Clique</span>
          </div>
          <div className="presentation-acts" aria-label="Presentation act">
            {ACT_LABELS.map((label, index) => (
              <span
                key={label}
                className={`presentation-act${index === current ? " presentation-act-active" : ""}${index < current ? " presentation-act-done" : ""}${index === 4 ? " presentation-act-product" : ""}`}
              >
                {label}
              </span>
            ))}
          </div>
        </header>

        {showStepHeader && title && (
          <div className="presentation-step-header">
            <h2 className="presentation-step-title">{title}</h2>
            {subtitle && <p className="presentation-step-subtitle">{subtitle}</p>}
          </div>
        )}

        <div className="presentation-body">{children}</div>

        <footer className="presentation-nav">
          {showBack && onBack ? (
            <button type="button" className="btn-presentation-secondary" onClick={onBack}>
              Back
            </button>
          ) : (
            <span />
          )}
          <button type="button" className="btn-presentation-primary" onClick={onNext}>
            {nextLabel}
          </button>
        </footer>
      </div>
    </div>
  );
}
