import { CliqueApproachFlow } from "./CliqueApproachFlow";
import { ApproachPlainFraming } from "./ApproachPlainFraming";
import { PresentationShell } from "./PresentationShell";

interface ApproachPlainScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function ApproachPlainScreen({ onBack, onNext }: ApproachPlainScreenProps) {
  return (
    <PresentationShell step="approach-plain" onBack={onBack} onNext={onNext}>
      <CliqueApproachFlow />
      <ApproachPlainFraming />
    </PresentationShell>
  );
}
