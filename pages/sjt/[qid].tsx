import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiCheck, FiLock, FiMessageSquare, FiTarget } from "react-icons/fi";
import scenarios from "../../data/scenarios";
import Timer from "../../components/Timer";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { getCurrentCandidate } from "../../lib/candidateAuth";
import { upsertResponse } from "../../lib/adminStore";

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ScenarioPage() {
  const router = useRouter();
  const { qid } = router.query;
  const scenario = useMemo(() => {
    if (!qid) return undefined;
    return scenarios.find(
      (s) => String(s.id).toLowerCase() === String(qid).toLowerCase(),
    );
  }, [qid]);

  const { isDarkMode } = useTheme();
  const { lang, t } = useLanguage();
  const [order, setOrder] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [answered, setAnswered] = useState(false);
  const displayedAtRef = useRef<string>(new Date().toISOString());
  const tabChangesRef = useRef(0);

  useEffect(() => {
    if (!getCurrentCandidate()) router.replace("/login");
  }, [router]);

  useEffect(() => {
    displayedAtRef.current = new Date().toISOString();
    tabChangesRef.current = 0;
    function onVisibilityChange() {
      if (document.visibilityState === "hidden") tabChangesRef.current += 1;
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [scenario?.id]);

  useEffect(() => {
    if (!scenario) return;
    const currentScenario = scenario;

    // Attempt to reuse a persisted display order, but validate it against the current options.
    const key = `order_${currentScenario.id}`;
    const existing = localStorage.getItem(key);

    const optionIds = currentScenario.options.map((o) => o.id);
    if (existing) {
      try {
        const parsed: string[] = JSON.parse(existing);
        const isValid =
          Array.isArray(parsed) &&
          parsed.length === optionIds.length &&
          parsed.every((id) => optionIds.includes(id));
        if (isValid) {
          setOrder(parsed);
        } else {
          // Mismatch -> regenerate and persist
          const ids = shuffle(optionIds);
          localStorage.setItem(key, JSON.stringify(ids));
          setOrder(ids);
        }
      } catch {
        const ids = shuffle(optionIds);
        localStorage.setItem(key, JSON.stringify(ids));
        setOrder(ids);
      }
    } else {
      const ids = shuffle(optionIds);
      localStorage.setItem(key, JSON.stringify(ids));
      setOrder(ids);
    }

    // load saved response if any
    const respKey = `resp_${scenario.id}`;
    const saved = localStorage.getItem(respKey);
    if (saved) {
      try {
        const r = JSON.parse(saved);
        setSelected(r.answerId ?? null);
        setComment(r.comment ?? "");
        setAnswered(!!r.submitted);
      } catch {
        // ignore malformed saved response
      }
    } else {
      // Reset to initial state for new unanswered scenario
      setSelected(null);
      setComment("");
      setAnswered(false);
    }
  }, [scenario]);

  if (!scenario) return <div>{t("qid.loading")}</div>;
  const currentScenario = scenario;
  function onSubmit() {
    if (!selected) return alert(t("qid.pleaseSelect"));
    const respKey = `resp_${currentScenario.id}`;
    const submittedAt = new Date().toISOString();
    const payload = {
      answerId: selected,
      comment,
      submittedAt,
    };
    localStorage.setItem(
      respKey,
      JSON.stringify({ ...payload, submitted: true }),
    );
    setAnswered(true);

    const candidate = getCurrentCandidate();
    if (candidate) {
      const responseTimeSec = Math.max(
        0,
        Math.round((new Date(submittedAt).getTime() - new Date(displayedAtRef.current).getTime()) / 1000),
      );
      upsertResponse({
        candidateEmail: candidate.email,
        scenarioId: currentScenario.id,
        answerId: selected,
        comment,
        responseTimeSec,
        displayedAt: displayedAtRef.current,
        submittedAt,
        tabChanges: tabChangesRef.current,
        reconnects: 0,
      });
    }

    // proceed to next or completion
    const nextOrder = currentScenario.order + 1;
    const next = scenarios.find((s) => s.order === nextOrder);
    setTimeout(() => {
      if (next) router.push(`/sjt/${next.id.toLowerCase()}`);
      else router.push("/sjt/complete");
    }, 400);
  }

  function onAutosave() {
    const respKey = `resp_${currentScenario.id}`;
    localStorage.setItem(
      respKey,
      JSON.stringify({ answerId: selected, comment, submitted: answered }),
    );
  }

  if (!scenario) return <div>{t("qid.loading")}</div>;

  const progressPercent = (scenario.order / 8) * 100;

  return (
    <div
      className={`space-y-6 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
    >
      {/* Progress Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">
            {t("qid.scenarioOf", { current: scenario.order, total: 8 })}
          </div>
          <Timer
            key={scenario.id}
            seconds={scenario.timer_seconds ?? 240}
            warningSeconds={scenario.warning_seconds ?? 60}
            onExpire={() => {
              onAutosave();
              const nextOrder = scenario.order + 1;
              const next = scenarios.find((s) => s.order === nextOrder);
              if (next) router.push(`/sjt/${next.id.toLowerCase()}`);
              else router.push("/sjt/complete");
            }}
          />
        </div>
        <div
          className={`w-full backdrop-blur rounded-full h-2 border overflow-hidden ${
            isDarkMode
              ? "bg-slate-700/40 border-slate-600/30"
              : "bg-blue-200/30 border-blue-300/30"
          }`}
        >
          <div
            className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Scenario Card */}
      <div
        className={`backdrop-blur border rounded-xl p-6 ${
          isDarkMode
            ? "bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-indigo-500/30"
            : "bg-gradient-to-br from-blue-400/15 to-orange-400/15 border-blue-300/40"
        }`}
      >
        <div className="mb-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              isDarkMode
                ? "bg-indigo-500/30 text-indigo-200"
                : "bg-blue-500/25 text-blue-700"
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <FiTarget /> {t("qid.scenario")}
            </span>
          </span>
        </div>
        <div className="text-lg leading-relaxed">
          {lang === "en"
            ? scenario.scenario_text_en
            : scenario.scenario_text_ms || scenario.scenario_text_en}
        </div>
      </div>

      {/* Options Section */}
      <div>
        <h3 className="font-bold text-lg mb-4">
          {t("qid.chooseBestResponse")}
        </h3>
        <div className="space-y-3">
          {order.map((optId, idx) => {
            const opt = scenario.options.find((o) => o.id === optId);
            if (!opt) return null;
            return (
              <label
                key={opt.id}
                className={`block cursor-pointer transition-all transform ${
                  selected === opt.id ? "scale-100" : "hover:scale-98"
                }`}
              >
                <div
                  className={`border-2 backdrop-blur rounded-lg p-4 transition-all ${
                    selected === opt.id
                      ? isDarkMode
                        ? "bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border-emerald-400 shadow-lg shadow-emerald-500/20"
                        : "bg-gradient-to-r from-emerald-300/30 to-teal-300/30 border-emerald-500 shadow-lg shadow-emerald-400/20"
                      : isDarkMode
                        ? "bg-slate-700/20 border-slate-600/30 hover:border-slate-500/50"
                        : "bg-blue-200/20 border-blue-300/40 hover:border-blue-400/60"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="option"
                      checked={selected === opt.id}
                      onChange={() => {
                        setSelected(opt.id);
                        const respKey = `resp_${scenario.id}`;
                        localStorage.setItem(
                          respKey,
                          JSON.stringify({
                            answerId: opt.id,
                            comment,
                            submitted: false,
                          }),
                        );
                      }}
                      className="mt-1 w-5 h-5 cursor-pointer accent-emerald-400"
                    />
                    <div className="flex-1">
                      <div
                        className={`text-sm font-semibold mb-1 flex items-center gap-2 ${isDarkMode ? "text-gray-100" : "text-black"}`}
                      >
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                            isDarkMode
                              ? "bg-slate-600/40 text-gray-200"
                              : "bg-blue-300/40 text-blue-800"
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>
                          {lang === "en"
                            ? opt.text_en
                            : opt.text_ms || opt.text_en}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Comments Section */}
      <div>
        <label
          className={`flex items-center gap-1.5 text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-100" : "text-black"}`}
        >
          <FiMessageSquare /> {t("qid.additionalComments")}
        </label>
        <textarea
          maxLength={300}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onBlur={onAutosave}
          rows={3}
          placeholder={t("qid.commentPlaceholder")}
          className={`w-full backdrop-blur border rounded-lg p-3 transition-all ${
            isDarkMode
              ? "bg-slate-700/30 border-slate-600/30 text-gray-100 placeholder-gray-500 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30"
              : "bg-blue-200/20 border-blue-300/40 text-black placeholder-gray-600 focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/30"
          }`}
        />
        <div
          className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-black"}`}
        >
          {comment.length}/300
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <div
          className={`flex-1 text-xs flex items-center gap-1.5 ${isDarkMode ? "text-gray-400" : "text-black"}`}
        >
          <FiLock /> {t("qid.noBacktracking")}
        </div>
        <button
          onClick={onSubmit}
          disabled={answered}
          className={`px-6 py-3 font-bold rounded-lg transition-all transform text-white ${
            answered
              ? "bg-slate-600/40 text-gray-400 cursor-not-allowed"
              : selected
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 hover:scale-105 shadow-lg shadow-emerald-500/30"
                : "bg-slate-700/40 text-gray-500 cursor-not-allowed"
          }`}
        >
          {answered ? (
            <span className="inline-flex items-center gap-1.5">
              <FiCheck /> {t("qid.submitted")}
            </span>
          ) : selected ? (
            t("qid.submitAndNext")
          ) : (
            t("qid.selectOption")
          )}
        </button>
      </div>
    </div>
  );
}
