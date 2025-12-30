import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: THREE.Euler;
  rotationSpeed: THREE.Vector3;
  scale: number;
  color: THREE.Color;
}

interface ParticleSystemProps {
  colors: string[];
  count: number;
  yOffset: number;
  onComplete: () => void;
}

const createParticles = (
  colors: string[],
  count: number,
  yOffset: number
): Particle[] => {
  const temp: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const colorIndex = Math.floor(Math.random() * colors.length);
    temp.push({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        yOffset + (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 2
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        Math.random() * 10 + 5,
        (Math.random() - 0.5) * 10
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      rotationSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ),
      scale: 0.15 + Math.random() * 0.15,
      color: new THREE.Color(colors[colorIndex]),
    });
  }
  return temp;
};

const Particles = ({
  colors,
  count,
  yOffset,
  onComplete,
}: ParticleSystemProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const startTimeRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const dummyRef = useRef(new THREE.Object3D());
  const colorArrayRef = useRef<Float32Array>(new Float32Array(count * 3));
  const duration = 1200;
  const initializedRef = useRef(false);

  if (!initializedRef.current) {
    initializedRef.current = true;
    startTimeRef.current = Date.now();
    particlesRef.current = createParticles(colors, count, yOffset);

    const arr = new Float32Array(count * 3);
    particlesRef.current.forEach((p, i) => {
      arr[i * 3] = p.color.r;
      arr[i * 3 + 1] = p.color.g;
      arr[i * 3 + 2] = p.color.b;
    });
    colorArrayRef.current = arr;
  }

  useFrame(() => {
    if (!meshRef.current) return;

    const elapsed = Date.now() - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);

    if (progress >= 1) {
      onComplete();
      return;
    }

    const gravity = -25;
    const dt = 0.016;

    particlesRef.current.forEach((particle: Particle, i: number) => {
      particle.velocity.y += gravity * dt;
      particle.position.add(particle.velocity.clone().multiplyScalar(dt));

      particle.rotation.x += particle.rotationSpeed.x * dt;
      particle.rotation.y += particle.rotationSpeed.y * dt;
      particle.rotation.z += particle.rotationSpeed.z * dt;

      const fadeOut = 1 - progress;
      const scale = particle.scale * fadeOut;

      dummyRef.current.position.copy(particle.position);
      dummyRef.current.rotation.copy(particle.rotation);
      dummyRef.current.scale.setScalar(scale);
      dummyRef.current.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummyRef.current.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial vertexColors />
      <instancedBufferAttribute
        attach="geometry-attributes-color"
        args={[colorArrayRef.current, 3]}
      />
    </instancedMesh>
  );
};

interface LineExplosionProps {
  clearedLines: { rowIndex: number; colors: string[] }[];
  onComplete: () => void;
}

export const LineExplosion = ({
  clearedLines,
  onComplete,
}: LineExplosionProps) => {
  if (clearedLines.length === 0) return null;

  const avgRowIndex =
    clearedLines.reduce((sum, l) => sum + l.rowIndex, 0) / clearedLines.length;
  const yOffset = (10 - avgRowIndex) * 0.4;

  const allColors = clearedLines.flatMap((line) => line.colors);
  const particleCount = clearedLines.length * 30;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 50,
      }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        style={{ background: "transparent" }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Particles
          colors={allColors}
          count={particleCount}
          yOffset={yOffset}
          onComplete={onComplete}
        />
      </Canvas>
    </div>
  );
};
