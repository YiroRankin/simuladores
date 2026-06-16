# Roadmap - captura, permisos y base por evento

## Usuarios capturistas

- [x] Agregar una configuracion de capturista sin login para usuarios que solo registran respuestas.
- [x] Definir roles iniciales: administrador, capturista y consulta.
- [x] Guardar usuario capturista, fecha y fuente en cada intento.

## Permisos por modulo

- [x] Permitir habilitar o deshabilitar las pestanas `Lote` y `Foto de hoja` por usuario.
- [x] Mantener `Reporte` y `Captura` como base operativa.
- [x] Permitir modos por URL para abrir la misma app con menus distintos.
- [x] Guardar catalogo de eventos en la pestana `Eventos` aunque todavia no existan capturas.
- [x] Usar selector cerrado de evento en Captura para evitar nombres escritos de formas distintas.
- Ocultar acciones no permitidas desde la interfaz y validar permisos tambien en backend.

## URLs operativas

- Captura Veracruz: usar la URL normal, o agregar `?modo=captura&campus=Veracruz`.
- Reporte base / escuela: agregar `?modo=base` o `?modo=escuela`.
- Vista completa interna: agregar `?modo=admin`.
- Tambien se puede preseleccionar campus con `?campus=Campeche`, `?campus=Merida`, `?campus=Playa%20del%20Carmen` o `?campus=Veracruz`.

## Panel Base

- Convertir la pestana `Base` en un panel de analisis por evento.
- Seleccionar evento y mostrar resumen general, alumnos, carreras, grupos y desempeno por area.
- Preparar reportes detallados por grupo e individuales para escuelas, especialmente en operativos como Veracruz.
