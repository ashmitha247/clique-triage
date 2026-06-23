import { TRIAGE_ENGINE_FLOW_STEPS, TRIAGE_ENGINE_FLOW_TITLE } from "../../demo/presentationNarrative";

export function TriageEngineFlowPanel() {
  return (
    <aside className="engine-diagram-triage-flow" aria-label={TRIAGE_ENGINE_FLOW_TITLE}>
      <p className="engine-diagram-triage-flow-title">{TRIAGE_ENGINE_FLOW_TITLE}</p>
      <ol className="engine-diagram-triage-flow-steps">
        {TRIAGE_ENGINE_FLOW_STEPS.map((step, index) => (
          <li key={step} className="engine-diagram-triage-flow-step">
            <span className="engine-diagram-triage-flow-step-num">{index + 1}</span>
            <span className="engine-diagram-triage-flow-step-label">{step}</span>
            {index < TRIAGE_ENGINE_FLOW_STEPS.length - 1 ? (
              <span className="engine-diagram-triage-flow-step-arrow" aria-hidden>
                ▼
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </aside>
  );
}
