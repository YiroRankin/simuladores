const sampleStudents = [
  {
    id: "diana-guzman",
    name: "DIANA ELIZABETH GUZMAN CHI",
    career: "Medico cirujano",
    event: "Open House 15 de junio 2023",
    year: "2023",
    scores: { ri: 1060, cl: 1030, pm: 1060, global: 1050 },
  },
  {
    id: "alexa-perez",
    name: "ALEXA ELIDE PEREZ CHI",
    career: "Medico cirujano",
    event: "Open House 15 de junio 2023",
    year: "2023",
    scores: { ri: 1150, cl: 1090, pm: 940, global: 1060 },
  },
  {
    id: "yamil-canul",
    name: "YAMILA DIONE CANUL CEBALLOS",
    career: "Cirujano dentista",
    event: "Open House 15 de junio 2023",
    year: "2023",
    scores: { ri: 1090, cl: 1060, pm: 1060, global: 1070 },
  },
  {
    id: "jhoanna-coba",
    name: "JHOANNA NICOLE COBA SOSA",
    career: "Medico cirujano",
    event: "Aplicaciones adicionales (Mérida)",
    year: "2023",
    scores: { ri: 970, cl: 1060, pm: 910, global: 980 },
  },
  {
    id: "pedro-tzeel",
    name: "PEDRO IVAN TZEEL HUCHIN",
    career: "Rehabilitacion",
    event: "Aplicaciones adicionales (Mérida)",
    year: "2023",
    scores: { ri: 1000, cl: 1150, pm: 1090, global: 1080 },
  },
  {
    id: "jonathan-tzab",
    name: "JONATHAN DE JESUS TZAB MATU",
    career: "Arquitectura",
    event: "Open House 15 de junio 2023",
    year: "2023",
    scores: { ri: 940, cl: 910, pm: 940, global: 930 },
  },
];

let students = sampleStudents;
let lastSavedStudentId = "";
let lastCaptureEvent = "";
let detectedResponses = [];
let batchRoster = [];
let batchItems = [];
let customEvents = [];

const examProfiles = {
  exani2: {
    id: "exani2",
    shortLabel: "EXANI II 60",
    title: "EXANI II",
    description: "Simulador EXANI II de areas basicas",
    questionCount: 60,
    cutoffLabel: "UADY 2025",
    photoDetection: true,
    key: "CBBBCCBACCABAAAAACBBACBABBCCAABBCABBBABACBBCCACCBBBACBCCBAAC".split(""),
    areas: [
      { code: "ri", label: "Redaccion indirecta", badge: "RI", start: 1, end: 20, icon: "./assets/insignia-ri.png" },
      { code: "cl", label: "Comprension lectora", badge: "CL", start: 21, end: 40, icon: "./assets/insignia-cl.png" },
      { code: "pm", label: "Pensamiento matematico", badge: "PM", start: 41, end: 60, icon: "./assets/insignia-pm.png" },
    ],
  },
  exani1: {
    id: "exani1",
    shortLabel: "EXANI I 80",
    title: "EXANI I",
    description: "Simulador EXANI I de areas basicas",
    questionCount: 80,
    cutoffLabel: "Prepas UADY",
    photoDetection: false,
    key: "BCAABCBAACABABCABBCACACABAAABABAABCCBAAAACAABACBCAACBCAACBBCCCABBACCBABCABBACABB".split(""),
    areas: [
      { code: "ri", label: "Estructura de la lengua", badge: "EL", start: 1, end: 20, icon: "./assets/insignia-spk1-el.png" },
      { code: "cl", label: "Comprension lectora", badge: "CL", start: 21, end: 40, icon: "./assets/insignia-spk1-cl.png" },
      { code: "pm", label: "Pensamiento matematico", badge: "PM", start: 41, end: 60, icon: "./assets/insignia-spk1-pm.png" },
      { code: "pc", label: "Pensamiento analitico", badge: "PA", start: 61, end: 80, icon: "./assets/insignia-spk1-pa.png" },
    ],
  },
};

let currentExamId = "exani2";
let answerKey = [...examProfiles[currentExamId].key];

const uady2025 = [
  { career: "Actuaria", cutoff: 1043, applicants: 154, admitted: 115, admissionRate: 74.68 },
  { career: "Administracion", cutoff: 1022, applicants: 271, admitted: 176, admissionRate: 64.94 },
  { career: "Administracion de tecnologias de la informacion", cutoff: 930, applicants: 35, admitted: 35, admissionRate: 100 },
  { career: "Agroecologia", cutoff: 861, applicants: 30, admitted: 30, admissionRate: 100 },
  { career: "Antropologia", cutoff: 870, applicants: 19, admitted: 19, admissionRate: 100 },
  { career: "Arqueologia", cutoff: 917, applicants: 23, admitted: 23, admissionRate: 100 },
  { career: "Arquitectura", cutoff: 1130, applicants: 802, admitted: 196, admissionRate: 24.44 },
  { career: "Artes Visuales", cutoff: 1030, applicants: 119, admitted: 64, admissionRate: 53.78 },
  { career: "Biologia", cutoff: 904, applicants: 102, admitted: 102, admissionRate: 100 },
  { career: "Biologia Marina", cutoff: 935, applicants: 169, admitted: 163, admissionRate: 96.45 },
  { career: "Ciencias de la Computacion", cutoff: 904, applicants: 28, admitted: 28, admissionRate: 100 },
  { career: "Cirujano Dentista", cutoff: 1157, applicants: 784, admitted: 168, admissionRate: 21.43 },
  { career: "Comercio internacional", cutoff: 970, applicants: 146, admitted: 135, admissionRate: 92.47 },
  { career: "Comunicacion Social", cutoff: 870, applicants: 79, admitted: 79, admissionRate: 100 },
  { career: "Contador Publico (Merida)", cutoff: 1030, applicants: 649, admitted: 448, admissionRate: 69.03 },
  { career: "Contador Publico (Tizimin)", cutoff: 996, applicants: 59, admitted: 43, admissionRate: 72.88 },
  { career: "Derecho", cutoff: 1087, applicants: 871, admitted: 355, admissionRate: 40.76 },
  { career: "Diseno del Habitat", cutoff: 874, applicants: 29, admitted: 29, admissionRate: 100 },
  { career: "Economia", cutoff: 987, applicants: 105, admitted: 92, admissionRate: 87.62 },
  { career: "Educacion (Merida)", cutoff: 952, applicants: 116, admitted: 103, admissionRate: 88.79 },
  { career: "Educacion (Tizimin)", cutoff: 857, applicants: 27, admitted: 27, admissionRate: 100 },
  { career: "Enfermeria (Merida)", cutoff: 1143, applicants: 472, admitted: 81, admissionRate: 17.16 },
  { career: "Enfermeria (Tizimin)", cutoff: 1022, applicants: 78, admitted: 38, admissionRate: 48.72 },
  { career: "Ensenanza de las matematicas", cutoff: 913, applicants: 28, admitted: 28, admissionRate: 100 },
  { career: "Ensenanza del Idioma ingles", cutoff: 1030, applicants: 72, admitted: 53, admissionRate: 73.61 },
  { career: "Historia", cutoff: 887, applicants: 26, admitted: 26, admissionRate: 100 },
  { career: "Ing. Civil", cutoff: 1035, applicants: 321, admitted: 187, admissionRate: 58.26 },
  { career: "Ing. en Alimentos", cutoff: 896, applicants: 28, admitted: 28, admissionRate: 100 },
  { career: "Ing. en Biotecnologia", cutoff: 900, applicants: 94, admitted: 94, admissionRate: 100 },
  { career: "Ing. en Computacion", cutoff: 904, applicants: 40, admitted: 40, admissionRate: 100 },
  { career: "Ing. en Energias Renovables", cutoff: 961, applicants: 51, admitted: 45, admissionRate: 88.24 },
  { career: "Ing. en Mecatronica", cutoff: 1104, applicants: 318, admitted: 118, admissionRate: 37.11 },
  { career: "Ing. Fisica", cutoff: 926, applicants: 74, admitted: 74, admissionRate: 100 },
  { career: "Ing. Industrial Logistica", cutoff: 870, applicants: 146, admitted: 146, admissionRate: 100 },
  { career: "Ing. Quimica Industrial", cutoff: 848, applicants: 99, admitted: 99, admissionRate: 100 },
  { career: "Ing. Software (Merida)", cutoff: 1113, applicants: 316, admitted: 128, admissionRate: 40.51 },
  { career: "Ing. Software (Tizimin)", cutoff: 900, applicants: 22, admitted: 22, admissionRate: 100 },
  { career: "Literatura Latinoamericana", cutoff: 978, applicants: 32, admitted: 32, admissionRate: 100 },
  { career: "Matematicas", cutoff: 943, applicants: 31, admitted: 31, admissionRate: 100 },
  { career: "Medico Cirujano", cutoff: 1248, applicants: 3724, admitted: 247, admissionRate: 6.63 },
  { career: "Medico Veterinario Zootecnista", cutoff: 1113, applicants: 971, admitted: 205, admissionRate: 21.11 },
  { career: "Mercadotecnia y Negocios Internacionales", cutoff: 1065, applicants: 496, admitted: 257, admissionRate: 51.81 },
  { career: "Nutricion", cutoff: 1109, applicants: 268, admitted: 99, admissionRate: 36.94 },
  { career: "Psicologia", cutoff: 1061, applicants: 599, admitted: 321, admissionRate: 53.59 },
  { career: "Quimica Aplicada", cutoff: 943, applicants: 29, admitted: 29, admissionRate: 100 },
  { career: "Quimico farmaceutico biologo", cutoff: 1048, applicants: 337, admitted: 202, admissionRate: 59.94 },
  { career: "Rehabilitacion", cutoff: 1117, applicants: 253, admitted: 81, admissionRate: 32.02 },
  { career: "Trabajo Social", cutoff: 900, applicants: 40, admitted: 40, admissionRate: 100 },
  { career: "Turismo", cutoff: 952, applicants: 113, admitted: 103, admissionRate: 91.15 },
];

const sheetCareers = [
  "Actuaría",
  "Administración",
  "Administración de tecnologías de la información",
  "Agroecología",
  "Antropología social",
  "Arqueología",
  "Arquitectura",
  "Artes visuales",
  "Biología",
  "Biología marina",
  "Ciencias de la computación",
  "Cirujano dentista",
  "Comercio internacional",
  "Comunicación social",
  "Contador público (Mérida)",
  "Contador público (Tizimín)",
  "Derecho",
  "Diseño del hábitat",
  "Economía",
  "Educación (Mérida)",
  "Educación (Tizimín)",
  "Enfermería (Mérida)",
  "Enfermería (Tizimín)",
  "Enseñanza de las matemáticas",
  "Enseñanza del idioma inglés",
  "Historia",
  "Ingeniería civil",
  "Ingeniería de software (Mérida)",
  "Ingeniería de software (Tizimín)",
  "Ingeniería en alimentos",
  "Ingeniería en biotecnología",
  "Ingeniería en computación",
  "Ingeniería en energías renovables",
  "Ingeniería física",
  "Ingeniería industrial logística",
  "Ingeniería mecatrónica",
  "Ingeniería química industrial",
  "Literatura latinoamericana",
  "Matemáticas",
  "Médico cirujano",
  "Médico veterinario zootecnista",
  "Mercadotecnia y negocios internacionales",
  "Nutrición",
  "Psicología",
  "Química aplicada",
  "Químico farmacéutico biólogo",
  "Rehabilitación",
  "Trabajo social",
  "Turismo",
  "Relaciones Internacionales",
  "INGENIERIA EN CIENCIAS DE DATOS",
  "GASTRONOMIA",
  "CINEMATOGRAFIA",
  "NEGOCIOS",
  "Aviacion",
  "Nanotecnologia",
  "Veracruz",
];

const exaniOneCareers = [
  "Preparatoria Uno",
  "Preparatoria Dos",
  "UABIC",
];

const careerAliases = {
  "antropologia social": "antropologia",
  "ingenieria civil": "ing. civil",
  "ingenieria de software merida": "ing. software merida",
  "ingenieria de software tizimin": "ing. software tizimin",
  "ingenieria en alimentos": "ing. en alimentos",
  "ingenieria en biotecnologia": "ing. en biotecnologia",
  "ingenieria en computacion": "ing. en computacion",
  "ingenieria en energias renovables": "ing. en energias renovables",
  "ingenieria fisica": "ing. fisica",
  "ingenieria industrial logistica": "ing. industrial logistica",
  "ingenieria mecatronica": "ing. en mecatronica",
  "ingenieria quimica industrial": "ing. quimica industrial",
};

const exaniOneCareerAliases = {
  "prepa 1": "Preparatoria Uno",
  "prepa uno": "Preparatoria Uno",
  "preparatoria 1": "Preparatoria Uno",
  "preparatoria uno": "Preparatoria Uno",
  "prepa 2": "Preparatoria Dos",
  "prepa dos": "Preparatoria Dos",
  "preparatoria 2": "Preparatoria Dos",
  "preparatoria dos": "Preparatoria Dos",
  "uabic": "UABIC",
};

function normalizeCareer(value) {
  const cleaned = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  return careerAliases[cleaned] || cleaned;
}

const cutoffs = Object.fromEntries(uady2025.map((item) => [normalizeCareer(item.career), item]));

const exaniOneBenchmarks = {
  general: {
    state: "Yucatan",
    applicants: 19050,
    mean: 994,
    standardDeviation: 52,
    max: 1254,
    min: 700,
  },
  areas: {
    ri: { mean: 995, standardDeviation: 80 },
    cl: { mean: 1050, standardDeviation: 74 },
    pm: { mean: 964, standardDeviation: 65 },
    pc: { mean: 978, standardDeviation: 64 },
  },
  cutoffs: {
    [normalizeText("Preparatoria Uno")]: {
      career: "Preparatoria Uno",
      label: "Prepa 1",
      cutoff: 1032,
      applicants: 2053,
      admitted: 1346,
      max: 1249,
    },
    [normalizeText("Preparatoria Dos")]: {
      career: "Preparatoria Dos",
      label: "Prepa 2",
      cutoff: 1065,
      applicants: 2752,
      admitted: 1353,
      max: 1245,
    },
    [normalizeText("UABIC")]: {
      career: "UABIC",
      label: "Prepa 3 / UABIC",
      cutoff: 963,
      applicants: 481,
      admitted: 377,
      max: 1194,
    },
  },
};

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const areaLabels = {
  ri: "Redacción indirecta",
  cl: "Comprensión lectora",
  pm: "Pensamiento matemático",
};

areaLabels.pc = "Pensamiento cientifico";

function currentProfile() {
  return examProfiles[currentExamId] || examProfiles.exani2;
}

function currentAreas() {
  return currentProfile().areas;
}

function currentQuestionCount() {
  return currentProfile().questionCount;
}

function areaElementId(area, suffix) {
  return `${area.code}${suffix}`;
}

function currentCareerOptions() {
  return currentExamId === "exani1" ? exaniOneCareers : sheetCareers;
}

function currentAreaLabel(code) {
  return currentAreas().find((area) => area.code === code)?.label || areaLabels[code] || code.toUpperCase();
}

function getCutoffForStudent(student) {
  if (currentExamId === "exani1") {
    const cutoff = exaniOneBenchmarks.cutoffs[normalizeText(student.career)] || null;
    if (!cutoff) return null;
    return {
      ...cutoff,
      admissionRate: Number(((cutoff.admitted / cutoff.applicants) * 100).toFixed(2)),
      sourceLabel: "Prepas UADY",
    };
  }

  const cutoff = cutoffs[normalizeCareer(student.career)] || null;
  return cutoff ? { ...cutoff, sourceLabel: "UADY 2025" } : null;
}

function getHistoryAverage() {
  if (currentExamId === "exani1") return exaniOneBenchmarks.general.mean;
  return average(students.map((item) => item.scores.global));
}

function getAreaAverage(area, comparisonGroup) {
  if (currentExamId === "exani1" && exaniOneBenchmarks.areas[area.code]) {
    return exaniOneBenchmarks.areas[area.code].mean;
  }
  return average(comparisonGroup.map((item) => item.scores[area.code]));
}

function cutoffMessageFor(student, cutoff, delta) {
  if (!cutoff) {
    return currentExamId === "exani1"
      ? `No encontre punto de corte para ${student.career}. Usa Preparatoria Uno, Preparatoria Dos o UABIC.`
      : `No encontré un corte UADY 2025 para ${student.career}. Hay que agregar un alias de carrera.`;
  }

  if (currentExamId === "exani1") {
    const position = delta >= 0
      ? `supera por ${formatScore(delta)} puntos`
      : `esta a ${formatScore(Math.abs(delta))} puntos`;
    return `Su puntaje ${position} del corte de ${cutoff.label} (${formatScore(cutoff.cutoff)}). Admitidos: ${cutoff.admitted} de ${cutoff.applicants} aspirantes (${cutoff.admissionRate}%). Puntaje maximo: ${formatScore(cutoff.max)}; media estatal: ${formatScore(exaniOneBenchmarks.general.mean)}.`;
  }

  return delta >= 0
    ? `El puntaje supera el corte UADY 2025 de ${student.career}. En 2025 ingresaron ${cutoff.admitted} de ${cutoff.applicants} aspirantes (${cutoff.admissionRate}%).`
    : `Está a ${Math.abs(delta)} puntos del corte UADY 2025 de ${student.career}. En 2025 ingresaron ${cutoff.admitted} de ${cutoff.applicants} aspirantes (${cutoff.admissionRate}%).`;
}

const els = {
  tabs: document.querySelectorAll("[data-tab]"),
  views: document.querySelectorAll("[data-view]"),
  heroExamCopy: document.querySelector(".hero-copy p:last-child"),
  examStatusItem: document.querySelector(".status-meta .status-item"),
  areaCards: document.querySelector(".areas"),
  areaCountCopy: document.querySelector(".section-title-row p"),
  cutoffBadge: document.querySelector(".cutoff-card .badge"),
  comparisonStatus: document.querySelector(".status-meta .status-item:nth-child(2) strong"),
  captureIntro: document.querySelector("#captureView .section-heading .muted"),
  answersTitle: document.querySelector("#answersGrid")?.closest(".panel")?.querySelector(".card-title"),
  captureAreaList: document.querySelector(".capture-area-list"),
  printExamName: document.querySelector(".print-header span"),
  printExamMeta: document.querySelector(".print-header small"),
  printAreaRows: document.querySelector(".print-area-box tbody"),
  eventFilter: document.querySelector("#eventFilter"),
  studentSearch: document.querySelector("#studentSearch"),
  studentSelect: document.querySelector("#studentSelect"),
  newEventInput: document.querySelector("#newEventInput"),
  addEventButton: document.querySelector("#addEventButton"),
  printButton: document.querySelector("#printButton"),
  resetButton: document.querySelector("#resetButton"),
  captureForm: document.querySelector("#captureForm"),
  captureName: document.querySelector("#captureName"),
  captureEmail: document.querySelector("#captureEmail"),
  captureCareer: document.querySelector("#captureCareer"),
  captureEvent: document.querySelector("#captureEvent"),
  captureYear: document.querySelector("#captureYear"),
  captureVersion: document.querySelector("#captureVersion"),
  eventList: document.querySelector("#eventList"),
  answersGrid: document.querySelector("#answersGrid"),
  clearCaptureButton: document.querySelector("#clearCaptureButton"),
  saveCaptureButton: document.querySelector("#saveCaptureButton"),
  postSaveActions: document.querySelector("#postSaveActions"),
  viewSavedReportButton: document.querySelector("#viewSavedReportButton"),
  sameEventButton: document.querySelector("#sameEventButton"),
  newCaptureButton: document.querySelector("#newCaptureButton"),
  batchReadyCount: document.querySelector("#batchReadyCount"),
  batchStatus: document.querySelector("#batchStatus"),
  batchEvent: document.querySelector("#batchEvent"),
  batchYear: document.querySelector("#batchYear"),
  batchVersion: document.querySelector("#batchVersion"),
  batchRoster: document.querySelector("#batchRoster"),
  parseRosterButton: document.querySelector("#parseRosterButton"),
  batchPhotoInput: document.querySelector("#batchPhotoInput"),
  batchList: document.querySelector("#batchList"),
  batchMessage: document.querySelector("#batchMessage"),
  saveBatchButton: document.querySelector("#saveBatchButton"),
  clearBatchButton: document.querySelector("#clearBatchButton"),
  photoInput: document.querySelector("#photoInput"),
  clearPhotoButton: document.querySelector("#clearPhotoButton"),
  photoPreview: document.querySelector("#photoPreview"),
  photoPreviewImage: document.querySelector("#photoPreviewImage"),
  photoStatus: document.querySelector("#photoStatus"),
  photoMeta: document.querySelector("#photoMeta"),
  photoMessage: document.querySelector("#photoMessage"),
  detectedCount: document.querySelector("#detectedCount"),
  detectionMeta: document.querySelector("#detectionMeta"),
  detectAnswersButton: document.querySelector("#detectAnswersButton"),
  auditNameCheck: document.querySelector("#auditNameCheck"),
  auditFrameCheck: document.querySelector("#auditFrameCheck"),
  auditLightCheck: document.querySelector("#auditLightCheck"),
  auditMarksCheck: document.querySelector("#auditMarksCheck"),
  goManualCaptureButton: document.querySelector("#goManualCaptureButton"),
  nameReader: document.querySelector("#nameReader"),
  paternalCrop: document.querySelector("#paternalCrop"),
  maternalCrop: document.querySelector("#maternalCrop"),
  namesCrop: document.querySelector("#namesCrop"),
  paternalInput: document.querySelector("#paternalInput"),
  maternalInput: document.querySelector("#maternalInput"),
  namesInput: document.querySelector("#namesInput"),
  composedName: document.querySelector("#composedName"),
  sendNameToCaptureButton: document.querySelector("#sendNameToCaptureButton"),
  suggestNameButton: document.querySelector("#suggestNameButton"),
  nameOcrMessage: document.querySelector("#nameOcrMessage"),
  captureGlobalScore: document.querySelector("#captureGlobalScore"),
  captureStatus: document.querySelector("#captureStatus"),
  answeredCount: document.querySelector("#answeredCount"),
  correctCount: document.querySelector("#correctCount"),
  captureRiScore: document.querySelector("#captureRiScore"),
  captureClScore: document.querySelector("#captureClScore"),
  capturePmScore: document.querySelector("#capturePmScore"),
  captureRiProgress: document.querySelector("#captureRiProgress"),
  captureClProgress: document.querySelector("#captureClProgress"),
  capturePmProgress: document.querySelector("#capturePmProgress"),
  saveMessage: document.querySelector("#saveMessage"),
  baseStatus: document.querySelector("#baseStatus"),
  eventAverage: document.querySelector("#eventAverage"),
  eventMeta: document.querySelector("#eventMeta"),
  studentName: document.querySelector("#studentName"),
  studentMeta: document.querySelector("#studentMeta"),
  globalScore: document.querySelector("#globalScore"),
  cutoffScore: document.querySelector("#cutoffScore"),
  cutoffDelta: document.querySelector("#cutoffDelta"),
  cutoffMeter: document.querySelector("#cutoffMeter"),
  cutoffMessage: document.querySelector("#cutoffMessage"),
  studentBar: document.querySelector("#studentBar"),
  eventBar: document.querySelector("#eventBar"),
  historyBar: document.querySelector("#historyBar"),
  studentBarValue: document.querySelector("#studentBarValue"),
  eventBarValue: document.querySelector("#eventBarValue"),
  historyBarValue: document.querySelector("#historyBarValue"),
  riScore: document.querySelector("#riScore"),
  clScore: document.querySelector("#clScore"),
  pmScore: document.querySelector("#pmScore"),
  riCompare: document.querySelector("#riCompare"),
  clCompare: document.querySelector("#clCompare"),
  pmCompare: document.querySelector("#pmCompare"),
  riAverage: document.querySelector("#riAverage"),
  clAverage: document.querySelector("#clAverage"),
  pmAverage: document.querySelector("#pmAverage"),
  riDelta: document.querySelector("#riDelta"),
  clDelta: document.querySelector("#clDelta"),
  pmDelta: document.querySelector("#pmDelta"),
  riMessage: document.querySelector("#riMessage"),
  clMessage: document.querySelector("#clMessage"),
  pmMessage: document.querySelector("#pmMessage"),
  advisorMessage: document.querySelector("#advisorMessage"),
  printStudentName: document.querySelector("#printStudentName"),
  printStudentCareer: document.querySelector("#printStudentCareer"),
  printStudentEvent: document.querySelector("#printStudentEvent"),
  printGlobalScore: document.querySelector("#printGlobalScore"),
  printCutoffScore: document.querySelector("#printCutoffScore"),
  printCutoffDelta: document.querySelector("#printCutoffDelta"),
  printEventAverage: document.querySelector("#printEventAverage"),
  printCutoffMessage: document.querySelector("#printCutoffMessage"),
  printRiScore: document.querySelector("#printRiScore"),
  printClScore: document.querySelector("#printClScore"),
  printPmScore: document.querySelector("#printPmScore"),
  printAdvisorMessage: document.querySelector("#printAdvisorMessage"),
  printStudyFocus: document.querySelector("#printStudyFocus"),
  printNextGoal: document.querySelector("#printNextGoal"),
  printRecommendation: document.querySelector("#printRecommendation"),
};

function average(values) {
  const valid = values.filter((value) => Number.isFinite(value));
  if (!valid.length) return 0;
  return Math.round(valid.reduce((sum, value) => sum + value, 0) / valid.length);
}

function formatScore(value) {
  return Number.isFinite(value) ? value.toLocaleString("es-MX") : "-";
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function scoreMessage(score, averageScore) {
  const delta = score - averageScore;
  if (delta >= 40) return "Arriba del promedio: puede sostener esta fortaleza.";
  if (delta >= -20) return "Cerca del promedio: hay margen para subir con práctica focalizada.";
  return "Área prioritaria: conviene reforzarla antes del siguiente simulador.";
}

function formatAreaDelta(delta) {
  if (delta > 0) return `↑ ${formatScore(delta)} sobre la media`;
  if (delta < 0) return `↓ ${formatScore(Math.abs(delta))} bajo la media`;
  return "→ En la media";
}

function getFilteredStudents() {
  const selectedEvent = els.eventFilter.value;
  const search = normalizeText(els.studentSearch?.value || "");
  const byEvent = selectedEvent === "all"
    ? students
    : students.filter((student) => student.event === selectedEvent);

  if (!search) return byEvent;
  return byEvent.filter((student) => {
    return [student.name, student.career, student.event, student.year]
      .some((value) => normalizeText(value).includes(search));
  });
}

function setBar(element, score) {
  const min = 700;
  const max = 1300;
  const pct = Math.max(0, Math.min(100, ((score - min) / (max - min)) * 100));
  element.style.width = `${pct}%`;
}

function normalizeStudent(raw) {
  const eventInfo = normalizeEventAndYear(raw.event, raw.year);
  const scores = { global: Number(raw.scores?.global) || 0 };
  currentAreas().forEach((area) => {
    scores[area.code] = Number(raw.scores?.[area.code]) || 0;
  });
  return {
    id: raw.id,
    exam: raw.exam || raw.examId || currentExamId,
    name: raw.name,
    career: raw.career || "Sin carrera",
    event: eventInfo.event,
    year: eventInfo.year,
    scores,
  };
}

function normalizeEventAndYear(eventValue, yearValue) {
  const rawEvent = String(eventValue || "").trim() || "Sin evento";
  const rawYear = String(yearValue || "").trim();
  const eventYear = rawEvent.match(/\b(20\d{2})\b/)?.[1] || "";
  const trustedYear = rawYear || eventYear;
  let event = rawEvent;

  if (eventYear && rawYear && eventYear !== rawYear) {
    event = rawEvent.replace(/\b20\d{2}\b/, rawYear);
  }

  return {
    event,
    year: trustedYear,
  };
}

async function loadStudents() {
  const apiUrl = window.SIMULADORES_CONFIG?.apiUrl?.trim();
  if (!apiUrl) return;

  try {
    const payload = await loadPayload(apiUrl);
    applyStudentPayload(payload);
  } catch (error) {
    console.warn("No se pudieron cargar datos reales. Usando muestra local.", error);
    students = sampleStudents;
  }
}

async function loadPayload(apiUrl) {
  const separator = apiUrl.includes("?") ? "&" : "?";
  const examUrl = `${apiUrl}${separator}exam=${encodeURIComponent(currentExamId)}`;
  try {
    const response = await fetch(examUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    return loadPayloadJsonp(examUrl);
  }
}

function loadPayloadJsonp(apiUrl) {
  return new Promise((resolve, reject) => {
    const callbackName = `simuladoresCallback${Date.now()}`;
    const script = document.createElement("script");
    const separator = apiUrl.includes("?") ? "&" : "?";

    const cleanup = () => {
      delete window[callbackName];
      script.remove();
    };

    window[callbackName] = (payload) => {
      cleanup();
      resolve(payload);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("No se pudo cargar JSONP"));
    };

    script.src = `${apiUrl}${separator}callback=${callbackName}`;
    document.head.appendChild(script);
  });
}

function applyStudentPayload(payload) {
  if (!Array.isArray(payload.students)) {
    throw new Error("El endpoint no regreso alumnos");
  }

  if (payload.meta?.questionCount && Number(payload.meta.questionCount) !== currentQuestionCount()) {
    students = [];
    answerKey = [...currentProfile().key];
    return;
  }

  if (Array.isArray(payload.key) && payload.key.length === currentQuestionCount()) {
    answerKey = payload.key;
  }

  students = payload.students
    .map(normalizeStudent)
    .filter((student) => student.name && student.scores.global);
}

function setActiveView(viewName) {
  els.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === viewName));
  els.views.forEach((view) => view.classList.toggle("active", view.dataset.view === viewName));
  if (viewName === "capture") {
    setTimeout(() => focusQuestion(1), 0);
  }
}

function renderOptions() {
  const currentEvent = els.eventFilter.value || "all";
  const events = ["all", ...new Set(students.map((student) => student.event).concat(customEvents).filter(Boolean))];
  els.eventFilter.innerHTML = events
    .map((event) => `<option value="${event}">${event === "all" ? "Todos los eventos" : event}</option>`)
    .join("");
  els.eventFilter.value = events.includes(currentEvent) ? currentEvent : "all";
  renderCaptureLists();
  renderStudentOptions();
}

function renderExamControls() {
  const profile = currentProfile();
  if (els.examStatusItem && !document.querySelector("#examSelect")) {
    els.examStatusItem.classList.add("exam-status-item");
    els.examStatusItem.innerHTML = `
      <span>Examen</span>
      <select id="examSelect" aria-label="Seleccionar examen">
        ${Object.values(examProfiles).map((exam) => `<option value="${exam.id}">${exam.shortLabel}</option>`).join("")}
      </select>
    `;
  }

  const examSelect = document.querySelector("#examSelect");
  if (examSelect) {
    examSelect.value = currentExamId;
    examSelect.onchange = () => changeExam(examSelect.value);
  }

  if (els.heroExamCopy) els.heroExamCopy.textContent = profile.description;
  if (els.areaCountCopy) {
    els.areaCountCopy.textContent = `${profile.areas.length} areas basicas evaluadas en ${profile.questionCount} reactivos.`;
  }
  if (els.captureIntro) {
    els.captureIntro.textContent = `Registra el intento de ${profile.questionCount} preguntas. La app valida, califica y guarda en el Sheet original.`;
  }
  if (els.answersTitle) els.answersTitle.textContent = `Respuestas 1-${profile.questionCount}`;
  if (els.saveMessage && !els.saveMessage.classList.contains("ok") && !els.saveMessage.classList.contains("error")) {
    els.saveMessage.textContent = `Lista para validar cuando captures las ${profile.questionCount} respuestas.`;
  }
  if (els.cutoffBadge) els.cutoffBadge.textContent = profile.cutoffLabel;
  if (els.comparisonStatus) els.comparisonStatus.textContent = profile.cutoffLabel;
  if (els.printExamName) els.printExamName.textContent = `Reporte de resultados ${profile.title}`;
  if (els.printExamMeta) els.printExamMeta.textContent = `${profile.cutoffLabel} - Simulador de ${profile.questionCount} reactivos`;
}

async function changeExam(examId) {
  if (!examProfiles[examId] || examId === currentExamId) return;
  currentExamId = examId;
  answerKey = [...currentProfile().key];
  students = [];
  detectedResponses = [];
  batchItems = [];
  lastSavedStudentId = "";
  buildAnswersGrid();
  renderAreaCards();
  renderCaptureAreaSummary();
  renderExamControls();
  updatePhotoDetectionState();
  updateCapturePreview();
  renderOptions();
  await loadStudents();
  renderOptions();
  renderBatchList();
  updateBatchSummary();
}

function renderAreaCards() {
  if (!els.areaCards) return;
  const averageLabel = currentExamId === "exani1" ? "Media estatal" : "Promedio";
  els.areaCards.innerHTML = currentAreas().map((area) => `
    <article class="area-card" data-area="${area.code}">
      <div class="area-card-head">
        <span>${area.badge}</span>
        <img src="${area.icon}" alt="" />
      </div>
      <h3>${area.label}</h3>
      <strong id="${areaElementId(area, "Score")}">-</strong>
      <div class="area-compare neutral" id="${areaElementId(area, "Compare")}">
        <span>${averageLabel} <b id="${areaElementId(area, "Average")}">-</b></span>
        <em id="${areaElementId(area, "Delta")}">-</em>
      </div>
      <p id="${areaElementId(area, "Message")}">-</p>
    </article>
  `).join("");
}

function renderCaptureAreaSummary() {
  if (!els.captureAreaList) return;
  els.captureAreaList.innerHTML = currentAreas().map((area) => `
    <p>
      <span>${area.badge} <small id="capture${area.badge}Progress">0/${area.end - area.start + 1}</small></span>
      <strong id="capture${area.badge}Score">-</strong>
    </p>
  `).join("");
}

function renderCaptureLists() {
  const currentCareer = els.captureCareer.value;
  const careers = currentExamId === "exani1"
    ? [...currentCareerOptions()]
    : [...currentCareerOptions()].sort((a, b) => a.localeCompare(b, "es"));
  const label = currentExamId === "exani1" ? "Selecciona preparatoria" : "Selecciona carrera";
  els.captureCareer.innerHTML = `<option value="">${label}</option>` + careers
    .map((career) => `<option value="${career}">${career}</option>`)
    .join("");
  if (careers.includes(currentCareer)) {
    els.captureCareer.value = currentCareer;
  }

  const events = [...new Set(students.map((student) => student.event).concat(customEvents).filter(Boolean))].sort();
  els.eventList.innerHTML = events.map((event) => `<option value="${event}"></option>`).join("");
  els.captureYear.value = "2025";
}

function renderStudentOptions() {
  const selectedStudent = els.studentSelect.value;
  const filtered = getFilteredStudents();
  els.studentSelect.innerHTML = filtered
    .map((student) => `<option value="${student.id}">${student.name}</option>`)
    .join("");

  if (filtered.length) {
    const nextStudent = filtered.some((student) => student.id === selectedStudent)
      ? selectedStudent
      : filtered[0].id;
    els.studentSelect.value = nextStudent;
    renderReport(nextStudent);
  } else {
    renderEmptyReport();
  }
}

function renderEventSummary() {
  const filtered = getFilteredStudents();
  const eventAvg = average(filtered.map((student) => student.scores.global));
  els.eventAverage.textContent = formatScore(eventAvg);
  els.eventMeta.textContent = `${filtered.length} alumno${filtered.length === 1 ? "" : "s"} en comparativo`;
  return eventAvg;
}

function renderEmptyReport() {
  els.eventAverage.textContent = "-";
  els.eventMeta.textContent = "Sin alumnos para este filtro";
  els.studentName.textContent = "Sin resultados";
  els.studentMeta.textContent = "Ajusta la búsqueda o selecciona otro evento.";
  [
    "globalScore", "cutoffScore", "cutoffDelta", "studentBarValue", "eventBarValue", "historyBarValue",
    "riScore", "clScore", "pmScore",
  ].forEach((key) => {
    els[key].textContent = "-";
  });
  [els.studentBar, els.eventBar, els.historyBar, els.cutoffMeter].forEach((bar) => {
    bar.style.width = "0%";
  });
  els.cutoffMessage.textContent = "No hay alumnos que coincidan con el filtro actual.";
  els.riMessage.textContent = "-";
  els.clMessage.textContent = "-";
  els.pmMessage.textContent = "-";
  ["ri", "cl", "pm"].forEach((area) => {
    els[`${area}Average`].textContent = "-";
    els[`${area}Delta`].textContent = "-";
    els[`${area}Compare`].className = "area-compare neutral";
  });
  els.advisorMessage.textContent = "-";
  renderPrintReport(null);
}

function renderReport(studentId) {
  const student = students.find((item) => item.id === studentId) || getFilteredStudents()[0];
  if (!student) return;

  const eventAvg = renderEventSummary();
  const historyAvg = getHistoryAverage();
  const comparisonGroup = getFilteredStudents();
  const cutoff = getCutoffForStudent(student);
  const delta = cutoff ? student.scores.global - cutoff.cutoff : 0;
  const areaAverages = Object.fromEntries(
    currentAreas().map((area) => [area.code, getAreaAverage(area, comparisonGroup)])
  );

  els.studentName.textContent = student.name;
  els.studentMeta.textContent = `${student.career} | ${student.event} | ${student.year}`;
  els.globalScore.textContent = formatScore(student.scores.global);
  els.cutoffScore.textContent = cutoff ? formatScore(cutoff.cutoff) : "Sin corte";
  els.cutoffDelta.textContent = cutoff ? `${delta >= 0 ? "+" : ""}${formatScore(delta)}` : "-";
  els.cutoffDelta.style.color = delta >= 0 ? "var(--green)" : "var(--red)";
  els.cutoffMeter.style.width = cutoff ? `${Math.max(8, Math.min(100, (student.scores.global / cutoff.cutoff) * 100))}%` : "8%";
  els.cutoffMeter.style.background = delta >= 0 ? "var(--green)" : "var(--red)";
  els.cutoffMessage.textContent = cutoff
    ? delta >= 0
      ? `El puntaje supera el corte UADY 2025 de ${student.career}. En 2025 ingresaron ${cutoff.admitted} de ${cutoff.applicants} aspirantes (${cutoff.admissionRate}%).`
      : `Está a ${Math.abs(delta)} puntos del corte UADY 2025 de ${student.career}. En 2025 ingresaron ${cutoff.admitted} de ${cutoff.applicants} aspirantes (${cutoff.admissionRate}%).`
    : `No encontré un corte UADY 2025 para ${student.career}. Hay que agregar un alias de carrera.`;

  if (currentExamId === "exani1") {
    els.cutoffMessage.textContent = cutoffMessageFor(student, cutoff, delta);
  }

  els.studentBarValue.textContent = formatScore(student.scores.global);
  els.eventBarValue.textContent = formatScore(eventAvg);
  els.historyBarValue.textContent = formatScore(historyAvg);
  setBar(els.studentBar, student.scores.global);
  setBar(els.eventBar, eventAvg);
  setBar(els.historyBar, historyAvg);

  currentAreas().forEach((area) => {
    const areaDelta = student.scores[area.code] - areaAverages[area.code];
    document.querySelector(`#${areaElementId(area, "Score")}`).textContent = formatScore(student.scores[area.code]);
    document.querySelector(`#${areaElementId(area, "Average")}`).textContent = formatScore(areaAverages[area.code]);
    document.querySelector(`#${areaElementId(area, "Delta")}`).textContent = formatAreaDelta(areaDelta);
    document.querySelector(`#${areaElementId(area, "Compare")}`).className = `area-compare ${areaDelta > 0 ? "positive" : areaDelta < 0 ? "negative" : "neutral"}`;
    document.querySelector(`#${areaElementId(area, "Message")}`).textContent = scoreMessage(student.scores[area.code], areaAverages[area.code]);
  });

  const entries = Object.entries(student.scores).filter(([key]) => key !== "global");
  const strongest = entries.reduce((best, item) => (item[1] > best[1] ? item : best), entries[0]);
  const weakest = entries.reduce((low, item) => (item[1] < low[1] ? item : low), entries[0]);
  const eventDelta = student.scores.global - eventAvg;

  els.advisorMessage.textContent =
    `${student.name.split(" ")[0]} ${eventDelta >= 0 ? "está por arriba" : "está por debajo"} del promedio de su evento por ${Math.abs(eventDelta)} puntos. ` +
    `Su área más fuerte es ${currentAreaLabel(strongest[0])} (${formatScore(strongest[1])}) y la prioridad de refuerzo es ${currentAreaLabel(weakest[0])} (${formatScore(weakest[1])}).`;
  renderPrintReport({ student, eventAvg, cutoff, delta });
}

function renderPrintReport(context) {
  if (!context) {
    [
      "printStudentName", "printStudentCareer", "printStudentEvent", "printGlobalScore", "printCutoffScore",
      "printCutoffDelta", "printEventAverage", "printCutoffMessage", "printRiScore", "printClScore",
      "printPmScore", "printAdvisorMessage", "printStudyFocus", "printNextGoal", "printRecommendation",
    ].forEach((key) => {
      els[key].textContent = "-";
    });
    if (els.printAreaRows) {
      els.printAreaRows.innerHTML = currentAreas().map((area) => `<tr><th>${area.label}</th><td>-</td></tr>`).join("");
    }
    return;
  }

  const { student, eventAvg, cutoff, delta } = context;
  els.printStudentName.textContent = student.name;
  els.printStudentCareer.textContent = student.career;
  els.printStudentEvent.textContent = `${student.event} | ${student.year}`;
  els.printGlobalScore.textContent = formatScore(student.scores.global);
  els.printCutoffScore.textContent = cutoff ? formatScore(cutoff.cutoff) : "Sin corte";
  els.printCutoffDelta.textContent = cutoff ? `${delta >= 0 ? "+" : ""}${formatScore(delta)}` : "-";
  els.printEventAverage.textContent = formatScore(eventAvg);
  els.printCutoffMessage.textContent = els.cutoffMessage.textContent;
  if (els.printAreaRows) {
    els.printAreaRows.innerHTML = currentAreas().map((area) => `
      <tr><th>${area.label}</th><td>${formatScore(student.scores[area.code])}</td></tr>
    `).join("");
  }
  els.printAdvisorMessage.textContent = els.advisorMessage.textContent;
  const areaEntries = Object.entries(student.scores).filter(([key]) => key !== "global");
  const weakest = areaEntries.reduce((low, item) => (item[1] < low[1] ? item : low), areaEntries[0]);
  const strongest = areaEntries.reduce((best, item) => (item[1] > best[1] ? item : best), areaEntries[0]);
  const nextGoal = cutoff
    ? delta >= 0
      ? `Sostener ventaja de ${formatScore(delta)} puntos sobre el corte.`
      : `Subir al menos ${formatScore(Math.abs(delta) + 10)} puntos para rebasar el corte.`
    : "Definir meta con tutor según carrera objetivo.";
  const recommendation = student.scores.global >= eventAvg
    ? `Mantener ritmo y convertir ${currentAreaLabel(weakest[0])} en mejora puntual.`
    : `Priorizar práctica guiada en ${currentAreaLabel(weakest[0])} antes del siguiente simulador.`;

  els.printStudyFocus.textContent = `${currentAreaLabel(weakest[0])} (${formatScore(weakest[1])}). Fortaleza: ${currentAreaLabel(strongest[0])}.`;
  els.printNextGoal.textContent = nextGoal;
  els.printRecommendation.textContent = recommendation;
}

function buildAnswersGrid() {
  const blocks = [
    { code: "RI", title: "Redacción indirecta", start: 1, end: 20 },
    { code: "CL", title: "Comprensión lectora", start: 21, end: 40 },
    { code: "PM", title: "Pensamiento matemático", start: 41, end: 60 },
  ];

  els.answersGrid.innerHTML = blocks.map((block) => {
    const items = [];
    for (let question = block.start; question <= block.end; question++) {
      const options = ["A", "B", "C"]
        .map((letter) => `
          <label>
            <input type="radio" name="q${question}" value="${letter}" tabindex="-1" />
            ${letter}
          </label>
        `)
        .join("");
      items.push(`<div class="answer-item" tabindex="0" data-question="${question}" role="radiogroup" aria-label="Pregunta ${question}"><span>${question}</span>${options}</div>`);
    }

    return `
      <section class="answer-block" data-area="${block.code.toLowerCase()}">
        <div class="answer-block-header">
          <strong>${block.code}</strong>
          <span>${block.title}</span>
          <small>Preguntas ${block.start}-${block.end}</small>
        </div>
        <div class="answer-block-grid">${items.join("")}</div>
      </section>
    `;
  }).join("");
}

function getCaptureResponses() {
  return Array.from({ length: 60 }, (_, index) => {
    return els.captureForm.querySelector(`input[name="q${index + 1}"]:checked`)?.value || "";
  });
}

function scoreArea(responses, start, end) {
  let correct = 0;
  let answered = 0;

  for (let index = start; index <= end; index++) {
    if (responses[index]) answered++;
    if (responses[index] && responses[index] === answerKey[index]) correct++;
  }

  const icne = ((correct / 0.2) - 50) / 16.67;
  return {
    correct,
    answered,
    score: Math.round(1000 + (100 * icne)),
  };
}

function calculateResponseScores(responses) {
  const ri = scoreArea(responses, 0, 19);
  const cl = scoreArea(responses, 20, 39);
  const pm = scoreArea(responses, 40, 59);
  const correct = ri.correct + cl.correct + pm.correct;
  const global = Math.round((ri.score + cl.score + pm.score) / 3);
  return { ri, cl, pm, correct, global };
}

function updateCapturePreview() {
  const responses = getCaptureResponses();
  const answered = responses.filter(Boolean).length;
  const { ri, cl, pm, correct, global } = calculateResponseScores(responses);
  const complete = answered === 60;

  els.answeredCount.textContent = `${answered}/60`;
  els.correctCount.textContent = answered ? String(correct) : "-";
  els.captureRiScore.textContent = answered ? formatScore(ri.score) : "-";
  els.captureClScore.textContent = answered ? formatScore(cl.score) : "-";
  els.capturePmScore.textContent = answered ? formatScore(pm.score) : "-";
  els.captureRiProgress.textContent = `${ri.answered}/20`;
  els.captureClProgress.textContent = `${cl.answered}/20`;
  els.capturePmProgress.textContent = `${pm.answered}/20`;
  els.captureGlobalScore.textContent = answered ? formatScore(global) : "-";
  els.captureStatus.textContent = complete ? `${correct} aciertos detectados` : `Faltan ${60 - answered} respuestas`;

  const fieldsReady = Boolean(
    els.captureName.value.trim() &&
    els.captureCareer.value &&
    els.captureEvent.value.trim() &&
    els.captureYear.value &&
    els.captureVersion.value.trim()
  );
  els.saveCaptureButton.disabled = !(complete && fieldsReady);
  return { responses, ri, cl, pm, correct, global, complete, fieldsReady };
}

function buildAnswersGrid() {
  const blocks = currentAreas().map((area) => ({
    code: area.badge,
    title: area.label,
    start: area.start,
    end: area.end,
  }));

  els.answersGrid.innerHTML = blocks.map((block) => {
    const items = [];
    for (let question = block.start; question <= block.end; question++) {
      const options = ["A", "B", "C"]
        .map((letter) => `
          <label>
            <input type="radio" name="q${question}" value="${letter}" tabindex="-1" />
            ${letter}
          </label>
        `)
        .join("");
      items.push(`<div class="answer-item" tabindex="0" data-question="${question}" role="radiogroup" aria-label="Pregunta ${question}"><span>${question}</span>${options}</div>`);
    }

    return `
      <section class="answer-block" data-area="${block.code.toLowerCase()}">
        <div class="answer-block-header">
          <strong>${block.code}</strong>
          <span>${block.title}</span>
          <small>Preguntas ${block.start}-${block.end}</small>
        </div>
        <div class="answer-block-grid">${items.join("")}</div>
      </section>
    `;
  }).join("");
}

function getCaptureResponses() {
  return Array.from({ length: currentQuestionCount() }, (_, index) => {
    return els.captureForm.querySelector(`input[name="q${index + 1}"]:checked`)?.value || "";
  });
}

function calculateResponseScores(responses) {
  const areaScores = {};
  currentAreas().forEach((area) => {
    areaScores[area.code] = scoreArea(responses, area.start - 1, area.end - 1);
  });
  const areaValues = Object.values(areaScores);
  const correct = areaValues.reduce((sum, area) => sum + area.correct, 0);
  const global = Math.round(areaValues.reduce((sum, area) => sum + area.score, 0) / areaValues.length);
  return { ...areaScores, correct, global };
}

function updateCapturePreview() {
  const responses = getCaptureResponses();
  const answered = responses.filter(Boolean).length;
  const scores = calculateResponseScores(responses);
  const complete = answered === currentQuestionCount();

  els.answeredCount.textContent = `${answered}/${currentQuestionCount()}`;
  els.correctCount.textContent = answered ? String(scores.correct) : "-";
  currentAreas().forEach((area) => {
    const result = scores[area.code];
    const scoreElement = document.querySelector(`#capture${area.badge}Score`);
    const progressElement = document.querySelector(`#capture${area.badge}Progress`);
    if (scoreElement) scoreElement.textContent = answered ? formatScore(result.score) : "-";
    if (progressElement) progressElement.textContent = `${result.answered}/${area.end - area.start + 1}`;
  });
  els.captureGlobalScore.textContent = answered ? formatScore(scores.global) : "-";
  els.captureStatus.textContent = complete
    ? `${scores.correct} aciertos detectados`
    : `Faltan ${currentQuestionCount() - answered} respuestas`;

  const fieldsReady = Boolean(
    els.captureName.value.trim() &&
    els.captureCareer.value &&
    els.captureEvent.value.trim() &&
    els.captureYear.value &&
    els.captureVersion.value.trim()
  );
  els.saveCaptureButton.disabled = !(complete && fieldsReady);
  return { responses, scores, correct: scores.correct, global: scores.global, complete, fieldsReady };
}

function clearCaptureForm() {
  els.captureForm.reset();
  els.answersGrid.querySelectorAll(".answer-item").forEach((item) => item.classList.remove("answered"));
  els.captureYear.value = "2025";
  els.captureVersion.value = "1";
  els.postSaveActions.hidden = true;
  els.saveMessage.className = "save-message";
  els.saveMessage.textContent = `Lista para validar cuando captures las ${currentQuestionCount()} respuestas.`;
  updateCapturePreview();
}

function clearCaptureAnswers() {
  els.answersGrid.querySelectorAll("input[type='radio']").forEach((input) => {
    input.checked = false;
  });
  els.answersGrid.querySelectorAll(".answer-item").forEach((item) => item.classList.remove("answered"));
}

function focusQuestion(question) {
  const target = els.answersGrid.querySelector(`[data-question="${question}"]`);
  if (target) target.focus();
}

function selectAnswer(questionGroup, answer) {
  const input = questionGroup.querySelector(`input[value="${answer}"]`);
  if (!input) return;

  input.checked = true;
  questionGroup.classList.add("answered");
  updateCapturePreview();

  const question = Number(questionGroup.dataset.question);
  if (question < currentQuestionCount()) {
    focusQuestion(question + 1);
  }
}

function handleAnswerKeyboard(event) {
  const questionGroup = event.target.closest(".answer-item");
  if (!questionGroup) return;

  const keyMap = {
    "1": "A",
    "2": "B",
    "3": "C",
    a: "A",
    b: "B",
    c: "C",
    A: "A",
    B: "B",
    C: "C",
  };

  if (keyMap[event.key]) {
    event.preventDefault();
    selectAnswer(questionGroup, keyMap[event.key]);
    return;
  }

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    focusQuestion(Math.min(currentQuestionCount(), Number(questionGroup.dataset.question) + 1));
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    focusQuestion(Math.max(1, Number(questionGroup.dataset.question) - 1));
  }
}

function capturePayload() {
  const preview = updateCapturePreview();
  return {
    exam: currentExamId,
    name: els.captureName.value.trim().toUpperCase(),
    email: els.captureEmail.value.trim(),
    career: els.captureCareer.value,
    event: els.captureEvent.value.trim(),
    year: els.captureYear.value.trim(),
    version: els.captureVersion.value.trim(),
    responses: preview.responses,
  };
}

function findDuplicateCapture(payload) {
  const name = normalizeText(payload.name);
  const event = normalizeText(payload.event);
  const year = normalizeText(payload.year);

  return students.find((student) => (
    normalizeText(student.name) === name &&
    normalizeText(student.event) === event &&
    normalizeText(student.year) === year
  ));
}

async function appendCapturePayload(payload) {
  const apiUrl = window.SIMULADORES_CONFIG?.apiUrl?.trim();
  if (!apiUrl) throw new Error("Falta configurar apiUrl en config.js.");
  const separator = apiUrl.includes("?") ? "&" : "?";
  const url = `${apiUrl}${separator}action=appendCapture&payload=${encodeURIComponent(JSON.stringify(payload))}`;
  return loadPayloadJsonp(url);
}

function showSavedReport() {
  if (!lastSavedStudentId) return;
  els.eventFilter.value = "all";
  els.studentSearch.value = "";
  renderStudentOptions();
  els.studentSelect.value = lastSavedStudentId;
  renderReport(lastSavedStudentId);
  setActiveView("report");
}

function newCaptureSameEvent() {
  const event = lastCaptureEvent || els.captureEvent.value.trim();
  clearCaptureForm();
  els.captureEvent.value = event;
  els.postSaveActions.hidden = true;
  updateCapturePreview();
  setActiveView("capture");
  els.captureName.focus();
}

function newBlankCapture() {
  lastSavedStudentId = "";
  clearCaptureForm();
  setActiveView("capture");
  els.captureName.focus();
}

function addCustomEvent() {
  const eventName = els.newEventInput.value.trim();
  if (!eventName) return;

  const exists = students.some((student) => normalizeText(student.event) === normalizeText(eventName)) ||
    customEvents.some((event) => normalizeText(event) === normalizeText(eventName));

  if (!exists) {
    customEvents.push(eventName);
    renderOptions();
  }

  els.eventFilter.value = eventName;
  els.captureEvent.value = eventName;
  els.newEventInput.value = "";
  renderStudentOptions();
  updateCapturePreview();
}

function matchSheetCareer(value) {
  const normalized = normalizeText(value);
  if (currentExamId === "exani1") {
    return exaniOneCareerAliases[normalized] ||
      exaniOneCareers.find((career) => normalizeText(career) === normalized) ||
      value.trim();
  }
  return sheetCareers.find((career) => normalizeText(career) === normalized) || value.trim();
}

function parseRosterLine(line) {
  const parts = line
    .split(/\t|,|;/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (!parts.length) return null;
  return {
    name: String(parts[0] || "").toUpperCase(),
    email: parts[1] || "",
    career: matchSheetCareer(parts.slice(2).join(" ") || ""),
  };
}

function parseBatchRoster() {
  batchRoster = els.batchRoster.value
    .split(/\r?\n/)
    .filter((line) => !/^nombre\s*[,;\t]/i.test(line.trim()))
    .map((line) => parseRosterLine(line))
    .filter((student) => student && student.name);

  batchItems = batchItems.map((item, index) => ({
    ...item,
    rosterIndex: item.rosterIndex ?? (batchRoster[index] ? index : -1),
  }));

  renderBatchList();
  updateBatchSummary();
  els.batchMessage.className = batchRoster.length ? "save-message ok" : "save-message error";
  els.batchMessage.textContent = batchRoster.length
    ? `${batchRoster.length} alumno${batchRoster.length === 1 ? "" : "s"} cargado${batchRoster.length === 1 ? "" : "s"}.`
    : "No encontré alumnos en la lista. Usa: Nombre, correo, carrera.";
}

function loadImageFromUrl(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("No se pudo leer la imagen"));
    image.src = url;
  });
}

async function handleBatchPhotos(event) {
  const files = Array.from(event.target.files || []);
  if (!files.length) return;

  els.batchMessage.className = "save-message";
  els.batchMessage.textContent = `Procesando ${files.length} foto${files.length === 1 ? "" : "s"}...`;

  for (const file of files) {
    const url = URL.createObjectURL(file);
    const item = {
      id: `batch-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      fileName: file.name,
      url,
      rosterIndex: batchRoster[batchItems.length] ? batchItems.length : -1,
      responses: [],
      lowConfidence: 0,
      status: "Procesando",
      saved: false,
      error: "",
    };
    batchItems.push(item);
    renderBatchList();

    try {
      const image = await loadImageFromUrl(url);
      const result = detectResponsesFromImage(image);
      item.responses = result.responses;
      item.lowConfidence = result.lowConfidence;
      item.status = result.lowConfidence > 8 ? "Revisar" : "Lista";
    } catch (error) {
      item.status = "Error";
      item.error = error.message;
    }

    renderBatchList();
    updateBatchSummary();
  }

  els.batchMessage.className = "save-message ok";
  els.batchMessage.textContent = "Fotos procesadas. Revisa asignación de alumno antes de guardar.";
}

function batchStudentOptions(selectedIndex) {
  const options = [`<option value="-1">Selecciona alumno</option>`].concat(batchRoster.map((student, index) => {
    return `<option value="${index}" ${index === selectedIndex ? "selected" : ""}>${escapeHtml(student.name)}</option>`;
  }));
  return options.join("");
}

function renderBatchList() {
  if (!batchItems.length) {
    els.batchList.innerHTML = `<p class="empty-state">Todavía no hay fotos en el lote.</p>`;
    els.saveBatchButton.disabled = true;
    return;
  }

  els.batchList.innerHTML = batchItems.map((item, index) => {
    const student = batchRoster[item.rosterIndex] || null;
    const scores = item.responses.length === currentQuestionCount() ? calculateResponseScores(item.responses) : null;
    const answered = item.responses.filter(Boolean).length;
    const statusClass = item.saved ? "ok" : item.status === "Error" ? "error" : item.lowConfidence > 8 ? "warn" : "ok";
    return `
      <article class="batch-card ${item.saved ? "saved" : ""}" data-batch-id="${item.id}">
        <img src="${item.url}" alt="Hoja ${index + 1}" />
        <div class="batch-card-main">
          <div class="batch-card-top">
            <strong>Hoja ${index + 1}</strong>
            <span class="batch-pill ${statusClass}">${item.saved ? "Guardada" : item.status}</span>
          </div>
          <label>
            <span>Alumno</span>
            <select class="batch-student-select">${batchStudentOptions(item.rosterIndex)}</select>
          </label>
          <p>${student ? escapeHtml(student.career || "Sin carrera") : "Asigna alumno para guardar"}</p>
          <div class="batch-card-kpis">
            <span>${answered}/${currentQuestionCount()} respuestas</span>
            <span>${item.lowConfidence} por revisar</span>
            <strong>${scores ? formatScore(scores.global) : "-"}</strong>
          </div>
          ${item.error ? `<p class="batch-error">${escapeHtml(item.error)}</p>` : ""}
          <div class="batch-card-actions">
            <button class="ghost compact batch-review-button" type="button">Revisar en captura</button>
            <button class="ghost compact batch-remove-button" type="button">Quitar</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  els.saveBatchButton.disabled = !getReadyBatchItems().length;
}

function updateBatchSummary() {
  const ready = getReadyBatchItems().length;
  els.batchReadyCount.textContent = `${ready}/${batchItems.length}`;
  els.batchStatus.textContent = batchItems.length
    ? `${batchRoster.length} alumnos precargados`
    : "Sin lote activo";
  els.saveBatchButton.disabled = !ready;
}

function getReadyBatchItems() {
  return batchItems.filter((item) => {
    const student = batchRoster[item.rosterIndex];
    return !item.saved && student && student.career && item.responses.length === currentQuestionCount();
  });
}

function handleBatchListChange(event) {
  const card = event.target.closest(".batch-card");
  if (!card || !event.target.classList.contains("batch-student-select")) return;
  const item = batchItems.find((entry) => entry.id === card.dataset.batchId);
  if (!item) return;
  item.rosterIndex = Number(event.target.value);
  renderBatchList();
  updateBatchSummary();
}

function reviewBatchItem(event) {
  const card = event.target.closest(".batch-card");
  if (!card) return;
  if (event.target.classList.contains("batch-remove-button")) {
    const index = batchItems.findIndex((entry) => entry.id === card.dataset.batchId);
    if (index >= 0) {
      URL.revokeObjectURL(batchItems[index].url);
      batchItems.splice(index, 1);
      renderBatchList();
      updateBatchSummary();
    }
    return;
  }
  if (!event.target.classList.contains("batch-review-button")) return;
  const item = batchItems.find((entry) => entry.id === card.dataset.batchId);
  if (!item) return;
  const student = batchRoster[item.rosterIndex];

  clearCaptureForm();
  if (student) {
    els.captureName.value = student.name;
    els.captureEmail.value = student.email;
    els.captureCareer.value = matchSheetCareer(student.career);
  }
  els.captureEvent.value = els.batchEvent.value.trim();
  els.captureYear.value = els.batchYear.value;
  els.captureVersion.value = els.batchVersion.value.trim() || "1";
  detectedResponses = item.responses;
  applyDetectedResponsesToCapture();
  setActiveView("capture");
}

async function saveBatch() {
  const apiUrl = window.SIMULADORES_CONFIG?.apiUrl?.trim();
  const eventName = els.batchEvent.value.trim();
  if (!apiUrl) {
    els.batchMessage.className = "save-message error";
    els.batchMessage.textContent = "Falta configurar apiUrl en config.js.";
    return;
  }
  if (!eventName) {
    els.batchMessage.className = "save-message error";
    els.batchMessage.textContent = "Define el evento antes de guardar el lote.";
    return;
  }

  const ready = getReadyBatchItems();
  if (!ready.length) return;

  const duplicates = ready.filter((item) => {
    const student = batchRoster[item.rosterIndex];
    return findDuplicateCapture({
      name: student.name,
      event: eventName,
      year: els.batchYear.value,
    });
  });

  if (duplicates.length) {
    const proceed = window.confirm(`Hay ${duplicates.length} posible${duplicates.length === 1 ? "" : "s"} duplicado${duplicates.length === 1 ? "" : "s"} en este lote. ¿Quieres guardar de todos modos?`);
    if (!proceed) return;
  }

  els.saveBatchButton.disabled = true;
  let saved = 0;
  let failed = 0;

  for (const item of ready) {
    const student = batchRoster[item.rosterIndex];
    const payload = {
      name: student.name,
      email: student.email,
      career: matchSheetCareer(student.career),
      event: eventName,
      year: els.batchYear.value,
      version: els.batchVersion.value.trim() || "1",
      exam: currentExamId,
      responses: item.responses,
    };

    els.batchMessage.className = "save-message";
    els.batchMessage.textContent = `Guardando ${saved + failed + 1}/${ready.length}: ${student.name}...`;

    try {
      const result = await appendCapturePayload(payload);
      if (!result.ok) throw new Error(result.error || "No se pudo guardar");
      item.saved = true;
      item.status = "Guardada";
      item.error = "";
      saved++;
    } catch (error) {
      item.status = "Error";
      item.error = error.message;
      failed++;
    }

    renderBatchList();
    updateBatchSummary();
  }

  await loadStudents();
  renderOptions();
  els.batchMessage.className = failed ? "save-message error" : "save-message ok";
  els.batchMessage.textContent = failed
    ? `Guardado parcial: ${saved} guardado${saved === 1 ? "" : "s"}, ${failed} con error.`
    : `Lote guardado: ${saved} captura${saved === 1 ? "" : "s"} agregada${saved === 1 ? "" : "s"} al Sheet.`;
}

function clearBatch() {
  batchItems.forEach((item) => URL.revokeObjectURL(item.url));
  batchItems = [];
  batchRoster = [];
  els.batchRoster.value = "";
  els.batchPhotoInput.value = "";
  els.batchMessage.className = "save-message";
  els.batchMessage.textContent = "Carga alumnos y fotos para comenzar.";
  renderBatchList();
  updateBatchSummary();
}

function auditChecks() {
  return [
    els.auditNameCheck,
    els.auditFrameCheck,
    els.auditLightCheck,
    els.auditMarksCheck,
  ];
}

function updatePhotoAudit() {
  const hasImage = Boolean(els.photoPreviewImage.src);
  const checked = auditChecks().filter((item) => item.checked).length;

  if (!hasImage) {
    els.photoStatus.textContent = "Pendiente";
    els.photoMeta.textContent = "Sin imagen";
    els.photoMessage.className = "save-message";
    els.photoMessage.textContent = "Sube una imagen para revisar calidad.";
    return;
  }

  els.photoStatus.textContent = checked === 4 ? "Lista" : "Revisar";
  els.photoMeta.textContent = `${checked}/4 criterios`;
  els.photoMessage.className = checked === 4 ? "save-message ok" : "save-message";
  els.photoMessage.textContent = checked === 4
    ? "La foto cumple los criterios visuales. Continúa con captura manual mientras conectamos OCR."
    : "Marca los criterios visibles antes de capturar o repetir la foto.";
}

function handlePhotoUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  els.photoPreviewImage.onload = () => {
    els.nameReader.hidden = false;
    renderNameCrops();
    updateComposedName();
  };
  els.photoPreviewImage.src = url;
  els.photoPreview.hidden = false;
  els.detectedCount.textContent = `0/${currentQuestionCount()}`;
  els.detectionMeta.textContent = "Lista para detectar";
  detectedResponses = [];
  els.photoStatus.textContent = "Cargada";
  els.photoMeta.textContent = `${Math.round(file.size / 1024)} KB`;
  els.photoMessage.className = "save-message";
  els.photoMessage.textContent = "Imagen cargada. Revisa calidad antes de capturar respuestas.";
  auditChecks().forEach((item) => {
    item.checked = false;
  });
}

function clearPhoto() {
  if (els.photoPreviewImage.src) {
    URL.revokeObjectURL(els.photoPreviewImage.src);
  }
  els.photoInput.value = "";
  els.photoPreviewImage.onload = null;
  els.photoPreviewImage.removeAttribute("src");
  els.photoPreview.hidden = true;
  els.nameReader.hidden = true;
  els.paternalInput.value = "";
  els.maternalInput.value = "";
  els.namesInput.value = "";
  els.composedName.textContent = "-";
  hideNameOcrControls();
  els.detectedCount.textContent = `0/${currentQuestionCount()}`;
  els.detectionMeta.textContent = "Detección experimental por plantilla.";
  detectedResponses = [];
  auditChecks().forEach((item) => {
    item.checked = false;
  });
  updatePhotoAudit();
}

function hideNameOcrControls() {
  els.suggestNameButton.hidden = true;
  els.nameOcrMessage.hidden = true;
  els.suggestNameButton.disabled = true;
  els.nameOcrMessage.className = "save-message";
  els.nameOcrMessage.textContent = "OCR con IA desactivado por ahora.";
}

function updatePhotoDetectionState() {
  const enabled = currentProfile().photoDetection;
  els.detectAnswersButton.disabled = !enabled;
  if (!enabled) {
    detectedResponses = [];
    els.detectedCount.textContent = `0/${currentQuestionCount()}`;
    els.detectionMeta.textContent = "Foto pendiente de calibrar para este examen.";
    els.photoMessage.className = "save-message";
    els.photoMessage.textContent = "Para EXANI I usa captura manual por ahora; la deteccion por foto requiere calibrar la hoja de 80 reactivos.";
  }
}

function goManualCaptureFromPhoto() {
  if (detectedResponses.length === currentQuestionCount()) {
    applyDetectedResponsesToCapture();
  }
  sendNameToCapture();
  setActiveView("capture");
  els.captureName.focus();
}

function nameCropTemplates() {
  const widthRef = 1235;
  const heightRef = 1600;
  return {
    paternal: { x: 300 / widthRef, y: 485 / heightRef, w: 880 / widthRef, h: 58 / heightRef },
    maternal: { x: 300 / widthRef, y: 544 / heightRef, w: 880 / widthRef, h: 58 / heightRef },
    names: { x: 300 / widthRef, y: 604 / heightRef, w: 880 / widthRef, h: 58 / heightRef },
  };
}

function drawCropToCanvas(canvas, image, template) {
  const sx = template.x * image.naturalWidth;
  const sy = template.y * image.naturalHeight;
  const sw = template.w * image.naturalWidth;
  const sh = template.h * image.naturalHeight;
  const ratio = window.devicePixelRatio || 1;
  const displayWidth = canvas.clientWidth || 320;
  const displayHeight = canvas.clientHeight || 70;
  canvas.width = Math.round(displayWidth * ratio);
  canvas.height = Math.round(displayHeight * ratio);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.fillStyle = "#f8f9ff";
  ctx.fillRect(0, 0, displayWidth, displayHeight);
  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, displayWidth, displayHeight);
}

function renderNameCrops() {
  const image = els.photoPreviewImage;
  if (!image.src || !image.naturalWidth) return;
  const templates = nameCropTemplates();
  drawCropToCanvas(els.paternalCrop, image, templates.paternal);
  drawCropToCanvas(els.maternalCrop, image, templates.maternal);
  drawCropToCanvas(els.namesCrop, image, templates.names);
}

function updateComposedName() {
  const parts = [
    els.paternalInput.value,
    els.maternalInput.value,
    els.namesInput.value,
  ].map((value) => value.trim().toUpperCase()).filter(Boolean);
  const fullName = parts.join(" ");
  els.composedName.textContent = fullName || "-";
  return fullName;
}

function sendNameToCapture() {
  const fullName = updateComposedName();
  if (!fullName) return;
  els.captureName.value = fullName;
  updateCapturePreview();
}

function cropDataUrls() {
  return {
    paternal: els.paternalCrop.toDataURL("image/jpeg", 0.92),
    maternal: els.maternalCrop.toDataURL("image/jpeg", 0.92),
    names: els.namesCrop.toDataURL("image/jpeg", 0.92),
  };
}

async function suggestNameWithAi() {
  if (!els.photoPreviewImage.src) {
    els.nameOcrMessage.className = "save-message error";
    els.nameOcrMessage.textContent = "Primero sube una foto para generar los recortes.";
    return;
  }

  const endpoint = window.SIMULADORES_CONFIG?.nameOcrUrl?.trim();
  if (!endpoint) {
    els.nameOcrMessage.className = "save-message error";
    els.nameOcrMessage.textContent = "OCR con IA desactivado por ahora. Transcribe el nombre manualmente desde los recortes.";
    return;
  }

  els.suggestNameButton.disabled = true;
  els.nameOcrMessage.className = "save-message";
  els.nameOcrMessage.textContent = "Solicitando sugerencia de nombre...";

  try {
    const body = { crops: cropDataUrls() };
    const result = await requestNameOcr(endpoint, body);

    if (result.ok === false) throw new Error(result.error || "OCR no disponible");

    els.paternalInput.value = String(result.paternal || "").toUpperCase();
    els.maternalInput.value = String(result.maternal || "").toUpperCase();
    els.namesInput.value = String(result.names || "").toUpperCase();
    updateComposedName();

    els.nameOcrMessage.className = "save-message ok";
    els.nameOcrMessage.textContent = "Sugerencia cargada. Revisa el texto antes de usarlo en captura.";
  } catch (error) {
    els.nameOcrMessage.className = "save-message error";
    els.nameOcrMessage.textContent = `No se pudo sugerir el nombre: ${error.message}`;
  } finally {
    els.suggestNameButton.disabled = false;
  }
}

async function requestNameOcr(endpoint, body) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn("OCR por POST fallo; intentando JSONP.", error);
    const separator = endpoint.includes("?") ? "&" : "?";
    const url = `${endpoint}${separator}payload=${encodeURIComponent(JSON.stringify(body))}`;
    return loadPayloadJsonp(url);
  }
}

function answerTemplateFor(question) {
  const widthRef = 1235;
  const heightRef = 1600;
  const y0 = 728 / heightRef;
  const step = 27.9 / heightRef;
  const columns = [
    { start: 1, end: 27, xs: [171 / widthRef, 211 / widthRef, 250 / widthRef] },
    { start: 28, end: 54, xs: [386 / widthRef, 426 / widthRef, 465 / widthRef] },
    { start: 55, end: 81, xs: [601 / widthRef, 641 / widthRef, 680 / widthRef] },
  ];
  const column = columns.find((item) => question >= item.start && question <= item.end);
  const row = question - column.start;
  return {
    xs: column.xs,
    y: y0 + (row * step),
    rx: 17 / widthRef,
    ry: 8 / heightRef,
  };
}

function sampleOvalDarkness(imageData, width, height, cx, cy, rx, ry) {
  let total = 0;
  let count = 0;
  const minX = Math.max(0, Math.floor(cx - rx));
  const maxX = Math.min(width - 1, Math.ceil(cx + rx));
  const minY = Math.max(0, Math.floor(cy - ry));
  const maxY = Math.min(height - 1, Math.ceil(cy + ry));

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      if ((dx * dx) + (dy * dy) > 1) continue;
      const index = (y * width + x) * 4;
      const r = imageData.data[index];
      const g = imageData.data[index + 1];
      const b = imageData.data[index + 2];
      total += (0.299 * r) + (0.587 * g) + (0.114 * b);
      count++;
    }
  }

  return count ? total / count : 255;
}

function detectAnswersFromPhoto() {
  if (!currentProfile().photoDetection) {
    updatePhotoDetectionState();
    return;
  }
  const image = els.photoPreviewImage;
  if (!image.src || !image.naturalWidth || !image.naturalHeight) {
    els.photoMessage.className = "save-message error";
    els.photoMessage.textContent = "Primero sube una foto de la hoja.";
    return;
  }

  const result = detectResponsesFromImage(image);
  detectedResponses = result.responses;
  els.detectedCount.textContent = `${result.responses.filter(Boolean).length}/${currentQuestionCount()}`;
  els.detectionMeta.textContent = result.lowConfidence ? `${result.lowConfidence} por revisar` : "Confianza alta";
  els.photoStatus.textContent = result.lowConfidence > 8 ? "Revisar" : "Lista";
  els.photoMeta.textContent = `${result.responses.filter(Boolean).length}/${currentQuestionCount()} detectadas`;
  els.photoMessage.className = result.lowConfidence > 8 ? "save-message" : "save-message ok";
  els.photoMessage.textContent = `Lectura experimental completa. Pasa a captura manual para revisar antes de guardar.`;
}

function detectResponsesFromImage(image) {
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(image, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const letters = ["A", "B", "C"];
  const responses = [];
  let lowConfidence = 0;

  for (let question = 1; question <= 60; question++) {
    const template = answerTemplateFor(question);
    const y = template.y * canvas.height;
    const rx = Math.max(8, template.rx * canvas.width);
    const ry = Math.max(5, template.ry * canvas.height);
    const scores = template.xs.map((xRatio) => {
      return sampleOvalDarkness(imageData, canvas.width, canvas.height, xRatio * canvas.width, y, rx, ry);
    });
    const sorted = scores
      .map((score, index) => ({ score, index }))
      .sort((a, b) => a.score - b.score);

    if ((sorted[1].score - sorted[0].score) < 18) {
      lowConfidence++;
    }

    responses.push(letters[sorted[0].index]);
  }

  return { responses, lowConfidence };
}

function applyDetectedResponsesToCapture() {
  clearCaptureAnswers();
  detectedResponses.forEach((answer, index) => {
    const question = index + 1;
    const input = els.captureForm.querySelector(`input[name="q${question}"][value="${answer}"]`);
    if (!input) return;
    input.checked = true;
    input.closest(".answer-item")?.classList.add("answered");
  });
  updateCapturePreview();
}

async function saveCapture(event) {
  event.preventDefault();
  const apiUrl = window.SIMULADORES_CONFIG?.apiUrl?.trim();
  if (!apiUrl) {
    els.saveMessage.className = "save-message error";
    els.saveMessage.textContent = "Falta configurar apiUrl en config.js.";
    return;
  }

  const preview = updateCapturePreview();
  if (!preview.complete || !preview.fieldsReady) {
    els.saveMessage.className = "save-message error";
    els.saveMessage.textContent = `Completa datos del alumno y las ${currentQuestionCount()} respuestas antes de guardar.`;
    return;
  }

  const payload = capturePayload();
  const duplicate = findDuplicateCapture(payload);
  if (duplicate) {
    const proceed = window.confirm(`Ya existe una captura para ${duplicate.name} en ${duplicate.event} (${duplicate.year}). ¿Quieres guardar otro intento de todos modos?`);
    if (!proceed) {
      els.saveMessage.className = "save-message error";
      els.saveMessage.textContent = "Guardado cancelado para evitar duplicado.";
      return;
    }
  }

  els.saveCaptureButton.disabled = true;
  els.postSaveActions.hidden = true;
  els.saveMessage.className = "save-message";
  els.saveMessage.textContent = "Guardando en Google Sheets...";

  try {
    const result = await appendCapturePayload(payload);

    if (!result.ok) {
      throw new Error(result.error || "No se pudo guardar");
    }

    els.saveMessage.className = "save-message ok";
    els.saveMessage.textContent = `Guardado en Captura fila ${result.sourceRow}.`;
    lastSavedStudentId = result.id;
    lastCaptureEvent = payload.event;
    els.postSaveActions.hidden = false;

    await loadStudents();
    renderOptions();

    const saved = students.find((student) => student.id === result.id);
    if (saved) {
      lastSavedStudentId = saved.id;
      els.saveMessage.textContent = `Guardado en Captura fila ${result.sourceRow}. Ya puedes ver el reporte o capturar otro alumno.`;
    }
  } catch (error) {
    els.saveMessage.className = "save-message error";
    els.saveMessage.textContent = `${error.message}. Si acabas de actualizar Code.gs, publica una nueva versión del Apps Script.`;
    updateCapturePreview();
  }
}

els.eventFilter.addEventListener("change", renderStudentOptions);
els.studentSearch.addEventListener("input", renderStudentOptions);
els.studentSelect.addEventListener("change", (event) => renderReport(event.target.value));
els.printButton.addEventListener("click", () => {
  setActiveView("report");
  window.print();
});
els.resetButton.addEventListener("click", () => {
  els.eventFilter.value = "all";
  els.studentSearch.value = "";
  renderStudentOptions();
});
els.addEventButton.addEventListener("click", addCustomEvent);
els.newEventInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  addCustomEvent();
});
els.parseRosterButton.addEventListener("click", parseBatchRoster);
els.batchPhotoInput.addEventListener("change", handleBatchPhotos);
els.batchList.addEventListener("change", handleBatchListChange);
els.batchList.addEventListener("click", reviewBatchItem);
els.saveBatchButton.addEventListener("click", saveBatch);
els.clearBatchButton.addEventListener("click", clearBatch);
els.tabs.forEach((tab) => tab.addEventListener("click", () => setActiveView(tab.dataset.tab)));
els.captureForm.addEventListener("input", updateCapturePreview);
els.captureForm.addEventListener("change", updateCapturePreview);
els.captureForm.addEventListener("submit", saveCapture);
els.clearCaptureButton.addEventListener("click", clearCaptureForm);
els.viewSavedReportButton.addEventListener("click", showSavedReport);
els.sameEventButton.addEventListener("click", newCaptureSameEvent);
els.newCaptureButton.addEventListener("click", newBlankCapture);
els.photoInput.addEventListener("change", handlePhotoUpload);
els.clearPhotoButton.addEventListener("click", clearPhoto);
els.detectAnswersButton.addEventListener("click", detectAnswersFromPhoto);
auditChecks().forEach((item) => item.addEventListener("change", updatePhotoAudit));
els.goManualCaptureButton.addEventListener("click", goManualCaptureFromPhoto);
[els.paternalInput, els.maternalInput, els.namesInput].forEach((input) => {
  input.addEventListener("input", updateComposedName);
});
els.sendNameToCaptureButton.addEventListener("click", () => {
  sendNameToCapture();
  setActiveView("capture");
  els.captureName.focus();
});
els.suggestNameButton.addEventListener("click", suggestNameWithAi);
els.answersGrid.addEventListener("keydown", handleAnswerKeyboard);
els.answersGrid.addEventListener("change", (event) => {
  const questionGroup = event.target.closest(".answer-item");
  if (questionGroup) questionGroup.classList.add("answered");
});

async function init() {
  renderExamControls();
  renderAreaCards();
  renderCaptureAreaSummary();
  buildAnswersGrid();
  await loadStudents();
  renderOptions();
  hideNameOcrControls();
  updatePhotoDetectionState();
  renderBatchList();
  updateBatchSummary();
  updateCapturePreview();
}

init();
