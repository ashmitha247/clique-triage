import { END_PRODUCT_MCP_URI } from "../../../demo/presentationNarrative";
import type { PacketPreviewProps } from "./CliquePacketCommentScene";
import { BuildStatusChip } from "./BuildStatusChip";
import { GitHubChromeShell } from "./GitHubChromeShell";

export function CursorMcpHandoffScene({
  leadPrimary,
  supporting,
  examinedCount,
}: PacketPreviewProps) {
  return (
    <div className="cursor-handoff-split">
      <div className="cursor-handoff-pr">
        <GitHubChromeShell activeTab="conversation">
          <div className="clique-mock-handoff-cta">
            <span className="clique-mock-btn clique-mock-btn-primary clique-mock-btn-highlight">
              Open in Cursor
            </span>
            <BuildStatusChip status="roadmap" />
          </div>
        </GitHubChromeShell>
      </div>

      <div className="cursor-mock cursor-mock-light">
        <header className="cursor-mock-header">
          <span className="cursor-mock-title">Cursor</span>
        </header>
        <div className="cursor-mock-chat">
          <div className="cursor-mock-context-block">
            <p className="cursor-mock-context-label">MCP resource</p>
            <code className="cursor-mock-context-uri">{END_PRODUCT_MCP_URI}</code>
          </div>
          <dl className="cursor-mock-packet-fields">
            <div>
              <dt>Lead</dt>
              <dd>{leadPrimary}</dd>
            </div>
            <div>
              <dt>Examined</dt>
              <dd>{examinedCount} items</dd>
            </div>
            {supporting[0] && (
              <div>
                <dt>Evidence</dt>
                <dd>{supporting[0]}</dd>
              </div>
            )}
          </dl>
          <BuildStatusChip status="roadmap" />
        </div>
      </div>
    </div>
  );
}
