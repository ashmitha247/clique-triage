import type { DiscardedItem, PriorityLead, RagRetrieval } from "../types/workspace";

interface EvidenceGatheredStepProps {
  gitSource: string;
  ragRetrieval?: RagRetrieval;
  priorityLeads: PriorityLead[];
  discarded: DiscardedItem[];
}

const CORE_SOURCES = [
  {
    id: "log",
    label: "CI log (trigger)",
    detail: "The broken run kicks off the pipeline — not the only source",
    intake: "data/failed_build.log → log_slicer (Golang)",
    packetField: "isolated_exception · build_failure_timestamp",
    sourceType: "fixture",
  },
  {
    id: "trace",
    label: "Error message + stack trace",
    detail: "Go extracts these from the log — Python uses the text to match against fixtures",
    intake: "data/isolated_error.json",
    packetField: "priority_leads · type: source_file",
    sourceType: "fixture",
  },
  {
    id: "git",
    label: "Git commits",
    detail: "Recent repo changes from a local fixture file (or live git log when available)",
    intake: "data/git_log_fixture.json",
    packetField: "discarded · repository_commit leads",
    sourceType: "fixture",
  },
  {
    id: "releases-rules",
    label: "Package releases (deterministic rules)",
    detail: "Structured JSON — 6h window before failure, not a live PyPI call",
    intake: "mock_internet/external_evidence.json · public_releases",
    packetField: "priority_leads · type: package_release",
    sourceType: "fixture",
  },
  {
    id: "issues-rules",
    label: "GitHub issues (deterministic rules)",
    detail: "Structured JSON — traceback substring match, not a live GitHub API call",
    intake: "mock_internet/external_evidence.json · community_issues",
    packetField: "priority_leads · type: community_issue",
    sourceType: "fixture",
  },
] as const;

function countLeads(leads: PriorityLead[], type: PriorityLead["type"]): number {
  return leads.filter((lead) => lead.type === type).length;
}

export function EvidenceGatheredStep({
  gitSource,
  ragRetrieval,
  priorityLeads,
  discarded,
}: EvidenceGatheredStepProps) {
  const ragHits = (ragRetrieval?.hits ?? []).filter((hit) => hit.source_type !== "noise").slice(0, 3);
  const keptCommits = countLeads(priorityLeads, "repository_commit");
  const releaseLeads = countLeads(priorityLeads, "package_release");
  const issueLeads = countLeads(priorityLeads, "community_issue");
  const traceLeads = countLeads(priorityLeads, "source_file");

  return (
    <div className="evidence-gathered">
      <p className="evidence-gathered-banner">
        Demo reads local fixture files — not live PyPI or GitHub APIs. Same pipeline; production would swap fixtures for live fetches.
      </p>

      <div className="source-grid">
        {CORE_SOURCES.map((source) => (
          <div key={source.id} className="source-card phase-card">
            <div className="source-card-head">
              <div className="source-card-label">{source.label}</div>
              <span className="source-card-badge">{source.sourceType}</span>
            </div>
            <div className="source-card-detail">{source.detail}</div>
            <div className="source-card-meta">Reads: {source.intake}</div>
            <div className="source-card-meta">Packet: {source.packetField}</div>
            {source.id === "git" && (
              <>
                <div className="source-card-meta">Loaded as: {gitSource.replace(/_/g, " ")}</div>
                <div className="source-card-meta">
                  Engine: {discarded.length} discarded · {keptCommits} kept as leads
                </div>
              </>
            )}
            {source.id === "trace" && traceLeads > 0 && (
              <div className="source-card-meta">Engine: {traceLeads} traceback file leads</div>
            )}
            {source.id === "releases-rules" && releaseLeads > 0 && (
              <div className="source-card-meta">Engine: {releaseLeads} release lead(s) in priority_leads</div>
            )}
            {source.id === "issues-rules" && issueLeads > 0 && (
              <div className="source-card-meta">Engine: {issueLeads} issue lead(s) in priority_leads</div>
            )}
          </div>
        ))}
      </div>

      {ragRetrieval && (
        <div className="rag-panel phase-card">
          <div className="rag-panel-head">
            <span className="rag-panel-title">Text retrieval</span>
            <span className="rag-panel-badge">fixture</span>
          </div>

          <dl className="rag-panel-facts">
            <div className="rag-panel-fact">
              <dt>Source</dt>
              <dd>mock_internet/rag_corpus.json</dd>
            </div>
            <div className="rag-panel-fact">
              <dt>Output</dt>
              <dd>rag_retrieval in investigation packet</dd>
            </div>
            <div className="rag-panel-fact">
              <dt>Method</dt>
              <dd>Hybrid BM25 + TF-IDF, merged with RRF</dd>
            </div>
          </dl>

          <p className="rag-panel-note">
            Ranks release notes and issue text against the failure traceback. Runs alongside
            deterministic rules; results merge into priority leads.
          </p>

          <div className="rag-hit-list-label">Top matches</div>
          <ul className="rag-hit-list">
            {ragHits.map((hit, index) => (
              <li key={hit.doc_id} className="rag-hit-item">
                <div className="rag-hit-rank">{index + 1}</div>
                <div className="rag-hit-body">
                  <span className="rag-hit-id">{hit.doc_id}</span>
                  <span className="rag-hit-snippet">{hit.snippet}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
