import {
  HUDA_LIKE_REPOS_BULLETS,
  HUDA_LIKE_REPOS_TITLE,
  INTRO_AI_LINE,
  INTRO_BUILD,
  INTRO_HEADLINE,
  INTRO_MAINTAINERS,
  INTRO_NICHE_NOTE,
  INTRO_ORIGIN,
  INTRO_SUBTITLE,
  INTRO_VALIDATION,
  NICHE_SPEC_BULLETS,
  NICHE_SPEC_TITLE,
  NICHE_SKIP_LINE,
} from "../../demo/presentationNarrative";
import { PresentationShell } from "./PresentationShell";
import { ScenarioStrip } from "./ScenarioStrip";

interface IntroScreenProps {
  onNext: () => void;
}

export function IntroScreen({ onNext }: IntroScreenProps) {
  return (
    <PresentationShell
      act="intro"
      title={INTRO_HEADLINE}
      subtitle={INTRO_SUBTITLE}
      onNext={onNext}
      nextLabel="Next: Research Insights"
      showBack={false}
    >
      <section className="intro-story presentation-card">
        <p className="intro-story-paragraph">{INTRO_ORIGIN}</p>
        <p className="intro-story-paragraph">{INTRO_BUILD}</p>
        <p className="intro-story-paragraph intro-story-emphasis">{INTRO_VALIDATION}</p>
      </section>

      <section className="niche-spec-card presentation-card">
        <h3 className="niche-spec-title">{NICHE_SPEC_TITLE}</h3>
        <ul className="niche-spec-list">
          {NICHE_SPEC_BULLETS.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <p className="niche-spec-skip">{NICHE_SKIP_LINE}</p>
      </section>

      <section className="niche-spec-card presentation-card huda-like-repos">
        <h3 className="niche-spec-title">{HUDA_LIKE_REPOS_TITLE}</h3>
        <ul className="niche-spec-list">
          {HUDA_LIKE_REPOS_BULLETS.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <p className="intro-niche-note">{INTRO_NICHE_NOTE}</p>
      </section>

      <section className="intro-maintainers">
        <h3 className="intro-maintainers-heading">Who I talked to</h3>
        <div className="intro-maintainer-grid">
          {INTRO_MAINTAINERS.map((m) => (
            <article key={m.name} className="intro-maintainer-card presentation-card">
              <h4 className="intro-maintainer-name">{m.name}</h4>
              <p className="intro-maintainer-role">{m.role}</p>
              <p className="intro-maintainer-note">{m.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="intro-cursor-line presentation-card">
        <p className="intro-cursor-text">{INTRO_AI_LINE}</p>
      </section>

      <ScenarioStrip />
    </PresentationShell>
  );
}
