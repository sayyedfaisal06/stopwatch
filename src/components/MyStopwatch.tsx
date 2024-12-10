import React, { useRef } from "react";

const initialTime = {
  milliseconds: 0,
  seconds: 0,
  minutes: 0,
};

const formatTime = (time: typeof initialTime): string => {
  const milliseconds = (time.milliseconds / 10).toString().padStart(2, "0");
  const seconds = time.seconds.toString().padStart(2, "0");
  const minutes = time.minutes.toString().padStart(2, "0");

  return `${minutes}:${seconds}:${milliseconds}`;
};

const MyStopwatch: React.FC = () => {
  const [time, setTime] = React.useState<typeof initialTime>(initialTime);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const timerRef = useRef<number | undefined>(undefined);

  const isPaused = JSON.stringify(initialTime) === JSON.stringify(time);

  const handleStart = () => {
    setIsActive(true);
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        let ms = prevTime.milliseconds + 10;
        let secs = prevTime.seconds;
        let mins = prevTime.minutes;

        if (ms >= 1000) {
          ms = 0;
          secs += 1;
        }

        if (secs >= 60) {
          secs = 0;
          mins += 1;
        }

        return { milliseconds: ms, minutes: mins, seconds: secs };
      });
    }, 10);
  };

  const handleReset = () => {
    setIsActive(false);
    clearInterval(timerRef.current);
    setTime(initialTime);
  };

  const handlePause = () => {
    setIsActive(false);
    clearInterval(timerRef.current);
  };

  return (
    <div className="wrapper">
      <div className="time">{formatTime(time)}</div>
      <div>
        {!isActive && isPaused && <button onClick={handleStart}>Start</button>}
        {!isActive && !isPaused && (
          <button onClick={handleStart}>Resume</button>
        )}
        {isActive && <button onClick={handlePause}>Pause</button>}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default MyStopwatch;
