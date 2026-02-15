import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { CellRenderer } from './CellRenderer';
import { NutrientField } from './NutrientField';
import { Controls } from './Controls';

export function PetriDish() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 5, 10], fov: 60 }}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.AgXToneMapping,
          toneMappingExposure: 0.6,
        }}
      >
        <ambientLight intensity={0.02} />
        <directionalLight position={[1, 6, 2]} intensity={0.08} color="#8899aa" />
        <CellRenderer position={[0, 0, 0]} />
        <NutrientField />
        <OrbitControls />
        <gridHelper args={[20, 20, '#444', '#222']} />
      </Canvas>
      <Controls />
    </div>
  );
}
