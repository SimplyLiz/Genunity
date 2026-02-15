import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useSimulationStore } from '../../stores/simulationStore';

interface CellRendererProps {
  position: [number, number, number];
}

export function CellRenderer({ position }: CellRendererProps) {
  const state = useSimulationStore((s) => s.state);
  const groupRef = useRef<THREE.Group>(null);

  const growthRate = state?.growthRate ?? 0.5;
  const replicationProgress = 0; // TODO: derive from simulation state when available

  // Generate stable ribosome positions
  const ribosomePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const count = 20;
    for (let i = 0; i < count; i++) {
      const theta = Math.acos(2 * ((i + 0.5) / count) - 1);
      const phi = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 0.45 + Math.random() * 0.25;
      positions.push([
        r * Math.sin(theta) * Math.cos(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(theta),
      ]);
    }
    return positions;
  }, []);

  // Generate stable mRNA strand positions
  const mrnaPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 0.3 + Math.random() * 0.3;
      positions.push([
        r * Math.cos(angle),
        (Math.random() - 0.5) * 0.6,
        r * Math.sin(angle),
      ]);
    }
    return positions;
  }, []);

  // Gentle idle rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Membrane — transparent outer shell */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#1a2a3a"
          emissiveIntensity={0.15}
          transparent
          opacity={0.15}
          roughness={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Nucleoid — central DNA mass */}
      <mesh>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#3355aa"
          emissiveIntensity={0.4 + replicationProgress * 0.3}
          roughness={1}
        />
      </mesh>

      {/* Nucleoid glow — additive bloom shell */}
      <mesh>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshBasicMaterial
          color="#182255"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Replication fork — visible during DNA replication */}
      {replicationProgress > 0 && (
        <mesh position={[0.15, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#4466aa"
            emissiveIntensity={0.4}
            roughness={1}
          />
        </mesh>
      )}

      {/* Ribosomes — scattered dots in cytoplasm */}
      {ribosomePositions.map((pos, i) => (
        <mesh key={`rib-${i}`} position={pos}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#aa7720"
            emissiveIntensity={0.3 + growthRate * 0.15}
            roughness={1}
          />
        </mesh>
      ))}

      {/* mRNA strands — small elongated shapes */}
      {mrnaPositions.map((pos, i) => (
        <mesh
          key={`mrna-${i}`}
          position={pos}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        >
          <capsuleGeometry args={[0.015, 0.08, 4, 8]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#20884a"
            emissiveIntensity={0.3}
            roughness={1}
          />
        </mesh>
      ))}

      {/* Flagellum — tail extending from cell */}
      <mesh position={[-1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.02, 0.8, 4, 8]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#445566"
          emissiveIntensity={0.2}
          roughness={1}
        />
      </mesh>
    </group>
  );
}
