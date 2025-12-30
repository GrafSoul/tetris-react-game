# 🎮 Tetris

A modern, visually stunning Tetris game built with React, TypeScript, and Three.js.

![Tetris Game](https://img.shields.io/badge/Game-Tetris-purple)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Vite](https://img.shields.io/badge/Vite-7-purple)

## ✨ Features

- **Classic Tetris Gameplay** - All 7 tetromino pieces with proper rotation and collision detection
- **Beautiful UI** - Gradient borders, glow effects, and smooth animations
- **3D Animated Background** - Floating tetromino pieces rendered with Three.js
- **Responsive Controls** - Keyboard support with on-screen buttons showing key hints
- **Score System** - Points, levels, and line clearing with progressive difficulty
- **Ghost Piece** - Preview where your piece will land
- **Pause/Resume** - Press P to pause the game anytime

## 🎯 Controls

| Key | Action |
|-----|--------|
| `←` `→` | Move left/right |
| `↑` | Rotate piece |
| `↓` | Soft drop |
| `Space` | Hard drop |
| `P` | Pause/Resume |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tetris

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **Three.js** - 3D background with @react-three/fiber
- **Lucide React** - Icons

## 📁 Project Structure

```
src/
├── components/       # React components
│   ├── Board.tsx       # Game board grid
│   ├── Cell.tsx        # Individual cell
│   ├── Controls.tsx    # Control buttons
│   ├── NextPiece.tsx   # Next piece preview
│   ├── ScoreBoard.tsx  # Score/Level/Lines display
│   ├── StartScreen.tsx # Start menu
│   ├── GameOver.tsx    # Game over overlay
│   ├── PauseOverlay.tsx # Pause screen
│   └── Background3D.tsx # 3D animated background
├── hooks/
│   └── useTetris.ts    # Game logic hook
├── types/
│   └── tetris.ts       # Type definitions & constants
└── App.tsx             # Main app component
```

## 📜 License

MIT License
