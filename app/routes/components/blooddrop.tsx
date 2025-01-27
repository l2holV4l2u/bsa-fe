import { MdDeleteOutline } from "react-icons/md";
import { BloodPropertiesType } from "../types/blood";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import Input from "./input";

export default function BloodDrop({
  file,
  bloodPropertie,
  setBloodProperties,
  setFocusBlood,
  index,
}: {
  file: File;
  bloodPropertie: BloodPropertiesType;
  setBloodProperties: Dispatch<SetStateAction<BloodPropertiesType[]>>;
  setFocusBlood: Dispatch<SetStateAction<number>>;
  index: number;
}) {
  const [x, setX] = useState(String(bloodPropertie.x));
  const [y, setY] = useState(String(bloodPropertie.y));
  const [rotation, setRotation] = useState(String(bloodPropertie.userrot || 0));
  useEffect(() => {
    setBloodProperties((prevProperties) => {
      const updatedProperties = prevProperties.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            x: Number(x),
            y: Number(y),
            userrot: Number(rotation),
          };
        }
        return item;
      });
      return updatedProperties;
    });
  }, [x, y, rotation]);
  return (
    <div className="grid grid-cols-3 gap-4 w-full items-center">
      <img
        src={URL.createObjectURL(file)}
        className="h-24 w-full rounded-l-md"
      />
      <div className="col-span-2 flex justify-between items-start h-full">
        <div className="h-full flex flex-col items-start justify-start gap-2 py-2 text-left text-sm text-gray-200">
          <Input label="x" data={x} setData={setX} />
          <Input label="y" data={y} setData={setY} />
          <Input label="rotation" data={rotation} setData={setRotation} />
        </div>
        <div className="flex gap-2 p-2 items-center">
          <MdDeleteOutline size={24} color="red" />
          <button onClick={() => setFocusBlood(index)}>
            <FaPen size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
