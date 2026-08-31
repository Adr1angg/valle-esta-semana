/* ══════════════════════════════════════════════════════════════════
   Esta semana en Valle · escena 3D — diorama de vóxeles del lago
   WebGL a mano. Sin dependencias. Una sola llamada de dibujo.

   Terreno   Copernicus/SRTM · mosaicos terrarium AWS z12
             112 × 112 celdas · 142 m/celda · 1585–2686 m · lago a 1783 m
   Casas     7 810 edificios reales de OpenStreetMap, agregados por celda
   Calles    la red principal de OSM (sin las residenciales)
   Árboles   se derivan de la pendiente del propio terreno · 0 bytes
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
  var host = document.getElementById('escena3d');
  if (!host) return;

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

  /* ── shaders ─────────────────────────────────────────────────── */
  var VS = [
    'attribute vec3 aPos; attribute vec3 aNrm; attribute vec4 aInst; attribute vec4 aEx;',
    'uniform mat4 uVP; uniform vec2 uOff; uniform float uG, uBase;',
    /* uY, uNight y uGlow los usan los dos shaders: si la precision no
       coincide entre vertex y fragment, el programa no enlaza. */
    'uniform mediump float uY, uNight, uGlow;',
    'varying vec3 vN, vW; varying float vH, vKind, vAO, vLocal;',
    'void main(){',
    '  float cell = 2.0/uG;',
    '  float kind = floor(aInst.w * 0.5);',
    '  float lit = step(3.5, kind);',
    '  float grow = 1.0 + uNight * 0.70 * lit + uGlow * 2.2 * lit;',
    '  float w = aEx.z * grow, hh = aEx.w * (1.0 + uNight * 0.55 * lit + uGlow * 1.5 * lit);',
    '  float cx = aInst.x + 0.5 + aEx.x;',
    '  float cz = aInst.y + 0.5 + aEx.y;',
    '  float x = -1.0 + (cx + (aPos.x-0.5)*w) * cell;',
    '  float z = -1.0 + (cz + (aPos.z-0.5)*w) * cell;',
    '  float top = aInst.z*uY;',
    '  float prop = step(1.5, kind) * step(kind, 4.5);',   /* 2 arbol · 3-4 casa */
    '  float y0 = mix(-uBase, top, prop);',
    '  float y1 = mix(top, top + hh, prop);',
    '  float y = mix(y0, y1, aPos.y);',
    '  vN = aNrm; vW = vec3(x,y,z); vH = aInst.z; vLocal = aPos.y;',
    '  vKind = kind; vAO = aInst.w - kind*2.0;',
    '  vec4 cp = uVP * vec4(x,y,z,1.0);',
    '  cp.xy += uOff * cp.w;',
    '  gl_Position = cp;',
    '}'
  ].join('\n');

  var FS = [
    'precision mediump float;',
    'varying vec3 vN, vW; varying float vH, vKind, vAO, vLocal;',
    'uniform vec3 uSun, uWarm, uSky, uBounce, uGround;',
    'uniform vec3 cLow, cMid, cHigh, cWater, cSoil, cTree, cCasa, cLampa, cCalle;',
    'uniform float uT, uFog, uBands, uDim, uAmb, uY;',
    'uniform mediump float uNight, uGlow;',
    'void main(){',
    '  if (uGlow > 0.5) { gl_FragColor = vec4(cLampa, 0.019 * uNight); return; }',
    '  vec3 n = normalize(vN);',
    '  float lam = max(dot(n, uSun), 0.0);',
    '  bool topFace = n.y > 0.5;',
    '  vec3 base = cMid, emis = vec3(0.0);',
    '  float gloss = 0.0, plano = 0.0;',
    /* Orden importa: los tipos son 0 tierra · 1 agua · 2 arbol · 3 casa ·
       4 casa con luz · 5 calle. Las comparaciones tienen que ser rangos
       cerrados, si no la calle (5) se cuela por la rama de las casas. */
    '  if (vW.y < -0.004) {',                                  /* zocalo · tierra cortada */
    '    float d = clamp(-vW.y*2.6, 0.0, 1.0);',
    '    base = mix(cSoil, cSoil*0.52, d);',
    '    float st = fract(vW.y*9.0);',
    '    base *= 1.0 - 0.16*smoothstep(0.0,0.09,st)*smoothstep(0.24,0.11,st);',
    '  } else if (vKind > 2.5 && vKind < 4.5) {',               /* casas */
    '    base = cCasa;',
    '    if (!topFace) base *= 0.86;',
    '    if (vKind > 3.5) {',
    '      float on = uNight;',
    '      base = mix(base, cLampa, on * 0.95);',
    '      emis = cLampa * on * (topFace ? 0.85 : 1.35);',
    '      plano = on;',
    '    }',
    '  } else if (vKind > 1.5 && vKind < 2.5) {',               /* arboles */
    '    base = mix(cTree, cTree*0.72, 1.0 - vLocal);',
    '    if (!topFace) base *= 0.88;',
    '  } else if (vKind > 0.5 && vKind < 1.5 && topFace) {',    /* agua */
    /* Dos ondas diagonales de baja frecuencia que se suman. Antes era
       sin(x)*sin(z) con un brillo pow(w,5): eso hacia una reticula de
       puntitos sobre el lago. Esto es oleaje suave, sin destellos. */
    '    float w = sin(vW.x*11.0 + vW.z*7.5 + uT*0.30)',
    '          + sin(vW.x*6.0 - vW.z*9.5 - uT*0.19);',
    '    base = cWater * (1.0 + 0.028*w);',
    '  } else if (vKind > 4.5 && topFace) {',                   /* calle */
    '    base = cCalle;',
    '  } else {',                                              /* terreno */
    '    float t = clamp(vH*1.10, 0.0, 1.0);',
    '    base = t < 0.46 ? mix(cLow, cMid, t/0.46) : mix(cMid, cHigh, (t-0.46)/0.54);',
    '    if (!topFace) {',
    '      float ty = clamp(vW.y / max(uY, 0.0001), 0.0, 1.0);',
    '      vec3 lado = ty < 0.46 ? mix(cLow, cMid, ty/0.46) : mix(cMid, cHigh, (ty-0.46)/0.54);',
    '      base = mix(cSoil*0.86, lado, clamp(vW.y*7.0, 0.0, 1.0));',
    '      float s = fract(vW.y*uBands);',
    '      base *= 1.0 - 0.18*smoothstep(0.0,0.07,s)*smoothstep(0.20,0.09,s);',
    '      base *= 0.80;',
    '    }',
    '  }',
    '  float hemi = n.y*0.5 + 0.5;',
    '  vec3 amb = mix(uBounce, uSky, hemi) * uAmb;',
    '  float occ = mix(0.58, 1.0, vAO);',
    '  occ = mix(1.0, occ, clamp(vW.y*9.0, 0.0, 1.0));',
    '  vec3 lit = base * (amb*occ + uWarm*lam*1.38);',
    '  vec3 col = mix(lit, base, plano) + emis;',
    '  col += uWarm * gloss * (1.0 - uNight*0.55);',
    '  col += uWarm * pow(lam, 26.0) * 0.09 * (1.0 - uNight);',
    '  float fog = clamp((vW.z*0.5 + 0.5) * uFog, 0.0, 0.7);',
    '  col = mix(col, uGround, fog * (1.0 - plano*0.7));',
    '  col = mix(uGround, col, mix(uDim, 1.0, plano*0.55));',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n');

  function sh(t, src) {
    var s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }
  var prog = gl.createProgram();
  try {
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
  } catch (e) { host.classList.remove('con-webgl'); host.classList.add('sin-webgl'); return; }
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    host.classList.remove('con-webgl'); host.classList.add('sin-webgl'); return;
  }

  /* ── geometría: cubo sin tapa inferior ───────────────────────── */
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

  /* ── instancias: terreno + casas + árboles ───────────────────── */
  var STEP = 0.42 / (LEV - 1);              /* un escalón de altura, aprox */
  function rnd(s) { var x = Math.sin(s * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); }

  var gT = [], gTx = [], gL = [], gLx = [], nCasas = 0, nArb = 0, nLuz = 0;
  function push(dst, dstx, a, b, c, d, e, f, g2, h2) {
    dst.push(a, b, c, d); dstx.push(e, f, g2, h2);
  }
  var inst = gT, extra = gTx;
  for (var jj = 0; jj < G; jj++) for (var ii = 0; ii < G; ii++) {
    var kk = jj * G + ii, agua = wv[kk], dens = cv2[kk], oc = Math.min(0.999, ao[kk]);
    var alt = hv[kk] / (LEV - 1);
    /* la columna del terreno */
    var tipo = agua ? 1 : (rd[kk] ? 5 : 0);
    inst.push(ii, jj, alt, tipo * 2 + oc);
    extra.push(0, 0, 1, 0);

    if (agua) continue;
    var seed = kk * 7.13 + 1.7;

    /* casas · una caja por cada nivel de densidad */
    for (var c = 0; c < dens; c++) {
      var r1 = rnd(seed + c * 3.1), r2 = rnd(seed + c * 3.1 + 41), r3 = rnd(seed + c * 3.1 + 77);
      var luz = rnd(seed + c * 3.1 + 113) < 0.58;
      var dst = luz ? gL : gT, dstx = luz ? gLx : gTx;
      push(dst, dstx, ii, jj, alt, (luz ? 4 : 3) * 2 + oc,
           (r1 - 0.5) * 0.56, (r2 - 0.5) * 0.56,
           0.20 + r3 * 0.14, STEP * (0.75 + r1 * 0.85));
      nCasas++; if (luz) nLuz++;
    }

    /* árboles · donde el terreno se empina y no hay caserío */
    var p = Math.min(0.9, Math.max(0, (slope[kk] - 0.55) / 2.6));
    p *= (1 - Math.min(1, dens / 2.2));
    if (rd[kk]) p *= 0.12;
    p *= 0.55 + 0.45 * rnd(kk * 0.031);
    var cuantos = rnd(seed + 211) < p ? (rnd(seed + 307) < p * 0.7 ? 2 : 1) : 0;
    for (var a2 = 0; a2 < cuantos; a2++) {
      var s1 = rnd(seed + a2 * 5.7 + 500), s2 = rnd(seed + a2 * 5.7 + 611), s3 = rnd(seed + a2 * 5.7 + 733);
      inst.push(ii, jj, alt, 2 * 2 + oc);
      extra.push((s1 - 0.5) * 0.62, (s2 - 0.5) * 0.62,
                 0.17 + s3 * 0.12, STEP * (0.85 + s1 * 1.05));
      nArb++;
    }
  }
  var luzInicio = gT.length / 4, luzTotal = gL.length / 4;
  var insArr = new Float32Array(gT.concat(gL)), exArr = new Float32Array(gTx.concat(gLx));
  var N = insArr.length / 4;
  gT = gTx = gL = gLx = inst = extra = null;

  var ibuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, ibuf);
  gl.bufferData(gl.ARRAY_BUFFER, insArr, gl.STATIC_DRAW);
  var ebuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, ebuf);
  gl.bufferData(gl.ARRAY_BUFFER, exArr, gl.STATIC_DRAW);

  var aPos = gl.getAttribLocation(prog, 'aPos'),
      aNrm = gl.getAttribLocation(prog, 'aNrm'),
      aIns = gl.getAttribLocation(prog, 'aInst'),
      aEx  = gl.getAttribLocation(prog, 'aEx');
  var U = {};
  ['uVP','uOff','uG','uY','uBase','uSun','uWarm','uSky','uBounce','uGround',
   'cLow','cMid','cHigh','cWater','cSoil','cTree','cCasa','cLampa','cCalle',
   'uT','uFog','uBands','uNight','uGlow','uDim','uAmb']
    .forEach(function (nm) { U[nm] = gl.getUniformLocation(prog, nm); });

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
  function look(e, c, up) {
    function nz(a) { var l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0]/l, a[1]/l, a[2]/l]; }
    var z = nz([e[0]-c[0], e[1]-c[1], e[2]-c[2]]);
    var x = nz([up[1]*z[2]-up[2]*z[1], up[2]*z[0]-up[0]*z[2], up[0]*z[1]-up[1]*z[0]]);
    var y = [z[1]*x[2]-z[2]*x[1], z[2]*x[0]-z[0]*x[2], z[0]*x[1]-z[1]*x[0]];
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

  var SOL = {
    dawn:  { az: 1.75, el: 0.24, warm: [1.00, 0.78, 0.58], sky: [0.56, 0.53, 0.58], night: 0 },
    day:   { az: 3.35, el: 0.88, warm: [1.00, 0.96, 0.86], sky: [0.62, 0.66, 0.63], night: 0 },
    dusk:  { az: 4.60, el: 0.22, warm: [1.00, 0.70, 0.46], sky: [0.50, 0.45, 0.50], night: 0 },
    night: { az: 0.75, el: 0.60, warm: [0.46, 0.55, 0.72], sky: [0.26, 0.30, 0.38], night: 1 }
  };

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pal = {}, prog01 = 0, target01 = 0, t0 = performance.now(), tPrev = t0, cuadros = 0;
  var foco = null, focoAmt = 0, focoTgt = 0, pines = [];
  var LAT0 = 19.115, LAT1 = 19.259, LON0 = -100.2261, LON1 = -100.0739;

  function esNoche() {
    var t = document.documentElement.getAttribute('data-t');
    if (t) return t === 'night';
    return matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function tod() {
    var t = document.documentElement.getAttribute('data-t');
    return SOL[t] ? t : (esNoche() ? 'night' : 'day');
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
    pal.low   = mixc(musgo, ink, 0.56);
    pal.mid   = mixc(olive, ink, 0.10);
    pal.high  = mixc(khaki, lima, 0.30);
    pal.water = mixc(agua,  ink, 0.30);
    pal.soil  = mixc(mixc(khaki, acc, 0.20), ink, 0.44);
    pal.tree  = mixc(musgo, ink, 0.70);
    pal.casa  = noche ? [0.20, 0.21, 0.21] : mixc(css('--lift', [0.98, 0.99, 0.95]), khaki, 0.22);
    pal.lampa = [1.00, 0.76, 0.36];
    pal.calle = mixc(mixc(khaki, [0.84, 0.81, 0.76], 0.55), ink, 0.40);
    pal.ground = css('--ground', noche ? [0.10, 0.14, 0.13] : [0.90, 0.92, 0.84]);
    if (noche) {
      ['low','mid','high','water','soil','tree'].forEach(function (nm) { pal[nm] = scl(pal[nm], 0.40); });
      pal.calle = scl(pal.calle, 0.30);   /* de noche la terracería casi desaparece */
    }
  }
  readPal();

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = host.clientWidth, h = host.clientHeight;
    cnv.width = Math.max(1, Math.round(w * dpr));
    cnv.height = Math.max(1, Math.round(h * dpr));
    cnv.style.width = w + 'px'; cnv.style.height = h + 'px';
  }

  var cur = SOL[tod()];
  var L = { az: cur.az, el: cur.el, warm: cur.warm.slice(), sky: cur.sky.slice(), night: cur.night };

  function draw(now) {
    cuadros++;
    var t = (now - t0) / 1000, tgt = SOL[tod()];
    /* suavizado por tiempo, no por cuadro: en un equipo lento la
       transición tarda lo mismo en segundos que en uno rápido */
    var dt = Math.min(0.25, Math.max(0.001, (now - tPrev) / 1000)); tPrev = now;
    var e = 1 - Math.pow(0.002, dt / 2.2);
    var eScroll = 1 - Math.pow(0.002, dt / 0.55);
    L.az += (tgt.az - L.az) * e; L.el += (tgt.el - L.el) * e;
    L.night += (tgt.night - L.night) * e;
    for (var q = 0; q < 3; q++) {
      L.warm[q] += (tgt.warm[q] - L.warm[q]) * e;
      L.sky[q]  += (tgt.sky[q]  - L.sky[q])  * e;
    }
    prog01 += (target01 - prog01) * eScroll;

    var asp = cnv.width / cnv.height;
    var fit = 1 + Math.max(0, 0.92 / asp - 1) * 0.458;
    var estrecho = Math.min(1, Math.max(0, (1.15 - asp) / 0.55));
    var az = P.az + prog01 * P.azScroll * (1 - 0.72 * focoAmt) + (reduce ? 0 : Math.sin(t * 0.055) * 0.045);
    var el = P.el + prog01 * 0.14;
    var d  = (P.dist + prog01 * 1.1 * (1 - 0.7 * focoAmt)) * fit;
    if (prog01 > 0.92) focoTgt = 0;                 /* sólo hasta el fondo se suelta */
    focoAmt += (focoTgt - focoAmt) * (1 - Math.pow(0.002, dt / 1.1));
    if (focoAmt < 0.004 && focoTgt === 0 && pines.length) { limpiaPines(); host.classList.remove('con-foco'); }
    d *= 1 - 0.22 * focoAmt;
    var tg = [ foco ? foco.x * focoAmt * 0.62 : 0,
               -0.03 + (foco ? foco.y * focoAmt * 0.45 : 0),
               foco ? foco.z * focoAmt * 0.62 : 0 ];
    var eye = [tg[0] + Math.sin(az) * Math.cos(el) * d,
               tg[1] + Math.sin(el) * d,
               tg[2] + Math.cos(az) * Math.cos(el) * d];
    var vp = mmul(persp(P.fov, asp, 0.1, 40), look(eye, tg, [0, 1, 0]));
    var ox = P.offX * (1 - estrecho), oy = P.offY + (-0.36 - P.offY) * estrecho;

    gl.viewport(0, 0, cnv.width, cnv.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.enableVertexAttribArray(aPos); gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 24, 0);
    gl.enableVertexAttribArray(aNrm); gl.vertexAttribPointer(aNrm, 3, gl.FLOAT, false, 24, 12);
    gl.bindBuffer(gl.ARRAY_BUFFER, ibuf);
    gl.enableVertexAttribArray(aIns); gl.vertexAttribPointer(aIns, 4, gl.FLOAT, false, 16, 0);
    ext.vertexAttribDivisorANGLE(aIns, 1);
    gl.bindBuffer(gl.ARRAY_BUFFER, ebuf);
    gl.enableVertexAttribArray(aEx); gl.vertexAttribPointer(aEx, 4, gl.FLOAT, false, 16, 0);
    ext.vertexAttribDivisorANGLE(aEx, 1);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

    gl.uniformMatrix4fv(U.uVP, false, vp);
    gl.uniform2f(U.uOff, ox, oy);
    gl.uniform1f(U.uG, G);
    gl.uniform1f(U.uY, P.exag);
    gl.uniform1f(U.uBase, P.base);
    gl.uniform1f(U.uT, t);
    gl.uniform1f(U.uFog, P.fog * (1 - estrecho * 0.42));
    gl.uniform1f(U.uBands, P.bands);
    gl.uniform1f(U.uAmb, P.amb);
    gl.uniform1f(U.uNight, L.night);
    gl.uniform1f(U.uDim, Math.max(0.05, (P.dim - prog01 * P.dimScroll * (1 - 0.80 * focoAmt)) * (1 + estrecho * 0.06)));
    gl.uniform3f(U.uSun, Math.sin(L.az) * Math.cos(L.el), Math.sin(L.el), Math.cos(L.az) * Math.cos(L.el));
    gl.uniform3fv(U.uWarm, L.warm);
    gl.uniform3fv(U.uSky, L.sky);
    gl.uniform3f(U.uBounce, L.sky[0] * 0.5, L.sky[1] * 0.5, L.sky[2] * 0.56);
    gl.uniform3fv(U.uGround, pal.ground);
    gl.uniform3fv(U.cLow, pal.low);
    gl.uniform3fv(U.cMid, pal.mid);
    gl.uniform3fv(U.cHigh, pal.high);
    gl.uniform3fv(U.cWater, pal.water);
    gl.uniform3fv(U.cSoil, pal.soil);
    gl.uniform3fv(U.cTree, pal.tree);
    gl.uniform3fv(U.cCasa, pal.casa);
    gl.uniform3fv(U.cLampa, pal.lampa);
    gl.uniform3fv(U.cCalle, pal.calle);

    gl.disable(gl.BLEND); gl.depthMask(true);
    gl.uniform1f(U.uGlow, 0);
    ext.drawElementsInstancedANGLE(gl.TRIANGLES, I.length, gl.UNSIGNED_SHORT, 0, N);

    /* segundo pase: el resplandor de las ventanas.
       Se suman entre sí, así que donde hay calle apretada brilla más. */
    if (L.night > 0.05 && luzTotal) {
      gl.uniform1f(U.uGlow, 1);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.depthMask(false);
      gl.bindBuffer(gl.ARRAY_BUFFER, ibuf);
      gl.vertexAttribPointer(aIns, 4, gl.FLOAT, false, 16, luzInicio * 16);
      gl.bindBuffer(gl.ARRAY_BUFFER, ebuf);
      gl.vertexAttribPointer(aEx, 4, gl.FLOAT, false, 16, luzInicio * 16);
      ext.drawElementsInstancedANGLE(gl.TRIANGLES, I.length, gl.UNSIGNED_SHORT, 0, luzTotal);
      gl.depthMask(true); gl.disable(gl.BLEND);
      gl.bindBuffer(gl.ARRAY_BUFFER, ibuf); gl.vertexAttribPointer(aIns, 4, gl.FLOAT, false, 16, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, ebuf); gl.vertexAttribPointer(aEx, 4, gl.FLOAT, false, 16, 0);
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
           (215 / d).toFixed(1) + 'vmin',
           (0.9 * Math.max(0.05, P.dim - prog01 * P.dimScroll)).toFixed(2));
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
    instancias: N, columnas: G * G, casas: nCasas, luces: nLuz, arboles: nArb, luzInicio: luzInicio,
    triangulos: N * (I.length / 3), gpuBytes: insArr.byteLength + exArr.byteLength,
    cuadros: function () { return cuadros; }
  };
})();
