import type { RagRetrieval } from "../types/workspace";

interface EvidenceGatheredStepProps {
  gitSource: string;
  ragRetrieval?: RagRetrieval;
}

const SOURCES = [
  {
    id: "log",
    label: "Build log",
    detail: "Traceback and exception extracted from CI output",
  },
  {
    id: "git",
    label: "Git commits",
    detail: "Recent repository changes and file paths",
  },
  {
    id: "releases",
    label: "Package releases",
    detail: "Version bumps and release notes near failure time",
  },
  {
    id: "issues",
    label: "GitHub issues",
    detail: "Community reports matching the error signature",
  },
] as const;

export function EvidenceGatheredStep({ gitSource, ragRetrieval }: EvidenceGatheredStepProps) {
  const ragHits = (ragRetrieval?.hits ?? []).filter((hit) => hit.source_type !== "noise").slice(0, 3);

  return (
    <div className="evidence-gathered">
      <div className="source-grid">
        {SOURCES.map((source) => (
          <div key={source.id} className="source-card phase-card">
            <div className="source-card-label">{source.label}</div>
            <div className="source-card-detail">{source.detail}</div>
            {source.id === "git" && (
              <div className="source-card-meta">Source: {gitSource.replace(/_/g, " ")}</div>
            )}
          </div>
        ))}
      </div>

      {ragRetrieval && (
        <div className="rag-panel phase-card">
          <div className="rag-panel-head">
            <span className="rag-panel-title">Retrieved from corpus</span>
            <span className="rag-panel-method">{ragRetrieval.method.replace(/_/g, " + ")}</span>
          </div>
          <ul className="rag-hit-list">
            {ragHits.map((hit) => (
              <li key={hit.doc_id} className="rag-hit-item">
                <span className="rag-hit-id">{hit.doc_id}</span>
                <span className="rag-hit-snippet">{hit.snippet}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
