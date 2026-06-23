import { ENGINE_DIAGRAM_SIMPLE_SUBTITLE } from "./presentationNarrative";
import type { GuidedStep } from "../types/workspace";

export type PdfSection = "problem" | "under-hood" | "sources" | "vs-llm" | "demo";

export const PDF_SECTION_LABELS: Record<PdfSection, string> = {
  problem: "Problem",
  "under-hood": "Under-the-hood",
  sources: "Sources",
  "vs-llm": "vs LLM",
  demo: "Demo",
};

export const PDF_SECTION_ORDER: PdfSection[] = [
  "problem",
  "under-hood",
  "sources",
  "vs-llm",
  "demo",
];

export type PreludeStep = Extract<
  GuidedStep,
  | "origin"
  | "web-research"
  | "maintainer-validation"
  | "huda-today"
  | "approach-plain"
  | "under-the-hood"
  | "technical-architecture"
  | "architecture-overview"
  | "data-sources"
  | "value-beyond-llm"
>;

export interface StepMeta {
  section: PdfSection;
  sectionIndex: number;
  sectionTotal: number;
  title: string;
  subtitle?: string;
  nextLabel: string;
}

const PROBLEM_STEPS: PreludeStep[] = ["origin", "web-research", "maintainer-validation"];

const UNDER_HOOD_STEPS: PreludeStep[] = ["huda-today", "approach-plain", "under-the-hood"];

const PRELUDE_META: Record<PreludeStep, Omit<StepMeta, "sectionIndex" | "sectionTotal">> = {
  origin: {
    section: "problem",
    title: "Where this started",
    nextLabel: "Next: What research suggested",
  },
  "web-research": {
    section: "problem",
    title: "What the research suggested",
    nextLabel: "Next: Maintainer insights",
  },
  "maintainer-validation": {
    section: "problem",
    title: "Insights from maintainers",
    subtitle:
      "The empirical papers confirmed the problem exists — maintainers confirmed it shows up in practice.",
    nextLabel: "Next: Huda's workflow today",
  },
  "huda-today": {
    section: "under-hood",
    title: "Manual hunt — and what Clique targets",
    subtitle: "The expensive work is outside the log line.",
    nextLabel: "Next: What Clique gives you",
  },
  "approach-plain": {
    section: "under-hood",
    title: "What Clique gives you",
    subtitle: "A complement extension — investigation handoff, not another fix bot.",
    nextLabel: "Next: Value beyond generic LLM",
  },
  "under-the-hood": {
    section: "under-hood",
    title: "Under the hood — how it works",
    nextLabel: "Next: Technical architecture",
  },
  "technical-architecture": {
    section: "sources",
    title: "Technical architecture",
    subtitle:
      "Golang CLI extraction, hybrid RAG retrieval, and how GitHub Actions orchestrates the pipeline.",
    nextLabel: "Next: At a glance",
  },
  "architecture-overview": {
    section: "sources",
    title: "At a glance",
    subtitle: ENGINE_DIAGRAM_SIMPLE_SUBTITLE,
    nextLabel: "Next: Data sources",
  },
  "data-sources": {
    section: "sources",
    title: "Data sources",
    subtitle: "Fixtures, APIs, papers, and maintainer research.",
    nextLabel: "Next: Demo scenario",
  },
  "value-beyond-llm": {
    section: "vs-llm",
    title: "Value Beyond a Generic LLM",
    nextLabel: "Next: Under the hood",
  },
};

function sectionSteps(section: PdfSection): PreludeStep[] {
  switch (section) {
    case "problem":
      return PROBLEM_STEPS;
    case "under-hood":
      return UNDER_HOOD_STEPS;
    case "sources":
      return ["technical-architecture", "architecture-overview", "data-sources"];
    case "vs-llm":
      return ["value-beyond-llm"];
    default:
      return [];
  }
}

export function getPreludeStepMeta(step: PreludeStep): StepMeta {
  const base = PRELUDE_META[step];
  const stepsInSection = sectionSteps(base.section);
  return {
    ...base,
    sectionIndex: stepsInSection.indexOf(step) + 1,
    sectionTotal: stepsInSection.length,
  };
}

export function getPdfSectionIndex(section: PdfSection): number {
  return PDF_SECTION_ORDER.indexOf(section);
}
