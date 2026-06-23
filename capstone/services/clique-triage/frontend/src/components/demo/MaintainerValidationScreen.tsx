import { highlightPhrases, highlightStyledPhrases } from "../../lib/highlightPhrase";
import { MAINTAINER_QUOTES, MAINTAINER_QUOTE_EMPHASIS } from "../../demo/maintainerResearch";
import {
  MAINTAINER_VALIDATION_FRICTION_PHRASE,
  MAINTAINER_VALIDATION_INTRO,
  MAINTAINER_VALIDATION_RESEARCH_PHRASE,
  MAINTAINER_VALIDATION_SUMMARY,
} from "../../demo/presentationNarrative";
import { PresentationShell } from "./PresentationShell";

interface MaintainerValidationScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function MaintainerValidationScreen({ onBack, onNext }: MaintainerValidationScreenProps) {
  return (
    <PresentationShell step="maintainer-validation" onBack={onBack} onNext={onNext}>
      <p className="intro-story-paragraph presentation-card">{MAINTAINER_VALIDATION_INTRO}</p>

      <div className="research-quote-grid">
        {MAINTAINER_QUOTES.map((maintainer) => (
          <article key={maintainer.name} className="approach-quote-card">
            <h3 className="approach-quote-name">{maintainer.name}</h3>
            <p className="approach-quote-title">{maintainer.title}</p>
            <div className="approach-quote-blocks">
              {maintainer.quotes.map((quote) => (
                <blockquote key={quote} className="approach-quote-text">
                  {MAINTAINER_QUOTE_EMPHASIS[quote]
                    ? highlightPhrases(quote, MAINTAINER_QUOTE_EMPHASIS[quote])
                    : quote}
                </blockquote>
              ))}
            </div>
          </article>
        ))}
      </div>

      <section className="presentation-card maintainer-validation-summary">
        {MAINTAINER_VALIDATION_SUMMARY.map((paragraph) => (
          <p key={paragraph} className="intro-story-paragraph">
            {paragraph.includes(MAINTAINER_VALIDATION_RESEARCH_PHRASE)
              ? highlightStyledPhrases(paragraph, [
                  { phrase: MAINTAINER_VALIDATION_FRICTION_PHRASE },
                  { phrase: MAINTAINER_VALIDATION_RESEARCH_PHRASE, variant: "underline" },
                ])
              : paragraph.includes(MAINTAINER_VALIDATION_FRICTION_PHRASE)
                ? highlightPhrases(paragraph, [MAINTAINER_VALIDATION_FRICTION_PHRASE])
                : paragraph}
          </p>
        ))}
      </section>
    </PresentationShell>
  );
}
