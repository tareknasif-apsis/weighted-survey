import React, { useEffect, useState } from "react";

export default function Timer({
  seconds,
  onExpire,
  warningSeconds = 60,
}: {
  seconds: number;
  onExpire: () => void;
  warningSeconds?: number;
}) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds); // Reset timer when scenario changes
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t);
          onExpire();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [onExpire, seconds]);

  const mins = Math.floor(remaining / 60)
    .toString()
    .padStart(2, "0");
  const secs = (remaining % 60).toString().padStart(2, "0");
  const warn = remaining <= warningSeconds;
  const critical = remaining <= 10;
  const percentRemaining = (remaining / seconds) * 100;

  return (
    <div className="flex flex-col items-end gap-2">
      <div
        className={`text-2xl font-bold font-mono transition-all ${
          critical
            ? "text-red-400 animate-pulse"
            : warn
              ? "text-amber-400"
              : "text-cyan-400"
        }`}
      >
        {mins}:{secs}
      </div>
      <div className="w-24 h-1.5 bg-slate-700/40 rounded-full overflow-hidden border border-slate-600/30">
        <div
          className={`h-full transition-all ${
            critical
              ? "bg-gradient-to-r from-red-500 to-red-400"
              : warn
                ? "bg-gradient-to-r from-amber-500 to-orange-400"
                : "bg-gradient-to-r from-cyan-400 to-blue-400"
          }`}
          style={{ width: `${percentRemaining}%` }}
        ></div>
      </div>
      <div className="text-xs text-gray-400">⏱️ Time left</div>
    </div>
  );
}
