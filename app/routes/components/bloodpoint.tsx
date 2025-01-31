import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { AppContext } from "../functions/context";
import { useContext, useEffect, useRef } from "react";
import * as THREE from "three";

export default function BloodPoint() {
  const { bloodProperties, settings } = useContext(AppContext);
  const dotRefs = useRef<(THREE.Mesh | null)[]>([]);
  const textRefs = useRef<(THREE.Mesh | null)[]>([]);

  useEffect(() => {
    bloodProperties.forEach((prop, index) => {
      if (dotRefs.current[index]) {
        dotRefs.current[index]!.position.copy(prop.edge.start);
      }
    });
  }, [bloodProperties, settings.planeSize]);

  useFrame(({ camera }) => {
    bloodProperties.forEach((_, index) => {
      if (textRefs.current[index]) {
        textRefs.current[index]!.lookAt(camera.position);
      }
    });
  });

  return (
    <>
      {bloodProperties.map((prop, index) => {
        return (
          <group key={index}>
            <mesh ref={(el) => (dotRefs.current[index] = el)}>
              <sphereGeometry args={[0.004 * settings.planeSize, 12, 12]} />
              <meshBasicMaterial color="red" />
            </mesh>
            <Text
              ref={(el) => (textRefs.current[index] = el)}
              position={[
                prop.edge.start.x,
                prop.edge.start.y - 0.015 * settings.planeSize,
                prop.edge.start.z,
              ]}
              fontSize={0.01 * settings.planeSize}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {index + 1}
            </Text>
          </group>
        );
      })}
    </>
  );
}
