import {
  EXTENSION_TYPES_UNDERLINE_PHRASES,
  HUDA_TODAY_CLIQUE_INTENT_AUDIENCE,
  HUDA_TODAY_CLIQUE_INTENT_EXTENSION_WORD,
  HUDA_TODAY_CLIQUE_INTENT_LEAD,
  HUDA_TODAY_CLIQUE_INTENT_TAGLINE,
  HUDA_TODAY_EXTENSION_FOOTER,
  HUDA_TODAY_HEAVY_CALLOUTS,
  HUDA_TODAY_MANUAL_HEAVY,
  HUDA_TODAY_MANUAL_READ,
  HUDA_TODAY_MANUAL_TITLE,
} from "../../demo/presentationNarrative";
import { highlightPhrase, highlightStyledPhrases } from "../../lib/highlightPhrase";
import { AnimatedFlowArrow } from "./AnimatedFlowArrow";
import { PresentationShell } from "./PresentationShell";

interface HudaWorkflowScreenProps {
  onBack: () => void;
  onNext: () => void;
}

function CalloutArrow({ position }: { position: string }) {
  return (
    <span className="workflow-heavy-callout-arrow" aria-hidden>
      {position === "top-left" && "↘"}
      {position === "top-right" && "↙"}
      {position === "bottom" && "↑"}
      {position === "left" && "→"}
      {position === "right" && "←"}
    </span>
  );
}

export function HudaWorkflowScreen({ onBack, onNext }: HudaWorkflowScreenProps) {
  return (
    <PresentationShell step="huda-today" onBack={onBack} onNext={onNext}>
      <section className="presentation-card workflow-manual-card">
        <h3 className="niche-spec-title">{HUDA_TODAY_MANUAL_TITLE}</h3>

        <div className="workflow-manual-flow">
          <p className="workflow-manual-step">{HUDA_TODAY_MANUAL_READ}</p>

          <div className="workflow-manual-arrow-slot" aria-hidden>
            <AnimatedFlowArrow delay={0} />
          </div>

          <div className="workflow-manual-heavy-wrap" aria-label="Heavy manual work">
            <div className="workflow-heavy-arena">
              {HUDA_TODAY_HEAVY_CALLOUTS.map((callout) => (
                <div
                  key={callout.label}
                  className={`workflow-heavy-callout workflow-heavy-callout-${callout.position}${callout.position === "bottom" ? " workflow-heavy-callout-bottom-lower" : ""}`}
                >
                  {callout.position === "bottom" ? (
                    <>
                      <CalloutArrow position={callout.position} />
                      <span>{callout.label}</span>
                    </>
                  ) : (
                    <>
                      <span>{callout.label}</span>
                      <CalloutArrow position={callout.position} />
                    </>
                  )}
                </div>
              ))}
              <div className="workflow-manual-heavy-circle">
                <ol className="workflow-manual-heavy-list">
                  {HUDA_TODAY_MANUAL_HEAVY.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="presentation-card workflow-clique-intent">
        <p className="workflow-clique-intent-tagline copy-accent-line">{HUDA_TODAY_CLIQUE_INTENT_TAGLINE}</p>
        <p className="workflow-clique-intent-lead">
          {highlightPhrase(
            HUDA_TODAY_CLIQUE_INTENT_LEAD,
            HUDA_TODAY_CLIQUE_INTENT_EXTENSION_WORD,
            "copy-highlight-extension",
          )}
        </p>
        <p className="workflow-clique-intent-audience">{HUDA_TODAY_CLIQUE_INTENT_AUDIENCE}</p>
      </section>

      <p className="workflow-extension-footer presentation-card copy-accent-line">
        {highlightStyledPhrases(
          HUDA_TODAY_EXTENSION_FOOTER,
          EXTENSION_TYPES_UNDERLINE_PHRASES.map((phrase) => ({ phrase, variant: "underline" as const })),
        )}
      </p>
    </PresentationShell>
  );
}
