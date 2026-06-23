import {
  UNDER_THE_HOOD_EXTRACT_CLI_PHRASE,
  UNDER_THE_HOOD_EXTRACT_EXPLAIN_HIGHLIGHTS,
  UNDER_THE_HOOD_TRIAGE_EXPLAIN_HIGHLIGHT,
  type UnderHoodGraphNode,
  type UnderHoodPhaseSection,
} from "../../demo/presentationNarrative";
import { boldHighlightPhrase, highlightStyledPhrases } from "../../lib/highlightPhrase";

export type UnderTheHoodFlowRange = "full" | "through-rank" | "from-output";

function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="under-hood-pipeline-arrow" aria-hidden>
      {label ? <span className="under-hood-pipeline-arrow-label">{label}</span> : null}
      <span className="under-hood-pipeline-line" />
      <span className="under-hood-pipeline-chevron">▼</span>
    </div>
  );
}

function FlowNodeBox({
  node,
  phaseStep,
  phaseTitle,
  wide = false,
}: {
  node: UnderHoodGraphNode;
  phaseStep?: string;
  phaseTitle?: string;
  wide?: boolean;
}) {
  return (
    <article
      className={`under-hood-pipeline-node under-hood-pipeline-node-${node.tone ?? "work"}${wide ? " under-hood-pipeline-corpus-intro" : ""}`}
    >
      {phaseStep && phaseTitle ? (
        <p className="under-hood-pipeline-node-phase">
          {phaseStep} · {phaseTitle}
        </p>
      ) : null}
      <h4 className="under-hood-pipeline-node-title">{node.title}</h4>
      {node.why ? <p className="under-hood-pipeline-node-why">{node.why}</p> : null}
      {node.deliverySections ? (
        <div className="under-hood-pipeline-delivery">
          {node.deliverySections.map((section) => (
            <div key={section.label} className="under-hood-pipeline-delivery-section">
              <p className="under-hood-pipeline-delivery-label">{section.label}</p>
              <p className="under-hood-pipeline-delivery-body">{section.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="under-hood-pipeline-node-detail">{node.detail}</p>
      )}
      {node.technical ? <p className="under-hood-pipeline-node-technical">{node.technical}</p> : null}
      {node.paperCite ? (
        <blockquote className="under-hood-pipeline-node-cite">
          <p className="under-hood-pipeline-node-cite-text">&ldquo;{node.paperCite.quote}&rdquo;</p>
          <p className="under-hood-pipeline-node-cite-label">
            —{" "}
            <a href={node.paperCite.url} target="_blank" rel="noreferrer">
              {node.paperCite.label}
            </a>
          </p>
        </blockquote>
      ) : null}
      {node.artifact ? <code className="under-hood-pipeline-node-artifact">{node.artifact}</code> : null}
    </article>
  );
}

function FlowBranchRow({ nodes }: { nodes: UnderHoodGraphNode[] }) {
  return (
    <div className="under-hood-pipeline-branch under-hood-pipeline-branch-three">
      <div className="under-hood-pipeline-branch-rail" aria-hidden />
      <div className="under-hood-pipeline-branch-grid">
        {nodes.map((node) => (
          <FlowNodeBox key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}

function getPhase(phases: readonly UnderHoodPhaseSection[], id: string) {
  const phase = phases.find((entry) => entry.id === id);
  if (!phase) throw new Error(`Missing under-the-hood phase: ${id}`);
  return phase;
}

function gatherBranchNodes(phase: UnderHoodPhaseSection): UnderHoodGraphNode[] {
  return phase.groups?.flatMap((group) => group.nodes) ?? phase.nodes;
}

interface UnderTheHoodFlowProps {
  phases: readonly UnderHoodPhaseSection[];
  range?: UnderTheHoodFlowRange;
}

export function UnderTheHoodFlow({ phases, range = "full" }: UnderTheHoodFlowProps) {
  const input = getPhase(phases, "input");
  const extract = getPhase(phases, "extract");
  const triage = getPhase(phases, "triage");
  const output = getPhase(phases, "output");
  const run = getPhase(phases, "run");
  const gatherNodes = gatherBranchNodes(triage);
  const rankNode = triage.nodes[0];
  const [packetNode, uiNode, geminiNode] = output.nodes;
  const corpusIntro = triage.corpusIntro;

  const showInput = range === "full" || range === "through-rank";
  const showOutput = range === "full" || range === "from-output";

  return (
    <div className="under-hood-pipeline presentation-card">
      {showInput ? (
        <>
          <p className="under-hood-pipeline-intro">{input.explain}</p>

          <FlowNodeBox node={input.nodes[0]} phaseStep={input.step} phaseTitle={input.title} />
          <FlowArrow />

          <p className="under-hood-pipeline-bridge">
            {highlightStyledPhrases(extract.explain, [
              { phrase: UNDER_THE_HOOD_EXTRACT_CLI_PHRASE, variant: "strong", className: "copy-block-highlight" },
              ...UNDER_THE_HOOD_EXTRACT_EXPLAIN_HIGHLIGHTS.map((phrase) => ({
                phrase,
                variant: "em" as const,
              })),
            ])}
          </p>
          <FlowNodeBox node={extract.nodes[0]} phaseStep={extract.step} phaseTitle={extract.title} />
          <FlowArrow />

          <p className="under-hood-pipeline-bridge">
            {boldHighlightPhrase(triage.explain, UNDER_THE_HOOD_TRIAGE_EXPLAIN_HIGHLIGHT)}
          </p>
          {corpusIntro ? (
            <FlowNodeBox node={corpusIntro} wide phaseStep={triage.step} phaseTitle={triage.title} />
          ) : null}
          <FlowBranchRow nodes={gatherNodes} />
          <FlowArrow label={triage.mergeLabel} />

          <FlowNodeBox node={rankNode} phaseStep={triage.step} phaseTitle="Rank" />
        </>
      ) : null}

      {range === "full" ? <FlowArrow /> : null}

      {showOutput ? (
        <>
          <p className="under-hood-pipeline-bridge">{output.explain}</p>
          <FlowNodeBox node={packetNode} phaseStep={output.step} phaseTitle={output.title} />
          <FlowArrow />
          <FlowNodeBox node={uiNode} />
          <FlowArrow />
          <FlowNodeBox node={geminiNode} />

          <div className="under-hood-pipeline-roadmap-divider">
            <span>{run.title}</span>
          </div>
          <p className="under-hood-pipeline-bridge">{run.explain}</p>
          <FlowNodeBox node={run.nodes[0]} phaseStep={run.step} phaseTitle="Extension" />
        </>
      ) : null}
    </div>
  );
}
