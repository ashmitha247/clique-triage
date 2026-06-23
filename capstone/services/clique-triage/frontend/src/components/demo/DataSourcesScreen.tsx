import { PresentationShell } from "./PresentationShell";
import { EvidenceSourcesTable } from "./EvidenceSourcesTable";
import { PacketRationaleTable } from "./PacketRationaleTable";

interface DataSourcesScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function DataSourcesScreen({ onBack, onNext }: DataSourcesScreenProps) {
  return (
    <PresentationShell step="data-sources" onBack={onBack} onNext={onNext}>
      <EvidenceSourcesTable />
      <PacketRationaleTable />
    </PresentationShell>
  );
}
