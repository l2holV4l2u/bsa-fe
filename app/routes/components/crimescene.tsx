import { OrbitControls, PerspectiveCamera, Circle } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import BloodProjectile from "./bloodprojectile";
import { Time } from "../types/time";

export default function Crimescene({ time, setTime }: Time) {
  const BloodProjectileProps = { time, setTime };
  return (
    <Canvas>
      {/* Set up camera for a better orthogonal view */}
      <PerspectiveCamera makeDefault position={[5, 5, 5]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} />
      <gridHelper args={[15, 15]} />
      <BloodProjectile {...BloodProjectileProps} />
      <OrbitControls />
    </Canvas>
  );
}
