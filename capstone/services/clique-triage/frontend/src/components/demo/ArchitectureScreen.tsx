import { useEffect, useState } from "react";
import { WORKFLOW_STEPS } from "../../demo/approachContent";
import { APPROACH_SUBTITLE, JUDGE_AI_QUESTION } from "../../demo/presentationNarrative";
import { CliqueApproachFlow } from "./CliqueApproachFlow";
import { ComplementHandoffStrip } from "./ComplementHandoffStrip";
import { CursorContextCallout } from "./CursorContextCallout";
import { InvestigationWorkflow } from "./InvestigationWorkflow";
import { OutcomeCard } from "./OutcomeCard";
import { PresentationShell } from "./PresentationShell";
import { RoadmapStrip } from "./RoadmapStrip";
import { SetupInRepoStrip } from "./SetupInRepoStrip";
import { ScenarioStrip } from "./ScenarioStrip";
import { TechnicalArchitecturePanel } from "./TechnicalArchitecturePanel";

interface ArchitectureScreenProps {
  onBack: () => void;
  onNext: () => void;
}

const STEP_INTERVAL_MS = 450;
const TOTAL_STEPS = WORKFLOW_STEPS.length;

export function ArchitectureScreen({ onBack, onNext }: ArchitectureScreenProps) {
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    setActiveStep(-1);
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < TOTAL_STEPS; i += 1) {
      timers.push(
        setTimeout(() => {
          setActiveStep(i);
        }, (i + 1) * STEP_INTERVAL_MS),
      );
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <PresentationShell
      act="architecture"
      title="My Approach"
      subtitle={APPROACH_SUBTITLE}
      onBack={onBack}
      onNext={onNext}
      nextLabel="Next: See the product"
    >
      <ScenarioStrip />
      <OutcomeCard />
      <CursorContextCallout
        title={JUDGE_AI_QUESTION.title}
        sections={JUDGE_AI_QUESTION.sections}
        variant="judge"
      />
      <RoadmapStrip />
      <SetupInRepoStrip />

      <div className="approach-contrast">
        <div className="approach-contrast-clique">
          <h3 className="approach-column-title">Clique approach</h3>
          <CliqueApproachFlow />
        </div>
      </div>

      <div className="approach-two-column">
        <InvestigationWorkflow activeStep={activeStep} />
        <TechnicalArchitecturePanel reportVisible={activeStep >= TOTAL_STEPS - 1} />
      </div>

      <ComplementHandoffStrip />
    </PresentationShell>
  );
}
