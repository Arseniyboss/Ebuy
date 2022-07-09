import { useState, useEffect, useRef, useCallback } from "react";
import { addZero } from "../helpers/addZero";

export const useCountdown = (endTime) => {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [expired, setExpired] = useState(false);

  const interval = useRef();

  const timer = useCallback(() => {
    const countDownDate = new Date(endTime).getTime();

    interval.current = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const day = 24 * 60 * 60 * 1000;
      const hour = 60 * 60 * 1000;
      const minute = 60 * 1000;
      const second = 1000;

      const days = addZero(Math.floor(distance / day));
      const hours = addZero(Math.floor((distance % day) / hour));
      const minutes = addZero(Math.floor((distance % hour) / minute));
      const seconds = addZero(Math.floor((distance % minute) / second));

      if (distance < 0) {
        setExpired(true);
        clearInterval(interval.current);
      } else {
        setSeconds(seconds);
        setMinutes(minutes);
        setHours(hours);
        setDays(days);
      }
    });
  }, [endTime]);

  useEffect(() => {
    timer();
    return () => {
      clearInterval(interval.current);
    };
  }, [timer]);

  return {
    days,
    hours,
    minutes,
    seconds,
    expired,
  };
};
