export function NutrientField() {
  // TODO: visualize nutrient concentration gradients
  return (
    <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#1a3a1a" transparent opacity={0.3} />
    </mesh>
  );
}
