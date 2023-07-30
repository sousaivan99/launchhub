"use client";
import React, { useState, useEffect } from "react";

const Countdown = ({ targetTimestamp }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateCountdown = () => {
    const targetDate = new Date(targetTimestamp);
    const now = new Date();

    // Adjust the targetDate to the local timezone
    const timezoneOffset = now.getTimezoneOffset() * 60 * 1000;
    targetDate.setTime(targetDate.getTime() - timezoneOffset);

    const timeDifference = targetDate.getTime() - now.getTime();

    if (timeDifference <= 0) {
      // Countdown is over, handle this case if needed
      setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      const oneSecond = 1000;
      const oneMinute = oneSecond * 60;
      const oneHour = oneMinute * 60;
      const oneDay = oneHour * 24;

      const days = Math.floor(timeDifference / oneDay);
      const hours = Math.floor((timeDifference % oneDay) / oneHour);
      const minutes = Math.floor((timeDifference % oneHour) / oneMinute);
      const seconds = Math.floor((timeDifference % oneMinute) / oneSecond);

      setCountdown({ days, hours, minutes, seconds });
    }
  };
  return (
    <>
      <div>T-</div>
      <div>
        <span>{countdown.days.toString().padStart(2, "0")}</span>
        <span className="countdown-info">Days</span>
      </div>
      <div>:</div>
      <div>
        <span>{countdown.hours.toString().padStart(2, "0")}</span>
        <span className="countdown-info">Hours</span>
      </div>
      <div>:</div>
      <div>
        <span>{countdown.minutes.toString().padStart(2, "0")}</span>
        <span className="countdown-info">Min</span>
      </div>
      <div>:</div>
      <div>
        <span>{countdown.seconds.toString().padStart(2, "0")}</span>
        <span className="countdown-info">Sec</span>
      </div>
    </>
  );
};

export default Countdown;
