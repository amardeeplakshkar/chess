import React, { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string; // Format: "DD-MM-YYYY"
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const updateCountdown = () => {
      const [day, month, year] = targetDate.split("-").map(Number);
      const target = new Date(year, month - 1, day);
      const now = new Date();
      const diffMs = target.getTime() - now.getTime();

      if (diffMs <= 0) {
        setTimeLeft("0D left");
        return;
      }

      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

      if (diffDays >= 1) {
        setTimeLeft(`${diffDays}D left`);
      } else {
        setTimeLeft(`${diffHours}H left`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000 * 60); // Update every minute

    return () => clearInterval(interval);
  }, [targetDate]);

  return <div className="text-xs text-end bg-white/10 px-2 py-1 rounded-full">{timeLeft}</div>;
};

export default Countdown;
