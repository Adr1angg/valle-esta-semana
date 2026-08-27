const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();
 const url='file://'+process.cwd()+'/index.html';
 const results=[];
 for(const j of [
   {n:'v-desktop',w:1280,h:1000,scheme:'light',full:true},
   {n:'v-phone',  w:390, h:844, scheme:'light',full:true},
   {n:'v-phone-dark',w:390,h:844,scheme:'dark',full:false},
   {n:'v-desk-dark',w:1280,h:900,scheme:'dark',full:false},
 ]){
   const ctx=await b.newContext({viewport:{width:j.w,height:j.h},colorScheme:j.scheme,deviceScaleFactor:2});
   const p=await ctx.newPage(); const errs=[];
   p.on('pageerror',e=>errs.push(String(e))); p.on('console',m=>{if(m.type()==='error')errs.push('console:'+m.text())});
   await p.goto(url,{waitUntil:'networkidle'});
   await p.waitForTimeout(900);
   const ov=await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   await p.screenshot({path:j.n+'.png',fullPage:j.full});
   results.push(`${j.n} | hOverflow:${ov} | errors:${errs.length?errs.join(' ; '):'none'}`);
   await ctx.close();
 }
 console.log(results.join('\n'));
 // behaviour
 const ctx=await b.newContext({viewport:{width:390,height:844}});
 const p=await ctx.newPage(); await p.goto(url,{waitUntil:'networkidle'});
 const vis=()=>p.$$eval('.ev,.bf',e=>e.filter(x=>!x.hidden).length);
 console.log('all:',await vis());
 await p.click('[data-day="sat"]'); await p.waitForTimeout(400);
 console.log('sat:',await vis(),'| tally:',(await p.textContent('#tally')).trim());
 await p.click('[data-cat="market"]'); await p.waitForTimeout(400);
 console.log('sat+market:',await vis(),'| hash:',await p.evaluate(()=>location.hash));
 const disabled=await p.$$eval('.chip[disabled]',e=>e.map(x=>x.textContent.trim().split(' ')[0]));
 console.log('disabled chips:',JSON.stringify(disabled));
 await p.click('[data-day="all"]'); await p.click('[data-cat="all"]'); await p.waitForTimeout(300);
 console.log('back to all:',await vis());
 // time-of-day auto, no button
 console.log('time attr:',await p.getAttribute('html','data-time'),'| timepill present:',await p.$('#timepill')!==null);
 // hash deep-link to an event
 await p.goto(url+'#ev-hongosto',{waitUntil:'networkidle'}); await p.waitForTimeout(400);
 console.log('target lead visible:',await p.$eval('#ev-hongosto',e=>!e.hidden));
 // wa link
 console.log('wa href ok:',await p.$eval('#wa',e=>e.href.startsWith('https://wa.me/?text=')));
 await b.close();
})();
