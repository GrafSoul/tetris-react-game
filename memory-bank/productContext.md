# Tetris Game - Product Context

## Overview
A beautiful, fully-functional Tetris game built with React, TypeScript, and modern UI libraries.

## Tech Stack
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: TailwindCSS 4
- **Animations**: Framer Motion
- **3D Effects**: Three.js + @react-three/fiber + @react-three/drei
- **Icons**: Lucide React

## Features
- Classic Tetris gameplay with all 7 tetrominoes (I, O, T, S, Z, J, L)
- Score system with points for single, double, triple, and Tetris clears
- Level progression (speed increases every 10 lines)
- Ghost piece preview showing where piece will land
- Next piece preview
- Pause functionality
- Game Over screen with stats
- Beautiful 3D animated background with floating blocks
- Responsive design with mobile touch controls
- Keyboard controls for desktop

## Controls
- **← →**: Move left/right
- **↑**: Rotate
- **↓**: Soft drop
- **Space**: Hard drop
- **P**: Pause/Resume

## Project Structure
```
src/
├── components/
│   ├── Board.tsx         # Main game board
│   ├── Cell.tsx          # Individual cell with glow effects
│   ├── NextPiece.tsx     # Next piece preview
│   ├── ScoreBoard.tsx    # Score, level, lines display
│   ├── Controls.tsx      # Touch/click controls
│   ├── GameOver.tsx      # Game over overlay
│   ├── StartScreen.tsx   # Start screen
│   ├── PauseOverlay.tsx  # Pause overlay
│   ├── Background3D.tsx  # Three.js 3D background
│   └── index.ts          # Component exports
├── hooks/
│   └── useTetris.ts      # Main game logic hook
├── types/
│   └── tetris.ts         # TypeScript types and constants
├── App.tsx               # Main app component
├── main.tsx              # Entry point
└── index.css             # Global styles with Tailwind
```

[2024-12-30 12:15:00] - Initial project creation with full Tetris implementation
