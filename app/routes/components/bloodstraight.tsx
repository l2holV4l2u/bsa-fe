import { useEffect, useRef } from "react";
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
  const angleRef = useRef<THREE.ArrowHelper>(null);
  const directionRef = useRef(new THREE.Vector3());
  const rotatedDirectionRef = useRef(new THREE.Vector3());

  useEffect(() => {
    directionRef.current.subVectors(edge.end, edge.start).normalize();
    if (lineRef.current) {
      lineRef.current.geometry = new THREE.BufferGeometry().setFromPoints([
        edge.start,
        edge.end,
      ]);
    }
    const rotationAxis = directionRef.current
      .clone()
      .cross(new THREE.Vector3(0, 1, 0))
      .normalize();
    rotatedDirectionRef.current
      .copy(directionRef.current)
      .applyAxisAngle(rotationAxis, (angle * Math.PI) / 180);
    if (angleRef.current) {
      angleRef.current.setDirection(rotatedDirectionRef.current);
    }
  }, [edge, planeSize, angle]);

  return (
    <>
      <line ref={lineRef}>
        <lineBasicMaterial color="red" />
        <bufferGeometry />
      </line>
      <arrowHelper
        args={[directionRef.current, edge.end, 0.01, "red", 0.1, 0.1]}
      />
      <arrowHelper
        ref={angleRef}
        args={[
          rotatedDirectionRef.current,
          edge.start,
          0.5,
          0xe1e97b,
          0.1,
          0.1,
        ]}
      />
    </>
  );
}
