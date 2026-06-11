# Proximos pasos

## Paso 1 - Cortes UADY 2025

Ya se extrajeron del documento guia los puntos de corte UADY 2025, sustentantes, admitidos y porcentaje de admision por carrera.

Archivo local:

- `data/uady-2025.json`

## Paso 2 - Congelar clave

Usaremos la clave actual de `Claves!C4:BJ4` como clave oficial del MVP.

Antes de publicar la app hay que confirmar que esa clave corresponde al simulador actual de venta/eventos.

## Paso 3 - Primer prototipo

Construir una webapp local que lea datos ya exportados o mockeados del Sheet y muestre:

- listado de alumnos,
- reporte individual,
- comparativos,
- exportacion PDF.

## Paso 4 - Conexion real a Google Sheets

Ya se preparo un endpoint de Apps Script para que la webapp lea:

- alumnos,
- resultados,
- promedios por evento.

Instrucciones:

- `docs/04-apps-script-deploy.md`

## Paso 5 - Captura manual

Ya se agrego una pantalla de captura manual con:

- datos del alumno,
- carrera,
- evento,
- ano,
- version,
- respuestas 1-60,
- calificacion preliminar,
- guardado en el Sheet original.

Para activar el guardado real hay que copiar el `apps-script/Code.gs` actualizado y publicar una nueva version del Apps Script.

## Paso 6 - Foto/OCR

Ya se agrego la pestana `Foto de hoja` con:

- subida o toma de foto,
- vista previa,
- recortes ampliados de apellido paterno, apellido materno y nombre(s),
- transcripcion asistida del nombre hacia Captura,
- checklist de calidad,
- deteccion experimental de respuestas 1-60 por plantilla,
- acceso directo a captura manual con respuestas precargadas.

Pendiente:

- reactivar OCR de nombre cuando haya API key de OpenAI o endpoint equivalente,
- mostrar confianza por pregunta,
- calibrar tolerancia para fotos inclinadas o recortadas.

Notas del OCR:

- Se probo OCR local con Tesseract.js para nombre manuscrito, pero no dio precision suficiente.
- Por ahora se mantiene oculto el OCR de nombre.
- La transcripcion manual desde recortes sigue activa.
- La alternativa recomendada para version futura es un endpoint seguro con OpenAI u otro modelo de vision.

## Endpoint sugerido para OCR de nombre

La app mantiene preparado `nameOcrUrl` en `app/config.js` para una version futura con endpoint seguro de vision/IA. Por ahora esta desactivado.

Request esperado:

```json
{
  "crops": {
    "paternal": "data:image/jpeg;base64,...",
    "maternal": "data:image/jpeg;base64,...",
    "names": "data:image/jpeg;base64,..."
  }
}
```

Respuesta esperada:

```json
{
  "paternal": "RANKIN",
  "maternal": "RODRIGUEZ",
  "names": "YIRO AMABLE"
}
```

La API key del modelo de vision debe vivir en ese endpoint seguro, nunca en el navegador.

## Lo que necesita hacer el usuario ahora

1. Confirmar que el reporte debe usar la clave actual del Sheet sin cambios.
2. Revisar si hay carreras del Sheet historico con nombres diferentes a UADY para agregar alias.
3. Compartir los nuevos elementos graficos para integrar branding.
