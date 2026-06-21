import { REPLAY_STEP_COUNT, REPLAY_STEP_LABELS, type InvestigationPhase } from "../types/workspace";

interface PhaseHeaderProps {
  phase: Exclude<InvestigationPhase, "loading" | "trigger" | "error">;
}

const PHASE_ORDER: Exclude<InvestigationPhase, "loading" | "trigger" | "error">[] = [
  "parsing",
  "dependency",
  "ecosystem",
  "eliminating",
  "connecting",
  "verdict",
  "evidence",
  "timeline",
];

export function PhaseHeader({ phase }: PhaseHeaderProps) {
  const step = PHASE_ORDER.indexOf(phase) + 1;
  const title = REPLAY_STEP_LABELS[phase];

  return (
    <header className="phase-header">
      <div className="phase-step">
        Investigation replay · Step {step} of {REPLAY_STEP_COUNT}
      </div>
      <h2 className="phase-title">{title}</h2>
    </header>
  );
}
