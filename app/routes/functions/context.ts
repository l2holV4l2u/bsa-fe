import { createContext, Dispatch, SetStateAction } from "react";
import { SettingsType } from "../types/settings";
import { BloodPropertiesType } from "../types/blood";
import * as THREE from "three";

const defaultSettings: SettingsType = {
  showTrajectory: true,
  showSP: true,
  showAOC: true,
  motion: "Projectile",
  material: "Paper",
  planeSize: 20,
  height: 1.8,
};

export const AppContext = createContext<{
  settings: SettingsType;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  focusBlood: number;
  setFocusBlood: Dispatch<SetStateAction<number>>;
  bloodProperties: BloodPropertiesType[];
  setBloodProperties: Dispatch<SetStateAction<BloodPropertiesType[]>>;
}>({
  settings: defaultSettings,
  setSettings: () => {},
  time: 0,
  setTime: () => {},
  focusBlood: 0,
  setFocusBlood: () => {},
  bloodProperties: [],
  setBloodProperties: () => {},
});

export const CrimeSceneContext = createContext<{
  trajectories: THREE.Vector3[][];
  setTrajectories: Dispatch<SetStateAction<THREE.Vector3[][]>>;
  center: number[];
  setCenter: Dispatch<SetStateAction<number[]>>;
  vicHeight: number;
}>({
  trajectories: [],
  setTrajectories: () => {},
  center: [0, 0],
  setCenter: () => {},
  vicHeight: 0,
});
