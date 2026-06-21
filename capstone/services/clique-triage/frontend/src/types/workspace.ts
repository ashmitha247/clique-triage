export interface SourceFileLead {
  type: "source_file";
  strength: string;
  reason: string;
  file: string;
  path: string;
  line: number;
}

export interface CommunityIssueLead {
  type: "community_issue";
  strength: string;
  reason: string;
  issue_id: string;
  title: string;
  timestamp: string;
  url: string;
  traceback_match: string;
}

export interface PackageReleaseLead {
  type: "package_release";
  strength: string;
  reason: string;
  package: string;
  version: string;
  released_at: string;
  changes: string;
  hours_before_failure: number;
}

export interface RepositoryCommitLead {
  type: "repository_commit";
  strength: string;
  reason: string;
  commit: string;
  subject: string;
  author: string;
  date: string;
  files: string[];
}

export type PriorityLead =
  | SourceFileLead
  | CommunityIssueLead
  | PackageReleaseLead
  | RepositoryCommitLead;

export interface DiscardedItem {
  commit: string;
  subject: string;
  author: string;
  date: string;
  files: string[];
  reason: string;
}

export interface InvestigationWorkspace {
  build_failure_timestamp: string;
  isolated_exception: string;
  isolated_service: string;
  git_source: string;
  priority_leads: PriorityLead[];
  discarded: DiscardedItem[];
}

export type StreamEventTone = "normal" | "muted" | "critical" | "star";

export interface StreamEvent {
  timestamp: string;
  tone: StreamEventTone;
  label: string;
  detail: string;
}

export interface MatchSignal {
  label: string;
  filled: number;
  total: number;
}

export interface EliminatedItem {
  name: string;
  reason: string;
  details?: string[];
  status: "eliminated" | "deprioritized";
}

export interface DependencyLink {
  id: string;
  label: string;
}

export interface EcosystemCard {
  id: string;
  kind: "issue" | "release" | "community";
  title: string;
  detail: string;
}

export interface ConstellationNode {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
}

export interface ConstellationEdge {
  from: string;
  to: string;
}

export interface LikelyCause {
  headline: string;
  detail: string;
}

export interface TransformedWorkspace {
  failureClock: string;
  service: string;
  exception: string;
  eliminated: EliminatedItem[];
  reportTimeline: StreamEvent[];
  dependencyChain: DependencyLink[];
  ecosystemCards: EcosystemCard[];
  likelyCause: LikelyCause;
  primarySignals: MatchSignal[];
  primaryLeadLabel: string;
  primaryLeadUrl?: string;
  constellation: {
    nodes: ConstellationNode[];
    edges: ConstellationEdge[];
    focusNodeId: string;
    revealOrder: string[];
  };
}

/** Cinematic replay — one focus screen at a time (Arc-style). */
export type InvestigationPhase =
  | "loading"
  | "trigger"
  | "parsing"
  | "dependency"
  | "ecosystem"
  | "eliminating"
  | "connecting"
  | "verdict"
  | "evidence"
  | "timeline"
  | "error";

export const REPLAY_STEP_LABELS: Record<Exclude<InvestigationPhase, "loading" | "trigger" | "error">, string> = {
  parsing: "Extracting failure signature",
  dependency: "Mapping dependency chain",
  ecosystem: "Scanning ecosystem signals",
  eliminating: "Ruling out alternatives",
  connecting: "Connecting evidence",
  verdict: "Root cause candidate",
  evidence: "Evidence strength",
  timeline: "Incident timeline",
};

export const REPLAY_STEP_COUNT = 8;
