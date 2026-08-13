import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import scenarios from "../../data/scenarios";

export default function Start() {
  const router = useRouter();
  const [lang, setLang] = useState<"en" | "ms">("en");
  const [accepted, setAccepted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("mnext_language");
    if (stored === "en" || stored === "ms") setLang(stored);

    const theme = localStorage.getItem("mnext_theme");
    setIsDarkMode(theme !== "light");
  }, []);

  function onStart() {
    if (!accepted) return alert("Please accept the declaration");
    localStorage.setItem("mnext_language", lang);

    // Clear old responses and orders from previous attempts
    scenarios.forEach((scenario) => {
      localStorage.removeItem(`resp_${scenario.id}`);
      localStorage.removeItem(`order_${scenario.id}`);
    });

    localStorage.setItem("mnext_attempt_started", new Date().toISOString());
    const first = scenarios && scenarios.length ? scenarios[0].id : "Q01";
    router.push(`/sjt/${first.toLowerCase()}`);
  }

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div
        className={`backdrop-blur rounded-xl p-5 border ${
          isDarkMode
            ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30"
            : "bg-gradient-to-r from-blue-300/20 to-orange-300/20 border-blue-400/40"
        }`}
      >
        <div className="text-center">
          <div className="text-3xl mb-2">🎮</div>
          <h2
            className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}
          >
            Ready for the Challenge?
          </h2>
          <p
            className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            You're about to face 8 scenarios that will test your judgment and
            decision-making skills. Stay focused and trust your instincts!
          </p>
        </div>
      </div>

      {/* Language Selection */}
      <div
        className={`backdrop-blur border p-5 rounded-xl ${
          isDarkMode
            ? "bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-blue-500/30"
            : "bg-gradient-to-br from-blue-300/20 to-cyan-300/20 border-blue-400/40"
        }`}
      >
        <h3
          className={`font-bold text-lg mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}
        >
          Select Your Language / Pilih Bahasa
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setLang("en")}
            className={`p-4 rounded-lg font-semibold transition-all ${
              lang === "en"
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-2 border-blue-300 shadow-lg shadow-blue-500/30"
                : isDarkMode
                  ? "bg-slate-700/40 text-gray-300 border-2 border-slate-600/30 hover:border-blue-500/30"
                  : "bg-blue-200/30 text-gray-800 border-2 border-blue-300/30 hover:border-blue-400/60"
            }`}
          >
            🇬🇧 English
          </button>
          <button
            onClick={() => setLang("ms")}
            className={`p-4 rounded-lg font-semibold transition-all ${
              lang === "ms"
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30"
                : isDarkMode
                  ? "bg-slate-700/40 text-gray-300 border-2 border-slate-600/30 hover:border-orange-500/30"
                  : "bg-orange-200/30 text-gray-800 border-2 border-orange-300/30 hover:border-orange-400/60"
            }`}
          >
            🇲🇾 Bahasa Melayu
          </button>
        </div>
      </div>

      {/* Declaration */}
      <div
        className={`backdrop-blur border p-5 rounded-xl ${
          isDarkMode
            ? "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/30"
            : "bg-gradient-to-br from-orange-300/20 to-yellow-300/20 border-orange-400/40"
        }`}
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="text-2xl mt-1">⚖️</div>
          <div>
            <h3
              className={`font-bold text-lg ${isDarkMode ? "text-white" : "text-gray-800"}`}
            >
              Integrity Declaration
            </h3>
            <p
              className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Please confirm before proceeding
            </p>
          </div>
        </div>
        <p
          className={`text-sm mb-4 leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
        >
          I confirm that I will complete the MNext assessments independently and
          will not use generative AI tools, chatbots, another person, or any
          other external source to assist me. I understand that honesty is
          essential for accurate assessment.
        </p>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="w-5 h-5 rounded border-2 border-amber-500/50 cursor-pointer accent-amber-500"
          />
          <span
            className={`text-sm font-semibold transition-colors ${
              isDarkMode
                ? "text-amber-200 group-hover:text-amber-100"
                : "text-amber-700 group-hover:text-amber-600"
            }`}
          >
            I agree to this declaration
          </span>
        </label>
      </div>

      {/* Start Button */}
      <button
        onClick={onStart}
        disabled={!accepted}
        className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all transform ${
          accepted
            ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 hover:scale-105 shadow-lg shadow-emerald-500/30"
            : isDarkMode
              ? "bg-slate-700/40 text-gray-500 cursor-not-allowed"
              : "bg-blue-200/30 text-gray-500 cursor-not-allowed"
        }`}
      >
        {accepted ? "🚀 Begin the Challenge" : "✓ Accept to Continue"}
      </button>

      {/* Challenge Info */}
      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        <div
          className={`backdrop-blur p-3 rounded-lg border transition-all ${
            isDarkMode
              ? "bg-slate-700/30 border-slate-600/30"
              : "bg-blue-300/30 border-blue-400/40"
          }`}
        >
          <div className="text-2xl mb-1">8</div>
          <div className={isDarkMode ? "text-gray-400" : "text-gray-800"}>
            Scenarios
          </div>
        </div>
        <div
          className={`backdrop-blur p-3 rounded-lg border transition-all ${
            isDarkMode
              ? "bg-slate-700/30 border-slate-600/30"
              : "bg-blue-300/30 border-blue-400/40"
          }`}
        >
          <div className="text-2xl mb-1">⏱️</div>
          <div className={isDarkMode ? "text-gray-400" : "text-gray-800"}>
            Timed
          </div>
        </div>
        <div
          className={`backdrop-blur p-3 rounded-lg border transition-all ${
            isDarkMode
              ? "bg-slate-700/30 border-slate-600/30"
              : "bg-blue-300/30 border-blue-400/40"
          }`}
        >
          <div className="text-2xl mb-1">🌐</div>
          <div className={isDarkMode ? "text-gray-400" : "text-gray-800"}>
            Bilingual
          </div>
        </div>
      </div>
    </div>
  );
}
