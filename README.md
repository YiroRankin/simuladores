# Simuladores Mision Admision

Proyecto para construir una webapp interna de calificacion y reporte de resultados de simuladores EXANI.

## MVP acordado

- Examen inicial: EXANI II.
- Reactivos: 60 preguntas.
- Areas:
  - RI: Redaccion indirecta, preguntas 1-20.
  - CL: Comprension lectora, preguntas 21-40.
  - PM: Pensamiento matematico, preguntas 41-60.
- Respuestas: A/B/C, almacenadas como 1/2/3 para mantener compatibilidad con el Google Sheet actual.
- Fuente comparativa inicial: Google Sheet historico `EXANI II-SIMULADOR ESCUELAS. Calificaciones`.
- Clave inicial: la clave ya existente en la pestana `Claves`.
- Puntos de corte UADY: se usara el proceso de ingreso 2025 como contraste inicial.
- Usuarios: equipo comercial interno.
- Acceso alumno: fuera del MVP.
- PDF individual: incluido en MVP.
- OCR de hoja de respuestas: incluido como captura asistida con revision antes de guardar, no guardado automatico ciego.

## Flujo objetivo

1. Crear o seleccionar evento de aplicacion.
2. Registrar alumno y carrera de interes.
3. Capturar respuestas manualmente, subir foto de hoja de respuestas o ingresar puntajes por area cuando solo existan indices CENEVAL.
4. Revisar lectura de respuestas.
5. Calificar contra la clave oficial.
6. Guardar intento en Google Sheets.
7. Generar reporte individual en pantalla.
8. Exportar PDF individual.

## Fuentes de datos iniciales

- `Captura`: alumnos, carrera, evento, ano y respuestas crudas.
- `Claves`: clave oficial y comparacion respuesta-vs-clave.
- `Resultados`: aciertos, puntajes CENEVAL por area y global.
- `data/uady-2025.json`: cortes UADY 2025 y datos de demanda/admitidos.
- `concentrado_looker`: tabla plana actual para reporte.
- `concentrado_looker_aplicacion`: promedios por evento/ano.

## Formula actual de calificacion

Para cada area:

```text
ICNE = ((aciertos / 0.2) - 50) / 16.67
Puntaje area = 1000 + (100 * ICNE)
Puntaje global = promedio de RI, CL y PM
```

Si solo se capturan puntajes por area, la app estima aciertos con:

```text
Aciertos estimados = redondear(((puntaje area - 700) / 600) * reactivos del area)
```

En la app nueva esta formula debe quedar centralizada y testeada para evitar diferencias entre captura, reporte y PDF.

## Primer entregable tecnico

Una webapp interna con datos leidos desde Google Sheets que permita:

- Seleccionar un alumno existente del historico.
- Ver su reporte redisenado.
- Compararlo contra:
  - promedio del evento,
  - promedio general del historico,
  - punto de corte UADY de su carrera.
- Exportar el reporte individual a PDF.

Despues se agrega captura de nuevos intentos y lectura de hoja de respuestas.
