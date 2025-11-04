import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";

/**
 * HELPER COMPONENT 1: Controls the camera
 */
function CameraController({ progress }) {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.x = 0;
    camera.position.z = 4;
    camera.position.y = 0.5;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/**
 * HELPER COMPONENT 2: Renders the book model and its animations
 */
function RealisticBook({ progress }) {
  const group = useRef();
  const { scene } = useGLTF("/models/book.glb");

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // --- 1. MOVE BOOK FURTHER LEFT ---
    //
    // By changing (progress * 3) to (progress * 4), the book now
    // travels from x=1.5 to x=-2.5 (1.5 - 4) instead of x=-1.5 (1.5 - 3).
    // Increase the '4' to move it even further left.
    //
    group.current.position.x = 1.5 - progress * 4; // Was 3

    // Gentle floating motion
    group.current.position.y = Math.sin(t * 0.5) * 0.08;

    // Book rotation: starts showing left side, smoothly rotates to front view
    group.current.rotation.y = -Math.PI / 2 + (progress * Math.PI) / 2;

    // Subtle idle rotation for realism
    group.current.rotation.x = Math.cos(t / 3) * 0.03;
    group.current.rotation.z = Math.sin(t / 4) * 0.02;

    // --- 2. INCREASE BOOK SIZE ---
    //
    // The base size was 2.0. We can increase this to 2.5 or 3.0
    // to make the book appear larger on screen.
    //
    const scaleValue = 2.5 + Math.sin(progress * Math.PI) * 0.15; // Was 2.0
    group.current.scale.setScalar(scaleValue);
  });

  return (
    <>
      <primitive ref={group} object={scene} />
      {/* Soft contact shadow on the ground (lowered for larger book) */}
      <ContactShadows
        position={[0, -1.0, 0]} // You may need to lower this more (e.g., -1.2) if the book gets bigger
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={1.5}
      />
    </>
  );
}

/**
 * MAIN COMPONENT: Exports the full scene
 */
export default function BookScene() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById("home");
      const aboutSection = document.getElementById("about");

      if (!homeSection || !aboutSection) return;

      const homeTop = homeSection.offsetTop;
      const aboutTop = aboutSection.offsetTop;
      const scrollY = window.scrollY;

      // Calculate progress between home and about sections
      if (scrollY < homeTop) {
        setProgress(0);
      } else if (scrollY >= aboutTop) {
        setProgress(1);
      } else {
        // Smooth transition between sections
        const sectionHeight = aboutTop - homeTop;
        const scrollProgress = (scrollY - homeTop) / sectionHeight;
        setProgress(Math.min(Math.max(scrollProgress, 0), 1));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 1, 3], fov: 50 }}
      shadows
      style={{ width: "100%", height: "100%" }}
    >
      {/* Futuristic "look" changes */}
      <fog attach="fog" args={["#cce0ff", 3, 10]} />
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[4, 4, 2]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight
        position={[0, 2, 3]}
        intensity={1.5}
        color="#8A2BE2" // Purple tint
      />

      {/* Components */}
      <CameraController progress={progress} />
      <RealisticBook progress={progress} />

      {/* Disable user panning */}
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
