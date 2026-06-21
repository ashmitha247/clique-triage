import { motion } from "framer-motion";

interface LogParsingPhaseProps {
  exception: string;
  showException: boolean;
}

export function LogParsingPhase({ exception, showException }: LogParsingPhaseProps) {
  return (
    <div className="focus-screen">
      {!showException ? (
        <motion.div
          className="focus-status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="focus-pulse-dot" aria-hidden />
          Parsing build logs…
        </motion.div>
      ) : (
        <motion.div
          className="exception-reveal phase-card"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="focus-label">Exception extracted</div>
          <motion.pre
            className="exception-pulse"
            animate={{
              boxShadow: [
                "0 0 0 rgba(239, 68, 68, 0)",
                "0 0 24px rgba(239, 68, 68, 0.25)",
                "0 0 0 rgba(239, 68, 68, 0)",
              ],
            }}
            transition={{ duration: 1.8, repeat: 2, ease: "easeInOut" }}
          >
            {exception}
          </motion.pre>
        </motion.div>
      )}
    </div>
  );
}
