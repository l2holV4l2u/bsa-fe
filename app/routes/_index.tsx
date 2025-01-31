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
      }}
    >
      <div className="w-full max-h-screen h-screen flex flex-col items-center justify-center p-6">
        <div className="w-[95%] h-full gap-4 flex flex-col items-center justify-center">
          <Settings />
          <div className="w-full h-[64vh] grid grid-cols-10 gap-6">
            <div className="col-span-3 h-full overflow-y-auto">
              <BloodContainer />
            </div>
            <div className="col-span-7 border-2 border-border rounded-lg">
              {focusBlood != -1 ? (
                <BloodProperties
                  bloodPropertie={bloodProperties[focusBlood]}
                  setBloodPropertie={(val: BloodPropertiesType) => {
                    setBloodProperties((prevProperties) => {
                      const updatedProperties = [...prevProperties];
                      updatedProperties[focusBlood] = val;
                      return updatedProperties;
                    });
                  }}
                />
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
