import { motion } from "framer-motion";
import { APPROACH_HERO } from "../../demo/approachContent";
import {
  CURSOR_CONTEXT_TODAY,
  TODAY_CLIQUE_REPLACES,
  TODAY_NARROW_GAP,
  TODAY_OUTCOME_TEASER,
  TODAY_SCREEN_SUBTITLE,
  TODAY_SCREEN_TITLE,
} from "../../demo/presentationNarrative";
import { WORKFLOW_OBSERVATION } from "../../demo/maintainerResearch";
import { CursorContextCallout } from "./CursorContextCallout";
import { MessyInvestigationFlow } from "./MessyInvestigationFlow";
import { NicheSpecificationCard } from "./NicheSpecificationCard";
import { PresentationShell } from "./PresentationShell";
import { ScenarioStrip } from "./ScenarioStrip";

interface CurrentWorkflowScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function CurrentWorkflowScreen({ onBack, onNext }: CurrentWorkflowScreenProps) {
  return (
    <PresentationShell
      act="workflow"
      title={TODAY_SCREEN_TITLE}
      subtitle={TODAY_SCREEN_SUBTITLE}
      onBack={onBack}
      onNext={onNext}
      nextLabel="Next: Our Approach"
    >
      <ScenarioStrip />

      <div className="today-two-column">
        <div className="today-flow-column">
          <h3 className="approach-column-title">Current investigation workflow</h3>
          <MessyInvestigationFlow />
          <CursorContextCallout
            title={CURSOR_CONTEXT_TODAY.title}
            body={CURSOR_CONTEXT_TODAY.body}
          />
          <p className="today-narrow-gap">{TODAY_NARROW_GAP}</p>
        </div>

        <aside className="today-callout-column">
          <NicheSpecificationCard />
          <div className="today-observation presentation-card">
            <h4 className="today-observation-title">Observation</h4>
            <p>{WORKFLOW_OBSERVATION}</p>
          </div>
        </aside>
      </div>

      <p className="clique-replaces-line">{TODAY_CLIQUE_REPLACES}</p>

      <motion.section
        className="today-hero-card presentation-card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="today-hero-text">{APPROACH_HERO}</p>
      </motion.section>

      <section className="outcome-teaser presentation-card">
        <p className="outcome-teaser-text">{TODAY_OUTCOME_TEASER}</p>
      </section>
    </PresentationShell>
  );
}
