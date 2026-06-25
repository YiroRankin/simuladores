# Modelo Google Sheets

## Mantener compatibilidad inicial

El primer prototipo puede leer el archivo actual sin reestructurarlo:

- `Captura!B4:B`: nombre.
- `Captura!C4:C`: email.
- `Captura!D4:D`: carrera.
- `Captura!E4:E`: evento.
- `Captura!F4:F`: ano.
- `Captura!J4:BQ`: respuestas 1-60.
- `Captura` conserva las columnas de respuestas y agrega al final columnas opcionales para capturas por puntaje de area:
  - `Modo captura`: `respuestas` o `puntajes_area`.
  - Por cada area: `XX aciertos estimados` y `XX puntaje`.
- `Claves!C4:BJ4`: clave oficial.
- `Resultados!G5:J`: puntajes RI, CL, PM y global.
- `data/uady-2025.json`: carrera, punto de corte 2025, sustentantes, admitidos y porcentaje de admision.

## Modelo recomendado para evolucionar

Aunque el MVP lea el archivo actual, conviene crear una version limpia con estas pestanas.

### config_examenes

| exam_id | nombre | total_preguntas | activo |
|---|---|---:|---|
| exani_ii_60 | EXANI II 60 preguntas | 60 | TRUE |

### areas

| area_id | exam_id | nombre | codigo | pregunta_inicio | pregunta_fin |
|---|---|---|---|---:|---:|
| ri | exani_ii_60 | Redaccion indirecta | RI | 1 | 20 |
| cl | exani_ii_60 | Comprension lectora | CL | 21 | 40 |
| pm | exani_ii_60 | Pensamiento matematico | PM | 41 | 60 |

### claves

| exam_id | version | pregunta | respuesta_correcta |
|---|---|---:|---|
| exani_ii_60 | 1 | 1 | C |

### eventos

| event_id | nombre | fecha | tipo | ciclo |
|---|---|---|---|---|
| open_house_2023_06_15 | Open House 15 de junio 2023 | 2023-06-15 | Open House | 2023 |

### alumnos

| student_id | nombre | email | telefono |
|---|---|---|---|
| autogenerado | Nombre Alumno | correo@ejemplo.com |  |

### intentos

| attempt_id | student_id | event_id | exam_id | version | carrera | fecha_captura | fuente |
|---|---|---|---|---|---|---|---|
| autogenerado | student_id | event_id | exani_ii_60 | 1 | Medico cirujano | 2026-06-10 | manual |

### respuestas

| attempt_id | pregunta | respuesta |
|---|---:|---|
| attempt_id | 1 | C |

### resultados

| attempt_id | area | aciertos | puntaje |
|---|---|---:|---:|
| attempt_id | RI | 12 | 1060 |

### captura_puntajes_area

Cuando solo se tienen indices CENEVAL por area, la app guarda el intento sin respuestas crudas y calcula aciertos estimados con una equivalencia lineal:

```text
aciertos_estimados = redondear(((puntaje_area - 700) / 600) * reactivos_area)
puntaje_global = promedio(puntajes_area)
```

La escala se limita a 700-1300. El reporte individual marca esos aciertos como estimados para diferenciarlos de los aciertos calculados contra clave.

### cortes_uady

| carrera | ano_corte | punto_corte | puntaje_mas_alto | demanda | admitidos | porcentaje_ingreso |
|---|---:|---:|---:|---:|---:|---:|
| Medico cirujano | 2025 | 1248 |  | 3724 | 247 | 6.63% |

## Regla de oro

La app debe calcular resultados desde datos fuente, no depender de copiar/pegar formulas en muchas columnas. Google Sheets puede seguir siendo la base, pero la logica de calificacion debe vivir tambien en la app para generar reporte y PDF con consistencia.
