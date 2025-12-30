import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  RotateCw,
  ChevronDown,
  Pause,
  Play,
  type LucideIcon,
} from "lucide-react";

interface ControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onMoveDown: () => void;
  onRotate: () => void;
  onHardDrop: () => void;
  onTogglePause: () => void;
  isPaused: boolean;
  isPlaying: boolean;
}

const ControlButton = ({
  icon: Icon,
  label,
  keyHint,
  onClick,
  size = "normal",
}: {
  icon: LucideIcon;
  label: string;
  keyHint: string;
  onClick: () => void;
  size?: "normal" | "large";
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    style={{
      padding: size === "large" ? "16px 24px" : "16px 20px",
      minWidth: size === "large" ? "100px" : "85px",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
      border: "1px solid rgba(100, 116, 139, 0.5)",
      boxShadow:
        "0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
    }}>
    <span
      style={{
        display: "flex",
        color: "#a78bfa",
      }}>
      <Icon size={size === "large" ? 28 : 24} />
    </span>
    <span
      style={{
        fontSize: "11px",
        color: "#cbd5e1",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        fontWeight: 500,
      }}>
      {label}
    </span>
    <span
      style={{
        fontSize: "13px",
        color: "#22d3ee",
        fontWeight: 700,
        padding: "4px 12px",
        background: "rgba(2, 6, 23, 0.7)",
        borderRadius: "6px",
        border: "1px solid rgba(34, 211, 238, 0.3)",
      }}>
      {keyHint}
    </span>
  </motion.button>
);

export const Controls = ({
  onMoveLeft,
  onMoveRight,
  onMoveDown,
  onRotate,
  onHardDrop,
  onTogglePause,
  isPaused,
  isPlaying,
}: ControlsProps) => {
  if (!isPlaying) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6">
      <div className="flex flex-col items-center gap-3">
        {/* Top row - Rotate and Pause */}
        <div className="flex gap-3">
          <ControlButton
            icon={RotateCw}
            label="Rotate"
            keyHint="↑"
            onClick={onRotate}
          />
          <ControlButton
            icon={isPaused ? Play : Pause}
            label={isPaused ? "Play" : "Pause"}
            keyHint="P"
            onClick={onTogglePause}
          />
        </div>

        {/* Middle row - Left, Hard Drop, Right */}
        <div className="flex gap-3">
          <ControlButton
            icon={ArrowLeft}
            label="Left"
            keyHint="←"
            onClick={onMoveLeft}
          />
          <ControlButton
            icon={ChevronDown}
            label="Drop"
            keyHint="Space"
            onClick={onHardDrop}
            size="large"
          />
          <ControlButton
            icon={ArrowRight}
            label="Right"
            keyHint="→"
            onClick={onMoveRight}
          />
        </div>

        {/* Bottom row - Down */}
        <div className="flex gap-3">
          <ControlButton
            icon={ArrowDown}
            label="Down"
            keyHint="↓"
            onClick={onMoveDown}
          />
        </div>
      </div>
    </motion.div>
  );
};
