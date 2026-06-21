interface HandoffStepProps {
  leadPrimary: string;
  primaryLeadUrl?: string;
  onRestart: () => void;
}

export function HandoffStep({ leadPrimary, primaryLeadUrl, onRestart }: HandoffStepProps) {
  return (
    <div className="handoff-screen">
      <div className="handoff-card phase-card">
        <h2 className="handoff-title">What you'd do next</h2>
        <p className="handoff-lede">
          Clique narrowed the search space. A developer would now investigate manually — or hand
          the ranked lead to Cursor.
        </p>

        <ol className="handoff-checklist">
          <li>
            Open <strong>{leadPrimary}</strong> release notes and changelog
          </li>
          <li>
            {primaryLeadUrl ? (
              <>
                Read{" "}
                <a href={primaryLeadUrl} target="_blank" rel="noreferrer">
                  the matching GitHub issue
                </a>{" "}
                for community context
              </>
            ) : (
              <>Check matching GitHub issues for community context</>
            )}
          </li>
          <li>
            Paste the investigation lead into Cursor: <em>"How do I fix this given the dependency
            change?"</em>
          </li>
        </ol>
      </div>

      <button type="button" className="btn-primary btn-restart" onClick={onRestart}>
        Restart demo
      </button>
    </div>
  );
}
