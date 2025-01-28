import * as THREE from "three";
import { BloodPropertiesType } from "../types/blood";

export function computeTrajectory(prop: BloodPropertiesType, center: number[]) {
  const positions: THREE.Vector3[] = [];
  const { x, y, impactAngle } = prop;
  const di = Math.sqrt(x * x + y * y);
  if (di == 0 || impactAngle == 0) {
    return [];
  }
  const tan = Math.tan((impactAngle * Math.PI) / 180);
  const h = (di * tan) / 2;
  console.log(center);
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    const cx = center[0] + (x - center[0]) * t;
    const cz = center[1] + (y - center[1]) * t;
    const dit = Math.sqrt(cx * cx + cz * cz);
    const cy = (-1 / (2 * di)) * tan * dit * dit + h;
    positions.push(new THREE.Vector3(cx, cy, cz));
  }
  return positions;
}
