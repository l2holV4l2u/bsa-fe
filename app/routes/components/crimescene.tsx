import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import BloodProjectile from "./bloodprojectile";
import { BloodPropertiesType } from "../types/blood";
import { computeTrajectory } from "./computetrajectory";
import { useEffect, useState } from "react";
import { SettingsType } from "../types/settings";
import BloodStraight from "./bloodstraight";
import { computeEdge } from "./computeedge";

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
  const [dimension, setDimension] = useState([20, 20]);

  useEffect(() => {
    const newTrajectories = bloodProperties.map((prop) =>
      computeTrajectory([prop.x, prop.y])
    );
    setTrajectories(newTrajectories);
  }, [bloodProperties]);

  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[5, 5, 5]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} />
      <gridHelper args={[dimension[0], dimension[1]]} />
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
        bloodProperties.map((prop) => (
          <BloodStraight
            time={time}
            ori={[prop.x, prop.y]}
            end={computeEdge(dimension, [prop.x, prop.y], prop.userrot)}
          />
        ))}
      {/*settings.showAOC &&
        
      */}
      <OrbitControls />
    </Canvas>
  );
}
