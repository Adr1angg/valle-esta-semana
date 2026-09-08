# Facebook y otras fuentes — investigación y decisiones

**31 ago 2026 · investigado y decidido. Nada integrado todavía.**
Este archivo NO cambia la tarea del jueves ni `sources.md`. Es el material listo para
integrarse cuando Adrian dé luz verde. Cuando se integre: lo que sirva se muda a
`sources.md`, el criterio de admisión se copia a la tarea, y se anota en `BITACORA.md`.

---

## Decisiones tomadas

| Decisión | Qué se hace |
|---|---|
| **Un solo grupo de Facebook** | `QUE TODO VALLE DE BRAVO SE ENTERE` (95K). Se revisa **cada jueves**. |
| **Ningún grupo privado** | No se entra a ninguno. No se solicita entrada a ninguno. |
| **Todos los demás grupos: fuera** | No se revisan. No se vuelven a evaluar. |
| **Filtro de admisión** | Nuevo: no todo evento entra al sitio. Ver abajo. |

---

## 1. Criterio de admisión — qué entra al sitio y qué no

Esto es lo más importante de este documento. Aplica a **todas** las fuentes, no solo a
Facebook. Tres preguntas en orden; si una falla, no entra.

### ¿Cualquiera puede llegar?

Tiene que ser abierto: entrada libre, cover, boleto o reservación que **cualquier
persona** pueda hacer.

**Fuera:** XV años, bodas, bautizos, graduaciones, posadas de empresa, fiestas privadas,
y cualquier cosa "por invitación" o con RSVP cerrado a un grupo.

### ¿Es un evento, o es un anuncio?

La prueba: *¿alguien puede **ir** ese día, o es un anuncio para que le compre algo a
alguien?*

- **Sí es evento:** banda en vivo el viernes · clase gratis de salsa el sábado · ciclo de
  cine en Espacio Odisea · regata · práctica en la stupa · bazar del mes · fiesta patronal.
- **No es evento:** "DJ para tu fiesta, cotiza" · renta de mobiliario, sillas y carpas ·
  banquetes · vacantes · rifas · promoción de producto sin fecha ("2x1 todo el mes") ·
  cursos de varias semanas con inscripción · MLM disfrazado de taller de emprendimiento.

Este filtro solito mata el 90% del ruido de Facebook, porque los grupos están llenos de
**proveedores** de fiesta, no de fiestas.

### ¿Tiene lugar, día, hora, y quién lo convoca?

- **Lugar** nombrado y en Valle. No Toluca. No excursiones que salen de CDMX.
- **Día** dentro de la semana lunes→domingo que se está publicando.
- **Hora** de inicio. Sin hora no hay `s`/`e`, así que no entra a `events`.
- **Quién convoca:** el venue, el organizador, o la cuenta oficial. Un volante que
  reposteó un tercero es **pista**, no confirmación — hay que verificarlo en la cuenta
  del venue antes de publicarlo.

### A dónde va cada cosa

El esquema que ya existe resuelve casi todos los casos raros:

| Lo que encontraste | Dónde va |
|---|---|
| Evento de una sola fecha, público, con hora | `events` |
| Algo recurrente y abierto (clase de salsa de cada sábado, taller de poesía de los lunes, práctica de la stupa del domingo, mercado del sábado) | `always` |
| Evento real pero de una semana futura | `soon` |
| Venue revisado que no publicó nada | `checked` |
| Todo lo demás | **fuera** |

Ejemplo real: las clases de salsa de BAR 7 van a `always`, no a `events`. Lo valioso de
BAR 7 no es la clase de ese sábado — es agregarlo como venue permanente y revisarlo cada
semana de ahí en adelante.

### La barra de calidad, encima de todo lo anterior

Pasar el filtro no basta. Última pregunta antes de escribir el `blurb`:

> **¿Un desconocido que lee esto tendría una razón concreta para ir?**

Si el evento no se puede describir en una frase específica — con nombre, lugar, y quién
toca o quién lo da — probablemente no valía. **Ante la duda, fuera.**

`sources.md` ya lo dice y aquí vale doble: **una semana tranquila es una respuesta
perfectamente válida.** Un sitio con cuatro cosas buenas le gana a uno con doce donde
tres son cursos de estilismo. La gente vuelve a un sitio en el que confía.

**Regla dura:** el `lead` de la semana **nunca** sale de un grupo de Facebook. El widget
grande y oscuro se lo gana algo confirmado en la cuenta del venue.

---

## 2. El único grupo que se revisa

### QUE TODO VALLE DE BRAVO SE ENTERE

- **ID:** `4318376814943988` · 95K miembros · 90+ posts al día · público
- **Cuándo:** cada jueves, como paso nuevo entre `archivar.js` y reescribir `data.js`
- **No hace falta unirse.** Los grupos públicos se pueden buscar sin ser miembro.

**La técnica.** No se scrollea el muro — eso es croquetas, gorras y láminas. Se **busca
dentro del grupo**:

```
https://www.facebook.com/groups/4318376814943988/search/?q=<palabra>
```

En la barra lateral hay filtros: `Recent posts` (toggle) y **`Date posted`** — usar este
último para acotar a los últimos 7–10 días. También hay `Posts from` y `Tagged location`.

Y el truco del `alt` de las miniaturas — el mismo de Instagram — **también funciona en
Facebook**: el `alt` transcribe el texto del volante, así que no hay que abrir post por post.

```js
[...new Set([...document.querySelectorAll('img')].map(i=>(i.alt||'').trim())
  .filter(a=>a.length>45))].slice(0,15).map(s=>s.slice(0,260)).join('\n---\n')
```

**Palabras clave — cinco, no más.** Cada una toma ~1 min; el paso completo debe caber en
5 minutos.

`en vivo` · `este viernes` · `este sábado` · `taller` · `evento`

De estas, **`taller`, `este sábado` y `en vivo` están probadas** (ver abajo). `este
viernes` y `evento` son apuesta razonable y hay que evaluarlas después de tres o cuatro
jueves: si no dan nada, se quitan.

**Estacionales**, solo el mes que aplica: `festival` · `feria` · `regata` · `carrera` ·
`posada` · `desfile`.

### Por qué este grupo y no otro — la evidencia

Buscando `taller`:
- **Taller de Calaveras Catrinas** — 18 oct, 10:00–17:00, imparte Daniel Ramírez,
  incluye coffee break. *(Pasa el filtro: público, con fecha, hora y sede.)*
- **Taller experiencial RESET** — sáb 29 ago, meditación y respiración consciente.
  *(Categoría `bienestar`, justo lo que se cae de la lista casi cada semana.)*

Buscando `este sábado`:
- **BAR 7** — venue **nuevo, "EST. 2026"**, *"el único lugar donde se puede bailar en
  Valle de Bravo"*, con clases **gratis** de salsa y bachata. Publicó hace 4 días.
  **No estaba en `sources.md` ni existe en ninguna otra fuente.**

Tres hallazgos reales, dos inencontrables por Instagram, en un grupo que hasta ayer
teníamos marcado como callejón sin salida.

> **Truco de triage** por si algún día se reconsidera otro grupo: la pestaña `/about` de
> cualquier grupo da su actividad real — *"X new posts today · Y in the last month"*.
> Separa en dos segundos un grupo vivo de uno que solo se ve grande.

---

## 3. Descartado por decisión — no volver a evaluar

**Ningún grupo privado.** No se entra ni se solicita entrada a *Chismes Valle de Bravo*
(64K), *Vallesanos en beneficio de Valle* (2.6K), ni *EMPRENDEDORAS DE AVANDARO* (2.7K).

**Ningún otro grupo público.** Se evaluaron y quedan fuera:

- Los seis de **trueque** — `2327405104106472` (107K), `177645916334602` (93K),
  `472995043067406` (60K), `1477093823098140` (59K), `valledebravoanunciate` (45K),
  `833110798397210` (19K). Busqué `en vivo` en el de 107K: cero.
- **Ventas y empleo** — VENTAS URGENTES, Bolsa De Trabajo (76K), EMPLEOS (68K), bolsas de
  trabajo Avándaro, VALLE DE BRAVO (SOLO OFERTAS), y todos los de compra-venta de casas.
- ⚠️ **EVENTOS y PROMOCIONES EN VALLE DE BRAVO y AVANDARO** (`203849420026560`, 3.8K).
  **El nombre engaña:** croquetas, tapetes de yoga y feria de maderas. Su pestaña de
  eventos murió en ago 2025.
- ⚠️ **DE FIESTA EN VALLE DE BRAVO** (`590966117661127`, 1.5K). **El nombre engaña
  igual:** no es fiesta, son *proveedores* de fiesta — mobiliario, DJs de contratación,
  banquetes, XV años, y vacantes de chofer de Jarritos. Exactamente lo que el filtro de
  arriba está diseñado para matar.
- **Valle de Bravo Informa** (`1276288800609991`) — noticias nacionales copiadas más
  anuncios de láminas.
- **Arte, Cultura y Bienestar en Valle de Bravo** (`285206415580668`, 235). El caso más
  frustrante: su descripción es exactamente lo que buscamos y el post que vi es oro
  (*taller de poesía "Las palabras que mueven", lunes 17:00, Espacio Odisea, $100*), pero
  su `/about` dice **"No posts today · No posts in the last month"**. Dormido desde hace
  años. *(Rescatable: ese taller de los lunes puede entrar a `always` sin volver al grupo.)*
- **Lo Más Popular** (grupo), **VALLE DE BRAVO** (21K), **Valle de Bravo Noticias de
  Última Hora**, **Noticias Valle de Bravo oficial**, **Qué Pasa Avándaro**, **VALLE DE
  BRAVO PUEBLO MÁGICO**, **Está del carajo Valle de Bravo** — evaluados, sin señal que
  justifique el tiempo.

**El buscador de eventos de Facebook** (`/events/search/`) también queda fuera:
excursiones "Nevado de Toluca → Valle de Bravo" que salen de CDMX, Puebla y Reynosa.
Confirma lo que ya decía `sources.md`.

---

## 4. Venues nuevos encontrados — esto sí vale, aparte de los grupos

Lo mejor que salió del barrido no fueron eventos: fueron **lugares que no teníamos**.
Estos van a `sources.md` como Tier 2 y luego se revisan cada semana como cualquier otro.

| Lugar | Dónde | Qué es |
|---|---|---|
| **BAR 7** | `facebook.com/profile.php?id=61590322216225` · **Durango #101, piso 3** | Abrió en 2026, apenas 45 seguidores. Música en vivo, clases gratis de salsa y bachata. Lun/jue/vie 14:00–00:00, sáb y dom 13:00–01:00. Tiene liga a Instagram en su perfil. **Prioridad alta** — venue de noche nuevo, activo, y no lo tiene nadie más. |
| **Ojalá Restaurante Bar** | Fco. González Bocanegra 503 · 1.3K seguidores | *"Música en vivo, juegos de mesa"*. Categoría `musica`. |
| **Bar Don Chicho** | 5.2K seguidores | Sin verificar programación. |
| **La Aldea Avándaro** | Avándaro | Masterclasses gastronómicas — "Mejor Experiencia Gastronómica 2026". |
| **Taller de poesía · Espacio Odisea** | Parque Santa María | Lunes 17:00, $100, guía Araceli Romero. Espacio Odisea ya está en `sources.md`; este taller recurrente no. Va a `always`. |

### Páginas de medios locales (no son grupos)

Hallazgo colateral: **los medios locales de Valle solo existen en Facebook** — ninguno
tiene sitio web propio, lo verifiqué. No entran a la tarea semanal por ahora, pero quedan
anotados por si alguna vez se quiere ampliar:

`facebook.com/PopularDeValle` (260K seguidores, el medio más grande del pueblo) ·
`facebook.com/SValleDeBravo` · Vive Valle de Bravo (45K) ·
`facebook.com/ValledeBravoMx` (41K) · Enfoque Vallesano (periodismo local de verdad).

---

## 5. Fuera de Facebook

La conclusión honesta del barrido: **el ecosistema de eventos de Valle es genuinamente
Instagram/Facebook-first.** Para noche, música en vivo, mercado y bienestar **no existe
ninguna fuente web viva y semanal.** Eso es un hallazgo, no una falla de búsqueda.

### Vale la pena agregar

| Fuente | URL | Qué aporta | Cadencia |
|---|---|---|---|
| **Federación Mexicana de Vela** | `fmv.mx` | Calendario nacional de regatas 2026, vivo. Dos confirmadas en Valle: **Copa Zarco 18–19 abr 2026** (Club de Vela El Zarco) y **4ª Copa Alejandro Álvarez** (Club Náutico Avándaro). | 1×/mes |
| **Tri Tour México** | `tritour.org/calendario` | Carreras y triatlones ago 2026 → jul 2027, con filtro por estado. Confirma **Triatlón Valle de Bravo 24 oct 2026**. Agrega varios organizadores, no solo Asdeporte. | 1×/mes |
| **eticket.mx** | `eticket.mx/eventos.aspx?idciudad=141` | La **única boletera con ID de ciudad propio para Valle** — no mezcla Toluca. Hoy está vacía, pero el check cuesta cero. | cada jueves |

### Pendiente — necesito permiso de dominio

**`turismovalledebravo.gob.mx/Eventos/`** ← el pendiente de mayor valor.
Es un dominio **distinto** de `turismo.valledebravo.gob.mx` (el sitio actual, que no
tiene agenda) y tiene una página literalmente titulada "EVENTOS". **No lo pude abrir:** su
`robots.txt` cuelga y la extensión de Chrome no tiene permiso para ese dominio. Podría ser
la agenda municipal real o el sitio muerto de la administración anterior.

### ⚠️ Nunca agregar

**`fmvela.com` está secuestrado.** `fmvela.com/calendarios` hace un 302 a
`prediksicaritogel.com`, un sitio de apuestas. Aparece alto en Google como "Federación
Mexicana de Vela". La federación real es **`fmv.mx`**. (`sources.md` ya lo tenía marcado
como dominio secuestrado — queda confirmado con el destino exacto.)

### Descartado en bloque

Boleteras (Boletia, Ticketmaster MX, Passline, Fever, Arema, Boletopolis, Wetix,
Fourvenues, ticketfairy) · `cultura.edomex.gob.mx/cartelera` (reliquia de 2020, dice
"ESPERA LA PUBLICACIÓN") · `sic.cultura.gob.mx` (directorio de recintos, no calendario) ·
`zonaturistica.com` (2 eventos anuales que ya tenemos) · `todovalle.com` (último metadato:
2017) · `alas.com.mx/eventos-proximos` (archivo de 2022–2024 disfrazado de agenda) ·
`dondehayferia.com` y `feriasenmexico` (cero entradas de Valle) · `notelimites.com`
(un solo evento) · `haid.app` y `guiadehoy.com` (no verificables) ·
`mx.spartan.com` (estancado en may 2025) · **TikTok, YouTube y Google Maps** (no hay
cuentas locales con cartelera ni feed público) · todos los blogs de "qué hacer en Valle
este fin de semana" (guías evergreen sin fechas).

**Newsletters, WhatsApp o Telegram públicos de Valle: no existen en la web abierta.**

`lajornadaestadodemexico.com/tag/valle-de-bravo/` está vivo (último 30 ago 2026) pero es
cobertura noticiosa, no cartelera. Publicó el programa completo del Festival de las Almas
2025 — sirve 1 o 2 veces al año para festivales grandes, no como fuente semanal.

---

## 6. Cómo quedaría la tarea del jueves (propuesta, aún sin implementar)

Un paso nuevo **entre el paso 1 (`archivar.js`) y el 2 (reescribir `data.js`)**:

1. **Grupo de Facebook** — cinco búsquedas en `4318376814943988`, filtro `Date posted` a
   los últimos 7–10 días, leer los `alt` de las miniaturas. ~5 min.
2. **Todo lo que salga pasa por el filtro de admisión** de la sección 1. Lo que pasa y se
   puede confirmar en la cuenta del venue entra; lo que no se puede confirmar va a `soon`
   o no va. **Nada de Facebook puede ser el `lead`.**
3. **`eticket.mx?idciudad=141`** — un check de 10 segundos.
4. **`fmv.mx` y `tritour.org`** — solo el primer jueves de cada mes.

**Costo:** ~6 min extra por corrida. La tarea ya usa Chrome y ya tiene sesión de
Facebook, así que no hay infraestructura nueva.

**Riesgo principal:** los grupos son ruido con oro adentro. El filtro de la sección 1 es
lo que evita que el sitio se llene de XV años y cursos de estilismo. Si algún día hay que
elegir entre cobertura y confianza, gana la confianza.

---

## Lo único que falta de tu lado

1. **Permiso de dominio en la extensión de Chrome para `turismovalledebravo.gob.mx`**,
   para ver si su página de Eventos está viva.
2. Confirmar que **BAR 7, Ojalá, Bar Don Chicho y La Aldea Avándaro** entran a
   `sources.md` como Tier 2.
