import * as THREE from "three";

export type BloodPropertiesType = {
  file: File;
  processedFile: File;
  x: number;
  y: number;
  rotation: number;
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
  F: string;
  semimajor: number;
  semiminor: number;
  theta: number;
  AOI: number;
  edge: THREE.Line3;
  height: number;
};
