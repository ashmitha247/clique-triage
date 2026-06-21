import { TODAY_BRANCH_SOURCES } from "../../demo/approachContent";
import {
  FLOW_AI_CAPTION,
  FLOW_BRANCH_CAPTION,
  FLOW_ZONE_IN_REPO,
  FLOW_ZONE_OUTSIDE,
} from "../../demo/presentationNarrative";
import { AnimatedFlowArrow } from "./AnimatedFlowArrow";
import { FlowZone } from "./FlowZone";

function FlowNode({
  label,
  variant,
  subcaption,
}: {
  label: string;
  variant?: "start" | "cursor" | "end" | "default";
  subcaption?: string;
}) {
  return (
    <div className="today-flow-node-wrap">
      <div className={`today-flow-node${variant ? ` today-flow-node-${variant}` : ""}`}>{label}</div>
      {subcaption && <p className="today-flow-node-subcaption">{subcaption}</p>}
    </div>
  );
}

export function MessyInvestigationFlow() {
  return (
    <div className="today-flow today-flow-messy">
      <FlowNode label="Build Failure" variant="start" />
      <AnimatedFlowArrow delay={0} />

      <FlowZone label={FLOW_ZONE_IN_REPO} variant="in-repo">
        <FlowNode label="Read log · Ask AI" variant="cursor" subcaption={FLOW_AI_CAPTION} />
      </FlowZone>

      <AnimatedFlowArrow delay={0.15} />

      <FlowZone label={FLOW_ZONE_OUTSIDE} caption={FLOW_BRANCH_CAPTION} variant="outside-repo">
        <div className="today-flow-branches">
          {TODAY_BRANCH_SOURCES.map((source) => (
            <div key={source} className="today-branch-item">
              <span className="today-branch-stem" aria-hidden />
              <span className="today-branch-label">{source}</span>
            </div>
          ))}
        </div>
      </FlowZone>

      <AnimatedFlowArrow delay={0.3} />
      <FlowNode label="Build Hypothesis" />
      <AnimatedFlowArrow delay={0.45} />
      <FlowNode label="Begin Debugging" variant="end" subcaption="Back in your editor" />
    </div>
  );
}
