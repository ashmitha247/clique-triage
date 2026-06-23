import { DEMO_PACKET_MOCK_NOTE } from "../../../demo/presentationNarrative";
import { BuildStatusChip } from "./BuildStatusChip";
import { GitHubChromeShell } from "./GitHubChromeShell";

export interface PacketPreviewProps {
  leadPrimary: string;
  supporting: string[];
  examinedCount: number;
  discardedCount: number;
}

export function CliquePacketCommentScene({
  leadPrimary,
  supporting,
  examinedCount,
  discardedCount,
}: PacketPreviewProps) {
  return (
    <GitHubChromeShell activeTab="conversation">
      <article className="gh-mock-comment clique-mock-comment">
        <div className="clique-mock-avatar" aria-hidden>
          C
        </div>
        <div className="clique-mock-comment-body">
          <header className="clique-mock-comment-head">
            <strong>clique-triage</strong>
            <span className="clique-mock-comment-meta">bot · GitHub Action · posts on CI failure</span>
          </header>

          <div className="clique-mock-packet">
            <p className="clique-mock-packet-label">Investigation packet</p>
            <p className="clique-mock-packet-lead-value">{leadPrimary}</p>
            <p className="clique-mock-packet-stats">
              {examinedCount} examined · {discardedCount} discarded
            </p>
            <ul className="clique-mock-packet-support">
              {supporting.slice(0, 2).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="clique-mock-packet-footer">
              <span className="clique-mock-btn clique-mock-btn-primary">View full packet</span>
              <div className="clique-mock-packet-chips">
                <BuildStatusChip status="built" />
                <BuildStatusChip status="roadmap" />
              </div>
            </div>
            <p className="clique-mock-packet-note">{DEMO_PACKET_MOCK_NOTE}</p>
          </div>
        </div>
      </article>
    </GitHubChromeShell>
  );
}
