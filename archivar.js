#!/usr/bin/env node
/* Guarda los eventos de la semana en historial.js antes de que data.js se
   reescriba. historial.js sólo crece: es lo que rellena las semanas pasadas
   del calendario. Correr desde la raíz del repo:  node archivar.js          */
const fs = require('fs'), path = require('path');
const dir = __dirname;

function cargar(archivo, llave) {
  const p = path.join(dir, archivo);
  if (!fs.existsSync(p)) return null;
  global.window = {};
  delete require.cache[require.resolve(p)];
  require(p);
  return global.window[llave] || null;
}

const D = cargar('data.js', 'VS');
if (!D || !Array.isArray(D.events)) { console.error('data.js no trae events'); process.exit(1); }
const H = cargar('historial.js', 'VH') || { events: [] };

const clave = e => e.d + '|' + e.t;
const vistos = new Set(H.events.map(clave));
let nuevos = 0;
D.events.forEach(function (e) {
  if (!e.date || !e.title) return;
  const r = { d: e.date, t: e.title, c: e.cat || 'cultura' };
  if (vistos.has(clave(r))) return;
  vistos.add(clave(r)); H.events.push(r); nuevos++;
});

/* se poda a ~14 meses para que el archivo no crezca sin fin */
const corte = new Date(Date.now() - 430 * 864e5).toISOString().slice(0, 10);
const ev = H.events.filter(e => e.d >= corte)
  .sort((a, b) => a.d < b.d ? -1 : a.d > b.d ? 1 : (a.t < b.t ? -1 : 1));

const salida =
  '/* Historial de eventos ya pasados. Sólo crece: `archivar.js` le agrega la\n' +
  '   semana en curso antes de que la tarea del jueves reescriba data.js.\n' +
  '   Es lo que hace que el calendario no salga vacío hacia atrás.\n' +
  '   No editar a mano salvo para corregir algo. */\n' +
  'window.VH={events:[\n' +
  ev.map(e => '  {d:' + JSON.stringify(e.d) + ',t:' + JSON.stringify(e.t) + ',c:' + JSON.stringify(e.c) + '}').join(',\n') +
  '\n]};\n';
fs.writeFileSync(path.join(dir, 'historial.js'), salida);
console.log('historial: +' + nuevos + ' nuevos · ' + ev.length + ' en total');
