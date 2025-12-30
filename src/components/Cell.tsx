import { motion } from "framer-motion";

interface CellProps {
  filled: boolean;
  color: string;
  isGhost?: boolean;
  isActive?: boolean;
}

export const Cell = ({
  filled,
  color,
  isGhost = false,
  isActive = false,
}: CellProps) => {
  if (!filled && !isGhost) {
    return (
      <div className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-900/50 border border-slate-800/50 rounded-sm" />
    );
  }

  if (isGhost) {
    return (
      <div
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-sm border-2 border-dashed"
        style={{
          borderColor: color,
          opacity: 0.3,
        }}
      />
    );
  }

  return (
    <motion.div
      initial={isActive ? { scale: 0.8, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      className="w-8 h-8 sm:w-9 sm:h-9 rounded-sm relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
        boxShadow: `0 0 10px ${color}66, inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.3)`,
      }}>
      <div
        className="absolute inset-0.5 rounded-sm"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)`,
        }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  );
};
