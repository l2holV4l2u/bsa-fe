import { useContext, useEffect, useRef } from "react";
import * as THREE from "three";
import { AppContext } from "../functions/context";

export default function BloodStraight() {
  const { bloodProperties, settings } = useContext(AppContext);
  const lineRefs = useRef<(THREE.Line | undefined)[]>([]);
  const angleRefs = useRef<(THREE.ArrowHelper | undefined)[]>([]);
  const directionRefs = useRef<(THREE.Vector3 | undefined)[]>([]);
  const rotatedDirectionRefs = useRef<(THREE.Vector3 | undefined)[]>([]);

  useEffect(() => {
    bloodProperties.forEach((prop, index) => {
      const edge = prop.edge;
      const angle = prop.AOI;
      directionRefs.current[index] = new THREE.Vector3()
        .subVectors(edge.end, edge.start)
        .normalize();
      if (lineRefs.current[index]) {
        lineRefs.current[index]!.geometry =
          new THREE.BufferGeometry().setFromPoints([edge.start, edge.end]);
      }
      const rotationAxis = directionRefs.current[index]!.clone()
        .cross(new THREE.Vector3(0, 1, 0))
        .normalize();
      rotatedDirectionRefs.current[index] = new THREE.Vector3()
        .copy(directionRefs.current[index]!)
        .applyAxisAngle(rotationAxis, (angle * Math.PI) / 180);
      if (angleRefs.current[index]) {
        angleRefs.current[index]!.setDirection(
          rotatedDirectionRefs.current[index]!
        );
      }
    });
  }, [bloodProperties, settings.planeSize]);

  return (
    <>
      {bloodProperties.map((prop, index) => {
        const edge = prop.edge;
        return (
          <group key={index}>
            <line ref={(el) => (lineRefs.current[index] = el)}>
              <lineBasicMaterial color="red" />
              <bufferGeometry />
            </line>
            <arrowHelper
              args={[
                directionRefs.current[index],
                edge.end,
                0.01,
                "red",
                0.1,
                0.1,
              ]}
            />
            <arrowHelper
              ref={(el) => (angleRefs.current[index] = el)}
              args={[
                rotatedDirectionRefs.current[index],
                edge.start,
                0.5,
                0xe1e97b,
                0.1,
                0.1,
              ]}
            />
          </group>
        );
      })}
    </>
  );
}
