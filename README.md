# 🎮 Tetris

A modern, visually stunning Tetris game built with React, TypeScript, Three.js, and Electron.

![Tetris Game](https://img.shields.io/badge/Game-Tetris-purple)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Vite](https://img.shields.io/badge/Vite-7-purple)
![Electron](https://img.shields.io/badge/Electron-35-blue)

## ✨ Features

- **Classic Tetris Gameplay** - All 7 tetromino pieces with proper rotation and collision detection
- **Beautiful UI** - Gradient borders, glow effects, and smooth animations
- **3D Animated Background** - Floating tetromino pieces rendered with Three.js
- **Responsive Controls** - Keyboard support with on-screen buttons showing key hints
- **Score System** - Points, levels, and line clearing with progressive difficulty
- **Ghost Piece** - Preview where your piece will land
- **Pause/Resume** - Press P to pause the game anytime
- **Game Persistence** - Auto-save progress, continue where you left off
- **High Scores** - Track your top 10 best results
- **Sound Effects** - Audio feedback for moves, rotations, and line clears
- **Desktop App** - Native macOS/Windows/Linux app via Electron

## 🎯 Controls

| Key | Action |
|-----|--------|
| `←` `→` | Move left/right |
| `↑` | Rotate piece |
| `↓` | Soft drop |
| `Space` | Hard drop |
| `P` | Pause/Resume |
| `N` | New game |

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

## �️ Electron Desktop App

The game can run as a standalone desktop application with custom frameless window and native controls.

### Running Electron in Development

```bash
# First, build the React app
npm run build

# Copy dist to electron-app folder
cp -r dist electron-app/

# Navigate to electron app
cd electron-app

# Install Electron dependencies
npm install

# Run the desktop app
npm start
```

### Building Desktop Distributables

```bash
cd electron-app

# Build for current platform
npm run build

# Build for specific platforms
npm run build:mac    # macOS (.dmg)
npm run build:win    # Windows (.exe)
npm run build:linux  # Linux (.AppImage)
```

Built applications will be in `electron-app/release/` folder.

### Electron Features

- **Frameless Window** - Custom titlebar with minimize/maximize/close
- **Always on Top** - Toggle with `Ctrl+Shift+T`
- **Fullscreen** - Toggle with `F11`
- **Native Menu** - Application menu for macOS

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **Three.js** - 3D background with @react-three/fiber
- **Lucide React** - Icons
- **Electron 35** - Desktop application framework
- **electron-builder** - Build and package desktop apps

## 📁 Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── Board.tsx          # Game board grid
│   │   ├── Cell.tsx           # Individual cell
│   │   ├── Controls.tsx       # Control buttons
│   │   ├── NextPiece.tsx      # Next piece preview
│   │   ├── ScoreBoard.tsx     # Score/Level/Lines display
│   │   ├── StartScreen.tsx    # Start menu
│   │   ├── GameOver.tsx       # Game over overlay
│   │   ├── PauseOverlay.tsx   # Pause screen
│   │   ├── HighScores.tsx     # High scores modal
│   │   ├── Background3D.tsx   # 3D animated background
│   │   └── LineExplosion.tsx  # Line clear effects
│   ├── hooks/
│   │   ├── useTetris.ts       # Game logic hook
│   │   ├── useGameStorage.ts  # Persistence & high scores
│   │   └── useSound.ts        # Sound effects
│   ├── types/
│   │   └── tetris.ts          # Type definitions & constants
│   └── App.tsx                # Main app component
│
└── electron-app/
    ├── main.js              # Electron main process
    ├── preload.js           # Preload script for IPC
    ├── titlebar.js          # Custom titlebar logic
    ├── package.json         # Electron dependencies
    ├── dist/                # Built React app (copied)
    └── icons/               # App icons
```

## 📜 License

MIT License
