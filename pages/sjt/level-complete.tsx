import { useEffect } from "react";
import { useRouter } from "next/router";
import { FiCheckCircle } from "react-icons/fi";
import levels, { Level } from "../../data/levels";
import LevelProgress from "../../components/LevelProgress";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { getCurrentCandidate } from "../../lib/candidateAuth";

export default function LevelComplete() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { lang, t } = useLanguage();
  const levelId = Number(router.query.level);
  const nextScenario = typeof router.query.next === "string" ? router.query.next : "";

  useEffect(() => {
    if (!getCurrentCandidate()) router.replace("/login");
  }, [router]);

  const completedLevel: Level | undefined = levels.find((l) => l.id === levelId);
  const upcomingLevel: Level | undefined = levels.find((l) => l.id === levelId + 1);

  if (!completedLevel || !upcomingLevel || !nextScenario) {
    return <div>{t("qid.loading")}</div>;
  }

  const completedName = lang === "en" ? completedLevel.name_en : completedLevel.name_ms;
  const upcomingName = lang === "en" ? upcomingLevel.name_en : upcomingLevel.name_ms;
  const upcomingDesc = lang === "en" ? upcomingLevel.description_en : upcomingLevel.description_ms;

  function onContinue() {
    router.push(`/sjt/${nextScenario.toLowerCase()}`);
  }

  return (
    <div className="space-y-6">
      <LevelProgress active={completedLevel.key} />

      <div
        className={`backdrop-blur border-2 rounded-xl p-8 text-center overflow-hidden relative ${
          isDarkMode
            ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/40"
            : "bg-gradient-to-br from-emerald-100 to-teal-100 border-emerald-400"
        }`}
      >
        <div className={`text-4xl mb-3 flex justify-center ${isDarkMode ? "text-emerald-300" : "text-emerald-600"}`}>
          <FiCheckCircle />
        </div>
        <h1
          className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
          {t("level.completedTitle", { level: `${completedLevel.id}: ${completedName}` })}
        </h1>
        <p
          className={`text-sm font-semibold mb-6 ${isDarkMode ? "text-emerald-300" : "text-emerald-700"}`}
        >
          {t("level.proceedTo", { next: upcomingLevel.id, name: upcomingName })}
        </p>

        <div
          className={`text-left rounded-lg p-4 mb-6 border ${
            isDarkMode ? "bg-slate-900/40 border-slate-700/50" : "bg-white/70 border-emerald-200"
          }`}
        >
          <div
            className={`text-xs font-bold uppercase tracking-wide mb-1 ${isDarkMode ? "text-emerald-300" : "text-emerald-700"}`}
          >
            {t("level.currentLevel", { level: upcomingLevel.id, name: upcomingName })}
          </div>
          <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            {upcomingDesc}
          </p>
        </div>

        <button
          onClick={onContinue}
          className="w-full py-3.5 px-6 rounded-lg font-bold text-lg transition-all transform bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 hover:scale-105 shadow-lg shadow-emerald-500/30"
        >
          {t("level.continueButton")}
        </button>
      </div>
    </div>
  );
}
