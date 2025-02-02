import React, { Dispatch, useState } from "react";

export default function Selector({
  title,
  choices,
  selectedChoice,
  setSelectedChoice,
}: {
  title: string;
  choices: string[];
  selectedChoice: string;
  setSelectedChoice: Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col">
      <div className="text-gray-200 font-bold">{title}</div>
      <div className="mt-2">
        <select
          value={selectedChoice || ""}
          onChange={(e) => setSelectedChoice(e.target.value)}
          className="w-32 p-2 border rounded-md bg-black text-white"
        >
          {choices.map((choice) => (
            <option key={choice} value={choice}>
              {choice}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
