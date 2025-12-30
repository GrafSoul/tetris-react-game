import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Trail } from "@react-three/drei";
import * as THREE from "three";

// Tetris piece shapes as 3D block positions (relative coordinates)
const TETROMINO_3D_SHAPES = {
  I: [
    [0, 0, 0],
    [1, 0, 0],
    [2, 0, 0],
    [3, 0, 0],
  ],
  O: [
    [0, 0, 0],
    [1, 0, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  T: [
    [0, 0, 0],
    [1, 0, 0],
    [2, 0, 0],
    [1, 1, 0],
  ],
  S: [
    [1, 0, 0],
    [2, 0, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  Z: [
    [0, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
    [2, 1, 0],
  ],
  J: [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 0],
    [2, 1, 0],
  ],
  L: [
    [2, 0, 0],
    [0, 1, 0],
    [1, 1, 0],
    [2, 1, 0],
  ],
};

const TETROMINO_COLORS = {
  I: "#00f5ff",
  O: "#ffea00",
  T: "#bf00ff",
  S: "#00ff6a",
  Z: "#ff3d00",
  J: "#0066ff",
  L: "#ff9100",
};

type TetrominoType = keyof typeof TETROMINO_3D_SHAPES;

// Pre-defined floating tetromino data
const FLOATING_TETROMINOES: {
  type: TetrominoType;
  position: [number, number, number];
  scale: number;
  rotationSpeed: number;
}[] = [
  { type: "I", position: [-10, 6, -12], scale: 0.35, rotationSpeed: 0.3 },
  { type: "T", position: [8, -4, -10], scale: 0.4, rotationSpeed: 0.4 },
  { type: "O", position: [-6, -5, -8], scale: 0.45, rotationSpeed: 0.2 },
  { type: "S", position: [10, 5, -14], scale: 0.35, rotationSpeed: 0.35 },
  { type: "Z", position: [-4, 8, -11], scale: 0.4, rotationSpeed: 0.45 },
  { type: "J", position: [6, -7, -9], scale: 0.38, rotationSpeed: 0.25 },
  { type: "L", position: [-8, 2, -13], scale: 0.42, rotationSpeed: 0.3 },
  { type: "T", position: [4, 7, -15], scale: 0.3, rotationSpeed: 0.5 },
  { type: "I", position: [-3, -8, -10], scale: 0.32, rotationSpeed: 0.35 },
  { type: "S", position: [9, 0, -12], scale: 0.38, rotationSpeed: 0.4 },
  { type: "Z", position: [-9, -3, -11], scale: 0.36, rotationSpeed: 0.28 },
  { type: "L", position: [3, 4, -16], scale: 0.34, rotationSpeed: 0.38 },
];

// Single block with glow effect
const GlowBlock = ({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
};

// Floating Tetris piece made of multiple blocks
const FloatingTetromino = ({
  type,
  position,
  scale,
  rotationSpeed,
}: {
  type: TetrominoType;
  position: [number, number, number];
  scale: number;
  rotationSpeed: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const shape = TETROMINO_3D_SHAPES[type];
  const color = TETROMINO_COLORS[type];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed;
      groupRef.current.rotation.y =
        state.clock.elapsedTime * rotationSpeed * 0.7;
      groupRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  // Center the piece
  const centerOffset: [number, number, number] = [
    -shape.reduce((sum, p) => sum + p[0], 0) / shape.length,
    -shape.reduce((sum, p) => sum + p[1], 0) / shape.length,
    0,
  ];

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.5}>
      <Trail width={2} length={6} color={color} attenuation={(t) => t * t}>
        <group ref={groupRef} position={position} scale={scale}>
          <group position={centerOffset}>
            {shape.map((blockPos, i) => (
              <GlowBlock
                key={i}
                position={blockPos as [number, number, number]}
                color={color}
              />
            ))}
          </group>
        </group>
      </Trail>
    </Float>
  );
};

// Particle nebula effect
const NebulaParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);

  const positions = new Float32Array(
    Array.from({ length: 500 * 3 }, (_, i) => {
      const seed = i * 0.1;
      const angle = seed * 2.5;
      const radius = 15 + Math.sin(seed * 0.5) * 10;
      if (i % 3 === 0) return Math.cos(angle) * radius;
      if (i % 3 === 1)
        return (((Math.sin(seed * 12.9898) * 43758.5453) % 1) - 0.5) * 20;
      return Math.sin(angle) * radius - 10;
    })
  );

  const colors = new Float32Array(
    Array.from({ length: 500 * 3 }, (_, i) => {
      const colorIndex = Math.floor(i / 3) % 7;
      const colorValues = [
        [0, 0.96, 1], // cyan
        [0.75, 0, 1], // purple
        [1, 0.92, 0], // yellow
        [0, 1, 0.42], // green
        [1, 0.24, 0], // red
        [0, 0.4, 1], // blue
        [1, 0.57, 0], // orange
      ];
      return colorValues[colorIndex][i % 3];
    })
  );

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      particlesRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Animated light beams
const LightBeams = () => {
  const beam1Ref = useRef<THREE.SpotLight>(null);
  const beam2Ref = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    if (beam1Ref.current) {
      beam1Ref.current.position.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 15;
      beam1Ref.current.position.y =
        Math.cos(state.clock.elapsedTime * 0.3) * 10;
    }
    if (beam2Ref.current) {
      beam2Ref.current.position.x =
        Math.cos(state.clock.elapsedTime * 0.4) * 15;
      beam2Ref.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.6) * 10;
    }
  });

  return (
    <>
      <spotLight
        ref={beam1Ref}
        position={[10, 10, 5]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#a855f7"
        distance={50}
      />
      <spotLight
        ref={beam2Ref}
        position={[-10, -10, 5]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#06b6d4"
        distance={50}
      />
    </>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 10]} intensity={0.5} color="#ffffff" />

      <LightBeams />

      <Stars
        radius={80}
        depth={60}
        count={2000}
        factor={5}
        saturation={0.5}
        fade
        speed={0.5}
      />

      <NebulaParticles />

      {FLOATING_TETROMINOES.map((tetro, i) => (
        <FloatingTetromino
          key={i}
          type={tetro.type}
          position={tetro.position}
          scale={tetro.scale}
          rotationSpeed={tetro.rotationSpeed}
        />
      ))}
    </>
  );
};

export const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  );
};
