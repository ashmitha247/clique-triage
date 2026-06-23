import type { GuidedStep } from "../types/workspace";
import {
  DEMO_BUILD_STATUS_SUBTITLE,
  DEMO_BUILD_STATUS_TITLE,
  DEMO_THANK_YOU_TITLE,
  DEMO_CURSOR_HANDOFF_CAPTION,
  DEMO_CURSOR_HANDOFF_SUBTITLE,
  DEMO_CURSOR_HANDOFF_TITLE,
  DEMO_PACKET_DELIVERY_CAPTION,
  DEMO_PACKET_DELIVERY_SUBTITLE,
  DEMO_PACKET_DELIVERY_TITLE,
  DEMO_PR_FAILURE_CAPTION,
  DEMO_PR_FAILURE_SUBTITLE,
  DEMO_PROCESSING_CAPTION,
  DEMO_PROCESSING_SUBTITLE,
  DEMO_PROCESSING_TITLE,
  DEMO_SCENARIO_INTRO_SUBTITLE,
  DEMO_SCENARIO_INTRO_TITLE,
} from "./presentationNarrative";

export type DemoSectionStep = Extract<
  GuidedStep,
  | "demo-scenario-intro"
  | "demo-pr-failure"
  | "demo-processing-pipeline"
  | "demo-packet-delivery"
  | "demo-cursor-handoff"
  | "demo-build-status"
  | "demo-thank-you"
  | "step1"
  | "step2"
  | "step3"
  | "step4"
  | "limitations"
>;

/** Full demo flow — indices match on-screen DEMO · n/11 progress */
export const DEMO_FLOW_STEPS: DemoSectionStep[] = [
  "demo-scenario-intro",
  "demo-pr-failure",
  "demo-processing-pipeline",
  "demo-packet-delivery",
  "demo-cursor-handoff",
  "demo-build-status",
  "demo-thank-you",
  "step1",
  "step2",
  "step3",
  "step4",
];

export interface DemoStepMeta {
  sectionIndex: number;
  sectionTotal: number;
  title: string;
  subtitle?: string;
  caption?: string;
  nextLabel: string;
}

export function getDemoStepMeta(step: DemoSectionStep): DemoStepMeta {
  const sectionIndex = DEMO_FLOW_STEPS.indexOf(step) + 1;
  const sectionTotal = DEMO_FLOW_STEPS.length;

  if (step === "demo-scenario-intro") {
    return {
      sectionIndex,
      sectionTotal,
      title: DEMO_SCENARIO_INTRO_TITLE,
      subtitle: DEMO_SCENARIO_INTRO_SUBTITLE,
      nextLabel: "Next: CI failed on PR",
    };
  }

  if (step === "demo-pr-failure") {
    return {
      sectionIndex,
      sectionTotal,
      title: "CI failed on your PR",
      subtitle: DEMO_PR_FAILURE_SUBTITLE,
      caption: DEMO_PR_FAILURE_CAPTION,
      nextLabel: "Next: Processing pipeline",
    };
  }

  if (step === "demo-processing-pipeline") {
    return {
      sectionIndex,
      sectionTotal,
      title: DEMO_PROCESSING_TITLE,
      subtitle: DEMO_PROCESSING_SUBTITLE,
      caption: DEMO_PROCESSING_CAPTION,
      nextLabel: "Next: Packet on PR",
    };
  }

  if (step === "demo-packet-delivery") {
    return {
      sectionIndex,
      sectionTotal,
      title: DEMO_PACKET_DELIVERY_TITLE,
      subtitle: DEMO_PACKET_DELIVERY_SUBTITLE,
      caption: DEMO_PACKET_DELIVERY_CAPTION,
      nextLabel: "Next: Open in Cursor",
    };
  }

  if (step === "demo-cursor-handoff") {
    return {
      sectionIndex,
      sectionTotal,
      title: DEMO_CURSOR_HANDOFF_TITLE,
      subtitle: DEMO_CURSOR_HANDOFF_SUBTITLE,
      caption: DEMO_CURSOR_HANDOFF_CAPTION,
      nextLabel: "Next: Build status",
    };
  }

  if (step === "demo-build-status") {
    return {
      sectionIndex,
      sectionTotal,
      title: DEMO_BUILD_STATUS_TITLE,
      subtitle: DEMO_BUILD_STATUS_SUBTITLE,
      nextLabel: "Next: Thank you",
    };
  }

  if (step === "demo-thank-you") {
    return {
      sectionIndex,
      sectionTotal,
      title: DEMO_THANK_YOU_TITLE,
      nextLabel: "Open the packet",
    };
  }

  if (step === "step1") {
    return {
      sectionIndex,
      sectionTotal,
      title: "Inside the investigation packet",
      nextLabel: "Next: Evidence gathered",
    };
  }

  if (step === "step2") {
    return {
      sectionIndex,
      sectionTotal,
      title: "Inside the investigation packet",
      nextLabel: "Next: Elimination",
    };
  }

  if (step === "step3") {
    return {
      sectionIndex,
      sectionTotal,
      title: "Inside the investigation packet",
      nextLabel: "Next: Investigation lead",
    };
  }

  if (step === "step4") {
    return {
      sectionIndex,
      sectionTotal,
      title: "Inside the investigation packet",
      nextLabel: "Restart demo",
    };
  }

  return {
    sectionIndex,
    sectionTotal,
    title: "Demo",
    nextLabel: "Next",
  };
}
