import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { MdOutlinePsychology } from "react-icons/md";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { getCurrentCandidate } from "../../lib/candidateAuth";
import { Candidate } from "../../lib/adminStore";

export default function ThomasInstructions() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [candidate, setCandidate] = useState<Candidate | null | undefined>(undefined);

  useEffect(() => {
    const c = getCurrentCandidate();
    if (!c) {
      router.replace("/login");
      return;
    }
    setCandidate(c);
  }, [router]);

  if (candidate === undefined || candidate === null) return null;

  return (
    <div className="space-y-6">
      <div
        className={`backdrop-blur border p-6 rounded-xl ${
          isDarkMode
            ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30"
            : "bg-gradient-to-br from-blue-300/20 to-cyan-300/20 border-blue-400/40"
        }`}
      >
        <div className={`text-3xl mb-3 flex justify-center ${isDarkMode ? "text-white" : "text-black"}`}>
          <MdOutlinePsychology />
        </div>
        <h1
          className={`text-xl font-bold mb-4 text-center ${isDarkMode ? "text-white" : "text-black"}`}
        >
          {t("thomasInfo.title")}
        </h1>
        <div
          className={`space-y-3 text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-black"}`}
        >
          <p>{t("thomasInfo.p1")}</p>
          <p>{t("thomasInfo.p2")}</p>
          <p>{t("thomasInfo.p3")}</p>
        </div>
      </div>

      {candidate.thomasUrl ? (
        <a
          href={candidate.thomasUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 px-6 rounded-lg font-bold text-lg transition-all transform bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 hover:scale-105 shadow-lg shadow-blue-500/30 inline-flex items-center justify-center gap-2"
        >
          {t("thomasInfo.launch")} <FiExternalLink />
        </a>
      ) : (
        <p className={`text-sm text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          {t("thomasInfo.noLink")}
        </p>
      )}

      <Link
        href="/"
        className={`block text-center text-xs font-semibold ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}
      >
        {t("thomasInfo.back")}
      </Link>
    </div>
  );
}
