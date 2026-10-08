# Shared site library

The site uses one release schedule, one runtime bundle and shared visual components. Source files remain readable; generated outputs are rebuilt rather than patched.

| Concern | Source / entry point |
|---|---|
| Release timing and lesson routes | library/schedule.js |
| Header navigation, release gates, countdowns, checkpoints | app.js |
| Instructor poses, interaction, alignment, reduced motion | avatar-motion.js |
| Resource tabs, prompt copying, checklist state, resource release | resource-library.js |
| Session section navigation and progress bar | session-ui.js |
| Reusable guidance and fold HTML | library/page-contract.js |
| New-page quiz behavior | library/lesson-engine.js |
| Stable shared task persistence | library/progress.js |
| Common presentation | brand.css and studio.css |
| Shared existing playbook styling | library/playbook.css |
| Pose animation styles | avatar-motion.css |
| Generated shared outputs | library/site.js and library/components.css |
| Source-backed resource generation | scripts/build-resources.cjs |
| New session/playbook scaffold | scripts/new-session.cjs |
| Mandatory public-page contract | scripts/check-site.cjs |
| All-page responsive/load audit | scripts/audit-site.cjs |
| Local owner review area | scripts/serve-preview.py and styles/pages/review.css |
| Review access and ordinary lock check | scripts/review-check.cjs |

Run npm run build after edits. It rebuilds resources and shared outputs, then enforces the contract. Run npm run qa:cohesion for page/viewport checks. Registration, links, static metadata, brand/header/footer, shared dependencies and absence of inline styling are enforced on all public HTML pages. QA pages and the explicit hero approval preview are development-only exceptions and must not be published as student routes.

Use the maintained kit in [authoring/README.md](authoring/README.md) and its [master prompt](authoring/MASTER_NEW_SESSION_PROMPT.md). FUTURE_PAGE_CREATION_PROMPT.md remains an entry point to that kit. Update existing page content deliberately; the scaffold is for net-new lessons and currently refuses already registered IDs. A guide explains the workflow; a playbook provides practice; the native Google Doc captures the student's work. All three share one outcome. Only playbooks contain direct Homework Doc links; no separate HTML homework worksheet is created.

This remains a static website. Release gates are student-experience controls, not server-side authorization. Google Doc sharing is controlled in Google Drive.

Run `npm run preview` from the repository root. The ordinary preview at `http://127.0.0.1:8766/` follows `library/schedule.js`. The owner review area at `http://127.0.0.1:8766/__review__/` discovers every public HTML page and serves it through a local-only namespace with a review date derived from the schedule. Relative links and shared assets stay in that namespace. The review area and its access script are supplied by the preview server; they are not public site files. Run `npm run qa:review` to check every review page and confirm a future lesson remains locked in the ordinary preview. The local review area does not alter Google Docs permissions.


Topic illustrations: library/visuals.js owns accessible resource-type variants and mapping; library/visuals.css owns layouts. library/schedule.js visual selects the topic. All resources inherit that key. assets/illustrations contains true SVGs (no embedded raster). scripts/new-session.cjs defaults unspecified future topics to production; scripts/check-site.cjs validates keys, assets and SVG format.


Hero preservation rule: Keep the authored character/cinematic hero artwork and its labels on session and playbook pages. Topic vectors supplement library cards and locked previews; the shared renderer must never replace an existing hero panel. Native Homework Docs use relevant, modest artwork according to the approved document template and authoring kit.


Desktop composition rule: Starting with hero text on the left and image on the right, alternate image sides across subsequent major text/image feature cards. Homepage order: hero image right, Current Session image left, next-session teaser image right, workflow guidance image left. Library grids and small companion strips are exempt. For shared feature rows use studio-feature-split with data-desktop-image-side="left" or "right", and direct child studio-feature-copy / studio-feature-visual classes. The shared order rule applies above 900px; preserve the approved mobile stacking and original character heroes.

Mobile Current Session order: artwork first, production-stage label second, then session heading, description, actions and other details. Keep this visual-first order independent of desktop alternating columns.
