import Link from "next/link";

export default function Home() {
  const candidate = { email: "alice@example.com", name: "Alice Tan" };
  const thomasUrl = "https://example.com/thomas-assess/demo";

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <section className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur border border-purple-500/30 p-5 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-purple-300 uppercase tracking-wide">
              Candidate Profile
            </div>
            <div className="text-lg font-bold mt-2">{candidate.name}</div>
            <div className="text-xs text-purple-300 mt-1">
              {candidate.email}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-purple-300 uppercase tracking-wide mb-1">
              Assessment Status
            </div>
            <div className="inline-block bg-amber-500/30 border border-amber-500/50 backdrop-blur px-3 py-1.5 rounded-full">
              <div className="text-xs font-semibold text-amber-200">
                ⏱️ In Progress
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <div>
        <h2 className="text-lg font-bold mb-4 text-white">Your Journey</h2>
        <div className="space-y-3">
          {/* Module A */}
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur border border-blue-500/30 p-5 rounded-xl overflow-hidden group hover:border-blue-500/50 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="inline-block bg-blue-500/30 px-2 py-1 rounded text-xs font-semibold text-blue-200 mb-2">
                  Module A — KNOW
                </div>
                <h3 className="font-bold text-lg mt-2">Thomas Assess</h3>
                <p className="text-sm text-gray-300 mt-1">
                  Assess your knowledge base through comprehensive evaluation
                </p>
                <div className="mt-3">
                  <div className="text-xs text-gray-400 mb-1">Progress</div>
                  <div className="w-full bg-blue-900/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full w-0"></div>
                  </div>
                </div>
              </div>
              <a
                href={thomasUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 flex-shrink-0"
              >
                Launch
              </a>
            </div>
          </div>

          {/* Module B */}
          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur border border-emerald-500/30 p-5 rounded-xl overflow-hidden group hover:border-emerald-500/50 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="inline-block bg-emerald-500/30 px-2 py-1 rounded text-xs font-semibold text-emerald-200 mb-2">
                  Module B — JUDGE
                </div>
                <h3 className="font-bold text-lg mt-2">MNext Challenge</h3>
                <p className="text-sm text-gray-300 mt-1">
                  Complete 8 situational judgment scenarios. Bilingual. Timed
                  challenges await.
                </p>
                <div className="mt-3">
                  <div className="text-xs text-gray-400 mb-1">
                    Progress: 0/8 Scenarios
                  </div>
                  <div className="w-full bg-emerald-900/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full w-0"></div>
                  </div>
                </div>
              </div>
              <Link
                href="/sjt/start"
                className="ml-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 flex-shrink-0"
              >
                Start
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
