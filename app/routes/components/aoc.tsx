import * as THREE from "three";
import { useRef, useEffect } from "react";
import { BloodPropertiesType } from "../types/blood";
import { INFINITY } from "three/tsl";
import { computeEdge } from "./computeedge";

export default function AOC({
  bloodProperties,
  planeSize,
}: {
  bloodProperties: BloodPropertiesType[];
  planeSize: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  const checkCollisions = ({
    circleSphere,
  }: {
    circleSphere: THREE.Sphere;
  }) => {
    let flag = true;
    bloodProperties.forEach((prop) => {
      const geometry = computeEdge(prop, planeSize).geometry;
      const positions = geometry.getAttribute("position");
      const startPoint = new THREE.Vector3(
        positions.getX(0),
        positions.getY(0),
        positions.getZ(0)
      );
      const endPoint = new THREE.Vector3(
        positions.getX(1),
        positions.getY(1),
        positions.getZ(1)
      );
      const line = new THREE.Line3(startPoint, endPoint);
      const closestPoint = new THREE.Vector3();
      line.closestPointToPoint(circleSphere.center, true, closestPoint);
      if (closestPoint.distanceTo(circleSphere.center) > circleSphere.radius) {
        flag = false;
        return;
      }
    });
    return flag;
  };

  useEffect(() => {
    let r = planeSize / 2,
      resX = -INFINITY,
      resY = -INFINITY,
      resR = -INFINITY;

    while (r > 0) {
      let x = -planeSize / 2;
      while (x < planeSize / 2) {
        let y = -planeSize / 2;
        while (y < planeSize / 2) {
          const circleSphere = new THREE.Sphere(new THREE.Vector3(x, 0, y), r);
          if (checkCollisions({ circleSphere })) {
            resX = x;
            resY = y;
            resR = r;
          }
          y += 0.5;
        }
        x += 0.5;
      }
      r -= 0.5;
    }

    if (ringRef.current) {
      ringRef.current.position.set(resX, 0, resY);
      ringRef.current.scale.set(resR, resR, 1);
      ringRef.current.rotation.x = Math.PI / 2;
    }
  }, [bloodProperties]);

  return (
    <>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.9, 1, 64]} />
        <meshBasicMaterial
          color="red"
          opacity={0.75}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}
