import * as THREE from "three";
import { BloodPropertiesType } from "../types/blood";

export function computeTrajectory(
  prop: BloodPropertiesType,
  h: number,
  center: number[],
  motion: string
) {
  const positions: THREE.Vector3[] = [];
  let { x, y, AOI } = prop;
  const di = Math.sqrt((x - center[0]) ** 2 + (y - center[1]) ** 2);
  if (di == 0 || AOI == 0) {
    return [];
  }
  const tan = Math.tan((AOI * Math.PI) / 180);
  const ch = (di * tan) / 2;
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    const cx = center[0] + (x - center[0]) * t;
    const cz = center[1] + (y - center[1]) * t;
    const xt = di * t;
    const cy =
      motion == "Free fall"
        ? (-1 / (2 * di)) * tan * xt * xt + ch
        : motion == "Straight"
        ? -(h / di) * xt + h
        : ((h - di * tan) / (di * di)) * xt * xt +
          (tan - (2 * h) / di) * xt +
          h;
    positions.push(new THREE.Vector3(cx, cy, cz));
  }
  return positions;
}
