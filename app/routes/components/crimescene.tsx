import { OrbitControls, PerspectiveCamera, Circle } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function () {
  return (
    <Canvas>
      {/* Set up camera for a better orthogonal view */}
      <PerspectiveCamera makeDefault position={[20, 20, 20]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} />
      <gridHelper />
      <mesh>
        <Circle />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}
