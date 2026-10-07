(function(){'use strict';
const siteRoot=new URL('../',document.querySelector('script[src*="library/site.js"]').src);
const page=location.pathname.startsWith(siteRoot.pathname)?location.pathname.slice(siteRoot.pathname.length)||'index.html':'index.html';

const S=window.BMAI_SESSIONS;



function isUnlocked(x){return !!x&&(window.BMAI_LOCKS_PAUSED_FOR_REVIEW||new Date(x.start).getTime()<=now())}
function sessionIdFromHref(href){
 try{
  const u=new URL(href,location.href);
  const markerIndex=u.pathname.startsWith(siteRoot.pathname)?0:-1;
  if(u.origin===location.origin){
   const rel=(markerIndex>=0?u.pathname.slice(siteRoot.pathname.length):u.pathname).replace(/^\/+|\/+$/g,"");
   const matched=S.find(x=>[x.session,x.playbook,x.homeworkPage].filter(Boolean).includes(rel));
   if(matched)return matched.id;
   const sessionPath=rel.match(/^sessions\/(week-\d+-day-\d+)(?:\/|$)/);
   if(sessionPath)return sessionPath[1];
  }
  const external=u.href.replace(/\/$/,"");
  const docId=u.hostname==="docs.google.com"?u.pathname.match(/^\/document\/d\/([^/]+)/)?.[1]:null;
  const matched=S.find(x=>x.homework&&(docId?new URL(x.homework).pathname.includes("/document/d/"+docId):x.homework.replace(/\/$/,"")===external));
  return matched?matched.id:null
 }catch(e){return null}
}

const stages=["IDEA","BLUEPRINT","CHARACTERS","VISUAL WORLD","STORY","SHOTS","MOTION","EDIT","REVIEW","MOVIE"];

function now(){return Date.now()}
function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function byId(id){return S.find(x=>x.id===id)}
function pageId(){return document.body.dataset.sessionId||null}
function pageSession(){const id=pageId();return id?byId(id):null}
function pageLabel(){return ({session:"SESSION GUIDE",playbook:"PLAYBOOK",homework:"HOMEWORK",resource:"RESOURCE"})[document.body.dataset.pageType]||"SESSION GUIDE"}
function current(){let found=null;for(const x of S)if(new Date(x.start).getTime()<=now())found=x;return found}
function next(){return S.find(x=>new Date(x.start).getTime()>now())}
function basePath(){return siteRoot.href}
function dateParts(iso){return new Intl.DateTimeFormat("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric",timeZone:"Asia/Kolkata"}).format(new Date(iso))}
function timeParts(iso){return new Intl.DateTimeFormat("en-IN",{hour:"numeric",minute:"2-digit",hour12:true,timeZone:"Asia/Kolkata"}).format(new Date(iso))}
function dateRange(x){const start=dateParts(x.start).replace(/ /g,"\u00a0"),time=timeParts(x.start),tz="\u00a0IST";return x.end?start+" · "+time+" to "+timeParts(x.end)+tz:start+" · "+time+tz}
function countdown(iso){let d=new Date(iso).getTime()-now();if(d<=0)return"AVAILABLE NOW";const days=Math.floor(d/86400000);d%=86400000;const h=Math.floor(d/3600000);d%=3600000;const m=Math.floor(d/60000);d%=60000;const s=Math.floor(d/1000);return(days?days+"d ":"")+String(h).padStart(2,"0")+"h "+String(m).padStart(2,"0")+"m "+String(s).padStart(2,"0")+"s"}
function sessionUrl(x){return x.session?basePath()+x.session:null}
function lockPage(){
const x=pageSession();if(!x)return false;
if(isUnlocked(x))return false;
const hub=basePath()+"index.html";
document.documentElement.classList.add("bmai-locking");
document.querySelectorAll("body > *").forEach(el=>{if(!el.classList.contains("bmai-global-header")&&!el.classList.contains("bmai-skip-link")&&!el.classList.contains("studio-site-footer"))el.remove()});
document.body.className="bmai-locked-page";
const skip=document.querySelector(".bmai-skip-link")||document.createElement("a");
skip.className="bmai-skip-link";
skip.href="#main-content";
skip.textContent="Skip to main content";
if(!skip.isConnected)document.body.appendChild(skip);
const main=document.createElement("main");
main.id="main-content";
main.className="bmai-lock-screen";
main.innerHTML='<div class="bmai-lock-card"><div class="bmai-lock-kicker">BUILD MY AI MOVIE · SESSION LOCKED</div><div class="bmai-lock-week">'+esc(x.week)+'</div><div class="bmai-lock-date">'+esc(dateRange(x))+'</div><h1>'+esc(x.title)+'</h1><p>This session is scheduled to unlock at the official cohort start time.</p><div class="bmai-lock-count" id="bmaiLockCount">'+esc(countdown(x.start))+'</div><div class="bmai-lock-note">The page will unlock automatically when the countdown reaches zero. You do not need to refresh.</div><a class="btn btn-primary bmai-header-home" aria-label="Back to home" title="Back to home" href="'+hub+'"><svg aria-hidden="true" fill="none" height="20" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" width="20"><path d="M3 10 12 3l9 7M5 9v12h5v-7h4v7h5V9"></path></svg></a></div>';
document.body.insertBefore(main,document.querySelector(".studio-site-footer"));
function tick(){const el=document.getElementById("bmaiLockCount");if(!el)return;el.textContent=countdown(x.start);if(new Date(x.start).getTime()<=now())location.reload()}
tick();setInterval(tick,1000);return true
}
function applyBrandMark(){const iconHref=basePath()+"assets/brand/build-my-ai-movie-mark.svg";if(!document.querySelector("link[data-bmai-favicon]")){const icon=document.createElement("link");icon.rel="icon";icon.type="image/svg+xml";icon.href=iconHref;icon.setAttribute("data-bmai-favicon","true");document.head.appendChild(icon)}const brand=document.querySelector("header .brand");if(!brand||brand.querySelector(".bmai-brand-mark"))return;const mark=document.createElement("img");mark.className="bmai-brand-mark";mark.src=basePath()+"assets/brand/build-my-ai-movie-mark.svg";mark.alt="";mark.setAttribute("aria-hidden","true");brand.insertBefore(mark,brand.firstChild)}
function enhanceLongText(){
 document.querySelectorAll('.code-block,pre').forEach((el,i)=>{
   if(el.closest('details')||el.dataset.bmaiLongText==='true')return;
   const text=(el.innerText||'').trim();
   if(text.length<500)return;
   const d=document.createElement('details');
   d.className='bmai-long-text';
   const s=document.createElement('summary');
   s.textContent=text.length>3000?'Open full prompt / text':'Open full text';
   el.parentNode.insertBefore(d,el);
   d.appendChild(s);
   d.appendChild(el);
   el.dataset.bmaiLongText='true';
 });
}
function applyPageIdentity(){
 document.documentElement.dataset.bmaiPage=document.body.dataset.pageId||"hub";
}
function setupMobileHeader(){
document.querySelectorAll("header .studio-nav,header .nav,.topbar .nav,.top .nav").forEach((nav,index)=>{
 const links=nav.querySelector(".nav-links,.bmai-session-top-actions");
 if(!links||links.classList.contains("brand")||nav.querySelector(".bmai-mobile-menu"))return;
 if(links.querySelector("a")===null)return;
 if(!links.id)links.id="bmai-mobile-nav-"+index;
 const btn=document.createElement("button");btn.type="button";btn.className="bmai-mobile-menu";btn.setAttribute("aria-label","Open navigation");btn.setAttribute("aria-expanded","false");btn.setAttribute("aria-controls",links.id);
 btn.innerHTML='<span></span><span></span><span></span>';
 const close=()=>{nav.classList.remove("mobile-nav-open");btn.setAttribute("aria-expanded","false");btn.setAttribute("aria-label","Open navigation")};
 btn.addEventListener("click",()=>{
   const open=nav.classList.toggle("mobile-nav-open");btn.setAttribute("aria-expanded",String(open));btn.setAttribute("aria-label",open?"Close navigation":"Open navigation");
   if(open){const first=links.querySelector("a");if(first)setTimeout(()=>first.focus(),0)}
 });
 links.querySelectorAll("a").forEach(a=>a.addEventListener("click",close));
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&nav.classList.contains("mobile-nav-open")){close();btn.focus()}});
 document.addEventListener("click",e=>{if(nav.classList.contains("mobile-nav-open")&&!nav.contains(e.target))close()});
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
const cur=current(),unlocked=isUnlocked(x),isCurrent=cur&&cur.id===x.id,isNext=next()&&next().id===x.id;
let action;
if(x.session)action='<a class="btn '+(unlocked?"":"secondary")+'" href="'+esc(sessionUrl(x))+'">'+(unlocked?"OPEN SESSION":"VIEW LOCKED PAGE")+'</a>';
else action='<span class="lock-label">'+(unlocked?"CONTENT COMING SOON":"CONTENT NOT RELEASED")+'</span>';
const status=isCurrent?"CURRENT SESSION":!x.session?"UNRELEASED":new Date(x.start).getTime()>now()?(unlocked?"REVIEW OPEN":"UPCOMING"):"AVAILABLE NOW";
const extra=!unlocked?'<span class="countdown" data-unlock="'+esc(x.start)+'">'+countdown(x.start)+'</span>':"";
return '<article class="session schedule-row '+(isCurrent?"is-current ":"")+(unlocked?"":"upcoming")+'"><div class="session-rail">'+window.BMAI_VISUALS.html(x,'session')+'<div class="session-number">'+esc(x.week)+'</div><div class="session-date">'+esc(dateRange(x))+'</div></div><div><div class="session-status">'+status+(isNext&&!isCurrent?" · NEXT":"")+'</div><h3>'+esc(x.title)+'</h3><p>'+esc(x.description)+'</p></div><div class="actions">'+action+extra+'</div></article>'
}
function homepage(){
if(document.body.dataset.pageType!=="home")return;
const reviewBanner=document.getElementById("bmaiReviewBanner");if(reviewBanner)reviewBanner.hidden=!window.BMAI_LOCKS_PAUSED_FOR_REVIEW;
const cur=current(),nxt=next();
const title=document.querySelector(".bmai-studio-card h2"),desc=document.querySelector(".bmai-studio-card p.muted"),links=document.querySelectorAll(".bmai-studio-card .btn");
if(cur&&title){
title.innerHTML=esc(cur.week)+"<br><span>"+esc(cur.title)+"</span>";
if(desc)desc.textContent=cur.session?"Ready to keep creating? Revisit the lesson, open your playbook, and turn the next step into a finished piece.":"This session is now on the cohort schedule. Session materials will appear here as they are released.";
const status=document.querySelector(".bmai-studio-card .bmai-chip.active");if(status)status.textContent=cur.session?"CURRENT SESSION":"CURRENT · CONTENT COMING SOON";
const stageChip=document.querySelector(".bmai-studio-card .bmai-chip[data-session-stage]");if(stageChip)stageChip.textContent=cur.stage||"PRODUCTION";const stageTitle=document.getElementById("bmaiCurrentStage");if(stageTitle)stageTitle.textContent=cur.stage||"PRODUCTION";
const currentImage=document.getElementById("bmaiCurrentImage");if(currentImage){currentImage.hidden=!cur.hero;if(cur.hero){currentImage.src=basePath()+cur.hero;currentImage.alt=cur.title+" — session hero image";}}
const numberChip=document.querySelector(".bmai-studio-card .bmai-chip[data-session-number]");if(numberChip)numberChip.textContent="SESSION "+String(cur.number).padStart(2,"0");
if(links[0]){if(cur.session){links[0].href=sessionUrl(cur);links[0].textContent="CONTINUE SESSION →";links[0].style.display="inline-block";links[0].classList.remove("secondary")}else{links[0].removeAttribute("href");links[0].textContent="SESSION CONTENT COMING SOON";links[0].style.display="inline-block";links[0].classList.add("secondary")}}
if(links[1]){if(cur.playbook){links[1].href=basePath()+cur.playbook;links[1].style.display="inline-block"}else links[1].style.display="none"}
}
const stageWrap=document.querySelector(".bmai-production-pipeline");
if(stageWrap){stageWrap.innerHTML=stages.map((s,i)=>'<div class="stage '+(cur&&cur.stage===s?"active":"")+'">'+String(i+1).padStart(2,"0")+'<br>'+s+'</div>').join("")}
const sched=document.getElementById("bmaiSchedule");
const available=S.filter(x=>x.session&&isUnlocked(x));
const upcoming=S.filter(x=>new Date(x.start).getTime()>now()&&(x.session||x.id===nxt?.id)&&!isUnlocked(x));
const unreleased=S.filter(x=>!x.session&&x.id!==nxt?.id);
if(sched)sched.innerHTML=available.map(renderCard).join("");
const upcomingList=document.getElementById("bmaiUpcomingList");if(upcomingList)upcomingList.innerHTML=upcoming.map(renderCard).join("");
const upcomingFold=document.getElementById("bmaiUpcomingSessions");if(upcomingFold)upcomingFold.hidden=!upcoming.length;
const upcomingCount=document.getElementById("bmaiUpcomingCount");if(upcomingCount)upcomingCount.textContent=upcoming.length+" sessions";
const unreleasedList=document.getElementById("bmaiUnreleasedSessions");if(unreleasedList){const weeks=[...new Set(unreleased.map(x=>x.id.match(/week-(\d+)/)[1]))];unreleasedList.innerHTML=weeks.map(week=>'<article class="studio-unreleased-week"><div class="studio-unreleased-week-head"><h3>Week '+week+'</h3><span>Materials coming soon</span></div>'+unreleased.filter(x=>x.id.startsWith('week-'+week+'-')).map(x=>'<div class="studio-unreleased-day"><span>Day '+x.id.match(/day-(\d+)/)[1]+'</span><time datetime="'+esc(x.start)+'">'+esc(new Intl.DateTimeFormat('en-IN',{day:'numeric',month:'short',timeZone:'Asia/Kolkata'}).format(new Date(x.start)))+' · '+esc(timeParts(x.start))+' IST</time></div>').join('')+'</article>').join('');}
const unreleasedCount=document.getElementById("bmaiUnreleasedCount");if(unreleasedCount)unreleasedCount.textContent=unreleased.length+" sessions";
const upcomingDescription=document.querySelector('#bmaiUpcomingSessions summary small');if(upcomingDescription)upcomingDescription.textContent='Unlocks automatically at each scheduled start time.';
const cd=[...document.querySelectorAll(".countdown")];cd.forEach(el=>el.textContent=countdown(el.dataset.unlock));
const nextBox=document.getElementById("bmaiNextSession");
if(nextBox){
 if(nxt){
  const outcomes={"week-2-day-1":"You have the idea. Next, bring it to life with your first AI movie short: generate a shot, build the sound, and make your first cut.","week-2-day-2":"Make an ad that feels real. Build a consistent product world, then turn your strongest frames into controlled motion.","week-3-day-1":"Think like a director. Build a character, a visual world, and a story blueprint before your next generation."};
  const reviewOpen=window.BMAI_LOCKS_PAUSED_FOR_REVIEW&&!!nxt.session;
  const access=reviewOpen?'<div class="studio-teaser-lock"><span>REVIEW ACCESS OPEN</span></div><div class="studio-teaser-actions"><a class="btn" href="'+esc(sessionUrl(nxt))+'">OPEN SESSION</a>'+(nxt.playbook?'<a class="btn secondary" href="'+basePath()+esc(nxt.playbook)+'">OPEN PLAYBOOK</a>':'')+'</div>':'<div class="studio-teaser-lock"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg><span>CLASS LOCKED · OPENS IN <b data-teaser-countdown>'+esc(countdown(nxt.start))+'</b></span></div><small>Your next chapter unlocks automatically. Get your current project ready.</small>';
  nextBox.className="studio-teaser-card";
  nextBox.innerHTML='<div class="studio-teaser-copy"><div class="kicker">NEXT UP / '+esc(nxt.week)+'</div><h2>'+esc(nxt.title)+'</h2><p>'+esc(outcomes[nxt.id]||nxt.description||"Your next creative challenge is on its way. Bring what you have built so far and get ready to take the next step.")+'</p><div class="studio-teaser-date">'+esc(dateRange(nxt))+'</div>'+access+'</div>'+(nxt.hero?'<div class="studio-teaser-image"><img src="'+basePath()+esc(nxt.hero)+'" alt="'+esc(nxt.title)+' — next class preview" loading="lazy"></div>':'');
 }else nextBox.closest('section').hidden=true;
}
}

let homepageStateId=null;
function updateHomepageCountdowns(){
document.querySelectorAll(".countdown[data-unlock]").forEach(el=>el.textContent=countdown(el.dataset.unlock));
const nextBox=document.getElementById("bmaiNextSession");
if(nextBox){
 const nxt=next();
 if(nxt){
  const count=nextBox.querySelector('[data-teaser-countdown]');if(count)count.textContent=countdown(nxt.start);
 }
}
}
function enhanceAvatarFallbacks(){
 const imgs=[...document.querySelectorAll('.bmai-character-card img')];
 imgs.forEach(img=>{
   const fail=()=>{img.style.display='none';img.parentElement.classList.add('is-fallback')};
   img.addEventListener('error',fail,{once:true});
   if(img.complete&&img.naturalWidth===0)fail();
 });
}
function injectInstructorIdentity(){
 if(document.querySelector(".bmai-instructor-card"))return;
 const target=document.querySelector(".hero-copy .hero-meta")||document.querySelector("main .hero")||document.querySelector("header");
 if(!target)return;
 const card=document.createElement("div");
 card.className="bmai-instructor-card";
 card.innerHTML='<div class="bmai-instructor-avatar"><img src="'+basePath()+'assets/alexx-avatar.webp?v=20261005-avatar-v1" alt="Alexx Roy, instructor for Build My AI Movie" loading="lazy" onerror="this.style.display=\'none\';this.parentElement.classList.add(\'is-fallback\')"></div><div class="bmai-instructor-copy"><span>INSTRUCTOR</span><strong>Alexx Roy</strong><small>Build My AI Movie · Studio Lead</small></div>';
 if(target.classList.contains("hero-meta"))target.insertAdjacentElement("afterend",card);
 else target.insertAdjacentElement("afterend",card);
}
function siteUtilities(){
const old=document.getElementById("bmai-site-utilities");if(old)old.remove();
const wrap=document.createElement("div");wrap.id="bmai-site-utilities";wrap.innerHTML='<button class="bmai-float-btn bmai-top-btn" type="button" aria-label="Scroll to top" title="Scroll to top"><span class="bmai-icon" aria-hidden="true">↑</span><span>TOP</span></button>';
document.body.appendChild(wrap);
const top=wrap.querySelector(".bmai-top-btn");
const toggle=()=>top.classList.toggle("is-visible",window.scrollY>500);
window.addEventListener("scroll",toggle,{passive:true});toggle();
top.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
}
function guardLockedLinks(){
 document.querySelectorAll("a[data-bmai-lock-guard]").forEach(a=>{if(isUnlocked(byId(sessionIdFromHref(a.href)))){a.removeAttribute("aria-disabled");a.classList.remove("bmai-locked-link")}});
 document.querySelectorAll("a[href]").forEach(a=>{
  if(a.dataset.bmaiLockGuard==="true")return;
  const targetId=sessionIdFromHref(a.href);
  if(!targetId)return;
  const target=byId(targetId);
  if(!target||isUnlocked(target))return;
  a.dataset.bmaiLockGuard="true";
  a.setAttribute("aria-disabled","true");
  a.classList.add("bmai-locked-link");
  a.addEventListener("click",e=>{
   if(isUnlocked(target))return;
   e.preventDefault();
   const targetUrl=target.session?basePath()+target.session:null;
   if(targetUrl)location.href=targetUrl;
   else alert("This cohort material is not released yet. Return to the Student Hub for the release time.");
  });
 });
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
function accessibility(){
 const main=document.querySelector("main");
 if(main&&!main.id)main.id="main-content";
 if(main&&!document.querySelector(".bmai-skip-link")){
   const a=document.createElement("a");a.className="bmai-skip-link";a.href="#main-content";a.textContent="Skip to main content";document.body.insertBefore(a,document.body.firstChild);
 }
 document.querySelectorAll('a[target="_blank"]').forEach(a=>{if(!a.rel.includes("noopener"))a.rel=(a.rel+" noopener").trim();if(!a.rel.includes("noreferrer"))a.rel=(a.rel+" noreferrer").trim()});
 document.querySelectorAll("button").forEach(b=>{if(!b.hasAttribute("type"))b.type="button"});
}
function revealReferenceAnchor(){
 if(!location.hash)return;
 let id;try{id=decodeURIComponent(location.hash.slice(1))}catch{return}
 const target=document.getElementById(id);if(!target)return;
 let parent=target.parentElement;while(parent){if(parent.tagName==='DETAILS')parent.open=true;parent=parent.parentElement}
 requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'instant'}));
}
window.addEventListener('hashchange',revealReferenceAnchor);
function ready(){
applyBrandMark();
accessibility();
if(lockPage()){window.BMAI_VISUALS.intro();applyPageIdentity();setupMobileHeader();guardLockedLinks();return;}
if(document.body.dataset.pageType==="home"){
 homepage();
 homepageStateId=current()?.id||null;
 setInterval(()=>{
  const id=current()?.id||null;
  if(id!==homepageStateId){homepage();window.BMAI_VISUALS.library();homepageStateId=id;guardLockedLinks()}
  updateHomepageCountdowns();guardLockedLinks();
 },1000)
}
try{localStorage.setItem("bmai:lastPath",page)}catch(e){}
window.BMAI_VISUALS.intro();enhanceLongText();progress();enhanceNextButton();applyPageIdentity();siteUtilities();setupMobileHeader();enhanceAvatarFallbacks();setupScrollControls();guardLockedLinks();revealReferenceAnchor();
document.querySelectorAll("a").forEach(a=>{if(a.href===location.href)a.setAttribute("aria-current","page")})
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ready);else ready();
})();
