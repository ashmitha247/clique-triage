import {
  LIMITATIONS_BUILT,
  LIMITATIONS_MOCKED,
  LIMITATIONS_ROADMAP,
  LIMITATIONS_SCOPE_CLOSE,
  LIMITATIONS_TITLE,
} from "../../demo/presentationNarrative";

interface LimitationsHandoffScreenProps {
  leadPrimary: string;
  primaryLeadUrl?: string;
  onRestart: () => void;
}

export function LimitationsHandoffScreen({
  leadPrimary,
  primaryLeadUrl,
  onRestart,
}: LimitationsHandoffScreenProps) {
  return (
    <div className="handoff-screen limitations-handoff">
      <ProductAtmosphereWrapper />
      <div className="handoff-card phase-card phase-card-glow">
        <p className="roadmap-closing-act">Demo & limitations</p>
        <h2 className="handoff-title">{LIMITATIONS_TITLE}</h2>
        <p className="handoff-lede">
          You just watched the kuberef scenario end-to-end. From the ranked lead ({leadPrimary}), you
          would verify the upstream release and fix in your editor — Clique does not claim root cause.
        </p>

        <div className="limitations-grid">
          <section>
            <h3 className="limitations-heading limitations-built">Built today</h3>
            <ul className="handoff-checklist">
              {LIMITATIONS_BUILT.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="limitations-heading limitations-mocked">Mocked for demo</h3>
            <ul className="handoff-checklist">
              {LIMITATIONS_MOCKED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="limitations-heading limitations-roadmap">Roadmap</h3>
            <ul className="handoff-checklist">
              {LIMITATIONS_ROADMAP.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        {primaryLeadUrl && (
          <p className="limitations-lead-link">
            Verify next:{" "}
            <a href={primaryLeadUrl} target="_blank" rel="noreferrer">
              matching GitHub issue
            </a>
          </p>
        )}

        <p className="roadmap-closing-final">{LIMITATIONS_SCOPE_CLOSE}</p>
      </div>

      <button type="button" className="btn-primary btn-restart" onClick={onRestart}>
        Restart demo
      </button>
    </div>
  );
}

function ProductAtmosphereWrapper() {
  return (
    <div className="product-atmosphere product-atmosphere-handoff" aria-hidden>
      <div className="product-atmosphere-grid" />
    </div>
  );
}
