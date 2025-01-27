import * as THREE from "three";
import { useRef, useEffect } from "react";
import { BloodPropertiesType } from "../types/blood";
import { computeAOC } from "./computeaoc";

export default function AOC({
  bloodProperties,
  dimension,
}: {
  bloodProperties: BloodPropertiesType[];
  dimension: number[];
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const [resX, resY, resR] = computeAOC(bloodProperties, dimension);

    console.log(resX, resY, resR);

    if (ringRef.current) {
      ringRef.current.position.set(0, 0, 0);
      ringRef.current.rotation.x = Math.PI / 2;
    }
  }, [bloodProperties]);

  return (
    <>
      {/* Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.8, 1, 64]} />{" "}
        {/* Inner radius, outer radius, 64 segments */}
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
