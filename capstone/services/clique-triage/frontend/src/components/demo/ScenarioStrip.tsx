import { SCENARIO } from "../../demo/presentationNarrative";

export function ScenarioStrip() {
  return (
    <div className="scenario-strip presentation-card">
      <p className="scenario-strip-label">Scenario</p>
      <p className="scenario-strip-headline">{SCENARIO.headline}</p>
      <p className="scenario-strip-error">{SCENARIO.error}</p>
      <p className="scenario-strip-question">{SCENARIO.question}</p>
    </div>
  );
}
