import React, { useEffect, useRef, useState } from "react";
import { FiAlertTriangle, FiClock } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

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
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  // Keep the latest onExpire without making the countdown effect depend on
  // it, since the parent passes a new function on every render.
  const onExpireRef = useRef(onExpire);
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    setRemaining(seconds); // Reset timer only when the scenario's duration changes
    const interval = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(interval);
          onExpireRef.current();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    // Fire once, exactly when the countdown crosses into the warning window.
    if (remaining === warningSeconds && warningSeconds > 0) {
      setShowWarningAlert(true);
      const hide = setTimeout(() => setShowWarningAlert(false), 5000);
      return () => clearTimeout(hide);
    }
  }, [remaining, warningSeconds]);

  const mins = Math.floor(remaining / 60)
    .toString()
    .padStart(2, "0");
  const secs = (remaining % 60).toString().padStart(2, "0");
  const warn = remaining <= warningSeconds;
  const critical = remaining <= 10;
  const percentRemaining = (remaining / seconds) * 100;

  return (
    <div className="flex flex-col items-end gap-2">
      {showWarningAlert && (
        <div
          role="alert"
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/95 text-white text-sm font-semibold shadow-lg backdrop-blur animate-pulse"
        >
          <FiAlertTriangle className="shrink-0" /> {t("timer.warningAlert")}
        </div>
      )}
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
      <div
        className={`flex items-center gap-1 text-xs ${isDarkMode ? "text-gray-400" : "text-black"}`}
      >
        <FiClock className="shrink-0" /> {t("timer.timeLeft")}
      </div>
    </div>
  );
}
