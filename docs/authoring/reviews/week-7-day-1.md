# Week 7 Day 1 author and release review

## Revision

- Session: `week-7-day-1` — Build Your AI Twin for UGC Videos, session 13, MOVIE stage; scheduled Nov 14, 2026, 8–10 PM IST.
- Release branch: `release/week-7-day-1`, rebased on the latest `origin/main` (`d2aaed4` at final QA).
- Guide: `sessions/week-7-day-1/index.html`.
- Playbook: `sessions/week-7-day-1/playbook.html`.
- Canonical Homework Doc: https://docs.google.com/document/d/1ALm4BKj-6wdIDHxmhXt6DFcka-tMz-7s4sZmjjxxHZ8/edit.
- Sources: supplied Week 7 Day 1 transcript and [Gemini reference](https://gemini.google.com/share/c4be21f351ca). Video placeholders in the reference were ignored.
- Homework prompt section: intentionally omitted because the exact official prompt was not supplied; do not add a reconstructed prompt.
- Submission: record results in the Homework Doc; no separate submission route was supplied.
- Local ordinary preview: `http://127.0.0.1:8770/sessions/week-7-day-1/index.html` (scheduled gate applies).
- Owner review: `http://127.0.0.1:8770/__review__/sessions/week-7-day-1/index.html` and `/playbook.html`.

## Content and cross-deliverable consistency — pass with source limitation

- Week/session number, title, MOVIE stage and scheduled release agree across schedule, guide, playbook and Homework Doc.
- The guide explains portrait preparation, Flow character creation and Agent use, verified video-avatar setup, comparison and troubleshooting. The four playbook tasks align with the Homework Doc’s portrait, Flow, video-avatar and comparison/review work.
- Practice recipes remain distinct from full prompts. No exact official prompt was invented. Gemini video placeholders were excluded.
- The playbook links to the canonical Doc near the top and at the submission section. Students record result links, comparison and first fix in the Homework Doc. The guide contains no direct Homework Doc link and links to the playbook near the start and end.
- Homework Doc readback confirmed the requested tasks and review areas. The Doc is shared as “anyone with the link” reader according to current Drive metadata; student-account access was not independently tested. No permission change or Doc edit was made.

## Session guide and playbook — pass locally

- Both pages use the shared page shell, site metadata, main landmark, navigation, skip link and footer. Hero artwork and responsive `srcset` use optimized WebP assets; the original PNG is retained under `assets/source-art/`.
- The guide and playbook hero layouts, section navigation and avatar placements were visually inspected. Guide guidance uses distinct poses and contextual tips; playbook task avatars use correct cropped sprite poses and accessible click/keyboard tips. Skill feedback, saved checklist state and quiz response poses were exercised.
- Homework Doc visual review previously covered the five-page export: four approved avatars, shaded answer areas and checkbox review list were visible without clipping or overlap. No Doc content was changed in this release.
- `npm run build` passed: 31 public pages, 15 registered sessions, zero site-check errors and warnings. Resource source generation includes Week 7 Day 1; generated blocks were produced by the build (30 tools, 109 prompts/recipes, 14 checklists).
- `npm run qa:cohesion` passed all 93 page/viewport combinations at 390, 820 and 1440 px, including shared shell, anchors, local links, media, avatar rendering and overflow checks.
- Focused visual QA passed all nine Week 7 tests: guide and playbook at 320, 390, 820 and 1440 px, plus avatar keyboard/tip behavior, checklist persistence and skill feedback.
- `npm run qa:content-review` passed all 96 viewport captures, input-label checks, legacy-state migrations and 19 source-prompt comparisons.
- `npm run qa:review` passed all 31 pages: review navigation remains in the owner namespace and ordinary preview remains locked.
- `npm run qa:release` passed local scheduled locks, countdown, boundary auto-unlock and external homework link guard.
- Local preview checks do not establish hosted performance or deployment.

## Native Homework Google Doc — reviewed; no edits in this release

- Existing canonical Doc URL and content were read back. Five-page PDF layout review found usable answer areas, the avatar placements and checkbox review list without clipping or overlap.
- Current Drive metadata reports anyone-with-link reader access. Access with an actual student account was not checked.
- This release did not edit the official Doc, change its sharing, create a backup or alter canonical links.

## Hosting and release status — live pages verified

- Commit `9548b7c` was pushed to public `main`. Its GitHub Pages deployment completed successfully.
- The hosted homepage, Week 7 Day 1 guide, playbook, schedule, page stylesheet, and both optimized hero images returned HTTP 200. The live guide and playbook titles/session IDs matched Week 7 Day 1; the playbook contains the canonical Doc URL, while the guide does not.
- The GitHub Pages API returned 404 while these hosted pages returned 200, so direct page responses and the successful Pages deployment run were used as release evidence.
- GitHub Actions exposed two test-harness issues: the interactive test first opened the scheduled student URL, and the first 320 px test change was applied to all pages (the 404 page does not pass at that width). The interaction check now uses the owner-review route, and the 320 px cases are limited to Week 7 Day 1. The complete local `npm run qa:visual` run passed all 81 tests, including both Week 7 pages at 320, 390, 820 and 1440 px. A fresh GitHub Actions run is pending this final test-scope correction.
- No repository visibility, Pages setting, or student-document permission was changed during this work.

## Final findings

Week 7 Day 1 is complete, pushed to `main`, and live. Build, cohesion, full local visual QA, content, owner-review, scheduled-release and hosted-page checks passed. The exact official prompt remains intentionally omitted; final GitHub Actions confirmation for the visual-test correction is pending.
