import {
  DEMO_BOT_EXPLAIN,
  DEMO_SCENARIO_A_INPUT,
  DEMO_SCENARIO_A_INPUT_LABEL,
  DEMO_SCENARIO_A_SUMMARY,
  DEMO_SCENARIO_A_TITLE,
  DEMO_SCENARIO_B_DETAIL,
  DEMO_SCENARIO_B_SUMMARY,
  DEMO_SCENARIO_B_TITLE,
  DEMO_SCENARIO_INTRO_HEADING,
} from "../../demo/presentationNarrative";
import { BuildStatusChip } from "./product-story/BuildStatusChip";

export function DemoScenarioIntroContent() {
  return (
    <div className="demo-scenario-intro presentation-card">
      <h3 className="demo-scenario-intro-heading">{DEMO_SCENARIO_INTRO_HEADING}</h3>
      <p className="demo-scenario-intro-summary">{DEMO_SCENARIO_A_SUMMARY}</p>
      <p className="demo-scenario-intro-summary">{DEMO_SCENARIO_B_SUMMARY}</p>

      <div className="demo-scenario-intro-legend">
        <BuildStatusChip status="built" />
        <BuildStatusChip status="mocked" />
        <BuildStatusChip status="roadmap" />
      </div>

      <section className="demo-scenario-intro-block demo-scenario-panel-a">
        <h4 className="demo-scenario-intro-block-title">{DEMO_SCENARIO_A_TITLE}</h4>
        <p className="demo-scenario-intro-block-label">{DEMO_SCENARIO_A_INPUT_LABEL}</p>
        <pre className="demo-scenario-input">{DEMO_SCENARIO_A_INPUT}</pre>
      </section>

      <section className="demo-scenario-intro-block demo-scenario-panel-b">
        <h4 className="demo-scenario-intro-block-title">{DEMO_SCENARIO_B_TITLE}</h4>
        <p className="demo-scenario-intro-block-detail">{DEMO_SCENARIO_B_DETAIL}</p>
      </section>

      <p className="demo-scenario-bot-note">{DEMO_BOT_EXPLAIN}</p>
    </div>
  );
}
