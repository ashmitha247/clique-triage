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

export interface RagRetrievalHit {
  doc_id: string;
  source_type: string;
  rrf_score: number;
  bm25_rank: number;
  tfidf_rank: number;
  snippet: string;
}

export interface RagRetrieval {
  query: string;
  method: string;
  top_k: number;
  hits: RagRetrievalHit[];
}

export interface InvestigationWorkspace {
  build_failure_timestamp: string;
  isolated_exception: string;
  isolated_service: string;
  git_source: string;
  rag_retrieval?: RagRetrieval;
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
  kind: "issue" | "release" | "community" | "rag";
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

export interface InvestigationLead {
  primary: string;
  supporting: string[];
}

export interface LikelyCause {
  headline: string;
  detail: string;
}

export interface RankedLeadSummary {
  name: string;
}

export interface EvidenceSummary {
  examinedCount: number;
  ranked: RankedLeadSummary[];
}

export interface TransformedWorkspace {
  failureClock: string;
  service: string;
  exception: string;
  gitSource: string;
  ragRetrieval?: RagRetrieval;
  evidenceSummary: EvidenceSummary;
  eliminated: EliminatedItem[];
  reportTimeline: StreamEvent[];
  dependencyChain: DependencyLink[];
  ecosystemCards: EcosystemCard[];
  investigationLead: InvestigationLead;
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

/** Guided walkthrough — demo mode prepends intro → research → workflow → architecture. */
export type GuidedStep =
  | "loading"
  | "error"
  | "intro"
  | "research"
  | "workflow"
  | "architecture"
  | "landing"
  | "step1"
  | "step2"
  | "step3"
  | "step4"
  | "done";

export const GUIDED_STEP_COUNT = 4;

export interface GuidedStepCopy {
  title: string;
  subtitle: string;
  caption?: string;
}

export const GUIDED_STEP_COPY: Record<
  Exclude<GuidedStep, "loading" | "landing" | "done" | "error" | "intro" | "research" | "workflow" | "architecture">,
  GuidedStepCopy
> = {
  step1: {
    title: "Your build failed",
    subtitle: "Here's the error from your CI pipeline.",
    caption: "Most tools stop here. Clique starts here.",
  },
  step2: {
    title: "Evidence gathered from 4 places",
    subtitle: "Logs, git history, package releases, and community reports — matched together.",
    caption: "Release notes and issues ranked by relevance to this failure.",
  },
  step3: {
    title: "Ruled out what doesn't matter",
    subtitle: "12 signals examined. Most were noise.",
    caption: "The value isn't finding the answer — it's narrowing where to look.",
  },
  step4: {
    title: "Start here",
    subtitle: "Your most likely investigation lead — where to spend the next 15 minutes.",
  },
};

/** @deprecated Legacy cinematic replay — kept for reference, not used in guided flow. */
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
  ecosystem: "Hybrid RAG retrieval (BM25 + TF-IDF)",
  eliminating: "Ruling out alternatives",
  connecting: "Connecting evidence",
  verdict: "Most likely investigation lead",
  evidence: "Evidence strength",
  timeline: "Incident timeline",
};

export const REPLAY_STEP_COUNT = 8;
