import Crimescene from "./components/crimescene";
import Selector from "./components/selector";

export default function Index() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
      <div className="flex rounded-lg w-[75%] justify-between p-4 border-2 border-border">
        <Selector title="Velocity" choices={["Medium", "High"]} />
        <Selector title="Blood Motion" choices={["Straight", "Projectile"]} />
        <Selector
          title="AOI Material"
          choices={["Cardboard", "Glass", "Wood", "Smooth Tile", "Matt Tile"]}
        />
      </div>
      <div className="grid grid-cols-4 w-[75%] h-[50%] gap-6">
        <div className="rounded-lg col-span-1 w-full p-4 border-2 border-border text-gray-200">
          Blank
        </div>
        <div className="col-span-3 border-2 border-border rounded-lg">
          <Crimescene />
        </div>
      </div>
    </div>
  );
}
