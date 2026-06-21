export const SCENARIO = {
  headline: "Clean PR — your diff didn't touch the failing code.",
  error: "TypeError: unexpected keyword argument 'proxies'",
  question:
    "Nothing in my changes explains this. Which external dependency change caused it?",
};

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
  "CI can break when a dependency updates — even though the PR looks unrelated",
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
    name: "Ajeet",
    role: "Maintainer · Open Sox",
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

export const TODAY_SCREEN_TITLE = "How investigations happen for some repos today";

export const TODAY_SCREEN_SUBTITLE =
  "Not every team — this is the workflow maintainers described for external dependency breaks.";

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
      text: "Yes — Cursor has web search and Copilot lives in your repo. For a typo or a bug in your diff, that's often enough. This demo is for when the failure doesn't match the PR and the clue is in external dependency releases and issues — not in the files Copilot already indexed.",
    },
    {
      label: "When people still search again after AI replies",
      text: "To verify a guess against the actual release notes. When AI gave a generic “check dependencies” answer without ranking which release landed before the failure. When git history has noise (docs/CSS commits) AI didn't rule out. When the break is in a library repo Copilot never indexed. When the team needs the same starting point next time — not a new chat thread.",
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
  "Clique narrows the hunt. AI and normal debugging still do the fixing.";

export const TECH_LEGEND =
  "Built today: log parser → evidence ranking → noise rules → workspace JSON → this UI";

export const EXAMPLE_OUTPUT_TITLE = "Example output (your scenario)";

export const LANDING_DEMO_HEADLINE =
  "See the investigation packet for this external dependency break";

export const LANDING_DEMO_LINE =
  "Watch what gets gathered, ruled out, and ranked — the proof behind the Approach slide.";

export const LANDING_DEMO_BRIDGE =
  "You saw the thesis in the prelude. This walkthrough shows the packet in action.";

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
