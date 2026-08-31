const fs=require('fs');
const T=require('./terrain.js');
const C=require('./casas.js');
const R=require('./calles.js');
let scene=fs.readFileSync('scene.js','utf8')
  .replace('__H__', T.H)
  .replace('__WRLE__', T.WRLE)
  .replace('__CASAS__', C.CASAS)
  .replace('__CALLES__', R.CALLES);
if(/__H__|__WRLE__|__CASAS__|__CALLES__/.test(scene)) throw new Error('placeholder left');
let page=fs.readFileSync('demo.template.html','utf8').replace('__SCENE__', scene);
fs.writeFileSync('demo.html', page);
fs.writeFileSync('escena.js', scene);
const gz=require('zlib').gzipSync(Buffer.from(scene)).length;
console.log('scene block   ', scene.length.toLocaleString(), 'bytes  ->', (gz/1024).toFixed(1)+' KB gzipped');
console.log('demo page     ', page.length.toLocaleString(), 'bytes');
