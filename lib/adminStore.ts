import scenarios, { Scenario } from "../data/scenarios";

// ---------- Types ----------

export type ThomasStatus = "not_started" | "in_progress" | "completed";

export type Candidate = {
  email: string;
  name: string;
  mobile?: string;
  batch?: string;
  language: "en" | "ms";
  accessToken: string;
  createdAt: string;
  thomasUrl?: string;
  thomasStatus: ThomasStatus;
  thomasCompletedAt?: string;
  declarationAccepted: boolean;
  declarationAcceptedAt?: string;
  declarationVersion?: string;
  sjtStartedAt?: string;
  sjtCompletedAt?: string;
  flagged?: boolean;
};

export type SjtResponse = {
  candidateEmail: string;
  scenarioId: string;
  answerId: string;
  comment: string;
  responseTimeSec: number;
  displayedAt: string;
  submittedAt: string;
  tabChanges: number;
  reconnects: number;
};

export type CompetencyGroup = "Strategic Leadership" | "People Leadership";

export type Competency = {
  id: string;
  name: string;
  group: CompetencyGroup;
  description: string;
};

export type ScoringEvidence = { competencyId: string; points: number };

export type ScoringEntry = {
  answerId: string;
  scenarioId: string;
  overall: number;
  evidence: ScoringEvidence[];
};

export type DeclarationConfig = {
  version: string;
  text_en: string;
  text_ms: string;
};

export type DeclarationAudit = {
  email: string;
  name: string;
  version: string;
  acceptedAt: string;
};

export type AppConfig = {
  timerSeconds: number;
  warningSeconds: number;
  minEvidenceThreshold: number;
};

export type DerivedStatus =
  | "Not Started"
  | "Thomas In Progress"
  | "Thomas Completed"
  | "SJT In Progress"
  | "SJT Completed"
  | "Fully Completed"
  | "Exception";

// ---------- Seed data ----------

export const COMPETENCIES: Competency[] = [
  {
    id: "SV",
    name: "Strategic Vision & Insight",
    group: "Strategic Leadership",
    description:
      "Anticipates trends and sets a clear direction for the future.",
  },
  {
    id: "BA",
    name: "Business Acumen & Financial Stewardship",
    group: "Strategic Leadership",
    description:
      "Balances commercial, operational and financial trade-offs responsibly.",
  },
  {
    id: "IT",
    name: "Innovation & Transformation Leadership",
    group: "Strategic Leadership",
    description: "Champions new approaches and leads change through ambiguity.",
  },
  {
    id: "IL",
    name: "Inspirational Leadership & Decision-Making",
    group: "People Leadership",
    description:
      "Makes timely, sound decisions and motivates others toward them.",
  },
  {
    id: "CI",
    name: "Collaborative Influence & Stakeholder Engagement",
    group: "People Leadership",
    description:
      "Builds trust and influence across stakeholders to reach shared outcomes.",
  },
  {
    id: "TD",
    name: "Talent Development & Inclusion",
    group: "People Leadership",
    description: "Grows people and fosters an inclusive, high-performing team.",
  },
];

// Overall (1-4) + up to 2 competency evidence points (1-4) per answer option.
// Seed values only — pending MNEXT final psychometric review. Fully editable below.
const SCORING_SEED: ScoringEntry[] = [
  {
    answerId: "Q01-A",
    scenarioId: "Q01",
    overall: 3,
    evidence: [
      { competencyId: "CI", points: 3 },
      { competencyId: "IL", points: 2 },
    ],
  },
  {
    answerId: "Q01-B",
    scenarioId: "Q01",
    overall: 3,
    evidence: [
      { competencyId: "IL", points: 3 },
      { competencyId: "TD", points: 2 },
    ],
  },
  {
    answerId: "Q01-C",
    scenarioId: "Q01",
    overall: 2,
    evidence: [
      { competencyId: "BA", points: 2 },
      { competencyId: "IL", points: 2 },
    ],
  },
  {
    answerId: "Q01-D",
    scenarioId: "Q01",
    overall: 4,
    evidence: [
      { competencyId: "CI", points: 4 },
      { competencyId: "TD", points: 2 },
    ],
  },

  {
    answerId: "Q02-A",
    scenarioId: "Q02",
    overall: 4,
    evidence: [
      { competencyId: "TD", points: 4 },
      { competencyId: "IL", points: 3 },
    ],
  },
  {
    answerId: "Q02-B",
    scenarioId: "Q02",
    overall: 2,
    evidence: [
      { competencyId: "IL", points: 2 },
      { competencyId: "TD", points: 1 },
    ],
  },
  {
    answerId: "Q02-C",
    scenarioId: "Q02",
    overall: 2,
    evidence: [
      { competencyId: "TD", points: 2 },
      { competencyId: "CI", points: 2 },
    ],
  },
  {
    answerId: "Q02-D",
    scenarioId: "Q02",
    overall: 3,
    evidence: [
      { competencyId: "IL", points: 3 },
      { competencyId: "TD", points: 3 },
    ],
  },

  {
    answerId: "Q03-A",
    scenarioId: "Q03",
    overall: 4,
    evidence: [
      { competencyId: "IT", points: 4 },
      { competencyId: "BA", points: 3 },
    ],
  },
  {
    answerId: "Q03-B",
    scenarioId: "Q03",
    overall: 2,
    evidence: [
      { competencyId: "BA", points: 3 },
      { competencyId: "IT", points: 1 },
    ],
  },
  {
    answerId: "Q03-C",
    scenarioId: "Q03",
    overall: 3,
    evidence: [
      { competencyId: "TD", points: 3 },
      { competencyId: "IT", points: 2 },
    ],
  },
  {
    answerId: "Q03-D",
    scenarioId: "Q03",
    overall: 2,
    evidence: [
      { competencyId: "BA", points: 2 },
      { competencyId: "SV", points: 2 },
    ],
  },

  {
    answerId: "Q04-A",
    scenarioId: "Q04",
    overall: 2,
    evidence: [
      { competencyId: "CI", points: 2 },
      { competencyId: "BA", points: 2 },
    ],
  },
  {
    answerId: "Q04-B",
    scenarioId: "Q04",
    overall: 3,
    evidence: [
      { competencyId: "IT", points: 3 },
      { competencyId: "SV", points: 2 },
    ],
  },
  {
    answerId: "Q04-C",
    scenarioId: "Q04",
    overall: 3,
    evidence: [
      { competencyId: "TD", points: 3 },
      { competencyId: "CI", points: 3 },
    ],
  },
  {
    answerId: "Q04-D",
    scenarioId: "Q04",
    overall: 4,
    evidence: [
      { competencyId: "IT", points: 4 },
      { competencyId: "CI", points: 3 },
    ],
  },

  {
    answerId: "Q05-A",
    scenarioId: "Q05",
    overall: 4,
    evidence: [
      { competencyId: "BA", points: 3 },
      { competencyId: "CI", points: 4 },
    ],
  },
  {
    answerId: "Q05-B",
    scenarioId: "Q05",
    overall: 2,
    evidence: [
      { competencyId: "BA", points: 4 },
      { competencyId: "CI", points: 1 },
    ],
  },
  {
    answerId: "Q05-C",
    scenarioId: "Q05",
    overall: 2,
    evidence: [
      { competencyId: "CI", points: 3 },
      { competencyId: "BA", points: 1 },
    ],
  },
  {
    answerId: "Q05-D",
    scenarioId: "Q05",
    overall: 3,
    evidence: [
      { competencyId: "CI", points: 3 },
      { competencyId: "BA", points: 2 },
    ],
  },

  {
    answerId: "Q06-A",
    scenarioId: "Q06",
    overall: 4,
    evidence: [
      { competencyId: "CI", points: 4 },
      { competencyId: "IL", points: 3 },
    ],
  },
  {
    answerId: "Q06-B",
    scenarioId: "Q06",
    overall: 2,
    evidence: [
      { competencyId: "CI", points: 1 },
      { competencyId: "IL", points: 2 },
    ],
  },
  {
    answerId: "Q06-C",
    scenarioId: "Q06",
    overall: 1,
    evidence: [
      { competencyId: "CI", points: 1 },
      { competencyId: "IL", points: 1 },
    ],
  },
  {
    answerId: "Q06-D",
    scenarioId: "Q06",
    overall: 3,
    evidence: [
      { competencyId: "IL", points: 3 },
      { competencyId: "CI", points: 2 },
    ],
  },

  {
    answerId: "Q07-A",
    scenarioId: "Q07",
    overall: 4,
    evidence: [
      { competencyId: "SV", points: 3 },
      { competencyId: "BA", points: 4 },
    ],
  },
  {
    answerId: "Q07-B",
    scenarioId: "Q07",
    overall: 2,
    evidence: [
      { competencyId: "BA", points: 2 },
      { competencyId: "SV", points: 1 },
    ],
  },
  {
    answerId: "Q07-C",
    scenarioId: "Q07",
    overall: 3,
    evidence: [
      { competencyId: "BA", points: 3 },
      { competencyId: "SV", points: 2 },
    ],
  },
  {
    answerId: "Q07-D",
    scenarioId: "Q07",
    overall: 2,
    evidence: [
      { competencyId: "SV", points: 2 },
      { competencyId: "BA", points: 1 },
    ],
  },

  {
    answerId: "Q08-A",
    scenarioId: "Q08",
    overall: 3,
    evidence: [
      { competencyId: "SV", points: 3 },
      { competencyId: "IT", points: 2 },
    ],
  },
  {
    answerId: "Q08-B",
    scenarioId: "Q08",
    overall: 3,
    evidence: [
      { competencyId: "IT", points: 3 },
      { competencyId: "SV", points: 2 },
    ],
  },
  {
    answerId: "Q08-C",
    scenarioId: "Q08",
    overall: 2,
    evidence: [
      { competencyId: "BA", points: 3 },
      { competencyId: "SV", points: 1 },
    ],
  },
  {
    answerId: "Q08-D",
    scenarioId: "Q08",
    overall: 4,
    evidence: [
      { competencyId: "TD", points: 4 },
      { competencyId: "SV", points: 2 },
    ],
  },
];

const DEFAULT_DECLARATION: DeclarationConfig = {
  version: "v1.0",
  text_en:
    "I confirm that I will complete the MNext assessments independently and will not use generative AI tools, chatbots, another person, or any other external source to generate, suggest or materially assist with my answers during the assessment. I understand that the assessment platform may record certain technical and behavioural indicators for assessment-integrity purposes. If there is reasonable evidence that I have breached this declaration, my assessment may be reviewed and I may be disqualified from the selection process. I also understand that automated indicators or system flags are not, by themselves, treated as conclusive proof of AI use or misconduct. Any decision affecting my candidacy will be based on a review of the available evidence and the applicable assessment process.",
  text_ms:
    "Saya mengesahkan bahawa saya akan menyelesaikan penilaian MNext secara bersendirian dan tidak akan menggunakan alat AI generatif, chatbot, individu lain, atau sebarang sumber luar lain untuk menjana, mencadangkan atau membantu secara material jawapan saya semasa penilaian. Saya faham platform penilaian ini mungkin merekodkan penunjuk teknikal dan tingkah laku tertentu bagi tujuan integriti penilaian. Sekiranya terdapat bukti munasabah bahawa saya melanggar deklarasi ini, penilaian saya boleh disemak dan saya boleh disingkirkan daripada proses pemilihan. Saya juga faham bahawa penunjuk automatik atau tanda amaran sistem semata-mata bukan bukti muktamad penyalahgunaan AI atau salah laku. Sebarang keputusan yang menjejaskan kelayakan saya akan berdasarkan semakan bukti yang ada dan proses penilaian yang berkenaan.",
};

const DEFAULT_CONFIG: AppConfig = {
  timerSeconds: 240,
  warningSeconds: 60,
  minEvidenceThreshold: 2,
};

function seedCandidates(): Candidate[] {
  const now = Date.now();
  const iso = (daysAgo: number) =>
    new Date(now - daysAgo * 86400000).toISOString();
  return [
    {
      email: "alice.tan@example.com",
      name: "Alice Tan",
      mobile: "+60 12-345 6789",
      batch: "Batch 1 - 2026",
      language: "en",
      accessToken: "tok_alice001",
      createdAt: iso(10),
      thomasUrl: "https://secure.thomasinternational.net/LoginSelector.aspx",
      thomasStatus: "completed",
      thomasCompletedAt: iso(8),
      declarationAccepted: true,
      declarationAcceptedAt: iso(9),
      declarationVersion: "v1.0",
      sjtStartedAt: iso(9),
      sjtCompletedAt: iso(9),
    },
    {
      email: "bakri.hassan@example.com",
      name: "Bakri Hassan",
      mobile: "+60 19-876 5432",
      batch: "Batch 1 - 2026",
      language: "ms",
      accessToken: "tok_bakri002",
      createdAt: iso(10),
      thomasUrl: "https://secure.thomasinternational.net/LoginSelector.aspx",
      thomasStatus: "in_progress",
      declarationAccepted: true,
      declarationAcceptedAt: iso(7),
      declarationVersion: "v1.0",
      sjtStartedAt: iso(7),
    },
    {
      email: "chen.wei@example.com",
      name: "Chen Wei Ling",
      batch: "Batch 1 - 2026",
      language: "en",
      accessToken: "tok_chen003",
      createdAt: iso(9),
      thomasUrl: "https://secure.thomasinternational.net/LoginSelector.aspx",
      thomasStatus: "not_started",
      declarationAccepted: false,
    },
    {
      email: "devi.raj@example.com",
      name: "Devi Raj",
      batch: "Batch 2 - 2026",
      language: "en",
      accessToken: "tok_devi004",
      createdAt: iso(5),
      thomasUrl: "https://secure.thomasinternational.net/LoginSelector.aspx",
      thomasStatus: "completed",
      thomasCompletedAt: iso(4),
      declarationAccepted: true,
      declarationAcceptedAt: iso(4),
      declarationVersion: "v1.0",
      sjtStartedAt: iso(4),
      sjtCompletedAt: iso(4),
      flagged: true,
    },
    {
      email: "farah.aziz@example.com",
      name: "Farah Aziz",
      batch: "Batch 2 - 2026",
      language: "ms",
      accessToken: "tok_farah005",
      createdAt: iso(3),
      thomasUrl: "https://secure.thomasinternational.net/LoginSelector.aspx",
      thomasStatus: "not_started",
      declarationAccepted: false,
    },
    {
      email: "gopal.krishnan@example.com",
      name: "Gopal Krishnan",
      batch: "Batch 2 - 2026",
      language: "en",
      accessToken: "tok_gopal006",
      createdAt: iso(2),
      thomasUrl: "https://secure.thomasinternational.net/LoginSelector.aspx",
      thomasStatus: "not_started",
      declarationAccepted: false,
    },
    {
      email: "hana.yusof@example.com",
      name: "Hana Yusof",
      batch: "Batch 2 - 2026",
      language: "ms",
      accessToken: "tok_hana007",
      createdAt: iso(2),
      thomasUrl: "https://secure.thomasinternational.net/LoginSelector.aspx",
      thomasStatus: "not_started",
      declarationAccepted: false,
    },
    {
      email: "imran.zulkifli@example.com",
      name: "Imran Zulkifli",
      batch: "Batch 2 - 2026",
      language: "en",
      accessToken: "tok_imran008",
      createdAt: iso(2),
      thomasUrl: "https://secure.thomasinternational.net/LoginSelector.aspx",
      thomasStatus: "not_started",
      declarationAccepted: false,
    },
    {
      email: "jia.wong@example.com",
      name: "Jia Wong",
      batch: "Batch 2 - 2026",
      language: "en",
      accessToken: "tok_jia009",
      createdAt: iso(1),
      thomasUrl: "https://secure.thomasinternational.net/LoginSelector.aspx",
      thomasStatus: "not_started",
      declarationAccepted: false,
    },
    {
      email: "kavitha.selvam@example.com",
      name: "Kavitha Selvam",
      batch: "Batch 2 - 2026",
      language: "ms",
      accessToken: "tok_kavitha010",
      createdAt: iso(1),
      thomasUrl: "https://secure.thomasinternational.net/LoginSelector.aspx",
      thomasStatus: "not_started",
      declarationAccepted: false,
    },
  ];
}

function seedResponses(): SjtResponse[] {
  const responses: SjtResponse[] = [];
  const completed = [
    {
      email: "alice.tan@example.com",
      picks: [
        "Q01-D",
        "Q02-A",
        "Q03-A",
        "Q04-D",
        "Q05-A",
        "Q06-A",
        "Q07-A",
        "Q08-D",
      ],
    },
    {
      email: "devi.raj@example.com",
      picks: [
        "Q01-C",
        "Q02-C",
        "Q03-B",
        "Q04-A",
        "Q05-B",
        "Q06-C",
        "Q07-D",
        "Q08-C",
      ],
    },
  ];
  completed.forEach(({ email, picks }) => {
    picks.forEach((answerId, idx) => {
      const scenarioId = answerId.split("-")[0];
      responses.push({
        candidateEmail: email,
        scenarioId,
        answerId,
        comment:
          idx % 2 === 0
            ? "I'd focus on communicating clearly with the team and impacted stakeholders first."
            : "",
        responseTimeSec: 60 + idx * 12,
        displayedAt: new Date().toISOString(),
        submittedAt: new Date().toISOString(),
        tabChanges: email === "devi.raj@example.com" ? 4 : 0,
        reconnects: 0,
      });
    });
  });
  // Bakri: in-progress, 3 of 8 answered
  ["Q01-B", "Q02-D", "Q03-C"].forEach((answerId) => {
    responses.push({
      candidateEmail: "bakri.hassan@example.com",
      scenarioId: answerId.split("-")[0],
      answerId,
      comment: "",
      responseTimeSec: 80,
      displayedAt: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
      tabChanges: 1,
      reconnects: 0,
    });
  });
  return responses;
}

// ---------- localStorage-backed persistence ----------

const KEYS = {
  candidates: "mnext_admin_candidates",
  responses: "mnext_admin_responses",
  scoring: "mnext_admin_scoring",
  competencies: "mnext_admin_competencies",
  declaration: "mnext_admin_declaration",
  declarationAudit: "mnext_admin_declaration_audit",
  config: "mnext_admin_config",
  scenarios: "mnext_admin_scenarios",
};

function isClient() {
  return typeof window !== "undefined";
}

function readOrSeed<T>(key: string, seed: () => T): T {
  if (!isClient()) return seed();
  const raw = window.localStorage.getItem(key);
  if (raw) {
    try {
      return JSON.parse(raw) as T;
    } catch {
      // fall through to reseed on corrupt data
    }
  }
  const value = seed();
  window.localStorage.setItem(key, JSON.stringify(value));
  return value;
}

function write<T>(key: string, value: T) {
  if (!isClient()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getCandidates(): Candidate[] {
  const list = readOrSeed(KEYS.candidates, seedCandidates);
  // Top up any seed candidates that weren't present yet (e.g. added to the
  // seed set after this browser already had candidate data cached), without
  // touching or duplicating existing candidates.
  const existingEmails = new Set(list.map((c) => c.email.toLowerCase()));
  const missing = seedCandidates().filter((c) => !existingEmails.has(c.email.toLowerCase()));
  if (missing.length) {
    const merged = [...list, ...missing];
    write(KEYS.candidates, merged);
    return merged;
  }
  return list;
}
export function saveCandidates(list: Candidate[]) {
  write(KEYS.candidates, list);
}

export function getResponses(): SjtResponse[] {
  return readOrSeed(KEYS.responses, seedResponses);
}
export function saveResponses(list: SjtResponse[]) {
  write(KEYS.responses, list);
}

// Upserts one candidate's response to one scenario (used by the live SJT flow).
export function upsertResponse(response: SjtResponse) {
  const list = getResponses().filter(
    (r) =>
      !(
        r.candidateEmail.toLowerCase() ===
          response.candidateEmail.toLowerCase() &&
        r.scenarioId === response.scenarioId
      ),
  );
  list.push(response);
  saveResponses(list);
}

export function markDeclarationAccepted(email: string, version: string) {
  const now = new Date().toISOString();
  const candidates = getCandidates().map((c) =>
    c.email.toLowerCase() === email.toLowerCase()
      ? {
          ...c,
          declarationAccepted: true,
          declarationAcceptedAt: now,
          declarationVersion: version,
        }
      : c,
  );
  saveCandidates(candidates);
  const candidate = candidates.find(
    (c) => c.email.toLowerCase() === email.toLowerCase(),
  );
  if (candidate) {
    const audit = getDeclarationAudit().filter(
      (a) => a.email.toLowerCase() !== email.toLowerCase(),
    );
    audit.push({
      email: candidate.email,
      name: candidate.name,
      version,
      acceptedAt: now,
    });
    saveDeclarationAudit(audit);
  }
}

export function markSjtStarted(email: string) {
  const candidates = getCandidates().map((c) =>
    c.email.toLowerCase() === email.toLowerCase() && !c.sjtStartedAt
      ? { ...c, sjtStartedAt: new Date().toISOString() }
      : c,
  );
  saveCandidates(candidates);
}

export function markSjtCompleted(email: string) {
  const candidates = getCandidates().map((c) =>
    c.email.toLowerCase() === email.toLowerCase()
      ? { ...c, sjtCompletedAt: new Date().toISOString() }
      : c,
  );
  saveCandidates(candidates);
}

// Wipes a candidate's test data (Thomas status, declaration acceptance, and
// all MNext Challenge answers) so they can take the assessment again from
// scratch. Does not remove the candidate record itself.
export function clearCandidateTestData(email: string) {
  const candidates = getCandidates().map((c) =>
    c.email.toLowerCase() === email.toLowerCase()
      ? {
          ...c,
          thomasStatus: "not_started" as ThomasStatus,
          thomasCompletedAt: undefined,
          declarationAccepted: false,
          declarationAcceptedAt: undefined,
          declarationVersion: undefined,
          sjtStartedAt: undefined,
          sjtCompletedAt: undefined,
        }
      : c,
  );
  saveCandidates(candidates);

  const responses = getResponses().filter((r) => r.candidateEmail.toLowerCase() !== email.toLowerCase());
  saveResponses(responses);

  const audit = getDeclarationAudit().filter((a) => a.email.toLowerCase() !== email.toLowerCase());
  saveDeclarationAudit(audit);
}

// Sets the same Thomas URL on every candidate in one pass.
export function setThomasUrlForAll(url: string) {
  const trimmed = url.trim();
  const candidates = getCandidates().map((c) => ({ ...c, thomasUrl: trimmed || undefined }));
  saveCandidates(candidates);
}

export function getScoring(): ScoringEntry[] {
  return readOrSeed(KEYS.scoring, () => SCORING_SEED);
}
export function saveScoring(list: ScoringEntry[]) {
  write(KEYS.scoring, list);
}

export function getCompetencies(): Competency[] {
  return readOrSeed(KEYS.competencies, () => COMPETENCIES);
}
export function saveCompetencies(list: Competency[]) {
  write(KEYS.competencies, list);
}

export function getDeclaration(): DeclarationConfig {
  return readOrSeed(KEYS.declaration, () => DEFAULT_DECLARATION);
}
export function saveDeclaration(config: DeclarationConfig) {
  write(KEYS.declaration, config);
}

export function getDeclarationAudit(): DeclarationAudit[] {
  return readOrSeed(KEYS.declarationAudit, () =>
    getCandidates()
      .filter((c) => c.declarationAccepted)
      .map((c) => ({
        email: c.email,
        name: c.name,
        version: c.declarationVersion || "v1.0",
        acceptedAt: c.declarationAcceptedAt || c.createdAt,
      })),
  );
}
export function saveDeclarationAudit(list: DeclarationAudit[]) {
  write(KEYS.declarationAudit, list);
}

export function getConfig(): AppConfig {
  return readOrSeed(KEYS.config, () => DEFAULT_CONFIG);
}
export function saveConfig(config: AppConfig) {
  write(KEYS.config, config);
}

export function getScenarios(): Scenario[] {
  return readOrSeed(KEYS.scenarios, () => scenarios);
}
export function saveScenarios(list: Scenario[]) {
  write(KEYS.scenarios, list);
}

// ---------- Derived logic ----------

export function responsesFor(
  email: string,
  responses?: SjtResponse[],
): SjtResponse[] {
  return (responses || getResponses())
    .filter((r) => r.candidateEmail.toLowerCase() === email.toLowerCase())
    .sort((a, b) => a.scenarioId.localeCompare(b.scenarioId));
}

export function computeStatus(
  candidate: Candidate,
  responses?: SjtResponse[],
): DerivedStatus {
  const mine = responsesFor(candidate.email, responses);
  const sjtStarted = mine.length > 0 || !!candidate.sjtStartedAt;
  const sjtDone = !!candidate.sjtCompletedAt || mine.length >= 8;

  if (candidate.thomasStatus === "completed" && sjtDone)
    return "Fully Completed";
  if (
    !candidate.declarationAccepted &&
    candidate.thomasStatus === "not_started" &&
    !sjtStarted
  )
    return "Not Started";
  if (sjtDone && candidate.thomasStatus !== "completed") return "SJT Completed";
  if (sjtStarted && !sjtDone) return "SJT In Progress";
  if (candidate.thomasStatus === "completed" && !sjtStarted)
    return "Thomas Completed";
  if (candidate.thomasStatus === "in_progress" && !sjtStarted)
    return "Thomas In Progress";
  return "Exception";
}

export type CompetencyScore = {
  competencyId: string;
  average: number;
  evidenceCount: number;
  robust: boolean;
};

export function computeCompetencyScores(
  email: string,
  opts?: {
    responses?: SjtResponse[];
    scoring?: ScoringEntry[];
    minEvidence?: number;
  },
): { overallAverage: number | null; competencies: CompetencyScore[] } {
  const responses = responsesFor(email, opts?.responses);
  const scoring = opts?.scoring || getScoring();
  const minEvidence = opts?.minEvidence ?? getConfig().minEvidenceThreshold;

  const overallPoints: number[] = [];
  const evidenceByCompetency = new Map<string, number[]>();

  responses.forEach((r) => {
    const entry = scoring.find((s) => s.answerId === r.answerId);
    if (!entry) return;
    overallPoints.push(entry.overall);
    entry.evidence.forEach((ev) => {
      const arr = evidenceByCompetency.get(ev.competencyId) || [];
      arr.push(ev.points);
      evidenceByCompetency.set(ev.competencyId, arr);
    });
  });

  const competencies: CompetencyScore[] = getCompetencies().map((c) => {
    const points = evidenceByCompetency.get(c.id) || [];
    const average = points.length
      ? points.reduce((a, b) => a + b, 0) / points.length
      : 0;
    return {
      competencyId: c.id,
      average: Math.round(average * 100) / 100,
      evidenceCount: points.length,
      robust: points.length >= minEvidence,
    };
  });

  const overallAverage = overallPoints.length
    ? Math.round(
        (overallPoints.reduce((a, b) => a + b, 0) / overallPoints.length) * 100,
      ) / 100
    : null;

  return { overallAverage, competencies };
}

// ---------- Summaries ----------

export function thomasSummary(candidate: Candidate): string {
  if (candidate.thomasStatus === "completed") {
    const when = candidate.thomasCompletedAt
      ? new Date(candidate.thomasCompletedAt).toLocaleDateString()
      : "an unrecorded date";
    return `${candidate.name} completed Thomas Assess on ${when}. Detailed Thomas scores are not yet imported into this platform (MVP scope) — status is tracked manually pending the future API/SSO integration.`;
  }
  if (candidate.thomasStatus === "in_progress") {
    return `${candidate.name} has started Thomas Assess but has not yet submitted it. No completion date on file.`;
  }
  return `${candidate.name} has not yet started Thomas Assess.${
    candidate.thomasUrl
      ? " A candidate-specific Thomas link is on file and ready to be launched."
      : " No Thomas link has been assigned yet."
  }`;
}

// Heuristic, template-based placeholder for a future LLM-generated summary.
// Comments are stored as supporting qualitative evidence (per spec) and are
// not auto-scored — this composes a readable brief from the scored data and
// any free-text comments, clearly labelled as a prototype stand-in.
export function generateAiSummary(
  email: string,
  opts?: { responses?: SjtResponse[]; scoring?: ScoringEntry[] },
): string {
  const candidates = getCandidates();
  const candidate = candidates.find(
    (c) => c.email.toLowerCase() === email.toLowerCase(),
  );
  if (!candidate) return "No candidate record found.";

  const responses = responsesFor(email, opts?.responses);
  if (responses.length === 0) {
    return `${candidate.name} has not submitted any MNext Challenge scenarios yet — no summary available.`;
  }

  const { overallAverage, competencies } = computeCompetencyScores(email, opts);
  const withEvidence = competencies.filter((c) => c.evidenceCount > 0);
  const ranked = [...withEvidence].sort((a, b) => b.average - a.average);
  const strongest = ranked.slice(0, 2);
  const weakest = ranked.slice(-2).reverse();
  const compName = (id: string) =>
    getCompetencies().find((c) => c.id === id)?.name || id;

  const comments = responses.filter((r) => r.comment.trim().length > 0);
  const avgResponseTime = Math.round(
    responses.reduce((a, r) => a + r.responseTimeSec, 0) / responses.length,
  );

  const parts: string[] = [];
  parts.push(
    `${candidate.name} completed ${responses.length} of 8 MNext Challenge scenarios with an overall judgement score of ${overallAverage ?? "—"}.`,
  );
  if (strongest.length) {
    parts.push(
      `Strongest signal in ${strongest.map((s) => compName(s.competencyId)).join(" and ")}, evidenced across ${strongest
        .map((s) => s.evidenceCount)
        .reduce((a, b) => a + b, 0)} scored responses.`,
    );
  }
  if (
    weakest.length &&
    weakest[0].competencyId !== strongest[0]?.competencyId
  ) {
    parts.push(
      `Comparatively lower evidence in ${weakest.map((s) => compName(s.competencyId)).join(" and ")}.`,
    );
  }
  parts.push(`Average response time was ${avgResponseTime}s per scenario.`);
  if (comments.length) {
    const sample = comments[0].comment.trim();
    parts.push(
      `Provided written rationale on ${comments.length} of ${responses.length} answered scenarios, e.g. on ${comments[0].scenarioId}: “${sample.length > 140 ? sample.slice(0, 140) + "…" : sample}”`,
    );
  } else {
    parts.push("No written rationale was provided alongside the answers.");
  }
  const flaggedNote = candidate.flagged
    ? " This candidate is flagged for manual integrity review — treat this summary as supporting context only."
    : "";

  return parts.join(" ") + flaggedNote;
}

// ---------- Utilities ----------

export function genToken(seedStr: string): string {
  const rand = Math.random().toString(36).slice(2, 8);
  return `tok_${seedStr
    .replace(/[^a-z0-9]/gi, "")
    .slice(0, 6)
    .toLowerCase()}${rand}`;
}

export function toCsv(rows: (string | number)[][]): string {
  return rows
    .map((row) =>
      row
        .map((cell) => {
          const s = String(cell ?? "");
          return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
        })
        .join(","),
    )
    .join("\r\n");
}

export function downloadCsv(filename: string, csv: string) {
  if (!isClient()) return;
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Minimal CSV parser for bulk candidate import (handles quoted commas).
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}
