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

Tres cosas que se corrigieron sobre la marcha:

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
