import {
  ORIGIN_EMPIRICAL_PAPERS_PHRASE,
  ORIGIN_STORY,
  WEB_RESEARCH_FINDINGS,
} from "../../demo/presentationNarrative";
import { underlinePhrase } from "../../lib/highlightPhrase";
import { AnimatedFlowArrow } from "./AnimatedFlowArrow";
import { PresentationShell } from "./PresentationShell";

interface OriginScreenProps {
  onNext: () => void;
}

export function OriginScreen({ onNext }: OriginScreenProps) {
  return (
    <PresentationShell step="origin" onNext={onNext} showBack={false}>
      <section className="intro-story presentation-card">
        {ORIGIN_STORY.map((paragraph) => (
          <p key={paragraph} className="intro-story-paragraph">
            {underlinePhrase(paragraph, ORIGIN_EMPIRICAL_PAPERS_PHRASE)}
          </p>
        ))}
      </section>

      <div className="origin-papers-connector" aria-hidden>
        <AnimatedFlowArrow delay={0} />
      </div>

      <h3 className="niche-spec-title">Papers and stats</h3>
      <div className="research-citation-grid">
        {WEB_RESEARCH_FINDINGS.map((item) => (
          <article key={item.source} className="research-citation-card presentation-card">
            <p className="research-citation-headline">{item.headline}</p>
            <p className="research-citation-finding">{item.finding}</p>
            <p className="research-citation-source">
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.source}
              </a>
            </p>
            <p className="research-citation-use">{item.use}</p>
          </article>
        ))}
      </div>
    </PresentationShell>
  );
}
