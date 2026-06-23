import type { TransformedWorkspace } from "../../types/workspace";
import { DemoSectionShell } from "./DemoSectionShell";
import { CliquePacketCommentScene } from "./product-story/CliquePacketCommentScene";

interface DemoPacketDeliveryScreenProps {
  data: TransformedWorkspace;
  onBack: () => void;
  onNext: () => void;
}

export function DemoPacketDeliveryScreen({ data, onBack, onNext }: DemoPacketDeliveryScreenProps) {
  return (
    <DemoSectionShell step="demo-packet-delivery" onBack={onBack} onNext={onNext}>
      <div className="demo-story-mock-wrap">
        <CliquePacketCommentScene
          leadPrimary={data.investigationLead.primary}
          supporting={data.investigationLead.supporting}
          examinedCount={data.evidenceSummary.examinedCount}
          discardedCount={data.discarded.length}
        />
      </div>
    </DemoSectionShell>
  );
}
