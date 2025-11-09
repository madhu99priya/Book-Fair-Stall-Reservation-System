import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { OrbitControls } from "@react-three/drei";

function Stall({ stall, selected, onSelect }) {
  const sizeMap = {
    SMALL: [1, 1, 1],
    MEDIUM: [2, 1, 2],
    LARGE: [3, 1, 3],
  };

  const color = stall.booked
    ? "gray"
    : selected
    ? "lightgreen"
    : "green";

  return (
    <mesh position={[stall.x, 0.5, stall.z]} onClick={() => !stall.booked && onSelect(stall)}>
      <boxGeometry args={sizeMap[stall.size] || [1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function StallMapScene({
  stalls,
  selectedStalls,
  setSelectedStalls,
  maxSelection = 3,
}) {
  const handleSelect = (stall) => {
    const isSelected = selectedStalls.find((s) => s.id === stall.id);
    if (isSelected) {
      setSelectedStalls(selectedStalls.filter((s) => s.id !== stall.id));
    } else {
      if (selectedStalls.length >= maxSelection) {
        alert(`You can select at most ${maxSelection} stalls.`);
        return;
      }
      setSelectedStalls([...selectedStalls, stall]);
    }
  };

  return (
    <Canvas
      camera={{ position: [7, 8, 12], fov: 50 }}
      shadows
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {stalls.map((stall, i) => (
        <Stall
          key={stall.id}
          stall={stall}
          selected={selectedStalls.find((s) => s.id === stall.id)}
          onSelect={handleSelect}
        />
      ))}

      <OrbitControls enableZoom={true} />
      <gridHelper args={[30, 30]} />
    </Canvas>
  );
}
