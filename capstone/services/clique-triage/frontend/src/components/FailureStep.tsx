interface FailureStepProps {
  exception: string;
  service: string;
  failureClock: string;
}

export function FailureStep({ exception, service, failureClock }: FailureStepProps) {
  const firstLine = exception.split("\n")[0] ?? exception;

  return (
    <div className="failure-step phase-card">
      <div className="failure-meta">
        <span className="failure-badge">Build failed</span>
        <span className="failure-service">{service}</span>
        <span className="failure-time">{failureClock}</span>
      </div>

      <pre className="failure-log">
        <code>{`[ERROR] Traceback (most recent call last):
  File ".../payment_gateway.py", line 42, in initialize_client
    self.client = VendorClient(..., proxies=...)
${firstLine}`}</code>
      </pre>

      <div className="failure-exception-block">
        <span className="failure-exception-label">Exception</span>
        <span className="failure-exception-text">{firstLine}</span>
      </div>
    </div>
  );
}
