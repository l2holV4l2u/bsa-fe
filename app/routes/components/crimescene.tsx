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

  useEffect(() => {
    setTrajectories(
      bloodProperties.map((prop) =>
        computeTrajectory(prop, settings.height, center, settings.motion)
      )
    );
  }, [bloodProperties, center, settings]);

  return (
    <CrimeSceneContext.Provider
      value={{ trajectories, setTrajectories, center, setCenter }}
    >
      <Canvas>
        <Scene />
        <Axis />
        <BloodPoint />
        {settings.showTrajectory && <BloodProjectile />}
        {settings.showSP && <BloodStraight />}
        {settings.showAOC && <AOC />}
        {bloodProperties.length != 0 && (
          <mesh position={[center[0], settings.height / 2, center[1]]}>
            <cylinderGeometry args={[0.1, 0.1, settings.height, 16]} />
            <meshBasicMaterial color="white" opacity={0.8} transparent />
          </mesh>
        )}
        {trajectories.map((points, index) =>
          points.length > 0 ? (
            <mesh
              key={index}
              position={[center[0], points[0].y, center[1]]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <torusGeometry args={[0.1, 0.02, 16, 32]} />
              <meshBasicMaterial color="red" />
            </mesh>
          ) : null
        )}
      </Canvas>
    </CrimeSceneContext.Provider>
  );
}
