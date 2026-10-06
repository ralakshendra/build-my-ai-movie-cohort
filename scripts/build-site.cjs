const fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
fs.writeFileSync(path.join(root,'library/components.css'),'/* Generated shared component library. */\n'+(read('studio.css')+'\n'+read('avatar-motion.css')).replace(/url\(['"]?assets\//g,"url('../assets/"));
fs.writeFileSync(path.join(root,'library/site.js'),['library/schedule.js','library/page-contract.js','library/lesson-engine.js','app.js','session-ui.js','avatar-motion.js','resource-library.js'].map(p=>'\n/* '+p+' */\n'+read(p)).join('\n;\n'));
console.log('Shared library built: schedule, page contract, navigation, release gates, avatars, resources.');

const crypto=require('crypto');const versions={};for(const file of ['library/site.js','library/components.css','library/playbook.css'])versions[file]=crypto.createHash('sha256').update(read(file)).digest('hex').slice(0,12);
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
for(const file of walk(root).filter(p=>p.endsWith('.html')&&!/(^|[\\/])(qa|templates|node_modules|test-results|dist)[\\/]/.test(path.relative(root,p))&&!p.endsWith('hero-approval.html'))){let html=fs.readFileSync(file,'utf8');for(const [asset,version] of Object.entries(versions)){const escaped=asset.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');html=html.replace(new RegExp('('+escaped+')(?:\\?v=[^"\\s]+)?','g'),'$1?v='+version);}fs.writeFileSync(file,html);}
