(()=>{
  const guides=[
    ['task-1','storyboard','Alexx Roy reviewing the character plan'],
    ['task-2','idea','Alexx Roy developing the hero base'],
    ['task-3','pointing','Alexx Roy pointing to the title task'],
    ['task-4','camera','Alexx Roy framing the A-roll'],
    ['task-5','microphone','Alexx Roy guiding the sound pass'],
    ['task-6','headphones','Alexx Roy listening to the edit'],
    ['task-7','clapperboard','Alexx Roy calling the final export']
  ];
  for(const [id,pose,label] of guides){
    const header=document.querySelector(`#${id}>header`);
    if(!header)continue;
    const avatar=document.createElement('div');
    avatar.className=`studio-avatar ${pose} w3d2-task-avatar`;
    avatar.setAttribute('role','img');
    avatar.setAttribute('aria-label',label);
    header.append(avatar);
  }
})();
