import { DemoSectionShell } from "./DemoSectionShell";
import { ProcessingPipelineDiagram } from "./product-story/ProcessingPipelineDiagram";

interface DemoProcessingPipelineScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function DemoProcessingPipelineScreen({ onBack, onNext }: DemoProcessingPipelineScreenProps) {
  return (
    <DemoSectionShell step="demo-processing-pipeline" onBack={onBack} onNext={onNext}>
      <ProcessingPipelineDiagram />
    </DemoSectionShell>
  );
}
