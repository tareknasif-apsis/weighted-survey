"use client";

import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

export default function ThemeSwitch() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDarkMode}
      aria-label={isDarkMode ? t("theme.switchToLight") : t("theme.switchToDark")}
      onClick={toggleTheme}
      className={`relative inline-flex h-9 w-16 shrink-0 items-center rounded-full border transition-colors duration-300 ${
        isDarkMode
          ? "bg-slate-800/80 border-white/20"
          : "bg-blue-100 border-blue-300"
      }`}
    >
      <span
        className="absolute left-1.5 text-xs leading-none select-none text-amber-500"
        aria-hidden="true"
      >
        <FiSun />
      </span>
      <span
        className="absolute right-1.5 text-xs leading-none select-none text-slate-300"
        aria-hidden="true"
      >
        <FiMoon />
      </span>
      <span
        className={`inline-flex h-7 w-7 transform items-center justify-center rounded-full bg-white text-sm shadow-md transition-transform duration-300 text-slate-700 ${
          isDarkMode ? "translate-x-8" : "translate-x-1"
        }`}
        aria-hidden="true"
      >
        {isDarkMode ? <FiMoon /> : <FiSun />}
      </span>
    </button>
  );
}
