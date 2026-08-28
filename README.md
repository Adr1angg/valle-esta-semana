# Valle Esta Semana

Sitio público de una sola página con lo que pasa cada semana en Valle de Bravo.
Vive en **https://valle-esta-semana.pages.dev** (Cloudflare Pages conectado a
`Adr1angg/valle-esta-semana`). **Se publica haciendo push a `main`.** Cloudflare
reconstruye solo en ~1 minuto. No usar wrangler, la API de Cloudflare, ni la
subida de archivos del dashboard.

---

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
- Los `always` (hoy 18, agrupados por categoria) se quedan salvo que algo haya cambiado de
  verdad. Sostienen las semanas flojas y son el catalogo de lo que siempre esta abierto:
  aire libre, mercados, cultura, bienestar, noche. Se pueden agregar mas — la rejilla es
  `auto-fill`, no hay numero fijo.

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

`<div class="escena" id="escena3d">` es un **placeholder**: anillos topográficos, bandas
de agua y un sol que se mueve con la hora. Cuando exista el render 3D del lago se
reemplaza **ese bloque completo** y nada más. No hay dependencias externas.

---

## Archivos

| archivo | qué es |
|---|---|
| `index.html` | el sitio · plantilla, no se edita cada semana |
| `cdmx.html` | página aparte de DJs en CDMX · plantilla |
| `data.js` | **lo único que cambia cada semana** |
| `verify.js` | Playwright: sin desbordes ni errores en 390px y 1280px, claro y oscuro |
| `sources.md` | lista verificada de fuentes, con los callejones sin salida |
| `archivo/` | versiones anteriores del sitio, por si acaso |

## Verificar antes de publicar

```
node verify.js       # requiere playwright
```
Tiene que reportar `ox=0`, sin errores de página, en las cuatro combinaciones.
Si Playwright no está en la máquina, subir los archivos al contenedor y correrlo ahí
(Chromium en `/opt/pw-browsers`, `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`; nunca
`playwright install`).
