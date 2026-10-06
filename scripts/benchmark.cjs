const {chromium}=require('playwright');
const fs=require('fs');
(async()=>{
const browser=await chromium.launch({channel:process.platform==='win32'?'chrome':undefined,headless:true});
const results=[];
for(const width of [1440,390])for(let run=1;run<=3;run++){
const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>{window.bench={lcp:0,cls:0};new PerformanceObserver(l=>{for(const e of l.getEntries())window.bench.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.bench.cls+=e.value}).observe({type:'layout-shift',buffered:true});});
const cdp=await context.newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
await page.goto(process.env.BMAI_BASE_URL||'http://127.0.0.1:8766/',{waitUntil:'load'});await page.waitForTimeout(2500);
results.push({width,run,...await page.evaluate(()=>{const n=performance.getEntriesByType('navigation')[0];const r=performance.getEntriesByType('resource');return{domReadyMs:Math.round(n.domContentLoadedEventEnd),loadMs:Math.round(n.loadEventEnd),fcpMs:Math.round(performance.getEntriesByName('first-contentful-paint')[0]?.startTime||0),lcpMs:Math.round(window.bench.lcp),cls:window.bench.cls,requests:r.length+1,transferBytes:r.reduce((s,e)=>s+e.transferSize,0)+n.transferSize}}),errors});await context.close();
}
await browser.close();const report={environment:'Localhost, Chrome, cold cache, no throttling; three runs per viewport. Not production measurements.',createdAt:new Date().toISOString(),results};fs.writeFileSync('qa/benchmark-results.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
