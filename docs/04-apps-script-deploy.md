# Despliegue del endpoint Google Sheets

La webapp necesita una URL JSON para leer el Google Sheet oficial sin exponer credenciales en el navegador.

## 1. Crear Apps Script

1. Abre el Google Sheet oficial.
2. Ve a `Extensiones > Apps Script`.
3. Borra el contenido inicial.
4. Pega el contenido de:

```text
apps-script/Code.gs
```

5. Guarda el proyecto con un nombre como `Simuladores EXANI API`.

## 2. Probar dentro de Apps Script

1. En el editor, selecciona la funcion `buildPayload_`.
2. Da clic en `Ejecutar`.
3. Google pedira permisos la primera vez.
4. Autoriza con la cuenta que tiene acceso al Sheet.

Si no marca errores, el lector del Sheet ya funciona.

## 3. Publicar como Web App

1. Clic en `Implementar > Nueva implementacion`.
2. Tipo: `Aplicacion web`.
3. Ejecutar como: `Yo`.
4. Quien tiene acceso: `Cualquier persona con el enlace`.
5. Clic en `Implementar`.
6. Copia la URL que termina en `/exec`.

Si ya existia una implementacion y cambiaste `Code.gs`, entra a `Implementar > Administrar implementaciones`, edita la implementacion activa y selecciona `Nueva version`. Si no haces esto, la URL puede seguir sirviendo el codigo anterior.

## 4. Configurar la webapp local

Abre:

```text
app/config.js
```

Y reemplaza:

```js
window.SIMULADORES_CONFIG = {
  apiUrl: "",
  nameOcrUrl: "",
};
```

por:

```js
window.SIMULADORES_CONFIG = {
  apiUrl: "https://script.google.com/macros/s/TU_DEPLOYMENT_ID/exec",
  nameOcrUrl: "https://script.google.com/macros/s/TU_DEPLOYMENT_ID/exec?action=nameOcr",
};
```

## 5. Configurar OCR de nombre con IA

El OCR de nombre usa Apps Script como endpoint seguro para no exponer la API key en el navegador.

1. En Apps Script, abre `Configuracion del proyecto`.
2. En `Propiedades de la secuencia de comandos`, agrega:

```text
OPENAI_API_KEY = tu_api_key_de_openai
```

3. Opcionalmente agrega el modelo:

```text
OPENAI_MODEL = gpt-5.5
```

4. Guarda las propiedades.
5. Publica una nueva version de la implementacion activa.

En la app, sube una foto en la pestana `Foto`, espera los recortes del nombre y usa `Sugerir nombre con IA`. El resultado siempre debe revisarse antes de pasarlo a captura.

## 6. Verificar

Abre:

```text
app/index.html
```

Si la URL esta bien configurada, el selector de alumnos debe llenarse con datos reales del Google Sheet.

## Notas

- El endpoint lee datos, guarda capturas y sugiere nombres desde los recortes de la hoja.
- El endpoint ya puede guardar nuevas capturas con `action=appendCapture`.
- La app conserva datos de muestra cuando `apiUrl` esta vacio o cuando el endpoint falla.
- El endpoint soporta JSON y JSONP para que la webapp pueda cargarse tambien desde `file://`.
- El guardado por respuestas escribe en `Captura` y agrega formulas en `Claves` y `Resultados`.
- El guardado por puntajes de area escribe las respuestas vacias, agrega columnas finales con `Modo captura`, aciertos estimados y puntajes por area, y deja valores directos en `Resultados` cuando aplica.
- El OCR de nombre usa `POST`, asi que si el navegador bloquea la peticion desde `file://`, conviene servir la app por `localhost` o migrarla a HTML Service de Apps Script.

## 7. Probar captura manual

1. Refresca `app/index.html`.
2. Entra a la pestana `Captura`.
3. Llena nombre, carrera, evento, ano y version.
4. Marca las 60 respuestas.
5. Revisa el puntaje preliminar.
6. Haz clic en `Guardar en Sheet`.

Si aparece un error indicando que hay que publicar nueva version, vuelve a Apps Script y actualiza la implementacion activa con una version nueva.
