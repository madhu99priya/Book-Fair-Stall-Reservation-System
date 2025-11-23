import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useState } from "react";

function Stall({ stall, selected, onSelect, disabled }) {
  const [hovered, setHovered] = useState(false);

  const sizeMap = {
    SMALL: [2, 1, 2],
    MEDIUM: [4, 1, 4],
    LARGE: [6, 1, 4],
  };

  const getColor = () => {
    if (stall.booked || disabled) return "grey"; // occupied
    if (selected) return "red"; // selected
    if (hovered) return "#17a2b8"; // hover
    return "cyan"; // available
  };

  const handleClick = () => {
    if (!stall.booked && !disabled) {
      onSelect(stall);
    }
  };

  return (
    <group position={[stall.x, 0, stall.z]}>
      <mesh
        position={[0, 0.5, 0]}
        onClick={handleClick}
        onPointerEnter={() => !stall.booked && !disabled && setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={sizeMap[stall.size]} />
        <meshStandardMaterial
          color={getColor()}
          metalness={0.2}
          roughness={0.6}
          emissive={selected ? "#220066" : "#000000"}
          emissiveIntensity={selected ? 0.3 : 0}
        />
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
        {stall.name}
      </Text>
    </group>
  );
}

function Walkway({ position, size, label, labelPosition }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial 
          color="white"
          transparent={false}
          opacity={1.0}
          roughness={0.8}
          metalness={0.0}
        />
      </mesh>
      
      {/* Walkway Label */}
      {label && (
        <Text
          position={labelPosition || [0, 0.15, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={1.0}
          color="#495057"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {label}
        </Text>
      )}
    </group>
  );
}

function Ground() {
  return (
    <mesh
      position={[0, 0, 0]}
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[50, 45]} />
      <meshStandardMaterial 
        color="#ffffffff"
        opacity={0} transparent
      />
    </mesh>
  );
}

function Legend() {
  const items = [
    { color: "red", label: "Selected" },
    { color: "#909091ff", label: "Reserved" },
    { color: "cyan", label: "Available" },
  ];

  return (
    <div style={{
      position: "absolute",
      top: 20,
      right: 20,
      background: "rgba(0,0,0,0.6)",
      padding: "10px 15px",
      borderRadius: "8px",
      color: "white",
      fontSize: "0.9rem",
      zIndex: 10,
    }}>
      {items.map((item) => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
          <div style={{
            width: "16px",
            height: "16px",
            backgroundColor: item.color,
            marginRight: "8px",
            border: "1px solid #fff"
          }} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
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
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Legend/>
      <Canvas
        gl={{ 
          outputColorSpace: THREE.SRGBColorSpace,
          shadowMap: { enabled: true, type: THREE.PCFSoftShadowMap },
          antialias: true,
          alpha: true
        }}
        camera={{ position: [0, 35, 25], fov: 50 }}
        shadows
        style={{ width: "100%", height: "100%", background:"transparent" }}
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

        <Walkway position={[20, 0, 0]} size={[2, 0.1, 36]} label="EXIT" labelPosition={[-0.5, 0.2, 0]} />
        <Walkway position={[0, 0, 17]} size={[38, 0.1, 2]} label="MAIN EXIT" />
        <Walkway position={[16, 0, 0]} size={[6, 0.1, 1]} />
        <Walkway position={[0, 0, -17]} size={[38, 0.1, 2]} label="MAIN ENTRANCE" />
        <Walkway position={[0, 0, -13]} size={[2, 0.1, 6]} />
        <Walkway position={[-18, 0, 0]} size={[2, 0.1, 32]} label="ENTRANCE" labelPosition={[2, 0.2, 0]} />
        <Walkway position={[-14, 0, 0]} size={[6, 0.1, 1]} />
        <Walkway position={[0, 0, 13]} size={[2, 0.1, 6]} />
        
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
        
        <gridHelper args={[50, 50]} visible={false} />
      </Canvas>
    </div>
  );
}