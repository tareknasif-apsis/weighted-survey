import { useEffect, useState } from "react";
import {
  AppConfig,
  Competency,
  ScoringEntry,
  getCompetencies,
  getConfig,
  getScenarios,
  getScoring,
  saveCompetencies,
  saveConfig,
  saveScenarios,
  saveScoring,
} from "../../lib/adminStore";
import { Scenario } from "../../data/scenarios";
import levelDefs from "../../data/levels";
import { useTheme } from "../../contexts/ThemeContext";
import { adminTheme } from "../../lib/adminTheme";

type Tab = "scenarios" | "competencies" | "timers";

export default function ContentPage() {
  const [tab, setTab] = useState<Tab>("scenarios");
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [scoring, setScoring] = useState<ScoringEntry[]>([]);
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const [config, setConfig] = useState<AppConfig | null>(null);
  const { isDarkMode } = useTheme();
  const th = adminTheme(isDarkMode);
  const smallInput = `${th.input} px-2 py-1`;

  useEffect(() => {
    setScenarios(getScenarios());
    setScoring(getScoring());
    setCompetencies(getCompetencies());
    setConfig(getConfig());
  }, []);

  function updateScenario(id: string, patch: Partial<Scenario>) {
    const next = scenarios.map((s) => (s.id === id ? { ...s, ...patch } : s));
    setScenarios(next);
    saveScenarios(next);
  }

  function updateOption(
    scenarioId: string,
    optionId: string,
    patch: { text_en?: string; text_ms?: string },
  ) {
    const next = scenarios.map((s) =>
      s.id === scenarioId
        ? {
            ...s,
            options: s.options.map((o) =>
              o.id === optionId ? { ...o, ...patch } : o,
            ),
          }
        : s,
    );
    setScenarios(next);
    saveScenarios(next);
  }

  function updateScoring(answerId: string, patch: Partial<ScoringEntry>) {
    const next = scoring.map((s) =>
      s.answerId === answerId ? { ...s, ...patch } : s,
    );
    setScoring(next);
    saveScoring(next);
  }

  function updateEvidence(
    answerId: string,
    index: number,
    competencyId: string,
    points: number,
  ) {
    const next = scoring.map((s) => {
      if (s.answerId !== answerId) return s;
      const evidence = [...s.evidence];
      evidence[index] = { competencyId, points };
      return { ...s, evidence };
    });
    setScoring(next);
    saveScoring(next);
  }

  function updateCompetency(id: string, patch: Partial<Competency>) {
    const next = competencies.map((c) =>
      c.id === id ? { ...c, ...patch } : c,
    );
    setCompetencies(next);
    saveCompetencies(next);
  }

  function updateConfig(patch: Partial<AppConfig>) {
    if (!config) return;
    const next = { ...config, ...patch };
    setConfig(next);
    saveConfig(next);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Content &amp; Scoring</h1>
        <p className={`text-sm mt-1 ${th.subtleText}`}>
          Every candidate-facing string exists in EN/BM under one shared content
          ID. Scoring is configurable — never hard-coded.
        </p>
      </div>

      <div
        className={`flex gap-2 border-b ${isDarkMode ? "border-slate-800" : "border-gray-200"}`}
      >
        {(
          [
            ["scenarios", "Scenarios & Scoring"],
            ["competencies", "Competencies"],
            ["timers", "Timers & thresholds"],
          ] as [Tab, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
              tab === key
                ? "border-blue-500"
                : `border-transparent ${th.subtleText} ${isDarkMode ? "hover:text-white" : "hover:text-gray-900"}`
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "scenarios" && (
        <div className="space-y-4">
          <p className={`text-xs ${th.mutedText}`}>
            Each answer maps to one Overall score plus evidence for up to two
            competencies. Candidates never see this. Answer IDs are permanent
            regardless of on-screen display order.
          </p>
          {levelDefs.map((level) => (
            <div key={level.id} className="space-y-4">
              <div
                className={`flex items-center gap-2 px-1 pt-2 ${isDarkMode ? "text-emerald-300" : "text-emerald-700"}`}
              >
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold border ${
                    isDarkMode ? "border-emerald-500/50 bg-emerald-500/15" : "border-emerald-400 bg-emerald-100"
                  }`}
                >
                  {level.id}
                </span>
                <h3 className="text-sm font-bold uppercase tracking-wide">{level.name_en}</h3>
                <span className={`text-xs ${th.mutedText}`}>({level.scenarioIds.join(", ")})</span>
              </div>
              {scenarios
                .filter((s) => level.scenarioIds.includes(s.id))
                .map((s) => (
                  <div
                    key={s.id}
                    className={`border rounded-xl p-5 space-y-3 ${th.card}`}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className={`text-xs font-mono ${th.mutedText}`}>
                        {s.id}
                </span>
                <div
                  className={`flex items-center flex-wrap gap-3 text-xs ${th.subtleText}`}
                >
                  <span>Timer (s)</span>
                  <input
                    type="number"
                    defaultValue={s.timer_seconds ?? 240}
                    onBlur={(e) =>
                      updateScenario(s.id, {
                        timer_seconds: Number(e.target.value),
                      })
                    }
                    className={`w-20 ${smallInput}`}
                  />
                  <span>Warning (s)</span>
                  <input
                    type="number"
                    defaultValue={s.warning_seconds ?? 60}
                    onBlur={(e) =>
                      updateScenario(s.id, {
                        warning_seconds: Number(e.target.value),
                      })
                    }
                    className={`w-20 ${smallInput}`}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label
                    className={`block text-xs font-semibold mb-1 ${th.subtleText}`}
                  >
                    Scenario (EN)
                  </label>
                  <textarea
                    defaultValue={s.scenario_text_en}
                    onBlur={(e) =>
                      updateScenario(s.id, { scenario_text_en: e.target.value })
                    }
                    rows={3}
                    className={th.input}
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs font-semibold mb-1 ${th.subtleText}`}
                  >
                    Scenario (BM)
                  </label>
                  <textarea
                    defaultValue={s.scenario_text_ms || ""}
                    onBlur={(e) =>
                      updateScenario(s.id, { scenario_text_ms: e.target.value })
                    }
                    rows={3}
                    className={th.input}
                  />
                </div>
              </div>
              <div className="space-y-3">
                {s.options.map((o) => {
                  const entry = scoring.find((sc) => sc.answerId === o.id);
                  return (
                    <div
                      key={o.id}
                      className={`border rounded-lg p-3 space-y-3 ${th.cardMuted}`}
                    >
                      <div className="grid md:grid-cols-[60px_1fr_1fr] gap-2 items-start">
                        <div
                          className={`text-xs font-mono pt-2 ${th.mutedText}`}
                        >
                          {o.id}
                        </div>
                        <input
                          defaultValue={o.text_en}
                          onBlur={(e) =>
                            updateOption(s.id, o.id, {
                              text_en: e.target.value,
                            })
                          }
                          className={th.input}
                          placeholder="Option (EN)"
                        />
                        <input
                          defaultValue={o.text_ms || ""}
                          onBlur={(e) =>
                            updateOption(s.id, o.id, {
                              text_ms: e.target.value,
                            })
                          }
                          className={th.input}
                          placeholder="Option (BM)"
                        />
                      </div>

                      {entry && (
                        <div
                          className={`pt-3 border-t space-y-2 ${isDarkMode ? "border-slate-700/60" : "border-gray-300"}`}
                        >
                          <div className="flex items-center gap-2">
                            <label
                              className={`text-xs font-semibold w-16 shrink-0 ${th.subtleText}`}
                            >
                              Overall
                            </label>
                            <input
                              type="number"
                              min={1}
                              max={4}
                              defaultValue={entry.overall}
                              onBlur={(e) =>
                                updateScoring(entry.answerId, {
                                  overall: Number(e.target.value),
                                })
                              }
                              className={`w-10 ${smallInput} px-1 text-center`}
                            />
                          </div>
                          {[0, 1].map((i) => (
                            <div key={i} className="flex items-center gap-2">
                              <label
                                className={`text-xs font-semibold w-16 shrink-0 ${th.subtleText}`}
                              >
                                Comp. {i + 1}
                              </label>
                              <select
                                defaultValue={
                                  entry.evidence[i]?.competencyId || ""
                                }
                                onChange={(e) =>
                                  updateEvidence(
                                    entry.answerId,
                                    i,
                                    e.target.value,
                                    entry.evidence[i]?.points ?? 2,
                                  )
                                }
                                className={`${th.input} flex-1 min-w-60 py-2.5`}
                              >
                                <option value="">—</option>
                                {competencies.map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.name}
                                  </option>
                                ))}
                              </select>
                              <input
                                type="number"
                                min={1}
                                max={4}
                                defaultValue={entry.evidence[i]?.points ?? ""}
                                onBlur={(e) =>
                                  updateEvidence(
                                    entry.answerId,
                                    i,
                                    entry.evidence[i]?.competencyId ||
                                      competencies[0].id,
                                    Number(e.target.value),
                                  )
                                }
                                className={`max-w-100 ${smallInput} shrink-0 px-1 text-center`}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
            </div>
          ))}
        </div>
      )}

      {tab === "competencies" && (
        <div className="grid md:grid-cols-2 gap-4">
          {competencies.map((c) => (
            <div
              key={c.id}
              className={`border rounded-xl p-4 space-y-2 ${th.card}`}
            >
              <div className={`text-[11px] font-mono ${th.mutedText}`}>
                {c.id} · {c.group}
              </div>
              <input
                defaultValue={c.name}
                onBlur={(e) => updateCompetency(c.id, { name: e.target.value })}
                className={`${th.input} font-semibold`}
              />
              <textarea
                defaultValue={c.description}
                onBlur={(e) =>
                  updateCompetency(c.id, { description: e.target.value })
                }
                rows={2}
                className={`${th.input} text-xs`}
              />
            </div>
          ))}
        </div>
      )}

      {tab === "timers" && config && (
        <div className={`border rounded-xl p-5 space-y-4 max-w-md ${th.card}`}>
          <div>
            <label
              className={`block text-xs font-semibold mb-1 ${th.subtleText}`}
            >
              Default timer (seconds)
            </label>
            <input
              type="number"
              defaultValue={config.timerSeconds}
              onBlur={(e) =>
                updateConfig({ timerSeconds: Number(e.target.value) })
              }
              className={th.input}
            />
          </div>
          <div>
            <label
              className={`block text-xs font-semibold mb-1 ${th.subtleText}`}
            >
              Default warning threshold (seconds remaining)
            </label>
            <input
              type="number"
              defaultValue={config.warningSeconds}
              onBlur={(e) =>
                updateConfig({ warningSeconds: Number(e.target.value) })
              }
              className={th.input}
            />
          </div>
          <div>
            <label
              className={`block text-xs font-semibold mb-1 ${th.subtleText}`}
            >
              Minimum evidence points before a competency score is treated as
              robust
            </label>
            <input
              type="number"
              defaultValue={config.minEvidenceThreshold}
              onBlur={(e) =>
                updateConfig({ minEvidenceThreshold: Number(e.target.value) })
              }
              className={th.input}
            />
          </div>
          <p className={`text-[11px] ${th.mutedText}`}>
            Note: per-scenario timers set under the Scenarios tab override this
            default.
          </p>
        </div>
      )}
    </div>
  );
}
