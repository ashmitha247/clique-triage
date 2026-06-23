import type { TransformedWorkspace } from "../../types/workspace";
import { DemoSectionShell } from "./DemoSectionShell";
import { CursorMcpHandoffScene } from "./product-story/CursorMcpHandoffScene";

interface DemoCursorHandoffScreenProps {
  data: TransformedWorkspace;
  onBack: () => void;
  onNext: () => void;
}

export function DemoCursorHandoffScreen({ data, onBack, onNext }: DemoCursorHandoffScreenProps) {
  return (
    <DemoSectionShell step="demo-cursor-handoff" onBack={onBack} onNext={onNext}>
      <CursorMcpHandoffScene
        leadPrimary={data.investigationLead.primary}
        supporting={data.investigationLead.supporting}
        examinedCount={data.evidenceSummary.examinedCount}
        discardedCount={data.discarded.length}
      />
    </DemoSectionShell>
  );
}
