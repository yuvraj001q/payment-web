"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface FlashOfferTileProps {
  title: string;
  description?: string | null;
  countdownEnd?: Date | null;
}

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    function calculate() {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        expired: false,
      };
    }

    setTimeLeft(calculate());
    const interval = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

export default function FlashOfferTile({ title, description, countdownEnd }: FlashOfferTileProps) {
  const countdown = useCountdown(countdownEnd || new Date());

  if (countdown.expired) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-5 text-center">
        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-3">
          <Zap className="h-6 w-6 text-red-400" />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-red-400 mt-1">This offer has expired</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-5 text-center">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3"
      >
        <Zap className="h-6 w-6 text-amber-400" />
      </motion.div>

      <h3 className="font-semibold text-lg">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
      )}

      <div className="flex gap-2 mt-4">
        {countdown.days > 0 && (
          <TimeUnit value={countdown.days} label="D" />
        )}
        <TimeUnit value={countdown.hours} label="H" />
        <TimeUnit value={countdown.minutes} label="M" />
        <TimeUnit value={countdown.seconds} label="S" />
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
        <motion.span
          key={value}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-lg font-bold"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </div>
      <span className="text-[10px] text-muted-foreground mt-1">{label}</span>
    </div>
  );
}
