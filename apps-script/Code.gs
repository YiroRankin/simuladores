const SPREADSHEET_ID = "1t6V2SDhLmD1pU9tmk_QZwL6iAKtsaiV0E6bHp4QO__I";
const SHEET_YEARS = ["2021", "2022", "2023", "2024", "2025"];
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
  "Nanotecnologia",
  "Veracruz"
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

function doGet(e) {
  const params = (e && e.parameter) || {};
  const callback = String(params.callback || "").trim();
  const action = String(params.action || "read").trim();
  const payload = action === "appendCapture"
    ? appendCapture_(params)
    : action === "nameOcr"
      ? nameOcr_(params.payload)
      : buildPayload_();
  return respond_(payload, callback);
}

function doPost(e) {
  const params = (e && e.parameter) || {};
  const action = String(params.action || "").trim();
  const payload = action === "nameOcr"
    ? nameOcr_(e && e.postData && e.postData.contents)
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

  try {
    const payload = parseCapturePayload_(params, rawBody);
    validateCapturePayload_(payload);

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const captura = spreadsheet.getSheetByName("Captura");
    const claves = spreadsheet.getSheetByName("Claves");
    const resultados = spreadsheet.getSheetByName("Resultados");

    const targetRow = Math.max(4, captura.getLastRow() + 1);
    ensureRows_(captura, targetRow);
    ensureRows_(claves, targetRow + 1);
    ensureRows_(resultados, targetRow + 1);

    const nextIndex = Math.max(1, targetRow - 3);
    const numericResponses = payload.responses.map(toAnswerNumber_);
    const capturaRow = [
      nextIndex,
      payload.name,
      payload.email || "",
      payload.career,
      payload.event,
      payload.year || "2025",
      payload.grade || "",
      payload.group || "",
      payload.version || "1"
    ].concat(numericResponses);

    captura.getRange(targetRow, 1, 1, 69).setValues([capturaRow]);
    setFormulaRows_(claves, resultados, targetRow);

    SpreadsheetApp.flush();

    return {
      ok: true,
      sourceRow: targetRow,
      resultRow: targetRow + 1,
      id: slugify_(payload.name + "-" + nextIndex),
      message: "Captura guardada"
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
                  "No inventes letras si no estas seguro; usa cadena vacia para una parte ilegible.",
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

  throw new Error("La respuesta del modelo no incluyo texto");
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
    name: cleanText_(params.name),
    email: cleanText_(params.email),
    career: cleanText_(params.career),
    event: cleanText_(params.event),
    year: cleanText_(params.year),
    version: cleanText_(params.version || "1"),
    responses: String(params.responses || "").split(",")
  };
}

function validateCapturePayload_(payload) {
  if (!payload) throw new Error("Payload vacio");
  payload.name = cleanText_(payload.name);
  payload.email = cleanText_(payload.email);
  payload.career = normalizeSheetCareer_(payload.career);
  payload.event = cleanText_(payload.event);
  payload.year = cleanText_(payload.year || "2025");
  payload.version = cleanText_(payload.version || "1");

  if (!payload.name) throw new Error("Falta nombre");
  if (!payload.career) throw new Error("Falta carrera");
  if (SHEET_CAREERS.indexOf(payload.career) < 0) throw new Error("Carrera fuera del catalogo del Sheet: " + payload.career);
  if (!payload.event) throw new Error("Falta evento");
  if (SHEET_YEARS.indexOf(payload.year) < 0) throw new Error("Año fuera del catalogo del Sheet: " + payload.year + ". Usa 2021, 2022, 2023, 2024 o 2025.");
  if (!Array.isArray(payload.responses) || payload.responses.length !== 60) {
    throw new Error("Deben existir 60 respuestas");
  }

  payload.responses = payload.responses.map(toAnswerLetter_);
  const missing = payload.responses.findIndex(function(answer) { return !answer; });
  if (missing >= 0) {
    throw new Error("Respuesta invalida o vacia en pregunta " + (missing + 1));
  }
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

function ensureRows_(sheet, row) {
  if (sheet.getMaxRows() < row) {
    sheet.insertRowsAfter(sheet.getMaxRows(), row - sheet.getMaxRows());
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

function buildPayload_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const captura = spreadsheet.getSheetByName("Captura");
  const resultados = spreadsheet.getSheetByName("Resultados");
  const claves = spreadsheet.getSheetByName("Claves");

  const lastRow = captura.getLastRow();
  const rowCount = Math.max(0, lastRow - 3);
  const capturaRows = rowCount ? captura.getRange(4, 1, rowCount, 69).getValues() : [];
  const resultadoRows = rowCount ? resultados.getRange(5, 7, rowCount, 4).getValues() : [];
  const key = claves.getRange(4, 3, 1, 60).getValues()[0].map(toAnswerLetter_);

  const students = capturaRows
    .map(function(row, index) {
      const name = cleanText_(row[1]);
      if (!name) return null;

      const scores = resultadoRows[index] || [];
      const global = toNumber_(scores[3]);
      if (!global) return null;

      return {
        id: slugify_(name + "-" + (row[0] || index + 1)),
        sourceRow: index + 4,
        name: name,
        email: cleanText_(row[2]),
        career: cleanText_(row[3]),
        event: cleanText_(row[4]) || "Sin evento",
        year: String(row[5] || ""),
        version: String(row[8] || "1"),
        scores: {
          ri: Math.round(toNumber_(scores[0])),
          cl: Math.round(toNumber_(scores[1])),
          pm: Math.round(toNumber_(scores[2])),
          global: Math.round(global)
        },
        responses: row.slice(9, 69).map(toAnswerLetter_)
      };
    })
    .filter(Boolean);

  return {
    meta: {
      spreadsheetId: SPREADSHEET_ID,
      updatedAt: new Date().toISOString(),
      exam: "EXANI II - areas basicas",
      questionCount: 60,
      source: "Google Sheets"
    },
    key: key,
    students: students
  };
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

function normalizeSheetCareer_(value) {
  const cleaned = cleanText_(value);
  if (!cleaned) return "";

  const normalized = normalizeKey_(cleaned);
  const direct = SHEET_CAREERS.find(function(career) {
    return normalizeKey_(career) === normalized;
  });

  if (direct) return direct;
  if (CAREER_ALIASES[normalized]) return CAREER_ALIASES[normalized];
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
