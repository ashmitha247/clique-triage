import {
  SETUP_FOOTER,
  SETUP_IN_REPO_STEPS,
  SETUP_IN_REPO_TITLE,
  SETUP_TODAY_STEPS,
  SETUP_TODAY_TITLE,
} from "../../demo/presentationNarrative";

function SetupBlock({
  title,
  steps,
  variant,
}: {
  title: string;
  steps: readonly { step: string; title: string; detail: string }[];
  variant: "today" | "repo";
}) {
  return (
    <div className={`setup-block setup-block-${variant}`}>
      <h4 className="setup-block-title">{title}</h4>
      <ol className="roadmap-strip-list">
        {steps.map((item) => (
          <li key={item.step} className="roadmap-strip-item">
            <span className="roadmap-strip-step">{item.step}</span>
            <div>
              <p className="roadmap-strip-item-title">{item.title}</p>
              <p className="roadmap-strip-item-detail">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function SetupInRepoStrip() {
  return (
    <section className="setup-strip presentation-card">
      <h3 className="setup-strip-heading">How you'd use Clique in a repo</h3>
      <SetupBlock title={SETUP_TODAY_TITLE} steps={SETUP_TODAY_STEPS} variant="today" />
      <SetupBlock title={SETUP_IN_REPO_TITLE} steps={SETUP_IN_REPO_STEPS} variant="repo" />
      <p className="setup-strip-footer">{SETUP_FOOTER}</p>
    </section>
  );
}
