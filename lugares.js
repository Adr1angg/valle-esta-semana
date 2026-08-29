/* ══════════════════════════════════════════════════════════════════
   Dónde cae cada lugar en el diorama.

   La tarea del jueves agrega aquí los venues nuevos con su ubicación
   aproximada, para no volver a buscarla cada semana. Basta con que sea
   la manzana correcta: el diorama tiene 142 m por celda, así que a esa
   escala la puerta exacta y la esquina se ven igual.

   Formato:  "Nombre exacto del venue": [lat, lon]
   El nombre tiene que coincidir con el campo `venue` de data.js.
   Un lugar que no esté aquí cae al Centro.
   ══════════════════════════════════════════════════════════════════ */
window.VL = {

  /* ── verificados en OpenStreetMap ── */
  "Centro":                    [19.19367, -100.13174],
  "Avándaro":                  [19.16366, -100.12938],
  "Del Salitre 104":           [19.18971, -100.12993],
  "El Santuario, San Gaspar":  [19.23770, -100.15292],

  /* ── aproximados: caen en su zona, no en su puerta ──
     Estos negocios no están mapeados en OSM. Si alguna vez sabes el punto
     exacto, cámbialo aquí y el pin deja de caer en el Centro. */
  "El Cuenco":                 [19.19367, -100.13174],
  "Fünk":                      [19.19367, -100.13174],
  "YuYu":                      [19.19367, -100.13174],
  "Espacio Odisea":            [19.19367, -100.13174],
  "Chamma Ling":               [19.19367, -100.13174],
  "Casa Sadhana":              [19.16366, -100.12938]

};
