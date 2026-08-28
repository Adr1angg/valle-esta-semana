const {chromium}=require('playwright');
const P=['index.html','cdmx.html'];
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  let fail=0;
  for(const scheme of ['light','dark']){
    for(const vp of [{width:390,height:844,n:'phone'},{width:1280,height:900,n:'desk'}]){
      const ctx=await b.newContext({viewport:{width:vp.width,height:vp.height},colorScheme:scheme,
        deviceScaleFactor:1});
      for(const f of P){
        const pg=await ctx.newPage();
        const errs=[]; pg.on('pageerror',e=>errs.push(String(e)));
        pg.on('console',m=>{if(m.type()==='error'&&!/ERR_TUNNEL|ERR_NAME|Failed to load resource/.test(m.text()))errs.push('console: '+m.text())});
        await pg.goto('file:///root/work/v5/'+f,{waitUntil:'load'});
        await pg.waitForTimeout(1500);
        const r=await pg.evaluate(()=>({
          ox: document.documentElement.scrollWidth-document.documentElement.clientWidth,
          bodyH: document.body.scrollHeight,
          evs: document.querySelectorAll('.card,.ent,.ev,.set').length,
          blocks: document.querySelectorAll('.blk,.pill,.agrow').length,
          sel: (document.querySelector('[aria-selected=true]')||{}).textContent||'',
          bad: [...document.querySelectorAll('a[href^="#"]')].filter(a=>a.getAttribute('href').length>1 && !document.getElementById(a.getAttribute('href').slice(1))).map(a=>a.getAttribute('href'))
        }));
        const bad = r.ox>0 || errs.length || r.bodyH<600;
        if(bad) fail++;
        console.log((bad?'FAIL ':'ok   ')+scheme.padEnd(5)+vp.n.padEnd(6)+f.padEnd(12)+
          ' ox='+r.ox+' h='+r.bodyH+' items='+r.evs+' blocks='+r.blocks+' sel="'+r.sel.replace(/\s+/g,'')+'"'+
          (r.bad.length?' deadAnchors='+JSON.stringify(r.bad):'')+(errs.length?'\n     '+errs.join('\n     '):''));
        await pg.close();
      }
      await ctx.close();
    }
  }
  await b.close();
  console.log(fail?('\n'+fail+' FAILURES'):'\nall pass');
  process.exit(fail?1:0);
})();
