# Cohort audit implementation brief

Approved scope: the user said “go ahead now” after the read-only audit and proposal preview. Implement the repository fixes locally for review. No commit, push, main update, deployment, live Doc edit or permission change is included in this working revision.

Baseline: main `fe3e5eedd4838167797954b6e5b35f682da362d7`. Working branch: `fix/cohort-audit-improvements`.

## Current sources and preserved facts

- Existing guides, playbooks, `content/*.json`, the shared schedule and authoring kit are the source packet. No new lesson or assignment was invented.
- All 15 registered session IDs, numbers, start/end timestamps, canonical Homework Doc URLs and guide/playbook routes are preserved.
- All complete official prompt bodies remain unchanged. Display titles and field metadata are editorial improvements. Existing Vault and resource anchors remain stable.
- The Week 6 Day 2 five-stage UGC workflow supplies the specific input/output handoffs. Structured content and runtime data include the same added facts. Original task instructions, homework records, checklists and quiz facts remain intact.
- Full existing lesson titles are used for Week 3 Day 2 and Week 4 Day 2. Creative headlines remain subtitles.
- The 15 catch-up paths link to existing guide anchors and do not reduce official assignment requirements. No time estimates, deadlines, support URLs or recording timestamps were guessed.
- ElevenLabs publishing guidance was checked on 10 October 2026 against https://help.elevenlabs.io/hc/en-us/articles/13313564601361-Can-I-publish-the-content-I-generate-on-the-platform. The guide links to that source beside the demonstration.

## Source ownership

- `content/prompt-metadata.json`: explicit named fields and editorial names for the two foundation prompts. JSON string substitutions are encoded safely.
- `scripts/prompt-fields.cjs`: conservative named-token extraction; structural JSON arrays/objects are excluded.
- `content/learning-paths.json`: actual preparation facts and guide anchors. Optional recording details require owner-provided URLs and verified viewing access.
- Shared generators rebuild Vault, resource, learning-path and library output. Generated HTML resource blocks are not manually patched.
- `library/progress.js`: storage success/failure state and in-memory recovery for backup; browser progress remains separate from Doc answers and submission.
- `qa/audit-fixes.cjs`: regression evidence for prompt structure, original text, keyboard tabs, dynamic search release guards, catch-up links, task layout and denied storage.

## Remaining external inputs

The recording destination and viewing policy were requested during implementation. No recording URL or embed was registered without those inputs. Player/transcript/chapter support is prepared but inactive until verified metadata is supplied.

Authenticated hosted pages, Cloudflare domain/preview/asset policies, Google Docs student permissions and actual submission support channels require separate access verification. Client release locks remain learning-schedule controls, as documented in `docs/SHARED_SITE_LIBRARY.md`; no hard-confidentiality claim is made.

Native Homework Docs were not edited. Their instructions, native controls, canonical links and student answers remain unchanged; native visual/access verification is not claimed for this website revision.
