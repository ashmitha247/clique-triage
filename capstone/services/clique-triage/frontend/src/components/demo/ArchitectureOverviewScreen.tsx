import { ArchitectureOverviewDiagram } from "./ArchitectureOverviewDiagram";
import { PresentationShell } from "./PresentationShell";

interface ArchitectureOverviewScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function ArchitectureOverviewScreen({ onBack, onNext }: ArchitectureOverviewScreenProps) {
  return (
    <PresentationShell
      step="architecture-overview"
      canvasClassName="presentation-canvas-engine-diagram"
      onBack={onBack}
      onNext={onNext}
    >
      <ArchitectureOverviewDiagram />
    </PresentationShell>
  );
}
