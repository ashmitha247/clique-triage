import {
  ROADMAP_FOOTER,
  ROADMAP_STEPS,
  ROADMAP_TITLE,
} from "../../demo/presentationNarrative";

export function RoadmapStrip() {
  return (
    <section className="roadmap-strip presentation-card">
      <h3 className="roadmap-strip-title">{ROADMAP_TITLE}</h3>
      <ol className="roadmap-strip-list">
        {ROADMAP_STEPS.map((item) => (
          <li key={item.step} className="roadmap-strip-item">
            <span className="roadmap-strip-step">{item.step}</span>
            <div>
              <p className="roadmap-strip-item-title">{item.title}</p>
              <p className="roadmap-strip-item-detail">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="roadmap-strip-footer">{ROADMAP_FOOTER}</p>
    </section>
  );
}
