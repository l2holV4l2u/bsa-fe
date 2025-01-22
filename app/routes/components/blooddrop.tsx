import { BloodPropertiesType } from "../types/blood";

export default function BloodDrop({
  file,
  bloodPropertie,
}: {
  file: File;
  bloodPropertie: BloodPropertiesType;
}) {
  return (
    <div className="grid grid-cols-5 gap-2">
      <img
        src={URL.createObjectURL(file)}
        className="col-span-2 h-24 rounded-l-md"
      />
      <div className="col-span-3 flex flex-col items-start justify-start gap-2 py-2 text-left text-sm text-gray-200">
        <p>X: {bloodPropertie.x}</p>
        <p>Y: {bloodPropertie.y}</p>
        {bloodPropertie.impactAngle && (
          <p>Impact Angle: {bloodPropertie.impactAngle}°</p>
        )}
      </div>
    </div>
  );
}
