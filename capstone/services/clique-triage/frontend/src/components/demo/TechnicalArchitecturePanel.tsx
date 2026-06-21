import { motion } from "framer-motion";
import { INVESTIGATION_REPORT_PREVIEW, TECH_ARCHITECTURE } from "../../demo/approachContent";
import {
  EXAMPLE_OUTPUT_TITLE,
  TECH_DISPLAY,
  TECH_LEGEND,
} from "../../demo/presentationNarrative";

interface TechnicalArchitecturePanelProps {
  reportVisible: boolean;
}

function statusLabel(status?: string): string | null {
  if (status === "built") return "Built";
  if (status === "roadmap") return "Roadmap";
  return null;
}

export function TechnicalArchitecturePanel({ reportVisible }: TechnicalArchitecturePanelProps) {
  return (
    <div className="approach-arch-panel">
      <h3 className="approach-column-title">Technical Architecture</h3>
      <p className="tech-legend">{TECH_LEGEND}</p>

      <div className="approach-arch-diagram">
        {TECH_ARCHITECTURE.map((node, index) => {
          const display = TECH_DISPLAY[node.id] ?? { label: node.label, detail: node.detail };
          return (
            <div key={node.id} className="approach-arch-node-wrap">
              <div className="approach-arch-node">
                <div className="approach-arch-node-head">
                  <span className="approach-arch-node-label">{display.label}</span>
                  {statusLabel(node.status) && (
                    <span className={`approach-arch-badge badge-${node.status}`}>
                      {statusLabel(node.status)}
                    </span>
                  )}
                </div>
                {display.detail && (
                  <p className="approach-arch-node-detail">{display.detail}</p>
                )}
              </div>
              {index < TECH_ARCHITECTURE.length - 1 && (
                <div className="approach-arch-connector" aria-hidden>
                  <span className="approach-arch-line" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <motion.section
        className="approach-report-preview"
        initial={{ opacity: 0, y: 6 }}
        animate={reportVisible ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 4 }}
        transition={{ duration: 0.4 }}
      >
        <h4 className="approach-report-title">{EXAMPLE_OUTPUT_TITLE}</h4>
        <dl className="approach-report-fields">
          <div className="approach-report-field">
            <dt>Starting point</dt>
            <dd>{INVESTIGATION_REPORT_PREVIEW.mostLikelyCause}</dd>
          </div>
          <div className="approach-report-field">
            <dt>Supporting evidence</dt>
            <dd>{INVESTIGATION_REPORT_PREVIEW.supportingEvidence}</dd>
          </div>
          <div className="approach-report-field">
            <dt>Verify next</dt>
            <dd>{INVESTIGATION_REPORT_PREVIEW.suggestedVerification}</dd>
          </div>
        </dl>
      </motion.section>
    </div>
  );
}
