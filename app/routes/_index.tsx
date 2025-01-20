import { useState } from "react";
import Crimescene from "./components/crimescene";
import Selector from "./components/selector";
import TimeSlider from "./components/timeslider";

export default function Index() {
  const [time, setTime] = useState(0);
  const timeProps = { time, setTime };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-[75%] h-full gap-6 flex flex-col items-center justify-center">
        <div className="w-full flex rounded-lg justify-between p-4 border-2 border-border">
          <Selector title="Velocity" choices={["Medium", "High"]} />
          <Selector title="Blood Motion" choices={["Straight", "Projectile"]} />
          <Selector
            title="AOI Material"
            choices={["Cardboard", "Glass", "Wood", "Smooth Tile", "Matt Tile"]}
          />
        </div>
        <div className="w-full grid grid-cols-4 h-[50%] gap-6">
          <div className="rounded-lg col-span-1 w-full p-4 border-2 border-border text-gray-200">
            Blank
          </div>
          <div className="col-span-3 border-2 border-border rounded-lg">
            <Crimescene {...timeProps} />
          </div>
        </div>
        <TimeSlider {...timeProps} />
      </div>
    </div>
  );
}
