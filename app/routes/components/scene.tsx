import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useContext } from "react";
import { AppContext } from "../functions/context";

export default function Scene() {
  const { settings } = useContext(AppContext);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[
          settings.planeSize + settings.planeSize / 4,
          settings.planeSize / 2,
          -settings.planeSize - settings.planeSize / 4,
        ]}
        fov={50}
      />
      <OrbitControls
        target={[settings.planeSize / 2, 0, -settings.planeSize / 2]}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, -3]} />
      {/* Floor */}
      <gridHelper
        args={[settings.planeSize, 10]}
        position={[settings.planeSize / 2, 0, -settings.planeSize / 2]}
      />
      {/* Back Wall */}
      <gridHelper
        args={[settings.planeSize, 10]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[settings.planeSize / 2, settings.planeSize / 2, 0]}
      />
      {/* Right Wall */}
      <gridHelper
        args={[settings.planeSize, 10]}
        rotation={[0, 0, Math.PI / 2]}
        position={[0, settings.planeSize / 2, -settings.planeSize / 2]}
      />
    </>
  );
}
