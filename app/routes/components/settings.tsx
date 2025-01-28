import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Selector from "./selector";
import Tickbox from "./tickbox";
import { SettingsType } from "../types/settings";

export default function Settings({
  settings,
  setSettings,
}: {
  settings: SettingsType;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
}) {
  const [showTrajectory, setShowTrajectory] = useState(settings.showTrajectory);
  const [showSP, setShowSP] = useState(settings.showSP);
  const [showAOC, setShowAOC] = useState(settings.showAOC);
  const [velocity, setVelocity] = useState(settings.velocity);
  const [motion, setMotion] = useState(settings.motion);
  const [material, setMaterial] = useState(settings.material);
  const [planeSize, setPlaneSize] = useState("20");

  useEffect(() => {
    setSettings({
      showTrajectory,
      showSP,
      showAOC,
      velocity,
      motion,
      material,
      planeSize: Number(planeSize),
    });
  }, [showTrajectory, showSP, showAOC, velocity, motion, material, planeSize]);

  return (
    <div className="w-full flex rounded-lg justify-between items-center border-2 border-border p-4">
      <Selector
        title="Velocity"
        choices={["Medium", "High"]}
        selectedChoice={velocity}
        setSelectedChoice={setVelocity}
      />
      <Selector
        title="Blood Motion"
        choices={["Projectile", "Free fall"]}
        selectedChoice={motion}
        setSelectedChoice={setMotion}
      />
      <Selector
        title="AOI Material"
        choices={["Paper", "Glass", "Wood", "Smooth Tile", "Rough Tile"]}
        selectedChoice={material}
        setSelectedChoice={setMaterial}
      />
      <div className="flex flex-col">
        <div className="text-gray-200 font-bold">Plane Size</div>
        <div className="mt-2">
          <input
            value={planeSize}
            onChange={(e) => setPlaneSize(e.target.value)}
            className="w-32 p-2 border rounded-md"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Tickbox
          title="Show Blood Motion"
          data={showTrajectory}
          setData={setShowTrajectory}
        />
        <Tickbox title="Show Blood Path" data={showSP} setData={setShowSP} />
        <Tickbox title="Show AOC" data={showAOC} setData={setShowAOC} />
      </div>
    </div>
  );
}
