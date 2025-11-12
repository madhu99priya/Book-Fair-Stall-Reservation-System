// StallMapScene.jsx

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

function Stall({ stall, selected, onSelect }) {
  const sizeMap = {
    SMALL: [2, 1, 2],
    MEDIUM: [4, 1, 4],
    LARGE: [6, 1, 4],
  };

  const color = stall.booked ? "gray" : selected ? "red" : "green";

  return (
    <group position={[stall.x, 0, stall.z]}>
      <mesh position={[0, 0.5, 0]} onClick={() => !stall.booked && onSelect(stall)}>
        <boxGeometry args={sizeMap[stall.size] || [1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, 1.05, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.7}
        color="black"
        anchorX="center"
        anchorY="middle"
        outlineColor="black"
      >
        {stall.name}
      </Text>
    </group>
  );
}

export default function StallMapScene({
  stalls,
  selectedStalls,
  setSelectedStalls,
  userBookedStalls = [],
  remainingLimit = 3,
}) {
  const handleSelect = (stall) => {
    const isSelected = selectedStalls.find((s) => s.id === stall.id);

    if (isSelected) {
      setSelectedStalls(selectedStalls.filter((s) => s.id !== stall.id));
      return;
    }

    if (selectedStalls.length >= remainingLimit) {
      alert("A user can purchase only 3 stalls");
      return;
    }

    setSelectedStalls([...selectedStalls, stall]);
  };

  return (
    <Canvas
      gl={{ outputColorSpace: THREE.SRGBColorSpace }}
      camera={{ position: [0, 35, 0], fov: 50 }}
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
          disabled={userBookedStalls.includes(stall.id)}
        />
      ))}
      <OrbitControls enableZoom />
      <gridHelper args={[30, 30]} />
    </Canvas>
  );
}