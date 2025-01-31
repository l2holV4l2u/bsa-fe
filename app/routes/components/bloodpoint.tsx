import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BloodPoint({
  planeSize,
  edge,
  angle,
  index,
}: {
  planeSize: number;
  edge: THREE.Line3;
  angle: number;
  index: number;
}) {
  const dotRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (dotRef.current) {
      dotRef.current.position.copy(edge.start);
    }
  }, [edge, planeSize, angle]);

  useFrame(({ camera }) => {
    if (textRef.current) {
      textRef.current.lookAt(camera.position);
    }
  });

  return (
    <>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.075, 12, 12]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <Text
        ref={textRef}
        position={[edge.start.x, edge.start.y - 0.2, edge.start.z]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {index + 1}
      </Text>
    </>
  );
}
