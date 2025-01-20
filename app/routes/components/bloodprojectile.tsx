import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Time } from "../types/time";

export default function BloodProjectile({ time }: Time) {
  const [positions, setPositions] = useState<[number, number, number][]>([]);
  const trailRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    const t = (time + delta) / 100;
    const x = 3 * t;
    const z = 4 * t;
    const v0 = 5;
    const g = 9.81;
    const y = v0 * t - 0.5 * g * t * t;

    if (y <= 0) {
      setPositions((prev) => [...prev, [x, 0, z]]);
    } else {
      setPositions((prev) => [...prev, [x, y, z]]);
    }

    if (trailRef.current) {
      trailRef.current.children.forEach((child, index) => {
        child.position.set(
          positions[index][0],
          positions[index][1],
          positions[index][2]
        );
      });
    }
  });

  return (
    <>
      <group ref={trailRef}>
        {positions.map((pos, index) => (
          <mesh key={index} position={pos}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="red" />
          </mesh>
        ))}
      </group>
    </>
  );
}
