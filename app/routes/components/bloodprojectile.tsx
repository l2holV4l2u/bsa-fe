import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Time } from "../types/time";
import * as THREE from "three";

export default function BloodProjectile({
  time,
  endpos,
}: {
  time: number;
  endpos: number[];
}) {
  const [positions, setPositions] = useState<[number, number, number][]>([]);
  const trailRef = useRef<THREE.Line>(null!);

  useFrame((_, delta) => {
    const t = (time + delta) / 100;
    console.log(t);
    const x = endpos[0] * t;
    const z = endpos[2] * t;
    const v0 = 5;
    const g = 9.81;
    const y = v0 * t - 0.5 * g * t * t;

    if (y <= 0) {
      setPositions((prev) => [...prev, [x, 0, z]]);
    } else {
      setPositions((prev) => [...prev, [x, y, z]]);
    }

    if (trailRef.current) {
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(
        positions.map(([x, y, z]) => new THREE.Vector3(x, y, z))
      );
      trailRef.current.geometry = lineGeometry;
    }
  });

  return (
    <group>
      <line ref={trailRef}>
        <bufferGeometry />
        <lineBasicMaterial color="red" linewidth={0.5} />
      </line>
    </group>
  );
}
