# MVP - Reporte y Calificacion EXANI II

## Objetivo

Crear una webapp interna para que Mision Admision pueda capturar, calificar y presentar reportes individuales de simuladores EXANI II de 60 preguntas.

El MVP debe resolver dos necesidades:

1. Consultar y generar reportes con el historico actual.
2. Preparar el camino para capturar nuevos simuladores sin depender de Looker Studio.

## Alcance incluido

- EXANI II de 60 preguntas.
- Version: examen de areas basicas.
- Clave unica inicial tomada del Google Sheet actual.
- Captura manual de respuestas.
- Lectura asistida por foto como modulo posterior del MVP.
- Reporte individual.
- Comparativo contra:
  - promedio del evento de aplicacion,
  - promedio de todo el historico,
  - punto de corte UADY 2025 de la carrera registrada.
- Exportacion PDF individual.
- Google Sheets como base de datos.

## Fuera de alcance por ahora

- EXANI I.
- Modulos diagnosticos EXANI II.
- Portal para alumnos.
- Login por roles.
- Probabilidad de admision.
- Recomendaciones personalizadas por area.
- PDFs masivos por grupo.

## Vista de reporte sugerida

El reporte individual debe incluir:

- Nombre del alumno.
- Carrera de interes.
- Evento de aplicacion.
- Puntaje global.
- Punto de corte UADY de la carrera.
- Diferencia contra punto de corte.
- Promedio del evento.
- Promedio historico.
- Resultado por area:
  - RI.
  - CL.
  - PM.
- Mensaje pedagogico breve:
  - "Vas por arriba del corte historico."
  - "Estas cerca del corte: faltan X puntos."
  - "Tu area mas fuerte fue..."
  - "Tu area prioritaria para reforzar es..."

## Pantalla interna sugerida

- Selector de evento.
- Buscador de alumno.
- Tabla de resultados.
- Boton "Ver reporte".
- Boton "Exportar PDF".
- Boton "Nueva captura".

## Captura nueva

Campos minimos:

- Nombre completo.
- Carrera de interes.
- Evento de aplicacion.
- Ano/ciclo.
- Version de examen.
- Respuestas 1-60.

Validaciones:

- Cada respuesta debe ser A, B, C, 1, 2 o 3.
- No aceptar `0`, `1|`, texto mixto o vacios sin marcarlos como pendientes.
- No publicar reporte si faltan respuestas, salvo que el usuario confirme que desea calificar incompleto.

## OCR / foto de hoja

Primera version recomendada:

- Subir foto desde celular.
- Detectar respuestas.
- Mostrar una pantalla de auditoria con:
  - nombre leido,
  - conteo de respuestas detectadas,
  - preguntas con baja confianza,
  - 4 o 5 respuestas de control.
- Permitir correccion antes de guardar.

No se debe guardar automaticamente una lectura sin revision humana en el MVP.
