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
import { atan, max, min, sqrt } from "mathjs";
import { bloodProcessing } from "../functions/bloodprocessing";

export default function BloodDrop({
  index,
  isDelete,
  setIsDelete,
  bloodPropertie,
  setBloodPropertie,
}: {
  index: number;
  isDelete: boolean;
  setIsDelete: Dispatch<SetStateAction<boolean>>;
  bloodPropertie: BloodPropertiesType;
  setBloodPropertie: (val: BloodPropertiesType) => void;
}) {
  const { settings, bloodHeight, setBloodProperties, setFocusBlood } =
    useContext(AppContext);
  const [x, setX] = useState(String(bloodPropertie.x));
  const [y, setY] = useState(String(bloodPropertie.y));
  const [rotation, setRotation] = useState(
    String(bloodPropertie.rotation || 0)
  );
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
  }, [x, y, rotation, settings, bloodPropertie.AOI]);

  useEffect(() => {
    const radToDeg = (radians: any): number => (radians * 180) / Math.PI;
    const processBloodImage = async () => {
      const { contourFile, ellipseEquation } = await bloodProcessing(
        bloodPropertie.file
      );
      const { A, B, C, D, E, F } = ellipseEquation;
      const semimajor = Number(
        max(
          sqrt((-F + D ** 2 / (4 * A) + E ** 2 / (4 * C)) / C),
          sqrt((-F + D ** 2 / (4 * A) + E ** 2 / (4 * C)) / A)
        )
      );
      const semiminor = Number(
        min(
          sqrt((-F + D ** 2 / (4 * A) + E ** 2 / (4 * C)) / C),
          sqrt((-F + D ** 2 / (4 * A) + E ** 2 / (4 * C)) / A)
        )
      );
      const impactAngle = radToDeg(
        atan(sqrt(semiminor ** 2 / (semimajor ** 2 - semiminor ** 2)))
      );
      let AOI = impactAngle;
      switch (settings.material) {
        case "Paper": {
          AOI = -2.673 + 1.068 * impactAngle;
          break;
        }
        case "Glass": {
          AOI = -9.488 + 1.213 * impactAngle;
          break;
        }
        case "Wood": {
          AOI = -2.323 + 1.065 * impactAngle;
          break;
        }
        case "Smooth Tile": {
          AOI = -5.329 + 1.109 * impactAngle;
          break;
        }
        case "Rough Tile": {
          AOI = -7.775 + 1.206 * impactAngle;
          break;
        }
      }
      const updatedPropertie: BloodPropertiesType = {
        ...bloodPropertie,
        processedFile: contourFile ? contourFile : bloodPropertie.file,
        A: A.toExponential(2),
        B: B.toExponential(2),
        C: C.toExponential(2),
        D: D.toExponential(2),
        E: E.toExponential(2),
        F: F.toExponential(2),
        semimajor: Number(semimajor.toFixed(3)),
        semiminor: Number(semiminor.toFixed(3)),
        theta: Number(impactAngle.toFixed(2)),
        AOI: Number(AOI.toFixed(2)),
      };
      setBloodPropertie(updatedPropertie);
    };
    if (bloodPropertie.file) {
      processBloodImage();
    }
  }, [settings.material]);

  useEffect(() => {
    if (isDelete) {
      setX(String(bloodPropertie.x));
      setY(String(-bloodPropertie.y));
      setRotation(String(bloodPropertie.rotation || 0));
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
    <div className="grid grid-cols-4 gap-2 w-full items-center">
      <img
        src={URL.createObjectURL(bloodPropertie.file)}
        className="h-[120px] w-full rounded-l-md"
      />
      <div className="col-span-3 flex justify-between items-start h-full">
        <div className="grid grid-cols-2 gap-2 h-full">
          <div className="h-full col-span-1 flex flex-col items-start justify-between gap-2 py-2 text-left text-sm text-gray-200">
            <Input label="x" data={x} setData={setX} />
            <Input label="y" data={y} setData={setY} />
            <Input label="r" data={rotation} setData={setRotation} />
          </div>
          <div className="h-full col-span-1 flex flex-col items-start justify-between gap-2 py-2 text-sm text-left text-gray-200">
            <div>
              <div>height: </div>
              <div>{Number(bh) == 0 ? "?" : bh}</div>
            </div>
            <div>
              <div>AOI: </div>
              <div>{bloodPropertie.AOI == 0 ? "?" : bloodPropertie.AOI}</div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 p-2 items-center flex-col ">
          <button onClick={() => setFocusBlood(index)}>
            <FaPen size={16} />
          </button>
          <button onClick={() => handleDelete(index)}>
            <MdDeleteOutline size={24} color="red" />
          </button>
        </div>
      </div>
    </div>
  );
}
