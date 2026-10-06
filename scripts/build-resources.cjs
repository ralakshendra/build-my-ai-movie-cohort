const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
const escape=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain=x=>x.replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const files=[path.join(root,'playbook.html'),...walk(path.join(root,'sessions')).filter(p=>/\/(index|playbook)\.html$/.test(p.replace(/\\/g,'/'))),...walk(path.join(root,'resources')).filter(p=>p.endsWith('.html'))];
const lessons=files.map(file=>{const html=fs.readFileSync(file,'utf8'),rel=path.relative(root,file).replace(/\\/g,'/');const id=html.match(/data-session-id="([^"]+)"/)?.[1]||(/week-\d+-day-\d+/.exec(rel)?.[0])||'week-1-day-2';let data;const match=html.match(/const sessionData\s*=\s*({[\s\S]*?\n});?/);if(match)data=vm.runInNewContext('('+match[1]+')',{}, {timeout:1000});if(!data&&rel.endsWith('playbook.html')&&fs.existsSync(path.join(root,'content',id+'.json')))data=JSON.parse(fs.readFileSync(path.join(root,'content',id+'.json'),'utf8'));return{html,rel,id,data,label:id.replace(/week-(\d+)-day-(\d+)/,'Week $1 Day $2'),sections:[...html.matchAll(/<section\b([^>]*)>([\s\S]*?)<\/section>/gi)].map(m=>({id:m[1].match(/id="([^"]+)"/)?.[1],text:plain(m[2])}))}});
const tools=[
 ['Google Flow','Flow|Veo 3','Generate frames and image-to-video shots; build the visual world.'],
 ['OpenArt','OpenArt','Generate reference-led product frames and turn selected images into video.'],
 ['Nano Banana Pro','Nano Banana Pro','Create character sheets and photorealistic frames with uploaded references.'],
 ['Kling','Kling','Animate prepared frames and compare motion variations before the final edit.'],
 ['ElevenLabs','ElevenLabs|11 Labs|11Labs','Generate a voiceover, test voices, and prepare the audio for editing.'],
 ['Filmora','Filmora','Combine video, voiceover, and music into a finished timeline.'],
 ['Gemini','Gemini','Develop the colour palette and analyse reference material.'],
 ['Claude','Claude','Use the character sheet and mood board to create and review a screenplay.'],
 ['Kimi','Kimi','Run the channel research prompt and develop a launch blueprint.'],
 ['ChatGPT','ChatGPT','Create channel brand assets and develop visual or script ideas.'],
 ['Canva','Canva','Build channel banners and supporting visual brand assets.']
];
const source=(l,anchor)=>`<a class="studio-resource-source" href="${escape(l.rel)}${anchor?'#'+escape(anchor):''}">View ${escape(l.label)} ${l.rel.endsWith('playbook.html')?'playbook':'session guide'} &rarr;</a>`;
const fold=card=>card.replace(/<article([^>]*)>([\s\S]*?)<h3>([\s\S]*?)<\/h3>([\s\S]*)<\/article>/,(_,attrs,kicker,title,body)=>`<details${attrs}><summary><span>${kicker.replace(/<div/g,"<span").replace(/<\/div>/g,"</span>")}<strong>${title}</strong></span><span class="studio-resource-chevron" aria-hidden="true"></span></summary><div class="studio-resource-body">${body}</div></details>`);

const schedule=vm.runInNewContext('('+fs.readFileSync(path.join(root,'library/schedule.js'),'utf8').match(/window.BMAI_SESSIONS=([\s\S]*?);/)[1]+')',{}, {timeout:1000});
const tag=l=>`data-resource-release="${escape(schedule.find(x=>x.id===l.id)?.start||'')}" data-resource-session="${escape(l.id)}"`;
let toolCards=[];
for(const [name,pattern,description] of tools){const re=new RegExp('\\b(?:'+pattern+')\\b','i');const found=lessons.filter(l=>re.test(plain(l.html)));if(!found.length)continue;toolCards.push(`<article class="studio-resource-card"><div class="kicker">TOOL / WORKFLOW</div><h3>${escape(name)}</h3><p>${escape(description)}</p></article>`)}
// New tools can be declared directly on a lesson element without changing this script.
for(const l of lessons)for(const m of l.html.matchAll(/<[^>]+data-resource-tool="([^"]+)"[^>]*>([\s\S]*?)<\/(?:article|div|section)>/gi)){if(tools.some(t=>t[0]===m[1]))continue;toolCards.push(`<article class="studio-resource-card" ${tag(l)}><h3>${escape(m[1])}</h3><p>${escape(plain(m[2]))}</p></article>`)}
let promptCards=[],checkCards=[],seen=new Set();
for(const l of lessons){
 let promptNumber=0;
 for(const m of l.html.matchAll(/<pre\b[^>]*>([\s\S]*?)<\/pre>/gi)){const text=m[1].replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');if(text.trim().length<60||seen.has(text.trim()))continue;seen.add(text.trim());const anchor='resource-prompt-'+(++promptNumber);const original=m[0];if(!/\bid=/.test(original)){l.html=l.html.replace(original,original.replace('<pre','<pre id="'+anchor+'"'));fs.writeFileSync(path.join(root,l.rel),l.html);}const promptAnchor=original.match(/\bid="([^"]+)"/)?.[1]||anchor;const title=/ROLE &amp; PERSONA|ROLE & PERSONA/.test(text)?'YouTube channel research — God prompt':/transcript of a viral YouTube Short/.test(text)?'Viral Short → scene-by-scene JSON prompt':'Prompt from '+l.label;promptCards.push(`<article class="studio-resource-card" ${tag(l)}><div class="kicker">FULL PROMPT / ${escape(l.label)}</div><h3>${title}</h3><details class="studio-prompt-detail"><summary>Open and copy the prompt</summary><button type="button" class="btn secondary" data-copy-prompt>Copy prompt</button><pre>${escape(text.trim())}</pre></details>${source(l,promptAnchor)}</article>`)}
 if(!l.data)continue;
 for(const task of l.data.homework||[]){if(!task.prompt)continue;promptCards.push(`<article class="studio-resource-card" ${tag(l)}><div class="kicker">PRACTICE RECIPE / ${escape(l.label)}</div><h3>${escape(task.title)}</h3><details class="studio-practice-detail"><summary>Show practice steps</summary><p>${escape(task.prompt)}</p></details>${source(l,'mission')}</article>`)}
 if(l.data.checklist?.length)checkCards.push(`<article class="studio-resource-card" ${tag(l)}><div class="kicker">PRODUCTION CHECK / ${escape(l.label)}</div><h3>${escape(l.data.title)}</h3><p class="studio-resource-progress" aria-live="polite">0 / ${l.data.checklist.length} complete</p><div class="studio-resource-checks" data-resource-checklist="${escape(l.id)}">${l.data.checklist.map((text,i)=>`<label><input type="checkbox" data-resource-check="${i}"><span>${escape(text)}</span></label>`).join('')}</div>${source(l,'checklistSection')}</article>`);
}
const indexFile=path.join(root,'index.html');let index=fs.readFileSync(indexFile,'utf8');
for(const [id,cards] of [['tools',toolCards],['prompts',promptCards],['checklists',checkCards]]){const re=new RegExp('<!-- resources:'+id+':start -->[\\s\\S]*?<!-- resources:'+id+':end -->');if(!re.test(index))throw Error('Missing resource insertion point: '+id);index=index.replace(re,()=>`<!-- resources:${id}:start -->\n${cards.map(fold).join('\n')}\n<!-- resources:${id}:end -->`)}
fs.writeFileSync(indexFile,index);fs.writeFileSync(path.join(root,'resources','catalog.json'),JSON.stringify({tools:toolCards.length,prompts:promptCards.length,checklists:checkCards.length,sources:lessons.map(l=>l.rel)},null,2)+'\n');
console.log(`Resource library rebuilt: ${toolCards.length} tools, ${promptCards.length} prompts/recipes, ${checkCards.length} checklists from ${lessons.length} lesson files.`);
