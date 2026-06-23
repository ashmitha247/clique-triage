import { PresentationShell } from "./PresentationShell";
import { TechnicalEngineDiagram } from "./TechnicalEngineDiagram";

interface TechnicalArchitectureScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function TechnicalArchitectureScreen({ onBack, onNext }: TechnicalArchitectureScreenProps) {
  return (
    <PresentationShell
      step="technical-architecture"
      canvasClassName="presentation-canvas-engine-diagram"
      onBack={onBack}
      onNext={onNext}
    >
      <TechnicalEngineDiagram />
    </PresentationShell>
  );
}
