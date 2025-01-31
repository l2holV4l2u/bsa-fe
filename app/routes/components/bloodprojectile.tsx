import { useContext, useEffect, useRef } from "react";
import * as THREE from "three";
import { AppContext, CrimeSceneContext } from "../functions/context";

export default function BloodProjectile() {
  const { trajectories } = useContext(CrimeSceneContext);
  const { time } = useContext(AppContext);
  const lineRefs = useRef<(THREE.Line | null)[]>([]);

  useEffect(() => {
    trajectories.forEach((points, index) => {
      if (lineRefs.current[index]) {
        const trajIndex = Math.min(Math.floor(time), points.length - 1);
        const visiblePoints = points.slice(0, trajIndex + 1);
        const geometry = new THREE.BufferGeometry().setFromPoints(
          visiblePoints
        );
        lineRefs.current[index]!.geometry = geometry;
      }
    });
  }, [time, trajectories]);

  return (
    <>
      {trajectories.map((_, index) => (
        <line key={index} ref={(el) => (lineRefs.current[index] = el)}>
          <lineBasicMaterial color="#d68dd2" linewidth={0.5} />
        </line>
      ))}
    </>
  );
}
