import { useEffect, useRef } from "react";
import { Time } from "../types/time";

export default function TimeSlider({ time, setTime }: Time) {
  const animationRef = useRef<number>();
  const lastUpdateTime = useRef<number>(0);

  useEffect(() => {
    const animate = (currentTime: number) => {
      if (currentTime - lastUpdateTime.current >= 100) {
        const nextTime = time + 1;
        setTime(nextTime > 100 ? nextTime - 100 : nextTime);
        lastUpdateTime.current = currentTime;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current!);
  }, [time, setTime]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = e.currentTarget;
    const rect = slider.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const sliderWidth = rect.width;
    const newTime = (clickX / sliderWidth) * 100;
    setTime(newTime);
  };

  return (
    <div className="relative w-full h-6 cursor-pointer" onClick={handleClick}>
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-500 rounded-full -translate-y-1/2" />
      <div
        className="absolute top-1/2 left-0 h-1 bg-gray-200 rounded-full -translate-y-1/2 transition-all"
        style={{ width: `${time}%` }}
      />
      <div
        className="absolute top-1/2 h-4 w-4 bg-white rounded-full -translate-y-1/2 -translate-x-1/2 transition-all"
        style={{ left: `${time}%` }}
      />
    </div>
  );
}
