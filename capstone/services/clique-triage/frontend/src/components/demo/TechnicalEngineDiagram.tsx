import type { EngineDiagramInput, EngineDiagramNode } from "../../demo/presentationNarrative";
import {
  ENGINE_DIAGRAM_DEMO_BANNER,
  ENGINE_DIAGRAM_END_PRODUCT_LABEL,
  ENGINE_DIAGRAM_EXTRACT,
  ENGINE_DIAGRAM_GATHER_INPUTS,
  ENGINE_DIAGRAM_GATHER_LABEL,
  ENGINE_DIAGRAM_INPUT,
  ENGINE_DIAGRAM_ISOLATED,
  ENGINE_DIAGRAM_MERGE,
  ENGINE_DIAGRAM_OUTPUT,
  ENGINE_DIAGRAM_ROADMAP_INTRO,
  ENGINE_DIAGRAM_ROADMAP_ITEMS,
  ENGINE_DIAGRAM_ROADMAP_TITLE,
  ENGINE_DIAGRAM_TRIAGE,
  ENGINE_DIAGRAM_UI,
  ENGINE_DIAGRAM_WRITE_LABEL,
} from "../../demo/presentationNarrative";
import { LogSlicerRulesTable } from "./LogSlicerRulesTable";
import { TriageEngineFlowPanel } from "./TriageEngineFlowPanel";

export type TechnicalEngineDiagramRange = "full" | "through-isolated" | "from-triage" | "rest";

function DiagramArrow() {
  return (
    <div className="engine-diagram-arrow" aria-hidden>
      <span className="engine-diagram-line" />
      <span className="engine-diagram-chevron">▼</span>
    </div>
  );
}

function DiagramNode({ node }: { node: EngineDiagramNode }) {
  return (
    <div className={`engine-diagram-node engine-diagram-node-${node.status}`}>
      <span className="engine-diagram-node-label">{node.label}</span>
      {node.sublabel && <span className="engine-diagram-node-sub">{node.sublabel}</span>}
      {node.status === "built" && <span className="engine-diagram-badge engine-diagram-badge-built">built</span>}
      {node.status === "fixture" && <span className="engine-diagram-badge engine-diagram-badge-fixture">fixture</span>}
      {node.status === "roadmap" && <span className="engine-diagram-badge engine-diagram-badge-roadmap">roadmap</span>}
    </div>
  );
}

function GatherEvidenceNode({ input }: { input: EngineDiagramInput }) {
  return (
    <div className="engine-diagram-gather-card">
      <span className="engine-diagram-intake-label">{input.label}</span>
      <div className="engine-diagram-intake-row engine-diagram-intake-row-demo">
        <span className="engine-diagram-intake-badge engine-diagram-intake-badge-demo">Demo</span>
        <span className="engine-diagram-intake-source">{input.demoSource}</span>
      </div>
      <div className="engine-diagram-intake-row engine-diagram-intake-row-product">
        <span className="engine-diagram-intake-badge engine-diagram-intake-badge-product">
          {ENGINE_DIAGRAM_END_PRODUCT_LABEL}
        </span>
        <span className="engine-diagram-intake-source">{input.productSource}</span>
      </div>
      <span className="engine-diagram-gather-check">{input.checkLine}</span>
      <span className="engine-diagram-intake-tech">{input.techStack}</span>
    </div>
  );
}

function TriageFanOut() {
  return (
    <div className="engine-diagram-fanout">
      <div className="engine-diagram-fanout-stem" aria-hidden>
        <span className="engine-diagram-line engine-diagram-fanout-stem-line" />
      </div>
      <div className="engine-diagram-fanout-rail" aria-hidden />
      <p className="engine-diagram-intake-title">{ENGINE_DIAGRAM_GATHER_LABEL}</p>
      <div className="engine-diagram-fanout-grid">
        {ENGINE_DIAGRAM_GATHER_INPUTS.map((input) => (
          <div key={input.id} className="engine-diagram-fanout-col">
            <span className="engine-diagram-fanout-col-line" aria-hidden />
            <span className="engine-diagram-chevron engine-diagram-fanout-chevron">▼</span>
            <GatherEvidenceNode input={input} />
          </div>
        ))}
      </div>
    </div>
  );
}

function RoadmapSection() {
  const planned = ENGINE_DIAGRAM_ROADMAP_ITEMS.filter((item) => item.tier === "planned");
  const later = ENGINE_DIAGRAM_ROADMAP_ITEMS.filter((item) => item.tier === "later");

  return (
    <div className="engine-diagram-roadmap-zone">
      <p className="engine-diagram-roadmap-title">{ENGINE_DIAGRAM_ROADMAP_TITLE}</p>
      <p className="engine-diagram-roadmap-intro">{ENGINE_DIAGRAM_ROADMAP_INTRO}</p>
      <div className="engine-diagram-roadmap-cards">
        {planned.map((item) => (
          <article key={item.id} className="engine-diagram-roadmap-card engine-diagram-roadmap-card-planned">
            <h4 className="engine-diagram-roadmap-card-title">{item.title}</h4>
            <p className="engine-diagram-roadmap-card-body">{item.body}</p>
          </article>
        ))}
      </div>
      {later.map((item) => (
        <p key={item.id} className="engine-diagram-roadmap-later">
          <strong>{item.title}:</strong> {item.body}
        </p>
      ))}
    </div>
  );
}

interface TechnicalEngineDiagramProps {
  range?: TechnicalEngineDiagramRange;
}

export function TechnicalEngineDiagram({ range = "full" }: TechnicalEngineDiagramProps) {
  const showIntake = range === "full" || range === "through-isolated";
  const showTriage = range === "full" || range === "from-triage";
  const showRest = range === "full" || range === "rest";

  return (
    <div className="engine-diagram presentation-card">
      {showIntake ? <p className="engine-diagram-demo-banner">{ENGINE_DIAGRAM_DEMO_BANNER}</p> : null}
      <div className="engine-diagram-spine">
        {showIntake ? (
          <>
            <DiagramNode node={ENGINE_DIAGRAM_INPUT} />
            <DiagramArrow />
            <div className="engine-diagram-extract-zone">
              <div className="engine-diagram-extract-rules-row">
                <DiagramNode node={ENGINE_DIAGRAM_EXTRACT} />
                <span className="engine-diagram-extract-rules-arrow" aria-hidden>
                  →
                </span>
                <LogSlicerRulesTable />
              </div>
              <DiagramArrow />
              <DiagramNode node={ENGINE_DIAGRAM_ISOLATED} />
            </div>
          </>
        ) : null}

        {showTriage ? (
          <>
            {range === "from-triage" ? <DiagramArrow /> : null}
            {range === "full" ? <DiagramArrow /> : null}
            <div className="engine-diagram-triage-zone">
              <div className="engine-diagram-triage-row">
                <DiagramNode node={ENGINE_DIAGRAM_TRIAGE} />
                <span className="engine-diagram-triage-flow-arrow" aria-hidden>
                  →
                </span>
                <TriageEngineFlowPanel />
              </div>
            </div>
            <TriageFanOut />
          </>
        ) : null}

        {showRest ? (
          <>
            <DiagramArrow />
            <DiagramNode node={ENGINE_DIAGRAM_MERGE} />

            <div className="engine-diagram-merge" aria-hidden>
              <span className="engine-diagram-merge-line" />
              <span className="engine-diagram-merge-label">{ENGINE_DIAGRAM_WRITE_LABEL}</span>
            </div>

            <DiagramArrow />
            <DiagramNode node={ENGINE_DIAGRAM_OUTPUT} />
            <DiagramArrow />
            <DiagramNode node={ENGINE_DIAGRAM_UI} />
          </>
        ) : null}
      </div>

      {showRest ? <RoadmapSection /> : null}
    </div>
  );
}
