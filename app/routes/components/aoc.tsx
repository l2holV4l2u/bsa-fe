import { useRef, useEffect, useState, useContext } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AppContext, CrimeSceneContext } from "../functions/context";

export default function AOC() {
  const { bloodProperties, settings } = useContext(AppContext);
  const { center, setCenter, impact, vicHeight } =
    useContext(CrimeSceneContext);
  const planeSize = settings.planeSize;
  const textRef = useRef<THREE.Mesh>(null);
  const centerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [r, setR] = useState(0);
  const [innerRadius, setInnerRadius] = useState(0);

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
    const safeR = Math.max(r, 1);
    setInnerRadius(Math.max(1 - 1 / (2.5 * safeR), 0.01));
    setR(lr);
    if (ringRef.current) {
      ringRef.current.position.set(resX, 0, resY);
      ringRef.current.scale.set(resR, resR, 1);
      ringRef.current.rotation.x = Math.PI / 2;
    }
  }, [bloodProperties, settings]);

  useFrame(({ camera }) => {
    if (textRef.current) {
      textRef.current.lookAt(camera.position);
    }
    if (centerRef.current) {
      centerRef.current.lookAt(camera.position);
    }
  });

  return (
    <>
      <mesh ref={ringRef}>
        <ringGeometry args={[innerRadius, 1, 64]} />
        <meshBasicMaterial
          color="white"
          opacity={0.9}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      {bloodProperties.length != 0 && r >= 0.25 && (
        <>
          <Text
            ref={textRef}
            position={[center[0], vicHeight + 2, center[1]]}
            fontSize={0.015 * settings.planeSize}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Point of Impact = ({center[0]}, {-center[1]}, {impact.toFixed(2)})
          </Text>
          <Text
            ref={centerRef}
            position={[center[0], vicHeight + 1, center[1]]}
            fontSize={0.015 * settings.planeSize}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            (h,k) = ({center[0]}, {-center[1]}), r = {r.toFixed(2)}
          </Text>
        </>
      )}
    </>
  );
}
