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
      setBloodProperties((prev) => [...prev, { x: 0, y: 0 }]);
      setFiles([...files, uploadedFile]);
    }
  };

  const handleAutofill = async () => {
    const sampleFilePaths = Array.from(
      { length: 10 },
      (_, i) => `/bloodsamples/blood${i + 1}.png`
    );
    const newFiles = await Promise.all(
      sampleFilePaths.map(async (filePath) => {
        const response = await fetch(filePath);

        if (!response.ok) {
          console.error(`Failed to fetch ${filePath}: ${response.statusText}`);
          return null;
        }

        const blob = await response.blob();
        const fileName = filePath.split("/").pop() || "unknown.png";

        return new File([blob], fileName, {
          type: blob.type,
          lastModified: Date.now(),
        });
      })
    );
    const validFiles = newFiles.filter((file) => file !== null);
    setFiles((prev) => [...prev, ...validFiles]);
    setBloodProperties((prev) => [
      ...prev,
      ...validFiles.map(() => ({ x: 0, y: 0 })),
    ]);
  };

  console.log(bloodProperties);

  return (
    <div className="rounded-lg overflow-y-auto flex flex-col gap-2 w-full h-full p-4 border-2 border-border text-gray-200">
      {/* Add File Button */}
      <div className="w-full grid grid-cols-2 gap-2">
        <div>
          <label
            htmlFor="file-upload"
            className="flex items-center gap-2 p-2 text-sm bg-gray-800 text-gray-200 rounded-md cursor-pointer hover:bg-gray-700"
          >
            <HiOutlinePlus scale={24} />
            Add blood
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <button
          onClick={handleAutofill}
          className="flex items-center gap-2 p-2 text-sm bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700"
        >
          <HiOutlinePlus scale={24} />
          Autofill
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {files.map((file, index) => (
          <div className="border-2 border-border rounded-lg w-full flex items-start justify-start gap-2">
            <BloodDrop
              file={file}
              bloodPropertie={bloodProperties[index]}
              setBloodProperties={setBloodProperties}
              setFocusBlood={setFocusBlood}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
