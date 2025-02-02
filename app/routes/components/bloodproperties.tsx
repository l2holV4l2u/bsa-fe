import React, { useState, useEffect, useRef, useContext } from "react";
import { m6x6 } from "../functions/matrix";
import { atan2, cos, sin, sqrt, max, min, atan } from "mathjs";
import { BloodPropertiesType } from "../types/blood";
import { FaArrowLeftLong } from "react-icons/fa6";
import { AppContext } from "../functions/context";

type Point = [number, number];
const radToDeg = (radians: any): number => (radians * 180) / Math.PI;

export default function BloodProperties({
  bloodPropertie,
  setBloodPropertie,
}: {
  bloodPropertie: BloodPropertiesType;
  setBloodPropertie: (val: BloodPropertiesType) => void;
}) {
  const { settings, focusBlood, setFocusBlood } = useContext(AppContext);
  const [points, setPoints] = useState<Point[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const dotsize = 8;

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setImageUrl(imageUrl);
    };
    reader.readAsDataURL(bloodPropertie.file);
  }, [bloodPropertie]);

  const handleMouseClick = (event: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = event.clientX - dotsize / 2 - rect.left;
    const y = event.clientY - dotsize / 2 - rect.top;
    if (points.length < 5) {
      setPoints((prev) => [...prev, [x, y]]);
    }
  };

  useEffect(() => {
    setPoints([]);
  }, [focusBlood]);

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
      file: bloodPropertie.file,
      x: bloodPropertie.x,
      y: bloodPropertie.y,
      userrot: bloodPropertie.userrot,
      calrot: Number(radToDeg(r).toFixed(2)),
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
      edge: bloodPropertie.edge,
      height: 0,
    };
    setBloodPropertie(updatedPropertie);
  }, [points, settings.material]);

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
          <div
            className="flex h-full items-center justify-center relative"
            onClick={handleMouseClick}
          >
            <img ref={imageRef} src={imageUrl} className="h-full rounded-md" />
            {points.map(([x, y], index) => (
              <div
                key={index}
                className="absolute bg-red-200 rounded-full w-2 h-2"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                }}
              />
            ))}
          </div>
        )}
      </div>
      {bloodPropertie.calrot != null && (
        <div className="mt-4 flex flex-col gap-2 items-center w-full text-white">
          <div>Rotation: {bloodPropertie.calrot}°</div>
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
      )}
    </div>
  );
}
