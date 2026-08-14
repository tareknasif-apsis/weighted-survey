import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import scenarios from "../../data/scenarios";
import {
  Candidate,
  SjtResponse,
  computeCompetencyScores,
  downloadCsv,
  getCandidates,
  getCompetencies,
  getResponses,
  responsesFor,
  toCsv,
} from "../../lib/adminStore";
import { useTheme } from "../../contexts/ThemeContext";
import { adminTheme } from "../../lib/adminTheme";

export default function ResultsPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [responses, setResponses] = useState<SjtResponse[]>([]);
  const competencies = getCompetencies();
  const { isDarkMode } = useTheme();
  const th = adminTheme(isDarkMode);

  useEffect(() => {
    setCandidates(getCandidates());
    setResponses(getResponses());
  }, []);

  const rows = useMemo(
    () =>
      candidates
        .map((c) => {
          const mine = responsesFor(c.email, responses);
          const summary = computeCompetencyScores(c.email, { responses });
          return { candidate: c, answered: mine.length, summary };
        })
        .filter((r) => r.answered > 0),
    [candidates, responses],
  );

  function onExport() {
    const header = [
      "Email",
      "Name",
      "Language",
      "Answered",
      "Overall",
      ...competencies.map((c) => c.name),
      ...scenarios.map((s) => `${s.id} Answer`),
      ...scenarios.map((s) => `${s.id} Comment`),
    ];
    const rowsCsv: (string | number)[][] = [header];
    rows.forEach(({ candidate, answered, summary }) => {
      const mine = responsesFor(candidate.email, responses);
      const answerCells = scenarios.map((s) => mine.find((r) => r.scenarioId === s.id)?.answerId || "");
      const commentCells = scenarios.map((s) => mine.find((r) => r.scenarioId === s.id)?.comment || "");
      rowsCsv.push([
        candidate.email,
        candidate.name,
        candidate.language,
        answered,
        summary.overallAverage ?? "",
        ...competencies.map((c) => {
          const cs = summary.competencies.find((x) => x.competencyId === c.id);
          return cs?.evidenceCount ? cs.average : "";
        }),
        ...answerCells,
        ...commentCells,
      ]);
    });
    downloadCsv("mnext_results.csv", toCsv(rowsCsv));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Results</h1>
          <p className={`text-sm mt-1 ${th.subtleText}`}>
            Overall + competency scores are hidden from candidates and shown here for review only.
          </p>
        </div>
        <button onClick={onExport} className={`${th.btnPrimary} inline-flex items-center gap-1.5`}>
          <FiDownload /> Export results CSV
        </button>
      </div>

      <div className={`border rounded-xl overflow-x-auto ${th.tableWrap}`}>
        <table className="w-full text-sm min-w-[1100px]">
          <thead className={`text-xs uppercase tracking-wide ${th.tableHead}`}>
            <tr>
              <th className="text-left px-4 py-3">Candidate</th>
              <th className="text-left px-4 py-3">Answered</th>
              <th className="text-left px-4 py-3">Overall</th>
              {competencies.map((c) => (
                <th key={c.id} className="text-left px-4 py-3 w-[120px] normal-case leading-snug">
                  {c.name}
                </th>
              ))}
              <th className="text-right px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ candidate, answered, summary }) => (
              <tr key={candidate.email} className={`border-t ${th.rowBorder} ${th.rowHover}`}>
                <td className="px-4 py-3">
                  <div className="font-medium">{candidate.name}</div>
                  <div className={`text-xs ${th.mutedText}`}>{candidate.email}</div>
                </td>
                <td className={`px-4 py-3 ${th.subtleText}`}>{answered} / 8</td>
                <td className="px-4 py-3 font-bold">{summary.overallAverage ?? "—"}</td>
                {competencies.map((c) => {
                  const cs = summary.competencies.find((x) => x.competencyId === c.id);
                  return (
                    <td key={c.id} className={`px-4 py-3 ${th.subtleText}`}>
                      {cs?.evidenceCount ? (
                        <span title={`${cs.evidenceCount} evidence point(s)`}>
                          {cs.average}
                          {!cs.robust && <span className="text-amber-500 ml-1">*</span>}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                  );
                })}
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/candidates/${encodeURIComponent(candidate.email)}`}
                    className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-400 font-semibold"
                  >
                    Details <FiArrowRight />
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4 + competencies.length} className={`px-4 py-8 text-center text-sm ${th.mutedText}`}>
                  No SJT responses recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className={`text-[11px] ${th.mutedText}`}>
        * below the configured minimum evidence threshold — treat with caution. Configure the threshold under
        Content &amp; Scoring.
      </p>
    </div>
  );
}
