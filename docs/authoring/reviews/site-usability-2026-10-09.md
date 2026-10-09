# BUILD MY AI MOVIE STUDIO — usability update and review

Reviewed 9 October 2026, IST. Implementation is in the maintained `qa/site-repository` checkout on the existing `task/week7-avatar-masterclass` working branch. No commit, push, main-branch change or publication was performed.

Verification scope: the full-site results and page counts below describe the revision before the other chat's universal Prompt Vault integration. They do not certify that ongoing integration. Following the user's scope update, this task changed only the homepage header to Sessions → Playbooks → Homework → Prompt Vault → Resources, with bold labels and decorative icons. The header asset build succeeded and its order, links, typography and layout were checked in the local browser at mobile and desktop sizes. Final full-site validation must run after the Prompt Vault work is complete.

## Preview

- [Ordinary student hub](http://127.0.0.1:8776/): follows scheduled access.
- [Owner review area](http://127.0.0.1:8776/__review__/): opens authored content for local review.
- [Example revised playbook](http://127.0.0.1:8776/__review__/sessions/week-8-day-2/playbook.html).

The preview server remains running. Local review access is supplied by the preview server; no hostname bypass or release override was added to public scripts.

## What changed

| Area | Result |
| --- | --- |
| Student hub | Current-work action, prominent resume when history exists, next-class date, collapsible week groups, and one selected playbook/homework shortcut instead of complete repeated libraries. |
| Mobile length | Ordinary homepage measured approximately 8,750 pixels at 390 px, compared with approximately 36,700 before, about 76% shorter. This is a local layout measurement, not hosted performance. |
| Availability | Future lesson cards and shortcuts display Locked status and schedule-derived opening dates. Scheduled guards and direct-page locks remain active. |
| Guide entry | The first three guide introductions and opening playbook actions now sit inside the main landmark, so skip navigation reaches the introduction. Existing end links remain. |
| Identity | Shortcut titles come from the schedule. Older playbook titles and homepage sharing metadata were aligned with the studio identity. |
| Resources | Available-now filtering, full-prompt/practice-recipe filtering, version-preserving tool-family filtering, one-disclosure full prompts, stable resource destinations, and announced copying feedback. |
| Tool provenance | Known tool source selection prefers the earliest scheduled supporting lesson, preventing a later reference from unnecessarily locking an existing resource. |
| Practical tasks | Existing facts are organized into Prepare, Goal, Deliver and Check fields; First fix and Next are expandable. All facts remain in authored source. |
| Learning review | Labelled practice aids reuse existing quiz scenarios and explanations for worked decisions. Distractors were improved in Week 3 Day 2, Week 4 Day 1 and Week 5 Day 1; content records and runtime data were updated together. |
| Progress | Download/restore backups, explicit separation of self-review from submission, durable checkpoint identities and migration from existing saved state. Wording-only updates can retain identity through the documented registry. |
| Submission | Final handoff guidance explains recording answers/output links, checking review access and following the official assignment instructions. Browser checkpoints do not imply homework was submitted. |
| Accessibility | Visible focus states, minimum-height controls, announced copying/import feedback, keyboard resource tabs and menus, and expanded mobile-panel checks. An existing Week 5 Day 2 panel overflow was corrected at narrow widths. |
| Maintenance | Shared automatic public-page inventories, all-page 320 px coverage, a new student-workflow check in CI, and updated authoring guidance. Working artifacts under `tmp/` are excluded from public-page discovery. |

The separate Prompt Vault update appeared in the same shared checkout during this work. It was preserved, included in the shared bundle/build and reviewed alongside the maintained pages. This usability change did not create an additional Homework Doc or replace a canonical assignment link.

## Completed review checklist

| Check | Status and evidence |
| --- | --- |
| Build and shared identity | **Pass** — current build/site check: 48 public pages, 15 sessions, no errors or warnings. Generated resources and shared bundles were rebuilt from their sources. |
| Schedule and canonical URL preservation | **Pass** — student-workflow static comparisons verify every original start/end, session number, session/playbook route and homework URL against the Git baseline. |
| Exact official source prompts | **Pass** — every original guide/playbook `pre` body matches the Git baseline; content review also passed 56 source-prompt comparisons. Deliberate whitespace in official prompts remains intact. |
| Content records and runtime | **Pass** — revised quiz records match their runtime data; official prompts and practice instructions were preserved. Worked decisions are labelled practice aids, not approved generated results. |
| Resource distinction and attribution | **Pass** — generated catalog contains 36 tools, 126 prompts/recipes and 15 checklists. Full prompts and recipes have distinct filterable types; source links remain. |
| Responsive layout/shared shell | **Pass** — cohesion: 192 public-page/viewport combinations at 320, 390, 820 and 1440 px. Checks include the shared shell, overflow, local links, images and avatar geometry. |
| Visual fixtures | **Pass** — 205 tests, including every public page at four widths, scheduled-access fixtures and quiz/avatar feedback. |
| Content capture/input labels | **Pass** — 288 viewport captures, named input checks, legacy state restoration and 56 exact prompt comparisons. |
| Existing interactions | **Pass** — fixes check covers persisted checkpoints, resource/playbook sharing, search, exact copying, quizzes, avatar tips, narrow layouts and lock states. |
| New interactions | **Pass** — student-workflow checks cover compact/locked hub behavior, keyboard tabs, conditional filters, one-disclosure copying, deep links, old-state migration, stable wording identities, backup round trips and invalid-file preservation. |
| Keyboard and expanded panels | **Pass** — menus, Escape focus restoration and expanded review-panel overflow checks across all 48 pages at 320 px. |
| Ordinary release behavior | **Pass** — 45 authored route boundaries, countdown ticks, automatic unlock, current-session updates and homework guards. |
| Owner review behavior | **Pass** — all 48 pages open in review; navigation stays there; ordinary preview remains locked. |
| Human visual inspection | **Pass for inspected views** — inspected the ordinary hub, phone/desktop captures and representative guide/task views. Automated screenshots and structural checks cover all pages; this is not a claim that every section received a detailed human accessibility review. |
| Homework link existence/sharing | **Pass at metadata level** — all 15 canonical URLs resolve to native Homework Docs. Week 5 Day 2 initially showed owner-only permissions. After the user's approved manual correction, metadata verified anyone-with-link reader access, matching the other 14. No permissions were changed by the agent. |
| Native document content/layout | **Not applicable to this site's implementation / not re-audited** — no native Doc content was edited. No claim is made about newly verified native checkboxes, answer areas or page flow. |
| Signed-in production behavior | **Not checked** — hosted origin requires Cloudflare Access and no signed-in site session was available. Local success is not deployment proof. |
| Hosted/mobile network performance | **Not checked** — no hosted performance numbers are claimed. |
| Missing official instructions/examples | **Source-dependent** — existing official requirements remain. No new deadline, destination, support contact or instructor-approved output example was invented. Worked decisions provide labelled teaching support using existing material. |
| Release authorization | **Pending user review** — local changes only; no push or publication. |

## Evidence locations

- `qa/cohesion-results.json`: final 192-combination structural results.
- `qa/report/`: completed Playwright visual report.
- `qa/artifacts/fixes/results.json`: interaction and narrow-layout results.
- `qa/artifacts/final-review/results.json`: input naming, captures, migration and source-prompt evidence.
- `qa/artifacts/student-workflow/results.json`: new workflow and 48-page keyboard/expanded-panel checks.
- `qa/artifacts/student-workflow/home-390.png` and `home-1440.png`: current-work hub captures.

## Release review

Review the ordinary hub and local owner-review pages before publishing. Production review still needs the actual signed-in student journey and hosted performance measurements. If confirmed submission details or approved visual examples are supplied, add them to the owning lesson sources and rebuild resources, rather than inserting invented facts or manually changing generated homepage blocks.
