# La escena del lago · qué hay dentro y dónde tocarla

## Peso

| | |
|---|---|
| bloque de la escena | **74.3 KB** en crudo · **26.5 KB** con gzip |
| `index.html` completo | 139 KB · **46.0 KB** con gzip |
| dibujo | 2 de día (bloques + veleros) · 2 de noche (bloques + resplandor) · hasta 4 con lluvia |
| geometría | ~18 600 instancias · ~186 000 triángulos · 0.80 MB en la GPU |
| calcomanías | 1 413 resplandores · 420 salpicaduras · 9 veleros · 3 parapentes |
| lluvia | 2 600 gotas, movidas en el vertex shader · 0 trabajo de CPU por cuadro |

## Los datos

| | |
|---|---|
| terreno | Copernicus/SRTM · mosaicos terrarium de AWS z12 |
| encuadre | 16.0 × 16.0 km · lat 19.115–19.259 · lon −100.2261 – −100.0739 |
| resolución | 112 × 112 columnas · 142 m por columna · 48 niveles · 1585–2686 m |
| lago | superficie plana a 1783 m · 840 celdas · 16.9 km² (la presa real ≈ 18.5) |
| casas | 7 810 edificios de OSM → 1 490 celdas → 2 551 cajas |
| luces | 1 462 prendidas de noche, con resplandor que se suma al apiñarse |
| calles | red principal de OSM (sin residenciales) → 1 890 celdas |
| árboles | 3 905, deducidos de la pendiente del terreno · **0 bytes** |
| orilla | 167 celdas secas que tocan el agua, de la máscara del lago · **0 bytes** |
| aguas abiertas | agua tres celdas a la redonda · de ahí salen los veleros · **0 bytes** |
| crestas | pendiente alta en la mitad oriente · de ahí salen los parapentes · **0 bytes** |
| luz del pueblo | mapa difuminado de ventanas encendidas, radio 3, dos pasadas · al cargar |

Las residenciales se dejaron fuera a propósito: a 142 m por celda sólo manchan el
pueblo de un color parejo. Los árboles no son dato: OSM tiene apenas el 7 % del
bosque de Valle mapeado, así que se calculan donde el terreno se empina, no hay
agua y no hay caserío. Sale más parejo que el dato real.

## Dónde caen los lugares

En `index.html`, arriba de `function pick`, están `ZONAS` y `LUGARES`.

Las zonas están verificadas en OpenStreetMap. **Los negocios chicos no están
mapeados en OSM**, así que por ahora apuntan a su zona, no a su puerta:

- verificados: `Centro`, `Avándaro`, `Del Salitre 104`
- apuntando a una zona: `El Cuenco`, `Fünk`, `YuYu`, `Casa Sadhana`, `Chamma Ling`

Para afinar uno, cámbialo por sus coordenadas exactas:

```js
"El Cuenco": [19.1938, -100.1322],
```

Un lugar que no esté en la lista cae al Centro. También puedes mandarlos desde
`data.js` con `window.VS.lugares = { "Lugar nuevo": [lat, lon] }`.

## Qué hace solo

- **Paleta viva.** Lee `--musgo`, `--olive`, `--khaki`, `--lima`, `--agua`, `--acc`,
  `--lift` y `--ground` en vivo. Cambia un token y el terreno cambia. Ni un color
  duplicado en el JS.
- **El sol de verdad.** Ya no hay horario fijo: la luz sale de la posición solar real
  sobre Valle (`window.VALLE_SOLAR`, ~18 líneas, aproximación NOAA). Amanecer, día,
  tarde y noche siguen al sol de la fecha de hoy, y el sol sale por el oriente del
  mapa. Si el sistema está en oscuro, es de noche igual. Para verla a cualquier hora:
  **`?noche`**, o la barra del panel del pie.
  A propósito: a la elevación del sol se le puso techo (0.80) porque a mediodía queda
  casi vertical y aplana el relieve. El diorama es una maqueta, no un simulador.
- **Luz del pueblo derramada.** De noche las ventanas encendidas iluminan el cerro, la
  calle, la orilla y el lago que tienen enfrente — no sólo su propia caja. Sale de un
  mapa de densidad difuminado que entra como atributo de cada bloque.
- **Clima.** `window.VALLE_CLIMA = {lluvia, nubes, viento}` (0–1, viento hasta 1.6)
  mueve lluvia, salpicaduras, bruma, dureza del sol y oleaje. Lo llena Open-Meteo
  desde `index.html`; si no llega, todo queda en cero y la escena se ve como siempre.
- **Veleros y parapentes sólo de día.** El shader los apaga con `uNight`: de noche no
  navega ni vuela nadie.
- **Foco al elegir día.** Al tocar un día la cámara se acerca a los lugares de ese
  día y planta un pin con ondas. Se suelta sola al llegar al fondo de la página.
- **Scroll.** La cámara gira alrededor del vaso y el diorama se apaga mientras el
  tablero toma la página — menos cuando hay foco, ahí se queda visible.
- **Respaldo.** Sin WebGL caen los anillos topográficos de siempre.
  Con `prefers-reduced-motion` se queda quieto.
- **Batería.** 30 fps con tope, en pausa cuando la pestaña no se ve, pero siempre
  dibuja el primer cuadro aunque la página arranque oculta.

## Sugerencias del público

El formulario del pie manda a Supabase, proyecto `daily-brief`, tabla
`valle_sugerencias`. La llave del HTML es **publicable a propósito**: con ella sólo
se puede insertar. No lee, no borra, no actualiza — verificado (insert 201,
select 401, delete 401). Hay un campo trampa contra bots.

Para leer lo que llegue: panel de Supabase → Table editor → `valle_sugerencias`.

```sql
select creado_en, nombre, lugar, contacto, mensaje
from valle_sugerencias where not atendida order by creado_en desc;
```

## Ajustes en vivo

Desde la consola: `VALLE_TUNE` mueve todo (`exag` relieve, `base` zócalo, `el`
altura de cámara, `dist`, `offX`/`offY`, `dim` presencia, `azScroll`).
`VALLE_PRESETS` guarda los tres encuadres; está puesto **`escenario`**.
`VALLE_STATS` reporta los conteos y `VALLE_STATS.cuadros()` los cuadros dibujados.
`VALLE_FOCO([{lat,lon,label}])` acerca la cámara a mano; `VALLE_FOCO(null)` la suelta.

`VALLE_CAM` es la cámara del panel del pie: `tomar()` / `soltar()` le quitan y le
devuelven el control a la automática; además `gira(dAz,dEl)`, `zoom(f)`,
`mueve(dx,dz)`, `reset()`, `marco(ox,oy,on)` —que recorta la escena a un
rectángulo— y `estado()`, que reporta noche, lluvia y distancia.

`VALLE_HORA_OVR = 22.5` fuerza la hora (0–24) para el sol, el color del sitio y las
ventanas; `null` vuelve al reloj. Después de cambiarlo hay que llamar `VALLE_SETT()`
para que el `data-t` del sitio se entere.

`VALLE_DORMIR` (0–1) apaga las casas una por una. Ahí vive lo que está escondido.

## Tres bichos que costaron y por qué

1. **`flat` es palabra reservada de GLSL.** Tumbaba el shader entero y la escena
   caía al respaldo sin decir nada.
2. **Precisión distinta entre shaders.** Un uniform que usan el vertex y el
   fragment tiene que declararse con la misma precisión o el programa no enlaza.
   Pasó con `uNight` y otra vez con `uY`. Por eso ahora van juntos y marcados.
3. **Las comparaciones de tipo tienen que ser rangos cerrados.** Los tipos son
   0 tierra · 1 agua · 2 árbol · 3 casa · 4 casa con luz · 5 calle. La rama de las
   casas decía `vKind > 2.5`, así que **cada calle se pintaba como casa con luz**:
   columnas color lámpara atravesando el zócalo de arriba abajo.

También: el suavizado de las transiciones va **por tiempo, no por cuadro**, para
que en un teléfono lento el amanecer tarde lo mismo.

---

## Un cuarto bicho, del 31 ago

4. **`build.js` escribe `escena.js` en `_escena/datos/`, no en `_escena/`.** Corre con
   `cwd` en `datos/`, así que ahí deja el archivo; `_escena/escena.js` es una copia que
   hay que actualizar a mano. Integré la copia vieja por no fijarme y el diorama salió
   sin ninguno de los cambios de la sesión, sin un solo error que lo delatara.
   **Antes de integrar, verifica que el bloque traiga lo que esperas**, por ejemplo
   `grep -c VALLE_CAM _escena/datos/escena.js`.

---

## Añadidos del 28 ago (tarde)

- **El lago ya no tiene puntitos.** Usaba `sin(x)*sin(z)` con un brillo `pow(w,5)`:
  eso pintaba una retícula regular de destellos. Ahora son dos ondas diagonales de
  baja frecuencia que se suman, con poca amplitud y sin destello.
- **Los pines se agrupan por coordenada.** Como varios lugares todavía apuntan a su
  zona y no a su puerta, tres etiquetas caían en el mismo punto. Ahora sale una sola
  con `+N`. La solución de fondo sigue siendo poner el punto exacto en `LUGARES`.
- **CDMX** tenía el nombre viejo, y su liga de regreso era `href="./"`. Publicado eso
  resuelve a la portada, pero abriendo el archivo desde el disco resuelve a la
  carpeta y el navegador enseña el índice de archivos. Ahora apunta a `index.html`.

### Lugares que faltan afinar

Verificados en OSM: `Centro`, `Avándaro`, `Del Salitre 104`, `El Santuario, San Gaspar`.
Todavía apuntan a su zona, no a su puerta: `El Cuenco`, `Fünk`, `YuYu`,
`Casa Sadhana`, `Chamma Ling`, `Espacio Odisea`. Se arreglan uno por uno en
`LUGARES`, cambiando el nombre de zona por `[lat, lon]`.

### Ojo con el punto 5 del bloque "LEE ESTO PRIMERO" del README

Dice que ante un push rechazado no se intente rebase, sino clonar `main` de nuevo y
publicar desde el clon limpio copiando encima `data.js`. **Eso descarta cualquier
commit que no venga de la tarea del jueves.** En esta sesión habría borrado tres.
Conviene cambiarlo por `git pull --rebase` y volver a publicar.
