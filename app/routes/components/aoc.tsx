import * as THREE from "three";
import { useRef, useEffect, Dispatch, SetStateAction, useState } from "react";
import { BloodPropertiesType } from "../types/blood";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function AOC({
  bloodProperties,
  planeSize,
  center,
  setCenter,
}: {
  bloodProperties: BloodPropertiesType[];
  planeSize: number;
  center: number[];
  setCenter: Dispatch<SetStateAction<number[]>>;
}) {
  const textRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [r, setR] = useState(0);

  const checkCollisions = ({
    circleSphere,
  }: {
    circleSphere: THREE.Sphere;
  }) => {
    let flag = true;
    bloodProperties.forEach((prop) => {
      const closestPoint = new THREE.Vector3();
      prop.edge.closestPointToPoint(circleSphere.center, true, closestPoint);
      if (closestPoint.distanceTo(circleSphere.center) > circleSphere.radius) {
        flag = false;
        return;
      }
    });
    return flag;
  };

  useEffect(() => {
    let lr = -planeSize / 2,
      rr = -lr,
      resX = 0,
      resY = 0,
      resR = 0;

    if (bloodProperties.length != 0) {
      while (lr < rr) {
        let x = -planeSize / 2;
        let mr = (lr + rr) / 2;
        let flag = false;
        while (x < planeSize / 2) {
          let y = -planeSize / 2;
          while (y < planeSize / 2) {
            const circleSphere = new THREE.Sphere(
              new THREE.Vector3(x, 0, y),
              mr
            );
            if (checkCollisions({ circleSphere })) {
              flag = true;
              resX = x;
              resY = y;
              resR = mr;
            }
            y += 0.5;
          }
          x += 0.5;
        }
        flag ? (rr = mr) : (lr = mr + 0.25);
      }
    }
    setCenter([resX, resY]);
    setR(lr);
    if (ringRef.current) {
      ringRef.current.position.set(resX, 0, resY);
      ringRef.current.scale.set(resR, resR, 1);
      ringRef.current.rotation.x = Math.PI / 2;
    }
  }, [bloodProperties]);

  useFrame(({ camera }) => {
    if (textRef.current) {
      textRef.current.lookAt(camera.position);
    }
  });

  return (
    <>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.8, 1, 64]} />
        <meshBasicMaterial
          color="red"
          opacity={0.75}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      {bloodProperties.length != 0 && r >= 0.25 && (
        <Text
          ref={textRef}
          position={[center[0], -0.3, center[1]]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          (h,k) = ({center[0]}, {-center[1]}), r = {r.toFixed(2)}
        </Text>
      )}
    </>
  );
}
