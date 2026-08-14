import { useEffect, useState } from "react";
import {
  DeclarationAudit,
  DeclarationConfig,
  getDeclaration,
  getDeclarationAudit,
  saveDeclaration,
} from "../../lib/adminStore";
import { useTheme } from "../../contexts/ThemeContext";
import { adminTheme } from "../../lib/adminTheme";

export default function DeclarationPage() {
  const [config, setConfig] = useState<DeclarationConfig | null>(null);
  const [audit, setAudit] = useState<DeclarationAudit[]>([]);
  const [saved, setSaved] = useState(false);
  const { isDarkMode } = useTheme();
  const th = adminTheme(isDarkMode);

  useEffect(() => {
    setConfig(getDeclaration());
    setAudit(getDeclarationAudit());
  }, []);

  function onSave() {
    if (!config) return;
    saveDeclaration(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!config) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Candidate Integrity Declaration</h1>
        <p className={`text-sm mt-1 ${th.subtleText}`}>
          Editable wording — no code change needed. Bumping the version creates a new consent baseline; existing
          acceptances remain tied to the version they accepted.
        </p>
      </div>

      <div className={`border rounded-xl p-5 space-y-4 ${th.card}`}>
        <div className="flex items-center gap-3">
          <label className={`text-xs font-semibold ${th.subtleText}`}>Version</label>
          <input
            value={config.version}
            onChange={(e) => setConfig({ ...config, version: e.target.value })}
            className={`w-32 ${th.input} py-1.5`}
          />
        </div>
        <div>
          <label className={`block text-xs font-semibold mb-1 ${th.subtleText}`}>Declaration text (EN)</label>
          <textarea
            value={config.text_en}
            onChange={(e) => setConfig({ ...config, text_en: e.target.value })}
            rows={6}
            className={`${th.input} leading-relaxed`}
          />
        </div>
        <div>
          <label className={`block text-xs font-semibold mb-1 ${th.subtleText}`}>Declaration text (BM)</label>
          <textarea
            value={config.text_ms}
            onChange={(e) => setConfig({ ...config, text_ms: e.target.value })}
            rows={6}
            className={`${th.input} leading-relaxed`}
          />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onSave} className={th.btnPrimary}>
            Save declaration
          </button>
          {saved && <span className="text-xs text-emerald-500">Saved.</span>}
        </div>
      </div>

      <div>
        <h2 className="font-bold mb-3">Acceptance audit log</h2>
        <div className={`border rounded-xl overflow-x-auto ${th.tableWrap}`}>
          <table className="w-full text-sm min-w-[560px]">
            <thead className={`text-xs uppercase tracking-wide ${th.tableHead}`}>
              <tr>
                <th className="text-left px-4 py-3">Candidate</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Version</th>
                <th className="text-left px-4 py-3">Accepted at</th>
              </tr>
            </thead>
            <tbody>
              {audit.map((a) => (
                <tr key={a.email} className={`border-t ${th.rowBorder}`}>
                  <td className="px-4 py-3">{a.name}</td>
                  <td className={`px-4 py-3 ${th.subtleText}`}>{a.email}</td>
                  <td className={`px-4 py-3 ${th.subtleText}`}>{a.version}</td>
                  <td className={`px-4 py-3 ${th.subtleText}`}>{new Date(a.acceptedAt).toLocaleString()}</td>
                </tr>
              ))}
              {audit.length === 0 && (
                <tr>
                  <td colSpan={4} className={`px-4 py-8 text-center text-sm ${th.mutedText}`}>
                    No declaration acceptances recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
