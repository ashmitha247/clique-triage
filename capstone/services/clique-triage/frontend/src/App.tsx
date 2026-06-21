import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DependencyChainPhase } from "./components/DependencyChainPhase";
import { EcosystemEvidencePhase } from "./components/EcosystemEvidencePhase";
import { EliminationSequence } from "./components/EliminationSequence";
import { EvidenceConstellation } from "./components/EvidenceConstellation";
import { EvidenceScreen } from "./components/EvidenceScreen";
import { LogParsingPhase } from "./components/LogParsingPhase";
import { PhaseHeader } from "./components/PhaseHeader";
import { TimelineScreen } from "./components/TimelineScreen";
import { TriggerScreen } from "./components/TriggerScreen";
import { VerdictScreen } from "./components/VerdictScreen";
import { fetchWorkspace, transformWorkspace } from "./lib/transformWorkspace";
import type { InvestigationPhase, TransformedWorkspace } from "./types/workspace";
import "./styles/globals.css";

const PARSING_WAIT_MS = 1800;
const PARSING_HOLD_MS = 2800;
const PHASE_PAUSE_MS = 1600;
const CHAIN_FIRST_MS = 1000;
const CHAIN_STEP_MS = 1400;
const ECOSYSTEM_FIRST_MS = 1000;
const ECOSYSTEM_STEP_MS = 1600;
const ELIMINATION_MS = 3800;
const DEPRIORITIZE_EXTRA_MS = 2200;
const CONSTELLATION_NODE_MS = 1400;
const CONSTELLATION_BEFORE_FOCUS_MS = 1000;
const CONSTELLATION_FOCUS_MS = 3200;
const VERDICT_HOLD_MS = 3500;
const EVIDENCE_HOLD_MS = 4000;
const TIMELINE_STEP_MS = 1000;
const TIMELINE_END_MS = 2000;

export default function App() {
  const [phase, setPhase] = useState<InvestigationPhase>("loading");
  const [data, setData] = useState<TransformedWorkspace | null>(null);
  const [showException, setShowException] = useState(false);
  const [chainVisible, setChainVisible] = useState(0);
  const [ecosystemVisible, setEcosystemVisible] = useState(0);
  const [elimIndex, setElimIndex] = useState(0);
  const [constellationNodes, setConstellationNodes] = useState(0);
  const [constellationFocused, setConstellationFocused] = useState(false);
  const [timelineVisible, setTimelineVisible] = useState(0);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    fetchWorkspace()
      .then((workspace) => {
        setData(transformWorkspace(workspace));
        setPhase("trigger");
      })
      .catch(() => setPhase("error"));
  }, []);

  useEffect(() => {
    if (phase !== "parsing") return;

    if (!showException) {
      const timer = setTimeout(() => setShowException(true), PARSING_WAIT_MS);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setChainVisible(0);
      setPhase("dependency");
    }, PARSING_HOLD_MS);
    return () => clearTimeout(timer);
  }, [phase, showException]);

  useEffect(() => {
    if (phase !== "dependency" || !data) return;

    if (chainVisible === 0) {
      const timer = setTimeout(() => setChainVisible(1), CHAIN_FIRST_MS);
      return () => clearTimeout(timer);
    }

    if (chainVisible >= data.dependencyChain.length) {
      const timer = setTimeout(() => {
        setEcosystemVisible(0);
        setPhase("ecosystem");
      }, PHASE_PAUSE_MS);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setChainVisible((n) => n + 1), CHAIN_STEP_MS);
    return () => clearTimeout(timer);
  }, [phase, chainVisible, data]);

  useEffect(() => {
    if (phase !== "ecosystem" || !data) return;

    if (ecosystemVisible === 0) {
      const timer = setTimeout(() => setEcosystemVisible(1), ECOSYSTEM_FIRST_MS);
      return () => clearTimeout(timer);
    }

    if (ecosystemVisible >= data.ecosystemCards.length) {
      const timer = setTimeout(() => {
        setElimIndex(0);
        setPhase("eliminating");
      }, PHASE_PAUSE_MS);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setEcosystemVisible((n) => n + 1), ECOSYSTEM_STEP_MS);
    return () => clearTimeout(timer);
  }, [phase, ecosystemVisible, data]);

  useEffect(() => {
    if (phase !== "eliminating" || !data) return;

    if (elimIndex >= data.eliminated.length) {
      const timer = setTimeout(() => {
        setConstellationNodes(0);
        setConstellationFocused(false);
        setPhase("connecting");
      }, PHASE_PAUSE_MS);
      return () => clearTimeout(timer);
    }

    const item = data.eliminated[elimIndex];
    const delay =
      item.status === "deprioritized" ? ELIMINATION_MS + DEPRIORITIZE_EXTRA_MS : ELIMINATION_MS;

    const timer = setTimeout(() => setElimIndex((n) => n + 1), delay);
    return () => clearTimeout(timer);
  }, [phase, elimIndex, data]);

  useEffect(() => {
    if (phase !== "connecting" || !data) return;

    const orderLen = data.constellation.revealOrder.length;

    if (!constellationFocused && constellationNodes < orderLen) {
      const delay = constellationNodes === 0 ? CHAIN_FIRST_MS : CONSTELLATION_NODE_MS;
      const timer = setTimeout(() => setConstellationNodes((n) => n + 1), delay);
      return () => clearTimeout(timer);
    }

    if (!constellationFocused && constellationNodes >= orderLen) {
      const timer = setTimeout(() => setConstellationFocused(true), CONSTELLATION_BEFORE_FOCUS_MS);
      return () => clearTimeout(timer);
    }

    if (constellationFocused) {
      const timer = setTimeout(() => {
        setTimelineVisible(0);
        setShowReset(false);
        setPhase("verdict");
      }, CONSTELLATION_FOCUS_MS);
      return () => clearTimeout(timer);
    }
  }, [phase, constellationNodes, constellationFocused, data]);

  useEffect(() => {
    if (phase !== "verdict") return;
    const timer = setTimeout(() => setPhase("evidence"), VERDICT_HOLD_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "evidence") return;
    const timer = setTimeout(() => {
      setTimelineVisible(0);
      setPhase("timeline");
    }, EVIDENCE_HOLD_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "timeline" || !data) return;

    if (timelineVisible < data.reportTimeline.length) {
      const timer = setTimeout(() => setTimelineVisible((n) => n + 1), TIMELINE_STEP_MS);
      return () => clearTimeout(timer);
    }

    if (!showReset) {
      const timer = setTimeout(() => setShowReset(true), TIMELINE_END_MS);
      return () => clearTimeout(timer);
    }
  }, [phase, timelineVisible, showReset, data]);

  const resetReplay = useCallback(() => {
    setShowException(false);
    setChainVisible(0);
    setEcosystemVisible(0);
    setElimIndex(0);
    setConstellationNodes(0);
    setConstellationFocused(false);
    setTimelineVisible(0);
    setShowReset(false);
  }, []);

  const handleBegin = useCallback(() => {
    resetReplay();
    setPhase("parsing");
  }, [resetReplay]);

  const handleReset = useCallback(() => {
    resetReplay();
    setPhase("trigger");
  }, [resetReplay]);

  const replayPhase = (p: InvestigationPhase): p is Exclude<InvestigationPhase, "loading" | "trigger" | "error"> =>
    !["loading", "trigger", "error"].includes(p);

  if (phase === "loading") {
    return (
      <div className="session-shell">
        <div className="session">Loading…</div>
      </div>
    );
  }

  if (phase === "error" || !data) {
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
      <div className="ambient-glow ambient-glow-a" aria-hidden />
      <div className="ambient-glow ambient-glow-b" aria-hidden />

      <div className="session">
        <AnimatePresence mode="wait">
          {phase === "trigger" && (
            <motion.div
              key="trigger"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
            >
              <TriggerScreen exception={data.exception} onBegin={handleBegin} />
            </motion.div>
          )}

          {replayPhase(phase) && (
            <motion.div
              key={phase}
              className="phase-view"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <PhaseHeader phase={phase} />

              {phase === "parsing" && (
                <LogParsingPhase exception={data.exception} showException={showException} />
              )}

              {phase === "dependency" && (
                <DependencyChainPhase chain={data.dependencyChain} visibleCount={chainVisible} />
              )}

              {phase === "ecosystem" && (
                <EcosystemEvidencePhase cards={data.ecosystemCards} visibleCount={ecosystemVisible} />
              )}

              {phase === "eliminating" && (
                <EliminationSequence
                  items={data.eliminated}
                  activeIndex={elimIndex}
                  summary={data.evidenceSummary}
                />
              )}

              {phase === "connecting" && (
                <EvidenceConstellation
                  nodes={data.constellation.nodes}
                  edges={data.constellation.edges}
                  revealOrder={data.constellation.revealOrder}
                  visibleNodeCount={constellationNodes}
                  focusNodeId={data.constellation.focusNodeId}
                  focused={constellationFocused}
                  primaryLeadLabel={data.primaryLeadLabel}
                />
              )}

              {phase === "verdict" && (
                <VerdictScreen lead={data.investigationLead} primaryLeadUrl={data.primaryLeadUrl} />
              )}

              {phase === "evidence" && <EvidenceScreen signals={data.primarySignals} />}

              {phase === "timeline" && (
                <TimelineScreen events={data.reportTimeline} visibleCount={timelineVisible} />
              )}

              {showReset && phase === "timeline" && (
                <motion.button
                  type="button"
                  className="btn-reset"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  onClick={handleReset}
                >
                  New investigation
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
