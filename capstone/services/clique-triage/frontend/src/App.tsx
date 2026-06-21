import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

const STEP_ORDER: ActiveStep[] = ["landing", "step1", "step2", "step3", "step4", "done"];

function nextStep(current: ActiveStep): ActiveStep {
  const index = STEP_ORDER.indexOf(current);
  return STEP_ORDER[Math.min(index + 1, STEP_ORDER.length - 1)] ?? current;
}

function prevStep(current: ActiveStep): ActiveStep {
  const index = STEP_ORDER.indexOf(current);
  return STEP_ORDER[Math.max(index - 1, 0)] ?? current;
}

export default function App() {
  const [step, setStep] = useState<GuidedStep>("loading");
  const [data, setData] = useState<TransformedWorkspace | null>(null);

  useEffect(() => {
    fetchWorkspace()
      .then((workspace) => {
        setData(transformWorkspace(workspace));
        setStep("landing");
      })
      .catch(() => setStep("error"));
  }, []);

  const handleStart = useCallback(() => setStep("step1"), []);
  const handleNext = useCallback(() => {
    setStep((current) => nextStep(current as ActiveStep));
  }, []);
  const handleBack = useCallback(() => {
    setStep((current) => prevStep(current as ActiveStep));
  }, []);
  const handleRestart = useCallback(() => setStep("landing"), []);

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

  return (
    <div className="session-shell">
      <div className="session">
        <AnimatePresence mode="wait">
          {step === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <LandingScreen onStart={handleStart} />
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
