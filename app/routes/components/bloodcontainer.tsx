import { useContext, useState } from "react";
import BloodDrop from "./blooddrop";
import { HiOutlinePlus } from "react-icons/hi";
import * as THREE from "three";
import { AppContext } from "../functions/context";
import { BloodPropertiesType } from "../types/blood";

export default function BloodContainer() {
  const { bloodProperties, setBloodProperties } = useContext(AppContext);
  const [isDelete, setIsDelete] = useState(false);

  const defaultBlood = (
    uploadedFile: File,
    x: number = 0,
    y: number = 0,
    rotation: number = 0
  ) => ({
    x,
    y,
    rotation,
    file: uploadedFile,
    processedFile: uploadedFile,
    A: "",
    B: "",
    C: "",
    D: "",
    E: "",
    F: "",
    semimajor: 0,
    semiminor: 0,
    theta: 0,
    AOI: 0,
    edge: new THREE.Line3(
      new THREE.Vector3(x ?? 0, 0, y ?? 0),
      new THREE.Vector3(0, 0, 0)
    ),
    height: 0,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setBloodProperties([...bloodProperties, defaultBlood(uploadedFile)]);
    }
  };

  const handleAutofill = async () => {
    const sampleFilePaths = Array.from(
      { length: 10 },
      (_, i) => `/blood/blood${i + 1}.png`
    );
    const newFiles = await Promise.all(
      sampleFilePaths.map(async (filePath) => {
        const response = await fetch(filePath);
        const blob = await response.blob();
        const fileName = filePath.split("/").pop() || "unknown.png";
        return new File([blob], fileName, {
          type: blob.type,
        });
      })
    );
    const data = await fetch("/samples.json").then((res) => res.json());
    const clipped = newFiles.slice(0, data.length);
    setBloodProperties([
      ...bloodProperties,
      ...clipped.map((file, index) =>
        defaultBlood(file, data[index].x, data[index].y, data[index].r)
      ),
    ]);
  };

  return (
    <div className="rounded-lg overflow-y-auto flex flex-col gap-2 w-full h-full p-2 md:p-4 border-2 border-border text-gray-200">
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
      {bloodProperties.length != 0 && (
        <div className="flex flex-col gap-2">
          {bloodProperties.map((prop, index) => (
            <div className="border-2 border-border rounded-lg w-full flex items-start justify-start gap-2">
              <BloodDrop
                bloodPropertie={prop}
                index={index}
                isDelete={isDelete}
                setIsDelete={setIsDelete}
                setBloodPropertie={(val: BloodPropertiesType) => {
                  setBloodProperties((prevProperties) => {
                    const updatedProperties = [...prevProperties];
                    updatedProperties[index] = val;
                    return updatedProperties;
                  });
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
