import { useState } from "react";
import Crimescene from "./components/crimescene";
import Selector from "./components/selector";
import TimeSlider from "./components/timeslider";
import BloodContainer from "./components/bloodcontainer";
import BloodProperties from "./components/bloodproperties";
import { BloodPropertiesType } from "./types/blood";

export default function Index() {
  const [time, setTime] = useState(0);
  const [focusBlood, setFocusBlood] = useState<number>(-1);
  const [bloodProperties, setBloodProperties] = useState<BloodPropertiesType[]>(
    []
  );
  const BloodContainerProps = {
    setFocusBlood,
    bloodProperties,
    setBloodProperties,
  };

  return (
    <div className="w-full max-h-screen h-screen flex flex-col items-center justify-center p-6">
      <div className="w-[95%]  h-full gap-6 flex flex-col items-center justify-center">
        <div className="w-full flex rounded-lg justify-between border-2 border-border">
          <Selector title="Velocity" choices={["Medium", "High"]} />
          <Selector title="Blood Motion" choices={["Straight", "Projectile"]} />
          <Selector
            title="AOI Material"
            choices={["Cardboard", "Glass", "Wood", "Smooth Tile", "Matt Tile"]}
          />
        </div>
        <div className="w-full h-[64vh] grid grid-cols-10 gap-6">
          <div className="col-span-3 h-full overflow-y-auto">
            <BloodContainer {...BloodContainerProps} />
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
                setFocusBlood={setFocusBlood}
              />
            ) : (
              <Crimescene time={time} bloodProperties={bloodProperties} />
            )}
          </div>
        </div>
        {focusBlood == -1 && <TimeSlider time={time} setTime={setTime} />}
      </div>
    </div>
  );
}
