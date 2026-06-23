import {
  ENGINE_DIAGRAM_END_PRODUCT_LABEL,
  PACKET_RATIONALE_INTRO,
  PACKET_RATIONALE_ROWS,
  PACKET_RATIONALE_TITLE,
} from "../../demo/presentationNarrative";

function formatSourceType(sourceType: "fixture" | "live-roadmap" | "engine"): string {
  if (sourceType === "fixture") return "Demo sample";
  if (sourceType === "live-roadmap") return "Live (roadmap)";
  return "Engine";
}

function ReadsFromCell({ demo, product }: { demo: string; product: string }) {
  return (
    <div className="packet-reads-from">
      <p className="packet-reads-from-line packet-reads-from-line-demo">
        <span className="packet-reads-from-label packet-reads-from-label-demo">Demo</span>
        <span className="packet-reads-from-demo">{demo}</span>
      </p>
      <p className="packet-reads-from-line packet-reads-from-line-product">
        <span className="packet-reads-from-label packet-reads-from-label-product">
          {ENGINE_DIAGRAM_END_PRODUCT_LABEL}
        </span>
        <span className="packet-reads-from-product">{product}</span>
      </p>
    </div>
  );
}

export function PacketRationaleTable() {
  return (
    <section className="presentation-card packet-rationale-section">
      <h3 className="approach-column-title">{PACKET_RATIONALE_TITLE}</h3>
      <p className="packet-rationale-intro">{PACKET_RATIONALE_INTRO}</p>
      <div className="evidence-sources-table evidence-sources-table-light packet-rationale-table" role="table">
        <div className="evidence-sources-row evidence-sources-header" role="row">
          <span className="evidence-sources-cell evidence-sources-question" role="columnheader">
            Question
          </span>
          <span className="evidence-sources-cell evidence-sources-intake" role="columnheader">
            Reads from
          </span>
          <span className="evidence-sources-cell evidence-sources-field" role="columnheader">
            Packet field
          </span>
          <span className="evidence-sources-cell evidence-sources-sourcetype" role="columnheader">
            Source
          </span>
          <span className="evidence-sources-cell evidence-sources-status" role="columnheader">
            Status
          </span>
        </div>
        {PACKET_RATIONALE_ROWS.map((row) => (
          <div
            key={row.question}
            className={`evidence-sources-row packet-rationale-row-${row.status}`}
            role="row"
          >
            <span className="evidence-sources-cell evidence-sources-question" role="cell">
              {row.question}
            </span>
            <span className="evidence-sources-cell evidence-sources-intake" role="cell">
              <ReadsFromCell demo={row.readsFromDemo} product={row.readsFromProduct} />
            </span>
            <span className="evidence-sources-cell evidence-sources-field" role="cell">
              <code>{row.packetField}</code>
            </span>
            <span className="evidence-sources-cell evidence-sources-sourcetype" role="cell">
              {formatSourceType(row.sourceType)}
            </span>
            <span className="evidence-sources-cell evidence-sources-status" role="cell">
              {row.status === "built" ? "Built" : row.status === "gap" ? "Gap" : "Roadmap"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
