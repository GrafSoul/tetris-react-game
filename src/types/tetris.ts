export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export interface Position {
  x: number;
  y: number;
}

export interface Tetromino {
  type: TetrominoType;
  shape: number[][];
  position: Position;
  color: string;
}

export interface Cell {
  filled: boolean;
  color: string;
}

export type Board = Cell[][];

export interface GameState {
  board: Board;
  currentPiece: Tetromino | null;
  nextPiece: Tetromino | null;
  score: number;
  level: number;
  lines: number;
  isGameOver: boolean;
  isPaused: boolean;
  isPlaying: boolean;
}

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const TETROMINO_SHAPES: Record<TetrominoType, number[][]> = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
};

export const TETROMINO_COLORS: Record<TetrominoType, string> = {
  I: '#00f5ff',
  O: '#ffea00',
  T: '#bf00ff',
  S: '#00ff6a',
  Z: '#ff3d00',
  J: '#0066ff',
  L: '#ff9100',
};

export const POINTS = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2,
};

export const LEVEL_SPEED = [
  800, 720, 630, 550, 470, 380, 300, 220, 130, 100, 80, 60, 50, 40, 30, 20,
];
