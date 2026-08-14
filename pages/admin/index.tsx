import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiX } from "react-icons/fi";
import {
  Candidate,
  SjtResponse,
  computeStatus,
  DerivedStatus,
  getCandidates,
  getResponses,
  responsesFor,
} from "../../lib/adminStore";
import { useTheme } from "../../contexts/ThemeContext";
import { adminTheme } from "../../lib/adminTheme";

const STATUS_ORDER: DerivedStatus[] = [
  "Not Started",
  "Thomas In Progress",
  "Thomas Completed",
  "SJT In Progress",
  "SJT Completed",
  "Fully Completed",
  "Exception",
];

const STATUS_COLOR_DARK: Record<DerivedStatus, string> = {
  "Not Started": "bg-slate-700/50 text-slate-300 border-slate-600/40",
  "Thomas In Progress": "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "Thomas Completed": "bg-blue-500/25 text-blue-200 border-blue-500/40",
  "SJT In Progress": "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "SJT Completed": "bg-amber-500/25 text-amber-200 border-amber-500/40",
  "Fully Completed": "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  Exception: "bg-red-500/20 text-red-300 border-red-500/40",
};

const STATUS_COLOR_LIGHT: Record<DerivedStatus, string> = {
  "Not Started": "bg-gray-100 text-gray-600 border-gray-300",
  "Thomas In Progress": "bg-blue-50 text-blue-700 border-blue-300",
  "Thomas Completed": "bg-blue-100 text-blue-800 border-blue-400",
  "SJT In Progress": "bg-amber-50 text-amber-700 border-amber-300",
  "SJT Completed": "bg-amber-100 text-amber-800 border-amber-400",
  "Fully Completed": "bg-emerald-100 text-emerald-800 border-emerald-400",
  Exception: "bg-red-100 text-red-800 border-red-400",
};

export default function AdminMonitoring() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [responses, setResponses] = useState<SjtResponse[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DerivedStatus | "all">("all");
  const { isDarkMode } = useTheme();
  const th = adminTheme(isDarkMode);
  const STATUS_COLOR = isDarkMode ? STATUS_COLOR_DARK : STATUS_COLOR_LIGHT;

  useEffect(() => {
    setCandidates(getCandidates());
    setResponses(getResponses());
  }, []);

  const rows = useMemo(
    () =>
      candidates.map((c) => ({
        candidate: c,
        status: computeStatus(c, responses),
        answered: responsesFor(c.email, responses).length,
      })),
    [candidates, responses],
  );

  const counts = useMemo(() => {
    const map = new Map<DerivedStatus, number>();
    STATUS_ORDER.forEach((s) => map.set(s, 0));
    rows.forEach((r) => map.set(r.status, (map.get(r.status) || 0) + 1));
    return map;
  }, [rows]);

  const filtered = rows.filter((r) => {
    const matchesQuery =
      !query ||
      r.candidate.name.toLowerCase().includes(query.toLowerCase()) ||
      r.candidate.email.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Monitoring</h1>
        <p className={`text-sm mt-1 ${th.subtleText}`}>
          Live status across Thomas Assess and the MNext Challenge, keyed by candidate email.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {STATUS_ORDER.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(statusFilter === s ? "all" : s)}
            className={`text-left rounded-xl border p-3 transition-all ${STATUS_COLOR[s]} ${
              statusFilter === s ? "ring-2 ring-blue-400/60" : ""
            }`}
          >
            <div className="text-2xl font-bold">{counts.get(s) || 0}</div>
            <div className="text-[11px] mt-1 leading-tight">{s}</div>
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email…"
          className={`flex-1 ${th.input}`}
        />
        {statusFilter !== "all" && (
          <button
            onClick={() => setStatusFilter("all")}
            className={`inline-flex items-center gap-1 text-xs px-3 py-2 ${th.subtleText} hover:underline`}
          >
            Clear status filter ({statusFilter}) <FiX />
          </button>
        )}
      </div>

      <div className={`border rounded-xl overflow-hidden ${th.tableWrap}`}>
        <table className="w-full text-sm">
          <thead className={`text-xs uppercase tracking-wide ${th.tableHead}`}>
            <tr>
              <th className="text-left px-4 py-3">Candidate</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Thomas</th>
              <th className="text-left px-4 py-3">SJT Progress</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(({ candidate, status, answered }) => (
              <tr key={candidate.email} className={`border-t ${th.rowBorder} ${th.rowHover}`}>
                <td className="px-4 py-3 font-medium">
                  {candidate.name}
                  {candidate.flagged && (
                    <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                      flagged
                    </span>
                  )}
                </td>
                <td className={`px-4 py-3 ${th.subtleText}`}>{candidate.email}</td>
                <td className={`px-4 py-3 capitalize ${th.subtleText}`}>
                  {candidate.thomasStatus.replace("_", " ")}
                </td>
                <td className={`px-4 py-3 ${th.subtleText}`}>{answered} / 8</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs border ${STATUS_COLOR[status]}`}>
                    {status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/candidates/${encodeURIComponent(candidate.email)}`}
                    className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-400 font-semibold"
                  >
                    View <FiArrowRight />
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className={`px-4 py-8 text-center text-sm ${th.mutedText}`}>
                  No candidates match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
