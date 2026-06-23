import { BuildStatusTable } from "./BuildStatusTable";
import { DemoSectionShell } from "./DemoSectionShell";

interface DemoBuildStatusScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function DemoBuildStatusScreen({ onBack, onNext }: DemoBuildStatusScreenProps) {
  return (
    <DemoSectionShell step="demo-build-status" onBack={onBack} onNext={onNext}>
      <BuildStatusTable />
    </DemoSectionShell>
  );
}
