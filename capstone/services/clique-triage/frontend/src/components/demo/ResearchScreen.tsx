import { MAINTAINER_QUOTES } from "../../demo/maintainerResearch";
import {
  AJEET_AI_CALLOUT,
  AJEET_AI_QUOTE,
  AI_COMPLEMENT_RESEARCH,
  RESEARCH_PAIN_CALLOUT,
  RESEARCH_SUBTITLE,
} from "../../demo/presentationNarrative";
import { CursorContextCallout } from "./CursorContextCallout";
import { PresentationShell } from "./PresentationShell";
import { ScenarioStrip } from "./ScenarioStrip";

interface ResearchScreenProps {
  onNext: () => void;
}

export function ResearchScreen({ onNext }: ResearchScreenProps) {
  return (
    <PresentationShell
      act="research"
      title="Research Insights"
      subtitle={RESEARCH_SUBTITLE}
      onNext={onNext}
      nextLabel="Next: Today's Workflow"
      showBack={false}
    >
      <ScenarioStrip />
      <CursorContextCallout
        title={AI_COMPLEMENT_RESEARCH.title}
        body={AI_COMPLEMENT_RESEARCH.body}
      />

      <div className="research-quote-grid">
        {MAINTAINER_QUOTES.map((maintainer) => (
          <article key={maintainer.name} className="approach-quote-card">
            <h3 className="approach-quote-name">{maintainer.name}</h3>
            <p className="approach-quote-title">{maintainer.title}</p>
            <div className="approach-quote-blocks">
              {maintainer.quotes.map((quote) => (
                <blockquote key={quote} className="approach-quote-text">
                  {quote}
                </blockquote>
              ))}
            </div>

            {maintainer.name === "Ajeet" && (
              <div className="cursor-callout">
                <p className="cursor-callout-label">{AJEET_AI_CALLOUT}</p>
                <p className="cursor-callout-quote">"{AJEET_AI_QUOTE}"</p>
              </div>
            )}

            {maintainer.insightBullets && (
              <div className="approach-research-insight">
                <p className="approach-research-insight-label">Research Insight</p>
                <ul>
                  {maintainer.insightBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        ))}
      </div>

      <section className="pain-callout presentation-card">
        <p className="pain-callout-text">{RESEARCH_PAIN_CALLOUT}</p>
      </section>
    </PresentationShell>
  );
}
