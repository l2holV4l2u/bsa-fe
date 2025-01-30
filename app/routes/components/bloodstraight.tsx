import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function BloodStraight({
  planeSize,
  edge,
  angle,
}: {
  planeSize: number;
  edge: THREE.Line3;
  angle: number;
}) {
  const lineRef = useRef<THREE.Line>(null);
  const dotRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef<THREE.ArrowHelper>(null);
  const [direction, setDirection] = useState(new THREE.Vector3(0, 0, 0));
  useEffect(() => {
    setDirection(
      new THREE.Vector3().subVectors(edge.end, edge.start).normalize()
    );
    if (lineRef.current) {
      lineRef.current.geometry = new THREE.BufferGeometry().setFromPoints([
        edge.start,
        edge.end,
      ]);
    }
    if (dotRef.current) {
      dotRef.current.position.set(edge.start.x, edge.start.y, edge.start.z);
    }
  }, [edge, planeSize]);

  return (
    <>
      <line ref={lineRef}>
        <lineBasicMaterial color="red" />
        <bufferGeometry />
      </line>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.075, 12, 12]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <arrowHelper args={[direction, edge.end, 0.01, 0xe1e97b, 0.2, 0.2]} />
    </>
  );
}
