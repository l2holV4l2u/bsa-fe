import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useContext } from "react";
import { AppContext } from "../functions/context";

export default function Axis() {
  const { settings } = useContext(AppContext);
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
    <>
      <primitive
        object={createAxisLine(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, settings.planeSize, 0),
          "red"
        )}
      />
      <primitive
        object={createAxisLine(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, 0, -settings.planeSize),
          "green"
        )}
      />
      <primitive
        object={createAxisLine(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(settings.planeSize, 0, 0),
          "blue"
        )}
      />
      <Text
        position={[settings.planeSize + 0.5, 0, 0]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        X
      </Text>
      <Text
        position={[0, 0, -settings.planeSize - 0.5]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Y
      </Text>
      <Text
        position={[0, settings.planeSize + 0.5, 0]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Z
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
    </>
  );
}
