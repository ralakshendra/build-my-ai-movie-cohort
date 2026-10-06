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
| Common presentation | brand.css and studio.css |
| Shared existing playbook styling | library/playbook.css |
| Pose animation styles | avatar-motion.css |
| Generated shared outputs | library/site.js and library/components.css |
| Source-backed resource generation | scripts/build-resources.cjs |
| New session/playbook scaffold | scripts/new-session.cjs |
| Mandatory public-page contract | scripts/check-site.cjs |
| All-page responsive/load audit | scripts/audit-site.cjs |

Run npm run build after edits. It rebuilds resources and shared outputs, then enforces the contract. Run npm run qa:cohesion for page/viewport checks. Registration, links, static metadata, brand/header/footer, shared dependencies and absence of inline styling are enforced on all public HTML pages. QA pages and the explicit hero approval preview are development-only exceptions and must not be published as student routes.

Use the authoring prompt in FUTURE_PAGE_CREATION_PROMPT.md. Update existing page content deliberately; the scaffold is for net-new lessons. A guide explains the workflow; a playbook provides practice; the Google Doc captures the student's work. All three share one outcome and one schedule.

This remains a static website. Release gates are student-experience controls, not server-side authorization. Google Doc sharing is controlled in Google Drive.


Topic illustrations: library/visuals.js owns accessible resource-type variants and mapping; library/visuals.css owns layouts. library/schedule.js visual selects the topic. All resources inherit that key. assets/illustrations contains true SVGs (no embedded raster). scripts/new-session.cjs defaults unspecified future topics to production; scripts/check-site.cjs validates keys, assets and SVG format.


Hero preservation rule: Keep the authored character/cinematic hero artwork and its labels on session, playbook and homework pages. Topic vectors supplement library cards and locked previews; the shared renderer must never replace an existing hero panel.
