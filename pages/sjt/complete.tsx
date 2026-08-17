import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiAward,
  FiBarChart2,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiShield,
  FiSend,
  FiZap,
  FiStar,
} from "react-icons/fi";
import { GiPartyPopper } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi2";
import LevelProgress from "../../components/LevelProgress";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { getCurrentCandidate } from "../../lib/candidateAuth";
import { markSjtCompleted } from "../../lib/adminStore";

export default function Complete() {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const started =
    typeof window !== "undefined"
      ? localStorage.getItem("mnext_attempt_started")
      : null;

  useEffect(() => {
    const candidate = getCurrentCandidate();
    if (candidate) {
      setEmail(candidate.email);
      markSjtCompleted(candidate.email);
    }
  }, []);

  const duration = started
    ? Math.round((Date.now() - new Date(started).getTime()) / 1000 / 60)
    : null;

  return (
    <div className="space-y-6">
      <LevelProgress active="complete" />

      {/* Celebration Banner */}
      <div className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur border-2 border-purple-500/50 rounded-xl p-8 text-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-2 left-4 text-3xl animate-bounce">
            <FiStar />
          </div>
          <div
            className="absolute top-8 right-6 text-3xl animate-bounce"
            style={{ animationDelay: "0.1s" }}
          >
            <GiPartyPopper />
          </div>
          <div
            className="absolute bottom-4 left-8 text-3xl animate-bounce"
            style={{ animationDelay: "0.2s" }}
          >
            <FiZap />
          </div>
        </div>
        <div className="relative z-10">
          <div className="text-5xl mb-4 flex justify-center text-purple-400">
            <FiAward />
          </div>
          <h1
            className={`text-3xl font-bold mb-2 bg-gradient-to-r ${isDarkMode ? "from-purple-300 to-pink-300" : "from-purple-600 to-pink-600"}  bg-clip-text text-transparent`}
          >
            {t("complete.title")}
          </h1>
          <p
            className={`text-lg font-semibold ${isDarkMode ? "text-purple-200" : "text-black"}`}
          >
            {t("complete.subtitle")}
          </p>
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur border border-emerald-500/30 p-4 rounded-lg">
          <div
            className={`text-2xl font-bold ${isDarkMode ? "text-emerald-300" : "text-emerald-700"} `}
          >
            8/8
          </div>
          <div
            className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-black"}`}
          >
            {t("complete.scenariosCompleted")}
          </div>
          <div className="mt-2 text-xl flex text-emerald-400">
            <FiCheckCircle />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur border border-blue-500/30 p-4 rounded-lg">
          <div
            className={`text-2xl font-bold ${isDarkMode ? "text-blue-300" : "text-blue-600"}`}
          >
            {duration !== null
              ? t("complete.timeSpentValue", { duration })
              : "--"}
          </div>
          <div
            className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-black"}`}
          >
            {t("complete.timeSpent")}
          </div>
          <div className="mt-2 text-xl flex text-blue-400">
            <FiClock />
          </div>
        </div>
      </div>

      {/* Feedback Message */}
      <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur border border-amber-500/30 p-5 rounded-xl">
        <h3
          className={`flex items-center gap-1.5 font-bold mb-2 ${isDarkMode ? "" : "text-black"}`}
        >
          <FiSend /> {t("complete.whatsNext")}
        </h3>
        <p
          className={`text-sm mb-4 ${isDarkMode ? "text-gray-300" : "text-black"}`}
        >
          {t("complete.feedbackMessage")}
        </p>
        <div
          className={`space-y-2 text-xs ${isDarkMode ? "text-gray-400" : "text-black"}`}
        >
          <div className="flex items-center gap-1.5">
            <FiBarChart2 /> {t("complete.resultsAvailable")}
          </div>
          <div className="flex items-center gap-1.5">
            <FiMail /> {t("complete.summarySent", { email: email || "—" })}
          </div>
          <div className="flex items-center gap-1.5">
            <FiShield /> {t("complete.securelySaved")}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Link
        href="/"
        className="block w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-lg text-center transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
      >
        {t("complete.returnToDashboard")}
      </Link>
    </div>
  );
}
