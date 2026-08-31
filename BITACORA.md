# Bitácora

Todo lo que le pasa a este sitio se anota aquí, con fecha y en español
llano: qué cambió, por qué, y qué se rompió en el camino. Lo más reciente
va hasta arriba.

> **Regla de la casa.** Cada vez que se toque el sitio —un cambio de
> diseño, un arreglo, una decisión sobre cómo funciona algo— se agrega una
> entrada antes de hacer push. El `git log` dice *qué* líneas cambiaron;
> esto dice *por qué*, que es lo que se olvida en tres meses.
>
> No hace falta anotar la carga semanal de eventos del jueves: esa corre
> sola y no cambia cómo funciona el sitio. Sí se anota si la tarea del
> jueves misma cambia.

---

## 2026-08-31 · Facebook entra a la tarea, con un filtro de calidad encima

Adrian: *"un montón de grupos de Facebook publican sus cosas ahí, y mucha
gente solo publica en persona. El punto de esta app es tener un lugar
centralizado para ver todo lo que pasa en el pueblo."* Se investigó a fondo
y resultó que `sources.md` estaba **medio mal** sobre Facebook.

### Lo que estaba mal, y lo que sí funciona

`sources.md` decía que Facebook era puro ruido. Es cierto para el **muro** de
los grupos —croquetas, gorras New Era, láminas— y para el buscador de
**eventos** de Facebook, que solo devuelve excursiones que salen de CDMX al
Nevado. Pero adentro de esos mismos grupos de compraventa **sí circulan
volantes de eventos reales**; simplemente no se ven scrolleando.

Lo que funciona es **buscar dentro del grupo**
(`facebook.com/groups/<id>/search/?q=<palabra>`), que además no requiere
unirse a nada. Con dos palabras clave en un solo grupo salieron tres cosas
reales, y una de ellas —**BAR 7**, un bar que abrió este año en Durango #101
piso 3, con música en vivo y clases gratis de salsa— **no existe en ninguna
otra fuente**. Ese es el argumento entero para el cambio.

También se confirmó que el truco del `alt` de las miniaturas, el que ya
usábamos para Instagram, **funciona igual en Facebook**.

### El filtro de admisión — lo más importante de este cambio

Abrir Facebook sin un filtro habría llenado el sitio de basura, porque los
grupos están llenos de **proveedores** de fiesta, no de fiestas. Adrian:
*"no quiero eventos random. Los quinceaños no valen nada. Tienen que ser
eventos públicos a los que quieran que la gente vaya."*

Quedó en tres preguntas, y la de en medio hace casi todo el trabajo:

> **¿alguien puede *ir* ese día, o es un anuncio para que le compre algo a
> alguien?**

Con eso se caen renta de sillas, DJs de contratación, banquetes, vacantes y
cursos de estilismo de una sola pasada. Encima va la barra de calidad —
*¿un desconocido tendría una razón concreta para ir?*— y la regla de que
**ante la duda, fuera**.

Dos cosas se acomodaron solas y quedaron mejor de lo esperado:

- **Lo recurrente va a `always`, no a `events`.** Las clases de salsa de
  BAR 7, el taller de poesía de los lunes en Espacio Odisea, la práctica de
  la stupa del domingo. El esquema ya tenía el lugar correcto para eso.
- **El `lead` nunca sale de un grupo de Facebook.** El widget grande se lo
  gana algo confirmado en la cuenta del venue.

### Qué se descartó, para no repetir el trabajo

- **Todos los demás grupos**, uno por uno. Los nombres engañan en las dos
  direcciones: *"EVENTOS y PROMOCIONES EN VALLE DE BRAVO"* es croquetas y
  feria de maderas, y *"DE FIESTA EN VALLE DE BRAVO"* son proveedores de XV
  años. Decisión de Adrian: no se vuelven a evaluar.
- **Ningún grupo privado.** No se entra ni se solicita entrada a ninguno.
- **`turismovalledebravo.gob.mx/Eventos/`** era el pendiente con más
  potencial: un dominio distinto del sitio de turismo actual, con una página
  literalmente titulada "EVENTOS". Se probó con WebFetch (robots.txt hace
  ConnectTimeout), con Chrome y con el navegador integrado. **Nunca carga,
  cuerpo vacío.** Muerto.
- **Bar Don Chicho** (5.2K seguidores) existe y es de Valle, pero está
  catalogado como *fast food* y solo publica memes de chelas. Sin
  programación con fecha no vale el check semanal.
- Boleteras, `cultura.edomex.gob.mx`, SIC, zonaturistica, todovalle,
  TikTok/YouTube/Google Maps y todos los blogs de "qué hacer este fin de
  semana": nada. **El ecosistema de eventos de Valle es genuinamente
  Instagram/Facebook-first**, y eso es un hallazgo, no una falla de búsqueda.

### Lo que sí se ganó fuera de Facebook

`fmv.mx` (regatas, con la Copa Zarco y la Copa Alejandro Álvarez
confirmadas en Valle) y `tritour.org` (carreras y triatlón hasta jul 2027),
ambos 1×/mes. Más `eticket.mx?idciudad=141`, la única boletera con ID de
ciudad propio para Valle — casi siempre vacía, pero el check cuesta 10
segundos.

⚠️ Y una advertencia que vale la pena repetir: **`fmvela.com` está
secuestrado** y redirige a un sitio de apuestas. La Federación Mexicana de
Vela real es `fmv.mx`.

### Qué se tocó

`sources.md` (venues nuevos, sección de Facebook, el filtro, y los
callejones sin salida ampliados), `tarea-semanal.md` (paso nuevo de barrido
y el filtro completo), `README.md` (una línea en la tabla de archivos) y
`investigacion-facebook.md`, nuevo, con toda la investigación y lo
descartado. **No se tocó `data.js`, `index.html` ni `cdmx.html`.**

**Sobre la tarea programada.** Vive en la app de escritorio, no en la nube, y
no hay API que lea ni escriba las tareas locales — solo las de la nube, y la
lista de esa cuenta está vacía. Una sesión anterior ya lo había anotado en
`tarea-semanal.md` ("la tarea en sí se edita desde la app de Claude"). Adrian
pegó el texto nuevo a mano el 31 ago 2026 y se verificó: mismo orden de
secciones, misma primera y última línea, y los diez marcadores nuevos
presentes. **Ya está en vivo**; la primera corrida con el paso de Facebook y
el filtro es el jueves 3 sep.

---

## 2026-08-31 (tarde y noche) · El mapa encuentra su lugar

Tres rondas de comentarios de Adrián sobre lo publicado a mediodía.
Cada una destapó algo real.

### El mapa: de sección, a línea, a pantalla completa

Primero le puse una **sección de ancho completo** con encabezado y
520 px de alto debajo de las notas. Él había pedido lo contrario: *"una
letra chiquita que se pique, hasta abajo"*. Lo volví un desplegable de
12.5 px — y ahí salió un bicho de verdad: **un `<details>` cerrado ya no
esconde a sus hijos con `display:none`**; Chrome les pone
`content-visibility:hidden`, que conserva el layout. `getBoundingClientRect()`
seguía devolviendo los 420 px del marco con el mapa cerrado, así que
bajar al pie le daba la cámara al panel y recortaba la escena a una caja
invisible: el diorama desaparecía.

Pero seguía mal, y él lo dijo mejor que yo: *"ahora hay dos mapas"*. El
desplegable metía un marco chiquito **debajo** del diorama que ya estaba
de fondo.

La solución no era agrandar el marco. Era darse cuenta de que **ya hay
un solo mapa**: el diorama vive fijo detrás de todo el sitio desde el
principio. Abrirlo ahora nada más le sube el `z-index` por encima de la
página, baja un velo del color del fondo, y deja los mandos flotando.
Cerrar lo baja otra vez. Se borró todo el andamio de `clip-path`
siguiendo un rect cada cuadro, y de paso el bicho del `<details>`: ya no
hay desplegable que medir. El disparador es una línea dentro del **mismo
recuadro de las fuentes**. `Esc` o la ✕ cierran y la cámara se devuelve.

### Veleros y parapentes: la forma importa más que el tamaño

*"Se ven como puntitos."* Cierto: ambos eran círculos con caída suave, y
un círculo chico es un punto.

Los veleros son ahora **vela triangular, casco y estela**, con
inclinación distinta por barco. Los parapentes, **campana, cuerdas y
piloto** — y el detalle que costó: la campana es un arco de círculo cuyo
centro tiene que quedar **por debajo** del sprite, para que las puntas
caigan y el centro suba. Con el centro arriba se ve como sonrisa, no
como ala. Además bajaron de 0.085 a 0.048 sobre el terreno: flotaban tan
alto que se veían despegados del cerro.

A 142 m por celda un velero real mediría medio pixel, así que esto son
símbolos, no modelos. Pero un símbolo *con forma de barco* se lee como
barco y un círculo no.

### "Ya es 31 y sigue en lunes 24"

Dos cosas distintas, y solo una era mía.

**La primera sí era un bug.** Todo lo de la fecha se calculaba una vez
al cargar: `HOY` se leía al arrancar y las clases `hoy` / `pas` se
horneaban en el HTML de cada tile. Una pestaña abierta desde ayer seguía
diciendo que hoy era ayer. Ahora hay un **latido cada 20 s** —colgado
del reloj que ya estaba en la barra, sin timer nuevo— que relee la
fecha; si cambió el día, remarca los tiles y el calendario del mes,
recalcula el renglón de "Ahora / En 20 min" y revisa el aviso. Si
elegiste un día a mano, ahí te quedas. Y vuelve a latir al regresar a la
pestaña, porque el navegador estrangula los timers en segundo plano.
Probado con reloj falso: 23:59:40 del viernes 28 → 160 s después, sin
recargar, el "Hoy" está en el 29.

**La segunda no era un bug, y es peor.** `data.js` trae la semana 24–30,
que terminó el domingo 30. Hoy es lunes 31, o sea que hoy no cae dentro
de la semana publicada, y el código elegía `D.days[0]`: el lunes 24. De
ahí el tile acentuado que parecía decir "hoy es 24".

Lo de fondo es la cadencia: **la semana corre lunes→domingo y la edición
sale los jueves.** Eso deja un hueco de lunes a miércoles, *todas las
semanas*, con el sitio enseñando una semana ya terminada. No fue mala
suerte; pasa cada siete días.

Primero lo parché mal: hice que en el hueco se eligiera el **último**
día de la semana publicada en vez del primero, y puse un letrero coral
explicando la situación. Adrián lo cortó en seco: *"el día que debe
salir es el 31, no el lunes de la semana pasada, aunque no tenga
nada"*. Tenía toda la razón — yo estaba escogiendo mejor dentro del
conjunto equivocado.

**Lo que se hizo de verdad:** cuando hoy no cae dentro de la semana
publicada, la tira ya no sale de `data.js`. Se **arma la semana real**
—el lunes→domingo que contiene hoy— aunque venga vacía, y el sello del
encabezado la acompaña. Hoy es hoy, con su "Hoy" y su tile
seleccionado, y los otros seis días dicen "—".

Lo publicado no se pierde: el calendario del mes deja **pinchables las
dos semanas** mientras dure el hueco, y el tablero vacío dice dónde
quedó. Además `historial.js` ya trae la semana 24–30 archivada, así que
cuando el jueves reescriba `data.js` esos eventos siguen saliendo en el
calendario.

Y el letrero coral se fue. Adrián otra vez: *"cuando esto esté
arreglado, esa tira no hace falta"*. Cierto: si la página ya enseña la
semana de verdad, no está mintiendo, y no hay nada que disculpar. El
aviso quedó **sólo como alarma de que la tarea se rompió** — aparece
pasados 10 días sin edición nueva, que es cuando algo de verdad falló.

**La causa de fondo sigue viva:** mover la tarea semanal del jueves a
la madrugada del lunes. Es tarea local del escritorio, así que la mueve
Adrián desde la app. Con la tira arreglada ya no urge, pero el hueco
sigue ahí.

### Dos que salieron de rebote

- **Dos `var MESL` en el mismo ámbito**, uno con los meses largos y otro
  con los cortos. El de abajo pisaba al de arriba, así que el encabezado
  del calendario decía *"Ago – sep 2026"* mientras el sello decía
  *"31 agosto – 6 septiembre 2026"*. Peor: `armaSemana()` usaba los
  largos al cargar y los cortos si el latido la volvía a llamar. El
  corto pasó a llamarse `MESC`.
- **`verify.js` daba FALLA por estar desactualizado, no por un bug.**
  Asumía que siempre hay tarjetas de evento, y en el hueco de lunes a
  miércoles legítimamente hay cero. Ahora acepta cero tarjetas *si* el
  tablero puso su estado vacío, y sólo falla si se queda en blanco.

### De paso

- El bloque de la escena quedó en **27.0 KB** comprimido.
- Un pendiente de higiene: una entrada de esta misma bitácora se perdió
  dos veces porque el script de parcheo buscaba un encabezado que no
  existía y el `assert` abortaba **después** de otras escrituras. Ahora
  se verifica el ancla antes de tocar nada.

---

## 2026-08-31 · La noche, el clima de verdad y el panel del pie

Adrián: *"de noche las luces se sienten como puntitos amarillos, no
tienen reflejo, y el mapa está tan oscuro que ni se ve que es un mapa.
Las casas deberían iluminar más que su propio edificio."* Tenía razón
y la causa estaba en dos números del código.

### Por qué la noche se veía así

`readPal()` multiplicaba **todo** —terreno, agua, tierra, árboles— por
**0.40**, y las calles por **0.30**. Encima, el resplandor de las
ventanas era un halo aditivo con alfa **0.019** escalado al tamaño de
la propia caja. O sea: el suelo aplastado casi a negro y una luz que
nunca salía del edificio. Puntitos amarillos sobre negro, exactamente.

Lo que se hizo, en orden de cuánto arregló:

1. **Luz que sí cae en el suelo.** Al cargar se calcula un mapa de
   densidad de ventanas encendidas, difuminado (separable, radio 3,
   dos pasadas: ~450 mil cuentas una sola vez), y entra como atributo
   de cada bloque. De noche esa luz se suma al ambiente del cerro, la
   calle y la orilla. **Éste es el cambio que arregla el problema**;
   los demás lo acompañan.
2. **Reflejo en el agua.** El lago está justo debajo del pueblo: ahora
   le devuelve luz cálida, y además el sol y la luna dejan su camino
   sobre las olas (normal perturbada + especular). Eso es lo que hace
   que se lea como agua y no como una mancha.
3. **El resplandor de verdad.** El halo de 0.019 se cambió por una
   calcomanía que mira a la cámara, una por *celda* y no por caja, con
   caída suave. Se suman al apiñarse, así que el centro florece y las
   orillas titilan.
4. **El piso de la noche** subió de 0.40 a **0.56 con sesgo azul** en
   vez de un multiplicado plano hacia el negro. La luz de la luna es
   azul; escalar hacia cero nada más mataba el mapa. Ahora se vuelve a
   leer que es un mapa.
5. Faroles sobre la red principal, unas luces en el muelle, y un
   titileo lento y distinto por casa.

Hubo que calibrarlo dos veces: la primera versión saturaba a blanco y
borraba el terreno — peor que el problema original. Las capturas de
las dos pasadas están en la conversación.

### El clima de Valle, en vivo

El sitio hace su **primera llamada externa**: Open-Meteo (sin llave,
sin atribución obligatoria, CORS abierto). Se pide 1.2 s después de
cargar y se guarda 15 min en `localStorage`, así que es una llamada
por visita. **Si falla no pasa nada**: la escena se comporta como
siempre y la barra no dice nada. Es un extra, no un requisito.

De ahí salen: la lluvia (rayas instanciadas *dentro* del diorama, con
prueba de profundidad, así que el cerro las tapa; más anillos de
salpicadura en el lago, brillo de mojado y picado en el agua), las
nubes (el sol pega menos, el ambiente sube, la bruma se acuesta en el
fondo del valle) y el viento (mece los árboles y agita el lago).
También el renglón `19° · nublado` en la barra.

**Aviso honesto:** el `current` de Open-Meteo es un modelo sobre una
rejilla de kilómetros, no una estación en el malecón. En un valle con
lago y mil metros de desnivel a veces dirá que llueve con el cielo
seco. Le atina casi siempre; no es una ventana.

### El sol de verdad

Se acabó el `h>=20 || h<5`. La noche empezaba a las 20:00 los 365 días
del año, cuando en Valle el sol se mete a las 18:10 en diciembre y a
las 20:15 en junio. Ahora hay una función de posición solar (~18
líneas, aproximación NOAA) que da azimut y elevación reales, y de ahí
cuelgan el `data-t` del sitio y la luz del diorama — misma fuente, no
se pueden contradecir. El sol también sale por el oriente del mapa,
que antes no era cierto.

Un detalle a propósito: a mediodía el sol real queda casi vertical y
aplana el relieve, así que se le puso techo a la elevación (0.80). El
diorama es una maqueta, no un simulador.

Valle está en UTC−6 todo el año: México dejó el horario de verano en
2022.

### El valle, de cerca

Hasta abajo, después de las notas, hay un panel con las riendas del
mismo diorama que vive detrás de toda la página. Cuando entra en
pantalla, la escena se recorta al marco y la cámara pasa a manos del
usuario: arrastrar gira, la rueda o el pellizco acercan, hay botones de
+ / − / reencuadre, y una **barra de horas** que mueve el sol, el color
del sitio y las ventanas del pueblo. Al salir del panel se suelta sola
y vuelve al encuadre de siempre.

Cuatro cosas que se corrigieron sobre la marcha:

- **El panel no tomaba la cámara en una pestaña de fondo.** La decisión
  de "el marco está en pantalla, dale la cámara al usuario" iba envuelta
  en un `requestAnimationFrame` como throttle, y el navegador congela
  rAF en las pestañas que no se ven: marco dibujado, botones muertos, y
  ni un error. Ahora `revisa()` va directo en el listener de scroll.
  **Es el mismo tropiezo del primer cuadro de la escena, otra vez:**
  atar lógica al bucle de dibujo se rompe en las pestañas ocultas.
  Sólo salió porque la prueba corría en una pestaña de fondo.

- `touch-action:none` dejaba el dedo atorado: el panel es lo último de
  la página, así que se pasó a `pan-y` — la página sigue bajando y nos
  quedamos con el giro horizontal y el pellizco.
- La rueda no secuestra el scroll hasta que el usuario ya tocó el
  diorama. Si no, llegar al pie de la página te dejaba haciendo zoom
  sin querer.
- Con el sistema en modo oscuro, `tod()` devolvía `night` siempre y la
  barra de horas no hacía nada. Ahora, si el usuario está manejando la
  barra, el modo oscuro deja de mandar.

**Y hay algo escondido.** No se dice en ninguna parte y no se va a
decir aquí tampoco. Pista: la barra de horas, y paciencia.

### Detalle nuevo en el mapa

Todo esto sale de los datos que ya había, sin bajar nada nuevo:

- **Orilla**: la primera fila de celdas secas que tocan el agua, en
  tono de playa. Antes la tierra chocaba con el lago en un escalón
  duro. 167 celdas, 0 bytes.
- **Veleros**: nueve, sobre aguas abiertas (celdas con agua en tres
  celdas a la redonda, para que no encallen), navegando de a poquito.
  **Sólo de día** — de noche no navega nadie.
- **Parapentes**: tres, sobre las crestas del oriente. También sólo de
  día.
- **Árboles**: tres tallas y tres verdes en vez de una sola caja del
  mismo color. El bosque dejó de verse como alfombra.
- **La torre del centro**: un bloque alto en la celda del Centro —la
  única verificada en OSM del pueblo— encendida de noche. Ancla la
  vista.
- **Bruma por altura**: se acuesta en el fondo del valle en vez de ser
  un degradado plano por profundidad.

**La cortina de la presa se quedó fuera a propósito.** Es el
monumento obvio que le falta al diorama, pero no pude verificar sus
coordenadas en esta sesión (sin salida a internet desde la máquina), y
un monumento en el lugar equivocado es peor que ninguno. Queda
pendiente y es lo primero que yo haría después.

### Lo que costó

- El bloque de la escena pasó de **17.9 KB a 26.5 KB** comprimido, y de
  **una llamada de dibujo** a **dos a cuatro** (bloques, calcomanías,
  lluvia). Es el precio de todo lo de arriba; sigue sin dependencias.
- `build.js` escribe `escena.js` **en `_escena/datos/`**, no en
  `_escena/`. Integré el archivo viejo por no fijarme y el diorama
  salió sin nada de esto. Anotado en `COMO-INTEGRAR.md`.

### Sigue pendiente

- **Siete de once lugares de `lugares.js` apuntan a la misma
  coordenada** (el Centro). El acercamiento por día cae en el mismo
  punto para casi todos los eventos y los pines se colapsan en "+3":
  una función que existe y casi no puede funcionar. Se arregla con un
  mapa y veinte minutos.
- El `.grano` encima del diorama: ya se bajó dos veces para el celular
  y sigue peleándose por los mismos píxeles. Vale la pena probar el
  sitio sin él.
- Agregar al calendario (.ics) por evento y anclas por evento.

---

## 2026-08-29 · El diorama en el celular (`8c2746c`)

Adrián: *"en el celular todavía no se ve tan bien, tiene como una capa de
algo, y el mapa está muy arriba, tapa el texto."* Tenía razón en las dos:

- El diorama subía demasiado en pantalla angosta y se encimaba con la
  línea de "Actualizado… próxima edición". Se bajó (el desplazamiento
  vertical en pantalla angosta pasó de −0.10 a −0.36).
- Había **tres capas** encimadas que lo enturbiaban, y una era un error:
  el grano encima del lienzo, la niebla, y un **oscurecimiento del 22%
  que sólo se aplicaba en móvil** — exactamente al revés de lo que
  necesita una pantalla chica. Ahora el grano baja a .07, la niebla baja
  42%, y el brillo *sube* 6% en vez de bajar.
- En escritorio no cambió nada: los tres ajustes van multiplicados por el
  factor de pantalla angosta, que vale 0 en ancho.

## 2026-08-29 · Compartir, aviso de semana vencida y memoria de lugares (`8c2746c`)

- **`og.jpg`** (1200×630, 106 KB) más sus meta tags. Antes la liga se
  compartía pelona en WhatsApp. La imagen es el mismo diorama, renderizado
  aparte con un encuadre propio. Se guardó como JPEG a calidad 86: en PNG
  pesaba 911 KB.
- **Aviso de semana vencida.** Si la tarea del jueves no corre, la página
  se quedaba mostrando la semana pasada como si fuera la de hoy, sin
  decirlo. Ahora compara la fecha de hoy contra el fin de la semana que
  muestra: hasta 7 días avisa suave, después avisa en rojo con los días
  que lleva sin actualizarse.
- **`lugares.js`.** Las coordenadas de los venues quedan guardadas en el
  proyecto para que la tarea del jueves no las vuelva a buscar cada
  semana. Diez lugares; cuatro verificados contra OSM y seis a nivel de
  colonia, marcados como aproximados. Precedencia: lo que traiga
  `data.js` de esta semana gana sobre lo guardado, y lo guardado sobre
  las zonas por defecto.

## 2026-08-29 · Diorama más grande, Siempre plegable, calendario con memoria (`2742879`, `fc21d05`)

- El mapa creció **30% en móvil y 20% en escritorio**.
- **"Siempre"** pasó de ser 18 tarjetas siempre abiertas a un acordeón con
  un chip de "Ver los 18 / Ocultar". La liga `#siempre` lo abre sola.
- **El calendario mensual perdía los eventos.** `data.js` se reescribe
  completo cada jueves, así que las semanas pasadas salían vacías. Se
  agregó `historial.js`, que sólo crece, y `archivar.js`, que lo alimenta
  antes de sobrescribir `data.js`. Guarda 430 días y es idempotente.
- Se guardó el prompt de la tarea del jueves en `tarea-semanal.md`, para
  que viva en el repo y no sólo dentro de la tarea programada.

## 2026-08-28 · El lago sin puntitos y los pines (`4de8379`, `35024cc`)

- Adrián: *"esos puntitos en el lago no me encantan."* Eran un especular
  hecho con `sin(x)·sin(z)` elevado a la quinta, que producía una retícula
  de lunares. Se cambió por dos olas diagonales sumadas.
- Los pines de GPS se encimaban cuando dos eventos caían cerca.
- Notas sobre la página de CDMX y el punto 5 del README.

## 2026-08-28 · Calles, foco por día, formulario y noche automática (`e9d1a81`, `88b0cc5`)

- **Calles** de OpenStreetMap sobre el terreno.
- **Foco por día**: al picar un día la cámara se acerca al lugar del
  evento y aparece un pin con ondas.
- **Formulario público** para que un negocio pida entrar, junto a los
  botones de WhatsApp y copiar liga. Guarda en Supabase con una llave
  publicable que **sólo puede insertar** (verificado: insert 201,
  select 401, delete 401).
- **Noche automática**: modo oscuro del sistema → noche; y si de plano ya
  es de noche en el reloj (20:00–05:00), noche aunque tengan modo claro.
  `?noche` la fuerza para probar.
- Widgets de evento más translúcidos, con animación al pasar encima.
- El título pasó a ser **"Esta semana en Valle"**, también en la página
  de CDMX.

## 2026-08-28 · El diorama de vóxeles (`345fa93`, `9c218d7`)

Nace el mapa 3D: el vaso de la presa como un diorama de cubos, con
terreno real, casas reales de OSM, árboles, y ventanas encendidas de
noche. Gira con el scroll y la luz sigue la hora del día.

Escrito a mano contra WebGL 1, sin librerías, porque el README pide cero
dependencias y three.js pesa cuatro veces el sitio entero. Todo el
diorama son **17.9 KB comprimidos** y **una sola llamada de dibujo** de
día. Los datos y cómo se rearman están en `_escena/DATOS-GEOGRAFICOS.md`.

Tres cosas que costaron encontrar, anotadas para no repetirlas:

1. **`flat` es palabra reservada de GLSL.** El shader fallaba en silencio
   y la escena caía al plan B de anillos. Se renombró a `plano`.
2. **Precisión de uniforms.** Un uniform compartido entre los dos shaders
   declarado con precisiones distintas no enlaza. Van todos `mediump`.
3. **La página arrancaba en blanco** si cargaba en una pestaña oculta: el
   bucle se saltaba el dibujo cuando `document.hidden`. Se fuerza un
   primer cuadro síncrono, y hay prueba de regresión.

## 2026-08-28 · Orden de la carpeta (`affdaea`, `6bce6f1`)

El sitio vive en la raíz (`index.html`, `cdmx.html`, `data.js`), lo viejo
se fue a `_archivo/`, y el taller del diorama a `_escena/`.

## 2026-08-28 · Barrido amplio de Valle (`6c40581`)

Más fuentes de eventos, cine en Odisea, y los 18 permanentes de
"Siempre".

## 2026-08-27 · Verde Lago, v4 y v5 (`716c7b8`, `10286ea`, `2ba4aca`, `3374d1d`)

Paleta tonal verde-lago, tablero de widgets por día, calendario de tres
semanas, y la escena abstracta del lago que después se volvió el diorama.
Antes de eso se probaron tres direcciones de diseño —Cabina, Papel,
Estación— y una página de CDMX aparte.

## 2026-08-27 · Rediseño y arranque (`0757f73`, `4d11600`)

Fuera los filtros; los días como títulos, un solo color de acento, vista
de semana y sello de última actualización. Antes de eso, el sitio
original.
