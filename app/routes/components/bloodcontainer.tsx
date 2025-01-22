import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BloodDrop from "./blooddrop";
import { HiOutlinePlus } from "react-icons/hi";
import { BloodPropertiesType } from "../types/blood";

export default function BloodContainer({
  files,
  setFiles,
  setFocusBlood,
  bloodProperties,
  setBloodProperties,
}: {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  setFocusBlood: Dispatch<SetStateAction<number | null>>;
  bloodProperties: BloodPropertiesType[];
  setBloodProperties: Dispatch<any>;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setBloodProperties((prev) => [...prev, { x: 0, y: 0 }]); // Add an empty object to the blood properties list
      setFiles([...files, uploadedFile]); // Add the uploaded file to the list
    }
  };

  return (
    <div className="rounded-lg col-span-1 w-full h-full p-4 border-2 border-border text-gray-200">
      {/* Add File Button */}
      <div className="mb-4 w-full">
        <label
          htmlFor="file-upload"
          className="flex items-center gap-2 p-2 text-sm bg-gray-800 text-gray-200 rounded-md cursor-pointer hover:bg-gray-700"
        >
          <HiOutlinePlus scale={24} />
          Add blood drop
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <div className="flex flex-cols gap-2">
        {files.map((file, index) => (
          <button
            onClick={() => setFocusBlood(index)}
            className="border-2 border-border rounded-lg w-full flex items-start justify-start gap-2"
          >
            <BloodDrop file={file} bloodPropertie={bloodProperties[index]} />
          </button>
        ))}
      </div>
    </div>
  );
}
