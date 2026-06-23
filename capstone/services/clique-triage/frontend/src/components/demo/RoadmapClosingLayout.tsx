import type { ReactNode } from "react";
import { ProductAtmosphere } from "../ProductAtmosphere";

interface RoadmapClosingLayoutProps {
  actLabel: string;
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onNext: () => void;
  nextLabel: string;
  children: ReactNode;
}

export function RoadmapClosingLayout({
  actLabel,
  title,
  subtitle,
  onBack,
  onNext,
  nextLabel,
  children,
}: RoadmapClosingLayoutProps) {
  return (
    <div className="roadmap-closing">
      <ProductAtmosphere />
      <div className="roadmap-closing-inner">
        <p className="roadmap-closing-act">{actLabel}</p>
        <h2 className="roadmap-closing-title">{title}</h2>
        {subtitle && <p className="roadmap-closing-subtitle">{subtitle}</p>}
        <div className="roadmap-closing-body">{children}</div>
        <footer className="roadmap-closing-nav">
          {onBack ? (
            <button type="button" className="btn-secondary" onClick={onBack}>
              Back
            </button>
          ) : (
            <span />
          )}
          <button type="button" className="btn-primary" onClick={onNext}>
            {nextLabel}
          </button>
        </footer>
      </div>
    </div>
  );
}
