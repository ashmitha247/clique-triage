import {
  OUTCOME_ITEMS,
  OUTCOME_SUBLINE,
  OUTCOME_TAGLINE,
  OUTCOME_TITLE,
} from "../../demo/presentationNarrative";

export function OutcomeCard() {
  return (
    <section className="outcome-card presentation-card">
      <h3 className="outcome-card-title">{OUTCOME_TITLE}</h3>
      <p className="outcome-card-tagline">{OUTCOME_TAGLINE}</p>
      <ul className="outcome-card-list">
        {OUTCOME_ITEMS.map((item, index) => (
          <li key={item.label} className="outcome-card-item">
            <span className="outcome-card-index" aria-hidden>
              {index + 1}
            </span>
            <div>
              <p className="outcome-card-label">{item.label}</p>
              <p className="outcome-card-detail">{item.detail}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="outcome-card-subline">{OUTCOME_SUBLINE}</p>
    </section>
  );
}
