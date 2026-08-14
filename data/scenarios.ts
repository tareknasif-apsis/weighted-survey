export type Option = {
  id: string;
  text_en: string;
  text_ms?: string;
};

export type Scenario = {
  id: string;
  order: number;
  scenario_text_en: string;
  scenario_text_ms?: string;
  timer_seconds?: number;
  warning_seconds?: number;
  options: Option[];
};

const scenarios: Scenario[] = [
  {
    id: "Q01",
    order: 1,
    scenario_text_en:
      "A major flight is delayed due to technical issues, causing a large passenger buildup at the terminal. As duty manager, what would you do first?",
    scenario_text_ms:
      "Sebuah penerbangan utama tertangguh akibat masalah teknikal, menyebabkan penumpukan penumpang yang besar di terminal. Sebagai pengurus bertugas, apakah yang akan anda lakukan terlebih dahulu?",
    timer_seconds: 240,
    warning_seconds: 60,
    options: [
      {
        id: "Q01-A",
        text_en: "Prioritise rebooking and passenger notifications.",
        text_ms: "Utamakan penempahan semula dan pemberitahuan kepada penumpang.",
      },
      {
        id: "Q01-B",
        text_en: "Call for additional ground staff and open extra service counters.",
        text_ms: "Panggil kakitangan tambahan di darat dan buka kaunter perkhidmatan tambahan.",
      },
      {
        id: "Q01-C",
        text_en: "Focus on technical team coordination to resolve the issue quickly.",
        text_ms: "Fokus pada penyelarasan pasukan teknikal untuk menyelesaikan isu dengan cepat.",
      },
      {
        id: "Q01-D",
        text_en: "Arrange refreshments and manage passenger expectations proactively.",
        text_ms: "Sediakan minuman/makanan ringan dan uruskan jangkaan penumpang secara proaktif.",
      },
    ],
  },
  {
    id: "Q02",
    order: 2,
    scenario_text_en:
      "Team conflict arises between two supervisors on shift. What is your first action?",
    scenario_text_ms:
      "Konflik pasukan berlaku antara dua penyelia semasa syif. Apakah tindakan pertama anda?",
    timer_seconds: 240,
    warning_seconds: 60,
    options: [
      {
        id: "Q02-A",
        text_en: "Hold a private mediation with both supervisors.",
        text_ms: "Adakan pengantaraan secara persendirian dengan kedua-dua penyelia.",
      },
      {
        id: "Q02-B",
        text_en: "Reassign duties to reduce friction immediately.",
        text_ms: "Agihkan semula tugas untuk mengurangkan pergeseran dengan segera.",
      },
      {
        id: "Q02-C",
        text_en: "Escalate to HR for formal intervention.",
        text_ms: "Naikkan isu kepada HR untuk campur tangan secara rasmi.",
      },
      {
        id: "Q02-D",
        text_en: "Observe interactions to gather more information first.",
        text_ms: "Perhatikan interaksi mereka untuk mengumpul lebih banyak maklumat dahulu.",
      },
    ],
  },
  {
    id: "Q03",
    order: 3,
    scenario_text_en:
      "A new digital kiosk rollout could save costs but upset some staff roles. How do you approach it?",
    scenario_text_ms:
      "Pelancaran kiosk digital baharu boleh menjimatkan kos tetapi mengganggu sesetengah peranan kakitangan. Bagaimana anda mendekati perkara ini?",
    timer_seconds: 240,
    warning_seconds: 60,
    options: [
      {
        id: "Q03-A",
        text_en: "Pilot the kiosk in one terminal and evaluate impact.",
        text_ms: "Uji rintis kiosk di satu terminal dan nilai kesannya.",
      },
      {
        id: "Q03-B",
        text_en: "Roll out quickly to capture cost savings immediately.",
        text_ms: "Laksanakan dengan cepat untuk meraih penjimatan kos serta-merta.",
      },
      {
        id: "Q03-C",
        text_en: "Consult staff and redesign roles before launch.",
        text_ms: "Berunding dengan kakitangan dan reka semula peranan sebelum pelancaran.",
      },
      {
        id: "Q03-D",
        text_en: "Delay and collect more data from vendors.",
        text_ms: "Tangguhkan dan kumpulkan lebih banyak data daripada vendor.",
      },
    ],
  },
  {
    id: "Q04",
    order: 4,
    scenario_text_en:
      "Passenger feedback shows dissatisfaction with wayfinding. What do you prioritise?",
    scenario_text_ms:
      "Maklum balas penumpang menunjukkan ketidakpuasan hati terhadap sistem panduan arah. Apakah yang anda utamakan?",
    timer_seconds: 240,
    warning_seconds: 60,
    options: [
      {
        id: "Q04-A",
        text_en: "Quick signage fixes and clearer maps.",
        text_ms: "Pembaikan papan tanda dengan cepat dan peta yang lebih jelas.",
      },
      {
        id: "Q04-B",
        text_en: "Commission a full user-experience audit.",
        text_ms: "Tauliahkan audit pengalaman pengguna secara menyeluruh.",
      },
      {
        id: "Q04-C",
        text_en: "Train frontline staff to offer proactive guidance.",
        text_ms: "Latih kakitangan barisan hadapan untuk memberikan panduan secara proaktif.",
      },
      {
        id: "Q04-D",
        text_en: "Launch mobile wayfinding features.",
        text_ms: "Lancarkan ciri panduan arah melalui aplikasi mudah alih.",
      },
    ],
  },
  {
    id: "Q05",
    order: 5,
    scenario_text_en:
      "A commercial opportunity conflicts with a planned community event. What is your stance?",
    scenario_text_ms:
      "Satu peluang komersial bercanggah dengan acara komuniti yang telah dirancang. Apakah pendirian anda?",
    timer_seconds: 240,
    warning_seconds: 60,
    options: [
      {
        id: "Q05-A",
        text_en: "Find alternative commercial partners who fit community values.",
        text_ms: "Cari rakan niaga alternatif yang sesuai dengan nilai komuniti.",
      },
      {
        id: "Q05-B",
        text_en: "Prioritise the commercial revenue for the airport.",
        text_ms: "Utamakan pendapatan komersial untuk lapangan terbang.",
      },
      {
        id: "Q05-C",
        text_en: "Postpone the commercial deal to respect the event.",
        text_ms: "Tangguhkan urus niaga komersial demi menghormati acara tersebut.",
      },
      {
        id: "Q05-D",
        text_en: "Negotiate to adapt the commercial activation.",
        text_ms: "Berunding untuk menyesuaikan pelaksanaan aktiviti komersial.",
      },
    ],
  },
  {
    id: "Q06",
    order: 6,
    scenario_text_en:
      "A high-profile stakeholder raises a complaint about delays. How do you act?",
    scenario_text_ms:
      "Seorang pihak berkepentingan yang berpengaruh membuat aduan tentang kelewatan. Bagaimana anda bertindak?",
    timer_seconds: 240,
    warning_seconds: 60,
    options: [
      {
        id: "Q06-A",
        text_en: "Engage directly and offer a transparent plan.",
        text_ms: "Berhubung secara langsung dan tawarkan pelan yang telus.",
      },
      {
        id: "Q06-B",
        text_en: "Refer them to the formal complaints process.",
        text_ms: "Rujuk mereka kepada proses aduan rasmi.",
      },
      {
        id: "Q06-C",
        text_en: "Prioritise the stakeholder's case above others.",
        text_ms: "Utamakan kes pihak berkepentingan tersebut berbanding yang lain.",
      },
      {
        id: "Q06-D",
        text_en: "Gather facts and brief senior leadership first.",
        text_ms: "Kumpulkan fakta dan taklimatkan kepimpinan kanan terlebih dahulu.",
      },
    ],
  },
  {
    id: "Q07",
    order: 7,
    scenario_text_en:
      "Sudden budget cut requires immediate triage. What is your first move?",
    scenario_text_ms:
      "Pemotongan bajet secara mendadak memerlukan triase segera. Apakah langkah pertama anda?",
    timer_seconds: 240,
    warning_seconds: 60,
    options: [
      {
        id: "Q07-A",
        text_en: "Identify non-critical projects to pause.",
        text_ms: "Kenal pasti projek tidak kritikal untuk dihentikan sementara.",
      },
      {
        id: "Q07-B",
        text_en: "Spread cuts evenly across departments.",
        text_ms: "Agihkan pemotongan secara sama rata merentas jabatan.",
      },
      {
        id: "Q07-C",
        text_en: "Protect frontline operational budgets first.",
        text_ms: "Lindungi bajet operasi barisan hadapan terlebih dahulu.",
      },
      {
        id: "Q07-D",
        text_en: "Request temporary emergency funding from HQ.",
        text_ms: "Mohon pembiayaan kecemasan sementara daripada ibu pejabat.",
      },
    ],
  },
  {
    id: "Q08",
    order: 8,
    scenario_text_en:
      "Looking ahead, which initiative should shape the airport's future first?",
    scenario_text_ms:
      "Melihat ke hadapan, inisiatif manakah yang harus membentuk masa depan lapangan terbang terlebih dahulu?",
    timer_seconds: 240,
    warning_seconds: 60,
    options: [
      {
        id: "Q08-A",
        text_en: "Invest in sustainability and carbon reduction.",
        text_ms: "Melabur dalam kelestarian dan pengurangan karbon.",
      },
      {
        id: "Q08-B",
        text_en: "Build digital passenger services for convenience.",
        text_ms: "Bina perkhidmatan digital penumpang untuk kemudahan.",
      },
      {
        id: "Q08-C",
        text_en: "Expand commercial spaces to increase revenue.",
        text_ms: "Kembangkan ruang komersial untuk meningkatkan pendapatan.",
      },
      {
        id: "Q08-D",
        text_en: "Focus on workforce training and capability building.",
        text_ms: "Fokus pada latihan tenaga kerja dan pembinaan keupayaan.",
      },
    ],
  },
];

export default scenarios;
