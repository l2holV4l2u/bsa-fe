import BloodContainer from "./components/bloodcontainer";
import BloodProperties from "./components/bloodproperties";
import { BloodPropertiesType } from "./types/blood";
import Crimescene from "./components/crimescene";
import TimeSlider from "./components/timeslider";
import { AppContext } from "./functions/context";
import Settings from "./components/settings";
import { useState } from "react";

export default function Index() {
  const [settings, setSettings] = useState({
    showTrajectory: true,
    showSP: true,
    showAOC: true,
    motion: "Projectile",
    material: "Paper",
    planeSize: 20,
  });
  const [time, setTime] = useState(0);
  const [focusBlood, setFocusBlood] = useState<number>(-1);
  const [bloodHeight, setBloodHeight] = useState<number[]>([]);
  const [bloodProperties, setBloodProperties] = useState<BloodPropertiesType[]>(
    []
  );

  return (
    <AppContext.Provider
      value={{
        settings,
        setSettings,
        time,
        setTime,
        focusBlood,
        setFocusBlood,
        bloodProperties,
        setBloodProperties,
        bloodHeight,
        setBloodHeight,
      }}
    >
      <div className="w-full h-fit md:h-screen flex flex-col items-center justify-center p-4 md:p-6">
        <div className="w-full h-full gap-4 flex flex-col items-center justify-center">
          <Settings />
          <div className="w-full h-fit md:h-[64vh] flex flex-col md:grid md:grid-cols-10 gap-4 md:gap-6">
            <div className="col-span-3 h-fit md:h-full overflow-y-auto">
              <BloodContainer />
            </div>
            <div className="col-span-7 border-2 border-border rounded-lg h-screen md:h-full">
              {focusBlood != -1 ? (
                <BloodProperties bloodPropertie={bloodProperties[focusBlood]} />
              ) : (
                <Crimescene />
              )}
            </div>
          </div>
          {focusBlood == -1 && <TimeSlider />}
        </div>
      </div>
    </AppContext.Provider>
  );
}
