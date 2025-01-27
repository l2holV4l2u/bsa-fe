import { BloodPropertiesType } from "../types/blood";
import * as THREE from "three";

export function computeEdge(
  bloodPropertie: BloodPropertiesType,
  planeSize: number
) {
  const { x, y, userrot } = bloodPropertie;
  const rotation = userrot + 180;
  const direction = new THREE.Vector3(
    Math.round(rotation / 180) % 2 == 0 ? 1 : -1,
    0,
    (Math.floor(rotation / 180) % 2 == 0 ? -1 : 1) *
      Math.abs(Math.tan((rotation * Math.PI) / 180))
  ).normalize();
  const halfSize = planeSize / 2;
  const maxDistances = [
    (halfSize - x) / direction.x,
    (-halfSize - x) / direction.x,
    (halfSize - y) / direction.z,
    (-halfSize - y) / direction.z,
  ];
  const validDistances = maxDistances.filter((d) => d > 0);
  const maxDistance = Math.min(...validDistances);
  const endPoint = new THREE.Vector3()
    .copy(direction)
    .multiplyScalar(maxDistance)
    .add(new THREE.Vector3(x, 0, y));
  const points = [new THREE.Vector3(x, 0, y), endPoint];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: "red" });
  return new THREE.Line(geometry, material);
}
