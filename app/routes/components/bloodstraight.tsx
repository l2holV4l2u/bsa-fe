import { useEffect, useRef } from "react";
import * as THREE from "three";
import { BloodPropertiesType } from "../types/blood";
import { computeEdge } from "./computeedge";

export default function BloodStraight({
  planeSize,
  bloodPropertie,
}: {
  planeSize: number;
  bloodPropertie: BloodPropertiesType;
}) {
  const lineRef = useRef<THREE.Line>(null);

  useEffect(() => {
    if (lineRef.current) {
      const line = computeEdge(bloodPropertie, planeSize);
      lineRef.current.geometry = line.geometry;
    }
  }, [bloodPropertie, planeSize]);

  return (
    <line ref={lineRef}>
      <lineBasicMaterial color="red" />
      <bufferGeometry />
    </line>
  );
}
