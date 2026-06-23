import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ApproachPlainScreen } from "./components/demo/ApproachPlainScreen";
import { DemoBuildStatusScreen } from "./components/demo/DemoBuildStatusScreen";
import { DemoThankYouScreen } from "./components/demo/DemoThankYouScreen";
import { DemoCursorHandoffScreen } from "./components/demo/DemoCursorHandoffScreen";
import { DemoPacketDeliveryScreen } from "./components/demo/DemoPacketDeliveryScreen";
import { DemoProcessingPipelineScreen } from "./components/demo/DemoProcessingPipelineScreen";
import { DemoPrFailureScreen } from "./components/demo/DemoPrFailureScreen";
import { DemoScenarioIntroScreen } from "./components/demo/DemoScenarioIntroScreen";
import { DataSourcesScreen } from "./components/demo/DataSourcesScreen";
import { HudaWorkflowScreen } from "./components/demo/HudaWorkflowScreen";
import { MaintainerValidationScreen } from "./components/demo/MaintainerValidationScreen";
import { PdfDeckExport } from "./components/demo/PdfDeckExport";
import { OriginScreen } from "./components/demo/OriginScreen";
import { UnderTheHoodScreen } from "./components/demo/UnderTheHoodScreen";
import { ArchitectureOverviewScreen } from "./components/demo/ArchitectureOverviewScreen";
import { TechnicalArchitectureScreen } from "./components/demo/TechnicalArchitectureScreen";
import { ValueBeyondLLMScreen } from "./components/demo/ValueBeyondLLMScreen";
import { WebResearchScreen } from "./components/demo/WebResearchScreen";
import { EvidenceGatheredStep } from "./components/EvidenceGatheredStep";
import { EliminationStep } from "./components/EliminationStep";
import { FailureStep } from "./components/FailureStep";
import { GuidedShell } from "./components/GuidedShell";
import { HandoffStep } from "./components/HandoffStep";
import { InvestigationLeadStep } from "./components/InvestigationLeadStep";
import { LandingScreen } from "./components/LandingScreen";
import { fetchWorkspace, transformWorkspace } from "./lib/transformWorkspace";
import { GUIDED_STEP_COPY, type GuidedStep, type TransformedWorkspace } from "./types/workspace";
import "./styles/globals.css";

type ActiveStep = Exclude<GuidedStep, "loading" | "error">;

const DEMO_PRELUDE: ActiveStep[] = [
  "origin",
  "web-research",
  "maintainer-validation",
  "huda-today",
  "approach-plain",
  "value-beyond-llm",
  "under-the-hood",
  "technical-architecture",
  "architecture-overview",
  "data-sources",
];

const DEMO_SECTION: ActiveStep[] = [
  "demo-scenario-intro",
  "demo-pr-failure",
  "demo-processing-pipeline",
  "demo-packet-delivery",
  "demo-cursor-handoff",
  "demo-build-status",
  "demo-thank-you",
];

function buildStepOrder(demoMode: boolean): ActiveStep[] {
  const productEnd: ActiveStep[] = demoMode
    ? ["step1", "step2", "step3", "step4"]
    : ["landing", "step1", "step2", "step3", "step4", "done"];
  if (!demoMode) return productEnd;
  return [...DEMO_PRELUDE, ...DEMO_SECTION, ...productEnd];
}

function nextStep(current: ActiveStep, order: ActiveStep[]): ActiveStep {
  const index = order.indexOf(current);
  return order[Math.min(index + 1, order.length - 1)] ?? current;
}

function prevStep(current: ActiveStep, order: ActiveStep[]): ActiveStep {
  const index = order.indexOf(current);
  return order[Math.max(index - 1, 0)] ?? current;
}

export default function App() {
  const demoMode = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.has("demo");
  }, []);
  const pdfExport = useMemo(
    () => new URLSearchParams(window.location.search).has("pdf"),
    [],
  );
  const stepOrder = useMemo(() => buildStepOrder(demoMode), [demoMode]);

  const [step, setStep] = useState<GuidedStep>("loading");
  const [data, setData] = useState<TransformedWorkspace | null>(null);

  useEffect(() => {
    fetchWorkspace()
      .then((workspace) => {
        setData(transformWorkspace(workspace));
        setStep(demoMode ? "origin" : "landing");
      })
      .catch(() => setStep("error"));
  }, [demoMode]);

  const handleStart = useCallback(() => setStep("step1"), []);
  const handleNext = useCallback(() => {
    setStep((current) => {
      if (demoMode && current === "step4") {
        return "origin";
      }
      return nextStep(current as ActiveStep, stepOrder);
    });
  }, [demoMode, stepOrder]);
  const handleBack = useCallback(() => {
    setStep((current) => prevStep(current as ActiveStep, stepOrder));
  }, [stepOrder]);
  const handleRestart = useCallback(() => {
    setStep(demoMode ? "origin" : "landing");
  }, [demoMode]);

  if (step === "loading") {
    return (
      <div className="session-shell">
        <div className="session session-loading">Loading investigation workspace…</div>
      </div>
    );
  }

  if (step === "error" || !data) {
    return (
      <div className="session-shell">
        <div className="session">
          <div className="advisory phase-card">
            Workspace not found. Run <code>bash run-dev.sh</code> from{" "}
            <code>capstone/services/clique-triage</code>
          </div>
        </div>
      </div>
    );
  }

  if (pdfExport) {
    return (
      <div className="session-shell session-shell-pdf-export">
        <PdfDeckExport data={data} />
      </div>
    );
  }

  const isPrelude = demoMode && DEMO_PRELUDE.includes(step as ActiveStep);
  const isDemoSection = demoMode && DEMO_SECTION.includes(step as ActiveStep);
  const isLandingDemo = demoMode && step === "landing";
  const isProductPhase =
    step === "step1" ||
    step === "step2" ||
    step === "step3" ||
    step === "step4" ||
    step === "done" ||
    (!demoMode && step === "landing");

  const motionProps = {
    initial: { opacity: 0, y: 8 } as const,
    animate: { opacity: 1, y: 0 } as const,
    exit: { opacity: 0, y: -8 } as const,
    transition: { duration: 0.35 },
  };

  return (
    <div className="session-shell">
      <div className="ambient-glow ambient-glow-a" aria-hidden />
      <div className="ambient-glow ambient-glow-b" aria-hidden />
      <div
        className={`session${isPrelude || isDemoSection ? " session-presentation" : ""}${isLandingDemo ? " session-landing-demo" : ""}${isProductPhase ? " session-product" : ""}`}
      >
        <AnimatePresence mode="wait">
          {step === "origin" && (
            <motion.div key="origin" {...motionProps}>
              <OriginScreen onNext={handleNext} />
            </motion.div>
          )}

          {step === "web-research" && (
            <motion.div key="web-research" {...motionProps}>
              <WebResearchScreen onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {step === "maintainer-validation" && (
            <motion.div key="maintainer-validation" {...motionProps}>
              <MaintainerValidationScreen onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {step === "huda-today" && (
            <motion.div key="huda-today" {...motionProps}>
              <HudaWorkflowScreen onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {step === "approach-plain" && (
            <motion.div key="approach-plain" {...motionProps}>
              <ApproachPlainScreen onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {step === "value-beyond-llm" && (
            <motion.div key="value-beyond-llm" {...motionProps}>
              <ValueBeyondLLMScreen onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {step === "under-the-hood" && (
            <motion.div key="under-the-hood" {...motionProps}>
              <UnderTheHoodScreen onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {step === "technical-architecture" && (
            <motion.div key="technical-architecture" {...motionProps}>
              <TechnicalArchitectureScreen onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {step === "architecture-overview" && (
            <motion.div key="architecture-overview" {...motionProps}>
              <ArchitectureOverviewScreen onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {step === "data-sources" && (
            <motion.div key="data-sources" {...motionProps}>
              <DataSourcesScreen onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {step === "demo-scenario-intro" && (
            <motion.div key="demo-scenario-intro" {...motionProps}>
              <DemoScenarioIntroScreen onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {step === "demo-pr-failure" && (
            <motion.div key="demo-pr-failure" {...motionProps}>
              <DemoPrFailureScreen onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {step === "demo-processing-pipeline" && (
            <motion.div key="demo-processing-pipeline" {...motionProps}>
              <DemoProcessingPipelineScreen onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {step === "demo-packet-delivery" && (
            <motion.div key="demo-packet-delivery" {...motionProps}>
              <DemoPacketDeliveryScreen data={data} onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {step === "demo-cursor-handoff" && (
            <motion.div key="demo-cursor-handoff" {...motionProps}>
              <DemoCursorHandoffScreen data={data} onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {step === "demo-build-status" && (
            <motion.div key="demo-build-status" {...motionProps}>
              <DemoBuildStatusScreen onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {step === "demo-thank-you" && (
            <motion.div key="demo-thank-you" {...motionProps}>
              <DemoThankYouScreen onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {step === "landing" && (
            <motion.div key="landing" {...motionProps}>
              <LandingScreen onStart={handleStart} demoMode={demoMode} />
            </motion.div>
          )}

          {step === "step1" && (
            <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GuidedShell step="step1" copy={GUIDED_STEP_COPY.step1} onBack={handleBack} onNext={handleNext}>
                <FailureStep
                  exception={data.exception}
                  service={data.service}
                  failureClock={data.failureClock}
                />
              </GuidedShell>
            </motion.div>
          )}

          {step === "step2" && (
            <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GuidedShell step="step2" copy={GUIDED_STEP_COPY.step2} onBack={handleBack} onNext={handleNext}>
                <EvidenceGatheredStep
                  gitSource={data.gitSource}
                  ragRetrieval={data.ragRetrieval}
                  priorityLeads={data.priorityLeads}
                  discarded={data.discarded}
                />
              </GuidedShell>
            </motion.div>
          )}

          {step === "step3" && (
            <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GuidedShell step="step3" copy={GUIDED_STEP_COPY.step3} onBack={handleBack} onNext={handleNext}>
                <EliminationStep items={data.eliminated} summary={data.evidenceSummary} />
              </GuidedShell>
            </motion.div>
          )}

          {step === "step4" && (
            <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GuidedShell
                step="step4"
                copy={GUIDED_STEP_COPY.step4}
                onBack={handleBack}
                onNext={handleNext}
                nextLabel={demoMode ? "Restart demo" : "See handoff"}
              >
                <InvestigationLeadStep lead={data.investigationLead} primaryLeadUrl={data.primaryLeadUrl} />
              </GuidedShell>
            </motion.div>
          )}

          {step === "done" && !demoMode && (
            <motion.div key="done" {...motionProps}>
              <HandoffStep
                leadPrimary={data.investigationLead.primary}
                primaryLeadUrl={data.primaryLeadUrl}
                onRestart={handleRestart}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
