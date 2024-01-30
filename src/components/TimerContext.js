// TimerContext.js
import React, { createContext, useContext, useState } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useState({ time: 0, interval: null });

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => ({ ...prevTimer, time: prevTimer.time + 1 }));
    }, 1000);

    setTimer((prevTimer) => ({ ...prevTimer, interval }));
  };

  const stopTimer = () => {
    const { interval } = timer;
    clearInterval(interval);
  };

  return (
    <TimerContext.Provider value={{ timer, startTimer, stopTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  return useContext(TimerContext);
};
