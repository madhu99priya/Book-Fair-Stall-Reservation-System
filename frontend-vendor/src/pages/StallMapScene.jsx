import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { OrbitControls } from "@react-three/drei";

function Stall({ stall, selected, onSelect }) {
  return (
    <mesh
      position={[stall.x, 0.5, stall.z]}
      onClick={() => !stall.reserved && onSelect(stall)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={stall.reserved ? "gray" : selected ? "lightgreen" : "green"}
      />
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
      camera={{ position: [5, 8, 10], fov: 50 }}
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
      {stalls.map((stall) => (
        <Stall
          key={stall.id}
          stall={stall}
          selected={selectedStalls.find((s) => s.id === stall.id)}
          onSelect={handleSelect}
        />
      ))}
      <OrbitControls enableZoom={true} />
      <gridHelper args={[20, 20]} />
    </Canvas>
  );
}
