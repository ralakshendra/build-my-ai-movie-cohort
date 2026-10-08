# Week 5 Day 1 author and release review

## Revision

- Session: `week-5-day-1` — Real Estate Walkthrough Challenge
- Revision: uncommitted working diff. The shared checkout was externally switched from `author/week-5-day-1-real-estate-walkthrough` to `author/week-5-day-2-mahabharata-preproduction` while both future-session drafts were in progress; no branch switch, commit or publish was performed during handoff.
- Guide: `sessions/week-5-day-1/index.html`
- Playbook: `sessions/week-5-day-1/playbook.html`
- Homework: [canonical native Google Doc](https://docs.google.com/document/d/1qHcYXyMzjkQSD6remiUbcOcrgI9wMqELxpDtU2Oxylk/edit), single tab `t.0`
- Ordinary preview: `http://127.0.0.1:8766/sessions/week-5-day-1/index.html`
- Owner review: `http://127.0.0.1:8766/__review__/sessions/week-5-day-1/index.html`
- Sources: Week 5 Day 1 transcript for class facts; [current class handout](https://docs.google.com/document/d/1WL-yOxzgmvCZTDNMphWndJ8ZL0tOiBa7-ebi5lGuj9Q/edit) for links and exact prompts.

## Findings

### Content and deliverables — pass

- Identity, schedule, stage, four tasks, five official prompts, four practice recipes and five review checks agree across the guide, playbook, structured data, Resource Library and Homework Doc.
- Guide contains playbook links near its beginning and end and contains no direct Homework Doc link.
- Playbook contains the canonical Homework Doc link near its beginning and in `#share`.
- Submission uses the established process requested by the user: one team film in the cohort group, with link and notes recorded in Homework.
- Demonstration content is labelled; no missing prompt, tool setting or export specification was invented.

### Shared site and interactions — pass

- Both pages use shared metadata, header, home control, skip link, main landmark, footer, schedule, styles and runtime.
- No inline styles, embedded CSS, duplicate runtime or copied schedule was introduced.
- Responsive visual review covered 320, 390, 820 and 1440 pixels. Evidence is saved in `qa/artifacts/week-5-day-1/`.
- Exact prompt copy, keyboard avatar tip, four-question quiz, wrong/correct/final avatar reactions, five-item progress, reload persistence and Resource Library progress sharing passed.
- Ordinary future URLs remain locked; the owner-review namespace opens and keeps navigation reviewable.
- Generated practice recipes link to their corresponding `#task-1` through `#task-4` sections.

### Resource Library and QA — pass

- `npm run build` after the October 8 copy and visual revision: pass — 20 pages, 15 sessions, zero errors and zero warnings; library rebuilt with 21 tools, 74 prompts/recipes and 9 checklists.
- `npm run qa:review`: pass — 20 pages open in owner review and ordinary preview remains locked.
- `npm run qa:cohesion`: pass — all 60 page/viewport combinations.
- `npm run qa:release`: pass — lock, countdown, boundary unlock and external-homework guard.
- `npm run qa:content-review`: pass — 96 viewport captures, input labels, legacy-state migrations and 19 source prompt comparisons.
- `npm run qa:visual`: pass — all 62 tests.
- `npm run qa:fixes`: pass — saved progress, shared resources, filtering, exact copy, quizzes, 320px layouts, avatar tips and locks.
- Focused Week 5 Day 1 check after the revision: pass at 390, 820 and 1440 pixels — both owner pages have the Alexx hero, no broken images or overflow, new class handout links and oriented avatars; ordinary URLs remain scheduled-locked.
- The rerun of `qa:cohesion` stops at a pre-existing Week 2 Day 2 playbook link to absent `homework.html`. The rerun of `qa:release` times out waiting for a homepage session picker selector. Neither failure was caused by the Week 5 Day 1 pages; both need separate site-wide repair before release.

### Native Homework Google Doc — pass; access unverified

- Before this revision, copied the canonical Doc to [a dated backup](https://docs.google.com/document/d/1TCTonFFDhZ-HME-xPw_EUN0v77aM3gIw65BxlR-iqyI/edit). The backup is not linked from the site.
- Before the avatar alignment pass, created a second native [dated backup](https://docs.google.com/document/d/13m7yVo3cwXxLwzL1fCBZU7b-MApoW72P2A9ZVRUoF1Q/edit). It is also noncanonical and unlinked.
- Readback verified Inter typography, native date chip, rich source-file chip, five native checkbox bullets, complete text and one tab.
- The revised eight-page PDF render was visually reviewed for page flow, answer areas, avatar placement, links and instructions. The cover now has the same Alexx hero as the guide and playbook. Six approved section avatars remain near their headings; four poses were replaced because they looked or gestured away from the text.
- Avatar heading tables now use content-sized columns with zero cell padding, keeping every figure immediately beside its heading. Final PDF review confirms all six figures face or gesture inward; the two longer task headings remain on one line.
- The new class handout is a native rich file chip. Readback found no old handout URL in the canonical Doc. All five supplied prompts remain intact.
- The homework folder contains one Week 5 Day 1 canonical Doc and two dated backups. The repo references only the canonical homework ID; no stale class handout ID remains in site content.
- No dropdown was required. No existing Doc, student work, sharing setting or named-person notification was changed.
- Student access visibility remains unverified because no permission change was authorized.

## Handoff

- All requested artifacts are complete and reviewable locally and in the native Doc.
- Source images and optimized serving files remain recoverable.
- Nothing has been pushed, published or merged. Hosted performance and hosted release checks remain pending until an authorized release.
