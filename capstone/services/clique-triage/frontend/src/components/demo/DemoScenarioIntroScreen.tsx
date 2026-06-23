import { DemoScenarioIntroContent } from "./DemoScenarioIntroContent";
import { DemoSectionShell } from "./DemoSectionShell";

interface DemoScenarioIntroScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function DemoScenarioIntroScreen({ onBack, onNext }: DemoScenarioIntroScreenProps) {
  return (
    <DemoSectionShell step="demo-scenario-intro" onBack={onBack} onNext={onNext}>
      <DemoScenarioIntroContent />
    </DemoSectionShell>
  );
}
