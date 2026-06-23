import {
  LANDING_DEMO_BRIDGE,
  LANDING_DEMO_HEADLINE,
  LANDING_DEMO_LINE,
} from "../demo/presentationNarrative";
import { AnimatedFlowArrow } from "./demo/AnimatedFlowArrow";
import { ScenarioStrip } from "./demo/ScenarioStrip";

interface LandingScreenProps {
  onStart: () => void;
  demoMode?: boolean;
}

export function LandingScreen({ onStart, demoMode = false }: LandingScreenProps) {
  if (demoMode) {
    return (
      <div className="landing-demo-bridge-shell">
        <header className="landing-demo-topbar">
          <span className="landing-demo-brand">Clique</span>
          <nav className="landing-demo-acts" aria-label="Presentation section">
            {["Problem", "Under-the-hood", "Sources", "vs LLM", "Architecture", "Demo"].map((label) => (
              <span
                key={label}
                className={`landing-demo-act${label === "Demo" ? " landing-demo-act-active" : ""}`}
              >
                {label}
              </span>
            ))}
          </nav>
        </header>

        <p className="landing-act-label">Huda POV demo</p>
        <h1 className="landing-demo-headline">{LANDING_DEMO_HEADLINE}</h1>
        <p className="landing-demo-bridge">{LANDING_DEMO_BRIDGE}</p>
        <p className="landing-demo-line">{LANDING_DEMO_LINE}</p>

        <ScenarioStrip />

        <div className="landing-flow landing-flow-demo">
          <div className="landing-flow-item">
            <span className="landing-flow-icon">1</span>
            <span className="landing-flow-label">Gather</span>
            <span className="landing-flow-desc">External dependency signals from 4 sources</span>
          </div>
          <AnimatedFlowArrow direction="horizontal" delay={0} />
          <div className="landing-flow-item">
            <span className="landing-flow-icon">2</span>
            <span className="landing-flow-label">Eliminate</span>
            <span className="landing-flow-desc">Cross out what doesn't matter</span>
          </div>
          <AnimatedFlowArrow direction="horizontal" delay={0.2} />
          <div className="landing-flow-item">
            <span className="landing-flow-icon">3</span>
            <span className="landing-flow-label">Rank</span>
            <span className="landing-flow-desc">Get an investigation lead</span>
          </div>
        </div>

        <button type="button" className="btn-primary btn-start landing-demo-start" onClick={onStart}>
          Start investigation
        </button>

        <p className="landing-note landing-demo-note">
          Interactive demo · pause on step 3 — elimination panel
        </p>
      </div>
    );
  }

  return (
    <div className="landing-screen landing-product-shell">
      <div className="product-atmosphere product-atmosphere-landing" aria-hidden>
        <div className="product-atmosphere-grid" />
      </div>
      <div className="landing-screen-inner">
      <div className="landing-brand">
        <span className="landing-logo">Clique</span>
        <span className="landing-tagline">Investigation Triage</span>
      </div>

      <h1 className="landing-headline">Know what to investigate first</h1>

      <p className="landing-lede">
        When CI fails, you jump between logs, git history, release notes, and GitHub issues before
        you know where to look. Clique gathers that evidence, rules out noise, and ranks what
        survives.
      </p>

      <div className="landing-flow">
        <div className="landing-flow-item">
          <span className="landing-flow-icon">1</span>
          <span className="landing-flow-label">Gather</span>
          <span className="landing-flow-desc">Pull signals from 4 sources</span>
        </div>
        <AnimatedFlowArrow direction="horizontal" delay={0} />
        <div className="landing-flow-item">
          <span className="landing-flow-icon">2</span>
          <span className="landing-flow-label">Eliminate</span>
          <span className="landing-flow-desc">Cross out what doesn't matter</span>
        </div>
        <AnimatedFlowArrow direction="horizontal" delay={0.2} />
        <div className="landing-flow-item">
          <span className="landing-flow-icon">3</span>
          <span className="landing-flow-label">Rank</span>
          <span className="landing-flow-desc">Get an investigation lead</span>
        </div>
      </div>

      <button type="button" className="btn-primary btn-start" onClick={onStart}>
        Start investigation
      </button>

      <p className="landing-note">Interactive demo · click Next to walk through a real failure scenario</p>
      </div>
    </div>
  );
}
