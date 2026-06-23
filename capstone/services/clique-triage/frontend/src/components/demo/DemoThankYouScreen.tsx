import { DEMO_THANK_YOU_TITLE } from "../../demo/presentationNarrative";
import { DemoSectionShell } from "./DemoSectionShell";

interface DemoThankYouScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function DemoThankYouScreen({ onBack, onNext }: DemoThankYouScreenProps) {
  return (
    <DemoSectionShell step="demo-thank-you" onBack={onBack} onNext={onNext} hideStepHeader>
      <div className="demo-thank-you-hero">
        <h2 className="demo-thank-you-heading">{DEMO_THANK_YOU_TITLE}</h2>
      </div>
    </DemoSectionShell>
  );
}
