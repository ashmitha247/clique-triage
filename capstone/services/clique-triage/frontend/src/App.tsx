import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IntroScreen } from "./components/demo/IntroScreen";
import { ArchitectureScreen } from "./components/demo/ArchitectureScreen";
import { CurrentWorkflowScreen } from "./components/demo/CurrentWorkflowScreen";
import { ResearchScreen } from "./components/demo/ResearchScreen";
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

function buildStepOrder(demoMode: boolean): ActiveStep[] {
  const product: ActiveStep[] = ["landing", "step1", "step2", "step3", "step4", "done"];
  if (!demoMode) return product;
  return ["intro", "research", "workflow", "architecture", ...product];
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
  const demoMode = useMemo(
    () => new URLSearchParams(window.location.search).has("demo"),
    [],
  );
  const stepOrder = useMemo(() => buildStepOrder(demoMode), [demoMode]);

  const [step, setStep] = useState<GuidedStep>("loading");
  const [data, setData] = useState<TransformedWorkspace | null>(null);

  useEffect(() => {
    fetchWorkspace()
      .then((workspace) => {
        setData(transformWorkspace(workspace));
        setStep(demoMode ? "intro" : "landing");
      })
      .catch(() => setStep("error"));
  }, [demoMode]);

  const handleStart = useCallback(() => setStep("step1"), []);
  const handleNext = useCallback(() => {
    setStep((current) => nextStep(current as ActiveStep, stepOrder));
  }, [stepOrder]);
  const handleBack = useCallback(() => {
    setStep((current) => prevStep(current as ActiveStep, stepOrder));
  }, [stepOrder]);
  const handleRestart = useCallback(() => {
    setStep(demoMode ? "intro" : "landing");
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

  const isPrelude =
    demoMode &&
    (step === "intro" || step === "research" || step === "workflow" || step === "architecture");
  const isLandingDemo = demoMode && step === "landing";
  const isProductPhase =
    step === "step1" || step === "step2" || step === "step3" || step === "step4" || step === "done" ||
    (!demoMode && step === "landing");

  return (
    <div className="session-shell">
      <div className="ambient-glow ambient-glow-a" aria-hidden />
      <div className="ambient-glow ambient-glow-b" aria-hidden />
      <div
        className={`session${isPrelude ? " session-presentation" : ""}${isLandingDemo ? " session-landing-demo" : ""}${isProductPhase ? " session-product" : ""}`}
      >
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <IntroScreen onNext={handleNext} />
            </motion.div>
          )}

          {step === "research" && (
            <motion.div
              key="research"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <ResearchScreen onNext={handleNext} />
            </motion.div>
          )}

          {step === "workflow" && (
            <motion.div
              key="workflow"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <CurrentWorkflowScreen onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {step === "architecture" && (
            <motion.div
              key="architecture"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <ArchitectureScreen onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {step === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
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
                <EvidenceGatheredStep gitSource={data.gitSource} ragRetrieval={data.ragRetrieval} />
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
                nextLabel="See handoff"
              >
                <InvestigationLeadStep lead={data.investigationLead} primaryLeadUrl={data.primaryLeadUrl} />
              </GuidedShell>
            </motion.div>
          )}

          {step === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
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
