const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch(); const url='file://'+process.cwd()+'/index.html';
 let fail=0;
 for(const j of [
   {n:'v-desktop',w:1280,h:1000,scheme:'light',full:true},
   {n:'v-phone',  w:390, h:844, scheme:'light',full:true},
   {n:'v-phone-dark',w:390,h:844,scheme:'dark',full:false},
   {n:'v-desk-dark',w:1280,h:900,scheme:'dark',full:false},
 ]){
   const ctx=await b.newContext({viewport:{width:j.w,height:j.h},colorScheme:j.scheme,deviceScaleFactor:2});
   const p=await ctx.newPage(); const errs=[];
   p.on('pageerror',e=>errs.push('JS:'+e));
   await p.goto(url,{waitUntil:'networkidle'}); await p.waitForTimeout(1400);
   const ov=await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   await p.screenshot({path:j.n+'.png',fullPage:j.full});
   if(ov!==0||errs.length){fail++;}
   console.log(`${j.n} | hOverflow:${ov} | jsErrors:${errs.length?errs.join(' ; '):'none'}`);
   await ctx.close();
 }
 const ctx=await b.newContext({viewport:{width:1280,height:900}});
 const p=await ctx.newPage(); await p.goto(url,{waitUntil:'networkidle'}); await p.waitForTimeout(600);
 const stats=await p.evaluate(()=>{
   const anchors=[...document.querySelectorAll('.blk')].map(a=>a.getAttribute('href'));
   const broken=anchors.filter(h=>!document.querySelector(h));
   return {
     days:document.querySelectorAll('.day').length,
     entries:document.querySelectorAll('.ev').length,
     always:document.querySelectorAll('.al').length,
     weekCells:document.querySelectorAll('.wd').length,
     calBlocks:anchors.length,
     brokenAnchors:broken,
     chips:document.querySelectorAll('.chip').length,
     time:document.documentElement.getAttribute('data-time'),
     updated:(document.getElementById('upd')||{}).textContent
   };
 });
 console.log('STRUCTURE:',JSON.stringify(stats));
 if(stats.brokenAnchors.length){console.log('!! broken calendar links');fail++;}
 if(stats.chips!==0){console.log('!! filter chips still present');fail++;}
 await b.close();
 console.log(fail? `FAILED (${fail})` : 'ALL CHECKS PASSED');
 process.exit(fail?1:0);
})();
