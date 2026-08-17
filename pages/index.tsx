import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiCheckCircle, FiCircle, FiClock } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { candidateLogout, getCurrentCandidate } from "../lib/candidateAuth";
import {
  Candidate,
  computeStatus,
  getResponses,
  responsesFor,
} from "../lib/adminStore";

export default function Home() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [candidate, setCandidate] = useState<Candidate | null | undefined>(
    undefined,
  );
  const [answered, setAnswered] = useState(0);

  useEffect(() => {
    const c = getCurrentCandidate();
    if (!c) {
      router.replace("/login");
      return;
    }
    setCandidate(c);
    console.log(c);
    setAnswered(responsesFor(c.email, getResponses()).length);
  }, [router]);

  if (candidate === undefined || candidate === null) return null;

  const status = computeStatus(candidate, getResponses());
  const sjtDone = !!candidate.sjtCompletedAt || answered >= 8;
  const sjtHref = sjtDone
    ? "/sjt/complete"
    : answered > 0
      ? `/sjt/${`Q0${answered + 1}`.slice(-3).toLowerCase()}`
      : "/sjt/instructions";

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <section className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur border border-purple-500/30 p-5 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <div
              className={`text-xs ${isDarkMode ? "text-purple-300" : "text-purple-600"} uppercase tracking-wide`}
            >
              {t("home.candidateProfile")}
            </div>
            <div
              className={`text-lg font-bold mt-2 ${isDarkMode ? "" : "text-gray-900"}`}
            >
              {candidate.name}
            </div>
            <div
              className={`text-xs ${isDarkMode ? "text-purple-300" : "text-purple-600"} mt-1`}
            >
              {candidate.email}
            </div>
          </div>
          <div className="text-right">
            <div
              className={`text-xs ${isDarkMode ? "text-purple-300" : "text-purple-600"} uppercase tracking-wide mb-1`}
            >
              {t("home.assessmentStatus")}
            </div>
            <div
              className={`inline-block ${isDarkMode ? "bg-amber-500/30" : "bg-amber-200/30"} border border-amber-500/50 backdrop-blur px-3 py-1.5 rounded-full`}
            >
              <div
                className={`flex items-center gap-1 text-xs font-semibold ${isDarkMode ? "text-amber-300" : "text-amber-600"}`}
              >
                <FiClock className="shrink-0" /> {status}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <div>
        <h2
          className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
          {t("home.yourJourney")}
        </h2>
        <div className="space-y-3">
          {/* Module A */}
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur border border-blue-500/30 p-5 rounded-xl overflow-hidden group hover:border-blue-500/50 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div
                  className={`inline-block bg-blue-500/30 px-2 py-1 rounded text-xs  ${isDarkMode ? "font-semibold text-blue-200" : "font-bold text-blue-600"} mb-2`}
                >
                  {t("home.moduleALabel")}
                </div>
                <h3
                  className={`font-bold text-lg mt-2 ${isDarkMode ? "" : "text-gray-900"}`}
                >
                  {t("home.thomasAssess")}
                </h3>
                <p
                  className={`text-sm mt-1 ${isDarkMode ? "text-gray-300" : "text-black"}`}
                >
                  {t("home.moduleADesc")}
                </p>
                <div
                  className={`flex items-center gap-1 text-xs mt-2 font-semibold ${isDarkMode ? "text-blue-300" : "text-blue-700"}`}
                >
                  {candidate.thomasStatus === "completed" ? (
                    <>
                      <FiCheckCircle className="shrink-0" />{" "}
                      {t("home.completed")}
                    </>
                  ) : candidate.thomasStatus === "in_progress" ? (
                    <>
                      <FiClock className="shrink-0" /> {t("home.inProgress")}
                    </>
                  ) : (
                    <>
                      <FiCircle className="shrink-0" /> {t("home.notStarted")}
                    </>
                  )}
                </div>
              </div>
              {candidate.thomasUrl ? (
                <Link
                  href="/thomas/instructions"
                  className="ml-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 flex-shrink-0"
                >
                  {t("home.launch")}
                </Link>
              ) : (
                <span className="ml-3 text-xs text-gray-500 flex-shrink-0">
                  —
                </span>
              )}
            </div>
          </div>

          {/* Module B */}
          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur border border-emerald-500/30 p-5 rounded-xl overflow-hidden group hover:border-emerald-500/50 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div
                  className={`inline-block bg-emerald-500/30 px-2 py-1 rounded text-xs font-semibold ${isDarkMode ? "text-emerald-200" : "text-emerald-900"} mb-2`}
                >
                  {t("home.moduleBLabel")}
                </div>
                <h3
                  className={`font-bold text-lg mt-2 ${isDarkMode ? "" : "text-gray-900"}`}
                >
                  {t("home.mnextChallenge")}
                </h3>
                <p
                  className={`text-sm mt-1 ${isDarkMode ? "text-gray-300" : "text-black"}`}
                >
                  {t("home.moduleBDesc")}
                </p>
                <div
                  className={`flex items-center gap-1 text-xs mt-2 font-semibold ${isDarkMode ? "text-emerald-300" : "text-emerald-800"}`}
                >
                  {sjtDone ? (
                    <>
                      <FiCheckCircle className="shrink-0" />{" "}
                      {t("home.completed")}
                    </>
                  ) : (
                    `${answered}/8 ${t("start.scenarios")}`
                  )}
                </div>
              </div>
              <Link
                href={sjtHref}
                className="ml-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 flex-shrink-0"
              >
                {sjtDone
                  ? t("home.completed")
                  : answered > 0
                    ? t("home.continue")
                    : t("home.start")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          candidateLogout();
          router.replace("/login");
        }}
        className={`text-xs font-semibold ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}
      >
        {t("home.logout")}
      </button>
    </div>
  );
}
