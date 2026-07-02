import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  "Loading projects...",
  "Fetching experience...",
  "Preparing skills...",
  "Almost there...",
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 3.5 + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        return next;
      });
    }, 45);

    const stepInterval = setInterval(() => {
      setStepIndex((i) => (i + 1) % STEPS.length);
    }, 900);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8"
          style={{ background: "var(--bg-primary)" }}
        >
          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p
              className="font-display font-black tracking-tight"
              style={{
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                color: "var(--text-primary)",
              }}
            >
              Sampath<span style={{ color: "var(--accent)" }}>.</span>
            </p>
            <p
              className="font-mono text-xs mt-1"
              style={{ color: "var(--text-muted)", letterSpacing: "0.15em" }}
            >
              AI & ML ENGINEER
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-56 flex flex-col gap-3">
            <div
              className="w-full h-0.5 rounded-full overflow-hidden"
              style={{ background: "var(--border)" }}
            >
              <motion.div
                className="h-full rounded-full loader-bar"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.04 }}
              />
            </div>

            {/* Status text */}
            <div className="flex justify-between items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={stepIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="font-mono text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {STEPS[stepIndex]}
                </motion.p>
              </AnimatePresence>
              <span
                className="font-mono text-xs tabular-nums"
                style={{ color: "var(--text-muted)" }}
              >
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
