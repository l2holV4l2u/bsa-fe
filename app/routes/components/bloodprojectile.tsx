import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function BloodProjectile({
  time,
  endpos,
}: {
  time: number;
  endpos: number[];
}) {
  const [lines, setLines] = useState<THREE.BufferGeometry[]>([]);
  const [curline, setCurLine] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    // Precompute lines for all times
    const templine: THREE.BufferGeometry[] = [];
    const positions: [number, number, number][] = [];
    for (let i = 0; i <= 1000; i++) {
      const t = i / 1000;
      const x = endpos[0] * t;
      const z = endpos[1] * t;
      const v0 = 5;
      const g = 9.81;
      let y = v0 * t - 0.5 * g * t * t;
      y = Math.max(y, 0);

      positions.push([x, y, z]);

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(
        positions.map(([x, y, z]) => new THREE.Vector3(x, y, z))
      );
      templine.push(lineGeometry);
    }
    setLines(templine);
  }, [endpos]);

  useFrame(() => {
    const index = Math.min(Math.floor(time * 10), 1000);
    setCurLine(lines[index]);
  });

  return (
    <group>
      {curline && (
        <line>
          <primitive object={curline} attach="geometry" />
          <lineBasicMaterial color="red" linewidth={0.5} />
        </line>
      )}
    </group>
  );
}
