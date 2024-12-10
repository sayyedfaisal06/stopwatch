import React, { useState, useRef } from "react";

function Stopwatch() {
  const [time, setTime] = useState({ ms: 0, seconds: 0, minutes: 0 });
  const [isActive, setIsActive] = useState(false);
  const countRef: any = useRef(null);

  const handleStart = () => {
    setIsActive(true);
    countRef.current = setInterval(() => {
      setTime((prevTime) => {
        let milliseconds = prevTime.ms + 10;
        let seconds = prevTime.seconds;
        let minutes = prevTime.minutes;

        if (milliseconds >= 1000) {
          milliseconds = 0;
          seconds += 1;
        }
        if (seconds >= 60) {
          seconds = 0;
          minutes += 1;
        }

        return { ms: milliseconds, seconds, minutes };
      });
    }, 10); // update every 10 milliseconds
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsActive(false);
  };

  const handleStop = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setTime({ ms: 0, seconds: 0, minutes: 0 });
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setTime({ ms: 0, seconds: 0, minutes: 0 });
  };

  const formatTime = (time) => {
    return `${time.minutes.toString().padStart(2, "0")}:${time.seconds
      .toString()
      .padStart(2, "0")}:${(time.ms / 10).toFixed(0).padStart(2, "0")}`;
  };

  return (
    <div className="Stopwatch">
      <h1>Stopwatch</h1>
      <p>{formatTime(time)}</p>
      <div className="buttons">
        {!isActive &&
          time.ms === 0 &&
          time.seconds === 0 &&
          time.minutes === 0 && <button onClick={handleStart}>Start</button>}
        {isActive && <button onClick={handlePause}>Pause</button>}
        {!isActive &&
          (time.ms !== 0 || time.seconds !== 0 || time.minutes !== 0) && (
            <button onClick={handleStart}>Resume</button>
          )}
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default Stopwatch;
