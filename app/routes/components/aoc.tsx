import * as THREE from "three";
import { useRef, useEffect } from "react";
import { BloodPropertiesType } from "../types/blood";
import { INFINITY } from "three/tsl";
import { computeEdge } from "./computeedge";

export default function AOC({
  bloodProperties,
  dimension,
}: {
  bloodProperties: BloodPropertiesType[];
  dimension: number[];
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  const checkCollisions = ({
    circleSphere,
  }: {
    circleSphere: THREE.Sphere;
  }) => {
    let flag = true;
    bloodProperties.forEach((prop) => {
      const { x, y, userrot } = prop;
      const edge = computeEdge(dimension, [x, y], userrot);
      const oripoint = new THREE.Vector3(x, 0, y);
      const endpoint = new THREE.Vector3(edge[0], 0, edge[1]);
      const line = new THREE.Line3(oripoint, endpoint);
      const closestPoint = new THREE.Vector3();
      line.closestPointToPoint(circleSphere.center, true, closestPoint);
      if (closestPoint.distanceTo(circleSphere.center) > circleSphere.radius) {
        flag = false;
      }
    });
    return flag;
  };

  useEffect(() => {
    let r = dimension[0] / 2,
      resX = -INFINITY,
      resY = -INFINITY,
      resR = -INFINITY;

    while (r > 0) {
      let x = -dimension[0] / 2;
      while (x < dimension[0] / 2) {
        let y = -dimension[1] / 2;
        while (y < dimension[1] / 2) {
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
