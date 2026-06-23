import type { EngineDiagramNode, EngineDiagramSimpleGather } from "../../demo/presentationNarrative";
import {
  ENGINE_DIAGRAM_GHA_CHIP,
  ENGINE_DIAGRAM_SIMPLE_EXTRACT,
  ENGINE_DIAGRAM_SIMPLE_GATHER,
  ENGINE_DIAGRAM_SIMPLE_INPUT,
  ENGINE_DIAGRAM_SIMPLE_ISOLATED,
  ENGINE_DIAGRAM_SIMPLE_MERGE,
  ENGINE_DIAGRAM_SIMPLE_OUTPUT,
  ENGINE_DIAGRAM_SIMPLE_SUBTITLE,
  ENGINE_DIAGRAM_SIMPLE_TITLE,
  ENGINE_DIAGRAM_SIMPLE_TRIAGE,
  ENGINE_DIAGRAM_SIMPLE_UI,
} from "../../demo/presentationNarrative";

function DiagramArrow() {
  return (
    <div className="engine-diagram-arrow engine-diagram-arrow-compact" aria-hidden>
      <span className="engine-diagram-line" />
      <span className="engine-diagram-chevron">▼</span>
    </div>
  );
}

function DiagramNode({ node }: { node: EngineDiagramNode }) {
  return (
    <div className={`engine-diagram-node engine-diagram-node-${node.status} engine-diagram-node-compact`}>
      <span className="engine-diagram-node-label">{node.label}</span>
      {node.sublabel && <span className="engine-diagram-node-sub">{node.sublabel}</span>}
      {node.status === "built" && <span className="engine-diagram-badge engine-diagram-badge-built">built</span>}
      {node.status === "fixture" && <span className="engine-diagram-badge engine-diagram-badge-fixture">fixture</span>}
      {node.status === "roadmap" && <span className="engine-diagram-badge engine-diagram-badge-roadmap">roadmap</span>}
    </div>
  );
}

function SimpleGatherCard({ gather }: { gather: EngineDiagramSimpleGather }) {
  return (
    <div className="engine-diagram-gather-card engine-diagram-gather-card-compact">
      <span className="engine-diagram-intake-label">{gather.label}</span>
    </div>
  );
}

function SimpleTriageFanOut() {
  return (
    <div className="engine-diagram-fanout engine-diagram-fanout-compact">
      <div className="engine-diagram-fanout-stem" aria-hidden>
        <span className="engine-diagram-line engine-diagram-fanout-stem-line" />
      </div>
      <div className="engine-diagram-fanout-rail" aria-hidden />
      <div className="engine-diagram-fanout-grid">
        {ENGINE_DIAGRAM_SIMPLE_GATHER.map((gather) => (
          <div key={gather.id} className="engine-diagram-fanout-col">
            <span className="engine-diagram-fanout-col-line" aria-hidden />
            <span className="engine-diagram-chevron engine-diagram-fanout-chevron">▼</span>
            <SimpleGatherCard gather={gather} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArchitectureOverviewDiagram() {
  return (
    <div className="engine-diagram-simple presentation-card">
      <p className="engine-diagram-simple-title">{ENGINE_DIAGRAM_SIMPLE_TITLE}</p>
      <p className="engine-diagram-simple-subtitle">{ENGINE_DIAGRAM_SIMPLE_SUBTITLE}</p>
      <div className="engine-diagram-spine engine-diagram-spine-compact">
        <DiagramNode node={ENGINE_DIAGRAM_GHA_CHIP} />
        <DiagramArrow />
        <DiagramNode node={ENGINE_DIAGRAM_SIMPLE_INPUT} />
        <DiagramArrow />
        <div className="engine-diagram-row-inline engine-diagram-row-inline-compact">
          <DiagramNode node={ENGINE_DIAGRAM_SIMPLE_EXTRACT} />
          <span className="engine-diagram-inline-arrow" aria-hidden>
            →
          </span>
          <DiagramNode node={ENGINE_DIAGRAM_SIMPLE_ISOLATED} />
        </div>
        <DiagramArrow />
        <DiagramNode node={ENGINE_DIAGRAM_SIMPLE_TRIAGE} />
        <SimpleTriageFanOut />
        <DiagramArrow />
        <DiagramNode node={ENGINE_DIAGRAM_SIMPLE_MERGE} />
        <DiagramArrow />
        <DiagramNode node={ENGINE_DIAGRAM_SIMPLE_OUTPUT} />
        <DiagramArrow />
        <DiagramNode node={ENGINE_DIAGRAM_SIMPLE_UI} />
      </div>
    </div>
  );
}
