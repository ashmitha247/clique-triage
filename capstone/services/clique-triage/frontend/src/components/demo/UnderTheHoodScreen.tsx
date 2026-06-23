import {
  UNDER_THE_HOOD_PAPER_BODY,
  UNDER_THE_HOOD_PAPER_HEADLINE,
  UNDER_THE_HOOD_PHASES,
} from "../../demo/presentationNarrative";
import { PresentationShell } from "./PresentationShell";
import { UnderTheHoodFlow } from "./UnderTheHoodFlow";

interface UnderTheHoodScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function UnderTheHoodScreen({ onBack, onNext }: UnderTheHoodScreenProps) {
  return (
    <PresentationShell step="under-the-hood" canvasClassName="presentation-canvas-under-hood" onBack={onBack} onNext={onNext}>
      <blockquote className="presentation-card under-hood-paper-anchor">
        <p className="under-hood-paper-headline">{UNDER_THE_HOOD_PAPER_HEADLINE}</p>
        <p className="under-hood-paper-text">{UNDER_THE_HOOD_PAPER_BODY}</p>
      </blockquote>

      <UnderTheHoodFlow phases={UNDER_THE_HOOD_PHASES} />
    </PresentationShell>
  );
}
