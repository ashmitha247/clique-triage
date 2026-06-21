import type { ReactNode } from "react";

interface FlowZoneProps {
  label: string;
  caption?: string;
  variant?: "in-repo" | "outside-repo";
  children: ReactNode;
}

export function FlowZone({ label, caption, variant = "in-repo", children }: FlowZoneProps) {
  return (
    <div className={`flow-zone flow-zone-${variant}`}>
      <p className="flow-zone-label">{label}</p>
      {caption && <p className="flow-zone-caption">{caption}</p>}
      <div className="flow-zone-body">{children}</div>
    </div>
  );
}
