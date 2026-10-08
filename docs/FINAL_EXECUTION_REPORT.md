# BUILD MY AI MOVIE STUDIO — initial site refactor report (historical)

This report records the initial 11-page refactor and its validation at that time. The current repository includes 17 public HTML pages through Week 4 Day 2. For current authoring and review instructions, use `AGENTS.md`, `docs/FUTURE_PAGE_CREATION_PROMPT.md` and `docs/SHARED_SITE_LIBRARY.md`.

Ordinary preview: http://127.0.0.1:8766/ (scheduled locks apply). Owner review: http://127.0.0.1:8766/__review__/ (all local pages open for review).

Use port 8766 instead of the earlier preview on 8765. The new preview server explicitly supplies the correct WebP, SVG, JavaScript and CSS content types. Restart it with `npm run preview`.

## Branding and student experience

At the time of this refactor, all eleven public pages used BUILD MY AI MOVIE STUDIO; Alexx Roy, Founder of Build My AI Movie Studio; and © 2026 AI FilmCraft - All Rights Reserved. Locked pages retained the shared header, Back to Home and footer. The current 17-page site is checked by `npm run build` and `npm run qa:cohesion`.

The next class remains in both the homepage teaser and Upcoming Sessions. Session, Playbook and Homework library headings have relevant vector icons; playbook/homework cards have smaller supporting icons.

The Resource Library separates tools, prompts, checklists and session references into expandable entries. Tools show their use cases without repeated reference clutter. Official full prompts and practice recipes remain distinct. Full prompts link to exact source IDs; fragment navigation opens ancestor dropdowns to reveal the source text. Checklist progress remains device-local.

## Scheduled locks and homework

`library/schedule.js` is the single schedule. Ordinary local preview and production obey the same start times, displayed in IST. The owner review area is an explicit, local-only preview route; its override is supplied by the preview server and is absent from production page scripts.

Future session guides, playbooks and existing homework workspaces show a lock screen with a live countdown. At release, the page reloads into its available state and homepage current/upcoming state updates. Future Google Doc homework links in homepage cards and page headers lead to the associated website lock screen before release. Matching uses Google document IDs rather than requiring identical query strings. Future session-specific prompts/checklists show release notices and restore their content at release.

The available Week 1 lesson stays accessible. The nonexistent Week 3 homework HTML route was removed from the old test list rather than presented as an actual workspace.

Limit: static website release gates control the student experience, not server-side authorization. Anyone who already knows a Google Doc URL can open it if its Google sharing permissions permit this. Website code does not change Drive permissions.

## Avatar fixes

The original playbook's generic checklist styling also matched the instructor checklist pose and erased its background image. That selector now excludes avatar elements. Texture loading, square dimensions, skill-check initial state and adjacent alignment were checked. Shared pose behavior, reduced-motion support and keyboard tips remain in place.

## Architecture and cleanup

- `library/site.js` combines the readable runtime modules into one deferred shared bundle.
- `library/components.css` combines shared presentation and avatar animation styles.
- Four identical existing-playbook stylesheets now share `library/playbook.css`, removing approximately 50 KB of repeated source CSS.
- 64 legacy inline layout attributes moved into scoped stylesheets. Public pages have no embedded stylesheet blocks or inline layout attributes.
- Reusable guidance/fold helpers live in `library/page-contract.js`; new-page quiz behavior lives in `library/lesson-engine.js`.
- Asset paths resolve from the shared bundle's location, supporting root and nested hosting paths.
- Builds give shared outputs content-hash versions to prevent stale cached bundles.
- External Google Fonts requests were removed in favor of the shared system font stack.

Existing content-specific lesson renderers remain where they preserve current interactions. Common concerns were consolidated without turning every lesson into a generic content page.

## Loading improvements

Removed blanket preloads of five large avatar sheets and eager decoding of every texture. Shared scripts now use one deferred request.

Eight large images were encoded as lossless WebP. Their combined size fell from 14,417,727 to 10,378,952 bytes: 4,038,775 bytes saved, approximately 28%. Decoded pixel bytes and dimensions match the originals exactly, including transparency. Original source images are retained.

A local homepage measurement recorded DOM readiness around 278 ms and page load around 327 ms. This is a localhost result, not a production speed guarantee. Hosted performance, compression, caching and throttled-network behavior must be checked after an authorized deployment.

## Future-page rules and library

`AGENTS.md` now requires the brand contract, single schedule, shared dependencies, source-backed resources, absence of inline styling and validation before release.

`scripts/check-site.cjs` discovers public HTML automatically. It rejects missing brand/header/footer/navigation requirements, missing metadata, unregistered session IDs, invalid schedule timestamps, duplicate IDs, missing local files, inline styling and embedded stylesheet blocks. QA, test-artifact and build-output directories are development-only exclusions.

`scripts/new-session.cjs` generates paired session/playbook pages from a validated specification, plus lesson data, a resource content record and schedule entry. It refuses overwrites and validates steps, quiz answers, production stage, dates, tool use cases and prompt attribution. A temporary fixture verified creation, quiz feedback, saved progress and mobile layout. It did not add a student session to the live schedule.

The initial local CI workflow built shared outputs, checked generated files and ran responsive, release and cohesion QA. Current repository status should be read from GitHub and current local checks rather than inferred from this historical report.

## Historical validation evidence

| Check | Result |
|---|---|
| Public-page contract | 11 pages, 15 schedule entries; zero errors or warnings |
| Responsive/media audit | 33 combinations passed at 390, 820 and 1440 pixels |
| Visual/regression suite | 36 tests passed |
| Release tests | Countdown ticks, boundary auto-unlock, homepage updates, direct locks and homework/header guards passed |
| New-page scaffold | Creation, quiz feedback, persistence and mobile layout passed |
| Resources | Keyboard dropdown/tab navigation, copying, persistence and source IDs checked |
| Lossless encoding | Exact decoded pixel/dimension comparison passed |

Evidence is in `qa/artifacts`, `qa/cohesion-results.json` and `qa/loading-review.json`. The final media audit passed against the corrected preview server after the optimized images were introduced.

## Handoff and remaining release steps

Read `docs/FUTURE_PAGE_CREATION_PROMPT.md` for the detailed session/playbook/Google Docs homework creation prompt. Read `docs/SHARED_SITE_LIBRARY.md` for component ownership.

Commands: `npm run preview`, `npm run build`, `npm run site:check`, `npm run qa:cohesion`, `npm run qa:release`, `npm run qa:visual`, and `npm run session:new -- path/to/spec.json`.

Current changes belong in the private Git repository and follow the review and release rules in `AGENTS.md`. A push updates repository source; a hosted website must be deployed and checked separately. The local owner review area does not change public access or Google Docs sharing.
