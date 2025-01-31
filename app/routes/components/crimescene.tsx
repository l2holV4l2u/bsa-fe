import { Canvas } from "@react-three/fiber";
import BloodProjectile from "./bloodprojectile";
import { BloodPropertiesType } from "../types/blood";
import { computeTrajectory } from "../functions/computetrajectory";
import { useEffect, useState } from "react";
import { SettingsType } from "../types/settings";
import BloodStraight from "./bloodstraight";
import AOC from "./aoc";
import Axis from "./axis";
import Scene from "./scene";
import BloodPoint from "./bloodpoint";

export default function Crimescene({
  time,
  bloodProperties,
  settings,
}: {
  time: number;
  bloodProperties: BloodPropertiesType[];
  settings: SettingsType;
}) {
  const [trajectories, setTrajectories] = useState<any[]>([]);
  const [center, setCenter] = useState([0, 0]);

  useEffect(() => {
    const newTrajectories = bloodProperties.map((prop) =>
      computeTrajectory(prop, settings.height, center, settings.motion)
    );
    setTrajectories(newTrajectories);
  }, [bloodProperties, center, settings]);

  return (
    <Canvas>
      <Scene settings={settings} />
      <Axis settings={settings} />
      {settings.showTrajectory &&
        trajectories.map((points, index) => (
          <BloodProjectile key={index} time={time} points={points} />
        ))}
      {bloodProperties.map(
        (prop, index) =>
          prop.x &&
          prop.y &&
          prop.userrot && (
            <BloodPoint
              planeSize={settings.planeSize}
              edge={prop.edge}
              angle={prop.AOI}
              index={index}
            />
          )
      )}
      {settings.showSP &&
        bloodProperties.map(
          (prop) =>
            prop.x &&
            prop.y &&
            prop.userrot && (
              <BloodStraight
                planeSize={settings.planeSize}
                edge={prop.edge}
                angle={prop.AOI}
              />
            )
        )}
      {settings.showAOC && (
        <AOC
          bloodProperties={bloodProperties}
          planeSize={settings.planeSize}
          center={center}
          setCenter={setCenter}
        />
      )}
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
  );
}
