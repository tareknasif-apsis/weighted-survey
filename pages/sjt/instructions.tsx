import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { GiConsoleController } from "react-icons/gi";
import LevelProgress from "../../components/LevelProgress";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { getCurrentCandidate } from "../../lib/candidateAuth";

export default function SjtInstructions() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    if (!getCurrentCandidate()) router.replace("/login");
  }, [router]);

  return (
    <div className="space-y-6">
      <LevelProgress active="start" />

      <div
        className={`backdrop-blur border p-6 rounded-xl ${
          isDarkMode
            ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/30"
            : "bg-gradient-to-br from-emerald-300/20 to-teal-300/20 border-emerald-400/40"
        }`}
      >
        <div className={`text-3xl mb-3 flex justify-center ${isDarkMode ? "text-white" : "text-black"}`}>
          <GiConsoleController />
        </div>
        <h1
          className={`text-xl font-bold mb-4 text-center ${isDarkMode ? "text-white" : "text-black"}`}
        >
          {t("sjtInfo.title")}
        </h1>
        <div
          className={`space-y-3 text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-black"}`}
        >
          <p>{t("sjtInfo.p1")}</p>
          <p>{t("sjtInfo.p2")}</p>
          <p>{t("sjtInfo.p3")}</p>
          <p>{t("sjtInfo.p4")}</p>
        </div>
      </div>

      <button
        onClick={() => router.push("/sjt/start")}
        className="w-full py-4 px-6 rounded-lg font-bold text-lg transition-all transform bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 hover:scale-105 shadow-lg shadow-emerald-500/30 inline-flex items-center justify-center gap-2"
      >
        {t("sjtInfo.continue")} <FiArrowRight />
      </button>
    </div>
  );
}
