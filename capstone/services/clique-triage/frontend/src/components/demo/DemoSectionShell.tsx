import type { ReactNode } from "react";
import type { DemoSectionStep } from "../../demo/demoStepMeta";
import { getDemoStepMeta } from "../../demo/demoStepMeta";
import {
  getPdfSectionIndex,
  PDF_SECTION_LABELS,
  PDF_SECTION_ORDER,
} from "../../demo/presentationStepMeta";

interface DemoSectionShellProps {
  step: DemoSectionStep;
  onBack: () => void;
  onNext: () => void;
  children: ReactNode;
  caption?: string;
  hideStepHeader?: boolean;
}

export function DemoSectionShell({
  step,
  onBack,
  onNext,
  children,
  caption,
  hideStepHeader = false,
}: DemoSectionShellProps) {
  const meta = getDemoStepMeta(step);
  const demoSectionIndex = getPdfSectionIndex("demo");
  const displayCaption = caption ?? meta.caption;

  return (
    <div className="presentation-canvas presentation-canvas-demo-section">
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
                className={`presentation-act${index === demoSectionIndex ? " presentation-act-active" : ""}${index < demoSectionIndex ? " presentation-act-done" : ""}`}
              >
                {PDF_SECTION_LABELS[section]}
              </span>
            ))}
          </div>
        </header>

        <p className="presentation-section-progress">
          {PDF_SECTION_LABELS.demo} · {meta.sectionIndex}/{meta.sectionTotal}
        </p>

        {!hideStepHeader && (
          <div className="presentation-step-header">
            <h2 className="presentation-step-title">{meta.title}</h2>
            {meta.subtitle && <p className="presentation-step-subtitle">{meta.subtitle}</p>}
          </div>
        )}

        <div className="presentation-body">{children}</div>

        {displayCaption && <p className="demo-section-caption">{displayCaption}</p>}

        <footer className="presentation-nav">
          <button type="button" className="btn-presentation-secondary" onClick={onBack}>
            Back
          </button>
          <button type="button" className="btn-presentation-primary" onClick={onNext}>
            {meta.nextLabel}
          </button>
        </footer>
      </div>
    </div>
  );
}
