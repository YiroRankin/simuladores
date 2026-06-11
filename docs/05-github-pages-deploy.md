# Publicar en GitHub Pages

La app puede vivir en GitHub Pages y seguir usando Apps Script como backend para Google Sheets.

## Arquitectura

- `app/`: sitio estático publicado en GitHub Pages.
- `apps-script/Code.gs`: endpoint que lee y guarda en el Google Sheet.
- `app/config.js`: URL pública del Apps Script.

## Preparar el repo

1. Sube este proyecto a un repositorio de GitHub.
2. Asegúrate de que la rama principal se llame `main`.
3. En GitHub, ve a `Settings > Pages`.
4. En `Build and deployment`, selecciona `GitHub Actions` como fuente.
5. Haz push a `main`.

El workflow `.github/workflows/deploy-pages.yml` publicará automáticamente la carpeta `app/`.

## URL final

Si no configuras dominio propio, GitHub Pages publicará algo parecido a:

```text
https://USUARIO.github.io/NOMBRE-DEL-REPO/
```

Con dominio propio, se puede apuntar a algo como:

```text
https://simuladores.misionadmision.com/
```

## Apps Script

La app publicada seguirá usando:

```text
app/config.js
```

Ahí debe estar la URL `/exec` del Apps Script. Cuando actualices `apps-script/Code.gs`, recuerda publicar una nueva versión en Apps Script.

## Seguridad mínima recomendada

- No guardar API keys en `app/config.js`.
- Mantener `OPENAI_API_KEY` solo en Script Properties si algún día se reactiva OCR con IA.
- Considerar un token simple para guardado en Apps Script si la URL pública empieza a circular fuera del equipo.
- Probar el flujo desde celular con la URL de GitHub Pages antes de usarlo en evento real.

