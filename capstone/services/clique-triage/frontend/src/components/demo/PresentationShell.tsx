import type { ReactNode } from "react";
import {
  getPdfSectionIndex,
  getPreludeStepMeta,
  PDF_SECTION_LABELS,
  PDF_SECTION_ORDER,
  type PreludeStep,
} from "../../demo/presentationStepMeta";

interface PresentationShellProps {
  step: PreludeStep;
  onBack?: () => void;
  onNext: () => void;
  showBack?: boolean;
  canvasClassName?: string;
  children: ReactNode;
}

export function PresentationShell({
  step,
  onBack,
  onNext,
  showBack = true,
  canvasClassName,
  children,
}: PresentationShellProps) {
  const meta = getPreludeStepMeta(step);
  const activeSectionIndex = getPdfSectionIndex(meta.section);

  return (
    <div className={`presentation-canvas${canvasClassName ? ` ${canvasClassName}` : ""}`}>
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
          <div className="presentation-acts" aria-label="Presentation section">
            {PDF_SECTION_ORDER.map((section, index) => (
              <span
                key={section}
                className={`presentation-act${index === activeSectionIndex ? " presentation-act-active" : ""}${index < activeSectionIndex ? " presentation-act-done" : ""}`}
              >
                {PDF_SECTION_LABELS[section]}
              </span>
            ))}
          </div>
        </header>

        <p className="presentation-section-progress">
          {PDF_SECTION_LABELS[meta.section]} · {meta.sectionIndex}/{meta.sectionTotal}
        </p>

        <div className="presentation-step-header">
          <h2 className="presentation-step-title">{meta.title}</h2>
          {meta.subtitle && <p className="presentation-step-subtitle">{meta.subtitle}</p>}
        </div>

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
            {meta.nextLabel}
          </button>
        </footer>
      </div>
    </div>
  );
}
