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
