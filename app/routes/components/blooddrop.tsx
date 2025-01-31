import { MdDeleteOutline } from "react-icons/md";
import { BloodPropertiesType } from "../types/blood";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { FaPen } from "react-icons/fa";
import Input from "./input";
import { computeEdge } from "../functions/computeedge";
import { AppContext } from "../functions/context";

export default function BloodDrop({
  file,
  bloodPropertie,
  index,
  isDelete,
  setIsDelete,
  setBloodProperties,
  setFocusBlood,
}: {
  file: File;
  bloodPropertie: BloodPropertiesType;
  index: number;
  isDelete: boolean;
  setIsDelete: Dispatch<SetStateAction<boolean>>;
  setBloodProperties: Dispatch<SetStateAction<BloodPropertiesType[]>>;
  setFocusBlood: Dispatch<SetStateAction<number>>;
}) {
  const { settings, bloodHeight } = useContext(AppContext);
  const [x, setX] = useState(String(bloodPropertie.x));
  const [y, setY] = useState(String(bloodPropertie.y));
  const [rotation, setRotation] = useState(String(bloodPropertie.userrot || 0));
  const [bh, setBh] = useState("0");

  useEffect(() => {
    if (!isDelete) {
      setBloodProperties((prevProperties) => {
        const updatedProperties = prevProperties.map((item, i) => {
          if (i === index) {
            computeEdge(
              bloodPropertie,
              settings.planeSize,
              Number(x),
              -Number(y),
              Number(rotation)
            );
            return {
              ...item,
              x: Number(x),
              y: -Number(y),
              userrot: Number(rotation),
            };
          }
          return item;
        });
        return updatedProperties;
      });
    }
  }, [x, y, rotation, settings]);

  useEffect(() => {
    if (isDelete) {
      setX(String(bloodPropertie.x));
      setY(String(-bloodPropertie.y));
      setRotation(String(bloodPropertie.userrot || 0));
    }
    setIsDelete(false);
  }, [isDelete]);

  function handleDelete(index: number) {
    setBloodProperties((prevProperties) => {
      const updatedProperties = prevProperties.filter((_, i) => i !== index);
      setIsDelete(true);
      return updatedProperties;
    });
  }

  useEffect(() => {
    if (bloodHeight.length) {
      if (bloodHeight[index] != undefined) {
        setBh(bloodHeight[index].toFixed(2));
      }
    }
  }, [bloodHeight]);

  return (
    <div className="grid grid-cols-3 gap-2 w-full items-center">
      <img
        src={URL.createObjectURL(file)}
        className="h-24 w-full rounded-l-md"
      />
      <div className="col-span-2 flex justify-between items-start h-full">
        <div className="grid grid-cols-2 gap-2">
          <div className="h-full col-span-1 flex flex-col items-start justify-start gap-2 py-2 text-left text-sm text-gray-200">
            <Input label="x" data={x} setData={setX} />
            <Input label="y" data={y} setData={setY} />
            <Input label="r" data={rotation} setData={setRotation} />
          </div>
          <div className="h-full col-span-1 flex flex-col items-start justify-start gap-2 py-2 text-sm text-left text-gray-200">
            <div>height: {Number(bh) == 0 ? "?" : bh}</div>
            <div>AOI: {bloodPropertie.AOI == 0 ? "?" : bloodPropertie.AOI}</div>
          </div>
        </div>
        <div className="flex gap-2 p-2 items-center">
          <button onClick={() => handleDelete(index)}>
            <MdDeleteOutline size={24} color="red" />
          </button>
          <button onClick={() => setFocusBlood(index)}>
            <FaPen size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
