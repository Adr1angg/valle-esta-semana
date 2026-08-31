# Valle Esta Semana

> ## LEE ESTO PRIMERO — actualizado 28 ago 2026
>
> Si algo del prompt de la tarea del jueves contradice esta sección, **gana esta sección**.
>
> 1. **Esto no es un sitio de DJs.** El alcance son las seis categorías: noche, música en
>    vivo, mercado, cultura, bienestar y aire libre. Museos, la casa de cultura, la
>    biblioteca comunitaria, temazcales, mercados de a diario, clubes de vela y de bici
>    cuentan igual que los bares.
> 2. **`sources.md` es la lista maestra. Léelo completo cada corrida.** Está organizado por
>    categoría, con handles, horarios, y una sección de callejones sin salida.
> 3. **`always` ya no son seis.** Hoy son 18, agrupados por categoría. La rejilla es
>    `auto-fill`: agrega o quita libremente.
> 4. **La API de Instagram `/api/v1/users/web_profile_info/` está muerta** (400, schema
>    borrado). La técnica que sí funciona — leer el `alt` de las miniaturas, que transcribe
>    el texto del volante — está documentada arriba de todo en `sources.md`.
> 5. **Antes de tocar `data.js`, corre `node archivar.js`.** Eso guarda los eventos
>    de la semana que termina en `historial.js`, que es de donde el calendario saca
>    las semanas pasadas. Si se te olvida, esa semana desaparece para siempre.
>    `historial.js` **sólo crece**: nunca lo reescribas a mano ni lo borres.
> 6. **Si el push se rechaza con "fetch first":** no intentes rebase. Clona `main` de nuevo,
>    copia encima tu `data.js`, commitea y publica desde el clon limpio.


Sitio público de una sola página con lo que pasa cada semana en Valle de Bravo.
Vive en **https://valle-esta-semana.pages.dev** (Cloudflare Pages conectado a
`Adr1angg/valle-esta-semana`). **Se publica haciendo push a `main`.** Cloudflare
reconstruye solo en ~1 minuto. No usar wrangler, la API de Cloudflare, ni la
subida de archivos del dashboard.

---

## El orden de cada jueves

1. `node archivar.js` — archiva la semana que termina en `historial.js`.
2. Reescribe `data.js` con la semana nueva.
3. Si aparecieron venues nuevos, agrégalos a `lugares.js` con su ubicación
   aproximada — basta la manzana correcta. Así no hay que volver a buscarla
   la semana que viene.
4. `node verify.js` — tiene que decir `todo pasa`.
5. Commit y push a `main`.

## Dónde caen los lugares

`lugares.js` es la memoria: `{"Nombre del venue": [lat, lon]}`. Una vez que un
lugar está ahí, ya no hay que volver a buscarlo. El diorama tiene 142 m por celda,
así que la manzana correcta basta — la puerta exacta y la esquina se ven igual. Un
venue que no esté cae al Centro. `data.js` puede mandar `lugares: {...}` para algo
puntual, y eso gana sobre `lugares.js`.

## Si la semana ya pasó

Si `week.end` quedó atrás, la página lo dice sola: un aviso discreto los primeros
siete días y uno en coral después. Así nadie lee una semana vieja creyendo que es
la de hoy.

## Lo único que cambia cada semana: `data.js`

**`index.html` y `cdmx.html` son plantillas. No se tocan en la actualización semanal.**
Todo el contenido vive en `data.js`. La tarea del jueves reescribe ese archivo y ya.

```js
window.VS = {
  week: {
    label:       "24 – 30 agosto 2026",   // rango que se muestra en el sello
    start:       "2026-08-24",            // lunes de la semana (ISO)
    end:         "2026-08-30",            // domingo
    updated:     "2026-08-27T15:04:00-06:00",
    updatedText: "jue 27 ago, 15:04",
    next:        "jueves 3 sep",
    note:        "Una o dos frases honestas sobre cómo viene la semana."
  },

  cats: { … },   // no cambia — noche · musica · bienestar · mercado · cultura · aire

  days: [        // siempre 7, lunes → domingo
    {date:"2026-08-24", dow:"Lunes", s:"Lun", dn:24, m:"ago"}, …
  ],

  events: [{
    id:     "hongosto",            // único y estable
    date:   "2026-08-28",          // tiene que existir en days[]
    s:      1140,                  // inicio en minutos desde medianoche (19:00 = 1140)
    e:      1560,                  // fin — solo se usa para "está pasando ahora"
    time:   "19:00",               // como se lee en pantalla
    cat:    "noche",               // una de las seis
    lead:   true,                  // opcional · máximo UNO por semana → widget grande y oscuro
    title:  "Fiesta Hongosto",
    venue:  "El Cuenco",
    price:  "Sin cover anunciado", // "" si no hay
    repeat: "cada sábado",         // opcional
    blurb:  "Una frase específica. Nombres, no adjetivos.",
    lineup: ["Samu","ESGO","Yisus"],           // opcional
    links:  [{l:"Instagram", h:"https://…"}]   // 0–2
  }],

  cdmx: [{ id, date, time, title, venue, price, genre, blurb, link }],  // solo DJs
  always: [{ cat, title, when, blurb }],                                // lo permanente
  checked: "Venue · Venue · Venue",   // revisados sin novedad
  soon:    "Lo que viene en semanas próximas"
};
```

Reglas que la plantilla da por hechas:

- `s` y `e` en minutos. Si algo cruza medianoche, `e` pasa de 1440 (2:00 am = 1560).
- **Un solo `lead`.** Es el widget grande y oscuro con la cinta coral.
- Un día sin eventos se muestra solo (tile apagado + "Nada programado"). No hay que hacer nada.
- CDMX **nunca** va en `events` — va en `cdmx` y sale en su propia página.
- Los `always` (hoy 18, agrupados por categoría) se quedan salvo que algo haya cambiado de
  verdad. Sostienen las semanas flojas y son el catálogo de lo que siempre está abierto:
  aire libre, mercados, cultura, bienestar, noche. Se pueden agregar más — la rejilla es
  `auto-fill`, no hay número fijo.

---

## Diseño — Verde Lago

No rediseñar en la actualización semanal.

- **Una sola familia de color** (sage, olivo, lima, agua, crema) más **un** acento coral
  que solo marca: hoy, el evento `lead`, y los botones de acción.
- Tres planos de profundidad: escena de fondo → paneles hundidos (`--in`) → tarjetas
  levantadas (`--sh` / `--sh2`).
- Tipografía: **Fraunces** (`opsz` · `wght` · `SOFT` · `WONK`) display, **Manrope** UI,
  **IBM Plex Mono** para horas y datos.
- La paleta se mueve con la hora real (`data-t` = dawn · day · dusk · night). Automático.
- El día es el gesto principal: tiles arriba, el tablero se recompone al hacer clic.
  La página abre en **hoy**.

### La escena del fondo

`<div class="escena" id="escena3d">` es el **diorama de vóxeles** del vaso de la presa:
terreno real, casas reales de OpenStreetMap, calles, árboles y ventanas encendidas de
noche. Gira con el scroll y la luz sigue la hora. WebGL 1 escrito a mano, **sin
dependencias**, 17.9 KB comprimido, una sola llamada de dibujo de día.

Los anillos topográficos siguen ahí como plan B: si el navegador no da WebGL, la clase
`sin-webgl` los saca y la página se ve bien igual.

El bloque va incrustado en `index.html`. **Los datos y el renderizador viven en
`_escena/datos/`** y se rearman con `node build.js`. De dónde salió cada dato, cómo está
codificado y qué cuidar si se rehace: **`_escena/DATOS-GEOGRAFICOS.md`**.

---

## Archivos

| archivo | qué es |
|---|---|
| `index.html` | el sitio · plantilla, no se edita cada semana |
| `cdmx.html` | página aparte de DJs en CDMX · plantilla |
| `data.js` | **lo único que cambia cada semana** |
| `historial.js` | eventos de semanas pasadas · **sólo crece, nunca se reescribe** |
| `lugares.js` | dónde cae cada venue en el diorama · se le agregan los nuevos |
| `og.jpg` | la imagen que sale al compartir la liga · 1200×630 |
| `tarea-semanal.md` | copia versionada del prompt de la tarea del jueves |
| `archivar.js` | guarda la semana en `historial.js` · se corre antes de tocar `data.js` |
| `verify.js` | Playwright: desbordes, errores, y que la escena y el tablero existan |
| `sources.md` | lista verificada de fuentes, con los callejones sin salida |
| `BITACORA.md` | **qué cambió y por qué, con fecha** · se le agrega una entrada en cada cambio |
| `_archivo/` | versiones anteriores del sitio, por si acaso |
| `_escena/DATOS-GEOGRAFICOS.md` | de dónde salió el mapa y cómo está codificado |
| `_escena/datos/` | terreno, casas, calles y el renderizador · aquí se rearma la escena |
| `_escena/COMO-INTEGRAR.md` | cómo meter una escena nueva a `index.html`, y los tropiezos |
| `_escena/escena.js` | el bloque ya armado (ya va incrustado en `index.html`) |

## Anotar el cambio

Antes de cada push que toque cómo funciona o cómo se ve el sitio, va una entrada
nueva hasta arriba de **`BITACORA.md`**: qué cambió, por qué, y qué se rompió en el
camino. El `git log` guarda las líneas; la bitácora guarda el motivo, que es lo que
se olvida.

La carga semanal del jueves **no** se anota — corre sola y no cambia el sitio. Sí se
anota si cambia la tarea del jueves misma.

## Verificar antes de publicar

```
node archivar.js     # primero: no perder la semana que termina
node verify.js       # requiere playwright
```
Tiene que reportar `ox=0`, sin errores de página, en las cuatro combinaciones.
Si Playwright no está en la máquina, subir los archivos al contenedor y correrlo ahí
(Chromium en `/opt/pw-browsers`, `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`; nunca
`playwright install`).
