import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import BloodProjectile from "./bloodprojectile";
import { BloodPropertiesType } from "../types/blood";
import { computeTrajectory } from "../functions/computetrajectory";
import { useEffect, useState } from "react";
import { SettingsType } from "../types/settings";
import BloodStraight from "./bloodstraight";
import * as THREE from "three";
import AOC from "./aoc";

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
      computeTrajectory(prop, center, settings.motion)
    );
    setTrajectories(newTrajectories);
  }, [bloodProperties, center, settings]);

  const createAxisLine = (
    start: THREE.Vector3,
    end: THREE.Vector3,
    color: string
  ): THREE.Line => {
    const material = new THREE.LineBasicMaterial({ color });
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    return new THREE.Line(geometry, material);
  };

  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[-5, 5, 5]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, -3]} />
      <gridHelper args={[settings.planeSize, settings.planeSize]} />
      <primitive
        object={createAxisLine(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(settings.planeSize / 2, 0, 0),
          "blue"
        )}
      />
      <primitive
        object={createAxisLine(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, 0, -settings.planeSize / 2),
          "green"
        )}
      />
      <Text
        position={[settings.planeSize / 2 + 0.5, 0, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        X
      </Text>
      <Text
        position={[0, 0, -settings.planeSize / 2 - 0.5]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Y
      </Text>
      <Text
        position={[0, -0.3, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        (0, 0)
      </Text>
      {settings.showTrajectory &&
        trajectories.map((points, index) => (
          <BloodProjectile key={index} time={time} points={points} />
        ))}
      {settings.showSP &&
        bloodProperties.map(
          (prop) =>
            prop.x &&
            prop.y &&
            prop.userrot && (
              <BloodStraight
                planeSize={settings.planeSize}
                bloodPropertie={prop}
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
      <OrbitControls />
    </Canvas>
  );
}
