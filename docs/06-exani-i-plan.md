# Plan para EXANI I

La forma más limpia de sumar EXANI I es convertir la app en una base común con perfiles de examen.

## Perfil de examen

Cada perfil debería definir:

- nombre del examen,
- número de preguntas,
- áreas evaluadas,
- rangos de preguntas por área,
- clave oficial,
- escala de calificación,
- puntos de corte o referencias equivalentes,
- endpoint/Sheet de origen si no se usa el mismo archivo.

## Diferencias esperadas

EXANI II actual:

- 60 preguntas,
- 3 áreas básicas,
- cortes UADY 2025 por carrera.

EXANI I:

- otro número de áreas,
- otra clave,
- posiblemente otros cortes/referencias,
- reporte con lenguaje ajustado al nivel del alumno.

## Recomendación

No conviene duplicar toda la webapp. Conviene extraer una configuración tipo:

```js
const examProfiles = {
  exani2: { ... },
  exani1: { ... },
};
```

Luego la interfaz puede permitir elegir `EXANI I` o `EXANI II`, y reutilizar:

- captura manual,
- lote,
- foto de hoja,
- guardado en Sheet,
- reporte,
- PDF.

Esto reduce mantenimiento y permite que mejoras futuras, como OCR o vista por lote, sirvan para ambos exámenes.

