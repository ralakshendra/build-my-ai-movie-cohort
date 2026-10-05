(function(){'use strict';
const marker="/build-my-ai-movie-cohort/";
const path=location.pathname;
const page=path.indexOf(marker)>=0?path.split(marker)[1]:"index.html";
const S=[["week-1-day-2","WEEK 1 · DAY 2","YouTube Masterclass","2026-10-04T20:00:00+05:30","resources/ai-faceless-youtube-masterclass.html","playbook.html"],["week-2-day-1","WEEK 2 · DAY 1","Build Your First AI Movie Short","2026-10-10T20:00:00+05:30","sessions/week-2-day-1/index.html","sessions/week-2-day-1/playbook.html"],["week-2-day-2","WEEK 2 · DAY 2","Photorealistic AI Advertisement","2026-10-11T20:00:00+05:30","sessions/week-2-day-2/index.html","sessions/week-2-day-2/playbook.html"],["week-3-day-1","WEEK 3 · DAY 1","Structured Brand Story Pipeline","2026-10-17T20:00:00+05:30","sessions/week-3-day-1/index.html","sessions/week-3-day-1/playbook.html"],["week-3-day-2","WEEK 3 · DAY 2","Build My AI Movie Cohort Week 3 Day 2 Session","2026-10-18T20:00:00+05:30",null,null],["week-4-day-1","WEEK 4 · DAY 1","Build My AI Movie Cohort Week 4 Day 1 Session","2026-10-24T20:00:00+05:30",null,null],["week-4-day-2","WEEK 4 · DAY 2","Build My AI Movie Cohort Week 4 Day 2 Session","2026-10-25T20:00:00+05:30",null,null],["week-5-day-1","WEEK 5 · DAY 1","Build My AI Movie Cohort Week 5 Day 1 Session","2026-10-31T20:00:00+05:30",null,null],["week-5-day-2","WEEK 5 · DAY 2","Build My AI Movie Cohort Week 5 Day 2 Session","2026-11-01T20:00:00+05:30",null,null],["week-6-day-1","WEEK 6 · DAY 1","Build My AI Movie Cohort Week 6 Day 1 Session","2026-11-07T20:00:00+05:30",null,null],["week-6-day-2","WEEK 6 · DAY 2","Build My AI Movie Cohort Week 6 Day 2 Session","2026-11-08T20:00:00+05:30",null,null],["week-7-day-1","WEEK 7 · DAY 1","Build My AI Movie Cohort Week 7 Day 1 Session","2026-11-14T20:00:00+05:30",null,null],["week-7-day-2","WEEK 7 · DAY 2","Build My AI Movie Cohort Week 7 Day 2 Session","2026-11-15T20:00:00+05:30",null,null],["week-8-day-1","WEEK 8 · DAY 1","Build My AI Movie Cohort Week 8 Day 1 Session","2026-11-21T20:00:00+05:30",null,null],["week-8-day-2","WEEK 8 · DAY 2","Build My AI Movie Cohort Week 8 Day 2 Session","2026-11-22T20:00:00+05:30",null,null]];
const existing={
"resources/ai-faceless-youtube-masterclass.html":"week-1-day-2","playbook.html":"week-1-day-2",
"sessions/week-2-day-1/index.html":"week-2-day-1","sessions/week-2-day-1/playbook.html":"week-2-day-1",
"sessions/week-2-day-2/index.html":"week-2-day-2","sessions/week-2-day-2/playbook.html":"week-2-day-2","sessions/week-2-day-2/homework.html":"week-2-day-2",
"sessions/week-3-day-1/index.html":"week-3-day-1","sessions/week-3-day-1/playbook.html":"week-3-day-1"
};
const infoMap={"resources/ai-faceless-youtube-masterclass.html":{week:"WEEK 1 · DAY 2",label:"SESSION GUIDE",stage:"BLUEPRINT"},"playbook.html":{week:"WEEK 1 · DAY 2",label:"PLAYBOOK",stage:"BLUEPRINT"},"sessions/week-2-day-1/index.html":{week:"WEEK 2 · DAY 1",label:"SESSION GUIDE",stage:"VISUAL WORLD"},"sessions/week-2-day-1/playbook.html":{week:"WEEK 2 · DAY 1",label:"PLAYBOOK",stage:"VISUAL WORLD"},"sessions/week-2-day-2/index.html":{week:"WEEK 2 · DAY 2",label:"SESSION GUIDE",stage:"MOTION"},"sessions/week-2-day-2/playbook.html":{week:"WEEK 2 · DAY 2",label:"PLAYBOOK",stage:"MOTION"},"sessions/week-2-day-2/homework.html":{week:"WEEK 2 · DAY 2",label:"HOMEWORK",stage:"MOTION"},"sessions/week-3-day-1/index.html":{week:"WEEK 3 · DAY 1",label:"SESSION GUIDE",stage:"STORY"},"sessions/week-3-day-1/playbook.html":{week:"WEEK 3 · DAY 1",label:"PLAYBOOK",stage:"STORY"}};
const info=infoMap[page];
function now(){return Date.now()}
function esc(v){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function itemById(id){return S.find(x=>x[0]===id)}
function current(){let c=null;for(const x of S){if(new Date(x[3]).getTime()<=now())c=x}return c}
function next(){return S.find(x=>new Date(x[3]).getTime()>now())}
function basePath(){return "../".repeat(page.split("/").length-1)}
function formatDate(iso){return new Intl.DateTimeFormat("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric",hour:"numeric",minute:"2-digit",hour12:true,timeZone:"Asia/Kolkata"}).format(new Date(iso))}
function countdown(iso){let d=new Date(iso).getTime()-now();if(d<=0)return"AVAILABLE NOW";const days=Math.floor(d/86400000);d%=86400000;const h=Math.floor(d/3600000);d%=3600000;const m=Math.floor(d/60000);d%=60000;const s=Math.floor(d/1000);return(days?days+"d ":"")+String(h).padStart(2,"0")+"h "+String(m).padStart(2,"0")+"m "+String(s).padStart(2,"0")+"s"}
function lockPage(){
const id=existing[page]||((page.match(/^sessions\/(week-\d+-day-\d+)\//)||[])[1]);if(!id)return;
const x=itemById(id);if(!x)return;
if(new Date(x[3]).getTime()<=now())return;
const hub=basePath()+"index.html";
document.documentElement.classList.add("bmai-locking");
document.body.className="bmai-locked-page";document.body.innerHTML='<main class="bmai-lock-screen"><div class="bmai-lock-card"><div class="bmai-lock-kicker">BUILD MY AI MOVIE · SESSION LOCKED</div><div class="bmai-lock-week">'+esc(x[1])+'</div><h1>'+esc(x[2])+'</h1><p>This session is scheduled to unlock at the official cohort start time.</p><div class="bmai-lock-time">'+esc(formatDate(x[3]))+' IST</div><div class="bmai-lock-count" id="bmaiLockCount">'+esc(countdown(x[3]))+'</div><div class="bmai-lock-note">The page will unlock automatically when the countdown reaches zero. You do not need to refresh.</div><a class="btn btn-primary" href="'+hub+'">RETURN TO STUDENT HUB</a></div></main>';
function tick(){const el=document.getElementById("bmaiLockCount");if(!el)return;el.textContent=countdown(x[3]);if(new Date(x[3]).getTime()<=now())location.reload()}tick();setInterval(tick,1000);
}
function chrome(){
if(!info||document.querySelector(".bmai-breadcrumb"))return;
const depth=page.split("/").length-1,base=basePath(),host=document.createElement("div"),crumb=document.createElement("div");
crumb.className="bmai-breadcrumb";
const hub=document.createElement("a");hub.href=base+"index.html";hub.textContent="HUB";
const sep1=document.createElement("span");sep1.textContent="›";sep1.style.color="#444";
const w=document.createElement("span");w.textContent=info.week;w.style.color="#777";
const sep2=sep1.cloneNode(true),cur=document.createElement("span");cur.className="current";cur.textContent=info.label;
crumb.append(hub,sep1,w,sep2,cur);
const doc=[...document.querySelectorAll('a[href*="docs.google.com/document"]')][0];
if(doc){const a=document.createElement("a");a.href=doc.href;a.target="_blank";a.rel="noopener noreferrer";a.textContent="HOMEWORK DOC ↗";a.style.marginLeft="auto";a.style.color="#ff6a00";crumb.append(a)}
const stage=document.createElement("div");stage.className="bmai-stage";
["IDEA","BLUEPRINT","CHARACTERS","VISUAL WORLD","STORY","SHOTS","MOTION","EDIT","MOVIE"].forEach(x=>{const el=document.createElement("span");el.textContent=x;if(x===info.stage)el.className="active";stage.append(el)});
const slate=document.createElement("div");slate.className="bmai-scene-strip";slate.innerHTML="<div><div class='bmai-scene-kicker'>"+info.week+" · "+info.label+"</div><div class='bmai-scene-title'>"+esc(document.title.replace(/\s*\|.*$/,""))+"</div><div class='bmai-scene-meta'>Build with intent. Generate with discipline. Keep the story consistent.</div></div><div class='bmai-scene-art' aria-hidden='true'><div class='bmai-scene-orb'></div></div>";
host.append(crumb,stage,slate);const header=document.querySelector("header");if(header)header.insertAdjacentElement("afterend",host);else document.body.prepend(host)
}
function progress(){
const boxes=[...document.querySelectorAll('.checklist input[type="checkbox"], input[type="checkbox"][data-index]')];if(!boxes.length)return;
const key="bmai-progress:"+page;let saved=[];try{saved=JSON.parse(localStorage.getItem(key)||"[]")}catch(e){}
boxes.forEach((b,i)=>{b.checked=!!saved[i];b.addEventListener("change",()=>{try{localStorage.setItem(key,JSON.stringify(boxes.map(x=>x.checked)))}catch(e){}update()})});
function update(){const done=boxes.filter(x=>x.checked).length,pct=Math.round(done/boxes.length*100);document.querySelectorAll(".bmai-progress-value").forEach(x=>x.textContent=pct+"%");document.querySelectorAll(".bmai-progress-fill").forEach(x=>x.style.width=pct+"%")}update()
}
function homepage(){
const cur=current(),nxt=next();
const title=document.querySelector(".bmai-studio-card h2"),desc=document.querySelector(".bmai-studio-card p.muted"),links=document.querySelectorAll(".bmai-studio-card .btn");
if(cur&&title){title.innerHTML=esc(cur[1])+"<br><span style='color:var(--bm-orange)'>"+esc(cur[2])+"</span>";if(desc)desc.textContent=cur[4]?"Your current cohort session. Build the next part of your movie in sequence, then complete the associated homework workspace.":"This session is now on the cohort schedule. Session materials will appear here as they are released.";if(links[0]){if(cur[4]){links[0].href=cur[4];links[0].textContent="CONTINUE SESSION →";links[0].style.display="inline-block"}else{links[0].removeAttribute("href");links[0].textContent="SESSION CONTENT COMING SOON";links[0].style.display="inline-block";links[0].classList.add("secondary")}}if(links[1]){if(cur[5]){links[1].href=cur[5];links[1].style.display="inline-block"}else{links[1].style.display="none"}}}
const status=document.querySelector(".bmai-studio-card .bmai-chip.active");if(status)status.textContent="CURRENT SESSION";
const sched=document.getElementById("bmaiSchedule");
if(sched)sched.innerHTML=S.map(x=>{const unlocked=new Date(x[3]).getTime()<=now(),c=cur&&cur[0]===x[0],n=nxt&&nxt[0]===x[0];const action=x[4]?('<a class="btn '+(unlocked?"":"secondary")+'" href="'+x[4]+'">'+(unlocked?"OPEN SESSION":"OPEN WHEN UNLOCKED")+'</a>'):'<span class="lock-label">'+(unlocked?"CONTENT COMING SOON":"LOCKED UNTIL "+formatDate(x[3]))+'</span>';return '<div class="session schedule-row '+(c?"is-current ":"")+(unlocked?"":"upcoming")+'"><div class="session-number">'+esc(x[1])+'</div><div><h3>'+esc(x[2])+'</h3><p>'+esc(formatDate(x[3]))+' IST'+(n?' · NEXT SESSION':'')+'</p></div><div class="actions">'+action+(n&&!unlocked?'<span class="countdown" data-unlock="'+x[3]+'">'+countdown(x[3])+'</span>':"")+'</div></div>'}).join("");
const cd=[...document.querySelectorAll(".countdown")];cd.forEach(el=>el.textContent=countdown(el.dataset.unlock))
}
function ready(){
if(existing[page]){lockPage();if(document.body.classList.contains("bmai-lock-screen"))return}
if(page==="index.html"||page===""){homepage();setInterval(homepage,1000)}
try{localStorage.setItem("bmai:lastPath",page)}catch(e){}
chrome();progress();document.querySelectorAll("a").forEach(a=>{if(a.href===location.href)a.setAttribute("aria-current","page")})
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ready);else ready();
})();