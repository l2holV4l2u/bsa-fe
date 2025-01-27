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

  useEffect(() => {
    setSettings({
      showTrajectory,
      showSP,
      showAOC,
      velocity,
      motion,
      material,
    });
  }, [showTrajectory, showSP, showAOC, velocity, motion, material]);

  return (
    <div className="w-full flex rounded-lg justify-between items-center border-2 border-border">
      <Selector
        title="Velocity"
        choices={["Medium", "High"]}
        selectedChoice={velocity}
        setSelectedChoice={setVelocity}
      />
      <Selector
        title="Blood Motion"
        choices={["Straight", "Projectile"]}
        selectedChoice={motion}
        setSelectedChoice={setMotion}
      />
      <Selector
        title="AOI Material"
        choices={["Cardboard", "Glass", "Wood", "Smooth Tile", "Matt Tile"]}
        selectedChoice={material}
        setSelectedChoice={setMaterial}
      />
      <div className="grid grid-cols-2 gap-2 p-4">
        <Tickbox
          title="Show Trajectories"
          data={showTrajectory}
          setData={setShowTrajectory}
        />
        <Tickbox title="Show AOC" data={showAOC} setData={setShowAOC} />
        <Tickbox title="Show Straight Path" data={showSP} setData={setShowSP} />
      </div>
    </div>
  );
}
