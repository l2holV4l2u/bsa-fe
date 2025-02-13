import { useState, useEffect, useRef, useContext } from "react";
import { BloodPropertiesType } from "../types/blood";
import { FaArrowLeftLong } from "react-icons/fa6";
import { AppContext } from "../functions/context";

export default function BloodProperties({
  bloodPropertie,
}: {
  bloodPropertie: BloodPropertiesType;
}) {
  const { settings, setFocusBlood } = useContext(AppContext);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setImageUrl(imageUrl);
    };
    reader.readAsDataURL(bloodPropertie.processedFile);
  }, [bloodPropertie.processedFile]);

  return (
    <div className="flex flex-col items-start justify-start w-full h-full p-4 gap-2">
      <button>
        <FaArrowLeftLong
          size={24}
          onClick={() => setFocusBlood(-1)}
          color="white"
        />
      </button>
      <div className="w-full flex items-center justify-center h-1/2">
        {imageUrl && (
          <img ref={imageRef} src={imageUrl} className="h-full rounded-md" />
        )}
      </div>
      <div className="mt-4 flex flex-col gap-2 items-center w-full text-white">
        <div>
          [ A, B, C, D, E, F ]: [{bloodPropertie.A}, {bloodPropertie.B},
          {bloodPropertie.C}, {bloodPropertie.D}, {bloodPropertie.E},
          {bloodPropertie.F}]
        </div>
        <div>
          Semi-minor: {bloodPropertie.semiminor}, Semi-major:{" "}
          {bloodPropertie.semimajor}
        </div>
        <div>
          AOI ({settings.material}): {bloodPropertie.AOI}°
        </div>
      </div>
    </div>
  );
}
