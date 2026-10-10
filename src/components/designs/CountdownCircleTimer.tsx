import React, { memo, useEffect, useRef, useState } from "react";


interface CountdownCircleTimerProps {
  duration?: number; // seconds
  size?: number;
  strokeWidth?: number;
  color?: string;
  trailColor?: string;
  onComplete?: () => void;
}


const CountdownCircleTimer: React.FC<CountdownCircleTimerProps>  = ({
  duration = 10, // seconds
  size = 100,
  strokeWidth = 10,
  color = "#4CAF50",
  trailColor = "#ddd",
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  const animationRef = useRef<number | any>(null);
  const startTime = useRef<DOMHighResTimeStamp | any>(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    function animate(timestamp: any) {
      if (!startTime.current) startTime.current = timestamp;

      const elapsed = (timestamp - startTime.current) / 1000;
      const remaining = Math.max(duration - elapsed, 0);

      setTimeLeft(remaining);

      if (remaining > 0) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      startTime.current = null;
    };
  }, [duration, onComplete]);

  const progress = timeLeft / duration;
  const dashOffset = circumference * (1 - progress);

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
      }}
    >
      <svg width={size} height={size}>
        {/* Background Circle */}
        <circle stroke={trailColor} fill="none" strokeWidth={strokeWidth} r={radius} cx={size / 2} cy={size / 2} />

        {/* Progress Circle */}
        <circle
          stroke={color}
          fill="none"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: "stroke-dashoffset 0.05s linear",
          }}
        />
      </svg>

      {/* Time */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {Math.ceil(timeLeft)}
      </div>
    </div>
  );
}

export default memo(CountdownCircleTimer)