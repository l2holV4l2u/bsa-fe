import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BloodStraight({
  time,
  ori,
  end,
}: {
  time: number;
  ori: number[];
  end: number[];
}) {
  const lineRef = useRef<THREE.Line>(null);
  const arrowRef = useRef<THREE.ArrowHelper>(null);
  const dotRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const oripoint = new THREE.Vector3(ori[0], 0, ori[1]);
    const endpoint = new THREE.Vector3(end[0], 0, end[1]);
    const direction = new THREE.Vector3()
      .subVectors(endpoint, oripoint)
      .normalize();
    const distance = oripoint.distanceTo(endpoint);

    // Update the line geometry
    if (lineRef.current) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        oripoint,
        endpoint,
      ]);
      lineRef.current.geometry = geometry;
    }

    // Update the arrow
    if (arrowRef.current) {
      const arrowLength = 10;
      const arrowHeadLength = 0.4;
      const arrowHeadWidth = 0.4;

      arrowRef.current.setDirection(direction);
      arrowRef.current.setLength(arrowLength, arrowHeadLength, arrowHeadWidth);

      // Position the arrow so its tip aligns with the endpoint
      const arrowPosition = new THREE.Vector3()
        .copy(endpoint)
        .sub(direction.multiplyScalar(arrowLength));
      arrowRef.current.position.copy(arrowPosition);
    }

    // Update the dot at the origin
    if (dotRef.current) {
      dotRef.current.position.set(oripoint.x, oripoint.y, oripoint.z);
    }
  }, [time, ori, end]);

  return (
    <>
      {/* Line */}
      <line ref={lineRef}>
        <lineBasicMaterial color="red" linewidth={0.5} />
      </line>
      {/* Dot at origin */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="red" />
      </mesh>
      {/* Arrow */}
      <arrowHelper
        ref={arrowRef}
        args={[
          new THREE.Vector3(1, 0, 0),
          new THREE.Vector3(0, 0, 0),
          1,
          0xff0000,
        ]}
      />
    </>
  );
}
