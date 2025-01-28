import { Dispatch, SetStateAction } from "react";

export default function Input({
  label,
  data,
  setData,
}: {
  label: string;
  data: string;
  setData: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex gap-2">
      <div className="w-4">{label}:</div>
      <input
        type="number"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="bg-transparent w-full"
      />
    </div>
  );
}
