import React, { useState, useEffect } from 'react';

const NumberTransition = ({ endValue }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const animationDuration = 5000; // in milliseconds
    const framesPerSecond = 60;
    const totalFrames = (animationDuration / 5000) * framesPerSecond;
    const increment = endValue / totalFrames;

    let frame = 0;
    const interval = setInterval(() => {
      setCurrentValue((prevValue) => {
        frame++;
        if (frame >= totalFrames) {
          clearInterval(interval);
          return endValue;
        }
        return Math.floor(prevValue + increment); // Round down to the nearest integer
      });
    }, 300 / framesPerSecond);

    return () => clearInterval(interval);
  }, [endValue]);

  return <div style={{width: '50px'}}>{currentValue}</div>;
};

export default NumberTransition;
