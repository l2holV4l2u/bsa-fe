import { useState } from "react";
import Crimescene from "./components/crimescene";
import TimeSlider from "./components/timeslider";
import BloodContainer from "./components/bloodcontainer";
import BloodProperties from "./components/bloodproperties";
import { BloodPropertiesType } from "./types/blood";
import Settings from "./components/settings";

export default function Index() {
  const [time, setTime] = useState(0);
  const [focusBlood, setFocusBlood] = useState<number>(-1);
  const [bloodProperties, setBloodProperties] = useState<BloodPropertiesType[]>(
    []
  );
  const [settings, setSettings] = useState({
    showTrajectory: true,
    showSP: true,
    showAOC: true,
    velocity: "Medium",
    motion: "Projectile",
    material: "Paper",
    planeSize: 20,
  });

  return (
    <div className="w-full max-h-screen h-screen flex flex-col items-center justify-center p-6">
      <div className="w-[95%]  h-full gap-4 flex flex-col items-center justify-center">
        <Settings settings={settings} setSettings={setSettings} />
        <div className="w-full h-[64vh] grid grid-cols-10 gap-6">
          <div className="col-span-3 h-full overflow-y-auto">
            <BloodContainer
              setFocusBlood={setFocusBlood}
              bloodProperties={bloodProperties}
              setBloodProperties={setBloodProperties}
            />
          </div>
          <div className="col-span-7 border-2 border-border rounded-lg">
            {focusBlood != -1 ? (
              <BloodProperties
                bloodPropertie={bloodProperties[focusBlood]}
                material={settings.material}
                focusBlood={focusBlood}
                setBloodPropertie={(val: BloodPropertiesType) => {
                  setBloodProperties((prevProperties) => {
                    const updatedProperties = [...prevProperties];
                    updatedProperties[focusBlood] = val;
                    return updatedProperties;
                  });
                }}
                setFocusBlood={setFocusBlood}
              />
            ) : (
              <Crimescene
                time={time}
                bloodProperties={bloodProperties}
                settings={settings}
              />
            )}
          </div>
        </div>
        {focusBlood == -1 && <TimeSlider time={time} setTime={setTime} />}
      </div>
    </div>
  );
}
