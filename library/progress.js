/* Stable task identities shared by playbooks and the Resource Library. */
(()=>{'use strict';
 const normalize=text=>String(text).replace(/\s+/g,' ').trim();
 const taskKey=text=>{let hash=2166136261;for(const c of normalize(text))hash=Math.imul(hash^c.charCodeAt(0),16777619);return (hash>>>0).toString(36);};
 const read=key=>{try{return JSON.parse(localStorage.getItem(key)||'null')}catch{return null}};
 const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false}};
 function bind(boxes,{key,legacyKey,legacyBoxes=boxes,update=()=>{}}){
  let saved=read(key);if(!saved||typeof saved!=='object'||Array.isArray(saved))saved={};
  saved.__migrated=saved.__migrated||{};
  if(legacyKey&&!saved.__migrated[legacyKey]){const old=read(legacyKey);if(old)legacyBoxes.forEach((box,i)=>{if(!(box.dataset.taskKey in saved))saved[box.dataset.taskKey]=!!old[i]});saved.__migrated[legacyKey]=true;}
  const apply=()=>{boxes.forEach(box=>box.checked=!!saved[box.dataset.taskKey]);update();};
  apply();
  boxes.forEach(box=>box.addEventListener('change',()=>{saved[box.dataset.taskKey]=box.checked;write(key,saved);update();document.dispatchEvent(new Event('bmai:progress'));}));
  window.addEventListener('storage',event=>{if(event.key!==key)return;saved=read(key)||{};apply();document.dispatchEvent(new Event('bmai:progress'));});
  // Persist the migration before a later page with the same tasks is opened.
  write(key,saved);
 }
 window.BMAI_PROGRESS={taskKey,bind,read,write};
})();
