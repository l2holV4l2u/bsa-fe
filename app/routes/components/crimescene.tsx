import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import BloodProjectile from "./bloodprojectile";
import { Time } from "../types/time";
import { BloodPropertiesType } from "../types/blood";

export default function Crimescene({
  time,
  setTime,
  bloodProperties,
}: Time & { bloodProperties: BloodPropertiesType[] }) {
  const [endpositions, setEndPositions] = useState<number[][] | null>(null);

  useEffect(() => {
    const temp: number[][] = [];
    [...Array(10)].map(() => {
      const endposition = generateRandomEndPos();
      temp.push(endposition);
    });
    setEndPositions(temp);
  }, []);

  if (!endpositions) return null;

  return (
    <Canvas>
      {/* Set up camera for a better orthogonal view */}
      <PerspectiveCamera makeDefault position={[5, 5, 5]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} />
      <gridHelper args={[15, 15]} />
      <Text
        position={[0, -0.3, 0]} // Slightly above the origin
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        (0, 0)
      </Text>

      {/* Render BloodProjectile with random endpos */}
      {endpositions.map((endpos, index) => (
        <BloodProjectile key={index} time={time} endpos={endpos} />
      ))}

      <OrbitControls />
    </Canvas>
  );
}
