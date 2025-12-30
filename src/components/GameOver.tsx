import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Trophy } from "lucide-react";

interface GameOverProps {
  isVisible: boolean;
  score: number;
  level: number;
  lines: number;
  onRestart: () => void;
}

export const GameOver = ({
  isVisible,
  score,
  level,
  lines,
  onRestart,
}: GameOverProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
          }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            style={{
              position: "relative",
              padding: "48px 40px",
              borderRadius: "20px",
              maxWidth: "420px",
              width: "100%",
              margin: "0 16px",
              background:
                "linear-gradient(135deg, rgba(15, 15, 35, 0.98) 0%, rgba(26, 26, 62, 0.98) 100%)",
              border: "2px solid rgba(168, 85, 247, 0.4)",
              boxShadow:
                "0 0 80px rgba(168, 85, 247, 0.4), 0 0 120px rgba(99, 102, 241, 0.3)",
            }}>
            <div style={{ textAlign: "center" }}>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ marginBottom: "20px" }}>
                <Trophy
                  style={{
                    width: "64px",
                    height: "64px",
                    color: "#facc15",
                    margin: "0 auto",
                  }}
                />
              </motion.div>

              <h2
                style={{
                  fontSize: "40px",
                  fontWeight: 700,
                  marginBottom: "12px",
                  background:
                    "linear-gradient(90deg, #a78bfa, #f472b6, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                Game Over
              </h2>

              <p
                style={{
                  color: "#94a3b8",
                  marginBottom: "28px",
                  fontSize: "16px",
                }}>
                Great effort! Here are your stats:
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "16px",
                  marginBottom: "36px",
                }}>
                <div
                  style={{
                    padding: "20px 16px",
                    borderRadius: "12px",
                    background: "rgba(30, 41, 59, 0.6)",
                    border: "1px solid rgba(100, 116, 139, 0.3)",
                  }}>
                  <p
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#a78bfa",
                      marginBottom: "8px",
                    }}>
                    {score.toLocaleString()}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                    Score
                  </p>
                </div>
                <div
                  style={{
                    padding: "20px 16px",
                    borderRadius: "12px",
                    background: "rgba(30, 41, 59, 0.6)",
                    border: "1px solid rgba(100, 116, 139, 0.3)",
                  }}>
                  <p
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#22d3ee",
                      marginBottom: "8px",
                    }}>
                    {level}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                    Level
                  </p>
                </div>
                <div
                  style={{
                    padding: "20px 16px",
                    borderRadius: "12px",
                    background: "rgba(30, 41, 59, 0.6)",
                    border: "1px solid rgba(100, 116, 139, 0.3)",
                  }}>
                  <p
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#f472b6",
                      marginBottom: "8px",
                    }}>
                    {lines}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                    Lines
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRestart}
                style={{
                  width: "100%",
                  padding: "18px 32px",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                  boxShadow: "0 4px 20px rgba(99, 102, 241, 0.4)",
                  cursor: "pointer",
                }}>
                <RotateCcw style={{ width: "20px", height: "20px" }} />
                Play Again
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
