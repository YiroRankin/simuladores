const SPREADSHEET_ID = "1t6V2SDhLmD1pU9tmk_QZwL6iAKtsaiV0E6bHp4QO__I";
const SHEET_YEARS = ["2021", "2022", "2023", "2024", "2025", "2026"];
const EVENTS_SHEET = "Eventos";
const SHEET_CAREERS = [
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
  "Nanotecnología",
  "Veracruz"
];

const UADY_CAREERS = [
  "Actuaria",
  "Administracion",
  "Administracion de tecnologias de la informacion",
  "Agroecologia",
  "Antropologia",
  "Arqueologia",
  "Arquitectura",
  "Artes Visuales",
  "Biologia",
  "Biologia Marina",
  "Ciencias de la Computacion",
  "Cirujano Dentista",
  "Comercio internacional",
  "Comunicacion Social",
  "Contador Publico (Merida)",
  "Contador Publico (Tizimin)",
  "Derecho",
  "Diseno del Habitat",
  "Economia",
  "Educacion (Merida)",
  "Educacion (Tizimin)",
  "Enfermeria (Merida)",
  "Enfermeria (Tizimin)",
  "Ensenanza de las matematicas",
  "Ensenanza del Idioma ingles",
  "Historia",
  "Ing. Civil",
  "Ing. en Alimentos",
  "Ing. en Biotecnologia",
  "Ing. en Computacion",
  "Ing. en Energias Renovables",
  "Ing. en Mecatronica",
  "Ing. Fisica",
  "Ing. Industrial Logistica",
  "Ing. Quimica Industrial",
  "Ing. Software (Merida)",
  "Ing. Software (Tizimin)",
  "Literatura Latinoamericana",
  "Matematicas",
  "Medico Cirujano",
  "Medico Veterinario Zootecnista",
  "Mercadotecnia y Negocios Internacionales",
  "Nutricion",
  "Psicologia",
  "Quimica Aplicada",
  "Quimico farmaceutico biologo",
  "Rehabilitacion",
  "Trabajo Social",
  "Turismo"
];

const EXANI_I_CAREERS = [
  "Preparatoria Uno",
  "Preparatoria Dos",
  "UABIC"
];

const CAREER_ALIASES = {
  "actuaria": "Actuaría",
  "antropologia": "Antropología social",
  "ing civil": "Ingeniería civil",
  "ing en alimentos": "Ingeniería en alimentos",
  "ing en biotecnologia": "Ingeniería en biotecnología",
  "ing en computacion": "Ingeniería en computación",
  "ing en energias renovables": "Ingeniería en energías renovables",
  "ing en mecatronica": "Ingeniería mecatrónica",
  "ing fisica": "Ingeniería física",
  "ing industrial logistica": "Ingeniería industrial logística",
  "ing quimica industrial": "Ingeniería química industrial",
  "ing software merida": "Ingeniería de software (Mérida)",
  "ing software tizimin": "Ingeniería de software (Tizimín)",
  "ingenieria de software merida": "Ingeniería de software (Mérida)",
  "ingenieria de software tizimin": "Ingeniería de software (Tizimín)",
  "medico cirujano": "Médico cirujano",
  "medico veterinario zootecnista": "Médico veterinario zootecnista"
};

Object.assign(CAREER_ALIASES, {
  "actuaria": "Actuaria",
  "antropologia": "Antropologia",
  "antropologia social": "Antropologia",
  "ing civil": "Ing. Civil",
  "ingenieria civil": "Ing. Civil",
  "ing en alimentos": "Ing. en Alimentos",
  "ingenieria en alimentos": "Ing. en Alimentos",
  "ing en biotecnologia": "Ing. en Biotecnologia",
  "ingenieria en biotecnologia": "Ing. en Biotecnologia",
  "ing en computacion": "Ing. en Computacion",
  "ingenieria en computacion": "Ing. en Computacion",
  "ing en energias renovables": "Ing. en Energias Renovables",
  "ingenieria en energias renovables": "Ing. en Energias Renovables",
  "ing en mecatronica": "Ing. en Mecatronica",
  "ingenieria en mecatronica": "Ing. en Mecatronica",
  "ingenieria mecatronica": "Ing. en Mecatronica",
  "ing fisica": "Ing. Fisica",
  "ingenieria fisica": "Ing. Fisica",
  "ing industrial logistica": "Ing. Industrial Logistica",
  "ingenieria industrial logistica": "Ing. Industrial Logistica",
  "ing quimica industrial": "Ing. Quimica Industrial",
  "ingenieria quimica industrial": "Ing. Quimica Industrial",
  "ing software merida": "Ing. Software (Merida)",
  "ing software tizimin": "Ing. Software (Tizimin)",
  "ingenieria de software merida": "Ing. Software (Merida)",
  "ingenieria de software tizimin": "Ing. Software (Tizimin)",
  "medico cirujano": "Medico Cirujano",
  "medico veterinario zootecnista": "Medico Veterinario Zootecnista"
});

const EXANI_I_CAREER_ALIASES = {
  "prepa 1": "Preparatoria Uno",
  "prepa uno": "Preparatoria Uno",
  "preparatoria 1": "Preparatoria Uno",
  "preparatoria uno": "Preparatoria Uno",
  "prepa 2": "Preparatoria Dos",
  "prepa dos": "Preparatoria Dos",
  "preparatoria 2": "Preparatoria Dos",
  "preparatoria dos": "Preparatoria Dos",
  "uabic": "UABIC"
};

const EXAM_CONFIGS = {
  exani2: {
    id: "exani2",
    name: "EXANI II - áreas básicas",
    captureSheet: "Captura",
    keySheet: "Claves",
    questionCount: 60,
    captureQuestionStartColumn: 10,
    keyStartColumn: 3,
    defaultKey: "CBBBCCBACCABAAAAACBBACBABBCCAABBCABBBABACBBCCACCBBBACBCCBAAC",
    careers: UADY_CAREERS,
    careerAliases: CAREER_ALIASES,
    areas: [
      { code: "ri", name: "Redaccion indirecta", start: 1, end: 20 },
      { code: "cl", name: "Comprensión lectora", start: 21, end: 40 },
      { code: "pm", name: "Pensamiento matemático", start: 41, end: 60 }
    ]
  },
  exani1: {
    id: "exani1",
    name: "EXANI I - áreas básicas",
    captureSheet: "Captura_EXANI_I",
    keySheet: "Claves_EXANI_I",
    questionCount: 80,
    captureQuestionStartColumn: 10,
    keyStartColumn: 3,
    defaultKey: "BCAABCBAACABABCABBCACACABAAABABAABCCBAAAACAABACBCAACBCAACBBCCCABBACCBABCABBACABB",
    careers: EXANI_I_CAREERS,
    careerAliases: EXANI_I_CAREER_ALIASES,
    areas: [
      { code: "ri", name: "Estructura de la lengua", start: 1, end: 20 },
      { code: "cl", name: "Comprensión lectora", start: 21, end: 40 },
      { code: "pm", name: "Pensamiento matemático", start: 41, end: 60 },
      { code: "pc", name: "Pensamiento analítico", start: 61, end: 80 }
    ]
  }
};

function doGet(e) {
  const params = (e && e.parameter) || {};
  const callback = String(params.callback || "").trim();
  const action = String(params.action || "read").trim();
  const payload = action === "appendCapture"
    ? appendCapture_(params)
    : action === "appendEvent"
      ? appendEvent_(params)
    : action === "nameOcr"
      ? nameOcr_(params.payload)
      : buildPayload_(params);
  return respond_(payload, callback);
}

function doPost(e) {
  const params = (e && e.parameter) || {};
  const action = String(params.action || "").trim();
  const payload = action === "nameOcr"
    ? nameOcr_(e && e.postData && e.postData.contents)
    : action === "appendEvent"
      ? appendEvent_(params, e && e.postData && e.postData.contents)
      : appendCapture_(params, e && e.postData && e.postData.contents);
  return respond_(payload, "");
}

function respond_(payload, callback) {
  const json = JSON.stringify(payload);
  if (callback && /^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
    return ContentService
      .createTextOutput(callback + "(" + json + ");")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function appendCapture_(params, rawBody) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  let captura = null;
  let claves = null;
  let resultados = null;
  let config = null;
  let targetRow = 0;

  try {
    const payload = parseCapturePayload_(params, rawBody);
    config = getExamConfig_(payload.exam || params.exam);
    validateCapturePayload_(payload, config);

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    captura = getOrCreateCaptureSheet_(spreadsheet, config);
    claves = spreadsheet.getSheetByName("Claves");
    resultados = spreadsheet.getSheetByName("Resultados");

    if (config.id === "exani2" && (!claves || !resultados)) {
      throw new Error("Faltan las pestañas Claves o Resultados para insertar la calificación");
    }

    targetRow = Math.max(4, captura.getLastRow() + 1);
    ensureRows_(captura, targetRow);
    prepareCaptureRow_(captura, targetRow, config);
    if (claves && resultados && config.id === "exani2") {
      ensureRows_(claves, targetRow + 1);
      ensureRows_(resultados, targetRow + 1);
    }

    const nextIndex = Math.max(1, targetRow - 3);
    const scoreCapture = isAreaScoreCapture_(payload, config);
    const hasCompatibleResponses = Array.isArray(payload.responses) && payload.responses.length === config.questionCount;
    const numericResponses = scoreCapture
      ? hasCompatibleResponses
        ? payload.responses.map(toAnswerNumber_)
        : Array(config.questionCount).fill("")
      : payload.responses.map(toAnswerNumber_);
    const capturaRow = [
      nextIndex,
      payload.name,
      payload.email || "",
      payload.career,
      payload.event,
      payload.year || "2026",
      payload.grade || "",
      payload.group || "",
      payload.version || "1"
    ].concat(numericResponses, [
      payload.campus || payload.capturedBy || "",
      new Date(),
      payload.captureSource || "captura_manual"
    ], buildCaptureExtraValues_(payload, config));

    captura.getRange(targetRow, 1, 1, captureColumnCount_(config)).setValues([capturaRow]);
    if (claves && resultados && config.id === "exani2") {
      if (scoreCapture) {
        setDirectResultRow_(claves, resultados, targetRow, payload, config);
      } else {
        setFormulaRows_(claves, resultados, targetRow);
      }
    }

    SpreadsheetApp.flush();

    return {
      ok: true,
      sourceRow: targetRow,
      exam: config.id,
      resultRow: targetRow + 1,
      id: slugify_(payload.name + "-" + nextIndex),
      message: "Captura guardada"
    };
  } catch (error) {
    rollbackCaptureWrite_(captura, claves, resultados, targetRow, config);
    return {
      ok: false,
      error: String(error && error.message ? error.message : error)
    };
  } finally {
    lock.releaseLock();
  }
}

function appendEvent_(params, rawBody) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);

  try {
    const payload = parseEventPayload_(params, rawBody);
    const eventName = cleanText_(payload.name || payload.event);
    const campus = cleanText_(payload.campus || "General");
    const exam = getExamConfig_(payload.exam || params.exam).id;
    if (!eventName) throw new Error("Falta nombre del evento");

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getOrCreateEventsSheet_(spreadsheet);
    const events = readEvents_(spreadsheet);
    const exists = events.some(function(event) {
      return normalizeKey_(event.name) === normalizeKey_(eventName);
    });

    if (!exists) {
      sheet.appendRow([eventName, campus, exam, "Activo", new Date()]);
      SpreadsheetApp.flush();
    }

    return {
      ok: true,
      event: eventName,
      existing: exists,
      events: readEvents_(spreadsheet),
      message: exists ? "Evento existente" : "Evento guardado"
    };
  } catch (error) {
    return {
      ok: false,
      error: String(error && error.message ? error.message : error)
    };
  } finally {
    lock.releaseLock();
  }
}

function nameOcr_(rawBody) {
  try {
    const apiKey = PropertiesService.getScriptProperties().getProperty("OPENAI_API_KEY");
    const model = PropertiesService.getScriptProperties().getProperty("OPENAI_MODEL") || "gpt-5.5";
    if (!apiKey) throw new Error("Falta OPENAI_API_KEY en Script Properties");

    const payload = JSON.parse(rawBody || "{}");
    const crops = payload.crops || {};
    if (!crops.paternal || !crops.maternal || !crops.names) {
      throw new Error("Faltan recortes paternal, maternal o names");
    }

    const response = UrlFetchApp.fetch("https://api.openai.com/v1/responses", {
      method: "post",
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + apiKey
      },
      payload: JSON.stringify({
        model: model,
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: [
                  "Lee escritura manuscrita en mayusculas dentro de casillas de una hoja de respuestas.",
                  "Devuelve solo JSON valido con las claves paternal, maternal y names.",
                  "No inventes letras si no estás seguro; usa cadena vacía para una parte ilegible.",
                  "Normaliza a mayusculas sin acentos."
                ].join(" ")
              },
              { type: "input_text", text: "Apellido paterno:" },
              { type: "input_image", image_url: crops.paternal },
              { type: "input_text", text: "Apellido materno:" },
              { type: "input_image", image_url: crops.maternal },
              { type: "input_text", text: "Nombre(s):" },
              { type: "input_image", image_url: crops.names }
            ]
          }
        ],
        text: {
          format: {
            type: "json_schema",
            name: "student_name_ocr",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                paternal: { type: "string" },
                maternal: { type: "string" },
                names: { type: "string" }
              },
              required: ["paternal", "maternal", "names"]
            }
          }
        }
      }),
      muteHttpExceptions: true
    });

    const status = response.getResponseCode();
    const body = response.getContentText();
    if (status < 200 || status >= 300) {
      throw new Error("OpenAI HTTP " + status + ": " + body.slice(0, 300));
    }

    const parsed = JSON.parse(body);
    const text = extractResponseText_(parsed);
    const result = JSON.parse(text);

    return {
      ok: true,
      paternal: cleanOcrText_(result.paternal),
      maternal: cleanOcrText_(result.maternal),
      names: cleanOcrText_(result.names)
    };
  } catch (error) {
    return {
      ok: false,
      error: String(error && error.message ? error.message : error)
    };
  }
}

function extractResponseText_(response) {
  if (response.output_text) return response.output_text;

  const output = response.output || [];
  for (var i = 0; i < output.length; i++) {
    const content = output[i].content || [];
    for (var j = 0; j < content.length; j++) {
      if (content[j].text) return content[j].text;
    }
  }

  throw new Error("La respuesta del modelo no incluyó texto");
}

function cleanOcrText_(value) {
  return cleanText_(value)
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function parseCapturePayload_(params, rawBody) {
  if (params && params.payload) {
    return JSON.parse(params.payload);
  }

  if (rawBody) {
    return JSON.parse(rawBody);
  }

  return {
    exam: cleanText_(params.exam || "exani2"),
    name: cleanText_(params.name),
    email: cleanText_(params.email),
    career: cleanText_(params.career),
    event: cleanText_(params.event),
    year: cleanText_(params.year),
    version: cleanText_(params.version || "1"),
    campus: cleanText_(params.campus),
    capturedBy: cleanText_(params.capturedBy),
    capturedRole: cleanText_(params.capturedRole),
    capturedAt: cleanText_(params.capturedAt),
    captureSource: cleanText_(params.captureSource || params.source),
    responses: String(params.responses || "").split(","),
    areaScores: parseObjectParam_(params.areaScores),
    areaCorrects: parseObjectParam_(params.areaCorrects)
  };
}

function parseObjectParam_(value) {
  if (!value) return {};
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch (error) {
    return {};
  }
}

function parseEventPayload_(params, rawBody) {
  if (params && params.payload) {
    return JSON.parse(params.payload);
  }

  if (rawBody) {
    return JSON.parse(rawBody);
  }

  return {
    name: cleanText_(params.name || params.event),
    campus: cleanText_(params.campus),
    exam: cleanText_(params.exam || "exani2")
  };
}

function validateCapturePayload_(payload, config) {
  if (!payload) throw new Error("Payload vacio");
  payload.name = cleanText_(payload.name);
  payload.email = cleanText_(payload.email);
  payload.career = normalizeSheetCareer_(payload.career, config);
  payload.event = cleanText_(payload.event);
  payload.year = cleanText_(payload.year || "2026");
  payload.version = cleanText_(payload.version || "1");
  payload.campus = cleanText_(payload.campus || payload.capturedBy || "Sin campus");
  payload.capturedBy = cleanText_(payload.capturedBy || "Sin identificar");
  payload.capturedRole = cleanText_(payload.capturedRole);
  payload.captureSource = cleanText_(payload.captureSource || payload.source || "captura_manual");
  payload.areaScores = payload.areaScores || {};
  payload.areaCorrects = payload.areaCorrects || {};

  if (!payload.name) throw new Error("Falta nombre");
  if (!payload.career) throw new Error("Falta carrera");
  if (config.careers.indexOf(payload.career) < 0) throw new Error("Carrera fuera del catálogo configurado: " + payload.career);
  if (!payload.event) throw new Error("Falta evento");
  if (SHEET_YEARS.indexOf(payload.year) < 0) throw new Error("Año fuera del catálogo del Sheet: " + payload.year + ". Usa 2021, 2022, 2023, 2024, 2025 o 2026.");
  if (normalizeAreaScorePayload_(payload, config)) return;

  if (!Array.isArray(payload.responses) || payload.responses.length !== config.questionCount) {
    throw new Error("Deben existir " + config.questionCount + " respuestas");
  }

  payload.responses = payload.responses.map(toAnswerLetter_);
  const missing = payload.responses.findIndex(function(answer) { return !answer; });
  if (missing >= 0) {
    throw new Error("Respuesta inválida o vacía en pregunta " + (missing + 1));
  }
}

function normalizeAreaScorePayload_(payload, config) {
  const rawScores = payload.areaScores || {};
  const hasAnyScore = config.areas.some(function(area) {
    return rawScores[area.code] !== undefined && rawScores[area.code] !== "";
  });
  if (!hasAnyScore) return false;

  const areaScores = {};
  const areaCorrects = {};
  config.areas.forEach(function(area) {
    const score = Math.round(toNumber_(rawScores[area.code]));
    if (!score || score < 700 || score > 1300) {
      throw new Error("El puntaje de " + area.code.toUpperCase() + " debe estar entre 700 y 1300");
    }
    const total = area.end - area.start + 1;
    areaScores[area.code] = score;
    areaCorrects[area.code] = scoreToEstimatedCorrect_(score, total);
  });

  payload.areaScores = areaScores;
  payload.areaCorrects = areaCorrects;
  if (!Array.isArray(payload.responses) || payload.responses.length !== config.questionCount) {
    payload.responses = [];
  }
  payload.captureSource = "puntajes_area";
  return true;
}

function isAreaScoreCapture_(payload, config) {
  const scores = payload && payload.areaScores;
  return Boolean(scores && config.areas.every(function(area) {
    return Number(scores[area.code]) >= 700 && Number(scores[area.code]) <= 1300;
  }));
}

function scoreToEstimatedCorrect_(score, total) {
  const pct = Math.max(0, Math.min(1, (Number(score) - 700) / 600));
  return Math.round(pct * total);
}

function buildCaptureExtraValues_(payload, config) {
  const values = [isAreaScoreCapture_(payload, config) ? "puntajes_area" : "respuestas"];
  config.areas.forEach(function(area) {
    values.push(payload.areaCorrects && payload.areaCorrects[area.code] !== undefined ? payload.areaCorrects[area.code] : "");
    values.push(payload.areaScores && payload.areaScores[area.code] !== undefined ? payload.areaScores[area.code] : "");
  });
  return values;
}

function captureExtraHeaders_(config) {
  const headers = ["Modo captura"];
  config.areas.forEach(function(area) {
    headers.push(area.code.toUpperCase() + " aciertos estimados");
    headers.push(area.code.toUpperCase() + " puntaje");
  });
  return headers;
}

function captureColumnCount_(config) {
  return 12 + config.questionCount + captureExtraHeaders_(config).length;
}

function setFormulaRows_(claves, resultados, capturaRow) {
  const formulaRow = capturaRow + 1;
  const captureQuestionStartCol = 10;
  const keyStartCol = 3;
  const formulas = ["", "=Captura!B" + capturaRow];

  for (var i = 0; i < 60; i++) {
    formulas.push("=IF(Captura!" + columnName_(captureQuestionStartCol + i) + capturaRow + "=" + columnName_(keyStartCol + i) + "$4,1,0)");
  }

  claves.getRange(formulaRow, 1, 1, 62).setFormulas([formulas]);

  const resultFormulas = [
    "=Captura!C" + capturaRow,
    "=Captura!B" + capturaRow,
    "=SUM(Claves!C" + formulaRow + ":V" + formulaRow + ")",
    "=SUM(Claves!W" + formulaRow + ":AP" + formulaRow + ")",
    "=SUM(Claves!AQ" + formulaRow + ":BJ" + formulaRow + ")",
    "",
    "=1000+(100*L" + formulaRow + ")",
    "=1000+(100*M" + formulaRow + ")",
    "=1000+(100*N" + formulaRow + ")",
    "=AVERAGE(G" + formulaRow + ":I" + formulaRow + ")",
    "",
    "=((C" + formulaRow + "/0.2)-50)/16.67",
    "=((D" + formulaRow + "/0.2)-50)/16.67",
    "=((E" + formulaRow + "/0.2)-50)/16.67"
  ];

  resultados.getRange(formulaRow, 1, 1, 14).setFormulas([resultFormulas]);
}

function setDirectResultRow_(claves, resultados, capturaRow, payload, config) {
  const formulaRow = capturaRow + 1;
  if (claves) claves.getRange(formulaRow, 1, 1, 62).clearContent();

  const areaCorrects = config.areas.map(function(area) {
    return payload.areaCorrects[area.code];
  });
  const areaScores = config.areas.map(function(area) {
    return payload.areaScores[area.code];
  });
  const global = Math.round(areaScores.reduce(function(sum, score) {
    return sum + score;
  }, 0) / areaScores.length);
  const icneValues = areaScores.map(function(score) {
    return (score - 1000) / 100;
  });

  const resultValues = [
    payload.email || "",
    payload.name,
    areaCorrects[0] !== undefined ? areaCorrects[0] : "",
    areaCorrects[1] !== undefined ? areaCorrects[1] : "",
    areaCorrects[2] !== undefined ? areaCorrects[2] : "",
    "",
    areaScores[0] !== undefined ? areaScores[0] : "",
    areaScores[1] !== undefined ? areaScores[1] : "",
    areaScores[2] !== undefined ? areaScores[2] : "",
    global,
    "",
    icneValues[0] !== undefined ? icneValues[0] : "",
    icneValues[1] !== undefined ? icneValues[1] : "",
    icneValues[2] !== undefined ? icneValues[2] : ""
  ];

  resultados.getRange(formulaRow, 1, 1, 14).setValues([resultValues]);
}

function ensureRows_(sheet, row) {
  if (sheet.getMaxRows() < row) {
    sheet.insertRowsAfter(sheet.getMaxRows(), row - sheet.getMaxRows());
  }
}

function ensureColumns_(sheet, column) {
  if (sheet.getMaxColumns() < column) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), column - sheet.getMaxColumns());
  }
}

function prepareCaptureRow_(sheet, row, config) {
  ensureColumns_(sheet, captureColumnCount_(config));
  sheet.getRange(row, 1, 1, captureColumnCount_(config)).clearDataValidations();
}

function rollbackCaptureWrite_(captura, claves, resultados, targetRow, config) {
  if (!captura || !targetRow || !config) return;

  try {
    captura.getRange(targetRow, 1, 1, captureColumnCount_(config)).clearContent();
    if (config.id === "exani2") {
      const formulaRow = targetRow + 1;
      if (claves) claves.getRange(formulaRow, 1, 1, 62).clearContent();
      if (resultados) resultados.getRange(formulaRow, 1, 1, 14).clearContent();
    }
    SpreadsheetApp.flush();
  } catch (rollbackError) {
    console.warn("No se pudo limpiar una captura fallida", rollbackError);
  }
}

function columnName_(columnNumber) {
  var name = "";
  var number = columnNumber;
  while (number > 0) {
    var remainder = (number - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    number = Math.floor((number - 1) / 26);
  }
  return name;
}

function buildPayload_(params) {
  const config = getExamConfig_(params && params.exam);
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const captura = spreadsheet.getSheetByName(config.captureSheet);
  const events = readEvents_(spreadsheet);

  if (!captura) {
    return {
      meta: {
        spreadsheetId: SPREADSHEET_ID,
        updatedAt: new Date().toISOString(),
        examId: config.id,
        exam: config.name,
        questionCount: config.questionCount,
        source: "Google Sheets"
      },
      key: getAnswerKey_(spreadsheet, config),
      events: events,
      students: []
    };
  }

  const key = getAnswerKey_(spreadsheet, config);
  const lastRow = captura.getLastRow();
  const rowCount = Math.max(0, lastRow - 3);
  const readColumns = Math.max(12 + config.questionCount, Math.min(captureColumnCount_(config), captura.getLastColumn()));
  const capturaRows = rowCount ? captura.getRange(4, 1, rowCount, readColumns).getValues() : [];

  const students = capturaRows
    .map(function(row, index) {
      const name = cleanText_(row[1]);
      if (!name) return null;

      const responses = row.slice(9, 9 + config.questionCount).map(toAnswerLetter_);
      const scoreCapture = readAreaScoreCapture_(row, config);
      const scores = scoreCapture ? scoreCapture.scores : scoreResponses_(responses, key, config);
      const global = scores.global;
      if (!global) return null;

      return {
        id: slugify_(name + "-" + (row[0] || index + 1)),
        exam: config.id,
        sourceRow: index + 4,
        name: name,
        email: cleanText_(row[2]),
        career: cleanText_(row[3]),
        event: cleanText_(row[4]) || "Sin evento",
        year: String(row[5] || ""),
        grade: cleanText_(row[6]),
        group: cleanText_(row[7]),
        version: String(row[8] || "1"),
        campus: cleanText_(row[9 + config.questionCount]),
        capturedBy: cleanText_(row[9 + config.questionCount]),
        capturedAt: row[10 + config.questionCount],
        captureSource: cleanText_(row[11 + config.questionCount]),
        scores: scores,
        areaCorrects: scoreCapture ? scoreCapture.areaCorrects : {},
        responses: responses
      };
    })
    .filter(Boolean);

  return {
    meta: {
      spreadsheetId: SPREADSHEET_ID,
      updatedAt: new Date().toISOString(),
      examId: config.id,
      exam: config.name,
      questionCount: config.questionCount,
      source: "Google Sheets"
    },
    key: key,
    events: events,
    students: students
  };
}

function getExamConfig_(examId) {
  const raw = normalizeKey_(examId || "exani2");
  const key = raw.replace(/\s+/g, "");
  if (key === "exani1" || key === "exani180" || raw === "exani i") return EXAM_CONFIGS.exani1;
  if (key === "exani2" || key === "exani260" || raw === "exani ii") return EXAM_CONFIGS.exani2;
  return EXAM_CONFIGS[key] || EXAM_CONFIGS.exani2;
}

function getOrCreateCaptureSheet_(spreadsheet, config) {
  let sheet = spreadsheet.getSheetByName(config.captureSheet);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(config.captureSheet);
  }
  ensureRows_(sheet, 4);
  ensureCaptureHeader_(sheet, config);
  return sheet;
}

function ensureCaptureHeader_(sheet, config) {
  const headers = ["#", "Nombre completo", "Email", "Carrera", "Evento", "Año", "Grado", "Grupo", "Versión"];
  for (var i = 1; i <= config.questionCount; i++) {
    headers.push("P" + i);
  }
  headers.push("Campus", "Fecha captura", "Fuente");
  captureExtraHeaders_(config).forEach(function(header) {
    headers.push(header);
  });
  ensureColumns_(sheet, headers.length);
  sheet.getRange(3, 1, 1, headers.length).setValues([headers]);
}

function getOrCreateEventsSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(EVENTS_SHEET);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(EVENTS_SHEET);
  }
  sheet.getRange(1, 1, 1, 5).setValues([["Evento", "Campus", "Examen", "Estatus", "Fecha alta"]]);
  return sheet;
}

function readEvents_(spreadsheet) {
  const sheet = spreadsheet.getSheetByName(EVENTS_SHEET);
  if (!sheet) return [];

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  const rows = sheet.getRange(2, 1, lastRow - 1, 5).getValues();
  const unique = {};
  rows.forEach(function(row) {
    const name = cleanText_(row[0]);
    if (!name) return;
    const status = cleanText_(row[3] || "Activo");
    if (normalizeKey_(status) === "inactivo") return;
    const key = normalizeKey_(name);
    if (!unique[key]) {
      unique[key] = {
        name: name,
        campus: cleanText_(row[1]),
        exam: cleanText_(row[2]),
        status: status
      };
    }
  });

  return Object.keys(unique)
    .map(function(key) { return unique[key]; })
    .sort(function(a, b) { return a.name.localeCompare(b.name); });
}

function getAnswerKey_(spreadsheet, config) {
  const sheet = spreadsheet.getSheetByName(config.keySheet);
  if (sheet) {
    const values = sheet.getRange(4, config.keyStartColumn, 1, config.questionCount).getValues()[0].map(toAnswerLetter_);
    if (values.filter(Boolean).length === config.questionCount) return values;
  }
  return config.defaultKey.split("").map(toAnswerLetter_);
}

function readAreaScoreCapture_(row, config) {
  const modeIndex = 12 + config.questionCount;
  const sourceIndex = 11 + config.questionCount;
  let offset = 0;
  if (normalizeKey_(row[modeIndex]) === "puntajes_area") {
    offset = modeIndex + 1;
  } else if (normalizeKey_(row[sourceIndex]) === "puntajes_area") {
    offset = modeIndex;
  } else {
    return null;
  }

  const scores = {};
  const areaCorrects = {};
  let totalScore = 0;
  const firstValue = toNumber_(row[offset]);
  const secondValue = toNumber_(row[offset + 1]);
  const firstAreaTotal = config.areas[0].end - config.areas[0].start + 1;
  const pairedCorrectScoreLayout = firstValue <= firstAreaTotal && secondValue >= 700;

  for (var i = 0; i < config.areas.length; i++) {
    const area = config.areas[i];
    const total = area.end - area.start + 1;
    const correct = pairedCorrectScoreLayout ? toNumber_(row[offset]) : "";
    const score = pairedCorrectScoreLayout ? toNumber_(row[offset + 1]) : toNumber_(row[offset]);
    if (!score || score < 700 || score > 1300) return null;
    scores[area.code] = score;
    areaCorrects[area.code] = correct !== "" ? correct : scoreToEstimatedCorrect_(score, total);
    totalScore += score;
    offset += pairedCorrectScoreLayout ? 2 : 1;
  }
  scores.global = Math.round(totalScore / config.areas.length);
  return { scores: scores, areaCorrects: areaCorrects };
}

function scoreResponses_(responses, key, config) {
  const result = {};
  let totalScore = 0;
  config.areas.forEach(function(area) {
    let correct = 0;
    for (var i = area.start - 1; i <= area.end - 1; i++) {
      if (responses[i] && responses[i] === key[i]) correct++;
    }
    const icne = ((correct / 0.2) - 50) / 16.67;
    const score = Math.round(1000 + (100 * icne));
    result[area.code] = score;
    totalScore += score;
  });
  result.global = Math.round(totalScore / config.areas.length);
  return result;
}

function toNumber_(value) {
  if (typeof value === "number") return value;
  const parsed = Number(String(value || "").replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function toAnswerLetter_(value) {
  const raw = String(value || "").trim().toUpperCase();
  if (raw === "1" || raw === "A") return "A";
  if (raw === "2" || raw === "B") return "B";
  if (raw === "3" || raw === "C") return "C";
  return "";
}

function toAnswerNumber_(value) {
  const answer = toAnswerLetter_(value);
  if (answer === "A") return 1;
  if (answer === "B") return 2;
  if (answer === "C") return 3;
  return "";
}

function normalizeSheetCareer_(value, config) {
  const cleaned = cleanText_(value);
  if (!cleaned) return "";

  const normalized = normalizeKey_(cleaned);
  const careers = (config && config.careers) || SHEET_CAREERS;
  const aliases = (config && config.careerAliases) || CAREER_ALIASES;
  const direct = careers.find(function(career) {
    return normalizeKey_(career) === normalized;
  });

  if (direct) return direct;
  if (aliases[normalized]) return aliases[normalized];
  return cleaned;
}

function normalizeKey_(value) {
  return cleanText_(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function cleanText_(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function slugify_(value) {
  return cleanText_(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
