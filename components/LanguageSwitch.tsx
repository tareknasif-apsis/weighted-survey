"use client";

import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageSwitch() {
  const { isDarkMode } = useTheme();
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("language.switchLabel")}
      className={`inline-flex items-center rounded-full border p-1 backdrop-blur ${
        isDarkMode
          ? "bg-black/20 border-white/20"
          : "bg-white/40 border-gray-300"
      }`}
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
          lang === "en"
            ? "bg-blue-500 text-white shadow"
            : isDarkMode
              ? "text-white/70 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
        }`}
      >
        🇬🇧 {t("language.en")}
      </button>
      <button
        type="button"
        onClick={() => setLang("ms")}
        aria-pressed={lang === "ms"}
        className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
          lang === "ms"
            ? "bg-orange-500 text-white shadow"
            : isDarkMode
              ? "text-white/70 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
        }`}
      >
        🇲🇾 {t("language.ms")}
      </button>
    </div>
  );
}
