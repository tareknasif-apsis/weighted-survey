import { useState } from "react";
import { useRouter } from "next/router";
import { FiKey } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { candidateLogin } from "../lib/candidateAuth";

export default function CandidateLogin() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const candidate = candidateLogin(identifier);
    if (!candidate) {
      setError(t("login.error"));
      return;
    }
    router.push("/");
  }

  return (
    <div className="space-y-6">
      <div
        className={`backdrop-blur rounded-xl p-6 border text-center ${
          isDarkMode
            ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30"
            : "bg-gradient-to-r from-blue-300/20 to-orange-300/20 border-blue-400/40"
        }`}
      >
        <div className={`text-3xl mb-2 flex justify-center ${isDarkMode ? "text-white" : "text-black"}`}>
          <FiKey />
        </div>
        <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>
          {t("login.title")}
        </h2>
        <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-black"}`}>{t("login.subtitle")}</p>
      </div>

      <form
        onSubmit={onSubmit}
        className={`backdrop-blur border p-5 rounded-xl space-y-4 ${
          isDarkMode ? "bg-slate-700/20 border-slate-600/30" : "bg-blue-200/20 border-blue-300/40"
        }`}
      >
        {error && (
          <div
            className={`text-sm rounded-lg px-3 py-2 border ${
              isDarkMode
                ? "text-red-300 bg-red-500/10 border-red-500/30"
                : "text-red-700 bg-red-100 border-red-300"
            }`}
          >
            {error}
          </div>
        )}
        <div>
          <label
            className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-100" : "text-black"}`}
          >
            {t("login.identifierLabel")}
          </label>
          <input
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder={t("login.identifierPlaceholder")}
            autoFocus
            className={`w-full backdrop-blur border rounded-lg p-3 transition-all ${
              isDarkMode
                ? "bg-slate-700/30 border-slate-600/30 text-gray-100 placeholder-gray-500 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30"
                : "bg-white/60 border-blue-300/40 text-black placeholder-gray-600 focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/30"
            }`}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 rounded-lg font-bold transition-all transform bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 hover:scale-105 shadow-lg shadow-emerald-500/30"
        >
          {t("login.submit")}
        </button>
        <p className={`text-xs text-center ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>
          {t("login.hint")}
        </p>
      </form>
    </div>
  );
}
