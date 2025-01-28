import * as THREE from "three";
import { BloodPropertiesType } from "../types/blood";

export function computeTrajectory(
  prop: BloodPropertiesType,
  center: number[],
  motion: string
) {
  const positions: THREE.Vector3[] = [];
  const { x, y, AOI } = prop;
  const di = Math.sqrt(x * x + y * y);
  if (di == 0 || AOI == 0) {
    return [];
  }
  const g = 9.81;
  const v0 = 0.5 * g;
  const tan = Math.tan((AOI * Math.PI) / 180);
  const h = (di * tan) / 2;
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    const cx = center[0] + (x - center[0]) * t;
    const cz = center[1] + (y - center[1]) * t;
    const xt = Math.sqrt(cx * cx + cz * cz);
    const cy =
      motion == "Free fall"
        ? (-1 / (2 * di)) * tan * xt * xt + h
        : v0 * t - 0.5 * g * t * t;
    /*
    : ((h + di * tan) / (di * di)) * xt * xt -
    (tan + (2 * h) / di) * xt +
    h;
    */
    positions.push(new THREE.Vector3(cx, cy, cz));
  }
  return positions;
}
