import { useEffect, useRef, useState } from "react";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";

export default function TimeSlider({
  time,
  setTime,
}: {
  time: number;
  setTime: React.Dispatch<number>;
}) {
  const animationRef = useRef<number>();
  const lastUpdateTime = useRef<number>(0);
  const isAnimating = useRef<boolean>(false); // Track if the animation is running
  const [isPlaying, setIsPlaying] = useState(true); // Control play/stop state

  useEffect(() => {
    const animate = (currentTime: number) => {
      if (!isAnimating.current) return;

      if (currentTime - lastUpdateTime.current >= 100) {
        const nextTime = time + 1;
        setTime(nextTime >= 100 ? 100 : nextTime);
        lastUpdateTime.current = currentTime;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      isAnimating.current = true;
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationRef.current!);
      isAnimating.current = false;
    };
  }, [isPlaying, time, setTime]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = e.currentTarget;
    const rect = slider.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const sliderWidth = rect.width;
    const newTime = (clickX / sliderWidth) * 100;
    setTime(newTime);
  };

  const handlePlayStop = () => {
    setIsPlaying((prev) => !prev); // Toggle play/stop
  };

  return (
    <>
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
      <div className="w-full flex items-center justify-center gap-4">
        <button onClick={() => setTime(0)}>
          <FaBackward size={24} />
        </button>
        <button onClick={handlePlayStop}>
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        <button onClick={() => setTime(100)}>
          <FaForward size={24} />
        </button>
      </div>
    </>
  );
}
