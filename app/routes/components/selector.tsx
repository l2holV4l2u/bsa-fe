import React, { useState } from "react";

export default function Selector({
  title,
  choices,
}: {
  title: string;
  choices: string[];
}) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleChoiceSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChoice(event.target.value);
  };

  return (
    <div className="p-4">
      <div className="text-gray-200 font-bold">{title}</div>
      <div className="mt-2">
        <select
          value={selectedChoice || ""}
          onChange={handleChoiceSelect}
          className="w-full p-2 border rounded-md"
        >
          <option value="" disabled>
            Select an option
          </option>
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
