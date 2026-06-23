import { DEMO_PROCESSING_STEPS } from "../../../demo/presentationNarrative";
import { BuildStatusChip } from "./BuildStatusChip";

export function ProcessingPipelineDiagram() {
  return (
    <div className="processing-pipeline presentation-card">
      <ol className="processing-pipeline-steps">
        {DEMO_PROCESSING_STEPS.map((step, index) => (
          <li key={step.id} className="processing-pipeline-step">
            <article className="processing-pipeline-node">
              <span className="processing-pipeline-step-num" aria-hidden>
                {index + 1}
              </span>
              <div className="processing-pipeline-node-body">
                <h4 className="processing-pipeline-node-label">{step.label}</h4>
                <p className="processing-pipeline-node-detail">{step.detail}</p>
                <BuildStatusChip status={step.status} />
              </div>
            </article>
            {index < DEMO_PROCESSING_STEPS.length - 1 ? (
              <span className="processing-pipeline-arrow" aria-hidden>
                ▼
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
