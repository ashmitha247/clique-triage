import { DemoSectionShell } from "./DemoSectionShell";
import { PrChecksFailedScene } from "./product-story/PrChecksFailedScene";

interface DemoPrFailureScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function DemoPrFailureScreen({ onBack, onNext }: DemoPrFailureScreenProps) {
  return (
    <DemoSectionShell step="demo-pr-failure" onBack={onBack} onNext={onNext}>
      <div className="demo-story-mock-wrap">
        <PrChecksFailedScene />
      </div>
    </DemoSectionShell>
  );
}
