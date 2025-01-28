import { useEffect, useRef } from "react";
import * as THREE from "three";
import { BloodPropertiesType } from "../types/blood";
import { computeEdge } from "../functions/computeedge";

export default function BloodStraight({
  planeSize,
  bloodPropertie,
}: {
  planeSize: number;
  bloodPropertie: BloodPropertiesType;
}) {
  const lineRef = useRef<THREE.Line>(null);
  const dotRef = useRef<THREE.Mesh>(null);
  const line = computeEdge(bloodPropertie, planeSize);
  const direction = new THREE.Vector3()
    .subVectors(line.end, line.start)
    .normalize();

  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.geometry = new THREE.BufferGeometry().setFromPoints([
        line.start,
        line.end,
      ]);
    }
    if (dotRef.current) {
      dotRef.current.position.set(line.start.x, line.start.y, line.start.z);
    }
  }, [bloodPropertie, planeSize]);

  return (
    <>
      <line ref={lineRef}>
        <lineBasicMaterial color="red" />
        <bufferGeometry />
      </line>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <arrowHelper
        args={[
          direction,
          new THREE.Vector3().copy(line.end).sub(direction.multiplyScalar(10)),
          10,
          0xff0000,
          0.2,
          0.2,
        ]}
      />
    </>
  );
}
