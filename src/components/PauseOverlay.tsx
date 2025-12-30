import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play } from "lucide-react";

interface PauseOverlayProps {
  isPaused: boolean;
  onResume: () => void;
}

export const PauseOverlay = ({ isPaused, onResume }: PauseOverlayProps) => {
  return (
    <AnimatePresence>
      {isPaused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={onResume}>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="text-center flex flex-col items-center gap-6 bg-slate-900/95 rounded-2xl border border-purple-500/30"
            style={{ padding: "48px 64px" }}>
            <div>
              <Pause className="w-14 h-14 mx-auto text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Paused</h2>
            <p className="text-slate-400 text-base">
              Press P or click to continue
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onResume();
              }}
              className="rounded-xl font-semibold text-base text-white flex items-center justify-center gap-3 mx-auto border border-purple-400/30"
              style={{
                padding: "16px 40px",
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                boxShadow: "0 4px 20px rgba(99, 102, 241, 0.4)",
              }}>
              <Play className="w-5 h-5" />
              Resume
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
