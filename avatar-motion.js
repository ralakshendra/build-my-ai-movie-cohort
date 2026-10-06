(()=>{'use strict';
const init=()=>{
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const avatars=[...document.querySelectorAll('.studio-avatar,.studio-hero-character>img,.studio-guidance-visual>img')];
if(!avatars.length)return;
const timers=new Map();
const assetBase=new URL('../assets/avatars/',document.querySelector('script[src*="library/site.js"]').src);
const images=new Map();

const textureReady=el=>{const url=getComputedStyle(el).backgroundImage.match(/([^/"]+\.(?:png|webp))/)?.[1];if(!url)return Promise.resolve();if(!images.has(url)){const img=new Image();img.src=new URL(url,assetBase);images.set(url,img.decode().catch(()=>{}));}return images.get(url);};

const play=(el,reason='entry')=>{
 el.classList.remove('avatar-entering','avatar-reacting','avatar-playing');
 if(reduced.matches||document.hidden||el.dataset.avatarVisible!=='true')return;
 const framed=el.classList.contains('avatar-motion-wave')||el.classList.contains('avatar-motion-celebrate');
 el.classList.remove('avatar-entering','avatar-reacting','avatar-playing');
 void el.offsetWidth;
 el.classList.add(framed?'avatar-playing':reason==='entry'?'avatar-entering':'avatar-reacting');
};
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
 const el=entry.target;el.dataset.avatarVisible=String(entry.isIntersecting);
 if(entry.isIntersecting){el.dataset.avatarSeen='true';textureReady(el).then(()=>play(el))}
}),{threshold:.25});
avatars.forEach(el=>{
 el.classList.add('avatar-animated');
 const tips={pointing:'Choose one shot. Finish it before starting the next.',storyboard:'Lock the character, lighting, and framing before you generate.',laptop:'Save your strongest outputs and keep your project files organized.',camera:'Use a clear reference image and check the framing before generating.',headphones:'Listen once without looking at the screen. Does the audio tell the story?',microphone:'Write for the ear: short sentences, clear pauses, natural delivery.',clapperboard:'Cut to the action. Every shot should move the story forward.',idea:'Give the scene one clear purpose before writing the prompt.',checklist:'Review continuity, audio, and export quality before submitting.',caution:'Change one prompt variable at a time so you know what fixed the shot.',wave:'Pick the resource for the stage you are working on right now.',celebrate:'Save this finished project for your portfolio. Then build the next one.'};
 const pose=Object.keys(tips).find(key=>el.classList.contains(key));
 if(pose){
  el.dataset.avatarPose=pose;el.setAttribute('role','button');el.tabIndex=0;
  el.setAttribute('aria-label','Alexx: '+pose+'. Show a filmmaking tip');el.setAttribute('aria-expanded','false');el.title='Tap Alexx for a filmmaking tip';
  const host=el.closest('.studio-guidance,.bmai-avatar-rail,.studio-companion')||el.parentElement;
  const tip=document.createElement('div');tip.className='studio-avatar-tip';tip.hidden=true;tip.textContent=tips[pose];host.append(tip);
  const interact=()=>{tip.hidden=!tip.hidden;el.setAttribute('aria-expanded',String(!tip.hidden));play(el,'tap')};
  el.addEventListener('click',interact);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();interact()}});
 }

 if(el.classList.contains('wave'))el.classList.add('avatar-motion-wave');
 if(el.classList.contains('celebrate'))el.classList.add('avatar-motion-celebrate');
 el.dataset.avatarVisible='false';observer.observe(el);
 el.addEventListener('pointerenter',()=>{if(el.dataset.avatarHovered)return;el.dataset.avatarHovered='true';play(el,'hover')});
 el.addEventListener('pointerleave',()=>delete el.dataset.avatarHovered);
 el.addEventListener('animationend',e=>{if(e.target===el)el.classList.remove('avatar-entering','avatar-reacting')});
});
document.addEventListener('visibilitychange',()=>document.documentElement.classList.toggle('avatar-motion-paused',document.hidden));
reduced.addEventListener('change',()=>{if(reduced.matches)avatars.forEach(el=>el.classList.remove('avatar-entering','avatar-reacting','avatar-playing'))});
document.addEventListener('change',event=>{
 if(!event.target.matches('input[type=checkbox]')||!event.target.checked)return;
 const main=event.target.closest('main');if(!main)return;
 const group=event.target.closest('.chk,.checklist,[data-steps],.check-wrap,.hw-checklist')||main;
 const boxes=[...group.querySelectorAll('input[type=checkbox]')];if(!boxes.length||!boxes.every(b=>b.checked))return;
 const target=main.querySelector('.avatar-motion-celebrate');if(!target)return;
 if(target.dataset.avatarVisible==='true')play(target,'complete');else target.dataset.avatarCelebrationPending='true';
 const card=target.closest('.studio-guidance');if(card){card.classList.add('avatar-milestone');clearTimeout(timers.get(card));timers.set(card,setTimeout(()=>card.classList.remove('avatar-milestone'),3000))}
});
const pending=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting&&e.target.dataset.avatarCelebrationPending){delete e.target.dataset.avatarCelebrationPending;play(e.target,'complete')}}),{threshold:.25});
avatars.filter(el=>el.classList.contains('avatar-motion-celebrate')).forEach(el=>pending.observe(el));

const poseNames=['pointing','storyboard','laptop','camera','headphones','microphone','clapperboard','idea','checklist','caution','wave','celebrate'];
const react=(companion,pose,message)=>{
 const avatar=companion.querySelector('.studio-avatar'),copy=companion.querySelector('.studio-companion-copy');if(!avatar||!copy)return;
 if(copy.textContent===message)return;
 copy.textContent=message;avatar.classList.remove('avatar-entering','avatar-reacting','avatar-playing');poseNames.forEach(name=>avatar.classList.remove(name));avatar.classList.remove('avatar-motion-wave','avatar-motion-celebrate');avatar.classList.add(pose);avatar.dataset.avatarPose=pose;
 if(pose==='celebrate')avatar.classList.add('avatar-motion-celebrate');
 avatar.setAttribute('aria-label','Alexx: '+pose+'. Show a filmmaking tip');textureReady(avatar).then(()=>play(avatar,'complete'));
};
const updateProgressCompanions=()=>document.querySelectorAll('[data-companion=progress],[data-companion=lesson-progress]').forEach(companion=>{
 const scope=companion.closest('[data-progress-scope]')||document.querySelector('main');
 const boxes=[...scope.querySelectorAll('input[type=checkbox]')];if(!boxes.length)return;
 const done=boxes.filter(b=>b.checked).length;
 react(companion,done===boxes.length?'celebrate':done?'pointing':companion.dataset.companion==='lesson-progress'?'camera':'checklist',done===boxes.length?'All '+done+' steps complete. Save your work and make the final review.':done?done+' of '+boxes.length+' steps complete. Keep the next step focused.':'Your next finished project starts with the first step.');
});
document.addEventListener('change',e=>{if(e.target.matches('input[type=checkbox]'))updateProgressCompanions()});updateProgressCompanions();
document.querySelectorAll('[data-skill-scope]').forEach(scope=>{
 const companion=scope.querySelector('[data-companion=skill]');if(!companion)return;
 const update=()=>{
  const feedback=scope.querySelector('#quizFeedback');const results=scope.querySelector('#results,#result');
  if(results&&!results.classList.contains('hidden')&&getComputedStyle(results).display!=='none'){react(companion,'celebrate','Skill check complete. Review your answers and put the lesson into practice.');return;}
  if(feedback&&!feedback.classList.contains('hidden')){const correct=feedback.textContent.startsWith('Correct.');react(companion,correct?'celebrate':'caution',correct?'Good call. You are making deliberate production choices.':'Try the principle behind the answer. Review the explanation, then keep going.');return;}
  react(companion,'idea','Think like a director. Pick the answer you would use on a real project.');
 };
 new MutationObserver(update).observe(scope,{childList:true,subtree:true,characterData:true});update();
});

const arrangeAvatars=()=>{
 const blocks=[...document.querySelectorAll('.studio-guidance,.studio-companion,.bmai-avatar-rail')].filter(el=>!el.closest('.studio-lesson-toolbar')&&el.getBoundingClientRect().height>0).sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top);
 let previous=null;
 for(const block of blocks){const rect=block.getBoundingClientRect();const close=previous&&rect.top-previous.bottom<160;const naturalRight=block.classList.contains('headphones');const right=close?!previous.right:naturalRight;block.classList.toggle('avatar-right',right);previous={bottom:rect.bottom,right};}
};
arrangeAvatars();window.addEventListener('load',arrangeAvatars);window.addEventListener('resize',arrangeAvatars);document.addEventListener('toggle',arrangeAvatars,true);document.addEventListener('click',e=>{if(e.target.closest('[data-resource-tab]'))requestAnimationFrame(arrangeAvatars)});
document.querySelectorAll('[data-avatar-replay]').forEach(button=>button.addEventListener('click',()=>{const el=document.querySelector(button.dataset.avatarReplay);if(el)play(el,'demo')}));
};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();
