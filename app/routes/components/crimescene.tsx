import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import BloodProjectile from "./bloodprojectile";
import { Time } from "../types/time";

export default function Crimescene({ time, setTime }: Time) {
  // State to store the random end positions
  const [endpositions, setEndPositions] = useState<number[][] | null>(null);

  // Function to generate random end position
  const generateRandomEndPos = () => {
    const x = Math.random() * 10 - 5; // Random x position between -5 and 5
    const y = 0; // Fixed y position at 0
    const z = Math.random() * 10 - 5; // Random z position between -5 and 5
    return [x, y, z];
  };

  // Generate random positions once when the component is first mounted
  useEffect(() => {
    const temp: number[][] = [];
    [...Array(10)].map(() => {
      const endposition = generateRandomEndPos();
      temp.push(endposition);
    });
    setEndPositions(temp); // Update state with the generated positions
  }, []); // Empty dependency array ensures it runs only once on mount

  // Return null if endpositions is still null
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
