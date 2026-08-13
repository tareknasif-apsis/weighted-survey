import Link from "next/link";

export default function Complete() {
  const started =
    typeof window !== "undefined"
      ? localStorage.getItem("mnext_attempt_started")
      : null;

  const duration = started
    ? Math.round((Date.now() - new Date(started).getTime()) / 1000 / 60)
    : null;

  return (
    <div className="space-y-6">
      {/* Celebration Banner */}
      <div className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur border-2 border-purple-500/50 rounded-xl p-8 text-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-2 left-4 text-3xl animate-bounce">
            ⭐
          </div>
          <div
            className="absolute top-8 right-6 text-3xl animate-bounce"
            style={{ animationDelay: "0.1s" }}
          >
            🎉
          </div>
          <div
            className="absolute bottom-4 left-8 text-3xl animate-bounce"
            style={{ animationDelay: "0.2s" }}
          >
            ✨
          </div>
        </div>
        <div className="relative z-10">
          <div className="text-5xl mb-4">🏆</div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            Challenge Complete!
          </h1>
          <p className="text-lg text-purple-200 font-semibold">
            Outstanding Performance
          </p>
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur border border-emerald-500/30 p-4 rounded-lg">
          <div className="text-2xl font-bold text-emerald-300">8/8</div>
          <div className="text-xs text-gray-400 mt-1">Scenarios Completed</div>
          <div className="mt-2 text-xl">✅</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur border border-blue-500/30 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-300">
            {duration || "--"} min
          </div>
          <div className="text-xs text-gray-400 mt-1">Time Spent</div>
          <div className="mt-2 text-xl">⏱️</div>
        </div>
      </div>

      {/* Badges Earned */}
      {/* <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur border border-indigo-500/30 p-5 rounded-xl">
        <h3 className="font-bold text-lg mb-4">🎖️ Achievements Unlocked</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
            <div className="text-2xl">⚡</div>
            <div>
              <div className="font-semibold text-sm">Challenge Master</div>
              <div className="text-xs text-gray-400">
                Completed all scenarios
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
            <div className="text-2xl">🌍</div>
            <div>
              <div className="font-semibold text-sm">Bilingual Navigator</div>
              <div className="text-xs text-gray-400">
                Assessed in multiple languages
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
            <div className="text-2xl">🎯</div>
            <div>
              <div className="font-semibold text-sm">Swift Decision Maker</div>
              <div className="text-xs text-gray-400">
                Completed within time limits
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Feedback Message */}
      <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur border border-amber-500/30 p-5 rounded-xl">
        <h3 className="font-bold mb-2">✨ What's Next?</h3>
        <p className="text-sm text-gray-300 mb-4">
          Your comprehensive assessment has been recorded. Your responses
          demonstrate your situational judgment and decision-making
          capabilities. Our evaluation team will review your answers to provide
          detailed insights.
        </p>
        <div className="space-y-2 text-xs text-gray-400">
          <div>📊 Detailed results will be available within 48 hours</div>
          <div>📧 A summary will be sent to: alice@example.com</div>
          <div>🔐 All your answers have been securely saved</div>
        </div>
      </div>

      {/* Action Button */}
      <Link
        href="/"
        className="block w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-lg text-center transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
