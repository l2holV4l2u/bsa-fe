export function computeEdge(
  dimension: number[],
  origin: number[],
  angle: number
) {
  const [width, height] = dimension;
  const [x0, y0] = origin;
  const cosTheta = Math.cos((angle * Math.PI) / 180);
  const sinTheta = Math.sin((angle * Math.PI) / 180);
  const edge = [
    (width / 2) * (x0 >= 0 ? -1 : 1),
    (height / 2) * (y0 >= 0 ? -1 : 1),
  ];
  const tX = cosTheta !== 0 ? (edge[0] - x0) / cosTheta : Infinity,
    tY = sinTheta !== 0 ? (edge[1] - y0) / sinTheta : Infinity;
  const t = Math.abs(tX) > Math.abs(tY) ? tY : tX;
  const end = [x0 + t * cosTheta, y0 + t * sinTheta];
  return end;
}
