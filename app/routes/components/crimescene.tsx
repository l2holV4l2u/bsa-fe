import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import BloodProjectile from "./bloodprojectile";
import { BloodPropertiesType } from "../types/blood";

export default function Crimescene({
  time,
  bloodProperties,
}: {
  time: number;
  bloodProperties: BloodPropertiesType[];
}) {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[5, 5, 5]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} />
      <gridHelper args={[15, 15]} />
      <Text
        position={[0, -0.3, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        (0, 0)
      </Text>
      {bloodProperties.map((prop, index) => (
        <BloodProjectile key={index} time={time} endpos={[prop.x, prop.y]} />
      ))}

      <OrbitControls />
    </Canvas>
  );
}
