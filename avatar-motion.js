/* One contextual avatar lifecycle for tips, quizzes and saved progress. */
(()=>{'use strict';
const poses={
 pointing:['right','Choose one shot. Finish it before starting the next.'],
 storyboard:['right','Decide the framing before generating the next shot.'],
 'reference-board':['left','Keep character, lighting and story references together.'],
 laptop:['right','Save your approved outputs in the right project folder.'],
 camera:['right','Review the source image and camera framing before generating.'],
 headphones:['left','Listen once without looking at the screen. Does the sound tell the story?'],
 microphone:['right','Write for the ear: clear sentences, pauses and natural delivery.'],
 clapperboard:['right','Every cut should move the story forward.'],
 idea:['right','Give the scene one clear purpose before writing the prompt.'],
 checklist:['right','Review each output before marking the step complete.'],
 caution:['left','Pause, read the feedback and change one decision at a time.'],
 wave:['left','Choose the resource for the stage you are working on.'],
 celebrate:['right','Save the finished project and note what you learned.'],
 surprised:['right','Find the opening frame that earns attention.'],
 'thumbs-up':['right','Keep the version that clearly serves the story.'],
 palette:['right','Choose a small colour family and repeat it across shots.'],
 product:['right','Lock the coconut drink hero frame before animating the advertisement.'],
 encouragement:['right','A first pass gives you something concrete to improve.'],
 trophy:['right','Save your strongest finished piece for your portfolio.'],
 applause:['right','Review what worked in the finished cut.'],
 confident:['right','Follow the plan and review the result before moving on.'],
 curious:['right','Inspect one detail at a time before revising the prompt.'],
 'open-welcome':['right','Bring your own ideas into the workflow.'],
 laugh:['right','Keep useful creative discoveries without losing continuity.'],
 ready:['right','Make the next step, review it and keep moving.']
};
window.BMAI_AVATARS=Object.freeze({poses:Object.keys(poses)});
function init(){
 const main=document.querySelector('main');
 if(!main)return;
 // Attach the existing resource instructor to its real checklist group.
 const resource=main.querySelector('#resource-panel-checklists');
 if(resource){const c=resource.querySelector('.studio-companion');if(c){c.dataset.companion='progress';c.dataset.progressTarget='#resource-panel-checklists';}}
 document.querySelectorAll('[data-companion=progress],[data-companion=lesson-progress]').forEach(c=>{
  if(!c.dataset.progressTarget&&document.querySelector('#checklist'))c.dataset.progressTarget='#checklist';
 });
 const avatars=[...document.querySelectorAll('.studio-avatar,.studio-guidance-visual>img,.studio-hero-character>img')];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),images=new Map();
 let tipNumber=0;
 const hostFor=el=>el.closest('.studio-guidance,[data-companion],.bmai-avatar-rail')||el.parentElement;
 const poseFor=el=>Object.keys(poses).find(p=>el.classList.contains(p))||(el.tagName==='IMG'?'pointing':null);
 const play=(el,reason='entry')=>{
  el.classList.remove('avatar-entering','avatar-reacting','avatar-playing');
  if(reduced.matches||document.hidden||el.dataset.avatarVisible!=='true')return;
  void el.offsetWidth;
  el.classList.add(el.classList.contains('avatar-motion-wave')||el.classList.contains('avatar-motion-celebrate')?'avatar-playing':reason==='entry'?'avatar-entering':'avatar-reacting');
 };
 const textureReady=el=>{
  const match=getComputedStyle(el).backgroundImage.match(/url\(["']?(.*?)["']?\)/);if(!match)return Promise.resolve();
  if(!images.has(match[1])){const img=new Image();img.src=match[1];images.set(match[1],img.decode().catch(()=>{}));}return images.get(match[1]);
 };
 const visible=new IntersectionObserver(entries=>entries.forEach(({target:el,isIntersecting})=>{
  el.dataset.avatarVisible=String(isIntersecting);
  if(isIntersecting){el.dataset.avatarSeen='true';textureReady(el).then(()=>play(el));}
 }),{threshold:.18});
 const tips=new Map();
 avatars.forEach(el=>{
  const pose=poseFor(el);if(!pose)return;
  el.dataset.avatarPose=pose;el.classList.add('avatar-animated');
  if(pose==='wave')el.classList.add('avatar-motion-wave');
  if(pose==='celebrate')el.classList.add('avatar-motion-celebrate');
  el.setAttribute('role','button');el.tabIndex=0;
  el.setAttribute('aria-label','Alexx: '+pose.replaceAll('-',' ')+'. Show a filmmaking tip');
  el.setAttribute('aria-expanded','false');el.title='Tap Alexx for a filmmaking tip';
  const tip=document.createElement('div');tip.id='bmai-avatar-tip-'+(++tipNumber);tip.className='studio-avatar-tip';tip.hidden=true;
  tip.textContent=el.dataset.avatarTip||poses[pose][1];hostFor(el).append(tip);tips.set(el,tip);el.setAttribute('aria-controls',tip.id);
  const interact=()=>{tip.textContent=el.dataset.avatarTip||poses[el.dataset.avatarPose][1];tip.hidden=!tip.hidden;el.setAttribute('aria-expanded',String(!tip.hidden));play(el,'tap');};
  el.addEventListener('click',interact);
  el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();interact();}});
  el.addEventListener('pointerenter',()=>play(el,'hover'));
  el.addEventListener('animationend',e=>{if(e.target===el)el.classList.remove('avatar-entering','avatar-reacting');});
  el.dataset.avatarVisible='false';visible.observe(el);
 });
 const orient=()=>{
  const blocks=[...document.querySelectorAll('.studio-guidance,.studio-companion,.bmai-avatar-rail')].filter(el=>!el.closest('.studio-lesson-toolbar')&&el.getBoundingClientRect().height>0);
  let previous=null;
  for(const block of blocks){const r=block.getBoundingClientRect(),near=previous&&r.top-previous.bottom<120;
   const right=near?!previous.right:block.classList.contains('headphones');block.classList.toggle('avatar-right',right);previous={bottom:r.bottom,right};}
  for(const avatar of avatars){
   const host=hostFor(avatar);
   const target=(avatar.dataset.avatarTarget&&document.querySelector(avatar.dataset.avatarTarget))||
    host.querySelector('.studio-guidance-copy,.studio-companion-copy,.bmai-avatar-note')||
    host.querySelector('h2,h3,p,.hero-copy')||
    [...host.children].find(child=>child!==avatar&&!child.contains(avatar)&&!child.classList.contains('studio-avatar-tip'))||
    avatar.closest('.w4-callout,.w3d2-stage,.w4-stage,.studio-home-hero')?.querySelector('h2,h3,p,.hero-copy');
   let wanted='right';
   if(target){const a=avatar.getBoundingClientRect(),t=target.getBoundingClientRect();if(a.width&&t.width)wanted=t.left+t.width/2<a.left+a.width/2?'left':'right';}
   else if(host.classList.contains('w4-avatar-right')||host.classList.contains('w3d2-avatar-right'))wanted='left';
   avatar.dataset.avatarFacing=wanted;
   avatar.dataset.avatarFlip=String(poses[avatar.dataset.avatarPose]?.[0]!==wanted);
  }
 };
 const react=(companion,pose,message)=>{
  const avatar=companion.querySelector('.studio-avatar'),copy=companion.querySelector('.studio-companion-copy');if(!avatar||!copy)return;
  if(copy.textContent===message&&avatar.dataset.avatarPose===pose)return;
  copy.textContent=message;
  Object.keys(poses).forEach(p=>avatar.classList.remove(p));
  avatar.classList.remove('avatar-motion-wave','avatar-motion-celebrate','avatar-entering','avatar-reacting','avatar-playing');avatar.classList.add(pose);
  avatar.dataset.avatarPose=pose;avatar.dataset.avatarTip=message;
  const tip=tips.get(avatar);if(tip)tip.textContent=message;
  avatar.setAttribute('aria-label','Alexx: '+pose.replaceAll('-',' ')+'. Show feedback');
  orient();if(avatar.dataset.avatarSeen==='true')textureReady(avatar).then(()=>play(avatar,'reaction'));
 };
 const progress=()=>document.querySelectorAll('[data-companion=progress],[data-companion=lesson-progress]').forEach(c=>{
  const scope=c.dataset.progressTarget?document.querySelector(c.dataset.progressTarget):c.closest('[data-progress-scope]')||main;if(!scope)return;
  const primary=[...scope.querySelectorAll('#checklist input[type=checkbox],input[type=checkbox][data-index]')];
  const boxes=(primary.length?primary:[...scope.querySelectorAll('input[type=checkbox]')]).filter(b=>!b.disabled);if(!boxes.length)return;
  const done=boxes.filter(b=>b.checked).length,total=boxes.length;c.dataset.progressDone=done;c.dataset.progressTotal=total;
  react(c,done===total?'trophy':done?'confident':'checklist',done===total?'All '+total+' checkpoints complete. Review your work before submitting.':done?done+' of '+total+' checkpoints complete. Focus on the next unfinished step.':'0 of '+total+' checkpoints complete. Review the first output, then tick it.');
 });
 document.addEventListener('change',e=>{if(e.target.matches('input[type=checkbox]'))progress();});
 document.addEventListener('bmai:progress',progress);progress();
 for(const scope of document.querySelectorAll('[data-skill-scope]')){
  const c=scope.querySelector('[data-companion=skill]');if(!c)continue;
  const update=()=>{
   let state='ready',message='Think like a director. Choose a production decision and check the feedback.',pose='idea';
   const results=scope.querySelector('#results,#result');
   const shown=results&&!results.classList.contains('hidden')&&getComputedStyle(results).display!=='none'&&results.textContent.trim();
   if(shown){
    const score=results.querySelector('#scoreBig')?.textContent||results.textContent;
    const match=score.match(/(\d+)\s*\/\s*(\d+)/);
    if(match){const perfect=Number(match[1])===Number(match[2]);state=perfect?'complete':'review';pose=perfect?'applause':'caution';message=perfect?'Every answer is correct. Put the decisions into your next project.':match[1]+' of '+match[2]+' correct. Review the missed principles and try again.';}
   }else if(scope.querySelector('[data-library-quiz]')){
    const host=scope.querySelector('[data-library-quiz]'),fields=[...host.querySelectorAll('fieldset')],current=fields[Number(host.dataset.currentQuestion||0)];
    const status=current?.dataset.answerState;
    if(fields.length&&fields.every(f=>f.dataset.answerState==='correct')){state='complete';pose='applause';message='Every answer is correct. Apply these choices to your finished cut.';}
    else if(status==='incorrect'){state='incorrect';pose='caution';message='Not quite. Read the explanation, change your choice and check again.';}
    else if(status==='correct'){state='correct';pose='thumbs-up';message='Good call. That choice serves the shot. Continue to the next decision.';}
    else if(status==='empty'){state='ready';message='Choose an answer first, then check the production decision.';}
   }else{
    const fb=scope.querySelector('#quizFeedback');if(fb&&!fb.classList.contains('hidden')&&fb.textContent.trim()){
     const correct=fb.textContent.startsWith('Correct.');state=correct?'correct':'incorrect';pose=correct?'thumbs-up':'caution';message=correct?'Good call. You are making deliberate production choices.':'Not quite. Read the explanation and use that principle on the next question.';
    }
   }
   scope.dataset.skillState=state;react(c,pose,message);
  };
  const observer=new MutationObserver(update);
  scope.querySelectorAll('#questionArea,#results,#result,[data-library-quiz]').forEach(host=>observer.observe(host,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['class','data-answer-state','data-current-question']}));
  update();
 }
 document.addEventListener('visibilitychange',()=>document.documentElement.classList.toggle('avatar-motion-paused',document.hidden));
 reduced.addEventListener('change',()=>{if(reduced.matches)avatars.forEach(el=>el.classList.remove('avatar-entering','avatar-reacting','avatar-playing'));});
 orient();window.addEventListener('load',orient);window.addEventListener('resize',orient);document.addEventListener('toggle',orient,true);
 document.addEventListener('click',e=>{if(e.target.closest('[data-resource-tab],.tab'))requestAnimationFrame(orient);});
 document.querySelectorAll('[data-avatar-replay]').forEach(button=>button.addEventListener('click',()=>{const el=document.querySelector(button.dataset.avatarReplay);if(el)play(el,'tap');}));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
