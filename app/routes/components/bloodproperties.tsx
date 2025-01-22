import React, { useState, useEffect, useRef } from "react";
import { m6x6 } from "./matrix";
import { atan2, cos, sin, sqrt, max, min, atan } from "mathjs";

type Point = [number, number];
const radToDeg = (radians: number): number => (radians * 180) / Math.PI;

export default function EllipseCalculation({ file }: { file: File }) {
  const [points, setPoints] = useState<Point[]>([]);
  const [calculated, setCalculated] = useState(false);
  const [results, setResults] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const dotsize = 8;

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setImageUrl(imageUrl);
    };
    reader.readAsDataURL(file);
  }, [file]);

  const rescale = (
    value: number,
    oldMin: number,
    oldMax: number,
    newMin: number,
    newMax: number
  ) => {
    return ((value - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
  };

  const handleMouseClick = (event: React.MouseEvent) => {
    if (calculated) return;
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
    console.log(matrix);
    const [a, b, c, d, e, f] = m6x6(matrix);
    const r = atan2(b, a - c) / 2;
    const A = a * cos(r) ** 2 + b * sin(r) * cos(r) + c * sin(r) ** 2;
    const B = b * (cos(r) ** 2 - sin(r) ** 2) + 2 * (c - a) * sin(r) * cos(r);
    const C = a * sin(r) ** 2 - b * sin(r) * cos(r) + c * cos(r) ** 2;
    const D = d * cos(r) + e * sin(r);
    const E = e * cos(r) - d * sin(r);
    const F = f;
    console.log(A, B, C, D, E, F);
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
    console.log("Semimajor: ", semimajor);
    console.log("Semiminor: ", semiminor);
    console.log("Impact Angle: ", impactAngle);
  }, [points]);

  return (
    <div className="flex items-start justify-start w-full h-full">
      {imageUrl && (
        <div
          className="h-full flex items-center justify-center relative"
          onClick={handleMouseClick}
        >
          <img ref={imageRef} src={imageUrl} className="w-full rounded-t-md" />
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
      <pre>{results}</pre>
    </div>
  );
}
