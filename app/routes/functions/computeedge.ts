import { BloodPropertiesType } from "../types/blood";
import * as THREE from "three";

export function computeEdge(
  bloodPropertie: BloodPropertiesType,
  planeSize: number,
  x: number,
  y: number,
  userrot: number
) {
  const rotation = userrot + 180;
  const direction = new THREE.Vector3(
    Math.round(rotation / 180) % 2 == 0 ? 1 : -1,
    0,
    (Math.floor(rotation / 180) % 2 == 0 ? -1 : 1) *
      Math.abs(Math.tan((rotation * Math.PI) / 180))
  ).normalize();
  const maxDistances = [
    (planeSize - x) / direction.x,
    -x / direction.x,
    (-planeSize - y) / direction.z,
    -y / direction.z,
  ];
  const validDistances = maxDistances.filter((d) => d > 0);
  const maxDistance = Math.min(...validDistances);
  const endPoint = new THREE.Vector3()
    .copy(direction)
    .multiplyScalar(maxDistance)
    .add(new THREE.Vector3(x, 0, y));
  bloodPropertie.edge = new THREE.Line3(new THREE.Vector3(x, 0, y), endPoint);
}
