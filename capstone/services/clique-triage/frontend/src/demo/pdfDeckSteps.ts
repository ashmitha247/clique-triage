import type { GuidedStep } from "../types/workspace";

/** Slides exported to PDF: prelude through build status (no packet walkthrough). */
export const PDF_DECK_STEPS = [
  "origin",
  "web-research",
  "maintainer-validation",
  "huda-today",
  "approach-plain",
  "value-beyond-llm",
  "under-the-hood",
  "technical-architecture",
  "data-sources",
  "demo-scenario-intro",
  "demo-pr-failure",
  "demo-processing-pipeline",
  "demo-packet-delivery",
  "demo-cursor-handoff",
  "demo-build-status",
] as const satisfies readonly GuidedStep[];

export type PdfDeckStep = (typeof PDF_DECK_STEPS)[number];
