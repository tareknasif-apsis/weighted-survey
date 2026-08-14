import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import scenarios from "../../../data/scenarios";
import {
  Candidate,
  SjtResponse,
  ThomasStatus,
  computeCompetencyScores,
  computeStatus,
  generateAiSummary,
  getCandidates,
  getCompetencies,
  getDeclarationAudit,
  getResponses,
  responsesFor,
  saveCandidates,
  thomasSummary,
} from "../../../lib/adminStore";
import { useTheme } from "../../../contexts/ThemeContext";
import { adminTheme, AdminThemeTokens } from "../../../lib/adminTheme";

export default function CandidateDetail() {
  const router = useRouter();
  const email = typeof router.query.email === "string" ? decodeURIComponent(router.query.email) : "";
  const { isDarkMode } = useTheme();
  const th = adminTheme(isDarkMode);

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [responses, setResponses] = useState<SjtResponse[]>([]);

  useEffect(() => {
    setCandidates(getCandidates());
    setResponses(getResponses());
  }, []);

  const candidate = candidates.find((c) => c.email.toLowerCase() === email.toLowerCase());
  const mine = useMemo(() => responsesFor(email, responses), [email, responses]);
  const scoreSummary = useMemo(() => computeCompetencyScores(email, { responses }), [email, responses]);
  const competencies = getCompetencies();
  const auditEntry = getDeclarationAudit().find((a) => a.email.toLowerCase() === email.toLowerCase());
  const aiSummary = useMemo(
    () => (candidate ? generateAiSummary(email, { responses }) : ""),
    [email, responses, candidate],
  );

  function updateCandidate(patch: Partial<Candidate>) {
    const next = candidates.map((c) => (c.email.toLowerCase() === email.toLowerCase() ? { ...c, ...patch } : c));
    setCandidates(next);
    saveCandidates(next);
  }

  if (!candidate) {
    return (
      <div className="space-y-4">
        <Link
          href="/admin/candidates"
          className="inline-flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-400"
        >
          <FiArrowLeft /> Back to candidates
        </Link>
        <div className={`text-sm ${th.subtleText}`}>Candidate not found: {email}</div>
      </div>
    );
  }

  const status = computeStatus(candidate, responses);

  return (
    <div className="space-y-6">
      <Link
        href="/admin/candidates"
        className="inline-flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-400"
      >
        <FiArrowLeft /> Back to candidates
      </Link>

      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">{candidate.name}</h1>
          <p className={`text-sm ${th.subtleText}`}>{candidate.email}</p>
        </div>
        <span className={`inline-block px-3 py-1.5 rounded-full text-xs border ${th.pill}`}>{status}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Profile */}
        <section className={`border rounded-xl p-5 space-y-2 text-sm ${th.card}`}>
          <h2 className="font-bold mb-2">Profile</h2>
          <Row th={th} label="Mobile" value={candidate.mobile || "—"} />
          <Row th={th} label="Batch" value={candidate.batch || "—"} />
          <Row th={th} label="Language" value={candidate.language.toUpperCase()} />
          <Row th={th} label="Access token" value={candidate.accessToken} mono />
          <Row th={th} label="Created" value={new Date(candidate.createdAt).toLocaleString()} />
        </section>

        {/* Declaration */}
        <section className={`border rounded-xl p-5 space-y-2 text-sm ${th.card}`}>
          <h2 className="font-bold mb-2">Integrity Declaration</h2>
          <Row th={th} label="Accepted" value={candidate.declarationAccepted ? "Yes" : "No"} />
          {auditEntry && (
            <>
              <Row th={th} label="Version" value={auditEntry.version} />
              <Row th={th} label="Accepted at" value={new Date(auditEntry.acceptedAt).toLocaleString()} />
            </>
          )}
        </section>

        {/* Thomas */}
        <section className={`border rounded-xl p-5 space-y-3 text-sm ${th.card}`}>
          <h2 className="font-bold">Thomas Assess</h2>
          <div>
            <label className={`block text-xs font-semibold mb-1 ${th.subtleText}`}>Thomas URL</label>
            <input
              defaultValue={candidate.thomasUrl || ""}
              onBlur={(e) => updateCandidate({ thomasUrl: e.target.value.trim() || undefined })}
              className={th.input}
            />
          </div>
          <div>
            <label className={`block text-xs font-semibold mb-1 ${th.subtleText}`}>Status</label>
            <select
              value={candidate.thomasStatus}
              onChange={(e) => {
                const value = e.target.value as ThomasStatus;
                updateCandidate({
                  thomasStatus: value,
                  thomasCompletedAt: value === "completed" ? new Date().toISOString() : undefined,
                });
              }}
              className={th.input}
            >
              <option value="not_started">Not started</option>
              <option value="in_progress">In progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          {candidate.thomasCompletedAt && (
            <Row th={th} label="Completed at" value={new Date(candidate.thomasCompletedAt).toLocaleString()} />
          )}
          <div className={`pt-2 border-t ${isDarkMode ? "border-slate-800" : "border-gray-200"}`}>
            <div className={`text-[11px] font-semibold uppercase tracking-wide mb-1 ${th.mutedText}`}>
              Thomas tool summary
            </div>
            <p className={`text-xs leading-relaxed ${th.subtleText}`}>{thomasSummary(candidate)}</p>
          </div>
        </section>

        {/* Integrity flags */}
        <section className={`border rounded-xl p-5 space-y-2 text-sm ${th.card}`}>
          <h2 className="font-bold mb-2">Integrity indicators (review signals only)</h2>
          <Row th={th} label="Tab / focus changes" value={String(mine.reduce((a, r) => a + r.tabChanges, 0))} />
          <Row th={th} label="Reconnects" value={String(mine.reduce((a, r) => a + r.reconnects, 0))} />
          <label className={`flex items-center gap-2 pt-2 text-xs ${th.subtleText}`}>
            <input
              type="checkbox"
              checked={!!candidate.flagged}
              onChange={(e) => updateCandidate({ flagged: e.target.checked })}
              className="accent-red-400"
            />
            Flag for manual review
          </label>
        </section>
      </div>

      {/* Competency scores */}
      <section className={`border rounded-xl p-5 ${th.card}`}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold">MNext Challenge — Scoring</h2>
          <div className="text-sm">
            Overall: <span className="font-bold">{scoreSummary.overallAverage ?? "—"}</span>{" "}
            <span className={`text-xs ${th.mutedText}`}>(hidden from candidate)</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {scoreSummary.competencies.map((cs) => {
            const def = competencies.find((c) => c.id === cs.competencyId);
            return (
              <div key={cs.competencyId} className={`border rounded-lg p-3 ${th.cardMuted}`}>
                <div className="flex justify-between items-start">
                  <div className="text-sm font-semibold">{def?.name || cs.competencyId}</div>
                  <div className="text-lg font-bold">{cs.evidenceCount ? cs.average : "—"}</div>
                </div>
                <div className={`text-[11px] mt-1 ${th.mutedText}`}>
                  {cs.evidenceCount} evidence point{cs.evidenceCount === 1 ? "" : "s"}
                  {!cs.robust && cs.evidenceCount > 0 && (
                    <span className="text-amber-500"> · below minimum threshold</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI-generated summary */}
      <section
        className={`rounded-xl p-5 border ${
          isDarkMode
            ? "bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/30"
            : "bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-300"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold flex items-center gap-2">
            <HiSparkles /> AI-generated summary
          </h2>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full border ${
              isDarkMode
                ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                : "bg-indigo-100 text-indigo-700 border-indigo-300"
            }`}
          >
            Prototype — heuristic, not a live LLM call
          </span>
        </div>
        <p className={`text-sm leading-relaxed ${th.subtleText}`}>{aiSummary}</p>
      </section>

      {/* Answers */}
      <section className={`border rounded-xl p-5 ${th.card}`}>
        <h2 className="font-bold mb-3">Scenario responses ({mine.length} / 8)</h2>
        <div className="space-y-3">
          {scenarios.map((s) => {
            const r = mine.find((x) => x.scenarioId === s.id);
            const option = r ? s.options.find((o) => o.id === r.answerId) : undefined;
            return (
              <div key={s.id} className={`border rounded-lg p-3 text-sm ${isDarkMode ? "border-slate-800" : "border-gray-200"}`}>
                <div className={`text-xs mb-1 ${th.mutedText}`}>{s.id}</div>
                <div className={`mb-2 ${th.subtleText}`}>{s.scenario_text_en}</div>
                {r ? (
                  <>
                    <div className="text-emerald-500 text-sm">
                      Selected: <span className="font-semibold">{r.answerId}</span> — {option?.text_en}
                    </div>
                    {r.comment && (
                      <div className={`text-xs mt-1 italic ${th.subtleText}`}>
                        Candidate comment: “{r.comment}”
                      </div>
                    )}
                    <div className={`text-[11px] mt-1 ${th.mutedText}`}>
                      Response time: {r.responseTimeSec}s · Tab changes: {r.tabChanges}
                    </div>
                  </>
                ) : (
                  <div className={`text-xs ${th.mutedText}`}>Not answered yet.</div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Row({
  th,
  label,
  value,
  mono,
}: {
  th: AdminThemeTokens;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex justify-between gap-3">
      <span className={th.mutedText}>{label}</span>
      <span className={mono ? `font-mono text-xs ${th.subtleText}` : ""}>{value}</span>
    </div>
  );
}
