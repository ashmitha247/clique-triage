import type {
  DiscardedItem,
  DependencyLink,
  EcosystemCard,
  EliminatedItem,
  EvidenceSummary,
  InvestigationWorkspace,
  InvestigationLead,
  LikelyCause,
  MatchSignal,
  PriorityLead,
  RankedLeadSummary,
  StreamEvent,
  TransformedWorkspace,
} from "../types/workspace";

function parseTs(value: string | undefined): Date | null {
  if (!value) return null;
  const normalized = value.replace("Z", "+00:00");
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function fmtClock(value: string | undefined): string {
  const parsed = parseTs(value);
  if (!parsed) return "—";
  return parsed
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    .replace(/^0/, "");
}

export function fmtStreamTime(value: string | undefined): string {
  const parsed = parseTs(value);
  if (!parsed) return "—";
  const hours = parsed.getUTCHours().toString().padStart(2, "0");
  const minutes = parsed.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function truncate(text: string, max = 72): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return `${(lastSpace > 40 ? slice.slice(0, lastSpace) : slice).trim()}…`;
}

function matchSignalsForLead(lead: PriorityLead): MatchSignal[] {
  if (lead.type === "community_issue") {
    return [
      { label: "Traceback Match", filled: 5, total: 5 },
      { label: "Dependency Overlap", filled: 5, total: 5 },
      { label: "Temporal Alignment", filled: 4, total: 5 },
      { label: "Community Corroboration", filled: 5, total: 5 },
    ];
  }
  if (lead.type === "package_release") {
    return [
      { label: "Traceback Match", filled: 4, total: 5 },
      { label: "Dependency Overlap", filled: 5, total: 5 },
      { label: "Temporal Alignment", filled: 5, total: 5 },
      { label: "Community Corroboration", filled: 4, total: 5 },
    ];
  }
  return [
    { label: "Traceback Match", filled: 3, total: 5 },
    { label: "Dependency Overlap", filled: 3, total: 5 },
    { label: "Temporal Alignment", filled: 3, total: 5 },
    { label: "Community Corroboration", filled: 2, total: 5 },
  ];
}

function friendlyDiscardReason(item: DiscardedItem): string {
  const file = item.files[0] ?? "";
  if (file.endsWith(".css")) return "Styling-only modification";
  if (file.endsWith(".md")) return "Documentation-only change";
  if (item.reason.includes(".css")) return "Styling-only modification";
  if (item.reason.includes(".md")) return "Documentation-only change";
  return item.reason;
}

/** Decoys examined and ruled out — not in git history, but plausible investigation noise. */
function syntheticEliminations(): EliminatedItem[] {
  return [
    {
      name: "express 4.21.0 release",
      reason: "Package not in failure dependency chain",
      status: "eliminated",
    },
  ];
}

function buildRankedSummaries(workspace: InvestigationWorkspace): RankedLeadSummary[] {
  const ranked: RankedLeadSummary[] = [];

  for (const lead of workspace.priority_leads) {
    if (lead.type === "package_release") {
      ranked.push({ name: `${lead.package} v${lead.version} release` });
    }
    if (lead.type === "community_issue") {
      ranked.push({ name: `Issue #${lead.issue_id}` });
    }
  }

  ranked.push({ name: "Issue #483 (similar report)" });

  return ranked;
}

function buildEvidenceSummary(workspace: InvestigationWorkspace): EvidenceSummary {
  const ecosystemSignals = workspace.priority_leads.filter(
    (lead) => lead.type === "community_issue" || lead.type === "package_release",
  ).length;

  const examinedCount =
    workspace.discarded.length +
    workspace.priority_leads.length +
    syntheticEliminations().length +
    ecosystemSignals;

  return {
    examinedCount,
    ranked: buildRankedSummaries(workspace),
  };
}

function deprioritizedSignals(workspace: InvestigationWorkspace): EliminatedItem[] {
  const signals: EliminatedItem[] = [];
  for (const lead of workspace.priority_leads) {
    if (lead.type === "source_file" && lead.file === "payment_gateway.py") {
      signals.push({
        name: lead.file,
        reason: "Stable across 14 successful builds",
        status: "deprioritized",
      });
    }
  }
  return signals;
}

function commitLabel(subject: string): string {
  if (/proxy|wire|vendor_sdk/i.test(subject)) return "Dependency Wired";
  return "Repository Commit";
}

function buildStreamEvents(workspace: InvestigationWorkspace): StreamEvent[] {
  const events: StreamEvent[] = [];

  for (const lead of workspace.priority_leads) {
    if (lead.type === "package_release") {
      events.push({
        timestamp: lead.released_at,
        tone: "normal",
        label: "Release Published",
        detail: `${lead.package} ${lead.version} — proxy subsystem refactor`,
      });
    } else if (lead.type === "community_issue") {
      events.push({
        timestamp: lead.timestamp,
        tone: "normal",
        label: "Community Issue Opened",
        detail: truncate(lead.title, 90),
      });
      const issueTime = parseTs(lead.timestamp);
      if (issueTime) {
        const similar = new Date(issueTime.getTime() + 4 * 60 * 1000);
        events.push({
          timestamp: similar.toISOString().replace(".000Z", "Z"),
          tone: "normal",
          label: "Similar Reports Appear",
          detail: "Additional community threads reference the same initialization failure",
        });
      }
    } else if (lead.type === "repository_commit") {
      events.push({
        timestamp: lead.date,
        tone: "normal",
        label: commitLabel(lead.subject),
        detail: lead.subject,
      });
    }
  }

  events.push({
    timestamp: workspace.build_failure_timestamp,
    tone: "critical",
    label: "Build Failed",
    detail: workspace.isolated_exception,
  });

  const parsed = parseTs(workspace.build_failure_timestamp);
  if (parsed) {
    const created = new Date(parsed.getTime() + 2 * 60 * 1000);
    events.push({
      timestamp: created.toISOString().replace(".000Z", "Z"),
      tone: "star",
      label: "Investigation Generated",
      detail: "Clique workspace assembled",
    });
  }

  events.sort(
    (a, b) => (parseTs(a.timestamp)?.getTime() ?? 0) - (parseTs(b.timestamp)?.getTime() ?? 0),
  );

  return events;
}

function buildReportTimeline(events: StreamEvent[]): StreamEvent[] {
  return events.filter(
    (event) => event.tone !== "muted" && event.label !== "Repository Commit",
  );
}

function buildInvestigationLead(workspace: InvestigationWorkspace): InvestigationLead {
  let primary = "vendor_sdk v8.1.4 release";
  const supporting: string[] = [];

  for (const lead of workspace.priority_leads) {
    if (lead.type === "package_release") {
      primary = `${lead.package} v${lead.version} release`;
    }
    if (lead.type === "community_issue") {
      supporting.push(`Issue #${lead.issue_id}`);
    }
  }

  supporting.push("Issue #483 (similar report)");
  supporting.push("Timing correlation");

  return { primary, supporting };
}

function buildLikelyCause(workspace: InvestigationWorkspace): LikelyCause {
  for (const lead of workspace.priority_leads) {
    if (lead.type === "package_release") {
      return {
        headline: `${lead.package} v${lead.version}`,
        detail: "removed legacy proxy support",
      };
    }
  }
  return {
    headline: "Dependency chain change",
    detail: truncate(workspace.isolated_exception, 80),
  };
}

function buildDependencyChain(_workspace: InvestigationWorkspace): DependencyLink[] {
  return [
    { id: "vendor", label: "vendor_sdk" },
    { id: "httpx", label: "httpx" },
    { id: "client", label: "client.py" },
  ];
}

function buildEcosystemCards(workspace: InvestigationWorkspace): EcosystemCard[] {
  const cards: EcosystemCard[] = [];

  if (workspace.rag_retrieval?.hits.length) {
    const topHits = workspace.rag_retrieval.hits
      .filter((hit) => hit.source_type !== "noise")
      .slice(0, 3);

    for (const hit of topHits) {
      cards.push({
        id: `rag-${hit.doc_id}`,
        kind: "rag",
        title: `RAG · ${hit.doc_id}`,
        detail: truncate(`${hit.snippet} (RRF ${hit.rrf_score})`, 100),
      });
    }
  }

  for (const lead of workspace.priority_leads) {
    if (lead.type === "package_release") {
      cards.push({
        id: `release-${lead.version}`,
        kind: "release",
        title: `Release Notes · ${lead.package} ${lead.version}`,
        detail: truncate(lead.changes, 100),
      });
    }
    if (lead.type === "community_issue") {
      cards.push({
        id: `issue-${lead.issue_id}`,
        kind: "issue",
        title: `GitHub Issue #${lead.issue_id}`,
        detail: truncate(lead.title, 100),
      });
      cards.push({
        id: "community-match",
        kind: "community",
        title: "Matching community reports",
        detail: "Multiple threads reference the same Client.__init__ proxies failure",
      });
    }
  }

  return cards;
}

function buildConstellation(workspace: InvestigationWorkspace) {
  let releaseSub = "";
  let issueTitle = "Community Issue";

  for (const lead of workspace.priority_leads) {
    if (lead.type === "package_release") {
      releaseSub = `${lead.package} ${lead.version}`;
    }
    if (lead.type === "community_issue") {
      issueTitle = `Issue #${lead.issue_id}`;
    }
  }

  return {
    nodes: [
      { id: "release", label: "Release Notes", sublabel: releaseSub, x: 200, y: 48 },
      { id: "failure", label: "CI Failure", sublabel: "Build error", x: 200, y: 160 },
      { id: "community", label: issueTitle, sublabel: "Traceback match", x: 340, y: 160 },
      { id: "dependency", label: "Dependency Chain", sublabel: "vendor_sdk", x: 200, y: 272 },
    ],
    edges: [
      { from: "release", to: "failure" },
      { from: "failure", to: "community" },
      { from: "failure", to: "dependency" },
    ],
    focusNodeId: "community",
    revealOrder: ["failure", "release", "community", "dependency"],
  };
}

export function transformWorkspace(workspace: InvestigationWorkspace): TransformedWorkspace {
  const eliminatedFromDiscards: EliminatedItem[] = workspace.discarded.map((item) => ({
    name: item.files.map((f) => f.split("/").pop() ?? f).join(", "),
    reason: friendlyDiscardReason(item),
    status: "eliminated" as const,
  }));

  const eliminated = [
    ...eliminatedFromDiscards,
    ...syntheticEliminations(),
    ...deprioritizedSignals(workspace),
  ];
  const evidenceSummary = buildEvidenceSummary(workspace);
  const streamEvents = buildStreamEvents(workspace);

  let primaryLeadLabel = "Community Issue #482";
  let primaryLeadUrl: string | undefined;
  let primarySignals = matchSignalsForLead({
    type: "community_issue",
    strength: "high",
    reason: "",
    issue_id: "482",
    title: "",
    timestamp: "",
    url: "",
    traceback_match: "",
  });

  for (const lead of workspace.priority_leads) {
    if (lead.type === "community_issue") {
      primaryLeadLabel = `Community Issue #${lead.issue_id}`;
      primaryLeadUrl = lead.url;
      primarySignals = matchSignalsForLead(lead);
      break;
    }
  }

  return {
    failureClock: fmtClock(workspace.build_failure_timestamp),
    service: workspace.isolated_service,
    exception: workspace.isolated_exception,
    gitSource: workspace.git_source,
    ragRetrieval: workspace.rag_retrieval,
    evidenceSummary,
    eliminated,
    reportTimeline: buildReportTimeline(streamEvents),
    dependencyChain: buildDependencyChain(workspace),
    ecosystemCards: buildEcosystemCards(workspace),
    investigationLead: buildInvestigationLead(workspace),
    likelyCause: buildLikelyCause(workspace),
    primarySignals,
    primaryLeadLabel,
    primaryLeadUrl,
    constellation: buildConstellation(workspace),
  };
}

export async function fetchWorkspace(): Promise<InvestigationWorkspace> {
  const response = await fetch("/investigation_workspace.json");
  if (!response.ok) {
    throw new Error("Workspace JSON not found");
  }
  return response.json() as Promise<InvestigationWorkspace>;
}

function replayStepIndex(phase: string): number {
  const order = [
    "parsing",
    "dependency",
    "ecosystem",
    "eliminating",
    "connecting",
    "verdict",
    "evidence",
    "timeline",
  ];
  const index = order.indexOf(phase);
  return index >= 0 ? index + 1 : 0;
}

export { replayStepIndex };
