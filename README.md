# Valle Esta Semana

> ## LEE ESTO PRIMERO — actualizado 8 sep 2026
>
> Si algo del prompt de la tarea del jueves contradice esta sección, **gana esta sección**.
>
> 0. **La rejilla de días es lunes→domingo, siempre, y la calcula la página
>    sola con la fecha de hoy.** No sale de `data.js`: el lunes se pasa sola a
>    la semana nueva sin esperar a nadie. La tarea sigue corriendo el jueves.
>    Un día sin eventos sale apagado y ya — eso es normal, no es una falla.
>    Cambió el 8 sep 2026 (antes era jueves→miércoles); ver la bitácora.
> 0.5 **Se llama Valle, nunca "el pueblo".** En todo lo que lee la gente. La
>    excepción es el código del diorama, donde "pueblo" es la mancha de casas.
>    Regla completa en `tarea-semanal.md`. Petición de Adrian, 3 sep 2026.
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
> 6. **Si el push se rechaza con "fetch first":** `git pull --rebase` y vuelve a publicar.
>    (Antes esto decía "clona `main` de nuevo y copia encima tu `data.js`". **Eso descarta
>    cualquier commit que no venga de la tarea del jueves** — en una sesión habría borrado
>    tres. Corregido el 31 ago 2026.)


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

## La semana que se ve es lunes → domingo, y la calcula la página

Los siete cuadros de arriba son **el lunes→domingo que contiene hoy**, sacados de
la fecha del navegador. No salen de `data.js`. Eso quiere decir tres cosas:

1. **Se pasa sola.** El domingo a medianoche la rejilla salta a la semana
   siguiente sin que corra nada. El latido de 20 s ya lo hacía para "hoy"; ahora
   también para la semana.
2. **Un día sin eventos sale apagado.** Es lo normal, no una falla. De lunes a
   miércoles, hasta que corre la tarea del jueves, es probable que haya poco:
   para eso están los 18 `always`.
3. **`data.js` sólo pone los eventos.** Cada uno cae en su fecha; los que quedan
   fuera de la semana visible simplemente no se pintan. `week.label` ya no manda
   en el sello — el sello dice el rango de verdad de la rejilla.

**El calendario de tres semanas también es lunes→domingo**, como siempre.

Antes de esto la semana era jueves→miércoles para que la edición del jueves no
abriera en días muertos. Se cambió el 8 sep 2026 a petición de Adrian: una semana
tiene que leerse como una semana. El hueco de lunes a miércoles se acepta a
cambio.

## Si los datos ya están viejos

El aviso en coral ya no mide si la semana terminó —eso no puede pasar, la rejilla
se pasa sola—, sino **la edad de los datos**: si `week.updated` tiene más de ocho
días, se saltó una edición completa y la página lo dice.

## Lo único que cambia cada semana: `data.js`

**`index.html` y `cdmx.html` son plantillas. No se tocan en la actualización semanal.**
Todo el contenido vive en `data.js`. La tarea del jueves reescribe ese archivo y ya.

```js
window.VS = {
  week: {
    label:       "3 – 9 septiembre 2026", // rango que se muestra en el sello
    start:       "2026-09-03",            // jueves: el dia que se publica (ISO)
    end:         "2026-09-09",            // miercoles siguiente
    updated:     "2026-08-27T15:04:00-06:00",
    updatedText: "jue 27 ago, 15:04",
    next:        "jueves 3 sep",
    note:        "Una o dos frases honestas sobre cómo viene la semana."
  },

  cats: { … },   // no cambia — noche · musica · bienestar · mercado · cultura · aire

  days: [        // siempre 7, jueves → miercoles
    {date:"2026-09-03", dow:"Jueves", s:"Jue", dn:3, m:"sep"}, …
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
- La paleta se mueve con la **posición real del sol** sobre Valle (`data-t` = dawn · day ·
  dusk · night). No es un horario fijo: en diciembre oscurece a las 18:10 y en junio a las
  20:15, y el sitio lo sabe. La cuenta vive en `window.VALLE_SOLAR` dentro de `index.html`
  y de ahí cuelgan el color del sitio y la luz del diorama, para que no se contradigan.
- El día es el gesto principal: tiles arriba, el tablero se recompone al hacer clic.
  La página abre en **hoy**.

### La escena del fondo

`<div class="escena" id="escena3d">` es el **diorama de vóxeles** del vaso de la presa:
terreno real, casas reales de OpenStreetMap, calles, árboles, orilla, veleros, parapentes
y ventanas encendidas de noche. Gira con el scroll y la luz sigue al sol de verdad. WebGL 1
escrito a mano, **sin dependencias**, 26.5 KB comprimido, de dos a cuatro llamadas de
dibujo según haya luces y lluvia.

De noche el pueblo **derrama luz sobre lo que tiene alrededor** —el cerro, la calle, la
orilla y el lago, que lo refleja—, no sólo sobre su propio edificio. Eso sale de un mapa
difuminado de ventanas encendidas que se calcula una vez al cargar.

**El clima entra en vivo.** `window.VALLE_CLIMA = {lluvia, nubes, viento}` mueve la lluvia,
la bruma, la dureza del sol y el oleaje. Lo llena Open-Meteo (ver abajo), pero cualquiera
puede escribirlo desde la consola para probar.

**Cada evento lleva al mapa.** Tocar una tarjeta abre el diorama a pantalla
completa, encuadrado en el venue y al doble de acercamiento, con su pin y el
nombre del evento abajo. Los enlaces de adentro de la tarjeta siguen ganando: si
tocas "Instagram" te vas a Instagram. La cámara viaja en poco más de un segundo
(`VALLE_CAM.vuela`) y cualquier arrastre o rueda cancela el viaje.

**De noche el pueblo se refleja en el agua en una columna**, no sólo en la celda
que tiene enfrente: es el mismo cálculo del reflejo del sol pero con el pueblo de
fuente, y por eso tiembla. Las ventanas llevan un halo de canto para que un
racimo de casas se lea como una mancha de luz y no como una retícula de puntos.
El zócalo tiene vetas de roca, lo lejano se lava contra el fondo con la distancia
de cámara, y al amanecer se acuesta niebla sobre el lago según la humedad real.
**La luna también es de verdad** —su fase y su lugar en el cielo— y vive en un
`<div>` detrás del lienzo, no en WebGL: `window.VALLE_LUNA`.

**Dentro del recuadro de las fuentes hay una línea** —"Explora el mapa"— que abre el
diorama **a pantalla completa**. Y es el mismo diorama: no se monta un segundo mapa, se le
sube el `z-index` a la escena que ya vive fija detrás de la página y se tapa el sitio con un
velo del color del fondo. Arrastrar gira, la rueda o el pellizco acercan, y una barra de
horas mueve el sol, el color del sitio y las ventanas. `Esc` o la ✕ cierran y la cámara se
devuelve sola. La API es `window.VALLE_CAM` (`tomar`, `soltar`, `gira`, `zoom`, `reset`,
`marco`, `estado`).

**La fecha se relee sola.** Un latido cada 20 s vuelve a leer el día: si una pestaña abierta
cruza la medianoche, el tile de "Hoy", el calendario del mes, el renglón de "Ahora / En 20
min" y el aviso de semana vencida se reacomodan sin recargar y sin esperar al jueves. Si el
lector eligió un día a mano, se respeta.

Los anillos topográficos siguen ahí como plan B: si el navegador no da WebGL, la clase
`sin-webgl` los saca y la página se ve bien igual.

El bloque va incrustado en `index.html`. **Los datos y el renderizador viven en
`_escena/datos/`** y se rearman con `node build.js`. De dónde salió cada dato, cómo está
codificado y qué cuidar si se rehace: **`_escena/DATOS-GEOGRAFICOS.md`**.

---

## El clima

Única llamada externa del sitio, y es opcional: **Open-Meteo**
(`api.open-meteo.com`), sin llave y sin atribución obligatoria. Se pide 1.2 s
después de cargar y se guarda 15 min en `localStorage` — una llamada por visita.
**Si falla, no pasa nada:** la escena se comporta como siempre y la barra no dice
nada. El sitio nunca depende de esto.

De ahí salen la lluvia y las nubes del diorama, el viento que mece los árboles, y
el renglón `19° · nublado` de la barra.

Aviso honesto para quien lea esto en tres meses: el `current` de Open-Meteo es un
modelo sobre una rejilla de kilómetros, no una estación en el malecón. En un valle
con lago y mil metros de desnivel a veces dirá que llueve con el cielo seco. Le
atina casi siempre; no es una ventana.

Para probar sin esperar a que llueva: el botón **Llover** del panel del pie, o
`window.VALLE_CLIMA = {lluvia:.8, nubes:.9, viento:.8}` en la consola.

---

## La página de lugares

`lugares.html` no se edita nunca. Se arma sola al cargar con tres cosas que ya
existen: `lugares.js` (qué lugares se conocen), `data.js` (qué hay esta semana) y
`historial.js` (qué ha habido antes). Por cada lugar saca lo de esta semana, lo
que se repite, cuándo fue la última vez, y una liga que abre el diorama ahí
(`index.html#mapa=El%20Cuenco`).

Para que eso funcione **`historial.js` guarda el venue desde el 8 sep 2026**
(`v:` en cada entrada, y `h:` la hora). Las entradas viejas no lo traían;
`archivar.js` las rellena solo cuando el título coincide **exacto** con un evento
de `data.js` que sí tiene venue — los que se repiten cada semana. Quedaron cinco
sin lugar, todos eventos de una sola vez, y ahí se quedan: inventarles un venue
sería peor que no tenerlo.

La página crece sola cada jueves. Entre más semanas pasen, más sirve.

## La cuenta de uso

Tabla `valle_visitas` en el mismo Supabase que las sugerencias, con la misma
llave publicable y la misma regla: **anon sólo puede INSERT**, nunca leer. Se
manda una fila al abrir la página y una por cada clic que importa (día, evento,
mapa, siempre, CDMX, sugerencia enviada).

Lo que **no** se guarda, a propósito: IP, user-agent, cookies, ni nada que dure
más que la pestaña. La "sesión" es un número al azar en `sessionStorage` que
muere al cerrarla, y existe nada más para no contar diez clics como diez
personas. Con Do Not Track prendido no se manda nada. Techo de 40 filas por
sesión. Si Supabase se cae, no pasa nada: el error se traga y la página sigue.

Para leerlo hay dos vistas hechas, en el editor SQL de Supabase:

```sql
select * from valle_uso_dia;      -- visitas, sesiones y clics por día
select * from valle_uso_evento;   -- qué eventos se tocaron más
```

---

## Archivos

| archivo | qué es |
|---|---|
| `index.html` | el sitio · plantilla, no se edita cada semana |
| `cdmx.html` | página aparte de DJs en CDMX · plantilla |
| `data.js` | **lo único que cambia cada semana** |
| `historial.js` | eventos de semanas pasadas · **sólo crece, nunca se reescribe** |
| `lugares.js` | dónde cae cada venue en el diorama · se le agregan los nuevos |
| `lugares.html` | página de lugares · plantilla, se arma sola con el historial |
| `og.jpg` | la imagen que sale al compartir la liga · 1200×630 |
| `tarea-semanal.md` | copia versionada del prompt de la tarea del jueves |
| `archivar.js` | guarda la semana en `historial.js` · se corre antes de tocar `data.js` |
| `verify.js` | Playwright: desbordes, errores, y que la escena y el tablero existan |
| `sources.md` | lista verificada de fuentes, con los callejones sin salida |
| `investigacion-facebook.md` | investigación de Facebook y otras fuentes · qué se agregó, qué se descartó y por qué |
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
