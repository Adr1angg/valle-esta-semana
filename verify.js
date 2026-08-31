/* Chequeo antes de publicar:  node verify.js
   Necesita Playwright. Si no está en la Mac, sube index.html, cdmx.html,
   data.js, historial.js y este archivo al contenedor y córrelo ahí
   (Chromium en /opt/pw-browsers/chromium, PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1;
   nunca corras `playwright install`).                                      */
const {chromium}=require('playwright');
const fs=require('fs'), path=require('path');
const P=['index.html','cdmx.html'];

/* la ruta del binario cambia entre maquinas: se prueban varias */
function chrome(){
  const cand=['/opt/pw-browsers/chromium'];
  try{ for(const d of fs.readdirSync('/opt/pw-browsers')){
    if(/^chromium-/.test(d)) cand.push('/opt/pw-browsers/'+d+'/chrome-linux/chrome'); } }catch(e){}
  for(const c of cand){ try{ if(fs.statSync(c)) return c; }catch(e){} }
  return undefined;              /* que Playwright use el suyo */
}

(async()=>{
  const b=await chromium.launch({executablePath:chrome(),
    args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  let fail=0;
  for(const scheme of ['light','dark']){
    for(const vp of [{width:390,height:844,n:'phone'},{width:1280,height:900,n:'desk'}]){
      const ctx=await b.newContext({viewport:{width:vp.width,height:vp.height},colorScheme:scheme,
        deviceScaleFactor:1});
      for(const f of P){
        const pg=await ctx.newPage();
        const errs=[]; pg.on('pageerror',e=>errs.push(String(e)));
        pg.on('console',m=>{if(m.type()==='error'&&!/ERR_TUNNEL|ERR_NAME|Failed to load resource/.test(m.text()))errs.push('console: '+m.text())});
        await pg.goto('file://'+path.resolve(__dirname,f),{waitUntil:'load'});
        await pg.waitForTimeout(2500);
        const r=await pg.evaluate(()=>({
          ox: document.documentElement.scrollWidth-document.documentElement.clientWidth,
          bodyH: document.body.scrollHeight,
          evs: document.querySelectorAll('.ww').length,
          nada: !!document.querySelector('#board .nada'),
          dias: document.querySelectorAll('.dia').length,
          rej: document.querySelectorAll('#rej .cd').length,
          siem: document.querySelectorAll('#siem .mn').length,
          escena: !!window.VALLE_STATS,
          respaldo: document.getElementById('escena3d')
            ? document.getElementById('escena3d').classList.contains('sin-webgl') : null,
          muertas: [...document.querySelectorAll('a[href^="#"]')]
            .filter(a=>a.getAttribute('href').length>1 && !document.getElementById(a.getAttribute('href').slice(1)))
            .map(a=>a.getAttribute('href'))
        }));
        const esIndex = f==='index.html';
        /* De lunes a miercoles la semana publicada ya termino y la tira
           ensena la semana de verdad, que puede venir vacia a proposito.
           Cero tarjetas NO es falla si el tablero puso su estado vacio;
           lo que no puede pasar es que el tablero se quede en blanco.   */
        const tableroOk = r.evs>0 || r.nada;
        const mal = r.ox>0 || errs.length>0 || r.bodyH<600 || r.muertas.length>0 ||
          (esIndex && (!tableroOk || r.dias!==7 || r.rej!==21 || r.siem===0 || !r.escena));
        if(mal) fail++;
        console.log((mal?'FAIL ':'ok   ')+scheme.padEnd(5)+vp.n.padEnd(6)+f.padEnd(12)+
          ' ox='+r.ox+' h='+r.bodyH+
          (esIndex?(' eventos='+r.evs+(r.evs?'':(r.nada?' (semana vacia, tablero ok)':' TABLERO EN BLANCO'))+
                    ' dias='+r.dias+' calendario='+r.rej+' siempre='+r.siem+
                    ' escena='+(r.escena?'si':'NO')):'')+
          (r.muertas.length?' ligasMuertas='+JSON.stringify(r.muertas):'')+
          (errs.length?'\n     '+errs.join('\n     '):''));
        await pg.close();
      }
      await ctx.close();
    }
  }
  await b.close();
  console.log(fail?('\n'+fail+' FALLAS'):'\ntodo pasa');
  process.exit(fail?1:0);
})();
