export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
}

export interface TimelineEvent {
  time: string;
  label: string;
  isFailure?: boolean;
}

export interface TechArchNode {
  id: string;
  label: string;
  detail?: string;
  status?: "built" | "roadmap" | "neutral";
}

export const APPROACH_HERO =
  "Existing tools tell developers that something changed. Clique helps developers investigate whether that change is related to the failure they're seeing.";

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: "ci-failure",
    title: "CI Failure Detected",
    description: "Extract traceback and failing service from logs",
  },
  {
    id: "rag",
    title: "Evidence gathering",
    description: "Pull release notes, issues, changelogs, and git signals",
  },
  {
    id: "correlation",
    title: "Evidence Correlation",
    description: "Match traceback signatures, dependency relationships, and supporting reports",
  },
  {
    id: "timeline",
    title: "Timeline Comparison (Temporal Correlation)",
    description: "Compare external events against the failure timestamp",
  },
  {
    id: "elimination",
    title: "Noise Elimination",
    description: "Discard styling-only, documentation-only, and unrelated commits",
  },
  {
    id: "report",
    title: "Investigation Report Generated",
    description: "Most likely cause, supporting evidence, timeline, and suggested verification steps",
  },
];

export const TIMELINE_EXAMPLE: TimelineEvent[] = [
  { time: "09:06", label: "vendor_sdk v8.1.4 released" },
  { time: "09:08", label: "first GitHub issue opened" },
  { time: "11:48", label: "your build failed", isFailure: true },
];

export const TIMELINE_CAPTION =
  "This shows the external change happened before the failure.";

export const NOISE_EXAMPLES = ["checkout.css", "README.md", "express version bump"];

export const TECH_ARCHITECTURE: TechArchNode[] = [
  { id: "ci", label: "CI failure", status: "neutral" },
  { id: "go", label: "Go log slicer", detail: "Extract traceback", status: "built" },
  { id: "rag", label: "Python + Hybrid RAG", detail: "BM25 · TF-IDF · RRF", status: "built" },
  { id: "rules", label: "Elimination rules", status: "built" },
  { id: "json", label: "investigation_workspace.json", status: "neutral" },
  { id: "ui", label: "React guided UI", status: "built" },
  { id: "gemini", label: "Gemini summary", status: "roadmap" },
  { id: "gha", label: "GitHub Actions trigger", status: "roadmap" },
];

export const INVESTIGATION_REPORT_PREVIEW = {
  title: "Investigation Report",
  mostLikelyCause: "vendor_sdk v8.1.4 proxy subsystem changes",
  supportingEvidence: "4 corroborating signals",
  suggestedVerification: "Inspect payment_gateway.py",
};

export const TODAY_BRANCH_SOURCES = [
  "GitHub Issues",
  "Release Notes",
  "Changelogs",
  "Discord",
  "Stack Overflow",
  "Vendor Docs",
  "Community Reports",
];

export const CLIQUE_REPORT_BULLETS = [
  "Supporting Evidence",
  "Timeline Correlation",
  "Similar Reports",
  "Suggested Verification",
];
