//BookScene.jsx

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";
import { useRef, useEffect, useState, Suspense } from "react";

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
 * Handles missing model gracefully.
 */
function RealisticBook({ progress }) {
  const group = useRef();

  let scene;
  try {
    const gltf = useGLTF("/models/book.glb");
    scene = gltf.scene;
  } catch (error) {
    console.warn("3D model not found: /models/book.glb. Rendering placeholder.");
    scene = null;
  }

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();

    group.current.position.x = 1.5 - progress * 4;
    group.current.position.y = Math.sin(t * 0.5) * 0.08;
    group.current.rotation.y = -Math.PI / 2 + (progress * Math.PI) / 2;
    group.current.rotation.x = Math.cos(t / 3) * 0.03;
    group.current.rotation.z = Math.sin(t / 4) * 0.02;

    const scaleValue = 2.5 + Math.sin(progress * Math.PI) * 0.15;
    group.current.scale.setScalar(scaleValue);
  });

  return (
    <>
      {scene ? (
        <primitive ref={group} object={scene} />
      ) : (
        <mesh ref={group} position={[0, 0, 0]}>
          <boxGeometry args={[1, 1.5, 0.2]} />
          <meshStandardMaterial color="lightgray" />
        </mesh>
      )}
      <ContactShadows
        position={[0, -1.0, 0]}
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

      if (scrollY < homeTop) {
        setProgress(0);
      } else if (scrollY >= aboutTop) {
        setProgress(1);
      } else {
        const sectionHeight = aboutTop - homeTop;
        const scrollProgress = (scrollY - homeTop) / sectionHeight;
        setProgress(Math.min(Math.max(scrollProgress, 0), 1));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Canvas camera={{ position: [0, 1, 3], fov: 50 }} shadows style={{ width: "100%", height: "100%" }}>
      <fog attach="fog" args={["#cce0ff", 3, 10]} />
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[4, 4, 2]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 2, 3]} intensity={1.5} color="#8A2BE2" />

      <Suspense fallback={<mesh>
        <boxGeometry args={[1, 1.5, 0.2]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>}>
        <CameraController progress={progress} />
        <RealisticBook progress={progress} />
      </Suspense>

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
