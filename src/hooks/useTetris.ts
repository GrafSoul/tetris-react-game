import { useState, useCallback, useEffect, useRef } from 'react';
import type { GameState, Board, Tetromino, TetrominoType } from '../types/tetris';
import { useSound } from './useSound';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  TETROMINO_SHAPES,
  TETROMINO_COLORS,
  POINTS,
  LEVEL_SPEED,
} from '../types/tetris';

const createEmptyBoard = (): Board => {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => ({ filled: false, color: '' }))
  );
};

const getRandomTetromino = (): Tetromino => {
  const types: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  const type = types[Math.floor(Math.random() * types.length)];
  const shape = TETROMINO_SHAPES[type].map((row) => [...row]);
  
  return {
    type,
    shape,
    position: { x: Math.floor(BOARD_WIDTH / 2) - Math.floor(shape[0].length / 2), y: 0 },
    color: TETROMINO_COLORS[type],
  };
};

const rotateMatrix = (matrix: number[][]): number[][] => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotated: number[][] = Array.from({ length: cols }, () => Array(rows).fill(0));
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rotated[c][rows - 1 - r] = matrix[r][c];
    }
  }
  
  return rotated;
};

const isValidPosition = (
  board: Board,
  piece: Tetromino,
  offsetX = 0,
  offsetY = 0
): boolean => {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const newX = piece.position.x + x + offsetX;
        const newY = piece.position.y + y + offsetY;
        
        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
          return false;
        }
        
        if (newY >= 0 && board[newY][newX].filled) {
          return false;
        }
      }
    }
  }
  return true;
};

const mergePieceToBoard = (board: Board, piece: Tetromino): Board => {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
  
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardY = piece.position.y + y;
        const boardX = piece.position.x + x;
        
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = { filled: true, color: piece.color };
        }
      }
    }
  }
  
  return newBoard;
};

interface ClearedLineInfo {
  rowIndex: number;
  colors: string[];
}

const clearLines = (board: Board): { newBoard: Board; linesCleared: number; clearedLinesInfo: ClearedLineInfo[] } => {
  const clearedLinesInfo: ClearedLineInfo[] = [];
  
  board.forEach((row, index) => {
    if (row.every((cell) => cell.filled)) {
      clearedLinesInfo.push({
        rowIndex: index,
        colors: row.map((cell) => cell.color),
      });
    }
  });
  
  const newBoard = board.filter((row) => row.some((cell) => !cell.filled));
  const linesCleared = BOARD_HEIGHT - newBoard.length;
  
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(
      Array.from({ length: BOARD_WIDTH }, () => ({ filled: false, color: '' }))
    );
  }
  
  return { newBoard, linesCleared, clearedLinesInfo };
};

const calculateScore = (linesCleared: number, level: number): number => {
  const basePoints = [0, POINTS.SINGLE, POINTS.DOUBLE, POINTS.TRIPLE, POINTS.TETRIS];
  return basePoints[linesCleared] * (level + 1);
};

export const useTetris = () => {
  const { play: playSound } = useSound();
  
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPiece: null,
    nextPiece: null,
    score: 0,
    level: 0,
    lines: 0,
    isGameOver: false,
    isPaused: false,
    isPlaying: false,
  });
  
  const [clearedLines, setClearedLines] = useState<ClearedLineInfo[]>([]);
  const prevLevelRef = useRef<number>(0);

  const gameLoopRef = useRef<number | null>(null);
  const lastDropRef = useRef<number>(0);

  const startGame = useCallback(() => {
    const firstPiece = getRandomTetromino();
    const secondPiece = getRandomTetromino();
    
    setGameState({
      board: createEmptyBoard(),
      currentPiece: firstPiece,
      nextPiece: secondPiece,
      score: 0,
      level: 0,
      lines: 0,
      isGameOver: false,
      isPaused: false,
      isPlaying: true,
    });
  }, [playSound]);

  const togglePause = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  }, []);

  const moveLeft = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;
      
      if (isValidPosition(prev.board, prev.currentPiece, -1, 0)) {
        playSound('move');
        return {
          ...prev,
          currentPiece: {
            ...prev.currentPiece,
            position: {
              ...prev.currentPiece.position,
              x: prev.currentPiece.position.x - 1,
            },
          },
        };
      }
      return prev;
    });
  }, [playSound]);

  const moveRight = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;
      
      if (isValidPosition(prev.board, prev.currentPiece, 1, 0)) {
        playSound('move');
        return {
          ...prev,
          currentPiece: {
            ...prev.currentPiece,
            position: {
              ...prev.currentPiece.position,
              x: prev.currentPiece.position.x + 1,
            },
          },
        };
      }
      return prev;
    });
  }, [playSound]);

  const rotate = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;
      
      const rotatedShape = rotateMatrix(prev.currentPiece.shape);
      const rotatedPiece = { ...prev.currentPiece, shape: rotatedShape };
      
      if (isValidPosition(prev.board, rotatedPiece)) {
        playSound('rotate');
        return { ...prev, currentPiece: rotatedPiece };
      }
      
      // Wall kick attempts
      const kicks = [-1, 1, -2, 2];
      for (const kick of kicks) {
        if (isValidPosition(prev.board, rotatedPiece, kick, 0)) {
          playSound('rotate');
          return {
            ...prev,
            currentPiece: {
              ...rotatedPiece,
              position: { ...rotatedPiece.position, x: rotatedPiece.position.x + kick },
            },
          };
        }
      }
      
      return prev;
    });
  }, [playSound]);

  const moveDown = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;
      
      if (isValidPosition(prev.board, prev.currentPiece, 0, 1)) {
        return {
          ...prev,
          currentPiece: {
            ...prev.currentPiece,
            position: {
              ...prev.currentPiece.position,
              y: prev.currentPiece.position.y + 1,
            },
          },
        };
      }
      
      // Lock piece and spawn new one
      const mergedBoard = mergePieceToBoard(prev.board, prev.currentPiece);
      const { newBoard, linesCleared, clearedLinesInfo } = clearLines(mergedBoard);
      
      if (clearedLinesInfo.length > 0) {
        setClearedLines(clearedLinesInfo);
      }
      const newLines = prev.lines + linesCleared;
      const newLevel = Math.floor(newLines / 10);
      const newScore = prev.score + calculateScore(linesCleared, prev.level);
      
      const newPiece = prev.nextPiece || getRandomTetromino();
      const nextPiece = getRandomTetromino();
      
      // Check game over
      if (!isValidPosition(newBoard, newPiece)) {
        return {
          ...prev,
          board: mergedBoard,
          currentPiece: null,
          isGameOver: true,
          isPlaying: false,
        };
      }
      
      return {
        ...prev,
        board: newBoard,
        currentPiece: newPiece,
        nextPiece,
        score: newScore,
        level: newLevel,
        lines: newLines,
      };
    });
  }, [playSound]);

  const hardDrop = useCallback(() => {
    playSound('drop');
    setGameState((prev) => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;
      
      let dropDistance = 0;
      while (isValidPosition(prev.board, prev.currentPiece, 0, dropDistance + 1)) {
        dropDistance++;
      }
      
      const droppedPiece = {
        ...prev.currentPiece,
        position: {
          ...prev.currentPiece.position,
          y: prev.currentPiece.position.y + dropDistance,
        },
      };
      
      const mergedBoard = mergePieceToBoard(prev.board, droppedPiece);
      const { newBoard, linesCleared, clearedLinesInfo } = clearLines(mergedBoard);
      
      if (clearedLinesInfo.length > 0) {
        setClearedLines(clearedLinesInfo);
      }
      const newLines = prev.lines + linesCleared;
      const newLevel = Math.floor(newLines / 10);
      const newScore = prev.score + calculateScore(linesCleared, prev.level) + dropDistance * POINTS.HARD_DROP;
      
      const newPiece = prev.nextPiece || getRandomTetromino();
      const nextPiece = getRandomTetromino();
      
      if (!isValidPosition(newBoard, newPiece)) {
        return {
          ...prev,
          board: mergedBoard,
          currentPiece: null,
          isGameOver: true,
          isPlaying: false,
        };
      }
      
      return {
        ...prev,
        board: newBoard,
        currentPiece: newPiece,
        nextPiece,
        score: newScore,
        level: newLevel,
        lines: newLines,
      };
    });
  }, [playSound]);

  // Game loop
  useEffect(() => {
    if (!gameState.isPlaying || gameState.isPaused || gameState.isGameOver) {
      return;
    }

    const speed = LEVEL_SPEED[Math.min(gameState.level, LEVEL_SPEED.length - 1)];

    const gameLoop = (timestamp: number) => {
      if (timestamp - lastDropRef.current >= speed) {
        lastDropRef.current = timestamp;
        moveDown();
      }
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState.isPlaying, gameState.isPaused, gameState.isGameOver, gameState.level, moveDown]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameState.isPlaying) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveRight();
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveDown();
          break;
        case 'ArrowUp':
          e.preventDefault();
          rotate();
          break;
        case ' ':
          e.preventDefault();
          hardDrop();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          togglePause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.isPlaying, moveLeft, moveRight, moveDown, rotate, hardDrop, togglePause]);

  const clearExplosion = useCallback(() => {
    setClearedLines([]);
  }, []);

  // Sound effects for game events
  useEffect(() => {
    if (gameState.isGameOver) {
      playSound('gameOver');
    }
  }, [gameState.isGameOver, playSound]);

  useEffect(() => {
    if (clearedLines.length > 0) {
      if (clearedLines.length === 4) {
        playSound('tetris');
      } else {
        playSound('clear');
      }
    }
  }, [clearedLines, playSound]);

  useEffect(() => {
    if (gameState.level > prevLevelRef.current && gameState.isPlaying) {
      playSound('levelUp');
    }
    prevLevelRef.current = gameState.level;
  }, [gameState.level, gameState.isPlaying, playSound]);

  return {
    gameState,
    clearedLines,
    clearExplosion,
    startGame,
    togglePause,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    hardDrop,
  };
};
