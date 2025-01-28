import * as THREE from "three";

export function computeTrajectory(endpos: [number, number]): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  const v0 = 4;
  const g = 9.81;

  for (let i = 0; i <= 1000; i++) {
    const t = i / 1000;
    const x = endpos[0] * t;
    const z = endpos[1] * t;
    let y = v0 * t - 0.5 * g * t * t;
    if (y < 0) {
      positions.push(new THREE.Vector3(x, 0, z));
      break;
    }
    positions.push(new THREE.Vector3(x, y, z));
  }

  return positions;
}
