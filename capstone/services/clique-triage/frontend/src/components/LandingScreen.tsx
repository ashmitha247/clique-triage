interface LandingScreenProps {
  onStart: () => void;
}

export function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <div className="landing-screen">
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
        <div className="landing-flow-arrow" aria-hidden>
          →
        </div>
        <div className="landing-flow-item">
          <span className="landing-flow-icon">2</span>
          <span className="landing-flow-label">Eliminate</span>
          <span className="landing-flow-desc">Cross out what doesn't matter</span>
        </div>
        <div className="landing-flow-arrow" aria-hidden>
          →
        </div>
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
  );
}
