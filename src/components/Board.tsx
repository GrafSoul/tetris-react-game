import { motion } from "framer-motion";
import { Cell } from "./Cell";
import type { Board as BoardType, Tetromino } from "../types/tetris";
import { BOARD_WIDTH, BOARD_HEIGHT } from "../types/tetris";

interface BoardProps {
  board: BoardType;
  currentPiece: Tetromino | null;
}

const getGhostPosition = (board: BoardType, piece: Tetromino): number => {
  let ghostY = 0;
  while (true) {
    let canMove = true;
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newY = piece.position.y + y + ghostY + 1;
          const newX = piece.position.x + x;
          if (newY >= BOARD_HEIGHT || (newY >= 0 && board[newY][newX].filled)) {
            canMove = false;
            break;
          }
        }
      }
      if (!canMove) break;
    }
    if (!canMove) break;
    ghostY++;
  }
  return ghostY;
};

export const Board = ({ board, currentPiece }: BoardProps) => {
  const displayBoard: {
    filled: boolean;
    color: string;
    isActive: boolean;
    isGhost?: boolean;
  }[][] = board.map((row) => row.map((cell) => ({ ...cell, isActive: false })));

  let ghostY = 0;
  if (currentPiece) {
    ghostY = getGhostPosition(board, currentPiece);

    // Draw ghost piece
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPiece.position.y + y + ghostY;
          const boardX = currentPiece.position.x + x;
          if (
            boardY >= 0 &&
            boardY < BOARD_HEIGHT &&
            boardX >= 0 &&
            boardX < BOARD_WIDTH
          ) {
            if (!displayBoard[boardY][boardX].filled) {
              displayBoard[boardY][boardX] = {
                filled: false,
                color: currentPiece.color,
                isActive: false,
                isGhost: true,
              };
            }
          }
        }
      }
    }

    // Draw current piece
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPiece.position.y + y;
          const boardX = currentPiece.position.x + x;
          if (
            boardY >= 0 &&
            boardY < BOARD_HEIGHT &&
            boardX >= 0 &&
            boardX < BOARD_WIDTH
          ) {
            displayBoard[boardY][boardX] = {
              filled: true,
              color: currentPiece.color,
              isActive: true,
            };
          }
        }
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        position: "relative",
        padding: "4px",
        borderRadius: "16px",
        background:
          "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
        boxShadow:
          "0 0 60px rgba(99, 102, 241, 0.4), 0 0 100px rgba(168, 85, 247, 0.2)",
      }}>
      <div
        style={{
          background: "rgba(2, 6, 23, 0.95)",
          padding: "12px",
          borderRadius: "12px",
        }}>
        <div
          style={{
            display: "grid",
            gap: "2px",
            gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
          }}>
          {displayBoard.map((row, y) =>
            row.map((cell, x) => (
              <Cell
                key={`${y}-${x}`}
                filled={cell.filled}
                color={cell.color}
                isGhost={(cell as { isGhost?: boolean }).isGhost}
                isActive={(cell as { isActive?: boolean }).isActive}
              />
            ))
          )}
        </div>
      </div>

      {/* Glow effect */}
      <div
        className="absolute inset-0 -z-10 blur-xl opacity-30"
        style={{
          background:
            "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
        }}
      />
    </motion.div>
  );
};
