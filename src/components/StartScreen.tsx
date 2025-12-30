import { motion } from "framer-motion";
import { Play, Gamepad2 } from "lucide-react";

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
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
      }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
        style={{
          textAlign: "center",
          padding: "48px 40px",
          background:
            "linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(26, 26, 62, 0.95) 100%)",
          borderRadius: "24px",
          border: "2px solid rgba(168, 85, 247, 0.3)",
          boxShadow:
            "0 0 80px rgba(99, 102, 241, 0.3), 0 0 120px rgba(168, 85, 247, 0.2)",
        }}>
        {/* Logo */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ marginBottom: "32px" }}>
          <Gamepad2
            style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 16px",
              color: "#a78bfa",
            }}
          />
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 900,
              letterSpacing: "-0.02em",
            }}>
            <span
              style={{
                background: "linear-gradient(90deg, #22d3ee, #a78bfa, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              TETRIS
            </span>
          </h1>
          <p style={{ color: "#94a3b8", marginTop: "8px", fontSize: "16px" }}>
            The Classic Block Game
          </p>
        </motion.div>

        {/* Animated blocks */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "32px",
          }}>
          {["#00f5ff", "#bf00ff", "#ffea00", "#ff3d00"].map((color, i) => (
            <motion.div
              key={color}
              animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "6px",
                background: color,
                boxShadow: `0 0 20px ${color}66`,
              }}
            />
          ))}
        </div>

        {/* Start button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          style={{
            padding: "20px 48px",
            borderRadius: "12px",
            fontWeight: 700,
            fontSize: "18px",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "0 auto",
            border: "1px solid rgba(168, 85, 247, 0.3)",
            background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
            boxShadow: "0 4px 30px rgba(99, 102, 241, 0.5)",
            cursor: "pointer",
          }}>
          <Play style={{ width: "24px", height: "24px" }} />
          Start Game
        </motion.button>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: "32px",
            padding: "20px 32px",
            background: "rgba(15, 23, 42, 0.8)",
            borderRadius: "12px",
            border: "1px solid rgba(100, 116, 139, 0.4)",
          }}>
          <p
            style={{
              marginBottom: "12px",
              fontWeight: 600,
              color: "#c4b5fd",
              fontSize: "15px",
            }}>
            Controls:
          </p>
          <p style={{ color: "#94a3b8", fontSize: "14px" }}>
            ← → Move • ↑ Rotate • ↓ Soft Drop • Space Hard Drop
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
