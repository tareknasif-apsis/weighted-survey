import { useState } from "react";
import { useRouter } from "next/router";
import { FiMoon, FiSun } from "react-icons/fi";
import { login } from "../../lib/adminAuth";
import { useTheme } from "../../contexts/ThemeContext";
import { adminTheme } from "../../lib/adminTheme";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isDarkMode, toggleTheme } = useTheme();
  const th = adminTheme(isDarkMode);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const session = login(username, password);
    if (!session) {
      setError("Invalid username or password.");
      return;
    }
    router.replace("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={`absolute top-4 right-4 text-xs px-3 py-2 rounded-lg transition-colors ${
          isDarkMode
            ? "bg-slate-800/60 hover:bg-slate-800 text-slate-300"
            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        }`}
      >
        {isDarkMode ? (
          <span className="flex items-center gap-1.5">
            <FiMoon /> Dark
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            <FiSun /> Light
          </span>
        )}
      </button>

      <form
        onSubmit={onSubmit}
        className={`w-full max-w-sm rounded-xl p-8 space-y-5 border ${th.card}`}
      >
        <div>
          <div className="text-xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            MNEXT Admin
          </div>
          <div className={`text-sm mt-1 ${th.subtleText}`}>
            MNext Challenge platform administration
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <div>
          <label
            className={`block text-xs font-semibold mb-1.5 ${th.subtleText}`}
          >
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={th.input}
            placeholder="admin"
            autoFocus
          />
        </div>
        <div>
          <label
            className={`block text-xs font-semibold mb-1.5 ${th.subtleText}`}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={th.input}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg font-semibold text-sm bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 transition-all text-white"
        >
          Sign in
        </button>

        <div
          className={`text-[11px] pt-2 border-t ${isDarkMode ? "border-slate-800 text-slate-500" : "border-gray-200 text-gray-500"}`}
        >
          Demo credentials — Super Admin:{" "}
          <span className={isDarkMode ? "text-slate-400" : "text-gray-600"}>
            admin / admin123
          </span>
          <br />
          Reviewer:{" "}
          <span className={isDarkMode ? "text-slate-400" : "text-gray-600"}>
            reviewer / reviewer123
          </span>
        </div>
      </form>
    </div>
  );
}
