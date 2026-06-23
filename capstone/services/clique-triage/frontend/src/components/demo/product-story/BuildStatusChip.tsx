import type { BuildStatus } from "../../../demo/presentationNarrative";
import { BUILD_STATUS_LABELS } from "../../../demo/presentationNarrative";

interface BuildStatusChipProps {
  status: BuildStatus | "built" | "working";
  className?: string;
}

const CHIP_CLASS: Record<BuildStatus | "built" | "working", string> = {
  working: "build-status-chip-built",
  built: "build-status-chip-built",
  mocked: "build-status-chip-mock",
  partial: "build-status-chip-partial",
  roadmap: "build-status-chip-roadmap",
};

const CHIP_LABEL: Record<BuildStatus | "built" | "working", string> = {
  working: "BUILT",
  built: "BUILT",
  mocked: "MOCK DATA",
  partial: BUILD_STATUS_LABELS.partial,
  roadmap: "ROADMAP",
};

export function BuildStatusChip({ status, className }: BuildStatusChipProps) {
  return (
    <span className={`build-status-chip ${CHIP_CLASS[status]}${className ? ` ${className}` : ""}`}>
      {CHIP_LABEL[status]}
    </span>
  );
}
