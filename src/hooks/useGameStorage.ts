import { useCallback } from 'react';
import type { GameState, Board } from '../types/tetris';

const STORAGE_KEYS = {
  GAME_STATE: 'tetris_game_state',
  HIGH_SCORES: 'tetris_high_scores',
};

export interface HighScore {
  score: number;
  level: number;
  lines: number;
  date: string;
}

interface SavedGameState {
  board: Board;
  currentPiece: GameState['currentPiece'];
  nextPiece: GameState['nextPiece'];
  score: number;
  level: number;
  lines: number;
  savedAt: string;
}

const MAX_HIGH_SCORES = 10;

export const useGameStorage = () => {
  const saveGameState = useCallback((gameState: GameState) => {
    if (!gameState.isPlaying || gameState.isGameOver) return;
    
    const savedState: SavedGameState = {
      board: gameState.board,
      currentPiece: gameState.currentPiece,
      nextPiece: gameState.nextPiece,
      score: gameState.score,
      level: gameState.level,
      lines: gameState.lines,
      savedAt: new Date().toISOString(),
    };
    
    try {
      localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(savedState));
    } catch {
      // Storage full or unavailable
    }
  }, []);

  const loadGameState = useCallback((): SavedGameState | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
      if (saved) {
        return JSON.parse(saved) as SavedGameState;
      }
    } catch {
      // Invalid data
    }
    return null;
  }, []);

  const clearSavedGame = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.GAME_STATE);
    } catch {
      // Storage unavailable
    }
  }, []);

  const hasSavedGame = useCallback((): boolean => {
    return loadGameState() !== null;
  }, [loadGameState]);

  const getHighScores = useCallback((): HighScore[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HIGH_SCORES);
      if (saved) {
        return JSON.parse(saved) as HighScore[];
      }
    } catch {
      // Invalid data
    }
    return [];
  }, []);

  const addHighScore = useCallback((score: number, level: number, lines: number) => {
    const highScores = getHighScores();
    
    const newScore: HighScore = {
      score,
      level,
      lines,
      date: new Date().toISOString(),
    };
    
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    
    const topScores = highScores.slice(0, MAX_HIGH_SCORES);
    
    try {
      localStorage.setItem(STORAGE_KEYS.HIGH_SCORES, JSON.stringify(topScores));
    } catch {
      // Storage full or unavailable
    }
    
    return topScores;
  }, [getHighScores]);

  const clearHighScores = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.HIGH_SCORES);
    } catch {
      // Storage unavailable
    }
  }, []);

  return {
    saveGameState,
    loadGameState,
    clearSavedGame,
    hasSavedGame,
    getHighScores,
    addHighScore,
    clearHighScores,
  };
};
