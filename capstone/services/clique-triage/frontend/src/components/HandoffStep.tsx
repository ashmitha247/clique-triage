interface HandoffStepProps {
  leadPrimary: string;
  primaryLeadUrl?: string;
  onRestart: () => void;
}

export function HandoffStep({ leadPrimary, primaryLeadUrl, onRestart }: HandoffStepProps) {
  return (
    <div className="handoff-screen">
      <ProductAtmosphereWrapper />
      <div className="handoff-card phase-card phase-card-glow">
        <h2 className="handoff-title">What you'd do next</h2>
        <p className="handoff-lede">
          Clique narrowed the search. From here you'd investigate manually — check the release,
          read matching issues, verify the dependency change. AI can help once you know where to
          look; Clique's job was narrowing that search.
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
          <li>Verify whether that dependency change explains the failure — then fix in your editor</li>
        </ol>
      </div>

      <button type="button" className="btn-primary btn-restart" onClick={onRestart}>
        Restart demo
      </button>
    </div>
  );
}

function ProductAtmosphereWrapper() {
  return (
    <div className="product-atmosphere product-atmosphere-handoff" aria-hidden>
      <div className="product-atmosphere-grid" />
    </div>
  );
}
