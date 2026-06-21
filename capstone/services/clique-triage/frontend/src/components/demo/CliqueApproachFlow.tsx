import { CLIQUE_REPORT_BULLETS } from "../../demo/approachContent";
import { AnimatedFlowArrow } from "./AnimatedFlowArrow";

function FlowNode({ label, variant }: { label: string; variant?: "start" | "clique" | "end" | "default" }) {
  return (
    <div className={`today-flow-node${variant ? ` today-flow-node-${variant}` : ""}`}>{label}</div>
  );
}

export function CliqueApproachFlow() {
  return (
    <div className="today-flow today-flow-clean">
      <FlowNode label="Build Failure" variant="start" />
      <AnimatedFlowArrow delay={0} />
      <FlowNode label="Clique" variant="clique" />
      <AnimatedFlowArrow delay={0.15} />
      <div className="clique-report-node">
        <div className="today-flow-node today-flow-node-report">Investigation Report</div>
        <ul className="clique-report-bullets">
          {CLIQUE_REPORT_BULLETS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <AnimatedFlowArrow delay={0.3} />
      <FlowNode label="Begin Debugging" variant="end" />
    </div>
  );
}
