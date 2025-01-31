import { computeTrajectory } from "../functions/computetrajectory";
import { AppContext, CrimeSceneContext } from "../functions/context";
import { useContext, useEffect, useState } from "react";
import BloodProjectile from "./bloodprojectile";
import { Canvas } from "@react-three/fiber";
import BloodStraight from "./bloodstraight";
import BloodPoint from "./bloodpoint";
import AOC from "./aoc";
import Axis from "./axis";
import Scene from "./scene";

export default function Crimescene() {
  const { bloodProperties, settings } = useContext(AppContext);
  const [trajectories, setTrajectories] = useState<any[]>([]);
  const [center, setCenter] = useState([0, 0]);
  const [vicHeight, setVicHeight] = useState(0);
  const [impact, setImpact] = useState(0);
  const [bloodHeight, setBloodHeight] = useState<number[]>([]);

  useEffect(() => {
    let sumh = 0;
    let maxh = 0;
    let tempBloodHeight: number[] = [];
    bloodProperties.map((prop) => {
      let { x, y, AOI } = prop;
      const di = Math.sqrt((x - center[0]) ** 2 + (y - center[1]) ** 2);
      const tan = Math.tan((AOI * Math.PI) / 180);
      const temp =
        settings.motion == "Straight"
          ? di * tan
          : (di ** 2 * tan) / (3 * di - 1);
      sumh += temp;
      maxh = Math.max(maxh, temp);
      tempBloodHeight.push(temp);
    });
    setVicHeight(maxh);
    setImpact(sumh / bloodProperties.length);
    setBloodHeight(tempBloodHeight);
    setTrajectories(
      bloodProperties.map((prop) =>
        computeTrajectory(prop, center, settings.motion)
      )
    );
  }, [bloodProperties, center, settings, vicHeight]);

  return (
    <CrimeSceneContext.Provider
      value={{
        trajectories,
        setTrajectories,
        center,
        setCenter,
        vicHeight,
        impact,
      }}
    >
      <Canvas>
        <Scene />
        <Axis />
        <BloodPoint />
        {settings.showTrajectory && <BloodProjectile />}
        {settings.showSP && <BloodStraight />}
        {settings.showAOC && <AOC />}
        {bloodProperties.length != 0 && (
          <mesh position={[center[0], vicHeight / 2, center[1]]}>
            <cylinderGeometry
              args={[
                settings.planeSize / 100,
                settings.planeSize / 100,
                vicHeight,
                16,
              ]}
            />
            <meshBasicMaterial color="white" opacity={1} transparent />
          </mesh>
        )}
        {trajectories.map((points, index) =>
          points.length > 0 ? (
            <mesh
              key={index}
              position={[center[0], points[0].y, center[1]]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <torusGeometry args={[settings.planeSize / 100, 0.025, 16, 32]} />
              <meshBasicMaterial color="red" />
            </mesh>
          ) : null
        )}
        {impact && (
          <mesh
            position={[center[0], impact, center[1]]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[settings.planeSize / 100, 0.025, 16, 32]} />
            <meshBasicMaterial color="green" />
          </mesh>
        )}
      </Canvas>
    </CrimeSceneContext.Provider>
  );
}
