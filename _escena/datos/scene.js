/* ══════════════════════════════════════════════════════════════════
   Esta semana en Valle · escena 3D — diorama de vóxeles del lago
   WebGL a mano. Sin dependencias.

   Terreno   Copernicus/SRTM · mosaicos terrarium AWS z12
             112 × 112 celdas · 142 m/celda · 1585–2686 m · lago a 1783 m
   Casas     7 810 edificios reales de OpenStreetMap, agregados por celda
   Calles    la red principal de OSM (sin las residenciales)
   Árboles   se derivan de la pendiente del propio terreno · 0 bytes
   Orilla    se deriva de la máscara del lago · 0 bytes
   Barcos    sobre aguas abiertas, sólo de día · se derivan · 0 bytes
   Parapente sobre las crestas del oriente, sólo de día · 0 bytes

   La luz sigue la posición real del sol sobre Valle (19.195 N,
   100.132 O), no un horario fijo. El clima —lluvia, nubes, viento—
   entra por window.VALLE_CLIMA si el sitio lo trae; si no llega, la
   escena se comporta igual que siempre.
   ══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var ALPHA = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklm';
  var D36 = '0123456789abcdefghijklmnopqrstuvwxyz', TERM = 'ABC';
  var G = 112, LEV = 48;
  var H = '__H__';
  var WRLE = '__WRLE__';
  var CASAS = '__CASAS__';
  var CALLES = '__CALLES__';
  var LAT0 = 19.115, LAT1 = 19.259, LON0 = -100.2261, LON1 = -100.0739;
  var host = document.getElementById('escena3d');
  if (!host) return;

  /* ── el sol de verdad ─────────────────────────────────────────
     Posición solar aparente para Valle. Devuelve el vector unitario
     que apunta al sol en coordenadas de la escena: x = oriente,
     y = arriba, z = sur (el renglón 0 de la rejilla es el norte).
     El sitio define la misma función en window.VALLE_SOLAR para que
     la paleta CSS y el diorama nunca se contradigan; aquí va la copia
     que usa la maqueta suelta.                                       */
  var SOLAR = window.VALLE_SOLAR || function (fecha) {
    var RAD = Math.PI / 180, lat = 19.1953 * RAD, lon = -100.1317;
    var d = (fecha.getTime() - Date.UTC(2000, 0, 1, 12, 0, 0)) / 86400000;
    var g = (357.529 + 0.98560028 * d) * RAD;
    var q = (280.459 + 0.98564736 * d) * RAD;
    var L = q + (1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * RAD;
    var e = (23.439 - 0.00000036 * d) * RAD;
    var dec = Math.asin(Math.sin(e) * Math.sin(L));
    var ra = Math.atan2(Math.cos(e) * Math.sin(L), Math.cos(L));
    var gmst = (18.697374558 + 24.06570982441908 * d) % 24;
    if (gmst < 0) gmst += 24;
    var ha = (gmst * 15 + lon) * RAD - ra;
    var E = -Math.cos(dec) * Math.sin(ha);
    var Nn = Math.sin(dec) * Math.cos(lat) - Math.cos(dec) * Math.cos(ha) * Math.sin(lat);
    var U = Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(ha) * Math.cos(lat);
    var l = Math.hypot(E, Nn, U) || 1;
    return { x: E / l, y: U / l, z: -Nn / l, alt: U / l };
  };

  /* ── decodificar ─────────────────────────────────────────────── */
  var hv = new Uint8Array(G * G), wv = new Uint8Array(G * G), cv2 = new Uint8Array(G * G);
  for (var k = 0; k < G * G; k++) hv[k] = ALPHA.indexOf(H.charAt(k));
  (function () {
    var runs = WRLE.split(','), p = 0, on = 0;
    for (var i = 0; i < runs.length; i++) {
      var r = +runs[i];
      if (on) for (var q = p; q < p + r; q++) wv[q] = 1;
      p += r; on ^= 1;
    }
  })();
  (function () {                                   /* casas · lista dispersa */
    var idx = -1, acc = 0;
    for (var i = 0; i < CASAS.length; i++) {
      var ch = CASAS.charAt(i), t = TERM.indexOf(ch);
      if (t < 0) acc = acc * 36 + D36.indexOf(ch);
      else { idx += acc + 1; if (idx < G * G) cv2[idx] = t + 1; acc = 0; }
    }
  })();

  var rd = new Uint8Array(G * G);
  (function () {                                   /* calles · lista dispersa */
    var idx = -1, acc = 0;
    for (var i = 0; i < CALLES.length; i++) {
      var ch = CALLES.charAt(i);
      if (ch === 'Z') { idx += acc + 1; if (idx < G * G) rd[idx] = 1; acc = 0; }
      else acc = acc * 36 + D36.indexOf(ch);
    }
  })();

  /* ── oclusión ambiental y pendiente ──────────────────────────── */
  var ao = new Float32Array(G * G), slope = new Float32Array(G * G);
  for (var j = 0; j < G; j++) for (var i = 0; i < G; i++) {
    var h = hv[j * G + i], s = 0, n = 0, mx = 0;
    for (var b = -2; b <= 2; b++) for (var a = -2; a <= 2; a++) {
      var x = i + a, y = j + b;
      if (x < 0 || y < 0 || x >= G || y >= G) continue;
      var d = hv[y * G + x] - h;
      s += Math.max(0, d); n++;
      if (Math.abs(a) + Math.abs(b) === 1) mx = Math.max(mx, Math.abs(d));
    }
    ao[j * G + i] = Math.max(0, 1 - (s / n) / 5.5);
    slope[j * G + i] = mx;
  }

  /* ── orilla · tierra que toca el agua ────────────────────────
     Antes la tierra chocaba con el lago en un escalón duro. Marcar
     la primera fila de celdas secas basta para que el borde se lea
     como playa. Sale de la misma máscara del lago: 0 bytes.        */
  var orilla = new Uint8Array(G * G);
  for (var j2 = 0; j2 < G; j2++) for (var i2 = 0; i2 < G; i2++) {
    var kk2 = j2 * G + i2;
    if (wv[kk2]) continue;
    if ((i2 > 0 && wv[kk2 - 1]) || (i2 < G - 1 && wv[kk2 + 1]) ||
        (j2 > 0 && wv[kk2 - G]) || (j2 < G - 1 && wv[kk2 + G])) orilla[kk2] = 1;
  }

  /* ── aguas abiertas · dónde puede navegar un velero sin encallar ── */
  var abierta = [];
  for (var j3 = 3; j3 < G - 3; j3++) for (var i3 = 3; i3 < G - 3; i3++) {
    var libre = 1;
    for (var b3 = -3; b3 <= 3 && libre; b3++) for (var a3 = -3; a3 <= 3; a3++)
      if (!wv[(j3 + b3) * G + i3 + a3]) { libre = 0; break; }
    if (libre) abierta.push(j3 * G + i3);
  }

  /* ── crestas del oriente · de donde se tira el parapente ─────── */
  var crestas = [];
  for (var j4 = 6; j4 < G - 6; j4++) for (var i4 = Math.floor(G * 0.52); i4 < G - 6; i4++) {
    var kk4 = j4 * G + i4;
    if (hv[kk4] > 20 && slope[kk4] > 2.2) crestas.push(kk4);
  }

  /* ── contexto ────────────────────────────────────────────────── */
  var cnv = document.createElement('canvas');
  cnv.className = 'lienzo';
  host.appendChild(cnv);
  var opt = { antialias: true, alpha: true, premultipliedAlpha: false, depth: true };
  var gl = cnv.getContext('webgl', opt) || cnv.getContext('experimental-webgl', opt);
  var ext = gl && gl.getExtension('ANGLE_instanced_arrays');
  if (!gl || !ext) { host.classList.add('sin-webgl'); return; }
  host.classList.add('con-webgl');

  /* ── paleta viva: lee las variables del sitio (oklch → sRGB) ─── */
  var probe = document.createElement('canvas'); probe.width = probe.height = 1;
  var p2 = probe.getContext('2d', { willReadFrequently: true });
  var swatch = document.createElement('span');
  swatch.style.cssText = 'position:absolute;width:0;height:0;opacity:0;pointer-events:none';
  document.body.appendChild(swatch);
  function css(v, fb) {
    try {
      swatch.style.color = 'var(' + v + ')';
      var c = getComputedStyle(swatch).color;
      p2.fillStyle = '#000'; p2.fillRect(0, 0, 1, 1);
      p2.fillStyle = c; p2.fillRect(0, 0, 1, 1);
      var d = p2.getImageData(0, 0, 1, 1).data;
      if (!d[0] && !d[1] && !d[2] && c.indexOf('0, 0, 0') < 0) throw 0;
      return [d[0] / 255, d[1] / 255, d[2] / 255];
    } catch (e) { return fb; }
  }
  function mixc(a, b, t) { return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t]; }
  function scl(a, s) { return [a[0]*s, a[1]*s, a[2]*s]; }

  /* ── shaders · los bloques ───────────────────────────────────── */
  var VS = [
    'attribute vec3 aPos, aNrm; attribute vec4 aInst, aEx; attribute vec2 aEx2;',
    'uniform mat4 uVP; uniform vec2 uOff; uniform float uG, uBase;',
    /* uY, uNight, uT y uWind los usan los dos shaders: si la precision no
       coincide entre vertex y fragment, el programa no enlaza. */
    'uniform mediump float uY, uNight, uT, uWind;',
    'varying vec3 vN, vW, vA, vB;',
    'void main(){',
    '  float cell = 2.0/uG;',
    '  float kind = floor(aInst.w * 0.5);',
    '  float lit = step(3.5, kind) * step(kind, 4.5);',
    '  float grow = 1.0 + uNight * 0.42 * lit;',
    '  float w = aEx.z * grow, hh = aEx.w * (1.0 + uNight * 0.30 * lit);',
    '  float cx = aInst.x + 0.5 + aEx.x;',
    '  float cz = aInst.y + 0.5 + aEx.y;',
    /* los arboles se mecen con el viento · nada de esto cuesta CPU */
    '  float arb = step(1.5, kind) * step(kind, 2.5);',
    '  float mece = arb * aPos.y * uWind * 0.011 * sin(uT*1.5 + aEx2.y*39.0);',
    '  float x = -1.0 + (cx + (aPos.x-0.5)*w) * cell + mece;',
    '  float z = -1.0 + (cz + (aPos.z-0.5)*w) * cell + mece*0.55;',
    '  float top = aInst.z*uY;',
    /* 2 arbol · 3-4 casa · 7 torre se paran encima del terreno */
    '  float prop = step(1.5, kind) * step(kind, 4.5) + step(6.5, kind);',
    '  float y0 = mix(-uBase, top, prop);',
    '  float y1 = mix(top, top + hh, prop);',
    '  float y = mix(y0, y1, aPos.y);',
    '  vN = aNrm; vW = vec3(x,y,z);',
    '  vA = vec3(aInst.z, kind, aInst.w - kind*2.0);',
    '  vB = vec3(aPos.y, aEx2.x, aEx2.y);',
    '  vec4 cp = uVP * vec4(x,y,z,1.0);',
    '  cp.xy += uOff * cp.w;',
    '  gl_Position = cp;',
    '}'
  ].join('\n');

  var FS = [
    'precision mediump float;',
    'varying vec3 vN, vW, vA, vB;',
    'uniform vec3 uSun, uWarm, uSky, uBounce, uGround, uLuz, uEye;',
    'uniform vec3 cLow, cMid, cHigh, cWater, cSoil, cTree, cCasa, cLampa, cCalle, cOrilla;',
    'uniform float uFog, uBands, uDim, uAmb, uCloud, uRain, uDormir;',
    'uniform mediump float uY, uNight, uT, uWind;',
    'void main(){',
    '  float vH = vA.x, vKind = vA.y, vAO = vA.z;',
    '  float vLocal = vB.x, vTown = vB.y, vRnd = vB.z;',
    '  vec3 n = normalize(vN);',
    '  float lam = max(dot(n, uSun), 0.0);',
    '  bool topFace = n.y > 0.5;',
    '  vec3 vd = normalize(uEye - vW);',
    '  vec3 base = cMid, emis = vec3(0.0);',
    '  float plano = 0.0, brillo = 0.0, moja = 0.0;',
    /* Orden importa: los tipos son 0 tierra · 1 agua · 2 arbol · 3 casa ·
       4 casa con luz · 5 calle · 6 orilla · 7 torre. Las comparaciones
       tienen que ser rangos cerrados, si no un tipo se cuela por la rama
       de otro (ya paso: la calle se pintaba como casa con luz). */
    '  if (vW.y < -0.004) {',                                  /* zocalo · tierra cortada */
    '    float d = clamp(-vW.y*2.6, 0.0, 1.0);',
    '    base = mix(cSoil, cSoil*0.52, d);',
    '    float st = fract(vW.y*9.0);',
    '    base *= 1.0 - 0.16*smoothstep(0.0,0.09,st)*smoothstep(0.24,0.11,st);',
    '  } else if (vKind > 2.5 && vKind < 4.5) {',               /* casas */
    '    base = cCasa;',
    '    if (!topFace) base *= 0.86;',
    '    moja = 1.0;',
    '    if (vKind > 3.5) {',
    /* parpadeo lento y distinto por casa · viva, no navidena */
    '      float tit = 0.90 + 0.10*sin(uT*0.55 + vRnd*61.0) + 0.05*sin(uT*0.21 + vRnd*23.0);',
    '      float on = uNight * tit * step(vRnd, 1.0 - uDormir);',
    '      base = mix(base, cLampa, on * 0.95);',
    '      emis = cLampa * on * (topFace ? 0.80 : 1.30);',
    '      plano = uNight;',
    '    }',
    '  } else if (vKind > 6.5) {',                              /* torre del centro */
    '    base = mix(cCasa, cOrilla, 0.30);',
    '    if (!topFace) base *= 0.90;',
    '    emis = cLampa * uNight * 0.55;',
    '    plano = uNight * 0.5;',
    '    moja = 1.0;',
    '  } else if (vKind > 1.5 && vKind < 2.5) {',               /* arboles */
    /* tres verdes distintos y un tamano distinto por arbol: antes todos
       eran la misma caja del mismo color y se notaba */
    '    vec3 verde = mix(cTree, mix(cTree*1.22, cHigh, 0.16), fract(vRnd*7.3));',
    '    base = mix(verde, verde*0.70, 1.0 - vLocal);',
    '    if (!topFace) base *= 0.88;',
    '  } else if (vKind > 0.5 && vKind < 1.5 && topFace) {',    /* agua */
    /* Dos ondas diagonales de baja frecuencia que se suman. Antes era
       sin(x)*sin(z) con un brillo pow(w,5): eso hacia una reticula de
       puntitos sobre el lago. Con lluvia se le suma un picado fino. */
    '    float w1 = sin(vW.x*11.0 + vW.z*7.5 + uT*(0.30+uWind*0.05))',
    '            + sin(vW.x*6.0 - vW.z*9.5 - uT*(0.19+uWind*0.04));',
    '    float pic = sin(vW.x*74.0 + uT*7.3) * sin(vW.z*68.0 - uT*6.1);',
    '    base = cWater * (1.0 + 0.028*w1 - 0.06*uCloud);',
    /* normal perturbada -> el sol y la luna dejan su camino sobre el agua */
    '    vec3 wn = normalize(vec3(0.030*w1 + 0.075*pic*uWind*0.2, 1.0, 0.026*w1 - 0.070*pic*uWind*0.2));',
    '    brillo = pow(max(dot(wn, normalize(vd + uSun)), 0.0), 88.0 - 46.0*uWind*0.25);',
    '    brillo *= 0.5 + 0.85*uNight;',
    /* el pueblo se refleja en el agua que tiene enfrente */
    '    emis += uLuz * vTown * uNight * 0.50;',
    '  } else if (vKind > 4.5 && vKind < 5.5 && topFace) {',    /* calle */
    '    base = cCalle;',
    '    emis += uLuz * vTown * uNight * 0.13;',
    '    moja = 1.0;',
    '  } else if (vKind > 5.5 && vKind < 6.5 && topFace) {',    /* orilla */
    '    base = mix(cOrilla, cLow, 0.22);',
    '    moja = 0.7;',
    '  } else {',                                              /* terreno */
    '    float t = clamp(vH*1.10, 0.0, 1.0);',
    '    base = t < 0.46 ? mix(cLow, cMid, t/0.46) : mix(cMid, cHigh, (t-0.46)/0.54);',
    '    moja = 0.55;',
    '    if (!topFace) {',
    '      float ty = clamp(vW.y / max(uY, 0.0001), 0.0, 1.0);',
    '      vec3 lado = ty < 0.46 ? mix(cLow, cMid, ty/0.46) : mix(cMid, cHigh, (ty-0.46)/0.54);',
    '      base = mix(cSoil*0.86, lado, clamp(vW.y*7.0, 0.0, 1.0));',
    '      float s = fract(vW.y*uBands);',
    '      base *= 1.0 - 0.18*smoothstep(0.0,0.07,s)*smoothstep(0.20,0.09,s);',
    '      base *= 0.80;',
    '      moja = 0.0;',
    '    }',
    '  }',
    /* ── la luz del pueblo derramada sobre lo que tiene alrededor ──
       Esto es lo que faltaba de noche: antes cada casa iluminaba
       nada mas su propia caja y el pueblo se leia como puntitos
       amarillos sobre negro. vTown es la densidad de ventanas
       encendidas, difuminada; aqui se convierte en luz que si cae
       sobre el cerro, la calle y la orilla. */
    '  float hemi = n.y*0.5 + 0.5;',
    '  vec3 pueblo = uLuz * vTown * uNight * (1.0 - uDormir);',
    '  vec3 amb = mix(uBounce, uSky, hemi) * uAmb + pueblo * (0.38 + 0.26*hemi);',
    '  float occ = mix(0.58, 1.0, vAO);',
    '  occ = mix(1.0, occ, clamp(vW.y*9.0, 0.0, 1.0));',
    /* con nubes el sol pega menos y el cielo pega mas */
    '  vec3 lit = base * (amb*occ + uWarm*lam*1.38*(1.0 - uCloud*0.70));',
    '  vec3 col = mix(lit, base, plano) + emis;',
    /* mojado: lo que llueve encima brilla y se oscurece un poco */
    '  col *= 1.0 - 0.16*uRain*moja;',
    '  col += uWarm * brillo * (0.75 + 0.5*uRain*moja) * (1.0 - uCloud*0.5);',
    '  col += uWarm * pow(lam, 26.0) * 0.09 * (1.0 - uNight) * (1.0 - uCloud);',
    /* ── bruma · la de siempre por profundidad, mas la que se acuesta
       en el fondo del valle. Con lluvia sube; de noche se contiene
       para no borrar el pueblo. */
    '  float fog = clamp((vW.z*0.5 + 0.5) * uFog, 0.0, 0.7);',
    '  float bruma = clamp((0.26 - vW.y) * 2.1, 0.0, 1.0);',
    '  fog += bruma * uFog * (0.30 + 0.55*uRain + 0.25*uCloud) * (1.0 - uNight*0.62);',
    '  fog = min(fog, 0.82);',
    '  col = mix(col, uGround, fog * (1.0 - plano*0.7));',
    '  col = mix(uGround, col, mix(uDim, 1.0, plano*0.55));',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n');

  /* ── shaders · las calcomanías ────────────────────────────────
     Un solo programa para cuatro cosas que siempre miran a la
     cámara: el resplandor de las ventanas (0), la salpicadura de
     la lluvia en el lago (1), los veleros (2) y los parapentes (3).
     Los que se mueven —veleros y parapentes— se mueven en el
     vertex shader a partir de su semilla, así que el buffer nunca
     se vuelve a subir y no cuestan CPU.                            */
  var VS_C = [
    'attribute vec2 aQ; attribute vec4 aS, aS2;',
    'uniform mat4 uVP; uniform vec2 uOff; uniform vec3 uRight, uUp;',
    'uniform mediump float uT, uNight, uRain, uDim, uY, uDormir;',
    'varying vec2 vQ; varying vec3 vI;',
    'void main(){',
    '  float tipo = aS.w, sem = aS2.y, tam = aS2.x, inten = aS2.z, rad = aS2.w;',
    /* cada tipo se levanta lo suyo sobre el terreno; uY es la misma
       exageracion vertical que usan los bloques, asi que mover
       VALLE_TUNE.exag no descuadra las calcomanias */
    '  float off = tipo < 0.5 ? 0.012 : (tipo < 1.5 ? 0.004 : (tipo < 2.5 ? 0.006 : 0.085));',
    '  vec3 c = vec3(aS.x, aS.y*uY + off, aS.z);',
    '  float esc = 1.0;',
    '  if (tipo < 0.5) {',                                  /* resplandor de ventanas */
    '    float tit = 0.86 + 0.14*sin(uT*0.55 + sem*61.0) + 0.06*sin(uT*0.23 + sem*17.0);',
    '    float vive = max(step(sem, 1.0 - uDormir), step(sem, 0.0001));',
'    inten *= uNight * tit * vive; esc = 0.94 + 0.12*tit;',
    '  } else if (tipo < 1.5) {',                           /* salpicadura en el lago */
    '    float ph = fract(uT*1.45 + sem);',
    '    esc = 0.22 + ph*1.70;',
    '    inten *= uRain * (1.0-ph) * (1.0-ph);',
    '  } else if (tipo < 2.5) {',                           /* velero · sólo de día */
    '    float ang = uT*0.045 + sem*6.283;',
    '    c.x += sin(ang)*rad; c.z += sin(ang*0.63 + sem*3.1)*rad;',
    '    inten *= 1.0 - uNight;',
    '  } else {',                                           /* parapente · sólo de día */
    '    float ang = uT*0.072 + sem*6.283;',
    '    c.x += cos(ang)*rad; c.z += sin(ang)*rad*0.74;',
    '    c.y += 0.013*sin(uT*0.31 + sem*9.0);',
    '    inten *= 1.0 - uNight;',
    '  }',
    '  vQ = aQ; vI = vec3(tipo, inten*uDim, sem);',
    '  vec3 wp = c + uRight*(aQ.x*tam*esc) + uUp*(aQ.y*tam*esc);',
    '  vec4 cp = uVP * vec4(wp,1.0);',
    '  cp.xy += uOff * cp.w;',
    '  gl_Position = cp;',
    '}'
  ].join('\n');

  var FS_C = [
    'precision mediump float;',
    'varying vec2 vQ; varying vec3 vI;',
    'uniform vec3 cLampa, cVela, uWarm;',
    'void main(){',
    '  float tipo = vI.x, inten = vI.y;',
    '  float r = length(vQ);',
    '  vec3 col; float a;',
    '  if (tipo < 0.5) {',
    /* caida suave y ancha · el halo de antes era del tamano de la caja
       y con alfa .019: por eso el pueblo se veia como puntos */
    '    a = exp(-r*r*3.9) * inten; col = cLampa;',
    '  } else if (tipo < 1.5) {',
    '    a = exp(-pow((r-0.70)*6.5, 2.0)) * inten * smoothstep(1.02, 0.88, r);',
    '    col = vec3(0.86, 0.92, 1.0);',
    '  } else if (tipo < 2.5) {',
    '    float le = (fract(vI.z*13.7) - 0.5) * 0.44;',
    '    vec2 p = mat2(cos(le), sin(le), -sin(le), cos(le)) * vQ;',
    '    float t = clamp((0.88 - p.y)/1.16, 0.0, 1.0);',
    '    float vela = smoothstep(0.46*t, 0.46*t - 0.17, abs(p.x))',
    '              * smoothstep(-0.34, -0.23, p.y) * smoothstep(0.95, 0.78, p.y);',
    '    float casco = 1.0 - smoothstep(0.70, 1.04, length(vec2(p.x/0.56, (p.y+0.39)/0.17)));',
    '    float estela = (1.0 - smoothstep(0.10, 1.0, length(vec2(p.x/1.10, (p.y+0.58)/0.12)))) * 0.34;',
    '    a = max(max(vela, casco*0.94), estela) * inten;',
    '    col = mix(cVela*0.50, cVela, max(vela, estela));',
    '  } else {',
    '    a = smoothstep(0.98, 0.42, r) * (0.5 + 0.5*smoothstep(0.34, 0.0, abs(vQ.y + 0.18))) * inten;',
    '    col = mix(uWarm, vec3(0.95,0.95,0.95), 0.4);',
    '  }',
    '  if (a < 0.004) discard;',
    '  gl_FragColor = vec4(col*a, a);',
    '}'
  ].join('\n');

  /* ── shaders · la lluvia ─────────────────────────────────────
     Rayas instanciadas dentro de una losa sobre el terreno. La
     posición sale de mod(tiempo) en el vertex shader: cero trabajo
     de CPU por cuadro. Van con prueba de profundidad, así que el
     cerro las tapa y la lluvia queda *dentro* del diorama y no
     como una capa encima.                                          */
  var VS_LL = [
    'attribute vec2 aQ; attribute vec3 aR;',
    'uniform mat4 uVP; uniform vec2 uOff; uniform vec3 uRight;',
    'uniform mediump float uT, uRain, uWind, uTop, uDim;',
    'varying float vA;',
    'void main(){',
    '  float sem = aR.z;',
    '  float vel = 0.75 + fract(sem*7.31)*0.55;',
    '  float ph = fract(uT*vel*0.62 + sem);',
    '  float y = uTop - ph*uTop;',
    '  vec3 c = vec3(aR.x + (1.0-ph)*uWind*0.030, y, aR.y);',
    '  vec3 arr = normalize(vec3(uWind*0.10, 1.0, uWind*0.03));',
    '  vec3 wp = c + uRight*(aQ.x*0.0024) + arr*(aQ.y*0.055);',
    '  vec4 cp = uVP * vec4(wp,1.0);',
    '  cp.xy += uOff * cp.w;',
    '  gl_Position = cp;',
    '  vA = uRain * uDim * smoothstep(0.0,0.17,ph) * smoothstep(1.0,0.84,ph);',
    '}'
  ].join('\n');

  var FS_LL = [
    'precision mediump float;',
    'varying float vA;',
    'void main(){',
    '  if (vA < 0.01) discard;',
    '  float a = vA * 0.24;',
    '  gl_FragColor = vec4(vec3(0.80,0.88,0.98)*a, a);',
    '}'
  ].join('\n');

  /* ── compilar ────────────────────────────────────────────────── */
  function sh(t, src) {
    var s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }
  function programa(vs, fs) {
    var p = gl.createProgram();
    gl.attachShader(p, sh(gl.VERTEX_SHADER, vs));
    gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    return p;
  }
  function respaldo() { host.classList.remove('con-webgl'); host.classList.add('sin-webgl'); }
  var prog, progC, progLL;
  try {
    prog = programa(VS, FS);
    progC = programa(VS_C, FS_C);
    progLL = programa(VS_LL, FS_LL);
  } catch (e) { respaldo(); return; }

  function unis(p, lista) {
    var o = {};
    lista.forEach(function (nm) { o[nm] = gl.getUniformLocation(p, nm); });
    return o;
  }

  /* ── geometría · el cubo sin tapa inferior ───────────────────── */
  var V = [], I = [];
  function face(a, b, c, d, nn) {
    var o = V.length / 6;
    [a, b, c, d].forEach(function (p) { V.push(p[0], p[1], p[2], nn[0], nn[1], nn[2]); });
    I.push(o, o + 1, o + 2, o, o + 2, o + 3);
  }
  face([1,0,0],[1,1,0],[1,1,1],[1,0,1],[ 1,0, 0]);
  face([0,0,1],[0,1,1],[0,1,0],[0,0,0],[-1,0, 0]);
  face([1,0,1],[1,1,1],[0,1,1],[0,0,1],[ 0,0, 1]);
  face([0,0,0],[0,1,0],[1,1,0],[1,0,0],[ 0,0,-1]);
  face([0,1,0],[0,1,1],[1,1,1],[1,1,0],[ 0,1, 0]);

  var vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(V), gl.STATIC_DRAW);
  var ibo = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(I), gl.STATIC_DRAW);

  /* el cuadrito de las calcomanías y de la lluvia */
  var qbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, qbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, 1,1, -1,1]), gl.STATIC_DRAW);
  var qio = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, qio);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2, 0,2,3]), gl.STATIC_DRAW);

  var STEP = 0.42 / (LEV - 1);              /* un escalón de altura, aprox */
  function rnd(s) { var x = Math.sin(s * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); }
  function celda(lat, lon) {
    var fx = (lon - LON0) / (LON1 - LON0), fz = (LAT1 - lat) / (LAT1 - LAT0);
    return { i: Math.max(0, Math.min(G-1, Math.floor(fx*G))), j: Math.max(0, Math.min(G-1, Math.floor(fz*G))) };
  }

  /* ── primera pasada · quién prende la luz ────────────────────
     Hay que saber dónde están las ventanas encendidas ANTES de
     armar las instancias, porque el mapa de luz difuminada entra
     como atributo de cada bloque. Las semillas son deterministas,
     así que las dos pasadas coinciden siempre.                     */
  var luces = new Uint8Array(G * G), densLuz = new Float32Array(G * G), nLuz = 0;
  for (var ka = 0; ka < G * G; ka++) {
    if (wv[ka] || !cv2[ka]) continue;
    var sd = ka * 7.13 + 1.7;
    for (var ca = 0; ca < cv2[ka]; ca++) {
      if (rnd(sd + ca * 3.1 + 113) < 0.58) { luces[ka] |= (1 << ca); densLuz[ka]++; nLuz++; }
    }
  }

  /* ── el mapa de luz del pueblo ───────────────────────────────
     Difuminado separable, radio 4, dos pasadas: ~450 mil cuentas,
     una sola vez al cargar. Es lo que hace que de noche el cerro
     detrás de las casas, la calle y la orilla estén iluminados en
     vez de quedarse en negro con puntitos amarillos encima.        */
  var town = (function () {
    var a = new Float32Array(G * G), b = new Float32Array(G * G), R = 3;
    for (var q = 0; q < G * G; q++) a[q] = densLuz[q];
    for (var pasada = 0; pasada < 2; pasada++) {
      for (var jj = 0; jj < G; jj++) for (var ii = 0; ii < G; ii++) {
        var s = 0, c = 0;
        for (var t = -R; t <= R; t++) { var x = ii + t; if (x < 0 || x >= G) continue; s += a[jj*G+x]; c++; }
        b[jj*G+ii] = s / c;
      }
      for (var ii2 = 0; ii2 < G; ii2++) for (var jj2 = 0; jj2 < G; jj2++) {
        var s2 = 0, c2 = 0;
        for (var t2 = -R; t2 <= R; t2++) { var y2 = jj2 + t2; if (y2 < 0 || y2 >= G) continue; s2 += b[y2*G+ii2]; c2++; }
        a[jj2*G+ii2] = s2 / c2;
      }
    }
    var mx = 0.0001;
    for (var q2 = 0; q2 < G * G; q2++) if (a[q2] > mx) mx = a[q2];
    for (var q3 = 0; q3 < G * G; q3++) a[q3] = Math.pow(Math.min(1, a[q3] / mx), 0.78);
    return a;
  })();

  /* ── instancias · terreno, casas, árboles, orilla, torre ─────── */
  var gI = [], gE = [], gX = [], nCasas = 0, nArb = 0;
  function bloque(i, j, alt, kind, oc, dx, dz, w, hh, rr) {
    gI.push(i, j, alt, kind * 2 + oc);
    gE.push(dx, dz, w, hh);
    gX.push(town[j * G + i], rr);
  }
  for (var jj3 = 0; jj3 < G; jj3++) for (var ii3 = 0; ii3 < G; ii3++) {
    var kk = jj3 * G + ii3, agua = wv[kk], dens = cv2[kk], oc = Math.min(0.999, ao[kk]);
    var alt = hv[kk] / (LEV - 1);
    var tipo = agua ? 1 : (rd[kk] ? 5 : (orilla[kk] ? 6 : 0));
    bloque(ii3, jj3, alt, tipo, oc, 0, 0, 1, 0, rnd(kk * 0.017));

    if (agua) continue;
    var seed = kk * 7.13 + 1.7;

    for (var c = 0; c < dens; c++) {                 /* casas */
      var r1 = rnd(seed + c*3.1), r2 = rnd(seed + c*3.1 + 41), r3 = rnd(seed + c*3.1 + 77);
      var luz = !!(luces[kk] & (1 << c));
      bloque(ii3, jj3, alt, luz ? 4 : 3, oc, (r1-0.5)*0.56, (r2-0.5)*0.56,
             0.20 + r3*0.14, STEP*(0.75 + r1*0.85), rnd(seed + c*13.7));
      nCasas++;
    }

    /* árboles · donde el terreno se empina y no hay caserío */
    var p = Math.min(0.9, Math.max(0, (slope[kk] - 0.55) / 2.6));
    p *= (1 - Math.min(1, dens / 2.2));
    if (rd[kk]) p *= 0.12;
    p *= 0.55 + 0.45 * rnd(kk * 0.031);
    var cuantos = rnd(seed + 211) < p ? (rnd(seed + 307) < p * 0.7 ? 2 : 1) : 0;
    for (var a2 = 0; a2 < cuantos; a2++) {
      var s1 = rnd(seed + a2*5.7 + 500), s2 = rnd(seed + a2*5.7 + 611), s3 = rnd(seed + a2*5.7 + 733);
      /* tres tallas de árbol en vez de una sola: el bosque deja de
         verse como una alfombra pareja */
      var talla = s3 < 0.30 ? 0.72 : (s3 < 0.78 ? 1.0 : 1.42);
      bloque(ii3, jj3, alt, 2, oc, (s1-0.5)*0.62, (s2-0.5)*0.62,
             (0.16 + s3*0.11) * (0.85 + talla*0.20), STEP*(0.80 + s1*0.95)*talla, s3);
      nArb++;
    }
  }

  /* la torre del centro · el único punto alto que ancla la vista.
     Va en la celda del Centro, que sí está verificada en OSM. */
  var cCentro = celda(19.19367, -100.13174);
  bloque(cCentro.i, cCentro.j, hv[cCentro.j*G + cCentro.i] / (LEV-1), 7,
         Math.min(0.999, ao[cCentro.j*G + cCentro.i]), 0, 0, 0.13, STEP*4.6, 0.5);

  var insArr = new Float32Array(gI), exArr = new Float32Array(gE), exArr2 = new Float32Array(gX);
  var N = insArr.length / 4;
  gI = gE = gX = null;

  /* ── calcomanías · resplandor, salpicaduras, veleros, parapentes ── */
  var CELL = 2 / G;
  function wx(i) { return -1 + (i + 0.5) * CELL; }
  var sS = [], sS2 = [], nGlow = 0, nSalp = 0, nBarco = 0, nPara = 0;
  function calco(i, j, alt, tipo, tam, sem, inten, rad) {
    sS.push(wx(i), alt, wx(j), tipo); sS2.push(tam, sem, inten, rad || 0);
  }

  /* 0 · el resplandor: uno por celda con ventanas, no uno por caja */
  for (var kg = 0; kg < G * G; kg++) {
    if (!densLuz[kg]) continue;
    var ig = kg % G, jg = (kg / G) | 0, tg = town[kg];
    calco(ig, jg, hv[kg] / (LEV - 1), 0,
          0.046 + 0.066 * tg, rnd(kg * 0.911),
          0.016 + 0.036 * Math.min(1, densLuz[kg] / 2.5));
    nGlow++;
  }
  /* la del centro lleva semilla 0: es la que se queda prendida
     cuando el pueblo se duerme */
  calco(cCentro.i, cCentro.j, hv[cCentro.j*G + cCentro.i] / (LEV - 1), 0, 0.062, 0.0, 0.070);
  nGlow++;

  /* faroles sobre la red principal, donde hay pueblo alrededor */
  for (var kf = 0, saltar = 0; kf < G * G; kf++) {
    if (!rd[kf] || wv[kf] || town[kf] < 0.14) continue;
    if ((saltar++ % 2) || nGlow > 1400) continue;
    calco(kf % G, (kf / G) | 0, hv[kf] / (LEV - 1), 0, 0.034, rnd(kf * 1.77), 0.026);
    nGlow++;
  }
  /* unas luces sobre el agua · el muelle */
  for (var km = 0, nm = 0; km < G * G && nm < 12; km++) {
    if (!wv[km] || town[km] < 0.34) continue;
    var vecino = (km % G > 0 && orilla[km-1]) || (km % G < G-1 && orilla[km+1]) ||
                 (km >= G && orilla[km-G]) || (km < G*(G-1) && orilla[km+G]);
    if (!vecino) continue;
    calco(km % G, (km / G) | 0, hv[km] / (LEV - 1), 0, 0.048, rnd(km * 2.31), 0.048);
    nGlow++; nm++; km += 3;
  }

  /* 1 · salpicaduras de lluvia sobre el lago */
  var aguaCeldas = [];
  for (var kw = 0; kw < G * G; kw++) if (wv[kw]) aguaCeldas.push(kw);
  var pasoS = Math.max(1, Math.floor(aguaCeldas.length / 340));
  for (var ks = 0; ks < aguaCeldas.length; ks += pasoS) {
    var kc = aguaCeldas[ks];
    calco(kc % G, (kc / G) | 0, hv[kc] / (LEV - 1), 1, 0.013, rnd(kc * 3.77), 0.55);
    nSalp++;
  }

  /* 2 · veleros · sólo sobre aguas abiertas, y sólo de día.
        De noche no navega nadie, así que el shader los apaga. */
  var pasoB = Math.max(1, Math.floor(abierta.length / 9));
  for (var kb = 0; kb < abierta.length && nBarco < 9; kb += pasoB) {
    var cb = abierta[kb];
    calco(cb % G, (cb / G) | 0, hv[cb] / (LEV - 1), 2,
          0.0175 + rnd(cb * 9.7) * 0.0055, rnd(cb * 5.19), 0.95, 0.030);
    nBarco++;
  }

  /* 3 · parapentes sobre las crestas del oriente · también de día */
  var pasoP = Math.max(1, Math.floor(crestas.length / 3));
  for (var kp = 0; kp < crestas.length && nPara < 3; kp += pasoP) {
    var cp2 = crestas[kp];
    calco(cp2 % G, (cp2 / G) | 0, hv[cp2] / (LEV - 1), 3, 0.0150, rnd(cp2 * 8.41), 0.90, 0.055);
    nPara++;
  }

  var sArr = new Float32Array(sS), s2Arr = new Float32Array(sS2);
  var iSalp = nGlow, iBarco = nGlow + nSalp, nAlfa = nBarco + nPara;
  sS = sS2 = null;

  /* ── lluvia · las gotas ──────────────────────────────────────── */
  var NLL = 2600, lls = new Float32Array(NLL * 3);
  for (var kl = 0; kl < NLL; kl++) {
    lls[kl*3]   = -0.97 + rnd(kl * 1.31 + 3) * 1.94;
    lls[kl*3+1] = -0.97 + rnd(kl * 2.71 + 11) * 1.94;
    lls[kl*3+2] = rnd(kl * 0.53 + 29);
  }

  /* ── buffers ─────────────────────────────────────────────────── */
  function buf(datos) {
    var b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, datos, gl.STATIC_DRAW);
    return b;
  }
  var ibuf = buf(insArr), ebuf = buf(exArr), e2buf = buf(exArr2);
  var sbuf = buf(sArr), s2buf = buf(s2Arr), llbuf = buf(lls);

  var A = {
    pos: gl.getAttribLocation(prog, 'aPos'), nrm: gl.getAttribLocation(prog, 'aNrm'),
    ins: gl.getAttribLocation(prog, 'aInst'), ex: gl.getAttribLocation(prog, 'aEx'),
    ex2: gl.getAttribLocation(prog, 'aEx2'),
    cq: gl.getAttribLocation(progC, 'aQ'), cs: gl.getAttribLocation(progC, 'aS'),
    cs2: gl.getAttribLocation(progC, 'aS2'),
    lq: gl.getAttribLocation(progLL, 'aQ'), lr: gl.getAttribLocation(progLL, 'aR')
  };
  var U = unis(prog, ['uVP','uOff','uG','uY','uBase','uSun','uWarm','uSky','uBounce','uGround',
    'uLuz','uEye','cLow','cMid','cHigh','cWater','cSoil','cTree','cCasa','cLampa','cCalle','cOrilla',
    'uT','uFog','uBands','uNight','uDim','uAmb','uRain','uCloud','uWind','uDormir']);
  var UC = unis(progC, ['uVP','uOff','uRight','uUp','uT','uNight','uRain','uDim','uY','uDormir','cLampa','cVela','uWarm']);
  var UL = unis(progLL, ['uVP','uOff','uRight','uT','uRain','uWind','uTop','uDim']);

  /* ── matrices ────────────────────────────────────────────────── */
  function mmul(a, b) {
    var o = new Float32Array(16);
    for (var r = 0; r < 4; r++) for (var c = 0; c < 4; c++) {
      var s = 0; for (var q = 0; q < 4; q++) s += a[q * 4 + r] * b[c * 4 + q];
      o[c * 4 + r] = s;
    }
    return o;
  }
  function persp(fov, asp, nr, f) {
    var t = 1 / Math.tan(fov / 2), o = new Float32Array(16);
    o[0] = t / asp; o[5] = t; o[10] = (f + nr) / (nr - f); o[11] = -1; o[14] = 2 * f * nr / (nr - f);
    return o;
  }
  function nz(a) { var l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0]/l, a[1]/l, a[2]/l]; }
  var camR = [1,0,0], camU = [0,1,0];
  function look(e, c, up) {
    var z = nz([e[0]-c[0], e[1]-c[1], e[2]-c[2]]);
    var x = nz([up[1]*z[2]-up[2]*z[1], up[2]*z[0]-up[0]*z[2], up[0]*z[1]-up[1]*z[0]]);
    var y = [z[1]*x[2]-z[2]*x[1], z[2]*x[0]-z[0]*x[2], z[0]*x[1]-z[1]*x[0]];
    camR = x; camU = y;
    return new Float32Array([
      x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0,
      -(x[0]*e[0]+x[1]*e[1]+x[2]*e[2]), -(y[0]*e[0]+y[1]*e[1]+y[2]*e[2]), -(z[0]*e[0]+z[1]*e[1]+z[2]*e[2]), 1
    ]);
  }

  /* ── ajustes ─────────────────────────────────────────────────── */
  var P = window.VALLE_TUNE = {
    exag: 0.42, base: 0.20,
    az: -0.70, azScroll: 0.95, el: 0.52, dist: 7.33, fov: 0.34,
    offX: 0.02, offY: -0.33,
    fog: 0.30, bands: 30, amb: 0.58,
    dim: 1.00, dimScroll: 0.42
  };

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pal = {}, prog01 = 0, target01 = 0, t0 = performance.now(), tPrev = t0, cuadros = 0, llamadas = 0;
  var foco = null, focoAmt = 0, focoTgt = 0, pines = [];
  var marco = { amt: 0, tgt: 0, ox: 0, oy: 0 };
  var man = { amt: 0, tgt: 0, az: 0, el: 0, dist: 0, tx: 0, tz: 0, listo: 0 };
  var clima = { lluvia: 0, nubes: 0, viento: 0.30 };
  var L = { sun: [0.4, 0.8, 0.4], warm: [1, .96, .86], sky: [.62, .66, .63], night: 0 };

  /* ── la hora que manda ───────────────────────────────────────
     Normalmente el reloj. Si el panel de abajo trae la barra de
     horas, window.VALLE_HORA_OVR trae la hora forzada (0–24) y
     todo —el sol, el color del sitio, las ventanas— la sigue.
     Valle está en UTC−6 todo el año: México dejó el horario de
     verano en 2022.                                                */
  function ahora() {
    var o = window.VALLE_HORA_OVR;
    if (o == null) return new Date();
    var v = new Date(Date.now() - 6 * 3600000);
    return new Date(Date.UTC(v.getUTCFullYear(), v.getUTCMonth(), v.getUTCDate()) + (o + 6) * 3600000);
  }

  function esNoche() {
    var t = document.documentElement.getAttribute('data-t');
    if (t) return t === 'night';
    return matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /* ── el sol de este momento ──────────────────────────────────
     Antes eran cuatro poses fijas y la noche empezaba a las 20:00
     todo el año. Ahora sale de la posición real del sol sobre
     Valle: en diciembre oscurece a las 18:10 y en junio a las
     20:15, y el diorama lo sabe. La dirección también es la de
     verdad — el sol sale por el oriente del mapa.                  */
  function solActual() {
    var s = SOLAR(ahora()), alt = s.y;
    var noche = Math.max(0, Math.min(1, (0.10 - alt) / 0.24));
    if (document.documentElement.getAttribute('data-t') === 'night') noche = 1;
    /* de noche la luz clave es la luna, no un sol bajo tierra */
    var dir = [s.x + (0.42 - s.x) * noche, alt + (0.78 - alt) * noche, s.z + (0.46 - s.z) * noche];
    if (dir[1] > 0.80) { var baja = 0.80 / dir[1]; dir[1] *= baja; }
    var bajo = 1 - Math.min(1, Math.max(0, alt) / 0.38);
    var warm = [1.00, 0.96 - 0.19 * bajo, 0.87 - 0.40 * bajo];
    var sky = [0.62, 0.66, 0.63];
    var noc = [0.46, 0.55, 0.72], nocS = [0.26, 0.30, 0.38];
    for (var q = 0; q < 3; q++) {
      warm[q] += (noc[q] - warm[q]) * noche;
      sky[q] += (nocS[q] - sky[q]) * noche;
    }
    /* nublado: la luz pierde color y el cielo pesa más */
    var n = clima.nubes;
    if (n > 0.01) {
      var gris = (warm[0] + warm[1] + warm[2]) / 3;
      for (var q2 = 0; q2 < 3; q2++) warm[q2] += (gris - warm[q2]) * n * 0.55;
    }
    return { sun: nz(dir), warm: warm, sky: sky, night: noche };
  }

  /* ── paleta ──────────────────────────────────────────────────
     De noche el código viejo multiplicaba todo por 0.40 y las
     calles por 0.30: el mapa se hundía en negro y sólo quedaban
     los puntos amarillos. Ahora baja menos y se va al azul, que
     es de donde viene la luz de la luna. Se sigue leyendo que es
     un mapa; el pueblo sigue siendo lo más brillante.              */
  function nocheAzul(c, k) {
    var l = c[0]*0.30 + c[1]*0.59 + c[2]*0.11;
    var r = c[0]*0.52 + l*0.48, g2 = c[1]*0.52 + l*0.48, b = c[2]*0.52 + l*0.48;
    return [r*k*0.84, g2*k*0.96, b*k*1.28];
  }
  function readPal() {
    var noche = esNoche();
    var ink   = noche ? [0.05, 0.08, 0.08] : css('--ink', [0.18, 0.24, 0.14]);
    var musgo = css('--musgo', [0.42, 0.56, 0.38]);
    var olive = css('--olive', [0.40, 0.47, 0.26]);
    var khaki = css('--khaki', [0.80, 0.76, 0.55]);
    var lima  = css('--lima',  [0.86, 0.92, 0.50]);
    var agua  = css('--agua',  [0.44, 0.66, 0.70]);
    var acc   = css('--acc',   [0.85, 0.42, 0.24]);
    var lift  = css('--lift',  [0.98, 0.99, 0.95]);
    pal.low   = mixc(musgo, ink, 0.56);
    pal.mid   = mixc(olive, ink, 0.10);
    pal.high  = mixc(khaki, lima, 0.30);
    pal.water = mixc(agua,  ink, 0.30);
    pal.soil  = mixc(mixc(khaki, acc, 0.20), ink, 0.44);
    pal.tree  = mixc(musgo, ink, 0.70);
    pal.casa  = noche ? [0.20, 0.21, 0.21] : mixc(lift, khaki, 0.22);
    pal.lampa = [1.00, 0.76, 0.36];
    pal.calle = mixc(mixc(khaki, [0.84, 0.81, 0.76], 0.55), ink, 0.40);
    /* la orilla · una franja de playa donde la tierra toca el agua */
    pal.orilla = mixc(mixc(khaki, lift, 0.42), ink, 0.22);
    pal.vela  = [0.97, 0.97, 0.94];
    pal.ground = css('--ground', noche ? [0.10, 0.14, 0.13] : [0.90, 0.92, 0.84]);
    if (noche) {
      ['low','mid','high','soil','tree'].forEach(function (nm) { pal[nm] = nocheAzul(pal[nm], 0.56); });
      pal.water  = nocheAzul(pal.water, 0.64);
      pal.calle  = nocheAzul(pal.calle, 0.50);
      pal.orilla = nocheAzul(pal.orilla, 0.50);
      pal.vela   = [0.55, 0.60, 0.72];
    }
    /* la luz que las ventanas derraman sobre todo lo demás */
    pal.luz = [pal.lampa[0] * 0.62, pal.lampa[1] * 0.46, pal.lampa[2] * 0.24];
  }
  readPal();

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = host.clientWidth, h = host.clientHeight;
    cnv.width = Math.max(1, Math.round(w * dpr));
    cnv.height = Math.max(1, Math.round(h * dpr));
    cnv.style.width = w + 'px'; cnv.style.height = h + 'px';
  }
  (function () { var s = solActual(); L.sun = s.sun; L.warm = s.warm; L.sky = s.sky; L.night = s.night; })();

  /* ── atributos ───────────────────────────────────────────────
     Los divisores de ANGLE_instanced_arrays son globales por índice
     de atributo, no por programa, así que cada pase se arma entero
     y apaga lo que dejó el anterior.                                */
  function ena(loc, n, stride, off, div) {
    if (loc < 0) return;
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, n, gl.FLOAT, false, stride, off);
    ext.vertexAttribDivisorANGLE(loc, div);
  }
  function apaga(locs) {
    locs.forEach(function (l) { if (l >= 0) { ext.vertexAttribDivisorANGLE(l, 0); gl.disableVertexAttribArray(l); } });
  }

  function tanda(desde, cuantos) {
    gl.bindBuffer(gl.ARRAY_BUFFER, sbuf);  ena(A.cs,  4, 16, desde * 16, 1);
    gl.bindBuffer(gl.ARRAY_BUFFER, s2buf); ena(A.cs2, 4, 16, desde * 16, 1);
    ext.drawElementsInstancedANGLE(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, cuantos); llamadas++;
  }

  var lastAuto = { az: 0, el: 0.52, dist: 7.33, tx: 0, tz: 0 };

  function draw(now) {
    cuadros++; llamadas = 0;
    var t = (now - t0) / 1000;
    /* suavizado por tiempo, no por cuadro: en un equipo lento la
       transición tarda lo mismo en segundos que en uno rápido */
    var dt = Math.min(0.25, Math.max(0.001, (now - tPrev) / 1000)); tPrev = now;
    var e = 1 - Math.pow(0.002, dt / 2.2);
    var eScroll = 1 - Math.pow(0.002, dt / 0.55);
    var eClima = 1 - Math.pow(0.002, dt / 3.0);
    var eMan = 1 - Math.pow(0.002, dt / 0.8);

    /* el clima que el sitio haya podido bajar · si no hay, cero */
    var c = window.VALLE_CLIMA;
    var tl = c ? Math.max(0, Math.min(1, c.lluvia || 0)) : 0;
    var tn = c ? Math.max(0, Math.min(1, c.nubes || 0)) : 0;
    var tv = c && c.viento != null ? Math.max(0, Math.min(1.6, c.viento)) : 0.30;
    clima.lluvia += (tl - clima.lluvia) * eClima;
    clima.nubes  += (tn - clima.nubes)  * eClima;
    clima.viento += (tv - clima.viento) * eClima;

    var s = solActual();
    L.night += (s.night - L.night) * e;
    for (var q = 0; q < 3; q++) {
      L.sun[q]  += (s.sun[q]  - L.sun[q])  * e;
      L.warm[q] += (s.warm[q] - L.warm[q]) * e;
      L.sky[q]  += (s.sky[q]  - L.sky[q])  * e;
    }
    var sun = nz(L.sun);
    prog01 += (target01 - prog01) * eScroll;
    marco.amt += (marco.tgt - marco.amt) * eMan;
    man.amt   += (man.tgt   - man.amt)   * eMan;

    var asp = cnv.width / cnv.height;
    var fit = 1 + Math.max(0, 0.92 / asp - 1) * 0.458;
    var estrecho = Math.min(1, Math.max(0, (1.15 - asp) / 0.55));

    /* cámara automática · la de siempre */
    var azA = P.az + prog01 * P.azScroll * (1 - 0.72 * focoAmt) + (reduce ? 0 : Math.sin(t * 0.055) * 0.045);
    var elA = P.el + prog01 * 0.14;
    var dA  = (P.dist + prog01 * 1.1 * (1 - 0.7 * focoAmt)) * fit;
    if (prog01 > 0.92 && !man.tgt) focoTgt = 0;     /* sólo hasta el fondo se suelta */
    focoAmt += (focoTgt - focoAmt) * (1 - Math.pow(0.002, dt / 1.1));
    if (focoAmt < 0.004 && focoTgt === 0 && pines.length) { limpiaPines(); host.classList.remove('con-foco'); }
    dA *= 1 - 0.22 * focoAmt;
    var txA = foco ? foco.x * focoAmt * 0.62 : 0;
    var tyA = -0.03 + (foco ? foco.y * focoAmt * 0.45 : 0);
    var tzA = foco ? foco.z * focoAmt * 0.62 : 0;
    lastAuto.az = azA; lastAuto.el = elA; lastAuto.dist = dA / fit; lastAuto.tx = txA; lastAuto.tz = tzA;

    /* cámara del panel de abajo · se mezcla con la automática */
    var mm = man.amt;
    var az = azA + (man.az - azA) * mm;
    var el = elA + (man.el - elA) * mm;
    var d  = dA + (man.dist * fit - dA) * mm;
    var tg = [txA + (man.tx - txA) * mm, tyA + (-0.03 - tyA) * mm, tzA + (man.tz - tzA) * mm];

    var eye = [tg[0] + Math.sin(az) * Math.cos(el) * d,
               tg[1] + Math.sin(el) * d,
               tg[2] + Math.cos(az) * Math.cos(el) * d];
    var vp = mmul(persp(P.fov, asp, 0.1, 40), look(eye, tg, [0, 1, 0]));
    var oxA = P.offX * (1 - estrecho), oyA = P.offY + (-0.36 - P.offY) * estrecho;
    var ox = oxA + (marco.ox - oxA) * marco.amt;
    var oy = oyA + (marco.oy - oyA) * marco.amt;

    var dim = Math.max(0.05, (P.dim - prog01 * P.dimScroll * (1 - 0.80 * focoAmt) * (1 - man.amt)) * (1 + estrecho * 0.06));

    gl.viewport(0, 0, cnv.width, cnv.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND); gl.depthMask(true);

    /* ── 1 · los bloques ─────────────────────────────────────── */
    gl.useProgram(prog);
    apaga([A.cq, A.cs, A.cs2, A.lq, A.lr]);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    ena(A.pos, 3, 24, 0, 0); ena(A.nrm, 3, 24, 12, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, ibuf);  ena(A.ins, 4, 16, 0, 1);
    gl.bindBuffer(gl.ARRAY_BUFFER, ebuf);  ena(A.ex,  4, 16, 0, 1);
    gl.bindBuffer(gl.ARRAY_BUFFER, e2buf); ena(A.ex2, 2, 8,  0, 1);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

    gl.uniformMatrix4fv(U.uVP, false, vp);
    gl.uniform2f(U.uOff, ox, oy);
    gl.uniform1f(U.uG, G);
    gl.uniform1f(U.uY, P.exag);
    gl.uniform1f(U.uBase, P.base);
    gl.uniform1f(U.uT, t);
    gl.uniform1f(U.uBands, P.bands);
    gl.uniform1f(U.uNight, L.night);
    gl.uniform1f(U.uRain, clima.lluvia);
    gl.uniform1f(U.uCloud, clima.nubes);
    gl.uniform1f(U.uWind, clima.viento);
    var dormir = Math.max(0, Math.min(1, window.VALLE_DORMIR || 0));
    gl.uniform1f(U.uDormir, dormir);
    /* con nubes el sol pega menos y el ambiente sube; con lluvia y de
       noche la bruma se contiene para que el pueblo no se borre */
    gl.uniform1f(U.uAmb, P.amb * (1 + clima.nubes * 0.42));
    gl.uniform1f(U.uFog, P.fog * (1 - estrecho * 0.42) * (1 - L.night * 0.30));
    gl.uniform1f(U.uDim, dim);
    gl.uniform3fv(U.uSun, sun);
    gl.uniform3f(U.uEye, eye[0], eye[1], eye[2]);
    gl.uniform3fv(U.uWarm, L.warm);
    gl.uniform3fv(U.uSky, L.sky);
    gl.uniform3f(U.uBounce, L.sky[0] * 0.5, L.sky[1] * 0.5, L.sky[2] * 0.56);
    gl.uniform3fv(U.uGround, pal.ground);
    gl.uniform3fv(U.uLuz, pal.luz);
    gl.uniform3fv(U.cLow, pal.low);
    gl.uniform3fv(U.cMid, pal.mid);
    gl.uniform3fv(U.cHigh, pal.high);
    gl.uniform3fv(U.cWater, pal.water);
    gl.uniform3fv(U.cSoil, pal.soil);
    gl.uniform3fv(U.cTree, pal.tree);
    gl.uniform3fv(U.cCasa, pal.casa);
    gl.uniform3fv(U.cLampa, pal.lampa);
    gl.uniform3fv(U.cCalle, pal.calle);
    gl.uniform3fv(U.cOrilla, pal.orilla);
    ext.drawElementsInstancedANGLE(gl.TRIANGLES, I.length, gl.UNSIGNED_SHORT, 0, N); llamadas++;

    /* ── 2 · las calcomanías ─────────────────────────────────── */
    var hayGlow = L.night > 0.03 && nGlow, haySalp = clima.lluvia > 0.02 && nSalp;
    var hayAlfa = L.night < 0.97 && nAlfa;
    if (hayGlow || haySalp || hayAlfa) {
      gl.useProgram(progC);
      apaga([A.pos, A.nrm, A.ins, A.ex, A.ex2, A.lq, A.lr]);
      gl.bindBuffer(gl.ARRAY_BUFFER, qbo); ena(A.cq, 2, 8, 0, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, qio);
      gl.uniformMatrix4fv(UC.uVP, false, vp);
      gl.uniform2f(UC.uOff, ox, oy);
      gl.uniform3fv(UC.uRight, camR); gl.uniform3fv(UC.uUp, camU);
      gl.uniform1f(UC.uT, t); gl.uniform1f(UC.uNight, L.night);
      gl.uniform1f(UC.uRain, clima.lluvia); gl.uniform1f(UC.uDim, dim);
      gl.uniform1f(UC.uY, P.exag);
      gl.uniform1f(UC.uDormir, dormir);
      gl.uniform3fv(UC.cLampa, pal.lampa); gl.uniform3fv(UC.cVela, pal.vela);
      gl.uniform3fv(UC.uWarm, L.warm);
      gl.depthMask(false); gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE);                       /* aditivo · se suman al apiñarse */
      if (hayGlow) tanda(0, nGlow);
      if (haySalp) tanda(iSalp, nSalp);
      if (hayAlfa) {                                      /* veleros y parapentes · sobre el fondo */
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        tanda(iBarco, nAlfa);
      }
      gl.disable(gl.BLEND); gl.depthMask(true);
    }

    /* ── 3 · la lluvia ───────────────────────────────────────── */
    if (clima.lluvia > 0.02) {
      gl.useProgram(progLL);
      apaga([A.pos, A.nrm, A.ins, A.ex, A.ex2, A.cs, A.cs2]);
      gl.bindBuffer(gl.ARRAY_BUFFER, qbo); ena(A.lq, 2, 8, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, llbuf); ena(A.lr, 3, 12, 0, 1);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, qio);
      gl.uniformMatrix4fv(UL.uVP, false, vp);
      gl.uniform2f(UL.uOff, ox, oy);
      gl.uniform3fv(UL.uRight, camR);
      gl.uniform1f(UL.uT, t); gl.uniform1f(UL.uRain, clima.lluvia);
      gl.uniform1f(UL.uWind, clima.viento); gl.uniform1f(UL.uTop, P.exag + 0.14);
      gl.uniform1f(UL.uDim, dim);
      gl.depthMask(false); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);
      ext.drawElementsInstancedANGLE(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, NLL); llamadas++;
      gl.disable(gl.BLEND); gl.depthMask(true);
    }

    /* la sombra sólo se reescribe cuando de verdad cambia:
       tocar el estilo cada cuadro fuerza un recálculo y atropella
       las transiciones de color del sitio */
    if (pines.length) {
      var W = host.clientWidth, Hh = host.clientHeight;
      for (var pi = 0; pi < pines.length; pi++) {
        var p = pines[pi];
        var cxp = vp[0]*p.x + vp[4]*p.y + vp[8]*p.z + vp[12];
        var cyp = vp[1]*p.x + vp[5]*p.y + vp[9]*p.z + vp[13];
        var cwp = vp[3]*p.x + vp[7]*p.y + vp[11]*p.z + vp[15];
        if (cwp <= 0.0001) { p.el.style.opacity = '0'; continue; }
        cxp += ox * cwp; cyp += oy * cwp;
        p.el.style.opacity = focoAmt.toFixed(2);
        p.el.style.transform = 'translate(-50%,-100%) translate(' +
          ((cxp / cwp * 0.5 + 0.5) * W).toFixed(1) + 'px,' +
          ((0.5 - cyp / cwp * 0.5) * Hh).toFixed(1) + 'px)';
      }
    }

    sombra((50 + ox * 50).toFixed(1) + '%', (50 - oy * 50 + 13).toFixed(1) + '%',
           (215 / d).toFixed(1) + 'vmin', (0.9 * dim).toFixed(2));
  }

  /* ── foco: la cámara se acerca a un punto del valle y planta un pin ── */
  function mundo(lat, lon) {
    var fx = (lon - LON0) / (LON1 - LON0), fz = (LAT1 - lat) / (LAT1 - LAT0);
    var i = Math.max(0, Math.min(G - 1, Math.floor(fx * G)));
    var j = Math.max(0, Math.min(G - 1, Math.floor(fz * G)));
    return { x: -1 + fx * 2, z: -1 + fz * 2, y: hv[j * G + i] / (LEV - 1) * P.exag };
  }
  var capaPines = document.createElement('div');
  capaPines.className = 'pines';
  host.appendChild(capaPines);
  function creaPin(txt) {
    var el = document.createElement('div');
    el.className = 'pin';
    el.innerHTML = '<i class="onda"></i><i class="onda"></i><i class="punto"></i>' +
                   (txt ? '<b>' + String(txt).replace(/[<>&]/g, '') + '</b>' : '');
    capaPines.appendChild(el);
    return el;
  }
  function limpiaPines() {
    pines.forEach(function (p) { if (p.el.parentNode) p.el.parentNode.removeChild(p.el); });
    pines = [];
  }
  window.VALLE_FOCO = function (pts) {
    limpiaPines();
    if (!pts || !pts.length) { focoTgt = 0; foco = null; return; }
    /* Varios lugares pueden caer en el mismo punto (los que todavia
       apuntan a su zona). Se agrupan para no encimar las etiquetas. */
    var grupos = {}, orden = [];
    pts.forEach(function (p) {
      var k = p.lat.toFixed(4) + ',' + p.lon.toFixed(4);
      if (!grupos[k]) { grupos[k] = { lat: p.lat, lon: p.lon, nombres: [] }; orden.push(k); }
      if (grupos[k].nombres.indexOf(p.label) < 0) grupos[k].nombres.push(p.label);
    });
    var sx = 0, sz = 0, sy = 0;
    orden.slice(0, 6).forEach(function (k) {
      var g = grupos[k], w = mundo(g.lat, g.lon);
      sx += w.x; sz += w.z; sy += w.y;
      var txt = g.nombres[0] + (g.nombres.length > 1 ? '  +' + (g.nombres.length - 1) : '');
      pines.push({ x: w.x, y: w.y, z: w.z, el: creaPin(txt) });
    });
    var n = pines.length;
    foco = { x: sx / n, z: sz / n, y: sy / n };
    focoTgt = 1;
    host.classList.add('con-foco');
  };

  var prevS = ['', '', '', ''];
  function sombra(dx, dy, dw, op) {
    var v = [dx, dy, dw, op], nm = ['--dx', '--dy', '--dw', '--dop'];
    for (var i = 0; i < 4; i++) if (v[i] !== prevS[i]) { prevS[i] = v[i]; host.style.setProperty(nm[i], v[i]); }
  }

  /* ── la cámara de mano · lo que maneja el panel del pie ──────
     Mientras el panel tiene el control, la cámara del scroll se
     queda quieta y el diorama recupera brillo completo. Al salir
     del panel se suelta sola y vuelve al encuadre de siempre.      */
  function pinza(v, a, b) { return v < a ? a : (v > b ? b : v); }
  window.VALLE_CAM = {
    tomar: function () {
      if (man.tgt < 0.5) {
        man.az = lastAuto.az; man.el = lastAuto.el; man.dist = lastAuto.dist;
        man.tx = lastAuto.tx; man.tz = lastAuto.tz;
      }
      man.tgt = 1; host.classList.add('con-mano');
    },
    soltar: function () { man.tgt = 0; host.classList.remove('con-mano'); },
    gira: function (dAz, dEl) {
      man.az += dAz; man.el = pinza(man.el + dEl, 0.10, 1.36);
    },
    zoom: function (f) { man.dist = pinza(man.dist * f, 2.3, 13.5); },
    mueve: function (dx, dz) {
      man.tx = pinza(man.tx + dx, -0.85, 0.85); man.tz = pinza(man.tz + dz, -0.85, 0.85);
    },
    reset: function () {
      man.az = -0.70; man.el = 0.52; man.dist = 7.33; man.tx = 0; man.tz = 0;
    },
    marco: function (ox, oy, on) { marco.ox = ox; marco.oy = oy; marco.tgt = on ? 1 : 0; },
    activa: function () { return man.tgt > 0.5; },
    estado: function () { return { noche: L.night, lluvia: clima.lluvia, dist: man.dist }; }
  };

  /* ── bucle a 30 fps, en pausa si la pestaña no se ve ───────────
     Ojo: una página precargada o abierta en segundo plano arranca con
     document.hidden = true y el rAF congelado. Por eso el primer cuadro
     se dibuja a mano y se vuelve a dibujar al hacerse visible: si no,
     el lienzo se queda en blanco hasta que el usuario haga algo. */
  var last = 0;
  function loop(now) {
    requestAnimationFrame(loop);
    if (document.hidden) return;
    if (now - last < 33) return;
    last = now; draw(now);
  }
  function onScroll() {
    var h = Math.max(1, window.innerHeight * 1.5);
    target01 = Math.min(1, (window.scrollY || 0) / h);
    host.style.setProperty('--baja', String(target01));
  }

  resize(); onScroll();
  draw(performance.now());                    /* primer cuadro, pase lo que pase */
  addEventListener('visibilitychange', function () {
    if (!document.hidden) { tPrev = performance.now(); draw(tPrev); }
  });
  addEventListener('resize', function () { resize(); draw(performance.now()); }, { passive: true });
  addEventListener('scroll', onScroll, { passive: true });
  new MutationObserver(readPal).observe(document.documentElement, { attributes: true, attributeFilter: ['data-t'] });
  try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', readPal); } catch (e) {}
  requestAnimationFrame(loop);

  window.VALLE_PRESETS = {
    fondo:     { dist: 9.2, offX: 0.04, offY: -0.10, dim: 0.44, el: 0.68, exag: 0.34 },
    lado:      { dist: 10.4, offX: 0.22, offY: -0.16, dim: 0.86, el: 0.60, exag: 0.38 },
    escenario: { dist: 7.33, offX: 0.02, offY: -0.33, dim: 1.00, el: 0.52, exag: 0.42 }
  };
  window.VALLE_APPLY = function (nm) {
    var q = window.VALLE_PRESETS[nm]; if (!q) return;
    for (var key in q) P[key] = q[key];
  };
  window.VALLE_STATS = {
    instancias: N, columnas: G * G, casas: nCasas, luces: nLuz, arboles: nArb,
    orilla: (function () { var c = 0; for (var q = 0; q < G*G; q++) c += orilla[q]; return c; })(),
    calcomanias: { resplandor: nGlow, salpicaduras: nSalp, veleros: nBarco, parapentes: nPara },
    gotas: NLL,
    triangulos: N * (I.length / 3),
    gpuBytes: insArr.byteLength + exArr.byteLength + exArr2.byteLength +
              sArr.byteLength + s2Arr.byteLength + lls.byteLength,
    cuadros: function () { return cuadros; },
    llamadas: function () { return llamadas; }
  };
})();
