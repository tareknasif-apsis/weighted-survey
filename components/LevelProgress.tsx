import levels from "../data/levels";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

type StepKey = "start" | "operate" | "manage" | "influence" | "shape" | "complete";

const STEPS: StepKey[] = ["start", "operate", "manage", "influence", "shape", "complete"];

const LABEL_KEY: Record<StepKey, "level.start" | "level.operate" | "level.manage" | "level.influence" | "level.shape" | "level.complete"> = {
  start: "level.start",
  operate: "level.operate",
  manage: "level.manage",
  influence: "level.influence",
  shape: "level.shape",
  complete: "level.complete",
};

export default function LevelProgress({ active }: { active: StepKey }) {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const activeIndex = STEPS.indexOf(active);

  return (
    <div className="flex items-center w-full" aria-label="Assessment journey progress">
      {STEPS.map((step, idx) => {
        const isDone = idx < activeIndex;
        const isActive = idx === activeIndex;
        const level = levels.find((l) => l.key === step);
        return (
          <div key={step} className={`flex items-center ${idx === STEPS.length - 1 ? "" : "flex-1"}`}>
            <div className="flex flex-col items-center shrink-0">
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border-2 transition-colors ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-400 text-white"
                    : isDone
                      ? isDarkMode
                        ? "bg-emerald-500/30 border-emerald-500/60 text-emerald-300"
                        : "bg-emerald-100 border-emerald-400 text-emerald-700"
                      : isDarkMode
                        ? "bg-slate-700/40 border-slate-600/40 text-slate-500"
                        : "bg-gray-100 border-gray-300 text-gray-400"
                }`}
              >
                {level ? level.id : idx === 0 ? "•" : "✓"}
              </div>
              <div
                className={`mt-1 text-[9px] sm:text-[10px] font-semibold text-center leading-tight max-w-[52px] sm:max-w-[64px] ${
                  isActive
                    ? isDarkMode
                      ? "text-emerald-300"
                      : "text-emerald-700"
                    : isDarkMode
                      ? "text-slate-500"
                      : "text-gray-400"
                }`}
              >
                {t(LABEL_KEY[step])}
              </div>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 rounded-full transition-colors ${
                  idx < activeIndex
                    ? "bg-emerald-500/60"
                    : isDarkMode
                      ? "bg-slate-700/50"
                      : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export type { StepKey };
