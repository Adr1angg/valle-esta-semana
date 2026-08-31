# Los datos geográficos del diorama

Todo lo que hace falta para reconstruir el mapa 3D de Valle está en
`_escena/datos/`. Nada de esto se descarga en vivo: el sitio no llama a
ningún servicio de mapas. Los datos se bajaron una vez, se codificaron, y
viven aquí como texto plano. Si mañana Overpass se cae o AWS cambia de
URL, el diorama sigue igual.

Este archivo explica **de dónde salió cada cosa**, **cómo está guardada**
y **cómo se vuelve a armar**.

---

## El encuadre

Todo el diorama vive dentro de una caja fija. Estas cuatro cifras son la
raíz de todo lo demás:

| | |
|---|---|
| Latitud | **19.115 … 19.259** |
| Longitud | **−100.2261 … −100.0739** |
| Tamaño real | **16.0 × 16.0 km** |
| Rejilla | **112 × 112 celdas** = 12 544 columnas |
| Resolución | **142 m por celda** |

El encuadre está centrado en el vaso de la presa. Entra el pueblo, la
cortina, Avándaro, San Gaspar y el borde del cerro; se queda fuera la
carretera a Toluca más allá del kilómetro 8.

Cualquier coordenada del mundo real se convierte a celda así:

```
col = (lon − (−100.2261)) / (−100.0739 − (−100.2261)) × 112
ren = (19.259 − lat)      / (19.259 − 19.115)         × 112
```

(La fila se cuenta de norte a sur: renglón 0 es el borde de arriba.)
Esa es exactamente la cuenta que usa el sitio para poner el pin de GPS
cuando le picas a un día — está en `index.html`, en la función que lee
`LUGARES`.

---

## 1 · El terreno — `datos/terrain.js`

**De dónde salió:** modelo de elevación **Copernicus / SRTM**, servido
como *terrarium tiles* desde el bucket público de AWS:

```
https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png
```

Se bajaron las teselas de zoom 12 que cubren el encuadre. En ese formato
la altura viene escondida en el color de cada pixel, y se saca así:

```
metros = (R × 256 + G + B / 256) − 32768
```

**Qué contiene el archivo:**

`H` — la cadena de alturas. 12 544 caracteres, uno por columna, en orden
de lectura (izquierda a derecha, arriba a abajo). Cada carácter es un
nivel de 0 a 47 dentro del alfabeto:

```
0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklm
```

Con 48 niveles repartidos entre **1585.4 m** y **2685.8 m**, cada escalón
son unos **23 m** de altura real. Por eso el terreno se ve escalonado: no
es un efecto, es la cuantización. La superficie del lago está a 1783 m,
que cae en el **nivel 8**.

Para volver un carácter a metros:

```
metros = 1585.4 + (indice / 47) × (2685.8 − 1585.4)
```

`WRLE` — la máscara del lago, comprimida por *run-length*: una lista de
números separados por comas que alternan **tierra, agua, tierra, agua…**
empezando por tierra. Los 119 tramos suman las 12 544 celdas, de las
cuales **840 son agua**. Así el contorno del vaso cabe en 350 bytes en
lugar de 12 KB.

## 2 · Las casas — `datos/casas.js`

**De dónde salió:** **OpenStreetMap**, vía la API de Overpass, pidiendo
todo lo que tuviera etiqueta `building` dentro del encuadre. Salieron
**7 810 edificios reales**. No son inventados ni repartidos al azar: cada
cubito de casa está donde OSM dice que hay una construcción.

Los 7 810 edificios se agruparon por celda de 142 m y se contaron. Como a
esa escala una celda con 40 casas y otra con 3 se verían igual, la cuenta
se aplastó a tres densidades:

| terminador | densidad | cajas dibujadas |
|---|---|---|
| `A` | pocas | 1 |
| `B` | medias | 2 |
| `C` | muchas | 3 |

**Qué contiene:** `CASAS`, una lista dispersa. Cada entrada es el salto
en base36 desde la celda anterior, seguido del terminador de densidad.
Ejemplo: `lmA` = avanza 794 celdas, densidad 1. En total **1 490 celdas
con casas** y **2 582 cajas** dibujadas.

Son las mismas cajas que se prenden de noche: el sitio elige un
subconjunto de ellas como ventanas iluminadas.

## 3 · Las calles — `datos/calles.js`

**De dónde salió:** también OpenStreetMap por Overpass, pidiendo las vías
con `highway` en:

```
motorway · trunk · primary · secondary · tertiary · unclassified
```

Las `residential` se dejaron fuera a propósito: a 142 m por celda no se
distinguen y sólo manchaban el pueblo de gris.

**Qué contiene:** `CALLES`, la misma codificación dispersa pero con un
solo terminador, `Z`, porque una celda o tiene calle o no. **1 890
celdas** con calle.

## 4 · Los lugares — `lugares.js` (en la raíz)

Las coordenadas de los venues donde caen los eventos. Vive en la raíz
porque la tarea del jueves lo lee y lo escribe; está documentado en el
README. Cuatro de las diez entradas están verificadas contra OSM, las
demás son a nivel de colonia y están marcadas como tales.

## 5 · La rejilla cruda — `datos/grid.json`

El paso intermedio, antes de codificar: los niveles y la máscara de agua
como JSON normal. No lo usa nada en producción. Está aquí para poder
verificar la codificación sin volver a bajar teselas, y por si algún día
quieres regenerar todo con otro alfabeto o más niveles.

---

## Cómo se vuelve a armar

`datos/scene.js` es el renderizador: el WebGL escrito a mano, los
shaders, la cámara, la luz por hora del día, el foco por evento. Trae
cuatro huecos — `__H__`, `__WRLE__`, `__CASAS__`, `__CALLES__` — que
`build.js` rellena con los datos de arriba.

```bash
cd _escena/datos
node build.js
```

Salen dos archivos:

- **`escena.js`** — el bloque que va dentro de `<script>` en `index.html`.
  47 790 caracteres, ~17.9 KB comprimido.
- **`demo.html`** — la misma escena con un panel de perillas para mover
  cámara, exageración vertical, niebla y hora. Sirve para probar sin
  tocar el sitio.

`build.js` truena si queda algún hueco sin rellenar, así que no hay forma
de publicar una escena a medias por accidente.

Para meterlo al sitio: el contenido de `escena.js` reemplaza el bloque
`<script>` de `index.html` que termina en `window.VALLE_STATS`. Los
detalles y los tropiezos conocidos están en `COMO-INTEGRAR.md`.

---

## Por qué está codificado así

El README del proyecto pide **cero dependencias externas**. three.js pesa
unos 150 KB — cuatro veces el sitio entero. Así que el renderizador está
escrito a mano contra WebGL 1, y los datos tenían que caber en algo
parecido a un archivo de texto.

Los números finales: el terreno en 12.5 KB, el lago en 350 bytes, las
casas en 3.3 KB, las calles en 4.2 KB. Todo el diorama —datos, shaders y
lógica— pesa **17.9 KB comprimido**. Se dibuja en **una sola llamada** de
día y dos de noche (la segunda es el brillo de las ventanas), usando
`ANGLE_instanced_arrays`.

## Si algún día hay que rehacerlo

El encuadre, la rejilla y los rangos de altura son decisiones, no
verdades. Si quieres más detalle en el pueblo, lo que se mueve es `G`
(la rejilla) y el encuadre; todo lo demás se recalcula solo. Ojo con dos
cosas que ya nos mordieron:

1. `H` tiene que medir **exactamente G × G** caracteres. Un carácter de
   más o de menos y el terreno se recorre en diagonal. Si eso pasa,
   compara `grid.json` contra `H` por bloques para encontrar dónde.
2. En los shaders, `flat` es palabra reservada de GLSL y `plano` no. Y
   los uniforms compartidos entre los dos shaders tienen que declararse
   con la **misma precisión** (`mediump`) en ambos, o el programa no
   enlaza y la escena se cae sin decir nada.
