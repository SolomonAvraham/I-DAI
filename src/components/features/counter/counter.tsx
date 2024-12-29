"use client";

import React, { useEffect, useState } from "react";

const CountdownTimer = () => {
  const targetDate = new Date('2024-12-30');
  targetDate.setDate(targetDate.getDate() + 60);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="md:text-2xl text-sm text-center font-bold mb-4">
        This AI system is free to use for the next:
      </h1>
      <div className="text-sm md:text-3xl text-center font-medium">
        <p>
          Days: {timeLeft.days} | Hours: {timeLeft.hours} | Minutes:{" "}
          {timeLeft.minutes} | Seconds: {timeLeft.seconds}
        </p>
        <p className="text-gray-500 md:text-xl mt-4">
          Ends on: {targetDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }).replace(/\//g, '.')}
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;
