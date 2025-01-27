import { ChangeEvent } from "react";
import { FaCheck } from "react-icons/fa";

export default function Tickbox({
  title,
  data,
  setData,
}: {
  title: string;
  data: boolean;
  setData: (value: boolean) => void;
}) {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(event.target.checked);
  };

  return (
    <div className="relative">
      <label className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={data}
          onChange={handleCheckboxChange}
          className="peer hidden"
        />
        <div className="w-5 h-5 border-2 border-white rounded-md flex justify-center items-center relative peer-checked:bg-white checked:fill-black" />
        <FaCheck
          className="text-white absolute left-1"
          size={12}
          color="black"
        />
        {title}
      </label>
    </div>
  );
}
