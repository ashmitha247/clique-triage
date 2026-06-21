import type { InvestigationLead } from "../types/workspace";

interface InvestigationLeadStepProps {
  lead: InvestigationLead;
  primaryLeadUrl?: string;
}

export function InvestigationLeadStep({ lead, primaryLeadUrl }: InvestigationLeadStepProps) {
  return (
    <div className="investigation-lead-step phase-card investigation-lead-glow">
      <div className="investigation-lead-label">Most likely investigation lead</div>
      <div className="investigation-lead-primary">{lead.primary}</div>

      <div className="investigation-lead-supporting">
        <div className="investigation-lead-supporting-title">Supporting evidence</div>
        <ul className="investigation-lead-list">
          {lead.supporting.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {primaryLeadUrl && (
        <a className="investigation-lead-link" href={primaryLeadUrl} target="_blank" rel="noreferrer">
          View community report →
        </a>
      )}

      <p className="investigation-lead-note">
        This is where we'd spend the next 15 minutes — not a confirmed root cause.
      </p>
    </div>
  );
}
