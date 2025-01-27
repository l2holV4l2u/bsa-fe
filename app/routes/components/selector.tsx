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
    <div className="p-4">
      <div className="text-gray-200 font-bold">{title}</div>
      <div className="mt-2">
        <select
          value={selectedChoice || ""}
          onChange={(e) => setSelectedChoice(e.target.value)}
          className="w-full p-2 border rounded-md"
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
