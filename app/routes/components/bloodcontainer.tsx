import { useContext, useState } from "react";
import BloodDrop from "./blooddrop";
import { HiOutlinePlus } from "react-icons/hi";
import * as THREE from "three";
import { AppContext } from "../functions/context";

export default function BloodContainer() {
  const { bloodProperties, setFocusBlood, setBloodProperties } =
    useContext(AppContext);
  const [isDelete, setIsDelete] = useState(false);

  const defaultBlood = (
    uploadedFile: File,
    angle: number = 0,
    x: number = 0,
    y: number = 0,
    userrot: number = 0
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
        defaultBlood(
          file,
          30,
          data[index].x / 10,
          data[index].y / 10,
          data[index].r
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
        {bloodProperties.map((prop, index) => (
          <div className="border-2 border-border rounded-lg w-full flex items-start justify-start gap-2">
            <BloodDrop
              file={prop.file}
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
