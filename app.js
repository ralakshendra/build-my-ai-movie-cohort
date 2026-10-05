(function(){'use strict';
const marker="/build-my-ai-movie-cohort/";
const path=location.pathname;
const page=path.indexOf(marker)>=0?path.split(marker)[1]:"index.html";

const S=[
{id:"week-1-day-2",week:"WEEK 1 · DAY 2",title:"YouTube Masterclass",number:2,start:"2026-10-04T20:00:00+05:30",end:null,stage:"BLUEPRINT",session:"resources/ai-faceless-youtube-masterclass.html",playbook:"playbook.html",homework:"https://docs.google.com/document/d/1ElXCXzfTup1HubGb0KDTIzqCkbPUBWxXwqm3_HDxFmw/edit?usp=sharing",description:"AI Faceless YouTube Channel Masterclass. Completed foundation session."},
{id:"week-2-day-1",week:"WEEK 2 · DAY 1",title:"Build Your First AI Movie Short",number:3,start:"2026-10-10T20:00:00+05:30",end:"2026-10-10T22:00:00+05:30",stage:"VISUAL WORLD",session:"sessions/week-2-day-1/index.html",playbook:"sessions/week-2-day-1/playbook.html",homework:"https://docs.google.com/document/d/1zdEzgOX22ghpxgmNN5yQeYLprWsAUX3R7zNxuMmJQwI",description:"Visual mastery, first short production, Filmora editing and channel launch."},
{id:"week-2-day-2",week:"WEEK 2 · DAY 2",title:"Photorealistic AI Advertisement",number:4,start:"2026-10-11T20:00:00+05:30",end:"2026-10-11T22:00:00+05:30",stage:"MOTION",session:"sessions/week-2-day-2/index.html",playbook:"sessions/week-2-day-2/playbook.html",homework:"https://docs.google.com/document/d/1jbIb9krXCTVpHprI3tqm9V6tHL-L5Sr1NCFYQ5WHNBA",description:"Create photorealistic product frames, build continuity and turn images into video."},
{id:"week-3-day-1",week:"WEEK 3 · DAY 1",title:"Structured Brand Story Pipeline",number:5,start:"2026-10-17T20:00:00+05:30",end:"2026-10-17T22:00:00+05:30",stage:"STORY",session:"sessions/week-3-day-1/index.html",playbook:"sessions/week-3-day-1/playbook.html",homework:"https://docs.google.com/document/d/1C9Txnwd_Fi2gqeHLZnfkGq5lEoqtA6WzqI4aGBCWFL4/edit?usp=sharing",description:"Build the character sheet, visual direction, screenplay and structured shot shortlist before deeper generation."},
{id:"week-3-day-2",week:"WEEK 3 · DAY 2",title:"Week 3 Day 2 Session",number:6,start:"2026-10-18T20:00:00+05:30",end:"2026-10-18T22:00:00+05:30",stage:"SHOTS",session:null,playbook:null,homework:null,description:"Session materials will appear here when they are released."},
{id:"week-4-day-1",week:"WEEK 4 · DAY 1",title:"Week 4 Day 1 Session",number:7,start:"2026-10-24T20:00:00+05:30",end:"2026-10-24T22:00:00+05:30",stage:null,session:null,playbook:null,homework:null,description:"Session materials will appear here when they are released."},
{id:"week-4-day-2",week:"WEEK 4 · DAY 2",title:"Week 4 Day 2 Session",number:8,start:"2026-10-25T20:00:00+05:30",end:"2026-10-25T22:00:00+05:30",stage:null,session:null,playbook:null,homework:null,description:"Session materials will appear here when they are released."},
{id:"week-5-day-1",week:"WEEK 5 · DAY 1",title:"Week 5 Day 1 Session",number:9,start:"2026-10-31T20:00:00+05:30",end:"2026-10-31T22:00:00+05:30",stage:null,session:null,playbook:null,homework:null,description:"Session materials will appear here when they are released."},
{id:"week-5-day-2",week:"WEEK 5 · DAY 2",title:"Week 5 Day 2 Session",number:10,start:"2026-11-01T20:00:00+05:30",end:"2026-11-01T22:00:00+05:30",stage:null,session:null,playbook:null,homework:null,description:"Session materials will appear here when they are released."},
{id:"week-6-day-1",week:"WEEK 6 · DAY 1",title:"Week 6 Day 1 Session",number:11,start:"2026-11-07T20:00:00+05:30",end:"2026-11-07T22:00:00+05:30",stage:null,session:null,playbook:null,homework:null,description:"Session materials will appear here when they are released."},
{id:"week-6-day-2",week:"WEEK 6 · DAY 2",title:"Week 6 Day 2 Session",number:12,start:"2026-11-08T20:00:00+05:30",end:"2026-11-08T22:00:00+05:30",stage:null,session:null,playbook:null,homework:null,description:"Session materials will appear here when they are released."},
{id:"week-7-day-1",week:"WEEK 7 · DAY 1",title:"Week 7 Day 1 Session",number:13,start:"2026-11-14T20:00:00+05:30",end:"2026-11-14T22:00:00+05:30",stage:null,session:null,playbook:null,homework:null,description:"Session materials will appear here when they are released."},
{id:"week-7-day-2",week:"WEEK 7 · DAY 2",title:"Week 7 Day 2 Session",number:14,start:"2026-11-15T20:00:00+05:30",end:"2026-11-15T22:00:00+05:30",stage:null,session:null,playbook:null,homework:null,description:"Session materials will appear here when they are released."},
{id:"week-8-day-1",week:"WEEK 8 · DAY 1",title:"Week 8 Day 1 Session",number:15,start:"2026-11-21T20:00:00+05:30",end:"2026-11-21T22:00:00+05:30",stage:null,session:null,playbook:null,homework:null,description:"Session materials will appear here when they are released."},
{id:"week-8-day-2",week:"WEEK 8 · DAY 2",title:"Week 8 Day 2 Session",number:16,start:"2026-11-22T20:00:00+05:30",end:"2026-11-22T22:00:00+05:30",stage:null,session:null,playbook:null,homework:null,description:"Session materials will appear here when they are released."}
];

const routeMap={
"resources/ai-faceless-youtube-masterclass.html":"week-1-day-2","playbook.html":"week-1-day-2",
"sessions/week-2-day-1/index.html":"week-2-day-1","sessions/week-2-day-1/playbook.html":"week-2-day-1",
"sessions/week-2-day-2/index.html":"week-2-day-2","sessions/week-2-day-2/playbook.html":"week-2-day-2","sessions/week-2-day-2/homework.html":"week-2-day-2",
"sessions/week-3-day-1/index.html":"week-3-day-1","sessions/week-3-day-1/playbook.html":"week-3-day-1"
};
const labels={};
Object.keys(routeMap).forEach(p=>{labels[p]=p.endsWith("/homework.html")?"HOMEWORK":p.endsWith("/playbook.html")?"PLAYBOOK":"SESSION GUIDE"});
const stages=["IDEA","BLUEPRINT","CHARACTERS","VISUAL WORLD","STORY","SHOTS","MOTION","EDIT","REVIEW","MOVIE"];

function now(){return Date.now()}
function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function byId(id){return S.find(x=>x.id===id)}
function pageId(){if(routeMap[page])return routeMap[page];const m=page.match(/^sessions\/(week-\d+-day-\d+)(?:\/|$)/);return m?m[1]:null}
function pageSession(){const id=pageId();return id?byId(id):null}
function current(){let found=null;for(const x of S)if(new Date(x.start).getTime()<=now())found=x;return found}
function next(){return S.find(x=>new Date(x.start).getTime()>now())}
function basePath(){return "../".repeat(Math.max(0,page.split("/").length-1))}
function dateParts(iso){return new Intl.DateTimeFormat("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric",timeZone:"Asia/Kolkata"}).format(new Date(iso))}
function timeParts(iso){return new Intl.DateTimeFormat("en-IN",{hour:"numeric",minute:"2-digit",hour12:true,timeZone:"Asia/Kolkata"}).format(new Date(iso))}
function dateRange(x){const start=dateParts(x.start).replace(/ /g,"\u00a0"),time=timeParts(x.start),tz="\u00a0IST";return x.end?start+" · "+time+" to "+timeParts(x.end)+tz:start+" · "+time+tz}
function countdown(iso){let d=new Date(iso).getTime()-now();if(d<=0)return"AVAILABLE NOW";const days=Math.floor(d/86400000);d%=86400000;const h=Math.floor(d/3600000);d%=3600000;const m=Math.floor(d/60000);d%=60000;const s=Math.floor(d/1000);return(days?days+"d ":"")+String(h).padStart(2,"0")+"h "+String(m).padStart(2,"0")+"m "+String(s).padStart(2,"0")+"s"}
function sessionUrl(x){return x.session?basePath()+x.session:null}
function lockPage(){
const x=pageSession();if(!x)return false;
if(new Date(x.start).getTime()<=now())return false;
const hub=basePath()+"index.html";
document.documentElement.classList.add("bmai-locking");
document.body.className="bmai-locked-page";
document.body.innerHTML='<main class="bmai-lock-screen"><div class="bmai-lock-card"><div class="bmai-lock-kicker">BUILD MY AI MOVIE · SESSION LOCKED</div><div class="bmai-lock-week">'+esc(x.week)+'</div><div class="bmai-lock-date">'+esc(dateRange(x))+'</div><h1>'+esc(x.title)+'</h1><p>This session is scheduled to unlock at the official cohort start time.</p><div class="bmai-lock-count" id="bmaiLockCount">'+esc(countdown(x.start))+'</div><div class="bmai-lock-note">The page will unlock automatically when the countdown reaches zero. You do not need to refresh.</div><a class="btn btn-primary" href="'+hub+'">RETURN TO STUDENT HUB</a></div></main>';
function tick(){const el=document.getElementById("bmaiLockCount");if(!el)return;el.textContent=countdown(x.start);if(new Date(x.start).getTime()<=now())location.reload()}
tick();setInterval(tick,1000);return true
}
function applyBrandMark(){const iconHref=basePath()+"assets/brand/build-my-ai-movie-mark.svg";if(!document.querySelector("link[data-bmai-favicon]")){const icon=document.createElement("link");icon.rel="icon";icon.type="image/svg+xml";icon.href=iconHref;icon.setAttribute("data-bmai-favicon","true");document.head.appendChild(icon)}const brand=document.querySelector("header .brand");if(!brand||brand.querySelector(".bmai-brand-mark"))return;const mark=document.createElement("img");mark.className="bmai-brand-mark";mark.src=basePath()+"assets/brand/build-my-ai-movie-mark.svg";mark.alt="";mark.setAttribute("aria-hidden","true");brand.insertBefore(mark,brand.firstChild)}
function chrome(){
const x=pageSession();if(!x||document.querySelector(".bmai-breadcrumb"))return;
const base=basePath(),host=document.createElement("div"),crumb=document.createElement("div");const nav=document.querySelector("header .nav");if(nav&&!document.querySelector(".bmai-header-home")){const a=document.createElement("a");a.className="bmai-header-home";a.href=base+"index.html";a.setAttribute("aria-label","Back to Homepage");a.title="Back to Homepage";a.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"></path><path d="M5.5 9.5V21h13V9.5"></path><path d="M9.5 21v-6h5v6"></path></svg>';const brand=nav.querySelector(".brand");if(brand)brand.insertAdjacentElement("afterend",a);}
crumb.className="bmai-breadcrumb";
const hub=document.createElement("a");hub.href=base+"index.html";hub.textContent="HUB";
const sep1=document.createElement("span");sep1.textContent="›";
const w=document.createElement("span");w.textContent=x.week;w.className="crumb-week";
const sep2=sep1.cloneNode(true),cur=document.createElement("span");cur.className="current";cur.textContent=labels[page]||"SESSION";
crumb.append(hub,sep1,w,sep2,cur);
const docUrl=x.homework;
if(docUrl){const a=document.createElement("a");a.href=docUrl;a.target="_blank";a.rel="noopener noreferrer";a.textContent="HOMEWORK DOC ↗";a.className="bmai-homework-link";crumb.append(a)}
const stage=document.createElement("div");stage.className="bmai-stage";
stages.forEach(s=>{const el=document.createElement("span");el.textContent=s;if(s===x.stage)el.className="active";stage.append(el)});
const slate=document.createElement("div");slate.className="bmai-scene-strip";slate.innerHTML="<div><div class='bmai-scene-kicker'>"+esc(x.week)+" · "+esc(labels[page]||"SESSION")+"</div><div class='bmai-scene-title'>"+esc(x.title)+"</div><div class='bmai-scene-meta'>"+esc(dateRange(x))+" · Build with intent. Generate with discipline. Keep the story consistent.</div></div><div class='bmai-scene-art' aria-hidden='true'><div class='bmai-scene-orb'></div></div>";
host.append(crumb,stage,slate);const header=document.querySelector("header");if(header)header.insertAdjacentElement("afterend",host);else document.body.prepend(host)
}
function applyPageIdentity(){
 const p=location.pathname;
 let id="hub";
 if(p.includes("week-2-day-1"))id="w2d1";
 else if(p.includes("week-2-day-2"))id="w2d2";
 else if(p.includes("week-3-day-1"))id="w3d1";
 else if(p.includes("playbook"))id="playbook";
 else if(p.includes("resources"))id="resource";
 document.documentElement.dataset.bmaiPage=id;
}
function setupMobileHeader(){
document.querySelectorAll("header .nav,.topbar .nav,.top .nav").forEach(nav=>{
 const links=nav.querySelector(".nav-links")||nav.querySelector(":scope>div:last-child");
 if(!links||links.classList.contains("brand")||nav.querySelector(".bmai-mobile-menu"))return;
 if(links.querySelector("a")===null)return;
 const btn=document.createElement("button");btn.type="button";btn.className="bmai-mobile-menu";btn.setAttribute("aria-label","Open navigation");btn.setAttribute("aria-expanded","false");btn.innerHTML='<span></span><span></span><span></span>';
 btn.addEventListener("click",()=>{
   const open=nav.classList.toggle("mobile-nav-open");btn.setAttribute("aria-expanded",String(open));btn.setAttribute("aria-label",open?"Close navigation":"Open navigation");
 });
 nav.appendChild(btn);
});
}
function setupScrollControls(){
const targets=[...document.querySelectorAll(".bmai-production-pipeline,.sc,.scroll,.flow,[data-horizontal-scroll],table")];
targets.forEach(el=>{
 if(el.closest(".bmai-scroll-shell")||el.dataset.scrollEnhanced==="true")return;
 const shell=document.createElement("div");shell.className="bmai-scroll-shell";shell.dataset.scrollEnhanced="true";
 const viewport=document.createElement("div");viewport.className="bmai-scroll-viewport";
 el.parentNode.insertBefore(shell,el);viewport.appendChild(el);shell.appendChild(viewport);
 const prev=document.createElement("button"),next=document.createElement("button");
 prev.type="button";next.type="button";prev.className="bmai-scroll-control prev";next.className="bmai-scroll-control next";
 prev.setAttribute("aria-label","Scroll left");next.setAttribute("aria-label","Scroll right");prev.innerHTML="‹";next.innerHTML="›";
 shell.append(prev,next);
 const sync=()=>{const max=Math.max(0,viewport.scrollWidth-viewport.clientWidth);shell.classList.toggle("has-overflow",max>4);shell.classList.toggle("at-start",viewport.scrollLeft<=4);shell.classList.toggle("at-end",viewport.scrollLeft>=max-4)};
 prev.addEventListener("click",()=>viewport.scrollBy({left:-Math.max(220,viewport.clientWidth*.72),behavior:"smooth"}));
 next.addEventListener("click",()=>viewport.scrollBy({left:Math.max(220,viewport.clientWidth*.72),behavior:"smooth"}));
 viewport.addEventListener("scroll",sync,{passive:true});window.addEventListener("resize",sync);sync();
});
}
function progress(){
const boxes=[...document.querySelectorAll('.checklist input[type="checkbox"], input[type="checkbox"][data-index]')];if(!boxes.length)return;
const key="bmai-progress:"+page;let saved=[];try{saved=JSON.parse(localStorage.getItem(key)||"[]")}catch(e){}
boxes.forEach((b,i)=>{b.checked=!!saved[i];b.addEventListener("change",()=>{try{localStorage.setItem(key,JSON.stringify(boxes.map(x=>x.checked)))}catch(e){}update()})});
function update(){const done=boxes.filter(x=>x.checked).length,pct=Math.round(done/boxes.length*100);document.querySelectorAll(".bmai-progress-value").forEach(x=>x.textContent=pct+"%");document.querySelectorAll(".bmai-progress-fill").forEach(x=>x.style.width=pct+"%")}update()
}
function renderCard(x){
const cur=current(),unlocked=new Date(x.start).getTime()<=now(),isCurrent=cur&&cur.id===x.id,isNext=next()&&next().id===x.id;
let action;
if(x.session)action='<a class="btn '+(unlocked?"":"secondary")+'" href="'+esc(sessionUrl(x))+'">'+(unlocked?"OPEN SESSION":"VIEW LOCKED PAGE")+'</a>';
else action='<span class="lock-label">'+(unlocked?"CONTENT COMING SOON":"CONTENT NOT RELEASED")+'</span>';
const status=isCurrent?"CURRENT SESSION":unlocked?"AVAILABLE NOW":"UPCOMING";
const extra=isNext&&!unlocked?'<span class="countdown" data-unlock="'+esc(x.start)+'">'+countdown(x.start)+'</span>':"";
return '<article class="session schedule-row '+(isCurrent?"is-current ":"")+(unlocked?"":"upcoming")+'"><div class="session-rail"><div class="session-number">'+esc(x.week)+'</div><div class="session-date">'+esc(dateRange(x))+'</div></div><div><div class="session-status">'+status+(isNext&&!isCurrent?" · NEXT":"")+'</div><h3>'+esc(x.title)+'</h3><p>'+esc(x.description)+'</p></div><div class="actions">'+action+extra+'</div></article>'
}
function homepage(){
if(!(page==="index.html"||page===""))return;
const cur=current(),nxt=next();
const title=document.querySelector(".bmai-studio-card h2"),desc=document.querySelector(".bmai-studio-card p.muted"),links=document.querySelectorAll(".bmai-studio-card .btn");
if(cur&&title){
title.innerHTML=esc(cur.week)+"<br><span>"+esc(cur.title)+"</span>";
if(desc)desc.textContent=cur.session?"Your current cohort session. Build the next part of your movie in sequence, then complete the associated homework workspace.":"This session is now on the cohort schedule. Session materials will appear here as they are released.";
const status=document.querySelector(".bmai-studio-card .bmai-chip.active");if(status)status.textContent=cur.session?"CURRENT SESSION":"CURRENT · CONTENT COMING SOON";
const stageChip=document.querySelector(".bmai-studio-card .bmai-chip[data-session-stage]");if(stageChip)stageChip.textContent=cur.stage||"PRODUCTION";const stageTitle=document.getElementById("bmaiCurrentStage");if(stageTitle)stageTitle.textContent=cur.stage||"PRODUCTION";
const numberChip=document.querySelector(".bmai-studio-card .bmai-chip[data-session-number]");if(numberChip)numberChip.textContent="SESSION "+String(cur.number).padStart(2,"0");
if(links[0]){if(cur.session){links[0].href=sessionUrl(cur);links[0].textContent="CONTINUE SESSION →";links[0].style.display="inline-block";links[0].classList.remove("secondary")}else{links[0].removeAttribute("href");links[0].textContent="SESSION CONTENT COMING SOON";links[0].style.display="inline-block";links[0].classList.add("secondary")}}
if(links[1]){if(cur.playbook){links[1].href=basePath()+cur.playbook;links[1].style.display="inline-block"}else links[1].style.display="none"}
}
const stageWrap=document.querySelector(".bmai-production-pipeline");
if(stageWrap){stageWrap.innerHTML=stages.map((s,i)=>'<div class="stage '+(cur&&cur.stage===s?"active":"")+'">'+String(i+1).padStart(2,"0")+'<br>'+s+'</div>').join("")}
const sched=document.getElementById("bmaiSchedule");
if(sched)sched.innerHTML=S.map(renderCard).join("");
const cd=[...document.querySelectorAll(".countdown")];cd.forEach(el=>el.textContent=countdown(el.dataset.unlock));
const nextBox=document.getElementById("bmaiNextSession");
if(nextBox){if(nxt){nextBox.innerHTML="<span>NEXT SESSION</span><strong>"+esc(nxt.week)+" · "+esc(nxt.title)+"</strong><small>"+esc(dateRange(nxt))+" · Unlocks in "+esc(countdown(nxt.start))+"</small>"}else nextBox.innerHTML="<span>COHORT COMPLETE</span><strong>All scheduled sessions are available.</strong>"}}
function siteUtilities(){
const old=document.getElementById("bmai-site-utilities");if(old)old.remove();
const wrap=document.createElement("div");wrap.id="bmai-site-utilities";wrap.innerHTML='<button class="bmai-float-btn bmai-top-btn" type="button" aria-label="Scroll to top" title="Scroll to top"><span class="bmai-icon" aria-hidden="true">↑</span><span>TOP</span></button>';
document.body.appendChild(wrap);
const top=wrap.querySelector(".bmai-top-btn");
const toggle=()=>top.classList.toggle("is-visible",window.scrollY>500);
window.addEventListener("scroll",toggle,{passive:true});toggle();
top.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
}
function enhanceNextButton(){
const x=pageSession();if(!x)return;
const index=S.findIndex(s=>s.id===x.id);const nxt=index>=0?S[index+1]:null;
document.querySelectorAll('button').forEach(btn=>{
if(!/CONTINUE TO NEXT SESSION/i.test(btn.textContent||""))return;
if(!nxt)return;
const a=document.createElement("a");a.className=btn.className;a.textContent=nxt.session?"CONTINUE TO NEXT SESSION →":"RETURN TO STUDENT HUB";
a.href=nxt.session?sessionUrl(nxt):basePath()+"index.html";
if(!nxt.session)a.classList.add("secondary");
btn.replaceWith(a);
})
}
function ready(){
if(lockPage())return;
applyBrandMark();
if(page==="index.html"||page===""){homepage();setInterval(homepage,1000)}
try{localStorage.setItem("bmai:lastPath",page)}catch(e){}
chrome();progress();enhanceNextButton();applyPageIdentity();siteUtilities();setupMobileHeader();setupScrollControls();
document.querySelectorAll("a").forEach(a=>{if(a.href===location.href)a.setAttribute("aria-current","page")})
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ready);else ready();
})();