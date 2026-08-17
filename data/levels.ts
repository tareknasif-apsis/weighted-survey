export type Level = {
  id: number;
  key: "operate" | "manage" | "influence" | "shape";
  name_en: string;
  name_ms: string;
  description_en: string;
  description_ms: string;
  scenarioIds: string[];
};

const levels: Level[] = [
  {
    id: 1,
    key: "operate",
    name_en: "Operate",
    name_ms: "Operasi",
    description_en: "Immediate operational and people situations requiring sound basic judgement.",
    description_ms: "Situasi operasi dan sumber manusia segera yang memerlukan pertimbangan asas yang baik.",
    scenarioIds: ["Q01", "Q02"],
  },
  {
    id: 2,
    key: "manage",
    name_en: "Manage",
    name_ms: "Pengurusan",
    description_en: "Business trade-offs, resource constraints and implementation challenges.",
    description_ms: "Pertimbangan perniagaan, kekangan sumber dan cabaran pelaksanaan.",
    scenarioIds: ["Q03", "Q04"],
  },
  {
    id: 3,
    key: "influence",
    name_en: "Influence",
    name_ms: "Pengaruh",
    description_en: "Competing stakeholder interests and decisions requiring influence and balance.",
    description_ms: "Kepentingan pihak berkepentingan yang bercanggah dan keputusan yang memerlukan pengaruh serta keseimbangan.",
    scenarioIds: ["Q05", "Q06"],
  },
  {
    id: 4,
    key: "shape",
    name_en: "Shape the Future",
    name_ms: "Membentuk Masa Depan",
    description_en: "More complex decisions involving prioritisation, transformation and longer-term direction.",
    description_ms: "Keputusan yang lebih kompleks melibatkan keutamaan, transformasi dan hala tuju jangka panjang.",
    scenarioIds: ["Q07", "Q08"],
  },
];

export default levels;

export function levelForScenario(scenarioId: string): Level | undefined {
  return levels.find((l) => l.scenarioIds.includes(scenarioId));
}

export function isFirstInLevel(scenarioId: string): boolean {
  const level = levelForScenario(scenarioId);
  return !!level && level.scenarioIds[0] === scenarioId;
}

export function isLastInLevel(scenarioId: string): boolean {
  const level = levelForScenario(scenarioId);
  return !!level && level.scenarioIds[level.scenarioIds.length - 1] === scenarioId;
}

export function nextLevel(level: Level): Level | undefined {
  return levels.find((l) => l.id === level.id + 1);
}
