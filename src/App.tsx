import { AnimatePresence } from "framer-motion";
import { useTetris } from "./hooks/useTetris";
import {
  Board,
  NextPiece,
  ScoreBoard,
  Controls,
  GameOver,
  StartScreen,
  PauseOverlay,
  Background3D,
  LineExplosion,
} from "./components";

function App() {
  const {
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
  } = useTetris();

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <Background3D />

      <AnimatePresence mode="wait">
        {!gameState.isPlaying && !gameState.isGameOver && (
          <StartScreen key="start" onStart={startGame} />
        )}
      </AnimatePresence>

      {gameState.isPlaying && (
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
          {/* Left panel - Next piece and Score */}
          <div className="flex flex-row lg:flex-col gap-4 order-2 lg:order-1 min-w-[180px]">
            <NextPiece piece={gameState.nextPiece} />
            <ScoreBoard
              score={gameState.score}
              level={gameState.level}
              lines={gameState.lines}
            />
          </div>

          {/* Game board */}
          <div className="order-1 lg:order-2">
            <Board
              board={gameState.board}
              currentPiece={gameState.currentPiece}
            />

            {/* Mobile controls */}
            <div className="lg:hidden">
              <Controls
                onMoveLeft={moveLeft}
                onMoveRight={moveRight}
                onMoveDown={moveDown}
                onRotate={rotate}
                onHardDrop={hardDrop}
                onTogglePause={togglePause}
                isPaused={gameState.isPaused}
                isPlaying={gameState.isPlaying}
              />
            </div>
          </div>

          {/* Right panel - Controls for desktop */}
          <div className="hidden lg:block order-3">
            <Controls
              onMoveLeft={moveLeft}
              onMoveRight={moveRight}
              onMoveDown={moveDown}
              onRotate={rotate}
              onHardDrop={hardDrop}
              onTogglePause={togglePause}
              isPaused={gameState.isPaused}
              isPlaying={gameState.isPlaying}
            />
          </div>
        </div>
      )}

      <PauseOverlay
        isPaused={gameState.isPaused && gameState.isPlaying}
        onResume={togglePause}
      />

      <GameOver
        isVisible={gameState.isGameOver}
        score={gameState.score}
        level={gameState.level}
        lines={gameState.lines}
        onRestart={startGame}
      />

      {clearedLines.length > 0 && (
        <LineExplosion
          clearedLines={clearedLines}
          onComplete={clearExplosion}
        />
      )}
    </div>
  );
}

export default App;
