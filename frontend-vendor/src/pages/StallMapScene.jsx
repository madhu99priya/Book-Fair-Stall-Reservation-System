import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useState, useMemo } from "react";

function Stall({ stall, selected, onSelect, disabled }) {
  const [hovered, setHovered] = useState(false);

  const sizeMap = {
    SMALL: [2, 1, 2],
    MEDIUM: [4, 1, 4],
    LARGE: [6, 1, 4],
  };

  const getColor = () => {
    if (stall.booked || disabled) return "#6c757d"; // Gray for occupied
    if (selected) return "#6f42c1"; // Purple for selected
    if (hovered) return "#17a2b8"; // Cyan for hover
    return "#20c997"; // Teal for available
  };

  const getMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: getColor(),
      metalness: 0.2,
      roughness: 0.6,
      emissive: selected ? new THREE.Color(0x220066) : new THREE.Color(0x000000),
      emissiveIntensity: selected ? 0.3 : 0,
    });
  }, [stall.booked, selected, hovered, disabled]);

  const handleClick = () => {
    if (!stall.booked && !disabled) {
      onSelect(stall);
    }
  };

  return (
    <group position={[stall.x, 0, stall.z]}>
      <mesh
        position={[0, 0.5, 0]}
        material={getMaterial}
        onClick={handleClick}
        onPointerEnter={() => !stall.booked && !disabled && setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={sizeMap[stall.size] || [1, 1, 1]} />
      </mesh>
      
      {/* Stall ID Text */}
      <Text
        position={[0, 1.05, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.8}
        color={selected ? "#ffffff" : "#000000"}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {stall.stallNumber || stall.name}
      </Text>
      
      {/* Price Text */}
      <Text
        position={[0, 0.1, 2.2]}
        fontSize={0.5}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        ₹{stall.price || stall.rentalPrice}
      </Text>
      
      {/* Selection Indicator */}
      {selected && (
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.3]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#6f42c1" 
            emissiveIntensity={0.5}
            metalness={0.1}
            roughness={0.2}
          />
        </mesh>
      )}
    </group>
  );
}

function Walkway({ position, size, label }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial 
          color="#ffffff"  // Pure white
          transparent={false}
          opacity={1.0}
          roughness={0.8}
          metalness={0.0}
        />
      </mesh>
      
      {/* Walkway Label */}
      <Text
        position={[0, 0.15, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={1.0}
        color="#495057"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {label}
      </Text>
      
      {/* Walkway Direction Arrows */}
      <Text
        position={[size[0]/4, 0.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.6}
        color="#28a745"
        anchorX="center"
        anchorY="middle"
      >
        →
      </Text>
      <Text
        position={[-size[0]/4, 0.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.6}
        color="#28a745"
        anchorX="center"
        anchorY="middle"
      >
        ←
      </Text>
    </group>
  );
}

function Ground() {
  return (
    <mesh position={[0, -0.5, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial 
        color="#f8f9fa"  // Light background
        roughness={0.9}
        metalness={0.0}
      />
    </mesh>
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
      alert(`You can only select up to ${remainingLimit} stalls`);
      return;
    }

    setSelectedStalls([...selectedStalls, stall]);
  };

  return (
    <Canvas
      gl={{ 
        outputColorSpace: THREE.SRGBColorSpace,
        shadowMap: { enabled: true, type: THREE.PCFSoftShadowMap },
        antialias: true
      }}
      camera={{ position: [0, 35, 25], fov: 50 }}
      shadows
      style={{ width: "100%", height: "100%" }}
    >
      {/* Enhanced Lighting for better color rendering */}
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight
        position={[20, 20, 10]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <pointLight position={[-20, 15, -10]} intensity={0.4} color="#87ceeb" />
      
      <Ground />
      
      {/* Main Walkway - Pure White */}
      <Walkway 
        position={[0, 0, 0]} 
        size={[4, 0.1, 35]} 
        label="MAIN WALKWAY" 
      />
      
      {/* Side Walkways */}
      <Walkway 
        position={[18, 0, 0]} 
        size={[2, 0.1, 30]} 
        label="EXIT PATH" 
      />
      <Walkway 
        position={[-18, 0, 0]} 
        size={[2, 0.1, 30]} 
        label="ENTRANCE" 
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
      
      <OrbitControls 
        enableZoom 
        maxPolarAngle={Math.PI / 2.2}
        minDistance={20}
        maxDistance={80}
      />
      
      <gridHelper args={[50, 50, "#dee2e6", "#dee2e6"]} />
    </Canvas>
  );
}