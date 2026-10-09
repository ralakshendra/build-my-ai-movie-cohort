(()=>{
const init=()=>{
 const tabs=[...document.querySelectorAll('[data-resource-tab]')];
 const library=document.querySelector('.studio-resource-tabs');
 let filter=()=>{};
 if(library){
  const controls=document.createElement('div');controls.className='bmai-resource-filters';
  controls.innerHTML='<label>Availability<select aria-label="Filter resource availability"><option value="available">Available now</option><option value="all">All scheduled resources</option></select></label><label data-kind-filter>Content type<select aria-label="Filter prompt type"><option value="">Full prompts and practice recipes</option><option value="full">Full prompts</option><option value="recipe">Practice recipes</option></select></label><label data-family-filter>Tool family<select aria-label="Filter tool family"><option value="">All tool families</option></select></label><label>Find a resource<input type="search" placeholder="Tool, shot, prompt or task" aria-label="Find a resource"></label><label>Session<select aria-label="Filter resources by session"><option value="">All sessions</option></select></label><p class="bmai-resource-filter-status" role="status"></p>';
  const search=controls.querySelector('input'),selectSession=controls.querySelector('select[aria-label="Filter resources by session"]'),status=controls.querySelector('p');
  window.BMAI_SESSIONS.filter(s=>s.session).forEach(s=>{const option=document.createElement('option');option.value=s.id;option.textContent=s.week+' · '+s.title;selectSession.append(option)});
  library.insertAdjacentElement('afterend',controls);
  const availability=controls.querySelector('[aria-label="Filter resource availability"]'),kind=controls.querySelector('[aria-label="Filter prompt type"]'),family=controls.querySelector('[aria-label="Filter tool family"]');
  [...new Set([...document.querySelectorAll('[data-tool-family]')].map(c=>c.dataset.toolFamily))].sort().forEach(name=>{const o=document.createElement('option');o.value=name;o.textContent=name;family.append(o)});
  document.querySelectorAll('.studio-resource-card').forEach(c=>c.dataset.searchText=c.textContent.toLowerCase());
  [availability,kind,family].forEach(c=>c.addEventListener('change',()=>{filter()}));
  filter=()=>{const active=document.querySelector('[data-resource-panel]:not([hidden])');if(!active)return;controls.querySelector('[data-kind-filter]').hidden=active.dataset.resourcePanel!=='prompts';controls.querySelector('[data-family-filter]').hidden=active.dataset.resourcePanel!=='tools';const cards=[...active.querySelectorAll('.studio-resource-card')],query=search.value.toLowerCase().trim();let count=0;
   cards.forEach(card=>{const session=card.dataset.resourceSessions||card.dataset.resourceSession||'',matches=(!query||(card.dataset.searchText||card.textContent.toLowerCase()).includes(query))&&(!selectSession.value||session.split(' ').includes(selectSession.value))&&(availability.value==='all'||!card.dataset.resourceRelease||Date.parse(card.dataset.resourceRelease)<=Date.now())&&(active.dataset.resourcePanel!=='prompts'||!kind.value||card.dataset.resourceKind===kind.value)&&(active.dataset.resourcePanel!=='tools'||!family.value||card.dataset.toolFamily===family.value);card.hidden=!matches;if(matches)count++;});
   status.textContent=count?count+' resources shown.':'No resources match. Try another search or session.';
  };search.addEventListener('input',filter);selectSession.addEventListener('change',filter);filter();
 }
 const select=tab=>{tabs.forEach(b=>{const active=b===tab;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;document.getElementById(b.getAttribute('aria-controls')).hidden=!active;});filter();};
 tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>select(tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();select(tabs[next]);tabs[next].focus();}});});
 document.querySelectorAll('[data-copy-prompt]').forEach(b=>{const status=document.createElement('span');status.className='bmai-copy-status';status.setAttribute('role','status');b.after(status);b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(b.parentElement.querySelector('pre').textContent);b.textContent='Copied';status.textContent='Prompt copied to clipboard.';setTimeout(()=>b.textContent='Copy prompt',1800);}catch{status.textContent='Clipboard unavailable. Select the prompt text and copy it.';}})});
 document.querySelectorAll('[data-resource-checklist]').forEach(group=>{
  const boxes=[...group.querySelectorAll('input')],key='bmai-resource-checklist:'+group.dataset.resourceChecklist;
  const state=window.BMAI_PROGRESS;
  boxes.forEach(box=>{const text=box.closest('label').textContent;box.dataset.legacyTaskKey=state.legacyFor(group.dataset.resourceChecklist,text);box.dataset.taskKey=state.keyFor(group.dataset.resourceChecklist,text)});
  const update=()=>{group.parentElement.querySelector('.studio-resource-progress').textContent=boxes.filter(b=>b.checked).length+' / '+boxes.length+' complete';};
  state.bind(boxes,{key:'bmai-tasks:'+group.dataset.resourceChecklist,legacyKey:key,update});
 });
 // Source links retain the site's existing scheduled-access guard.
 const locked=[];
 document.querySelectorAll('[data-resource-release]').forEach(card=>{
  const release=Date.parse(card.dataset.resourceRelease);if(!Number.isFinite(release)||release<=Date.now())return;
  const body=card.querySelector('.studio-resource-body');if(!body)return;
  const content=[...body.childNodes];content.forEach(node=>node.remove());
  const note=document.createElement('p');note.className='studio-resource-lock-note';body.append(note);
  card.classList.add('studio-resource-locked');locked.push({card,body,content,note,release});
 });
 const tick=()=>locked.forEach(item=>{
  const left=item.release-Date.now();
  if(left<=0){if(item.note.isConnected){item.note.remove();item.body.append(...item.content);item.card.classList.remove('studio-resource-locked');filter();}return;}
  const seconds=Math.ceil(left/1000);item.note.textContent='Locked until '+new Intl.DateTimeFormat('en-IN',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Kolkata'}).format(new Date(item.release))+' IST · Opens in '+Math.floor(seconds/86400)+'d '+Math.floor(seconds%86400/3600)+'h '+Math.floor(seconds%3600/60)+'m '+seconds%60+'s';
 });tick();if(locked.length)setInterval(tick,1000);
 const resourceId=new URL(location.href).searchParams.get('resource');if(resourceId){const card=document.getElementById(resourceId),panel=card?.closest('[data-resource-panel]');if(panel){const controls=document.querySelector('.bmai-resource-filters');controls.querySelector('[aria-label="Filter resource availability"]').value='all';select(tabs.find(t=>t.getAttribute('aria-controls')===panel.id));card.open=true;card.tabIndex=-1;requestAnimationFrame(()=>{card.scrollIntoView({block:'start'});card.focus({preventScroll:true})});}}
 document.addEventListener('bmai:library-change',()=>filter());

};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
