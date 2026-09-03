# La tarea del jueves — texto corregido

Este archivo es el **prompt de la tarea programada** "Esta semana en Valle —
actualización semanal" (jueves 12:00, hora de la Ciudad de México). Se guarda aquí
para que quede versionado; la tarea en sí se edita desde la app de Claude.

## Qué se corrigió respecto a la versión que venía corriendo

1. **El token.** Decía que si el PAT falla hay que pegarlo en `TOKEN.txt`. Ese
   archivo ya no existe — era un duplicado y se borró en la limpieza. El token real
   vive en `.gh_token`, que es de donde la tarea ya lo lee.
2. **`always` eran seis, hoy son 18.** El prompt seguía diciendo "los seis
   permanentes" y nombrándolos uno por uno. El README ya decía 18.
3. **Faltaba archivar.** `data.js` se reescribe entero cada jueves, así que las
   semanas pasadas del calendario salían vacías para siempre. Ahora el primer paso
   del jueves es `node archivar.js`.

También: la nota sobre los candados viejos de `.git` ya no aplica (se borraron), la
verificación ahora sube `historial.js` al contenedor, y se explica cómo mandar
coordenadas de venues nuevos desde `data.js` sin tocar la plantilla.

---

Actualiza el sitio "Esta semana en Valle" de Adrian con lo que hay esta semana y publícalo. Corre `date` primero. **La semana corre jueves→miércoles:** el jueves de hoy es el primer día y el miércoles que viene es el último. Son siete días y todos están por delante, así que la página nunca abre en un día muerto. Usa esas fechas en todo.

**El sitio vive en https://valle-esta-semana.pages.dev** — Cloudflare Pages conectado al repo de GitHub `Adr1angg/valle-esta-semana`. **Se publica haciendo push a `main`.** Cloudflare reconstruye solo en ~1 minuto. Nunca uses wrangler, la API de Cloudflare, ni la subida de archivos del dashboard — `api.cloudflare.com` está bloqueado por la lista de egress, y las subidas por el dashboard vía extensión producen deployments vacíos en silencio. GitHub sí es alcanzable; el push es la única ruta.

## PASO CERO — confirma que llegas a Chrome

Todas las fuentes de Valle son cuentas de Instagram que muestran muro de login a peticiones anónimas. Sin el Chrome local de Adrian esta tarea no sirve.

Carga las herramientas de Chrome con ToolSearch (`select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__browser_batch,mcp__claude-in-chrome__javascript_tool,mcp__claude-in-chrome__get_page_text,mcp__claude-in-chrome__tabs_close_mcp`) y llama `tabs_context_mcp` con `createIfEmpty: true`.

- **Funciona** → sigue.
- **Falla** → DETENTE. NO uses WebSearch/WebFetch para fabricar un resultado, y NO toques el repo. Mándale a Adrian un mensaje corto con el error exacto y el recordatorio de que la Mac tiene que estar despierta y en línea, con la app de escritorio de Claude y Chrome abiertos, y la extensión con permisos para instagram.com, facebook.com, ra.co y pages.dev. Termina la corrida.

## Copia de trabajo — un clon nuevo bajo $HOME

Trabaja en un clon fresco, no en la carpeta montada: así el push siempre sale de un árbol limpio y con lo último de `main`, aunque alguien más haya publicado en el intermedio.

```
T=$(tr -d '\n\r' < "$HOME/mnt/Valle Esta Semana/.gh_token")
rm -rf "$HOME/vs"
git clone -q "https://x-access-token:${T}@github.com/Adr1angg/valle-esta-semana.git" "$HOME/vs"
```

El token está en **`.gh_token`** dentro de la carpeta del proyecto. Es un PAT de alcance fino, solo este repo (Contents: read/write), expira 27 ago 2027. **Nunca lo imprimas, nunca lo eches por echo, y siempre pasa la salida de git por `sed -E "s/${T}/***/g"`.** Si falta o lo rechazan (401), detente y dile a Adrian que hay que regenerarlo en github.com/settings/personal-access-tokens → `valle-esta-semana-deploy` → Regenerate, y guardarlo en **`.gh_token`** dentro de la carpeta del proyecto (ya no existe `TOKEN.txt`).

## El orden del jueves — en este orden, sin saltarse el primero

1. **`node archivar.js`** — guarda los eventos de la semana que termina en `historial.js`. El calendario de tres semanas saca de ahí lo que pasó; si te saltas este paso, esa semana desaparece para siempre. `historial.js` **sólo crece**: no lo reescribas a mano ni lo borres.
2. Reescribe **`data.js`** con la semana nueva.
3. **Venues nuevos → `lugares.js`.** Si esta semana salió un lugar que no está en ese archivo, búscale la ubicación **aproximada** una sola vez y agrégalo. El diorama tiene 142 m por celda: la manzana correcta basta, la puerta exacta no cambia nada. Una vez guardado ya nunca hay que volver a buscarlo. Un lugar que falte cae al Centro — no truena, pero el pin queda flojo.
4. **`node verify.js`** — tiene que decir `todo pasa`.
5. Commit y push a `main`.

## El trabajo: SOLO se edita `data.js`

**`index.html` y `cdmx.html` son plantillas. NO se tocan. NO rediseñes nada.** Ahí vive el diorama 3D del lago y todo el diseño. Todo el contenido de la semana vive en `data.js`. Lee el `README.md` del repo antes de empezar — ahí está el contrato completo del esquema. En resumen:

- `week` — `label` (rango legible), `start`/`end` (**jueves de hoy** y **miércoles siguiente**, ISO), `updated` (ISO con -06:00), `updatedText`, `next` (el jueves siguiente, que es `end`+1), `note` (una o dos frases honestas de cómo viene la semana).
- `days` — siempre 7, **jueves→miércoles**, con `date` · `dow` · `s` · `dn` · `m`.
- Los últimos tres días (lun–mié) casi siempre vienen flacos: El Cuenco publica su volante los lunes, así que a la hora de la corrida todavía no existe. Poner lo recurrente y decirlo en `note` es la respuesta correcta; no inventes para rellenar.
- `events` — solo Valle. `id` único y estable, `date` (tiene que existir en `days`), `s`/`e` en **minutos desde medianoche** (19:00 = 1140; si cruza medianoche, `e` pasa de 1440 — 2:00 am = 1560), `time` como se lee, `cat` (una de: `noche` `musica` `bienestar` `mercado` `cultura` `aire`), `title`, `venue`, `price` (`""` si no hay), `blurb` de una frase específica con nombres, y opcionales `repeat`, `lineup`, `links` (0–2, `{l,h}`).
- **`lead: true` en UN SOLO evento de la semana** — es el widget grande y oscuro con la cinta coral. El plan del fin de semana. Si de verdad no hay nada que destaque, no pongas `lead` en ninguno.
- `cdmx` — **CDMX nunca va en `events`.** Va aquí y sale en su propia página: `{id, date, time, title, venue, price, genre, blurb, link}`.
- `always` — **hoy son 18, agrupados por categoría** (aire libre, mercados, cultura, bienestar, noche). Déjalos salvo que algo haya cambiado de verdad: son los que sostienen una semana floja. La rejilla es `auto-fill`, no hay número fijo. En el sitio salen dentro de un acordeón que arranca cerrado.
- `checked` — venues revisados sin novedad. `soon` — lo que viene en semanas próximas.
- `cats` no se toca.

**Los lugares del mapa.** Al tocar un día, el diorama se acerca al lugar del evento y planta un pin. Las coordenadas viven en **`lugares.js`**, que es la memoria del proyecto — así no se repite la misma búsqueda cada semana:

```js
window.VL = { "Nombre exacto del venue": [19.1938, -100.1322] };
```

El nombre tiene que coincidir con el campo `venue` de `data.js`. También se puede mandar algo puntual desde `data.js` con `lugares: {...}`, que gana sobre `lugares.js`, pero lo normal es guardarlo en `lugares.js`.

Un día sin eventos se muestra solo (tile apagado + "Nada programado"). No hay que hacer nada especial.

Después de editar, valida que el archivo parsea:
```
cd "$HOME/vs" && node -e "global.window={};require('./data.js');console.log(window.VS.events.length,'eventos')"
```

## Verifica antes de publicar

`node verify.js` necesita Playwright. Revisa desbordes, errores de página, que existan los widgets de evento, los siete tiles, las 21 celdas del calendario y los permanentes, que la escena 3D haya arrancado, y que no haya ligas internas rotas. Si Playwright no está en la Mac, sube `index.html`, `cdmx.html`, `data.js`, `historial.js`, `lugares.js` y `verify.js` al contenedor en la nube y córrelo ahí (Chromium en `/opt/pw-browsers/chromium`, `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`; **nunca** corras `playwright install`). Tiene que reportar `todo pasa` en 390px y 1280px, claro y oscuro.

## Publica

```
cd "$HOME/vs" && git add -A
git -c user.name="Adrian" -c user.email="adriangispertgalvez@hotmail.com" commit -m "Semana del <rango>"
git push "https://x-access-token:${T}@github.com/Adr1angg/valle-esta-semana.git" main:main 2>&1 | sed -E "s/${T}/***/g"
```

**Si el push se rechaza con "fetch first"** alguien publicó mientras trabajabas. Haz `git pull --rebase` en el clon y vuelve a empujar. Si el rebase se complica, clona `main` otra vez, copia encima **sólo tus `data.js`, `historial.js` y `lugares.js`**, commitea y publica desde el clon nuevo — así conservas lo que hayan subido los demás. Nunca uses `push --force`.

**Confirma que de verdad quedó en vivo.** Espera ~90s, abre https://valle-esta-semana.pages.dev en Chrome y toma screenshot. Checa que se vean las fechas nuevas y que la página abra en el día de hoy. No reportes éxito solo porque Cloudflare lo diga — míralo.

Copia el `data.js`, el `historial.js` y el `lugares.js` actualizados a `$HOME/mnt/Valle Esta Semana/` para que su carpeta local coincida con lo que está en vivo.

Cierra las pestañas de Chrome que hayas abierto y mándale a Adrian un mensaje corto: qué hay esta semana en una frase, la liga, y lo que no pudiste confirmar. Recuérdale de vez en cuando que las sugerencias del público llegan a Supabase, proyecto `daily-brief`, tabla `valle_sugerencias` (él las lee en el panel; tú no tienes llave de lectura).

## Alcance — todo lo que pasa en Valle

Noche y música en vivo; mercados y comida; aire libre y deporte (parapente en El Peñón y Divisadero, vela en Club Náutico Avándaro, trail runs, triatlón, MTB); cultura (galerías, museos, Casa de Cultura, fiestas patronales); bienestar (Casa Sadhana, Chamma Ling/Ligmincha, El Santuario). Más un set chico de "vale el viaje" para la Ciudad de México cuando de verdad haya algo bueno.

**Esto no es un sitio de DJs.** Museos, la casa de cultura, la biblioteca comunitaria, temazcales, mercados de a diario, clubes de vela y de bici cuentan igual que los bares.

**Calendario adelante** — checa si alguno cae en tu semana: Trail Run Avándaro y Día del Grito en septiembre · Festival de Vela 9 oct · Triatlón Valle de Bravo 24 oct · Festival de las Almas fin de oct–nov · Fiesta patronal de San Francisco 4 oct · Feria de Santa María 3 may · Feria Villa de Colorines principios de may · El Peñón Classic Race febrero · Monarca Paragliding Open enero.

**Trampa:** Eventbrite, AllEvents y Bandsintown archivan venues de *Toluca* (Teatro Morelos, Casa Musas, Foro Lando) bajo "Valle de Bravo". Toluca está a 1.5–2 horas — nunca los listes como eventos de Valle.

## Fuentes

`sources.md` en el repo tiene la lista verificada completa con los callejones sin salida. **Léelo completo cada corrida.** En corto —

**Tier 1:** @elcuencovalle (de lejos la mejor — flyer de agenda semanal publicado lun–mar; abre el post más nuevo y lee TANTO la imagen del flyer COMO el caption, porque el caption nombra a los DJs; revisa también Stories y facebook.com/ElCuencoBarraDeEspecialidades) · @el_santuario_music · @surreal.festival · @basilico_valle · @marina33terraza · @cincorodavento · bravognp.com.

**Tier 2:** @mestizosaborymezcal, @donabarra.cantina, @la_pila_seca_, @monkeysvalle, @r27nightclub, @kuun_rooftop, @laplaya_valledebravo, @lospericos_valle, @hotelpuestadelsol360, @blue.socialclub, @fullpassticket, @el.lugardelquetehabe, @rancho_avandaro, @clubdegolfavandaro, @turismovalledebravo, xfdr.net, clubnauticoavandaro.org, ligmincha.org.

**Callejones sin salida:** @theweekendview (cerró), @bravognp (liga muerta), @exs.bar (vacía), @corazondequetzal (persona equivocada — usa la página de Facebook), @barcentral.oficial (bar brasileño).

**Ciudad de México:** ra.co/events/mx/mexicocity — consulta **UN DÍA A LA VEZ** con `?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`; la vista por defecto colapsa a un día y esconde sábado y domingo en silencio. Sale un interstitial de "Verifying the device..." al primer load — espéralo, nunca intentes un CAPTCHA. Saca las URLs con `javascript_tool`: `[...new Set([...document.querySelectorAll('a[href*="/events/2"]')].map(a=>a.textContent.trim()+' :: '+a.href))]`, luego abre cada evento prometedor y lee `document.body.innerText.slice(0,800)` para hora exacta, precio, género y line-up. Verifica siempre la hora desde la página del evento. Las etiquetas de género de RA engañan (archivó un show de UK garage de Pangaea como "techno/house") — juzga por quién es el artista realmente. Revisa también Fünk, Sunday Sunday y @yuyucineclub directo.

**El gusto de Adrian, para el `lead` y para `cdmx`:** house, UK garage, electrónica (Fred again.., Overmono, FISHER, TSHA, Jamie xx, DJ Seinfeld), más selectores de soul, disco y boogie. Sáltate techno puro, hardstyle y relleno de festival salvo que el nombre sea un standout.

**Técnica:** `browser_batch` para navegar + capturar varios perfiles por viaje. La API de Instagram `/api/v1/users/web_profile_info/` está muerta (400, schema borrado); la técnica que sí funciona — leer el `alt` de las miniaturas, que transcribe el texto del volante — está documentada arriba de todo en `sources.md`. Los perfiles a veces salen en blanco al primer load; espera 3–4s y vuelve a capturar.

## Estándares

El `blurb` del evento con `lead` puede ser opinionado y en la voz de Adrian; los demás son neutrales y factuales — sus amigos y desconocidos leen esta página. Sé honesto: una semana tranquila es una respuesta perfectamente válida, nunca inventes eventos ni infles la lista. Si un venue simplemente no publicó, dilo en `checked` en vez de desaparecerlo. Los títulos en español, concretos, sin adjetivos de relleno.

Solo lectura en sus cuentas — nunca mandes mensajes, DMs, comentarios ni follows.
