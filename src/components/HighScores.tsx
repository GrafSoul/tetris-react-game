import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X } from "lucide-react";
import type { HighScore } from "../hooks/useGameStorage";

interface HighScoresProps {
  scores: HighScore[];
  isOpen: boolean;
  onClose: () => void;
}

export const HighScores = ({ scores, isOpen, onClose }: HighScoresProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(8px)",
          }}
          onClick={onClose}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={{
              background:
                "linear-gradient(135deg, rgba(15, 15, 35, 0.98) 0%, rgba(26, 26, 62, 0.98) 100%)",
              borderRadius: "24px",
              border: "2px solid rgba(168, 85, 247, 0.4)",
              boxShadow:
                "0 0 80px rgba(99, 102, 241, 0.4), 0 0 120px rgba(168, 85, 247, 0.2)",
              padding: "40px 48px",
              minWidth: "400px",
            }}
            onClick={(e) => e.stopPropagation()}>
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: "32px" }}>
              <div className="flex items-center gap-3">
                <Trophy className="w-7 h-7 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">Рекорды</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800">
                <X className="w-6 h-6" />
              </button>
            </div>

            {scores.length === 0 ? (
              <div
                style={{
                  padding: "60px 24px 48px",
                  textAlign: "center",
                  minHeight: "180px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <p style={{ color: "#94a3b8", fontSize: "18px" }}>
                  Пока нет рекордов. Сыграй первую игру!
                </p>
              </div>
            ) : (
              <div style={{ marginTop: "8px" }} className="space-y-3">
                <div className="grid grid-cols-12 gap-2 text-sm text-slate-400 font-medium pb-3 border-b border-slate-600">
                  <span className="col-span-1">#</span>
                  <span className="col-span-4 text-right">Очки</span>
                  <span className="col-span-2 text-right">Ур.</span>
                  <span className="col-span-2 text-right">Лин.</span>
                  <span className="col-span-3 text-right">Дата</span>
                </div>
                {scores.map((score, index) => (
                  <motion.div
                    key={`${score.date}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`grid grid-cols-12 gap-2 text-base py-2 ${
                      index === 0
                        ? "text-yellow-400 font-bold"
                        : index === 1
                        ? "text-slate-300"
                        : index === 2
                        ? "text-amber-600"
                        : "text-slate-400"
                    }`}>
                    <span className="col-span-1">{index + 1}</span>
                    <span className="col-span-4 text-right font-mono">
                      {score.score.toLocaleString()}
                    </span>
                    <span className="col-span-2 text-right">{score.level}</span>
                    <span className="col-span-2 text-right">{score.lines}</span>
                    <span className="col-span-3 text-right text-sm">
                      {formatDate(score.date)}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
