import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FiDownload, FiPlus, FiUpload, FiX } from "react-icons/fi";
import {
  Candidate,
  computeStatus,
  downloadCsv,
  genToken,
  getCandidates,
  getResponses,
  parseCsv,
  saveCandidates,
  toCsv,
} from "../../../lib/adminStore";
import { useTheme } from "../../../contexts/ThemeContext";
import { adminTheme } from "../../../lib/adminTheme";

const EMPTY_FORM = {
  email: "",
  name: "",
  mobile: "",
  batch: "",
  language: "en" as "en" | "ms",
  thomasUrl: "",
};

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [importSummary, setImportSummary] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { isDarkMode } = useTheme();
  const th = adminTheme(isDarkMode);

  useEffect(() => {
    setCandidates(getCandidates());
  }, []);

  function persist(list: Candidate[]) {
    setCandidates(list);
    saveCandidates(list);
  }

  const filtered = useMemo(
    () =>
      candidates.filter(
        (c) =>
          !query ||
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.email.toLowerCase().includes(query.toLowerCase()),
      ),
    [candidates, query],
  );

  function openCreate() {
    setEditingEmail(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEdit(c: Candidate) {
    setEditingEmail(c.email);
    setForm({
      email: c.email,
      name: c.name,
      mobile: c.mobile || "",
      batch: c.batch || "",
      language: c.language,
      thomasUrl: c.thomasUrl || "",
    });
    setShowForm(true);
  }

  function onSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    const email = form.email.trim().toLowerCase();
    if (!email || !form.name.trim()) return;

    const duplicate = candidates.some(
      (c) => c.email.toLowerCase() === email && c.email.toLowerCase() !== editingEmail?.toLowerCase(),
    );
    if (duplicate) {
      alert(`A candidate with email "${email}" already exists. Emails must be unique.`);
      return;
    }

    if (editingEmail) {
      persist(
        candidates.map((c) =>
          c.email.toLowerCase() === editingEmail.toLowerCase()
            ? {
                ...c,
                email,
                name: form.name.trim(),
                mobile: form.mobile.trim() || undefined,
                batch: form.batch.trim() || undefined,
                language: form.language,
                thomasUrl: form.thomasUrl.trim() || undefined,
              }
            : c,
        ),
      );
    } else {
      const newCandidate: Candidate = {
        email,
        name: form.name.trim(),
        mobile: form.mobile.trim() || undefined,
        batch: form.batch.trim() || undefined,
        language: form.language,
        thomasUrl: form.thomasUrl.trim() || undefined,
        accessToken: genToken(form.name),
        createdAt: new Date().toISOString(),
        thomasStatus: "not_started",
        declarationAccepted: false,
      };
      persist([...candidates, newCandidate]);
    }
    setShowForm(false);
  }

  function reissueLink(email: string) {
    persist(
      candidates.map((c) =>
        c.email.toLowerCase() === email.toLowerCase() ? { ...c, accessToken: genToken(c.name) } : c,
      ),
    );
  }

  function resetAssessment(email: string) {
    if (!confirm(`Reset Thomas + SJT progress for ${email}? This clears their declaration acceptance too.`))
      return;
    persist(
      candidates.map((c) =>
        c.email.toLowerCase() === email.toLowerCase()
          ? {
              ...c,
              thomasStatus: "not_started",
              thomasCompletedAt: undefined,
              declarationAccepted: false,
              declarationAcceptedAt: undefined,
              sjtStartedAt: undefined,
              sjtCompletedAt: undefined,
            }
          : c,
      ),
    );
  }

  function removeCandidate(email: string) {
    if (!confirm(`Remove ${email} from the candidate list?`)) return;
    persist(candidates.filter((c) => c.email.toLowerCase() !== email.toLowerCase()));
  }

  function onExport() {
    const responses = getResponses();
    const rows: (string | number)[][] = [
      ["Email", "Name", "Batch", "Language", "Thomas Status", "Status", "SJT Answered"],
    ];
    candidates.forEach((c) => {
      const status = computeStatus(c, responses);
      const answered = responses.filter((r) => r.candidateEmail.toLowerCase() === c.email.toLowerCase()).length;
      rows.push([c.email, c.name, c.batch || "", c.language, c.thomasStatus, status, answered]);
    });
    downloadCsv("mnext_candidates.csv", toCsv(rows));
  }

  function onImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      const rows = parseCsv(text);
      if (!rows.length) return;
      const header = rows[0].map((h) => h.trim().toLowerCase());
      const idx = {
        email: header.indexOf("email"),
        name: header.indexOf("name"),
        mobile: header.indexOf("mobile"),
        batch: header.indexOf("batch"),
        language: header.indexOf("language"),
        thomasUrl: header.indexOf("thomasurl"),
      };
      if (idx.email === -1 || idx.name === -1) {
        setImportSummary("Import failed: CSV must include at least 'email' and 'name' columns.");
        return;
      }

      let added = 0;
      let skipped = 0;
      const existingEmails = new Set(candidates.map((c) => c.email.toLowerCase()));
      const next = [...candidates];

      rows.slice(1).forEach((r) => {
        const email = (r[idx.email] || "").trim().toLowerCase();
        const name = (r[idx.name] || "").trim();
        if (!email || !name) {
          skipped++;
          return;
        }
        if (existingEmails.has(email)) {
          skipped++;
          return;
        }
        existingEmails.add(email);
        next.push({
          email,
          name,
          mobile: idx.mobile !== -1 ? r[idx.mobile]?.trim() || undefined : undefined,
          batch: idx.batch !== -1 ? r[idx.batch]?.trim() || undefined : undefined,
          language: idx.language !== -1 && r[idx.language]?.trim().toLowerCase() === "ms" ? "ms" : "en",
          thomasUrl: idx.thomasUrl !== -1 ? r[idx.thomasUrl]?.trim() || undefined : undefined,
          accessToken: genToken(name),
          createdAt: new Date().toISOString(),
          thomasStatus: "not_started",
          declarationAccepted: false,
        });
        added++;
      });

      persist(next);
      setImportSummary(
        `Imported ${added} candidate${added === 1 ? "" : "s"}. Skipped ${skipped} (duplicate email or missing required field).`,
      );
      if (fileRef.current) fileRef.current.value = "";
    };
    reader.readAsText(file);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Candidates</h1>
          <p className={`text-sm mt-1 ${th.subtleText}`}>
            Email is the unique identifier across Thomas and the MNext Challenge.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <label className={`${th.btnSecondary} cursor-pointer inline-flex items-center gap-1.5`}>
            <FiUpload /> Bulk import CSV
            <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={onImportFile} />
          </label>
          <button onClick={onExport} className={`${th.btnSecondary} inline-flex items-center gap-1.5`}>
            <FiDownload /> Export CSV
          </button>
          <button onClick={openCreate} className={`${th.btnPrimary} inline-flex items-center gap-1.5`}>
            <FiPlus /> Add candidate
          </button>
        </div>
      </div>

      {importSummary && (
        <div className="text-sm bg-blue-500/10 border border-blue-500/30 rounded-lg px-4 py-3 text-blue-500 flex justify-between items-center">
          {importSummary}
          <button onClick={() => setImportSummary(null)} className="hover:opacity-70 ml-4">
            <FiX />
          </button>
        </div>
      )}
      <p className={`text-xs -mt-2 ${th.mutedText}`}>
        CSV columns: email, name, mobile, batch, language (en/ms), thomasUrl.
      </p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or email…"
        className={`w-full sm:w-96 ${th.input}`}
      />

      <div className={`border rounded-xl overflow-hidden ${th.tableWrap}`}>
        <table className="w-full text-sm">
          <thead className={`text-xs uppercase tracking-wide ${th.tableHead}`}>
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Batch</th>
              <th className="text-left px-4 py-3">Lang</th>
              <th className="text-left px-4 py-3">Access token</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.email} className={`border-t ${th.rowBorder} ${th.rowHover}`}>
                <td className="px-4 py-3 font-medium">
                  <Link href={`/admin/candidates/${encodeURIComponent(c.email)}`} className="hover:text-blue-500">
                    {c.name}
                  </Link>
                </td>
                <td className={`px-4 py-3 ${th.subtleText}`}>{c.email}</td>
                <td className={`px-4 py-3 ${th.subtleText}`}>{c.batch || "—"}</td>
                <td className={`px-4 py-3 uppercase ${th.subtleText}`}>{c.language}</td>
                <td className={`px-4 py-3 font-mono text-xs ${th.mutedText}`}>{c.accessToken}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3 text-xs">
                    <button onClick={() => openEdit(c)} className={`${th.subtleText} hover:opacity-80`}>
                      Edit
                    </button>
                    <button onClick={() => reissueLink(c.email)} className="text-blue-500 hover:text-blue-400">
                      Reissue link
                    </button>
                    <button onClick={() => resetAssessment(c.email)} className="text-amber-500 hover:text-amber-400">
                      Reset
                    </button>
                    <button onClick={() => removeCandidate(c.email)} className="text-red-500 hover:text-red-400">
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className={`px-4 py-8 text-center text-sm ${th.mutedText}`}>
                  No candidates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className={th.modalOverlay}>
          <form onSubmit={onSubmitForm} className={`w-full max-w-md rounded-xl p-6 space-y-4 ${th.modalCard}`}>
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg">{editingEmail ? "Edit candidate" : "Add candidate"}</h2>
              <button type="button" onClick={() => setShowForm(false)} className={`${th.subtleText} hover:opacity-80`}>
                <FiX />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className={`block text-xs font-semibold mb-1 ${th.subtleText}`}>Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={th.input}
                />
              </div>
              <div className="col-span-2">
                <label className={`block text-xs font-semibold mb-1 ${th.subtleText}`}>Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={th.input}
                />
              </div>
              <div>
                <label className={`block text-xs font-semibold mb-1 ${th.subtleText}`}>Mobile</label>
                <input
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  className={th.input}
                />
              </div>
              <div>
                <label className={`block text-xs font-semibold mb-1 ${th.subtleText}`}>Batch</label>
                <input
                  value={form.batch}
                  onChange={(e) => setForm({ ...form, batch: e.target.value })}
                  className={th.input}
                />
              </div>
              <div>
                <label className={`block text-xs font-semibold mb-1 ${th.subtleText}`}>Language</label>
                <select
                  value={form.language}
                  onChange={(e) => setForm({ ...form, language: e.target.value as "en" | "ms" })}
                  className={th.input}
                >
                  <option value="en">English</option>
                  <option value="ms">Bahasa Melayu</option>
                </select>
              </div>
              <div>
                <label className={`block text-xs font-semibold mb-1 ${th.subtleText}`}>Thomas URL</label>
                <input
                  value={form.thomasUrl}
                  onChange={(e) => setForm({ ...form, thomasUrl: e.target.value })}
                  className={th.input}
                />
              </div>
            </div>
            <button type="submit" className={`w-full ${th.btnPrimary} flex items-center justify-center py-2.5`}>
              {editingEmail ? "Save changes" : "Create candidate"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
