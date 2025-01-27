import { INFINITY } from "three/tsl";
import { BloodPropertiesType } from "../types/blood";
import { computeEdge } from "./computeedge";

export function computeAOC(
  bloodProperties: BloodPropertiesType[],
  dimension: number[]
) {
  const checkAOC = ([h, k]: number[], r: number) => {
    let flag = true;
    bloodProperties.map((blood) => {
      const { x, y, userrot } = blood;
      const rad = (userrot * Math.PI) / 180;
      const [dx, dy] = [Math.cos(rad), Math.sin(rad)];
      const v = [h - x, k - y];
      const d_dot_d = dx * dx + dy * dy;
      const v_dot_d = v[0] * dx + v[1] * dy;
      const t_closest = v_dot_d / d_dot_d;
      const closestPoint = [x + t_closest * dx, y + t_closest * dy];
      const edge = computeEdge(dimension, [x, y], userrot);
      const checkPass =
        edge[0] <= closestPoint[0] &&
        closestPoint[0] <= x &&
        edge[1] <= closestPoint[1] &&
        closestPoint[1] <= y;
      const distanceSquared = checkPass
        ? (closestPoint[0] - h) * (closestPoint[0] - h) +
          (closestPoint[1] - k) * (closestPoint[1] - k)
        : 100000000000;
      flag = distanceSquared > r * r ? false : flag;
    });
    return flag;
  };

  let //rx = dimension[1] / 2,
    //ry = rx,
    r = dimension[0] / 2,
    resX = -INFINITY,
    resY = -INFINITY,
    resR = -INFINITY;

  while (r > 0) {
    let lx = -dimension[0] / 2;
    while (lx < dimension[0] / 2) {
      let ly = -dimension[1] / 2;
      while (ly < dimension[1] / 2) {
        if (checkAOC([lx, ly], r)) {
          resX = lx;
          resY = ly;
          resR = r;
        }
        ly++;
      }
      lx++;
    }
    r--;
  }

  return [resX, resY, resR];
}
