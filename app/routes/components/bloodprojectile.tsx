import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BloodProjectile({
  time,
  points,
}: {
  time: number;
  points: THREE.Vector3[];
}) {
  const lineRef = useRef<THREE.Line>(null);

  useEffect(() => {
    if (lineRef.current) {
      const index = Math.min(Math.floor(time * 10), points.length - 1);
      const visiblePoints = points.slice(0, index + 1);
      const geometry = new THREE.BufferGeometry().setFromPoints(visiblePoints);
      lineRef.current.geometry = geometry;
    }
  }, [time, points]);

  return (
    <line ref={lineRef}>
      <lineBasicMaterial color="red" linewidth={0.5} />
    </line>
  );
}
