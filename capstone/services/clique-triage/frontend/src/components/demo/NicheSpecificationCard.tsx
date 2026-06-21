import {
  NICHE_SKIP_LINE,
  NICHE_SPEC_BULLETS,
  NICHE_SPEC_TITLE,
} from "../../demo/presentationNarrative";

export function NicheSpecificationCard() {
  return (
    <div className="niche-spec-card presentation-card niche-spec-card-compact">
      <h3 className="niche-spec-title">{NICHE_SPEC_TITLE}</h3>
      <ul className="niche-spec-list">
        {NICHE_SPEC_BULLETS.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <p className="niche-spec-skip">{NICHE_SKIP_LINE}</p>
    </div>
  );
}
