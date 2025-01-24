import * as THREE from "three";

export function computeTrajectory(endpos: [number, number]): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  const v0 = 5; // Initial velocity
  const g = 9.81; // Gravity

  for (let i = 0; i <= 1000; i++) {
    const t = i / 1000;
    const x = endpos[0] * t;
    const z = endpos[1] * t;
    let y = v0 * t - 0.5 * g * t * t;
    y = Math.max(y, 0);
    positions.push(new THREE.Vector3(x, y, z));
  }

  return positions;
}
