import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BloodDrop from "./blooddrop";
import { HiOutlinePlus } from "react-icons/hi";
import { BloodPropertiesType } from "../types/blood";

function getRandomInRange(min: number, max: number): number {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

export default function BloodContainer({
  bloodProperties,
  setFocusBlood,
  setBloodProperties,
}: {
  bloodProperties: BloodPropertiesType[];
  setFocusBlood: Dispatch<SetStateAction<number>>;
  setBloodProperties: Dispatch<SetStateAction<BloodPropertiesType[]>>;
}) {
  const [isDelete, setIsDelete] = useState(false);
  const defaultBlood = (
    uploadedFile: File,
    angle: number,
    x: number,
    y: number,
    userrot: number
  ) => ({
    x,
    y,
    file: uploadedFile,
    userrot,
    calrot: 0,
    A: "",
    B: "",
    C: "",
    D: "",
    E: "",
    F: "",
    semimajor: 0,
    semiminor: 0,
    theta: angle,
    AOI: angle,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setBloodProperties([
        ...bloodProperties,
        defaultBlood(uploadedFile, 0, 0, 0, 0),
      ]);
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
        const blob = await response.blob();
        const fileName = filePath.split("/").pop() || "unknown.png";
        return new File([blob], fileName, {
          type: blob.type,
          lastModified: Date.now(),
        });
      })
    );
    const validFiles = newFiles.filter((file) => file !== null);
    setBloodProperties([
      ...bloodProperties,
      ...validFiles.map((validFile) =>
        defaultBlood(
          validFile,
          30,
          getRandomInRange(-5, 5),
          getRandomInRange(-5, 5),
          getRandomInRange(0, 45)
        )
      ),
    ]);
  };

  return (
    <div className="rounded-lg overflow-y-auto flex flex-col gap-2 w-full h-full p-4 border-2 border-border text-gray-200">
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
        {bloodProperties.map((obj, index) => (
          <div className="border-2 border-border rounded-lg w-full flex items-start justify-start gap-2">
            <BloodDrop
              file={obj.file}
              bloodPropertie={bloodProperties[index]}
              index={index}
              isDelete={isDelete}
              setIsDelete={setIsDelete}
              setBloodProperties={setBloodProperties}
              setFocusBlood={setFocusBlood}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
