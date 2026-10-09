/* Prompt Vault search, release locks, editable fields and one-click copy. */
(()=>{
  'use strict';
  const page=document.querySelector('[data-vault-sessions]');
  if(!page)return;
  const groups=[...page.querySelectorAll('[data-vault-session]')];
  const cards=[...page.querySelectorAll('.prompt-vault-card')];
  const buttons=[...document.querySelectorAll('[data-vault-session-button]')];
  const search=document.querySelector('[data-vault-search]');
  const kind=document.querySelector('[data-vault-kind]');
  const results=document.querySelector('[data-vault-results]');
  const decode=value=>String(value||'').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
  const rendered=card=>{let text=decode(card.dataset.promptTemplate||'');card.querySelectorAll('[data-prompt-field]').forEach(input=>{const key=input.dataset.promptField;if(input.value.trim())text=text.split(key).join(input.value.trim());});return text;};
  const announce=message=>{let live=document.querySelector('.prompt-vault-live');if(!live){live=document.createElement('p');live.className='prompt-vault-live';live.setAttribute('aria-live','polite');document.querySelector('.prompt-vault-page')?.prepend(live);}live.textContent=message;};
  const dateLabel=iso=>new Intl.DateTimeFormat('en-IN',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Kolkata'}).format(new Date(iso))+' IST';
  const isLocked=group=>Date.parse(group.dataset.vaultRelease)>Date.now();
  let selected='';

  function syncLocks(){
    groups.forEach(group=>{
      const locked=isLocked(group),body=group.querySelector('[data-vault-session-body]'),notice=group.querySelector('[data-vault-locked]');
      group.classList.toggle('is-locked',locked);body.hidden=locked;notice.hidden=!locked;
      if(locked)notice.querySelector('[data-vault-lock-date]').textContent='Opens '+dateLabel(group.dataset.vaultRelease)+'.';
    });
    buttons.forEach(button=>{const group=groups.find(item=>item.dataset.vaultSession===button.dataset.vaultSessionButton);const locked=group&&isLocked(group);button.classList.toggle('is-locked',!!locked);button.setAttribute('aria-label',(button.textContent.trim()||'Session')+(locked?' — locked':''));});
  }

  function updateUrl(){
    const url=new URL(location.href);if(selected)url.searchParams.set('session',selected);else url.searchParams.delete('session');url.hash='';history.replaceState(null,'',url);
  }

  function filter({updateHistory=false}={}){
    const query=search.value.trim().toLowerCase(),type=kind.value;
    let visible=0,lockedCount=0;
    groups.forEach(group=>{
      const locked=isLocked(group),sessionMatch=!selected||selected===group.dataset.vaultSession;
      if(locked)lockedCount++;
      let matches=0;
      group.querySelectorAll('.prompt-vault-card').forEach(card=>{
        const show=sessionMatch&&!locked&&(!query||(card.dataset.promptSearch||'').includes(query))&&(!type||card.dataset.promptKind===type);
        card.hidden=!show;if(show){matches++;visible++;}
      });
      group.querySelectorAll('[data-vault-kind-section]').forEach(section=>{section.hidden=!locked&&![...section.querySelectorAll('.prompt-vault-card')].some(card=>!card.hidden);});
      const groupSearch=!query||group.querySelector('.prompt-vault-session-head').textContent.toLowerCase().includes(query);
      group.hidden=!sessionMatch||(!locked&&matches===0)||(locked&&!groupSearch);
    });
    buttons.forEach(button=>{const active=button.dataset.vaultSessionButton===selected;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;});
    results.textContent=`${visible} prompt${visible===1?'':'s'} shown${selected?' for this session':''}. ${lockedCount} session${lockedCount===1?' is':'s are'} still locked.`;
    if(updateHistory)updateUrl();
  }

  cards.forEach(card=>{
    const pre=card.querySelector('[data-prompt-text]');
    card.querySelectorAll('[data-prompt-field]').forEach(input=>input.addEventListener('input',()=>{if(pre)pre.textContent=rendered(card);}));
    card.querySelector('[data-prompt-copy]')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(rendered(card));announce('Prompt copied to your clipboard.');}catch{const area=document.createElement('textarea');area.value=rendered(card);document.body.append(area);area.select();document.execCommand('copy');area.remove();announce('Prompt copied to your clipboard.');}});
    card.querySelector('[data-prompt-reset]')?.addEventListener('click',()=>{card.querySelectorAll('[data-prompt-field]').forEach(input=>input.value='');if(pre)pre.textContent=decode(card.dataset.promptTemplate||'');announce('Prompt fields reset.');});
  });

  buttons.forEach(button=>button.addEventListener('click',()=>{selected=button.dataset.vaultSessionButton;search.value='';kind.value='';filter({updateHistory:true});document.querySelector(`[data-vault-session="${selected}"]`)?.scrollIntoView({block:'start',behavior:'smooth'});}));
  search.addEventListener('input',()=>filter());kind.addEventListener('change',()=>filter());
  document.querySelector('[data-vault-clear]')?.addEventListener('click',()=>{selected='';search.value='';kind.value='';filter({updateHistory:true});search.focus();});
  document.querySelectorAll('[data-vault-scroll]').forEach(button=>button.addEventListener('click',()=>document.querySelector('[data-vault-session-tabs]').scrollBy({left:Number(button.dataset.vaultScroll)*360,behavior:'smooth'})));

  syncLocks();
  const target=location.hash?document.getElementById(decodeURIComponent(location.hash.slice(1))):null;
  const requested=new URL(location.href).searchParams.get('session');
  selected=target?.closest('[data-vault-session]')?.dataset.vaultSession||((requested&&groups.some(group=>group.dataset.vaultSession===requested))?requested:'');
  filter();
  if(target){const group=target.closest('[data-vault-session]');const destination=isLocked(group)?group.querySelector('[data-vault-locked]'):target;if(!isLocked(group))target.querySelector('details')?.setAttribute('open','');requestAnimationFrame(()=>{destination.scrollIntoView({block:'center'});if(!isLocked(group)){target.tabIndex=-1;target.focus({preventScroll:true});}});}
  setInterval(()=>{const before=groups.map(isLocked).join(',');syncLocks();const after=groups.map(isLocked).join(',');if(before!==after)filter();},1000);
})();
