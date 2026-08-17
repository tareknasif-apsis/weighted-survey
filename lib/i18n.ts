const en = {
  "layout.title": "MNext Challenge",
  "layout.subtitle": "Master situational judgment to unlock your potential",
  "theme.switchToLight": "Switch to light mode",
  "theme.switchToDark": "Switch to dark mode",
  "language.switchLabel": "Language switch",
  "language.en": "EN",
  "language.ms": "BM",

  "login.title": "Welcome to MNext",
  "login.subtitle":
    "Enter the email or access code from your invitation to continue.",
  "login.identifierLabel": "Email or access code",
  "login.identifierPlaceholder": "you@example.com",
  "login.submit": "Continue",
  "login.error":
    "We couldn't find a candidate with that email or access code. Please check your invitation link.",
  "login.hint":
    "Don't have an invitation? Contact your MNEXT recruitment coordinator.",

  "timer.timeLeft": "Time left",
  "timer.warningAlert": "Less than 1 minute remaining!",

  "home.candidateProfile": "Candidate Profile",
  "home.assessmentStatus": "Assessment Status",
  "home.inProgress": "In Progress",
  "home.yourJourney": "Your Journey",
  "home.moduleALabel": "Module A — KNOW",
  "home.thomasAssess": "Thomas Assess",
  "home.moduleADesc":
    "Assess your knowledge base through comprehensive evaluation",
  "home.progress": "Progress",
  "home.launch": "Launch",
  "home.moduleBLabel": "Module B — JUDGE",
  "home.mnextChallenge": "MNext Challenge",
  "home.moduleBDesc":
    "Complete 8 situational judgment scenarios. Bilingual. Timed challenges await.",
  "home.progressScenarios": "Progress: 0/8 Scenarios",
  "home.start": "Start",
  "home.continue": "Continue",
  "home.completed": "Completed",
  "home.notStarted": "Not Started",
  "home.logout": "Sign out",

  "start.readyTitle": "Ready for the Challenge?",
  "start.readyDesc":
    "You're about to face 8 scenarios that will test your judgment and decision-making skills. Stay focused and trust your instincts!",
  "start.selectLanguage": "Select Your Language / Pilih Bahasa",
  "start.english": "English",
  "start.bahasaMelayu": "Bahasa Melayu",
  "start.declarationTitle": "Integrity Declaration",
  "start.declarationSubtitle": "Please confirm before proceeding",
  "start.declarationText":
    "I confirm that I will complete the MNext assessments independently and will not use generative AI tools, chatbots, another person, or any other external source to assist me. I understand that honesty is essential for accurate assessment.",
  "start.agree": "I agree to this declaration",
  "start.beginChallenge": "Begin the Challenge",
  "start.acceptToContinue": "Accept to Continue",
  "start.scenarios": "Scenarios",
  "start.timed": "Timed",
  "start.bilingual": "Bilingual",
  "start.pleaseAccept": "Please accept the declaration",

  "level.start": "Start",
  "level.complete": "Complete",
  "level.operate": "Operate",
  "level.manage": "Manage",
  "level.influence": "Influence",
  "level.shape": "Shape the Future",
  "level.levelOf": "Level {{current}} of {{total}}",
  "level.completedTitle": "Level {{level}} Completed",
  "level.proceedTo": "Proceed to Level {{next}}: {{name}}",
  "level.continueButton": "Continue",
  "level.currentLevel": "Level {{level}}: {{name}}",

  "qid.loading": "Loading...",
  "qid.scenarioOf": "Scenario {{current}} of {{total}}",
  "qid.scenario": "Scenario",
  "qid.chooseBestResponse": "Choose Your Best Response",
  "qid.additionalComments": "Additional Comments (Optional, max 300 chars)",
  "qid.commentPlaceholder": "Share your reasoning or additional thoughts...",
  "qid.noBacktracking": "No backtracking once submitted",
  "qid.submitted": "Submitted",
  "qid.submitAndNext": "Submit & Next",
  "qid.selectOption": "Select an option",
  "qid.pleaseSelect": "Please select an option",

  "complete.title": "Challenge Complete!",
  "complete.subtitle": "Outstanding Performance",
  "complete.scenariosCompleted": "Scenarios Completed",
  "complete.timeSpent": "Time Spent",
  "complete.timeSpentValue": "{{duration}} min",
  "complete.whatsNext": "What's Next?",
  "complete.feedbackMessage":
    "Your comprehensive assessment has been recorded. Your responses demonstrate your situational judgment and decision-making capabilities. Our evaluation team will review your answers to provide detailed insights.",
  "complete.resultsAvailable":
    "Detailed results will be available within 48 hours",
  "complete.summarySent": "A summary will be sent to: {{email}}",
  "complete.securelySaved": "All your answers have been securely saved",
  "complete.returnToDashboard": "Return to Dashboard",
} as const;

export type TranslationKey = keyof typeof en;

const ms: Record<TranslationKey, string> = {
  "layout.title": "MNext Challenge",
  "layout.subtitle": "Kuasai pertimbangan situasi untuk membuka potensi anda",
  "theme.switchToLight": "Tukar ke mod cerah",
  "theme.switchToDark": "Tukar ke mod gelap",
  "language.switchLabel": "Tukar bahasa",
  "language.en": "EN",
  "language.ms": "BM",

  "login.title": "Selamat Datang ke MNext",
  "login.subtitle":
    "Masukkan e-mel atau kod akses daripada jemputan anda untuk meneruskan.",
  "login.identifierLabel": "E-mel atau kod akses",
  "login.identifierPlaceholder": "anda@contoh.com",
  "login.submit": "Teruskan",
  "login.error":
    "Kami tidak menemui calon dengan e-mel atau kod akses tersebut. Sila semak pautan jemputan anda.",
  "login.hint":
    "Tiada jemputan? Hubungi penyelaras pengambilan pekerja MNEXT anda.",

  "timer.timeLeft": "Masa berbaki",
  "timer.warningAlert": "Baki masa kurang dari 1 minit!",

  "home.candidateProfile": "Profil Calon",
  "home.assessmentStatus": "Status Penilaian",
  "home.inProgress": "Sedang Berjalan",
  "home.yourJourney": "Perjalanan Anda",
  "home.moduleALabel": "Modul A — TAHU",
  "home.thomasAssess": "Thomas Assess",
  "home.moduleADesc":
    "Nilai asas pengetahuan anda melalui penilaian menyeluruh",
  "home.progress": "Kemajuan",
  "home.launch": "Mula",
  "home.moduleBLabel": "Modul B — NILAI",
  "home.mnextChallenge": "Cabaran MNext",
  "home.moduleBDesc":
    "Lengkapkan 8 senario pertimbangan situasi. Dwibahasa. Cabaran bermasa menanti.",
  "home.progressScenarios": "Kemajuan: 0/8 Senario",
  "home.start": "Mula",
  "home.continue": "Teruskan",
  "home.completed": "Selesai",
  "home.notStarted": "Belum Bermula",
  "home.logout": "Log keluar",

  "start.readyTitle": "Bersedia untuk Cabaran?",
  "start.readyDesc":
    "Anda akan berhadapan dengan 8 senario yang akan menguji pertimbangan dan kemahiran membuat keputusan anda. Kekal fokus dan percayalah pada naluri anda!",
  "start.selectLanguage": "Select Your Language / Pilih Bahasa",
  "start.english": "English",
  "start.bahasaMelayu": "Bahasa Melayu",
  "start.declarationTitle": "Perisytiharan Integriti",
  "start.declarationSubtitle": "Sila sahkan sebelum meneruskan",
  "start.declarationText":
    "Saya mengesahkan bahawa saya akan melengkapkan penilaian MNext secara bersendirian dan tidak akan menggunakan alat AI generatif, chatbot, orang lain, atau sebarang sumber luar lain untuk membantu saya. Saya faham bahawa kejujuran adalah penting untuk penilaian yang tepat.",
  "start.agree": "Saya bersetuju dengan perisytiharan ini",
  "start.beginChallenge": "Mulakan Cabaran",
  "start.acceptToContinue": "Terima untuk Teruskan",
  "start.scenarios": "Senario",
  "start.timed": "Bermasa",
  "start.bilingual": "Dwibahasa",
  "start.pleaseAccept": "Sila terima perisytiharan",

  "level.start": "Mula",
  "level.complete": "Selesai",
  "level.operate": "Operasi",
  "level.manage": "Pengurusan",
  "level.influence": "Pengaruh",
  "level.shape": "Membentuk Masa Depan",
  "level.levelOf": "Tahap {{current}} daripada {{total}}",
  "level.completedTitle": "Tahap {{level}} Selesai",
  "level.proceedTo": "Teruskan ke Tahap {{next}}: {{name}}",
  "level.continueButton": "Teruskan",
  "level.currentLevel": "Tahap {{level}}: {{name}}",

  "qid.loading": "Memuatkan...",
  "qid.scenarioOf": "Senario {{current}} daripada {{total}}",
  "qid.scenario": "Senario",
  "qid.chooseBestResponse": "Pilih Respons Terbaik Anda",
  "qid.additionalComments": "Komen Tambahan (Pilihan, maksimum 300 aksara)",
  "qid.commentPlaceholder":
    "Kongsikan pertimbangan atau pemikiran tambahan anda...",
  "qid.noBacktracking": "Tiada perubahan selepas dihantar",
  "qid.submitted": "Dihantar",
  "qid.submitAndNext": "Hantar & Seterusnya",
  "qid.selectOption": "Pilih satu pilihan",
  "qid.pleaseSelect": "Sila pilih satu pilihan",

  "complete.title": "Cabaran Selesai!",
  "complete.subtitle": "Prestasi Cemerlang",
  "complete.scenariosCompleted": "Senario Diselesaikan",
  "complete.timeSpent": "Masa Diambil",
  "complete.timeSpentValue": "{{duration}} minit",
  "complete.whatsNext": "Apa Seterusnya?",
  "complete.feedbackMessage":
    "Penilaian menyeluruh anda telah direkodkan. Jawapan anda menunjukkan pertimbangan situasi dan kemahiran membuat keputusan anda. Pasukan penilai kami akan menyemak jawapan anda untuk memberikan wawasan terperinci.",
  "complete.resultsAvailable":
    "Keputusan terperinci akan tersedia dalam masa 48 jam",
  "complete.summarySent": "Ringkasan akan dihantar ke: {{email}}",
  "complete.securelySaved": "Semua jawapan anda telah disimpan dengan selamat",
  "complete.returnToDashboard": "Kembali ke Papan Pemuka",
};

export const translations = { en, ms };
