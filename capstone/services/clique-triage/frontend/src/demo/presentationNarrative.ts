export const SCENARIO = {
  headline: "kuberef — clean PR, red CI. Your diff didn't touch the failing code.",
  error: "TypeError: unexpected keyword argument 'proxies'",
  question:
    "Nothing in my changes explains this. Which external dependency change caused it?",
};

/* ── Presentation §1: Problem — origin & web research ── */

export const ORIGIN_HEADLINE = "Where this started";

export const ORIGIN_STORY = [
  "I wondered about how changes in external dependencies might hurt repositories. I searched the web for whether this failure model is real and found empirical papers and discussions surrounding this.",
] as const;

export const ORIGIN_RESEARCH_SUGGESTED_TITLE = "What the research suggested";

export const ORIGIN_EMPIRICAL_PAPERS_PHRASE = "empirical papers";

export const ORIGIN_RESEARCH_HIGHLIGHT = "can unexpectedly break previously healthy builds.";

export const ORIGIN_RESEARCH_NICHE_PHRASE = "niche";

export const ORIGIN_RESEARCH_SUGGESTED = [
  "The papers confirmed the problem is real: software ecosystems are highly interconnected, and changes outside a repository can unexpectedly break previously healthy builds.",
  "Dependency updates can introduce behavioral changes that are difficult to detect from the build log alone.",
  "The problem was real, but it was narrow — the stats pointed to a minority of repos and updates, not every broken build.",
  "I classified that minority as the niche this project would cater to.",
] as const;

export const WEB_RESEARCH_FINDINGS = [
  {
    headline: "Breaking changes hide in small releases",
    finding: "~44% of breaking changes land in minor or patch versions",
    source: "TOSEM 2023 — I Depended on You and You Broke Me",
    url: "https://dl.acm.org/doi/full/10.1145/3576037",
    use: "Version numbers alone don't tell you if an update is safe",
  },
  {
    headline: "Behavioral breaks hit few repos hard",
    finding: "~2.3% of client tests fail when a library updates",
    source: "FSE 2024 — Behavioral Breaking Changes in Client Apps",
    url: "https://valerio-terragni.github.io/assets/pdf/jayasuriya-fse-2024.pdf",
    use: "Rare across the ecosystem — painful when it's your repo",
  },
  {
    headline: "Non-major upgrades can still break APIs",
    finding: "~20% of non-major Maven upgrades introduce breaking changes",
    source: "EMSE 2021 — SemVer & Breaking Changes in Maven Central",
    url: "https://homepages.cwi.nl/~jurgenv/papers/EMSE-2021.pdf",
    use: "Backward compatibility is common, not guaranteed",
  },
  {
    headline: "CI helps confirm an upstream break",
    finding: "Pipeline status changes support provider-caused break analysis",
    source: "TOSEM 2023 (CI pipeline comparison finding)",
    url: "https://dl.acm.org/doi/full/10.1145/3576037",
    use: "You need to correlate CI with what changed outside the repo",
  },
  {
    headline: "The log isn't enough on its own",
    finding: "Explaining update breaks needs build logs plus dependency trees",
    source: "Breaking-Good, 2024",
    url: "https://arxiv.org/html/2407.03880v1",
    use: "Failure signal and upstream cause live in different places",
  },
  {
    headline: "Breaks show up in CI in different ways",
    finding: "Real breaking updates mix compile errors and test failures",
    source: "BUMP, 2024",
    url: "https://arxiv.org/abs/2401.09906",
    use: "Investigation spans more than reading one error line",
  },
] as const;

export const MAINTAINER_VALIDATION_INTRO =
  "The empirical papers confirmed the existence of the problem, but to further validate the problem, I spoke with open source maintainers.";

export const MAINTAINER_VALIDATION_SUMMARY = [
  "The papers describe a narrow failure mode: CI breaks while the likely cause sits outside the repo. Huda and Ajeet described the same hunt — external update logs, release notes, and issues — not a quick read of the error line.",
  "The friction they named matches what the research measures: finding and connecting the upstream change takes time; existing tools like Dependabot show what updated, not whether it explains this failure.",
] as const;

export const MAINTAINER_VALIDATION_RESEARCH_PHRASE = "matches what the research measures";

export const MAINTAINER_VALIDATION_FRICTION_PHRASE = "friction";

export const BACKWARD_COMPAT_INTRO =
  "I categorised it as a niche group because of the supporting stats from the papers and also because:";

export const BACKWARD_COMPAT_PARAGRAPHS = [
  "While backward compatibility ensures that new releases and updated dependencies don't affect major repos, it's not always the case:",
  "The FSE 2024 study on behavioral breaking changes found measurable impacts on client applications after library updates, even when APIs remained unchanged.",
  "Similarly, research on Maven Central ecosystems observed that non-major upgrades can still introduce breaking API changes, demonstrating that backward compatibility is common but not guaranteed.",
  "Across these studies, a recurring theme emerged: identifying the failure is often easier than identifying its cause. Developers frequently need to correlate build logs with release notes, issue trackers, dependency updates, and recent repository activity before they can form a reliable investigation hypothesis.",
  "My conclusion was not that every CI failure requires this process, but that dependency-driven failures create a distinctive investigation workflow where external evidence becomes essential.",
  "Clique was designed specifically for this narrower category of failures.",
] as const;

export const NICHE_CHARACTERIZATION_TITLE = "How I defined the niche operationally";

export const NICHE_CHARACTERIZATION_INTRO =
  "From the papers and maintainer conversations, I defined the target failure mode as:";

export const NICHE_CHARACTERIZATION_TRAITS = [
  { trait: "Clean PR signal", meaning: "CI fails, but your change did not touch the failing code" },
  { trait: "Outward traceback", meaning: "The error points at a dependency or external library" },
  { trait: "Behavioral suspicion", meaning: "Compile may pass; runtime or tests expose the break" },
  {
    trait: "External investigation",
    meaning: "You must correlate logs, updates, releases, and issues before hypothesizing",
  },
] as const;

export const NICHE_OUT_OF_SCOPE =
  "Out of scope: syntax errors, env vars, broken tests in your diff, obvious in-repo bugs — Cursor and normal debugging are enough.";

export const NICHE_IN_SCOPE =
  "In scope: dependency-driven failures where you must gather and correlate ecosystem context before you know what to verify.";

export const NICHE_GUARDRAIL =
  "Guardrail: most updates are harmless. Clique investigates correlation, not causation — it ranks leads; the human verifies.";

export const NICHE_REALIZATION =
  "From papers and conversations, I realised I'm catering to a minority — not every repo, not every red build. Most upstream updates are harmless. Clique investigates correlation, not causation.";

export const EXTENSION_TYPES_UNDERLINE_PHRASES = [
  "Browser extensions",
  "Cursor extensions",
  "single-purpose GitHub Actions",
] as const;

export const EXTENSION_POSITIONING_INTRO = [
  "Browser extensions, Cursor extensions, and single-purpose GitHub Actions already try to help when CI fails — Failed Build Issue, GithubActionsAI, CI Fix Coach, Fix with Copilot, and dozens of smaller integrations.",
  "Most of them solve one slice of the problem for a narrow audience. They are not trying to be universal platforms — and that is normal in this space.",
] as const;

export const EXTENSION_POSITIONING_COMPARABLES_TITLE = "Comparable tools in the CI failure space";

export const EXTENSION_POSITIONING_NICHE_TITLE = "Clique in this lane";

export const EXTENSION_POSITIONING_NICHE_BODY = [
  "Clique is intended as a low-key extension for the same kind of niche: repos where CI fails on a clean PR because an external dependency changed behavior — not because your diff broke the build.",
  "The plan came from web research on that failure model and from studying these pre-existing small tools — what they automate, what they leave to the human, and where investigation still takes manual assembly.",
] as const;

export const EXTENSION_DELIVERY_INTENT_TITLE = "How Clique would ship (intent)";

export const EXTENSION_PRIMARY_DELIVERY =
  "Primary: a GitHub Action that runs when CI fails — headlessly assembles investigation_workspace.json and delivers the packet on the PR.";

export const EXTENSION_SECONDARY_MCP_INTENT =
  "Further roadmap: an \"Open in Cursor\" option on the PR — same investigation packet in your IDE, no copy-paste.";

export const EXTENSION_DELIVERY_CLOSE =
  "Details on what is built vs roadmap come on later slides. Here: Clique fits the same small-extension pattern — automating the expensive correlation hunt, not replacing how you debug.";

export const NICHE_EXTENSION_COMPARABLES = [
  {
    name: "Failed Build Issue",
    url: "https://github.com/marketplace/actions/failed-build-issue",
    complements: "Opens or comments on issues when CI fails",
    differs: "Clique assembles an upstream evidence packet — not just an issue",
  },
  {
    name: "GithubActionsAI",
    url: "https://github.com/insanoid/GithubActionsAI",
    complements: "Sends failed step logs to AI chat in the IDE",
    differs: "Clique produces auditable elimination + ranked leads before chat",
  },
  {
    name: "CI Fix Coach",
    url: "https://github.com/Chris1220-cmd/ci-fix-coach",
    complements: "AI diagnosis comment on the PR",
    differs: "Clique targets investigation, not auto-fix",
  },
  {
    name: "Fix with Copilot",
    url: "https://github.blog/changelog/2026-06-04-fix-with-copilot-for-failing-actions-now-in-pro-pro-and-max/",
    complements: "Cloud agent investigates failure and opens a fix PR",
    differs: "Clique optimizes verify-upstream-evidence, not get-green",
  },
  {
    name: "Clique (this)",
    complements: "Investigation packet on external dependency CI breaks",
    differs: "Deterministic assembly + rule-out + repeatability — complement to AI",
  },
] as const;

export const HUDA_WORKFLOW_TITLE = "Manual hunt — and what Clique targets";

export const HUDA_WORKFLOW_SUBTITLE = "The expensive work is outside the log line.";

export const HUDA_TODAY_MANUAL_TITLE = "Manual hunt";
export const HUDA_TODAY_MANUAL_READ = "Read the CI / test failure";
export const HUDA_TODAY_MANUAL_HEAVY = [
  "Check lockfile and bot PRs — what updated?",
  "Search release notes, issues, and vendor docs",
  "Connect timing to the failure — correlate the upstream change",
] as const;

export const HUDA_TODAY_HEAVY_CALLOUTS = [
  { label: "A lot of investigation time", position: "top-left", arrow: "in" },
  {
    label: "Failure signal and upstream cause live apart",
    position: "top-right",
    arrow: "in",
  },
  { label: "Friction", position: "left", arrow: "in" },
  { label: "Manual correlation", position: "right", arrow: "in" },
  { label: "Evidence outside the repo", position: "bottom", arrow: "in" },
] as const;

export const HUDA_TODAY_CLIQUE_INTENT_TAGLINE =
  "Clique automatically generates investigation packets for external-cause CI failures.";

export const HUDA_TODAY_CLIQUE_INTENT_LEAD =
  "Clique is a low-key CI extension for this niche (niche as in the cases we characterised through papers and maintainer conversations: when CI fails and the likely cause is outside your repo).";

export const HUDA_TODAY_CLIQUE_INTENT_EXTENSION_WORD = "extension";

export const HUDA_TODAY_CLIQUE_INTENT_AUDIENCE =
  "Any IDE, the PR, or a plain JSON viewer can use the packet.";

export const HUDA_TODAY_EXTENSION_FOOTER =
  "Browser extensions, Cursor extensions, and single-purpose GitHub Actions already try to help when CI fails. Most solve one slice for a narrow audience — Clique targets the niche we defined in the Problem section.";

export const APPROACH_PLAIN_PAPER = {
  kind: "Empirical paper",
  name: "Breaking-Good, 2024",
  url: "https://arxiv.org/html/2407.03880v1",
  quote:
    "Explaining dependency-update failures takes build logs and dependency trees — often on bot update PRs, before anyone can say which upstream change matters.",
} as const;

export const APPROACH_PLAIN_BRIDGE =
  "Breaking-Good shows structured pre-debug output helps on compile failures. Clique extends that idea for our niche — assemble logs, git, releases, issues, and retrieval scores into one Clique investigation packet before you debug.";

export const APPROACH_PLAIN_BRIDGE_HIGHLIGHT = "Clique extends that idea";

export const APPROACH_PLAIN_CORE =
  "The core of the tool is generating an Investigation Packet.";

export const APPROACH_PLAIN_CORE_HIGHLIGHT = "generating an Investigation Packet";

export const APPROACH_PLAIN_WHY_TITLE = "Why an Investigation Packet Instead of an Auto-Fix?";

export const APPROACH_PLAIN_EXTENSION_ROLE_BEFORE =
  "Clique is designed as a lightweight CI extension, not a replacement for coding assistants such as Cursor or Copilot — it is ";

export const APPROACH_PLAIN_EXTENSION_ROLE_EMPHASIS = "complement";

export const APPROACH_PLAIN_EXTENSION_ROLE_AFTER =
  " to them. So internally, for the CI extension (similar to other CI browser extensions) it needs the following:";

export const APPROACH_PLAIN_PACKET_PARTS = [
  "Supporting Evidence",
  "Timeline Correlation",
  "Similar Reports",
  "Suggested Verification",
] as const;

export const APPROACH_PLAIN_PACKET_TERM =
  'This altogether we termed it as "investigation packet."';

export const APPROACH_PLAIN_HANDOFF_CLOSING =
  "The common finding is that, for dependency-driven failures, investigation frequently comes before remediation, hence the investigation packet is the handoff.";

export const APPROACH_PLAIN_HANDOFF_CLOSING_HIGHLIGHT = "hence the investigation packet is the handoff.";

export const APPROACH_PLAIN_HANDOFF_FOLLOWUP =
  "So based on all the supporting evidence from papers and talks with maintainers, for building the extensions for the particular niche, we need an investigation packet — it will be the core part of the product which will be demonstrated.";

export const APPROACH_PLAIN_HANDOFF_FOLLOWUP_HIGHLIGHT = "investigation packet";

export const VALUE_BEYOND_LLM_BRIDGE =
  "The core part of the tool is producing the investigation packet, which is motivated by the research. But why can't this investigation packet be generated by AI?";

export const VALUE_BEYOND_LLM_TITLE = "Value Beyond a Generic LLM";

export const VALUE_BEYOND_LLM_EVIDENCE_SOURCES = [
  "Build and test logs",
  "Dependency version changes",
  "Release notes and changelogs",
  "Issue trackers and known breakages",
  "Transitive dependency relationships",
] as const;

export const VALUE_BEYOND_LLM_ASSEMBLY =
  "For this niche category of failures, the challenge is often assembling the relevant evidence before remediation can begin.";

export const VALUE_BEYOND_LLM_ASSEMBLY_HIGHLIGHT = "before";

export const VALUE_BEYOND_LLM_INVESTIGATION_FOCUS =
  "Clique therefore focuses on the investigation stage rather than the repair stage. Its goal is to produce a structured investigation packet that can be reviewed by a developer or passed directly to tools such as Cursor or Copilot.";

export const VALUE_BEYOND_LLM_WORKFLOW =
  "In this workflow, the developer debugging or AI remains responsible for generating and validating fixes.";

export const VALUE_BEYOND_LLM_COMPLEMENT =
  "As a CI extension, Clique complements existing AI tools by reducing the effort required to collect, correlate, and prioritize the evidence needed to understand a dependency-driven failure.";

export const VALUE_BEYOND_LLM_COMPLEMENT_HIGHLIGHT = VALUE_BEYOND_LLM_COMPLEMENT;

export const VALUE_BEYOND_LLM_REPAIR_HIGHLIGHT = "first gather and organize evidence generally outperform";

export const HUDA_OUTCOME_WITH_CLIQUE =
  "With Clique: one investigation packet — starting point, what was ruled out, how to verify. Extension delivery (GitHub Action on failure) is roadmap; the engine you are about to see works today on fixtures.";

export const UNDER_THE_HOOD_PAPER_HEADLINE =
  "How did the papers actually support the contents of our Investigation Packet";

export const UNDER_THE_HOOD_PAPER_BODY =
  "Across the studies, developers repeatedly had to gather evidence, correlate events, search for related reports, and decide what to verify next. Those recurring investigation activities became the four sections of Clique's Investigation Packet.";

/** @deprecated */
export interface UnderHoodPacketPart {
  label: string;
  inPacket: string;
  paper: string;
  url?: string;
}

/** @deprecated */
export const UNDER_THE_HOOD_PACKET_PARTS: UnderHoodPacketPart[] = [];

/** @deprecated */
export const UNDER_THE_HOOD_PAPER_LABEL = "Why this packet shape";

/** @deprecated */
export const UNDER_THE_HOOD_PAPER_INTRO = UNDER_THE_HOOD_PAPER_BODY;

/** @deprecated */
export const UNDER_THE_HOOD_PAPER_GAP = "";

/** @deprecated Use UNDER_THE_HOOD_PACKET_PARTS */
export interface UnderHoodPaperWhy {
  text: string;
  url?: string;
}

/** @deprecated Use UNDER_THE_HOOD_PACKET_PARTS */
export const UNDER_THE_HOOD_PAPER_WHY: UnderHoodPaperWhy[] = [];

/** @deprecated */
export const UNDER_THE_HOOD_PAPER_BRIDGE = "";

/** @deprecated */
export const UNDER_THE_HOOD_PAPER_OUTCOME = "";

export const UNDER_THE_HOOD_PAPER_CITE = "Research backing — see table above.";

/** @deprecated Use HEADLINE + PACKET_PARTS */
export const UNDER_THE_HOOD_PAPER_ANCHOR_BREAKING_GOOD = UNDER_THE_HOOD_PAPER_CITE;

/** @deprecated */
export const UNDER_THE_HOOD_PAPER_ANCHOR_SYNTHESIS = UNDER_THE_HOOD_PAPER_INTRO;

/** @deprecated */
export const UNDER_THE_HOOD_PAPER_ANCHOR = UNDER_THE_HOOD_PAPER_INTRO;

/** @deprecated */
export const UNDER_THE_HOOD_PAPER_HIGHLIGHT = "investigation_workspace.json";

/** @deprecated */
export const UNDER_THE_HOOD_PAPER_PACKET_PHRASE = "priority_leads";

export interface UnderHoodPaperCite {
  label: string;
  url: string;
  quote: string;
}

export interface UnderHoodGraphNode {
  id: string;
  title: string;
  detail: string;
  why?: string;
  technical?: string;
  artifact?: string;
  paperCite?: UnderHoodPaperCite;
  deliverySections?: readonly { label: string; body: string }[];
  tone?: "start" | "work" | "file" | "merge" | "finish" | "extension" | "roadmap";
}

export interface UnderHoodNodeGroup {
  id: string;
  label: string;
  nodes: UnderHoodGraphNode[];
}

export interface UnderHoodOverviewPhase {
  id: string;
  step: string;
  title: string;
  short: string;
}

export const UNDER_THE_HOOD_OVERVIEW_PHASES: UnderHoodOverviewPhase[] = [
  { id: "input", step: "1", title: "Trigger", short: "CI log" },
  { id: "extract", step: "2", title: "Extract", short: "Golang CLI" },
  { id: "triage", step: "3", title: "Gather", short: "demo stores" },
  { id: "output", step: "4", title: "Packet", short: "One JSON" },
];

export interface UnderHoodPhaseSection {
  id: string;
  step: string;
  title: string;
  explain: string;
  nodes: UnderHoodGraphNode[];
  groups?: UnderHoodNodeGroup[];
  parallel?: boolean;
  parallelLabel?: string;
  mergeLabel?: string;
  corpusIntro?: UnderHoodGraphNode;
}

export const UNDER_THE_HOOD_EXTRACT_EXPLAIN =
  "A Golang CLI reads the CI log and keeps only the error message and stack trace — this is the starting point, because based on the log, relevant information is further searched in the next step.";

export const UNDER_THE_HOOD_EXTRACT_EXPLAIN_HIGHLIGHTS = ["based", "relevant"] as const;

export const UNDER_THE_HOOD_EXTRACT_CLI_PHRASE = "A Golang CLI";

export const UNDER_THE_HOOD_TRIAGE_EXPLAIN =
  "The error message and stack trace from the log drive every search below.";

export const UNDER_THE_HOOD_TRIAGE_EXPLAIN_HIGHLIGHT = "drive";

export const UNDER_THE_HOOD_CORPUS_INTRO: UnderHoodGraphNode = {
  id: "corpus-intro",
  title: "Production vs demo — where evidence comes from",
  detail:
    "In production, Clique reads real git history, release notes, and issue threads tied to the failure. This demo replays saved samples for the same three channels:",
  tone: "work",
};

export interface GitHubActionsScope {
  label: string;
  body: string;
  status: "built" | "demo" | "roadmap";
}

export const GITHUB_ACTIONS_SCOPES: GitHubActionsScope[] = [
  {
    label: "Built today",
    body: "GitHub automatically runs Clique's pipeline and confirms that an Investigation Packet can be generated from a sample failure.",
    status: "built",
  },
  {
    label: "Deployed demo",
    body: "Open the demo in the browser and walk through the workflow.",
    status: "demo",
  },
  {
    label: "Full extension (roadmap)",
    body: "A maintainer installs one GitHub Action in their repository. When a CI build fails, Clique automatically generates an Investigation Packet for that failure.",
    status: "roadmap",
  },
];

export const GITHUB_ACTIONS_BUILT_TODAY_SCOPE = GITHUB_ACTIONS_SCOPES.find(
  (scope) => scope.status === "built",
)!;

export const GITHUB_ACTIONS_DELIVERY_SECTIONS = GITHUB_ACTIONS_SCOPES.map((scope) => ({
  label: `${scope.label}:`,
  body: scope.body,
}));

export const GITHUB_ACTIONS_WHY =
  "Why GitHub Actions? It runs this pipeline automatically in CI — so every change still proves an investigation packet can be built from a real failure log.";

export const GITHUB_ACTIONS_ORCHESTRATOR_BRIDGE =
  "GitHub Actions is the orchestrator — it runs the investigation pipeline below. Today that is dev CI on our repo; roadmap: the same pipeline when your CI fails.";

export const GITHUB_ACTIONS_ORCHESTRATOR_BRIDGE_ARCHITECTURE =
  "GitHub Actions orchestrates the pipeline below — each CI run on our repo triggers the steps in order.";

export interface LogSlicerRule {
  step: string;
  rule: string;
}

export const LOG_SLICER_RULES_TITLE = "Rules it follows — golang parser (log_slicer)";

export const LOG_SLICER_RULES: LogSlicerRule[] = [
  {
    step: "Start",
    rule: 'Line contains "Traceback (most recent call last):"',
  },
  {
    step: "Collect",
    rule: "Every following line while still inside that traceback block",
  },
  {
    step: "Stop",
    rule: "First line containing TypeError:, ValueError:, or KeyError: — that becomes the exception",
  },
  {
    step: "Output",
    rule: "Exception line + full traceback → isolated_error.json (no ML, no API calls)",
  },
];

export const TRIAGE_ENGINE_FLOW_TITLE = "Inside triage_engine.py";

export const TRIAGE_ENGINE_FLOW_STEPS = [
  "Read isolated_error.json",
  "Construct search queries from traceback",
  "Retrieve candidate evidence",
  "Score candidate matches",
  "Rank investigation leads",
] as const;

export const UNDER_THE_HOOD_PHASES: UnderHoodPhaseSection[] = [
  {
    id: "input",
    step: "1",
    title: "Trigger",
    explain: "CI fails and prints a log — that's what kicks off the pipeline. It's the trigger, not the whole story.",
    nodes: [
      {
        id: "input",
        title: "CI build fails",
        detail: "The broken run leaves failed_build.log — timestamp + full output.",
        tone: "start",
      },
    ],
  },
  {
    id: "extract",
    step: "2",
    title: "Extract",
    explain: UNDER_THE_HOOD_EXTRACT_EXPLAIN,
    nodes: [
      {
        id: "parse",
        title: "Extract error + stack trace",
        detail:
          "Only exception line and stack trace are extracted — everything else discarded. Traceback files are the file paths and line numbers in that stack — they show where in your code the error surfaced.",
        tone: "work",
      },
    ],
  },
  {
    id: "triage",
    step: "3",
    title: "Gather",
    explain: UNDER_THE_HOOD_TRIAGE_EXPLAIN,
    parallel: true,
    corpusIntro: UNDER_THE_HOOD_CORPUS_INTRO,
    groups: [
      {
        id: "repo",
        label: "Repository context",
        nodes: [
          {
            id: "git",
            title: "Git commits",
            detail:
              "Git commits — recent changes in your repository. Clique checks whether your PR could explain the failure or should be ruled out (docs-only, styling, unrelated edits).",
            why: "Was it my PR or something else?",
          },
        ],
      },
      {
        id: "external",
        label: "Upstream signals",
        nodes: [
          {
            id: "external",
            title: "Structured releases & issues",
            detail:
              "Deterministic rules — separate from RAG: 6h release window + traceback substring match on release notes and issues.",
            why: "Did an upstream package change land near the failure?",
          },
        ],
      },
      {
        id: "retrieval",
        label: "Hybrid RAG",
        nodes: [
          {
            id: "retrieval",
            title: "Hybrid RAG search",
            detail:
              "Hybrid RAG (BM25 + TF-IDF + reciprocal rank fusion) ranks text in the corpus — release notes, issue bodies, changelogs — surfacing the most relevant upstream matches for the CI log clues.",
            why: "Find similar reports RAG can rank; rules alone cannot cover every phrasing.",
          },
        ],
      },
    ],
    mergeLabel: "Merge rule-based leads + RAG hits → rank into packet",
    nodes: [
      {
        id: "rank",
        title: "Rank and rule out",
        detail:
          "Promising leads rise to the top of the investigation packet. Anything that doesn't fit gets ruled out — each discard includes a short written reason so you can see what Clique dismissed and why.",
        why: "A starting order for your investigation — not a root-cause verdict.",
        paperCite: {
          label: "TOSEM 2023 · FSE 2024",
          url: "https://dl.acm.org/doi/full/10.1145/3576037",
          quote:
            "Identifying the failure is often easier than identifying its cause — developers correlate build logs with releases, issues, and repo activity before fixing.",
        },
        tone: "merge",
      },
    ],
  },
  {
    id: "output",
    step: "4",
    title: "Output",
    explain:
      "One investigation packet — ranked leads, what was ruled out, and retrieval scores. Empirical paper — Breaking-Good, 2024 motivates this packet shape. You verify; Clique doesn't declare root cause.",
    nodes: [
      {
        id: "packet",
        title: "Investigation packet",
        detail:
          "The handoff artifact: where to start, what Clique ruled out, and what to verify next — one structured packet instead of tab-hopping across logs, git, and issues.",
        why: "This is what the demo produces and what the extension will deliver on CI failure.",
        paperCite: {
          label: "Empirical paper — Breaking-Good, 2024",
          url: "https://arxiv.org/html/2407.03880v1",
          quote:
            "Explaining dependency-update failures requires build logs and dependency trees — developers need that assembled context before attempting a fix.",
        },
        artifact: "investigation_workspace.json",
        tone: "file",
      },
      {
        id: "ui",
        title: "Show it in the UI",
        detail: "Evidence, eliminations, and ranked leads — you verify before fixing.",
        tone: "finish",
      },
      {
        id: "gemini",
        title: "Gemini summary (optional later)",
        detail: "LLM narration over the ranked packet — after retrieval, never instead of it.",
        technical: "Gemini · post-ranking only",
        tone: "work",
      },
    ],
  },
  {
    id: "run",
    step: "→",
    title: "GitHub Actions — today vs roadmap",
    explain:
      "GitHub Actions runs the steps above in order on each CI run — today on our dev repo; roadmap: the same chain when a maintainer's tests fail.",
    nodes: [
      {
        id: "gha",
        title: "CI extension (GitHub Action)",
        detail: "",
        deliverySections: GITHUB_ACTIONS_DELIVERY_SECTIONS,
        tone: "extension",
      },
    ],
  },
];

export interface EngineDiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  status: "built" | "artifact" | "extension" | "roadmap" | "fixture";
}

export const ENGINE_DIAGRAM_DEMO_BANNER =
  "Demo replays saved samples; end product runs a golang parser on the CI log, then hybrid RAG (BM25 + TF-IDF + RRF) over live git, PyPI, and GitHub feeds.";

export const ENGINE_DIAGRAM_END_PRODUCT_LABEL = "END PRODUCT";

export const ENGINE_DIAGRAM_WRITE_LABEL = "Merge hits into one investigation packet";

export interface EngineDiagramFork {
  id: string;
  label: string;
  sublabel: string;
  intakeIds: string[];
  packetField: string;
}

export interface EngineDiagramInput {
  id: string;
  label: string;
  demoSource: string;
  productSource: string;
  checkLine: string;
  techStack: string;
}

export const ENGINE_DIAGRAM_GATHER_INPUTS: EngineDiagramInput[] = [
  {
    id: "git",
    label: "Recent commits",
    demoSource: "saved sample git log in repo",
    productSource: "git log on CI runner",
    checkLine: "Could your PR explain this — or rule out docs-only edits?",
    techStack: "commit classifier",
  },
  {
    id: "external",
    label: "Upstream releases & issues",
    demoSource: "saved sample releases & issues",
    productSource: "PyPI JSON · GitHub releases & issues",
    checkLine: "Package shipped within 6h + traceback snippet in notes?",
    techStack: "timed release + keyword match",
  },
  {
    id: "rag",
    label: "Hybrid RAG search",
    demoSource: "saved sample release & issue text",
    productSource: "live release notes + issue feeds",
    checkLine: "BM25 + TF-IDF + RRF rank similar report wording",
    techStack: "hybrid RAG over corpus",
  },
];

export const ENGINE_DIAGRAM_GATHER_LABEL =
  "Hybrid RAG + rules — three parallel checks on the traceback";

/** Full input list — for reference tables */
export const ENGINE_DIAGRAM_INPUTS: EngineDiagramInput[] = [
  {
    id: "log",
    label: "CI build log",
    demoSource: "saved kuberef CI failure log",
    productSource: "workflow failure log on CI runner",
    checkLine: "",
    techStack: "Golang log_slicer input",
  },
  {
    id: "isolated",
    label: "isolated_error.json",
    demoSource: "exception + stack trace JSON",
    productSource: "same extract on live CI log",
    checkLine: "",
    techStack: "Golang log_slicer output",
  },
  ...ENGINE_DIAGRAM_GATHER_INPUTS,
];

export const ENGINE_DIAGRAM_INPUTS_LABEL = ENGINE_DIAGRAM_GATHER_LABEL;

export const ENGINE_DIAGRAM_PROCESS_LABEL = "Scoring paths — Python triage (rules + hybrid RAG)";

export const ENGINE_DIAGRAM_PROCESS_PATHS: EngineDiagramFork[] = [
  {
    id: "trace",
    label: "Traceback parsing",
    sublabel: "source_file leads from stack frames",
    intakeIds: ["isolated"],
    packetField: "priority_leads",
  },
  {
    id: "git-rules",
    label: "Git elimination",
    sublabel: "rule out .css / .md / image commits",
    intakeIds: ["git"],
    packetField: "discarded · repository_commit",
  },
  {
    id: "det-rules",
    label: "Deterministic rules",
    sublabel: "6h release window + issue traceback match",
    intakeIds: ["external", "log"],
    packetField: "priority_leads",
  },
  {
    id: "hybrid-rag",
    label: "Hybrid retrieval layer",
    sublabel: "BM25 + TF-IDF + RRF over release/issue corpus",
    intakeIds: ["rag", "isolated"],
    packetField: "priority_leads · rag_retrieval",
  },
];

export const ENGINE_DIAGRAM_MERGE: EngineDiagramNode = {
  id: "merge",
  label: "Rank & merge leads",
  sublabel:
    "Merge hybrid RAG hits with git & release rules — one starting list; you verify, Clique never declares root cause",
  status: "built",
};

/** @deprecated Use ENGINE_DIAGRAM_INPUTS + ENGINE_DIAGRAM_PROCESS_PATHS */
export const ENGINE_DIAGRAM_INTAKE_LABEL = ENGINE_DIAGRAM_INPUTS_LABEL;

/** @deprecated Use ENGINE_DIAGRAM_INPUTS */
export interface EngineDiagramIntake {
  id: string;
  label: string;
  sublabel: string;
  fixture: string;
}

/** @deprecated Use ENGINE_DIAGRAM_INPUTS */
export const ENGINE_DIAGRAM_INTAKES: EngineDiagramIntake[] = ENGINE_DIAGRAM_INPUTS.map((input) => ({
  id: input.id,
  label: input.label,
  sublabel: input.checkLine || input.demoSource,
  fixture: input.techStack,
}));

/** @deprecated Use ENGINE_DIAGRAM_PROCESS_PATHS */
export const ENGINE_DIAGRAM_FORKS: EngineDiagramFork[] = ENGINE_DIAGRAM_PROCESS_PATHS;

export const ENGINE_DIAGRAM_INPUT: EngineDiagramNode = {
  id: "log",
  label: "CI build log",
  sublabel: "Failed workflow output — pipeline trigger",
  status: "artifact",
};

export const ENGINE_DIAGRAM_EXTRACT: EngineDiagramNode = {
  id: "slicer",
  label: "Strip log to error + trace",
  sublabel: "A golang parser finds the exception in noisy CI output",
  status: "built",
};

export const ENGINE_DIAGRAM_ISOLATED: EngineDiagramNode = {
  id: "isolated",
  label: "Trimmed error snapshot",
  sublabel: "Exception + stack trace only — keys for hybrid RAG and rules below",
  status: "built",
};

export const ENGINE_DIAGRAM_TRIAGE: EngineDiagramNode = {
  id: "engine",
  label: "Hybrid RAG + rule-based triage",
  sublabel: "Commits, timed releases, and RAG-ranked report matches — in parallel",
  status: "built",
};

export const ENGINE_DIAGRAM_OUTPUT: EngineDiagramNode = {
  id: "workspace",
  label: "Investigation packet",
  sublabel: "Ranked leads, ruled-out items, and match scores in one JSON file",
  status: "built",
};

export const ENGINE_DIAGRAM_UI: EngineDiagramNode = {
  id: "ui",
  label: "Guided review UI",
  sublabel: "Failure → Gather → Eliminate → Lead",
  status: "built",
};

export interface EngineDiagramRoadmapItem {
  id: string;
  title: string;
  body: string;
  tier: "planned" | "later";
}

export const ENGINE_DIAGRAM_ROADMAP_TITLE = "End product — not in demo yet";

export const ENGINE_DIAGRAM_ROADMAP_INTRO =
  "Everything in the spine above is built today on saved samples. END PRODUCT adds live evidence feeds and user CI delivery on failure — same engine.";

export const ENGINE_DIAGRAM_ROADMAP_ITEMS: EngineDiagramRoadmapItem[] = [
  {
    id: "delivery",
    title: "CI delivery (planned)",
    body: "GitHub Action on workflow failure → publishes the investigation packet on the PR or failed run",
    tier: "planned",
  },
  {
    id: "live-data",
    title: "Live evidence (planned)",
    body: "Same extract-and-gather chain — real git log, PyPI metadata, and GitHub releases/issues instead of saved samples",
    tier: "planned",
  },
  {
    id: "later",
    title: "Further roadmap",
    body: '"Open in Cursor" option on the PR · lockfile graph (which package version changed in your repo) · optional Gemini summary',
    tier: "later",
  },
];

export const ENGINE_DIAGRAM_SIMPLE_TITLE = "At a glance";

export const ENGINE_DIAGRAM_SIMPLE_SUBTITLE =
  "Vertical pipeline — same components as the detailed view, fewer labels.";

export interface EngineDiagramSimpleGather {
  id: string;
  label: string;
}

export const ENGINE_DIAGRAM_SIMPLE_GATHER: EngineDiagramSimpleGather[] = [
  { id: "git", label: "Recent commits" },
  { id: "external", label: "Releases & issues" },
  { id: "rag", label: "Hybrid RAG" },
];

export const ENGINE_DIAGRAM_SIMPLE_INPUT: EngineDiagramNode = {
  id: "log",
  label: "CI build log",
  sublabel: "trigger",
  status: "artifact",
};

export const ENGINE_DIAGRAM_SIMPLE_EXTRACT: EngineDiagramNode = {
  id: "slicer",
  label: "Strip to error + trace",
  sublabel: "golang parser",
  status: "built",
};

export const ENGINE_DIAGRAM_SIMPLE_ISOLATED: EngineDiagramNode = {
  id: "isolated",
  label: "Trimmed snapshot",
  sublabel: "RAG + rule keys",
  status: "built",
};

export const ENGINE_DIAGRAM_SIMPLE_TRIAGE: EngineDiagramNode = {
  id: "engine",
  label: "Hybrid RAG triage",
  sublabel: "rules + retrieval",
  status: "built",
};

export const ENGINE_DIAGRAM_GHA_CHIP: EngineDiagramNode = {
  id: "gha",
  label: "GitHub Actions",
  sublabel: "orchestrator · dev CI",
  status: "built",
};

export const ENGINE_DIAGRAM_SIMPLE_MERGE: EngineDiagramNode = {
  id: "merge",
  label: "Rank & merge leads",
  status: "built",
};

export const ENGINE_DIAGRAM_SIMPLE_OUTPUT: EngineDiagramNode = {
  id: "workspace",
  label: "Investigation packet",
  sublabel: "JSON artifact",
  status: "built",
};

export const ENGINE_DIAGRAM_SIMPLE_UI: EngineDiagramNode = {
  id: "ui",
  label: "Guided review UI",
  sublabel: "demo replay · end product on PR",
  status: "built",
};

/** @deprecated Use ENGINE_DIAGRAM_ROADMAP_ITEMS */
export const ENGINE_DIAGRAM_ROADMAP: EngineDiagramNode[] = [
  {
    id: "gha",
    label: "GitHub Action",
    sublabel: "workflow_run on CI failure",
    status: "roadmap",
  },
  {
    id: "pypi",
    label: "PyPI JSON API",
    sublabel: "live release metadata",
    status: "roadmap",
  },
  {
    id: "github-api",
    label: "GitHub REST API",
    sublabel: "issues + releases",
    status: "roadmap",
  },
  {
    id: "dep-tree",
    label: "Lockfile / dependency tree",
    sublabel: "Breaking-Good-aligned gap",
    status: "roadmap",
  },
  {
    id: "gemini",
    label: "Gemini API",
    sublabel: "optional · post-ranking summary",
    status: "roadmap",
  },
];

export const VALUE_BEYOND_LLM_CONCESSION =
  "AI + web search can often get you 70–90% there in one session with good prompting. Clique standardizes the packet your team and CI can reproduce.";

export const VALUE_BEYOND_LLM_COMPARISON = [
  { capability: "Multi-source ingest", generic: "Manual paste / ad-hoc web", clique: "Structured: log, git, releases, issues" },
  { capability: "Elimination trail", generic: "Not standardized", clique: "Auditable discarded list with reasons" },
  { capability: "Temporal scoring", generic: "Prompt-dependent", clique: "Rule: 6h pre-failure window in engine" },
  { capability: "Repeatability", generic: "New thread each time", clique: "Same JSON artifact on CI (roadmap)" },
  { capability: "Causation", generic: "May over-claim", clique: "Ranks leads; human verifies" },
] as const;

export const LIMITATIONS_TITLE = "Demo scenario & limitations";

export const LIMITATIONS_BUILT = [
  "Investigation engine: Go log slicer + Python triage + hybrid RAG retrieval",
  "Deterministic elimination and ranking on fixtures",
  "UI replay walkthrough (what you just watched)",
] as const;

export const LIMITATIONS_MOCKED = [
  "mock_internet/external_evidence.json — simulated releases and issues",
  "mock_internet/rag_corpus.json — retrieval corpus",
  "data/git_log_fixture.json — git history when live log unavailable",
  "No lockfile graph yet — map of which libraries you depend on and which version changed (Breaking-Good-style gap, on roadmap)",
] as const;

export const LIMITATIONS_ROADMAP = [
  "GitHub Action on CI failure (workflow_run)",
  "Live PyPI / GitHub API fetch replacing fixtures",
  "Gemini summary over ranked JSON (post-ranking only)",
  '"Open in Cursor" option on the PR',
] as const;

export const LIMITATIONS_SCOPE_CLOSE =
  "Minor scope today. Feasible extension tomorrow. Not competing with Copilot — narrowing what to verify when external dependencies break.";

/* ── Demo section — scenario intro, PR mocks, pipeline ── */

export const DEMO_SCENARIO_INTRO_TITLE = "Demo Scenario and Limitations";

export const DEMO_SCENARIO_INTRO_SUBTITLE = "This is what it looks like from a user perspective";

export const DEMO_SCENARIO_INTRO_HEADING = "Two cases from the research";

export const DEMO_SCENARIO_A_SUMMARY =
  "Scenario A — CI fails after a dependency change and the cause sits outside your repo — is where Clique helps.";

export const DEMO_SCENARIO_B_SUMMARY =
  "Scenario B — a simple bug in your own code — your IDE or AI is usually enough.";

export const DEMO_SCENARIO_A_TITLE = "Scenario A — Clique helps (dependency break)";

export const DEMO_SCENARIO_A_INPUT_LABEL = "INPUT — CI ERROR LOG";

export const DEMO_SCENARIO_A_INPUT = `[CRITICAL] 2026-06-21T11:45:34Z - Integration pipeline runner intercepted a fatal transaction validation crash.
[ERROR] Traceback (most recent call last):
  File ".../payment_gateway.py", line 42, in initialize_client
    self.client = VendorClient(..., proxies=self.config.get('proxy_routes'))
  File ".../vendor_sdk/client.py", line 114, in __init__
TypeError: Client.__init__() got unexpected keyword argument 'proxies'`;

export const DEMO_SCENARIO_B_TITLE = "Scenario B — your IDE or AI is enough (bug in your own code)";

export const DEMO_SCENARIO_B_DETAIL =
  "When the bug is in code you just wrote — a typo, missing import, or wrong variable — you open the file and fix it in your editor or with AI help. No hunting through releases, issues, or git history across dependencies.";

export const DEMO_BOT_EXPLAIN =
  "Clique installs as a GitHub Action. On CI failure it runs headlessly and posts the investigation packet as a clique-triage bot comment on the PR — same pattern as Dependabot or other GitHub Apps, not a separate chat product.";

export type BuildStatus = "working" | "mocked" | "partial" | "roadmap";

export const BUILD_STATUS_LABELS: Record<BuildStatus, string> = {
  working: "Working",
  mocked: "Mock data",
  partial: "Partial",
  roadmap: "Roadmap",
};

export interface BuildStatusRow {
  feature: string;
  status: BuildStatus;
  note: string;
}

export const BUILD_STATUS_ROWS: BuildStatusRow[] = [
  {
    feature: "Golang log traceback extraction",
    status: "working",
    note: "log_slicer → isolated_error.json",
  },
  {
    feature: "Python heuristic ranking + git elimination",
    status: "working",
    note: "Deterministic rules on fixture inputs",
  },
  {
    feature: "Hybrid RAG retrieval (BM25 + TF-IDF + RRF)",
    status: "working",
    note: "Runs on mock_internet/rag_corpus.json",
  },
  {
    feature: "React guided investigation walkthrough",
    status: "working",
    note: "Steps 1–4 replay investigation_workspace.json",
  },
  {
    feature: "External evidence (releases, issues)",
    status: "mocked",
    note: "mock_internet/external_evidence.json — not live PyPI/GitHub",
  },
  {
    feature: "Git history feed",
    status: "mocked",
    note: "data/git_log_fixture.json when live git log unavailable",
  },
  {
    feature: "UI narrative decoys",
    status: "mocked",
    note: 'express 4.21.0 elimination, Issue #483 "similar report" enrichment',
  },
  {
    feature: "Local-only pipeline",
    status: "partial",
    note: "No auth, no multi-tenant storage; single demo scenario",
  },
  {
    feature: "Static deploy / PR delivery",
    status: "partial",
    note: "Replay JSON works; no workflow_run comment on PR yet",
  },
  {
    feature: "GitHub Actions CI for log slicer",
    status: "working",
    note: "Runs on push to Clique repo — proves parser + engine (not user CI trigger yet)",
  },
  {
    feature: "Live PyPI / GitHub API fetch",
    status: "roadmap",
    note: "Same engine; swap fixtures for live feeds",
  },
  {
    feature: "CI failure auto-trigger (workflow_run)",
    status: "roadmap",
    note: "GitHub Action publishes packet on failed run",
  },
  {
    feature: "Lockfile / dependency graph",
    status: "roadmap",
    note: "Breaking-Good-style — which package version changed",
  },
  {
    feature: "Gemini / LLM summarization",
    status: "roadmap",
    note: "Post-ranking narration only — not in MVP",
  },
  {
    feature: '"Open in Cursor" on the PR',
    status: "roadmap",
    note: "Further roadmap — same packet in IDE",
  },
];

export const DEMO_THANK_YOU_TITLE = "Thank you";

export const END_PRODUCT_MCP_URI = "clique://investigation_workspace.json";

export const DEMO_PACKET_DELIVERY_TITLE = "Investigation packet on the PR";

export const DEMO_PACKET_DELIVERY_SUBTITLE =
  "The packet lands on your PR — where you are already working.";

export const DEMO_PACKET_DELIVERY_CAPTION =
  "Research (FSE 2024 study) suggests that for dependency-driven failures, understanding why the build broke often requires gathering information beyond the CI log. Clique automates that investigation step and delivers the results as this Investigation Packet.";

export const DEMO_PACKET_MOCK_NOTE =
  "External feeds use mock data in this run — same ranking logic.";

export const DEMO_CURSOR_HANDOFF_TITLE = "Open in Cursor via MCP";

export const DEMO_CURSOR_HANDOFF_SUBTITLE =
  "For developers who use AI, there is an option to open in Cursor directly — the internal handoff works through MCP, but that is roadmap for now.";

export const DEMO_CURSOR_HANDOFF_CAPTION =
  "The investigation packet JSON and ranking engine are built today.";

export const DEMO_BUILD_STATUS_TITLE = "Build status";

export const DEMO_BUILD_STATUS_SUBTITLE =
  "What is built, mock data, partial, and roadmap today.";

export const END_PRODUCT_REPO = "acme-payments / api-service";

export const END_PRODUCT_PR_NUMBER = "847";

export const END_PRODUCT_PR_TITLE = "Update dependency versions";

export const END_PRODUCT_CHECK_NAME = "Integration tests";

export const END_PRODUCT_CHECK_ERROR =
  "TypeError: Client.__init__() got unexpected keyword argument 'proxies'";

export const DEMO_PR_FAILURE_SUBTITLE =
  "This PR only updates dependencies — but CI failed, and the error isn't in your diff.";

export const DEMO_PR_FAILURE_CAPTION =
  "Clique runs when CI fails and posts an investigation packet on the PR.";

export const DEMO_PROCESSING_TITLE = "What Clique does with the log internally";

export const DEMO_PROCESSING_SUBTITLE =
  "From CI error to investigation packet — five steps under the hood.";

export const DEMO_PROCESSING_CAPTION =
  "You skip manually ruling out unrelated changes and start at the most likely dependency lead.";

export type DemoProcessingStepStatus = "built" | "mocked" | "roadmap";

export interface DemoProcessingStep {
  id: string;
  label: string;
  detail: string;
  status: DemoProcessingStepStatus;
}

export const DEMO_PROCESSING_STEPS: DemoProcessingStep[] = [
  {
    id: "log",
    label: "Read the CI log",
    detail: "Failed workflow output — the trigger when a check turns red",
    status: "built",
  },
  {
    id: "extract",
    label: "Extract the error",
    detail: "Pull out the exception line and stack trace from noisy output",
    status: "built",
  },
  {
    id: "gather",
    label: "Gather evidence",
    detail: "Recent commits, upstream releases, and similar issue reports",
    status: "mocked",
  },
  {
    id: "rank",
    label: "Rank & rule out",
    detail: "Score matches and drop docs-only commits and weak leads",
    status: "built",
  },
  {
    id: "packet",
    label: "Build the packet",
    detail: "One investigation packet — ranked leads and what was ruled out",
    status: "built",
  },
];

export const HUDA_LANDING_HEADLINE =
  "What Huda would see investigating a kuberef CI failure";

export const HUDA_LANDING_BRIDGE =
  "Today: clone + run-dev.sh + localhost. Tomorrow: install once — packet appears on the PR when CI fails.";

export const HUDA_LANDING_LINE =
  "Watch what gets gathered, ruled out, and ranked for this external dependency break.";

/* ── Act 0: personal origin story (I, not we) ── */

export const INTRO_HEADLINE =
  "How external dependencies hurt repos — and how hard investigation really is";

export const INTRO_SUBTITLE =
  "I wondered about this problem, built Clique to explore it, and talked to maintainers who've lived it.";

export const INTRO_ORIGIN =
  "I wondered how external dependencies hurt repos — and how hard it is to deal with them when CI breaks for reasons your PR doesn't explain.";

export const INTRO_BUILD =
  "I tried to build something around that question. To validate the idea, I contacted maintainers who've actually dealt with external dependency failures in production.";

export const INTRO_VALIDATION =
  "Based on what they told me, this is what I came up with — a complement to AI, not a replacement for it.";

export const INTRO_NICHE_NOTE =
  "I realised this complement won't fit every repo. It's for maintainers like Huda — and repos like hers. Not a universal tool.";

export const HUDA_LIKE_REPOS_TITLE = "What I mean by “repos like Huda's”";

export const HUDA_LIKE_REPOS_BULLETS = [
  "Open source with fast-moving upstream libraries (CNCF / Kubernetes Python ecosystem)",
  "Occasionally, CI breaks after an upstream dependency update — even though the PR itself is unrelated. Investigating whether the update is relevant often requires external evidence.",
  "When a clean PR fails, maintainers already look at external update logs — not just the diff",
] as const;

export const NICHE_SPEC_TITLE = "The failure mode I'm targeting";

export const NICHE_SPEC_BULLETS = [
  "CI fails on a clean PR — your changes didn't touch the code in the traceback",
  "The error points at an external dependency, not your application files",
  "An upstream release or library change may explain “why today”",
  "Investigation spans logs, git, release notes, and issues — not your repo alone",
] as const;

export const NICHE_SKIP_LINE =
  "Most in-repo bugs don't need this. Simple failures are still fine with normal debugging.";

export const INTRO_MAINTAINERS = [
  {
    name: "Huda Naaz",
    role: "Open source maintainer, CNCF community · maintainer of kuberef",
    note: "Fast-moving external dependencies — she sees this failure mode more often. She looks at external update logs when a clean PR breaks.",
  },
  {
    name: "Ajeet Singh",
    role: "Software developer & maintainer · Open Sox",
    note: "External dependency breaks are rare for him — but finding the issue is always the most time-consuming part when they happen.",
  },
] as const;

export const INTRO_AI_LINE =
  "Clique is a complement to AI — it narrows what to investigate first. I'm not claiming it fixes the build or replaces how you already debug.";

/* ── Research ── */

export const RESEARCH_SUBTITLE =
  "When an external dependency break doesn't match the PR, investigation time dominates.";

export const RESEARCH_PAIN_CALLOUT =
  "The pain isn't reading the error. It's connecting external update logs and release notes to this specific failure — the runtime behaviour link Huda described as time-consuming.";

export const AJEET_AI_CALLOUT =
  "AI helps when the clue is already in reach — finding the issue is still the hard part.";

export const AJEET_AI_QUOTE =
  "i use cursor and yeah it does help if the context within it's reach";

export const AI_COMPLEMENT_RESEARCH = {
  title: "Where Clique could complement AI",
  body: "AI can read your logs and diff and suggest fixes. On external dependency breaks, the evidence often lives in release notes and issues outside your repo — and gathering that still takes manual hunting before any tool has a solid starting point.",
};

/* ── Today ── */

export const TODAY_SCREEN_TITLE = HUDA_WORKFLOW_TITLE;

export const TODAY_SCREEN_SUBTITLE = HUDA_WORKFLOW_SUBTITLE;

export const CURSOR_CONTEXT_TODAY = {
  title: "The expensive step is before the fix",
  body: "After CI fails, developers read the log and may ask AI for help — that works when context is in the repo. When it's an external dependency break, the ranked lead still means opening release notes, changelogs, and GitHub issues across dependency repos. You tab-hop between sources, build a hypothesis, then start debugging. That middle hunt — not reading the error — is what takes twenty minutes.",
};

export const TODAY_NARROW_GAP =
  "Clique narrows what AI (or you) would need to search — release notes, issues, git noise — so investigation starts somewhere concrete. I'm not claiming Clique solves the build.";

export const TODAY_CLIQUE_REPLACES =
  "Clique doesn't replace AI or normal debugging. It shortens the hunt for external dependency evidence between error and fix.";

export const TODAY_OUTCOME_TEASER =
  "What you'd get: one starting point + what was ruled out + how to verify";

export const FLOW_ZONE_IN_REPO = "In your repo";
export const FLOW_ZONE_OUTSIDE = "Outside your repo — external dependencies";
export const FLOW_AI_CAPTION = "Logs & code in your tree";
export const FLOW_BRANCH_CAPTION =
  "External dependency releases & issues — hunted manually today";

/* ── Approach ── */

export const JUDGE_AI_QUESTION = {
  title: "Why build this if AI exists?",
  sections: [
    {
      text: "Yes — Cursor has web search and Copilot reasons from your repo and logs. For a typo or a bug in your diff, that's often enough. This demo is for when the failure doesn't match the PR and the clue is in upstream releases and issues that still need assembly and verification.",
    },
    {
      label: "When people still search again after AI replies",
      text: "To verify a guess against the actual release notes. When AI gave a generic “check dependencies” answer without ranking which release landed before the failure. When multiple upstream libraries changed in the same window and correlation is still manual. When the relevant upstream release wasn't already in the assistant's working context. When the team needs the same starting point next time — not a new chat thread.",
    },
    {
      label: "What Clique actually does",
      text: "Gathers external dependency evidence — releases, issues, git signals — crosses out noise, ranks where to look first. You verify from there. Clique narrows the search; it doesn't claim root cause.",
    },
  ],
};

export const ROADMAP_TITLE = "Where this goes next (plain English)";

export const ROADMAP_STEPS = [
  {
    step: "1",
    title: "CI fails",
    detail: "Clique runs automatically in the background — you don't open a new app (future)",
  },
  {
    step: "2",
    title: "Evidence gathered",
    detail: "Release notes, issues, and git signals pulled together — noise ruled out",
  },
  {
    step: "3",
    title: "Starting point delivered",
    detail: "A clear “look here first” on the PR or in your tools — especially on the rare day Ajeet-style repos need it",
  },
] as const;

export const ROADMAP_FOOTER =
  "Today: this demo uses sample data. Tomorrow: the same flow, triggered when CI goes red.";

export const SETUP_TODAY_TITLE = "Try it yourself today (manual demo)";

export const SETUP_TODAY_STEPS = [
  {
    step: "1",
    title: "Clone the repo",
    detail: "github.com/ashmitha247/clique-triage",
  },
  {
    step: "2",
    title: "Add your CI log",
    detail: "Save the failed build output as data/failed_build.log — or use the sample log included",
  },
  {
    step: "3",
    title: "Run the pipeline",
    detail: "bash run-dev.sh — parses the log, ranks evidence, syncs JSON to the UI",
  },
  {
    step: "4",
    title: "Open the walkthrough",
    detail: "localhost:5173 — same elimination flow you saw in this demo",
  },
] as const;

export const SETUP_IN_REPO_TITLE = "In your repo after deploy (roadmap)";

export const SETUP_IN_REPO_STEPS = [
  {
    step: "1",
    title: "Add one workflow file",
    detail: "Drop clique-triage.yml in .github/workflows/ — runs when your CI fails (planned)",
  },
  {
    step: "2",
    title: "CI failure triggers Clique",
    detail: "No new app to open — the pipeline runs in the background on the failed run",
  },
  {
    step: "3",
    title: "Get the packet",
    detail: "Investigation JSON on the PR as a comment or downloadable artifact",
  },
  {
    step: "4",
    title: "Investigate from the starting point",
    detail: "Check the ranked release or issue — verify, then fix in your editor or AI as you already do",
  },
] as const;

export const SETUP_FOOTER =
  "The demo you just watched is step 4 — the packet. Steps 1–3 are what I am building next so maintainers don't run bash scripts by hand.";

export const APPROACH_SUBTITLE =
  "How Clique narrows external dependency investigation — without claiming to fix the build.";

export const OUTCOME_TITLE = "What you get";

export const OUTCOME_TAGLINE =
  "A narrowed search space for external dependency breaks — not a root-cause verdict.";

export const OUTCOME_ITEMS = [
  {
    label: "Starting point",
    detail: "Where to spend the next 15 minutes — not “we found it”",
  },
  {
    label: "Ruled out",
    detail: "What was examined and discarded — with reasons",
  },
  {
    label: "Verify next",
    detail: "Concrete steps (e.g. check a release, re-run CI)",
  },
] as const;

export const OUTCOME_SUBLINE =
  "A structured investigation packet — you take it from here.";

export const COMPLEMENT_HANDOFF =
  "Clique narrows the hunt — then you fix in Cursor, Copilot, or your editor. The extension hands off context; AI and debugging do the rest.";

export const TECH_LEGEND =
  "Built today: log parser → evidence ranking → noise rules → workspace JSON → this UI";

export const EXAMPLE_OUTPUT_TITLE = "Example output (your scenario)";

export const LANDING_DEMO_HEADLINE = HUDA_LANDING_HEADLINE;

export const LANDING_DEMO_LINE = HUDA_LANDING_LINE;

export const LANDING_DEMO_BRIDGE = HUDA_LANDING_BRIDGE;

/** Plain-English display labels for tech architecture nodes (by id). */
export const TECH_DISPLAY: Record<string, { label: string; detail?: string }> = {
  ci: { label: "CI failure" },
  go: { label: "Log parser", detail: "Pull traceback from CI log" },
  rag: {
    label: "Evidence ranking",
    detail: "Match release notes, issues, changelogs",
  },
  rules: { label: "Noise rules", detail: "Cross out docs / CSS / unrelated commits" },
  json: { label: "Investigation workspace", detail: "Unified JSON artifact" },
  ui: { label: "This UI", detail: "Guided walkthrough & demo" },
  gemini: { label: "AI summary", detail: "Narrates ranked evidence — roadmap" },
  gha: {
    label: "Auto-run on CI failure",
    detail: "Future: gather evidence when the build goes red",
  },
};

/* ── Closing roadmap slides (post-product, demo only) ── */

export const ROADMAP_SCOPE_ACT = "Act 6 — Scope";

export const ROADMAP_SCOPE_TITLE = "Honest scope — and when verification still takes work";

export const ROADMAP_SCOPE_NICHE =
  "I'm not building for every CI failure. This targets external dependency breaks on clean PRs — repos like Huda's, not all repos.";

export const ROADMAP_SCOPE_AI_GAP_TITLE = "When people still search after AI or Copilot";

export const ROADMAP_SCOPE_AI_GAPS = [
  "AI primarily reasons from the repository, logs, and what's already in context — the relevant upstream release may still need fetching and verification",
  "AI suggests \"check vendor_sdk\" — you still open release notes to confirm timing and the proxies change",
  "Generic \"check dependencies\" — you still need which release landed before the failure",
  "Multiple upstream libraries changed in the same window — correlating which release explains this failure is still manual",
  "Timeline — release at 9:06, build red at 11:48 — correlating that is still manual",
  "Next failure — no shared packet; the hunt starts again from zero",
] as const;

export const ROADMAP_SCOPE_AI_CLOSE =
  "AI can suggest. Clique tries to assemble and narrow external dependency evidence for verification — especially where external update logs matter.";

export const ROADMAP_SCOPE_CAUSATION =
  "Clique does not say “a dependency updated, therefore that's the cause.” It says: CI failed, an upstream update happened nearby — here's external evidence to investigate whether they're related.";

export const ROADMAP_SCOPE_INVESTIGATION_FLOW = [
  "CI failed",
  "Was there an upstream update nearby?",
  "Collect release notes, version changes, timing, changelogs, related issues",
  "Investigation packet — ranked leads, ruled out, verify next",
] as const;

export const ROADMAP_SCOPE_COMPARABLES_TITLE = "Comparable niche tools (not claiming Clique's scale)";

export const ROADMAP_SCOPE_COMPARABLES = [
  {
    name: "Failed Build Issue",
    type: "GitHub Action",
    detail: "Opens or comments on issues when CI fails",
    scale: "Single-purpose marketplace Action",
  },
  {
    name: "Workflow Notify",
    type: "GitHub Action",
    detail: "Slack notification on workflow status",
    scale: "Small focused Action",
  },
  {
    name: "Workflow Monitor",
    type: "VS Code extension",
    detail: "Sidebar CI run tracking in the editor",
    scale: "~10 installs — very niche, still shipped",
  },
  {
    name: "Act locally",
    type: "VS Code extension",
    detail: "Run GitHub Actions locally for testing",
    scale: "~1k installs — narrow dev audience",
  },
  {
    name: "Workflow Dispatch",
    type: "VS Code extension",
    detail: "One-click workflow_dispatch — complements the official GitHub extension",
    scale: "Niche complement, not a platform",
  },
] as const;

export const ROADMAP_SCOPE_COMPARABLES_CLOSE =
  "I'm not claiming millions of users. Plenty of dev tools are narrow — CI failure bots, local act runners, dispatch helpers — and they serve thousands of repos or installs, not consumer scale. Clique would be that kind of integration: a packet when external dependency CI breaks, not another chat app.";

export const ROADMAP_EXTENSION_ACT = "Act 7 — Roadmap";

export const ROADMAP_EXTENSION_TITLE = "Engine built · extension next";

export const ROADMAP_EXTENSION_SUBTITLE =
  "The hard part I proved is the investigation packet. The extension is wiring.";

export const ROADMAP_ENGINE_TITLE = "Built today — investigation engine";

export const ROADMAP_ENGINE_ITEMS = [
  "CI log → log slicer (Go)",
  "→ triage engine (Python, deterministic)",
  "→ investigation_workspace.json",
  "→ UI replay (what you just watched)",
] as const;

export const ROADMAP_ENGINE_STATUS = "Demo-proven on fixtures";

export const ROADMAP_DELIVERY_TITLE = "Roadmap — low-key extension / delivery";

export const ROADMAP_DELIVERY_ITEMS = [
  "GitHub Action on CI failure (workflow_run)",
  "Runs the engine headlessly — no manual bash",
  "Delivers packet: PR comment or downloadable artifact",
  '"Open in Cursor" option on the PR',
] as const;

export const ROADMAP_DELIVERY_STATUS = "Planned — hackathon demo shows the engine only";

export const ROADMAP_EXTENSION_KEY_MESSAGE =
  "One YAML file on failure, post the JSON you already saw. Install once; helps on the rare day you need it — not every build.";

export const ROADMAP_EXTENSION_SETUP_TODAY = "Today: clone → add failed_build.log → bash run-dev.sh → localhost";

export const ROADMAP_EXTENSION_SETUP_TOMORROW =
  "Tomorrow: add workflow → CI fails → packet on PR → investigate from the starting point";

export const ROADMAP_EXTENSION_FOOTER =
  "You watched step 4 of the engine. Steps 1–3 of delivery are what I build next.";

export const ROADMAP_EXTENSION_CLOSE =
  "Minor scope today. Feasible extension tomorrow. Not competing with Copilot — narrowing what to verify when external dependencies break.";

export interface PacketRationaleRow {
  question: string;
  readsFromDemo: string;
  readsFromProduct: string;
  packetField: string;
  status: "built" | "roadmap" | "gap";
  sourceType: "fixture" | "live-roadmap" | "engine";
}

export const PACKET_RATIONALE_TITLE = "Trigger → gather → packet";

export const PACKET_RATIONALE_INTRO =
  "CI log starts the run. Each row is a question the packet answers. Purple = demo today; green = end product target.";

export const PACKET_RATIONALE_ROWS: PacketRationaleRow[] = [
  {
    question: "What failed?",
    readsFromDemo: "Golang log_slicer → isolated_error.json",
    readsFromProduct: "CI build log on workflow failure",
    packetField: "isolated_exception · source_file leads",
    status: "built",
    sourceType: "fixture",
  },
  {
    question: "Did my repo change matter?",
    readsFromDemo: "Python triage · saved sample git log",
    readsFromProduct: "git log / GitHub commit history API",
    packetField: "discarded · repository_commit leads",
    status: "built",
    sourceType: "fixture",
  },
  {
    question: "Did an upstream release land near the failure?",
    readsFromDemo: "Python rule engine · saved sample releases & issues",
    readsFromProduct: "PyPI JSON API · GitHub release notes",
    packetField: "package_release leads (deterministic rules)",
    status: "built",
    sourceType: "fixture",
  },
  {
    question: "Are others seeing this error?",
    readsFromDemo: "Python hybrid RAG (BM25 + TF-IDF + RRF) · saved sample corpus",
    readsFromProduct: "GitHub issues · public release/changelog corpus",
    packetField: "community_issue leads · rag_retrieval",
    status: "built",
    sourceType: "fixture",
  },
  {
    question: "What should I check first?",
    readsFromDemo: "Python merge_priority_leads() ranking",
    readsFromProduct: "Same Python ranking engine on live inputs",
    packetField: "priority_leads (ranked, no verdict)",
    status: "built",
    sourceType: "engine",
  },
  {
    question: "Which dependency version changed?",
    readsFromDemo: "—",
    readsFromProduct: "lockfile graph — which package version changed",
    packetField: "dependency context (not in JSON yet)",
    status: "gap",
    sourceType: "live-roadmap",
  },
];

export const ROADMAP_EXTENSION_SOURCES_TITLE = "Sources reference";

export const ROADMAP_EXTENSION_SOURCES = [
  {
    category: "Research",
    name: "Breaking-Good, 2024",
    url: "https://arxiv.org/html/2407.03880v1",
    influences: "Partial precedent: log + dependency context → structured pre-debug explanation (compile-focused; known update)",
  },
  {
    category: "Research",
    name: "FSE 2025 — Automatically Fixing Dependency Breaking Changes (Fruntke & Krinke)",
    url: "https://doi.org/10.1145/3729366",
    influences: "Gap Clique fills: LLM repair tops ~23% on BUMP — standardized investigation packet still missing",
  },
  {
    category: "Research",
    name: "FSE 2024 — Behavioral Breaking Changes in Client Apps",
    url: "https://valerio-terragni.github.io/assets/pdf/jayasuriya-fse-2024.pdf",
    influences: "Supports thesis: SemVer violations in minor/patch releases are real but rare (~2.3% client test impact)",
  },
  {
    category: "Research",
    name: "EMSE 2021 — SemVer & Breaking Changes in Maven Central",
    url: "https://homepages.cwi.nl/~jurgenv/papers/EMSE-2021.pdf",
    influences: "Supports thesis: backward compatibility is common; ~20% of non-major upgrades can still break clients",
  },
  {
    category: "User research",
    name: "Maintainer conversations — Huda Naaz (kuberef), Ajeet (Open Sox)",
    influences: "Problem framing: investigation time dominates; frequency varies by stack",
  },
  {
    category: "API (roadmap)",
    name: "PyPI JSON API — /pypi/{package}/json",
    url: "https://warehouse.pypa.io/api-reference/json.html",
    influences: "Live release metadata to replace mock_internet fixtures",
  },
  {
    category: "API (roadmap)",
    name: "GitHub REST API — issues & releases",
    url: "https://docs.github.com/en/rest",
    influences: "Live community issue + release note fetch",
  },
  {
    category: "Platform docs",
    name: "GitHub Dependabot troubleshooting",
    url: "https://docs.github.com/en/code-security/dependabot",
    influences: "Dependabot answers what updated — not whether that update explains this failure",
  },
  {
    category: "Platform docs",
    name: "GitHub — Fix with Copilot for failing Actions",
    url: "https://github.blog/changelog/2026-06-04-fix-with-copilot-for-failing-actions-now-in-pro-pro-and-max/",
    influences: "Adjacent product: optimizes for a fix PR; Clique optimizes for the investigation packet",
  },
  {
    category: "Mock dataset (demo)",
    name: "Golang log_slicer · saved CI failure log",
    influences: "Seeds isolated_error.json — exception line + stack trace search signal",
  },
  {
    category: "Mock dataset (demo)",
    name: "Python rule engine · saved releases & issues",
    influences: "Deterministic 6h release window + community issue traceback overlap",
  },
  {
    category: "Mock dataset (demo)",
    name: "Python hybrid RAG · saved release/issue corpus",
    influences: "BM25 + TF-IDF + reciprocal rank fusion over release/issue text",
  },
  {
    category: "Mock dataset (demo)",
    name: "Python git history · saved sample git log",
    influences: "Git elimination — .css/.md/image commits discarded with auditable reasons",
  },
] as const;

export const ROADMAP_EXTENSION_SCORING_TITLE = "How sources influence output (deterministic MVP)";

export const ROADMAP_EXTENSION_SCORING_RULES = [
  "Temporal proximity — releases within 6h before the failure timestamp rank higher (TEMPORAL_PROXIMITY_HOURS)",
  "Traceback overlap — community issues matching the exception text rank higher",
  "Git elimination — .css / .md / images auto-discarded with explicit reason strings",
  "Hybrid RAG — BM25 + TF-IDF + reciprocal rank fusion over rag_corpus.json; scores auditable in workspace JSON",
  "No root-cause claim — output is ranked investigation leads + elimination trail, not a fix",
] as const;

export const ROADMAP_EXTENSION_WHY_NOT_AI_TITLE = "Why not paste the same input into ChatGPT / Claude / Gemini?";

export const ROADMAP_EXTENSION_WHY_NOT_AI = [
  "Generic AI gets one paste buffer — Clique correlates log + git + releases + issues from structured inputs",
  "Elimination is domain-specific and auditable — examined signals → discarded with reasons → ranked leads",
  "Same inputs → same investigation_workspace.json — reproducible for CI, not a new chat thread",
  "Workflow automation — run-dev.sh runs Go slicer → Python triage → JSON → UI without manual tab-hopping",
  "AI can suggest; Clique assembles the packet first — then you verify and fix in your editor",
] as const;
