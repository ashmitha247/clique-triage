import { PresentationShell } from "./PresentationShell";
import { ValueBeyondLLMFraming } from "./ValueBeyondLLMFraming";

interface ValueBeyondLLMScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function ValueBeyondLLMScreen({ onBack, onNext }: ValueBeyondLLMScreenProps) {
  return (
    <PresentationShell step="value-beyond-llm" onBack={onBack} onNext={onNext}>
      <ValueBeyondLLMFraming />
    </PresentationShell>
  );
}
