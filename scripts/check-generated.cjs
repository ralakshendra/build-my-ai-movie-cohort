/* Run after build in CI. Check all generated tracked pages and shared outputs. */
const {execFileSync}=require('child_process'),path=require('path');
const root=path.resolve(__dirname,'..');
const outputs=[...require('./public-pages.cjs')(),'resources/catalog.json','content/prompt-vault-manifest.json','content/task-identities.json','library/task-identities.js','library/learning-paths.js','library/site.js','library/components.css','library/schedule.js'];
execFileSync('git',['diff','--exit-code','--',...outputs],{cwd:root,stdio:'inherit'});
const unknown=execFileSync('git',['ls-files','--others','--exclude-standard','--',...outputs],{cwd:root,encoding:'utf8'}).trim();
if(unknown)throw Error('Generated outputs must be tracked before release: '+unknown);
console.log('All generated page, resource, identity and shared-library outputs are current.');
