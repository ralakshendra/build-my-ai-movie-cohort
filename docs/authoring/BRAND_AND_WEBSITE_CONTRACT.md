# Brand and website contract

This is the shared contract for session guides and playbooks. Homework uses the same identity and content relationships, with the native document formatting in [HOMEWORK_GOOGLE_DOC_SPEC.md](HOMEWORK_GOOGLE_DOC_SPEC.md).

## 1. Exact identity

| Element | Required text or asset |
| --- | --- |
| Site name | **BUILD MY AI MOVIE STUDIO** |
| Founder credit | **Alexx Roy, Founder of Build My AI Movie Studio** |
| Footer | **© 2026 AI FilmCraft - All Rights Reserved.** |
| Brand mark | Existing `assets/brand/build-my-ai-movie-mark.svg` |
| Brand logo | Existing `assets/brand/build-my-ai-movie-logo.svg` |
| Sharing image | Approved `assets/brand/social-preview.jpg`, unless the user approves another |

Preserve spelling, capitalization, the double x in Alexx, and footer punctuation. Do not shorten the visible site name to an earlier cohort name. Keep session title, week/day and session number consistent across both pages, the schedule and homework.

## 2. Visual identity

Use the existing CSS variables rather than introducing a competing palette.

| Role | Current token/value in `brand.css` |
| --- | --- |
| Page background | `--bm-black`: `#050505` |
| Surface | `--bm-surface`: `#0b0b0b` |
| Panels | `--bm-panel`: `#111`; `--bm-panel-2`: `#161616` |
| Body text | `--bm-text`: `#f5f5f5` |
| Muted text | `--bm-muted`: `#a7a7a7` |
| Primary accent | `--bm-orange`: `#ff6a00` |
| Accent hover/highlight | `--bm-orange-light`: `#ff9a3d` |
| Standard radius | `--bm-radius`: `16px` |
| Shared maximum width | `--bm-max`: `1180px` |

Keep the cinematic black/charcoal base, restrained orange light, white headings, clear borders and generous readable spacing. Reuse current primary orange buttons and outlined secondary buttons. Do not make every card glow, add unrelated accent colors, or introduce a light/dark toggle.

Typography inherits the shared Inter/Manrope/system fallback stack. Use semantic headings and the existing responsive type treatments. Do not add font downloads or import a new font just for a lesson. Keep bold emphasis selective. Labels can be uppercase; paragraph text should use normal sentence case.

Student copy should be direct: what to do, why it matters, what should appear, and what to change if it fails. Prefer short sentences and concrete production decisions. Avoid generic motivational filler, unsupported guarantees and implementation details in the student interface.

## 3. Shared page shell

Every public HTML page must contain the following statically, even before runtime enhancement:

- `lang="en"`, character encoding and responsive viewport metadata.
- A descriptive title, description, canonical URL, sharing metadata and brand favicon.
- Unique `data-page-id`, `data-page-key`, correct `data-page-type`, and `data-session-id` on lesson pages.
- The shared `.bmai-global-header`, `.bmai-session-brand`, brand mark and `.bmai-header-home` control with a home SVG and `aria-label="Back to Home"`.
- A `.bmai-skip-link` targeting the single `main#main-content`.
- One clear H1, orderly heading levels, and the shared footer with the exact credit above.
- `brand.css`, `library/components.css` and deferred `library/site.js`.
- `library/playbook.css` when using the existing playbook layout.

Use `../../` paths for a lesson located at `sessions/<id>/`. Generate metadata from current lesson facts, never from a prior page's cached title or URL. Use the site's configured canonical origin; do not claim that a canonical URL proves deployment.

For new scaffold pages, load `lesson-data.js` before `library/site.js`, both deferred. Do not load `app.js`, `avatar-motion.js`, `session-ui.js` or `resource-library.js` separately: the shared bundle already includes them.

## 4. Layout and section format

- The hero communicates one student outcome, one primary action and one topic image. Keep week/day and stage readable without competing with the title.
- Preserve approved cinematic/character hero artwork and its labels. Topic SVGs support cards and locked previews; they do not replace an authored hero.
- Above 900 pixels, begin with hero text left and image right. Alternate image sides across later major text/image feature rows. Small companion strips and library grids are exempt.
- Shared split rows use `.studio-feature-split`, a `data-desktop-image-side="left"` or `"right"`, and direct `.studio-feature-copy` / `.studio-feature-visual` children.
- At phone widths, stack clearly and follow the selected approved page layout. The homepage Current Session card specifically uses image → stage → heading → description → actions. Do not impose that order on every unrelated component.
- Use stable, unique section IDs. Section navigation must link to real, useful sections and reveal content hidden in expandable panels when necessary.
- Place one purposeful instructor with a guidance block. Do not nest guidance panels or add another avatar to fill empty space.
- Tables and long prompt text may scroll within their own container. The page itself must not overflow horizontally; do not hide overflow to conceal a layout defect.
- Long source prompts, supporting detail and troubleshooting can use native `details`/`summary`. Put essential instructions and primary actions outside collapsed panels.

Choose task/section count from the actual lesson. Do not reuse a seven-task layout merely because a previous class had seven tasks.

## 5. Components and source files

| Concern | Edit this source |
| --- | --- |
| Brand tokens and shared identity | `brand.css` |
| Shared learning component presentation | `studio.css` |
| Avatar state, tips, orientation and motion | `avatar-motion.js` and `avatar-motion.css` |
| Reusable guidance/folds | `library/page-contract.js` |
| Topic illustration behavior/layout | `library/visuals.js` and `library/visuals.css` |
| New-page quizzes | `library/lesson-engine.js` |
| Shared checklist persistence | `library/progress.js`, consumed by `app.js` and `resource-library.js` |
| Older playbook layout | `library/playbook.css` |
| Lesson-specific layout | Scoped `styles/pages/<page>.css` |

`library/site.js` and `library/components.css` are generated. Rebuild them instead of patching them. Do not add inline styles, embedded stylesheet blocks, copied component engines or page-specific copies of shared CSS. Existing runtime updates to progress width are owned by the shared engine; authors must not add inline layout attributes to HTML.

## 6. Images and artwork

- Use approved local assets with meaningful alt text for content images and empty alt for decoration.
- Choose artwork related to the current lesson; a prior product, character or scene must not become the new lesson's subject by accident.
- Serve optimized responsive images with intrinsic width/height, an appropriate `srcset`/`sizes`, and no stretching or unintended crop.
- Load the one actual hero appropriately. Lazy-load supporting images. Do not preload the avatar library or serve large design/source sheets as page illustrations.
- Registered topic keys are `youtube`, `short`, `advertisement`, `story` and `production`. Use the same key across session/playbook cards, current-class banner and locked preview.
- New topic SVGs must be true vectors, not embedded raster files. The current family uses a 560 × 320 viewBox and orange/charcoal/cream styling. Register a new key deliberately in the shared renderer and validators.
- Keep original source images and approved artwork recoverable. Optimize serving copies rather than replacing source originals.

## 7. Accessibility and interaction

- Every input has a visible label or a suitable accessible name. Quiz groups use fieldsets/legends.
- All actions work with a keyboard and have a visible focus state. Do not use a decorative image as an unlabeled control.
- Avatar tips use the shared click/Enter/Space behavior, current feedback and reduced-motion support.
- Skill and progress feedback must be announced through the existing live regions. Do not convey correctness using color alone.
- Maintain usable touch controls and sufficient contrast. Hover must not be the only way to discover an action.
- Scope each progress companion to its actual checklist. Verify incomplete, complete and restored states.
- Separate external document behavior from website navigation: external Docs may open in another tab with a meaningful label and `rel="noopener noreferrer"`.

Review at 320, 390, 820 and 1440 pixels, including open menus, expanded prompts, wrong quiz feedback, complete progress and locked pages. A shell checker alone does not establish good content, accessible interactions or visual quality.
