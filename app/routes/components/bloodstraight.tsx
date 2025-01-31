import { useContext, useEffect, useRef } from "react";
import * as THREE from "three";
import { AppContext } from "../functions/context";

export default function BloodStraight() {
  const { bloodProperties, settings } = useContext(AppContext);
  const lineRefs = useRef<(THREE.Mesh | undefined)[]>([]);
  const directionRefs = useRef<(THREE.Vector3 | undefined)[]>([]);
  const rotatedDirectionRefs = useRef<(THREE.Vector3 | undefined)[]>([]);

  useEffect(() => {
    bloodProperties.forEach((prop, index) => {
      const edge = prop.edge;
      const angle = prop.AOI;
      directionRefs.current[index] = new THREE.Vector3()
        .subVectors(edge.end, edge.start)
        .normalize();
      const rotationAxis = directionRefs.current[index]!.clone()
        .cross(new THREE.Vector3(0, 1, 0))
        .normalize();
      rotatedDirectionRefs.current[index] = new THREE.Vector3()
        .copy(directionRefs.current[index]!)
        .applyAxisAngle(rotationAxis, (angle * Math.PI) / 180);
    });
  }, [bloodProperties, settings]);

  return (
    <>
      {bloodProperties.map((prop, index) => {
        const edge = prop.edge;
        const lineThickness = 0.001 * settings.planeSize;
        const geometry = new THREE.TubeGeometry(
          new THREE.LineCurve3(edge.start, edge.end),
          20,
          lineThickness,
          8,
          false
        );
        const arrowSize = lineThickness * 8;
        return (
          <group key={index}>
            <mesh
              ref={(el) => (lineRefs.current[index] = el)}
              geometry={geometry}
            >
              <meshBasicMaterial color="red" />
            </mesh>
            <arrowHelper
              args={[
                directionRefs.current[index],
                edge.end,
                0.05,
                "red",
                arrowSize,
                arrowSize,
              ]}
            />
          </group>
        );
      })}
    </>
  );
}
