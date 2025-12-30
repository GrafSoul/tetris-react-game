import { motion } from "framer-motion";
import { Trophy, Layers, Zap, type LucideIcon } from "lucide-react";

interface ScoreBoardProps {
  score: number;
  level: number;
  lines: number;
}

const StatItem = ({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  color: string;
}) => (
  <motion.div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "16px 20px",
      borderRadius: "12px",
      border: "1px solid rgba(100, 116, 139, 0.3)",
      background:
        "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)",
    }}
    whileHover={{ scale: 1.02 }}>
    <div
      style={{
        padding: "10px",
        borderRadius: "10px",
        marginBottom: "8px",
        background: `linear-gradient(135deg, ${color}33 0%, ${color}11 100%)`,
      }}>
      <span style={{ display: "flex", color }}>
        <Icon size={20} />
      </span>
    </div>
    <p
      style={{
        fontSize: "11px",
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        fontWeight: 500,
      }}>
      {label}
    </p>
    <motion.p
      key={value}
      initial={{ scale: 1.2, color: "#fff" }}
      animate={{ scale: 1, color: "#e2e8f0" }}
      style={{ fontSize: "20px", fontWeight: 700 }}>
      {value.toLocaleString()}
    </motion.p>
  </motion.div>
);

export const ScoreBoard = ({ score, level, lines }: ScoreBoardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "100%",
      }}>
      <StatItem icon={Trophy} label="Score" value={score} color="#fbbf24" />
      <StatItem icon={Zap} label="Level" value={level} color="#a855f7" />
      <StatItem icon={Layers} label="Lines" value={lines} color="#22d3ee" />
    </motion.div>
  );
};
