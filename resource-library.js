(()=>{
const init=()=>{
 const tabs=[...document.querySelectorAll('[data-resource-tab]')];
 const select=tab=>{tabs.forEach(b=>{const active=b===tab;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;document.getElementById(b.getAttribute('aria-controls')).hidden=!active;});};
 tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>select(tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();select(tabs[next]);tabs[next].focus();}});});
 document.querySelectorAll('[data-copy-prompt]').forEach(b=>b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(b.parentElement.querySelector('pre').textContent);b.textContent='Copied';setTimeout(()=>b.textContent='Copy prompt',1800);}catch{b.textContent='Select the prompt to copy';}}));
 document.querySelectorAll('[data-resource-checklist]').forEach(group=>{
  const boxes=[...group.querySelectorAll('input')],key='bmai-resource-checklist:'+group.dataset.resourceChecklist;
  let saved=[];try{saved=JSON.parse(localStorage.getItem(key)||'[]');}catch{}
  const update=()=>{group.parentElement.querySelector('.studio-resource-progress').textContent=boxes.filter(b=>b.checked).length+' / '+boxes.length+' complete';};
  boxes.forEach((b,i)=>{b.checked=!!saved[i];b.addEventListener('change',()=>{try{localStorage.setItem(key,JSON.stringify(boxes.map(b=>b.checked)));}catch{}update();});});update();
 });
 // Source links retain the site's existing scheduled-access guard.
 const locked=[];
 document.querySelectorAll('[data-resource-release]').forEach(card=>{
  const release=Date.parse(card.dataset.resourceRelease);if(window.BMAI_LOCKS_PAUSED_FOR_REVIEW||!Number.isFinite(release)||release<=Date.now())return;
  const body=card.querySelector('.studio-resource-body');if(!body)return;
  const content=[...body.childNodes];content.forEach(node=>node.remove());
  const note=document.createElement('p');note.className='studio-resource-lock-note';body.append(note);
  card.classList.add('studio-resource-locked');locked.push({card,body,content,note,release});
 });
 const tick=()=>locked.forEach(item=>{
  const left=item.release-Date.now();
  if(left<=0){if(item.note.isConnected){item.note.remove();item.body.append(...item.content);item.card.classList.remove('studio-resource-locked');}return;}
  const seconds=Math.ceil(left/1000);item.note.textContent='Locked until '+new Intl.DateTimeFormat('en-IN',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Kolkata'}).format(new Date(item.release))+' IST · Opens in '+Math.floor(seconds/86400)+'d '+Math.floor(seconds%86400/3600)+'h '+Math.floor(seconds%3600/60)+'m '+seconds%60+'s';
 });tick();if(locked.length)setInterval(tick,1000);

};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
