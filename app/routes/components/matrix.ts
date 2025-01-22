export function m2x2(matrix: number[][]): number {
  return matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1];
}

export function m3x3(matrix: number[][]): number {
  const one =
    matrix[0][0] *
    m2x2([
      [matrix[1][1], matrix[1][2]],
      [matrix[2][1], matrix[2][2]],
    ]);
  const two =
    -matrix[0][1] *
    m2x2([
      [matrix[1][0], matrix[1][2]],
      [matrix[2][0], matrix[2][2]],
    ]);
  const three =
    matrix[0][2] *
    m2x2([
      [matrix[1][0], matrix[1][1]],
      [matrix[2][0], matrix[2][1]],
    ]);
  return one + two + three;
}

export function m4x4(matrix: number[][]): number {
  const one =
    matrix[0][0] *
    m3x3([
      [matrix[1][1], matrix[1][2], matrix[1][3]],
      [matrix[2][1], matrix[2][2], matrix[2][3]],
      [matrix[3][1], matrix[3][2], matrix[3][3]],
    ]);
  const two =
    -matrix[0][1] *
    m3x3([
      [matrix[1][0], matrix[1][2], matrix[1][3]],
      [matrix[2][0], matrix[2][2], matrix[2][3]],
      [matrix[3][0], matrix[3][2], matrix[3][3]],
    ]);
  const three =
    matrix[0][2] *
    m3x3([
      [matrix[1][0], matrix[1][1], matrix[1][3]],
      [matrix[2][0], matrix[2][1], matrix[2][3]],
      [matrix[3][0], matrix[3][1], matrix[3][3]],
    ]);
  const four =
    -matrix[0][3] *
    m3x3([
      [matrix[1][0], matrix[1][1], matrix[1][2]],
      [matrix[2][0], matrix[2][1], matrix[2][2]],
      [matrix[3][0], matrix[3][1], matrix[3][2]],
    ]);
  return one + two + three + four;
}

export function m5x5(matrix: number[][]): number {
  const one =
    matrix[0][0] *
    m4x4([
      [matrix[1][1], matrix[1][2], matrix[1][3], matrix[1][4]],
      [matrix[2][1], matrix[2][2], matrix[2][3], matrix[2][4]],
      [matrix[3][1], matrix[3][2], matrix[3][3], matrix[3][4]],
      [matrix[4][1], matrix[4][2], matrix[4][3], matrix[4][4]],
    ]);
  const two =
    -matrix[0][1] *
    m4x4([
      [matrix[1][0], matrix[1][2], matrix[1][3], matrix[1][4]],
      [matrix[2][0], matrix[2][2], matrix[2][3], matrix[2][4]],
      [matrix[3][0], matrix[3][2], matrix[3][3], matrix[3][4]],
      [matrix[4][0], matrix[4][2], matrix[4][3], matrix[4][4]],
    ]);
  const three =
    matrix[0][2] *
    m4x4([
      [matrix[1][0], matrix[1][1], matrix[1][3], matrix[1][4]],
      [matrix[2][0], matrix[2][1], matrix[2][3], matrix[2][4]],
      [matrix[3][0], matrix[3][1], matrix[3][3], matrix[3][4]],
      [matrix[4][0], matrix[4][1], matrix[4][3], matrix[4][4]],
    ]);
  const four =
    -matrix[0][3] *
    m4x4([
      [matrix[1][0], matrix[1][1], matrix[1][2], matrix[1][4]],
      [matrix[2][0], matrix[2][1], matrix[2][2], matrix[2][4]],
      [matrix[3][0], matrix[3][1], matrix[3][2], matrix[3][4]],
      [matrix[4][0], matrix[4][1], matrix[4][2], matrix[4][4]],
    ]);
  const five =
    matrix[0][4] *
    m4x4([
      [matrix[1][0], matrix[1][1], matrix[1][2], matrix[1][3]],
      [matrix[2][0], matrix[2][1], matrix[2][2], matrix[2][3]],
      [matrix[3][0], matrix[3][1], matrix[3][2], matrix[3][3]],
      [matrix[4][0], matrix[4][1], matrix[4][2], matrix[4][3]],
    ]);
  return one + two + three + four + five;
}

export function m6x6(
  matrix: number[][]
): [number, number, number, number, number, number] {
  const one =
    matrix[0][0] *
    m5x5([
      [matrix[1][1], matrix[1][2], matrix[1][3], matrix[1][4], matrix[1][5]],
      [matrix[2][1], matrix[2][2], matrix[2][3], matrix[2][4], matrix[2][5]],
      [matrix[3][1], matrix[3][2], matrix[3][3], matrix[3][4], matrix[3][5]],
      [matrix[4][1], matrix[4][2], matrix[4][3], matrix[4][4], matrix[4][5]],
      [matrix[5][1], matrix[5][2], matrix[5][3], matrix[5][4], matrix[5][5]],
    ]);

  const two =
    -matrix[0][1] *
    m5x5([
      [matrix[1][0], matrix[1][2], matrix[1][3], matrix[1][4], matrix[1][5]],
      [matrix[2][0], matrix[2][2], matrix[2][3], matrix[2][4], matrix[2][5]],
      [matrix[3][0], matrix[3][2], matrix[3][3], matrix[3][4], matrix[3][5]],
      [matrix[4][0], matrix[4][2], matrix[4][3], matrix[4][4], matrix[4][5]],
      [matrix[5][0], matrix[5][2], matrix[5][3], matrix[5][4], matrix[5][5]],
    ]);

  const three =
    matrix[0][2] *
    m5x5([
      [matrix[1][0], matrix[1][1], matrix[1][3], matrix[1][4], matrix[1][5]],
      [matrix[2][0], matrix[2][1], matrix[2][3], matrix[2][4], matrix[2][5]],
      [matrix[3][0], matrix[3][1], matrix[3][3], matrix[3][4], matrix[3][5]],
      [matrix[4][0], matrix[4][1], matrix[4][3], matrix[4][4], matrix[4][5]],
      [matrix[5][0], matrix[5][1], matrix[5][3], matrix[5][4], matrix[5][5]],
    ]);

  const four =
    -matrix[0][3] *
    m5x5([
      [matrix[1][0], matrix[1][1], matrix[1][2], matrix[1][4], matrix[1][5]],
      [matrix[2][0], matrix[2][1], matrix[2][2], matrix[2][4], matrix[2][5]],
      [matrix[3][0], matrix[3][1], matrix[3][2], matrix[3][4], matrix[3][5]],
      [matrix[4][0], matrix[4][1], matrix[4][2], matrix[4][4], matrix[4][5]],
      [matrix[5][0], matrix[5][1], matrix[5][2], matrix[5][4], matrix[5][5]],
    ]);

  const five =
    matrix[0][4] *
    m5x5([
      [matrix[1][0], matrix[1][1], matrix[1][2], matrix[1][3], matrix[1][5]],
      [matrix[2][0], matrix[2][1], matrix[2][2], matrix[2][3], matrix[2][5]],
      [matrix[3][0], matrix[3][1], matrix[3][2], matrix[3][3], matrix[3][5]],
      [matrix[4][0], matrix[4][1], matrix[4][2], matrix[4][3], matrix[4][5]],
      [matrix[5][0], matrix[5][1], matrix[5][2], matrix[5][3], matrix[5][5]],
    ]);

  const six =
    -matrix[0][5] *
    m5x5([
      [matrix[1][0], matrix[1][1], matrix[1][2], matrix[1][3], matrix[1][4]],
      [matrix[2][0], matrix[2][1], matrix[2][2], matrix[2][3], matrix[2][4]],
      [matrix[3][0], matrix[3][1], matrix[3][2], matrix[3][3], matrix[3][4]],
      [matrix[4][0], matrix[4][1], matrix[4][2], matrix[4][3], matrix[4][4]],
      [matrix[5][0], matrix[5][1], matrix[5][2], matrix[5][3], matrix[5][4]],
    ]);

  return [one, two, three, four, five, six];
}
