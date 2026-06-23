import {
  ORIGIN_RESEARCH_HIGHLIGHT,
  ORIGIN_RESEARCH_NICHE_PHRASE,
  ORIGIN_RESEARCH_SUGGESTED,
} from "../../demo/presentationNarrative";
import { highlightPhrase, highlightPhrases } from "../../lib/highlightPhrase";
import { PresentationShell } from "./PresentationShell";

interface WebResearchScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function WebResearchScreen({ onBack, onNext }: WebResearchScreenProps) {
  return (
    <PresentationShell step="web-research" onBack={onBack} onNext={onNext}>
      <section className="intro-story presentation-card">
        {ORIGIN_RESEARCH_SUGGESTED.map((paragraph, index) => (
          <p key={paragraph} className="intro-story-paragraph">
            {index === 0
              ? highlightPhrase(paragraph, ORIGIN_RESEARCH_HIGHLIGHT)
              : paragraph.includes(ORIGIN_RESEARCH_NICHE_PHRASE)
                ? highlightPhrases(paragraph, [ORIGIN_RESEARCH_NICHE_PHRASE])
                : paragraph}
          </p>
        ))}
      </section>
    </PresentationShell>
  );
}
