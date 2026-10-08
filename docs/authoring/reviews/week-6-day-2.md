# Week 6 Day 2 — content review

- **Revision:** working tree on `author/week-5-day-2-mahabharata-preproduction`; existing changes preserved; no publish/push.
- **Guide:** `sessions/week-6-day-2/index.html`
- **Playbook:** `sessions/week-6-day-2/playbook.html`
- **Native homework:** [Week 6 Day 2 Create a Complete AI UGC Ad Homework](https://docs.google.com/document/d/18ql4IsJL5RwCQ5jExGZxvk46kUFuxqQsptIjhfKSD2w/edit), one native tab, owner-only/private at last check.
- **Schedule:** Nov 8, 2026, 8–10 PM IST; existing registered lesson 12 retained.
- **Source:** supplied transcript and [AI Filmmakers Cohort UGC Masterclass](https://aifm-ai-ugc.tiiny.site/).
- **Local preview:** `http://127.0.0.1:8766/__review__/sessions/week-6-day-2/index.html` and `/playbook.html`; regular preview route remains scheduled/locked.

## Content and consistency

- **Pass:** Title, number, week/day, stage, schedule, result and five-stage workflow agree across JSON, guide, playbook and Doc readback.
- **Pass:** Five stages map to five practice cards and five homework evidence areas; checklist has six matching criteria.
- **Pass:** Four complete source prompts are reproduced and attributed. Incomplete product-in-hand prompt is identified as a paraphrased task, not supplied as an official prompt. Fictional serum/age claims carry a replacement warning.
- **Pass:** Source says video-to-video for Module 4; transcript says text-to-video. Both pages disclose the mismatch and direct students to check current mode.
- **Pass:** No group URL or deadline invented. Homework says use current cohort instructions.
- **Pass:** Course reference link appears in guide, playbook and Homework Doc.
- **Pass:** Guide has no direct Google Doc links; playbook links the single canonical Doc at top and `#share`; homepage card and schedule regenerated from lesson data.

## Website and resource checks

- **Pass:** `npm run build` and `site:check` (24 pages, 15 sessions, 0 errors / warnings); `npm run resources:build` (23 tools, 91 prompts/recipes, 11 checklists from 22 lesson files).
- **Pass:** `npm run qa:review` (24 pages open in owner-review namespace; ordinary local preview remains locked).
- **Pass:** `npm run qa:visual` against ordinary preview — all 62 configured tests passed. (Its page fixtures stop at Week 5.) Focused Week 6 Day 2 Playwright review at 320, 390, 820 and 1440 px: no horizontal overflow; prompt details open; playbook checklist persists after reload; quiz correct-state feedback works; no page errors; no Homework Doc link on guide.
- **Pass:** Screenshots reviewed at mobile and desktop sizes; hero artwork loads, content stacks on mobile, playbook structure is intact, and an in-view avatar loads from the approved pose library.
- **Issue (existing fixture):** `npm run qa:cohesion` catches a broken legacy link from `sessions/week-2-day-2/playbook.html` to its absent `homework.html`; the changed Week 6 Day 2 pages have no broken links in `site:check` or focused review.
- **Pass:** `npm run qa:release` against the ordinary local preview — local locks, countdown ticks, boundary auto-unlock, and external homework guard passed. Its specific assertions cover sessions through Week 4; Week 6 was also checked directly.
- **Issue (other lesson):** `npm run qa:fixes` stops at existing `sessions/week-6-day-1/playbook.html` for pose-variety assertion before reaching this lesson.
- **Pass:** `npm run qa:content-review` — all 96 viewport captures, input labels, legacy-state migrations, and 19 source prompt comparisons passed. (Its fixed fixture list ends at Week 5; Week 6 was additionally covered by focused browser checks.)
- **Not checked:** Repository Playwright visual suite has no Week 6 Day 2 fixtures. Used direct local screenshot review instead.

## Native Homework Doc

- **Pass:** Native document readback confirms title, one tab, source/session/playbook links, five task sections, answer tables, final review and submission/reflection sections. Seven page breaks and embedded artwork are present; exported PDF text/readback indicates seven pages.
- **Pass:** Five approved avatars plus hero image are embedded. Six actionable review criteria were assigned the native checkbox list preset during authoring.
- **Pass:** Readback confirms the playbook and course links and canonical URL.
- **Pass:** Opened the signed-in native Google Doc and visually inspected its cover, product-image task, talking A-roll prompt, and final reflection/submission page. The cover art renders; task instructions, long source prompt, shaded response spaces, five supporting avatars, and footer/page flow appear within their page margins. Google Docs indicates seven pages. The long source prompt is intentionally compact to fit the selected seven-page format, but wraps and remains selectable text.
- **Not checked:** Student access/copy behavior. Doc remains private; sharing was not authorized.
- **N/A:** No existing official document edited, so no backup copy was required.

## Handoff findings

The connected lesson set is authored and built locally. No website was published and no Drive sharing was changed. The seven-page Doc has been visually inspected in Google Docs. Before student use, set the intended student access; the Doc remains private because sharing was not authorized. The broader cohesion and fixes QA findings originate in older or adjacent lessons and are recorded above.
