import { motion } from "framer-motion";
import {
  NOISE_EXAMPLES,
  TIMELINE_CAPTION,
  TIMELINE_EXAMPLE,
  WORKFLOW_STEPS,
  type WorkflowStep,
} from "../../demo/approachContent";

interface InvestigationWorkflowProps {
  activeStep: number;
}

function StepBlock({
  step,
  index,
  activeStep,
}: {
  step: WorkflowStep;
  index: number;
  activeStep: number;
}) {
  const visible = index <= activeStep;
  const isTimeline = step.id === "timeline";
  const isElimination = step.id === "elimination";
  const timelineActive = activeStep >= 3;
  const eliminationActive = activeStep >= 4;
  const timelineProgress = Math.max(0, activeStep - 3);

  return (
    <motion.li
      className="approach-workflow-step"
      initial={{ opacity: 0, y: 8 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="approach-step-index">{index + 1}</div>
      <div className="approach-step-content">
        <h4 className="approach-step-title">{step.title}</h4>
        <p className="approach-step-desc">{step.description}</p>

        {isTimeline && visible && (
          <div className="approach-timeline">
            <p className="approach-timeline-label">Example</p>
            <ul className="approach-timeline-list">
              {TIMELINE_EXAMPLE.map((event, eventIndex) => (
                <motion.li
                  key={event.time}
                  className={`approach-timeline-item${event.isFailure ? " approach-timeline-failure" : ""}`}
                  initial={{ opacity: 0 }}
                  animate={
                    timelineActive && eventIndex <= timelineProgress
                      ? { opacity: 1 }
                      : { opacity: timelineActive ? 0.3 : 0 }
                  }
                  transition={{ duration: 0.3, delay: eventIndex * 0.12 }}
                >
                  <span
                    className={`approach-timeline-dot${timelineActive && eventIndex <= timelineProgress ? " approach-timeline-dot-glow" : ""}`}
                    aria-hidden
                  />
                  <span className="approach-timeline-time">{event.time}</span>
                  <span className="approach-timeline-text">{event.label}</span>
                </motion.li>
              ))}
            </ul>
            <motion.p
              className="approach-timeline-caption"
              initial={{ opacity: 0 }}
              animate={timelineActive ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.35 }}
            >
              {TIMELINE_CAPTION}
            </motion.p>
          </div>
        )}

        {isElimination && visible && (
          <ul className="approach-noise-list" aria-label="Discarded noise examples">
            {NOISE_EXAMPLES.map((item, noiseIndex) => (
              <motion.li
                key={item}
                className="approach-noise-item"
                animate={
                  eliminationActive
                    ? { opacity: 0.4, textDecoration: "line-through" }
                    : { opacity: 1, textDecoration: "none" }
                }
                transition={{ duration: 0.4, delay: noiseIndex * 0.15 }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.li>
  );
}

export function InvestigationWorkflow({ activeStep }: InvestigationWorkflowProps) {
  return (
    <div className="approach-workflow">
      <h3 className="approach-column-title">Investigation Workflow</h3>
      <ol className="approach-workflow-list">
        {WORKFLOW_STEPS.map((step, index) => (
          <StepBlock key={step.id} step={step} index={index} activeStep={activeStep} />
        ))}
      </ol>
    </div>
  );
}
