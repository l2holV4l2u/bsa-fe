import React, { useState, useEffect, useRef } from "react";
import { m6x6 } from "./matrix";
import { atan2, cos, sin, sqrt, max, min, atan } from "mathjs";
import { BloodPropertiesType } from "../types/blood";
import { FaArrowLeftLong } from "react-icons/fa6";

type Point = [number, number];
const radToDeg = (radians: any): number => (radians * 180) / Math.PI;

export default function BloodProperties({
  file,
  focusBlood,
  bloodProperties,
  setBloodProperties,
  setFocusBlood,
}: {
  file: File;
  focusBlood: number;
  bloodProperties: BloodPropertiesType[];
  setBloodProperties: React.Dispatch<BloodPropertiesType[]>;
  setFocusBlood: React.Dispatch<number | null>;
}) {
  const [points, setPoints] = useState<Point[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [curBlood, setCurBlood] = useState<BloodPropertiesType>(
    bloodProperties[focusBlood]
  );
  const dotsize = 8;

  console.log(curBlood);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setImageUrl(imageUrl);
    };
    reader.readAsDataURL(file);
  }, [file]);

  const handleMouseClick = (event: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (100 * (event.clientX - dotsize / 2 - rect.left)) / rect.width; // Normalize by image width
    const y = (100 * (event.clientY - dotsize / 2 - rect.top)) / rect.height; // Normalize by image height

    if (points.length < 5) {
      setPoints((prev) => [...prev, [x, y]]);
    }
  };

  useEffect(() => {
    if (points.length < 5) return;
    const matrix = [[1, 1, 1, 1, 1, 1]];
    points
      .map(([x, y]) => [x ** 2, x * y, y ** 2, x, y, 1])
      .forEach((point) => matrix.push(point));
    const [a, b, c, d, e, f] = m6x6(matrix);
    const r = atan2(b, a - c) / 2;
    const A = a * cos(r) ** 2 + b * sin(r) * cos(r) + c * sin(r) ** 2;
    const B = b * (cos(r) ** 2 - sin(r) ** 2) + 2 * (c - a) * sin(r) * cos(r);
    const C = a * sin(r) ** 2 - b * sin(r) * cos(r) + c * cos(r) ** 2;
    const D = d * cos(r) + e * sin(r);
    const E = e * cos(r) - d * sin(r);
    const F = f;
    const semimajor = max(
      sqrt((-F + D ** 2 / (4 * A) + E ** 2 / (4 * C)) / C),
      sqrt((-F + D ** 2 / (4 * A) + E ** 2 / (4 * C)) / A)
    );
    const semiminor = min(
      sqrt((-F + D ** 2 / (4 * A) + E ** 2 / (4 * C)) / C),
      sqrt((-F + D ** 2 / (4 * A) + E ** 2 / (4 * C)) / A)
    );
    const impactAngle = radToDeg(
      atan(sqrt(semiminor ** 2 / (semimajor ** 2 - semiminor ** 2)))
    );
    if (focusBlood !== null) {
      const updatedProperties = [...bloodProperties];
      updatedProperties[focusBlood] = {
        x: updatedProperties[focusBlood].x,
        y: updatedProperties[focusBlood].y,
        r: radToDeg(r).toFixed(2),
        A: A.toExponential(2),
        B: B.toExponential(2),
        C: C.toExponential(2),
        D: D.toExponential(2),
        E: E.toExponential(2),
        F: F.toExponential(2),
        semimajor: semimajor,
        semiminor: semiminor,
        impactAngle: impactAngle.toFixed(2),
      };
      setBloodProperties(updatedProperties);
      setCurBlood(updatedProperties[focusBlood]);
    }
  }, [points]);

  return (
    <div className="flex flex-col items-start justify-center w-full h-full p-4 gap-2">
      <button>
        <FaArrowLeftLong size={24} onClick={() => setFocusBlood(null)} />
      </button>
      <div className="flex items-center justify-center w-full">
        {imageUrl && (
          <div
            className="w-[75%] flex items-center justify-center relative"
            onClick={handleMouseClick}
          >
            <img ref={imageRef} src={imageUrl} className="w-full rounded-md" />
            {points.map(([x, y], index) => (
              <div
                key={index}
                className="absolute bg-red-800 rounded-full w-2 h-2"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
              />
            ))}
          </div>
        )}
      </div>
      {focusBlood !== null && curBlood.r != null && (
        <div className="mt-4 flex flex-col gap-2 items-center w-full">
          <div>Rotation: {curBlood.r}°</div>
          <div>
            [ A, B, C, D, E, F ]: [{curBlood.A}, {curBlood.B}, {curBlood.C},{" "}
            {curBlood.D}, {curBlood.E}, {curBlood.F}]
          </div>
          <div>
            Semi-minor: {curBlood.semiminor}, Semi-major: {curBlood.semimajor}
          </div>
          <div>Impact Angle: {curBlood.impactAngle}°</div>
        </div>
      )}
    </div>
  );
}
