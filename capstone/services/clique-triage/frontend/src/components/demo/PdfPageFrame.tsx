import type { ReactNode } from "react";
import {
  getPdfSectionIndex,
  PDF_SECTION_LABELS,
  PDF_SECTION_ORDER,
  type PdfSection,
} from "../../demo/presentationStepMeta";

interface PdfPageFrameProps {
  section: PdfSection;
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  canvasClassName?: string;
  compact?: boolean;
  children: ReactNode;
}

export function PdfPageFrame({
  section,
  title,
  subtitle,
  showHeader = true,
  canvasClassName,
  compact = false,
  children,
}: PdfPageFrameProps) {
  const activeSectionIndex = getPdfSectionIndex(section);

  return (
    <div
      className={`presentation-canvas pdf-page-canvas${canvasClassName ? ` ${canvasClassName}` : ""}${compact ? " pdf-compact" : ""}`}
    >
      <div className="presentation-pattern" aria-hidden />
      <svg className="presentation-wave presentation-wave-top" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
        <path d="M0,64 C360,120 720,0 1080,48 C1260,72 1380,96 1440,80 L1440,0 L0,0 Z" fill="rgba(99,102,241,0.06)" />
      </svg>
      <svg className="presentation-wave presentation-wave-bottom" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
        <path d="M0,48 C240,96 480,16 720,56 C960,96 1200,32 1440,64 L1440,120 L0,120 Z" fill="rgba(14,165,233,0.07)" />
      </svg>

      <div className="presentation-shell pdf-page-shell">
        <header className="presentation-topbar">
          <div className="presentation-brand">
            <span className="presentation-brand-name">Clique</span>
          </div>
          <div className="presentation-acts" aria-label="Presentation section">
            {PDF_SECTION_ORDER.map((act, index) => (
              <span
                key={act}
                className={`presentation-act${index === activeSectionIndex ? " presentation-act-active" : ""}${index < activeSectionIndex ? " presentation-act-done" : ""}`}
              >
                {PDF_SECTION_LABELS[act]}
              </span>
            ))}
          </div>
        </header>

        {showHeader && title ? (
          <div className="presentation-step-header">
            <h2 className="presentation-step-title">{title}</h2>
            {subtitle ? <p className="presentation-step-subtitle">{subtitle}</p> : null}
          </div>
        ) : null}

        <div className="presentation-body pdf-page-body">{children}</div>
      </div>
    </div>
  );
}
