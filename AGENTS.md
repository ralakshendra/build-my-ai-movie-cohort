# Cohort website maintenance

Keep the Resource Library current whenever a session guide or playbook is added or changed.

- Run `npm run resources:build` after editing lesson content and before review or release. `npm run build` also rebuilds the resources.
- Source material belongs in session guides and playbooks. Do not manually edit the generated resource blocks in `index.html`.
- Keep playbook `sessionData.homework[].prompt` and `sessionData.checklist` current. The generator imports these as clearly labelled practice recipes and session checklists.
- Put complete reusable prompts in `<pre>` elements. Keep practice instructions distinct from full copyable prompts; never invent a missing official prompt.
- Existing tools are detected from lesson content. For a new tool, add an element with `data-resource-tool="Tool name"` and a concise description of its actual use in that lesson. Add a unique section ID so the library can link to it.
- Preserve source attribution, deduplicate tool entries and full prompts, and verify resource links, keyboard tab navigation, checklist persistence, and mobile layout.
- Only genuinely missing lesson materials belong in Unreleased Content. Tools, prompts, and checklists with source material belong in their resource tabs.
- Session guides link to playbooks at the beginning and end; playbooks link to the official homework at the beginning and existing submission area.
- New lesson content follows Session → Playbook → native Google Docs homework. Only playbooks contain direct Homework Doc links; guides and homepage assignment cards link to the playbook. Do not create another HTML homework worksheet or homeworkPage route.
- Ordinary local previews follow the same scheduled locks as production. `npm run preview` also serves an owner review area at `http://127.0.0.1:8766/__review__/`; it lists every public HTML page and opens those pages without website locks. The review override exists only in the local preview server, never in public page scripts or generated bundles. Check both routes before release: a future lesson must open in review and remain locked at the ordinary preview URL. Google Docs keep their own sharing permissions. Do not publish, push, or change main without the user's review and authorization.

## Mandatory shared site contract

- Site name: BUILD MY AI MOVIE STUDIO. Founder: Alexx Roy, Founder of Build My AI Movie Studio. Footer: © 2026 AI FilmCraft - All Rights Reserved.
- Every public HTML page, including system pages, must use `brand.css`, `library/components.css`, `library/site.js`, static page metadata, the shared header, Back to Home, skip link, main landmark, and footer. Playbooks with the existing layout also use `library/playbook.css`.
- The single release schedule lives in `library/schedule.js`. Do not copy release times or add hostname-based bypasses in page scripts. Homework documents, homework workspaces, playbooks, session guides, and session-specific resources follow the same start time.
- Use `npm run session:new -- path/to/spec.json` for new lessons. Never clone previous content without replacing every prior-period fact. Preserve official source URLs and never invent prompts or homework URLs.
- No new inline styles, embedded style blocks, duplicate component engines, or page-specific copies of shared CSS. Layout belongs in scoped page CSS; reusable visuals belong in the shared library.
- Read `docs/FUTURE_PAGE_CREATION_PROMPT.md` before authoring any new session/playbook/homework set.
- Use `docs/authoring/README.md` and its master prompt, owning specifications and templates for new lessons or revisions. Fill the current source brief; do not publish placeholder inputs or copy old lesson facts. The guide, playbook and native Homework Doc must agree on tasks, outputs and review criteria.
- Run `npm run build`, `npm run qa:cohesion`, `npm run qa:release`, and `npm run qa:review` before release; the review check requires the local preview server. `site:check` discovers every public HTML page automatically and rejects missing components, schedule entries, links, or assets.
- Performance checks must distinguish local loading measurements from real hosted/network performance. Keep large source images and design references out of page requests. Do not preload every avatar texture.
