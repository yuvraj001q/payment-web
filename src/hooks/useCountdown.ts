"use client";

import { useState, useEffect } from "react";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
  total: number;
}

export function useCountdown(targetDate: Date | string | null): CountdownTime {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: true,
    total: 0,
  });

  useEffect(() => {
    if (!targetDate) return;

    function calculate(): CountdownTime {
      const now = new Date().getTime();
      const target = new Date(targetDate!).getTime();
      const diff = target - now;

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true, total: 0 };
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        expired: false,
        total: diff,
      };
    }

    setTimeLeft(calculate());
    const interval = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}
