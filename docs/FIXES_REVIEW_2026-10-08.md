# Website fixes ready for local review

Updated 8 October 2026. The revised website was prepared from `build-my-ai-movie-cohort-main.zip` and contains **16 public pages**. The current editable source is `qa/fixed-site/` in the local workspace. This report records the completed local review before the user authorized committing these changes to the repository.

## Latest requested changes

| Request | Finished change |
| --- | --- |
| Homework Docs only in playbooks | Direct Google Homework Doc links appear only in playbooks, at the beginning and the submission area. Session guides and homepage assignment cards lead to the relevant playbook. Duplicate Playbook buttons created during this correction were consolidated. |
| Remove the extra worksheet safely | The Week 2 Day 2 HTML worksheet and its dedicated CSS are preserved outside the public site in `qa/worksheet-backup-2026-10-08/`, alongside a complete pre-removal ZIP. Its route is removed from the public schedule and sitemap. |
| Use the complete avatar library | All 25 approved poses are represented across the site. Placement follows the lesson topic: camera for framing, headphones for audio, microphone for narration, laptop for production work, and appropriate planning, review and celebration poses. |
| Avoid repeated or purposeless avatars | No adjacent repeated static poses or nested guidance panels remain. Each skill/progress section has one instructor. Closing panels were consolidated while retaining their text and navigation. Locked and 404 pages each use one instructor. |
| Use the right incorrect-answer pose | An incorrect answer uses the caution/pause pose with review guidance. Correct answers use thumbs-up, and a perfect completed check uses applause. Empty or untouched checks do not celebrate. Retry and changed answers reset feedback appropriately. |
| Make every skill and progress interaction work | All eight skill checks react to answers. All ten progress sections react to zero, partial and complete progress and restore after reload. Keyboard and click tips update with the current pose and feedback. |
| Face the content | Shared orientation follows the adjacent text or visual and adapts to the layout. Conflicting fixed flips were removed from the later lesson styles. |
| Use the drink avatar only where relevant | The product/drink pose is limited to the Week 2 Day 2 coconut advertisement lesson. |
| Repair the supplied screenshot | Week 3 Day 1's pipeline guidance is now one panel with one reference-board instructor. The connected-scene guidance and useful supporting text remain. The nested panel, unrelated drink avatar and empty space were removed. |
| Repair Week 3 Day 1 playbook hero | The desktop hero uses a balanced two-column layout and shows the complete portrait. Phone layouts stack correctly. Responsive optimized images replace the oversized image request. |

The official Google Homework Docs were **not edited**. Existing official URLs and the 19 full reusable prompts were preserved. Google Doc content and access review remain for the later work requested by the user.

## Earlier improvements retained

- Shared progress persistence restores main and practice checkmarks before calculating completion. Older records migrate to stable task identities; resource checklists and playbooks share state.
- Resource links now resolve to real source sections. The library contains **14 tools, 19 full prompts, 37 practice recipes and seven checklists**. Full prompts and practice instructions remain separately labelled.
- The Resource Library supports text search, session filters, keyboard tabs, result counts and exact prompt copying.
- Homepage session selectors include All sessions, resume navigation, current material and scheduled upcoming lessons. Release boundaries update the relevant views.
- All public pages retain the shared brand, header, home link, skip link, main landmark, footer and static metadata.
- Mobile fixes cover stacked quiz answers, focus outlines, task/progress layouts, action spacing and the older masterclass grid.
- Responsive serving images and lazy avatar textures reduce initial requests. Large source images remain preserved as source assets. Avatar textures are not all preloaded.
- Future-page guidance and the lesson generator now preserve the playbook-only homework flow and shared avatar behavior.
- Automated workflow uploads are optional, so full remote Actions artifact storage does not replace the local QA result. Existing remote artifacts were not deleted.

## Current validation

All checks run against the revised **16-page local site**, with controlled browser dates for future lessons. No release times or hostname bypasses were added to website source.

| Check | Result |
| --- | --- |
| Build and structural checks | 16 public pages, 15 schedule entries; zero errors or warnings. Resource Library rebuilt from lesson source. |
| Existing browser suite | 54 checks passed, including released/locked pages and mobile navigation. |
| Cohesion checks | 48 page/viewport combinations at 390, 820 and 1440 pixels passed. |
| Narrow layout and composition | All 16 pages at 320 pixels passed. Composition checked at 320, 390 and 1440 pixels: 402 avatar orientation checks, no adjacent duplicate poses, no nested guidance and no horizontal overflow. |
| Skill checks | All eight at desktop and phone widths: wrong answers, correct answers, final result and applicable retry/change behavior passed. |
| Progress checks | All ten at desktop and phone widths: zero, partial, complete and reload restoration passed. |
| Avatar library and tips | All 25 approved poses represented; 264 visible instructor tip checks passed using Enter and Space, with loaded textures and current feedback. |
| Final review captures | 96 viewport captures cover the beginning, middle and end of every page at phone and desktop widths. These were visually reviewed as contact sheets, with detailed hero, pipeline and incorrect-feedback captures. |
| Prompt preservation | All 19 full prompts compared exactly with their source text. |
| Additional interactions | Saved progress migration, shared resource checks, search, exact clipboard copy, input names, quiz controls and lock navigation passed. |
| Release behavior | Countdown ticks, automatic unlocking, homepage release changes and official homework guards passed. |

Local evidence is in `qa/fixed-site/qa/artifacts/`, `qa/avatar-review/checks/`, `qa/avatar-review/composition/` and `qa/avatar-review/final-details/`. Generated screenshot and browser report folders are excluded from the review ZIP.

### Performance scope

The earlier local cold-request inventory measured a reduction from approximately 6.74 MB to 0.36–0.41 MB for the homepage and from 7.48 MB to 0.33–0.50 MB for the first playbook. These are local requested-file totals from that earlier measurement, not hosted speed, network transfer timing or Core Web Vitals. The latest refinements retain responsive serving assets and lazy textures. Hosted performance requires review after an authorized deployment.

## Preservation and review

The original source ZIP and reference extraction remain untouched. In addition to the worksheet backup, `qa/website-before-avatar-review-2026-10-08.zip` preserves the website before this avatar refinement. Browser storage records were not deliberately cleared.

The ordinary local preview at `http://127.0.0.1:8771/` follows the production release schedule. **Review Website in Brave.lnk** opens a separate Brave review context that simulates a date after the final release, allowing all local pages to be reviewed. It opens the homepage with All sessions selected and the repaired Week 3 Day 1 playbook. Website source, production locks, the computer clock and external Google Docs are unchanged.

Review package: `BMAMS-website-fixed-2026-10-08.zip`. Source changes are listed in `docs/FIXES_MANIFEST_2026-10-08.json` inside that package. Nothing has been published, pushed or merged.


## Repository integration

The reviewed changes are being committed on the current main branch by user request. Newer repository changes to the local owner review area and branding were preserved. The repository also keeps qa:review for the local review area; the detailed content checks are available as qa:content-review. The source worksheet remains recoverable from the local backup and Git history. A source push alone does not confirm that a hosted website has deployed.
