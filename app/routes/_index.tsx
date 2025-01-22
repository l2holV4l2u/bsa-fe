import { useState } from "react";
import Crimescene from "./components/crimescene";
import Selector from "./components/selector";
import TimeSlider from "./components/timeslider";
import BloodContainer from "./components/bloodcontainer";
import BloodProperties from "./components/bloodproperties";

export default function Index() {
  const [time, setTime] = useState(0);
  const timeProps = { time, setTime };
  const [focusBlood, setFocusBlood] = useState<number | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [bloodProperties, setBloodProperties] = useState<any[]>([]);
  const BloodContainerProps = {
    files,
    setFiles,
    setFocusBlood,
    bloodProperties,
    setBloodProperties,
  };
  const BloodPropertiesProps = {
    file: files[focusBlood ? focusBlood : 0],
    focusBlood,
    bloodProperties,
    setBloodProperties,
    setFocusBlood,
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-6">
      <div className="w-[90%]  h-full gap-6 flex flex-col items-center justify-center">
        <div className="w-full flex rounded-lg justify-between border-2 border-border">
          <Selector title="Velocity" choices={["Medium", "High"]} />
          <Selector title="Blood Motion" choices={["Straight", "Projectile"]} />
          <Selector
            title="AOI Material"
            choices={["Cardboard", "Glass", "Wood", "Smooth Tile", "Matt Tile"]}
          />
        </div>
        <div className="w-full h-full grid grid-cols-10 gap-6">
          <div className="col-span-3 h-full">
            <BloodContainer {...BloodContainerProps} />
          </div>
          <div className="col-span-7 border-2 border-border rounded-lg">
            {focusBlood != null ? (
              <BloodProperties {...BloodPropertiesProps} />
            ) : (
              <Crimescene {...timeProps} />
            )}
          </div>
        </div>
        {focusBlood == null && <TimeSlider {...timeProps} />}
      </div>
    </div>
  );
}
