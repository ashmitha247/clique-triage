interface TriggerScreenProps {
  exception: string;
  onBegin: () => void;
}

export function TriggerScreen({ exception, onBegin }: TriggerScreenProps) {
  const lines = exception.split("\n");

  return (
    <div className="trigger-minimal phase-card">
      <div className="trigger-status">Build Failed</div>
      <div className="trigger-exception">
        {lines.map((line) => (
          <span key={line} className="trigger-exception-line">
            {line}
          </span>
        ))}
      </div>
      <button type="button" className="btn-investigate" onClick={onBegin}>
        Investigate
      </button>
    </div>
  );
}
