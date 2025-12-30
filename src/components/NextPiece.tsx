import { motion } from "framer-motion";
import { Cell } from "./Cell";
import type { Tetromino } from "../types/tetris";

interface NextPieceProps {
  piece: Tetromino | null;
}

export const NextPiece = ({ piece }: NextPieceProps) => {
  if (!piece) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        padding: "20px 24px",
        borderRadius: "12px",
        border: "1px solid rgba(168, 85, 247, 0.3)",
        width: "100%",
        background:
          "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)",
        boxShadow: "0 0 20px rgba(99, 102, 241, 0.1)",
      }}>
      <h3
        style={{
          fontSize: "14px",
          fontWeight: 700,
          color: "#c4b5fd",
          marginBottom: "16px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          textAlign: "center",
        }}>
        Next
      </h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100px",
          padding: "16px",
          background: "rgba(2, 6, 23, 0.4)",
          borderRadius: "8px",
        }}>
        <div
          style={{
            display: "grid",
            gap: "2px",
            gridTemplateColumns: `repeat(${piece.shape[0].length}, 1fr)`,
          }}>
          {piece.shape.map((row, y) =>
            row.map((cell, x) => (
              <Cell key={`${y}-${x}`} filled={cell === 1} color={piece.color} />
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};
