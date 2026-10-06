# BUILD MY AI MOVIE STUDIO: future lesson creation prompt

Copy this prompt into the next authoring task. Fill the input brief before execution. Read the repository's AGENTS.md first. A session guide, an interactive playbook, and an official Google Docs homework document form one learning experience.

## Input brief

- Week/day and stable session ID: [week-N-day-N]
- Session title, number, stage and measurable learning outcome: [fill]
- Start/end date and time, explicitly in IST (+05:30): [fill]
- Official lesson notes/transcript, full prompts and tool references: [attach or link]
- Student prerequisites and work to carry forward: [fill]
- Expected deliverable, acceptance criteria and submission destination: [fill]
- Official homework Google Doc URL or instruction to create it: [fill]
- Existing approved reference document/template, if any: [link]
- Topic visual key: [youtube / short / advertisement / story / production]

Do not invent source facts, prompts, dates, results, or document URLs. Identify missing facts clearly. Keep progress moving on work that does not depend on those missing facts.

## 1. Inspect the site before writing

Read AGENTS.md, library/schedule.js, library/page-contract.js, library/visuals.js, library/visuals.css, the shared style sources, and this guide. Inspect one current session guide and one current playbook for structure, not stale facts. Check existing resource entries before adding tools/prompts. Confirm the approved instructor artwork and asset paths. Never edit sources/.

## 2. Define the student result

Write one concrete outcome: what the student will produce, how they will review it, and what counts as done. Turn the material into a sequence: prepare -> understand -> practice -> review -> submit. Include prerequisites, estimated effort, difficulty, and the next production stage. Use short, simple, encouraging sentences. Avoid generic motivational filler or implementation details in student copy.

## 3. Prepare the homework Google Doc first

Use the connected Google Docs workflow and its applicable skill. If an approved native template exists, preserve its structure and adapt it to this lesson; do not silently replace it. Create an actual document before linking to it. Use the same session title/week/day as the website.

The document must contain:
1. BUILD MY AI MOVIE STUDIO identity and Alexx Roy, Founder of Build My AI Movie Studio.
2. Session title, week/day, objective, prerequisites and estimated effort.
3. The exact required deliverables and submission destination.
4. Numbered tasks. Each task includes instructions, expected output, quality checks, and space for the student's answer or asset URL.
5. Complete official prompts where supplied, labelled separately from practice recipes.
6. A review checklist covering the actual lesson: character/reference consistency, framing, lighting, motion, audio/editing or export where relevant.
7. Short reflection: what worked, what failed, what changed, and what to try next.
8. Direct session/playbook links and a final submission section.

Use native headings, readable typography, restrained orange accents and simple tables only when useful. Keep it easy to fill on mobile. Use native supported date/resource chips where appropriate. Verify document text, hyperlinks, permissions, and visual layout. Do not send notifications or share with named people unless authorized.

Important: website locks govern website navigation. A publicly accessible Google Doc URL is not protected by those locks. If document access must be restricted before release, confirm Google sharing permissions or arrange an authorized scheduled permissions change. Do not claim a JavaScript lock secures the document itself.

## 4. Create the structured lesson specification

Create content/session-spec.json with these fields:
- id, title, number, start, end, stage, objective, homework (the real Google Doc URL), submission.
- steps: [{title, instruction, review}]. Each review describes observable acceptance criteria.
- tools: [{name, useCase}]. Only tools used in the lesson.
- prompts: [{title, text, source}]. Full reusable prompts; keep source attribution.
- checklist: [specific measurable review items].
- quiz: [{question, options, correct, explanation}]. correct is a zero-based option index. Use realistic production decisions, not trivia.

Start/end use ISO timestamps with +05:30. Check the cohort calendar. Do not assume a prior cohort's dates. Use the existing stage vocabulary. Keep practice recipes distinct from full official prompts. If a full prompt is missing, explicitly say so.

## 5. Generate the paired pages with the shared scaffold

Run `npm run session:new -- content/session-spec.json` from the repository root. The scaffold creates sessions/<id>/index.html, sessions/<id>/playbook.html, lesson-data.js, the content record, and the schedule entry. It refuses to overwrite an existing session. For revisions, update the existing record/pages deliberately rather than rerunning creation.

The session guide explains the workflow, common failures and demonstrations. The playbook converts the same material into practice, checkpoints, decision questions, homework and submission. Do not paste the entire guide into the playbook without adapting its purpose. Expand the generated sections using source-grounded content while retaining the shared contract.

## 6. Apply the site contract without exceptions

Every public page includes:
- Static data-page-id, data-page-key, data-page-type; lesson pages also include data-session-id matching the schedule.
- Shared brand header, logo, Back to Home, skip link and a single main landmark.
- brand.css, library/components.css and library/site.js. Existing-layout playbooks also use library/playbook.css; scoped layout CSS may be added before components.css.
- BUILD MY AI MOVIE STUDIO in the visible site brand.
- Alexx Roy, Founder of Build My AI Movie Studio.
- © 2026 AI FilmCraft - All Rights Reserved in the shared footer.
- Real session/playbook/homework links near the beginning and in the final action area.

No inline style attributes, embedded stylesheet blocks, copied navigation engines, duplicate schedules, or duplicated shared CSS. Put reusable components in the shared library. Keep new page-specific CSS scoped to data-page-key. Use npm run build after source edits; do not hand-edit generated library/site.js or library/components.css.

## 7. Use the learning components deliberately

- Use BMAI.guidance for instructor guidance and BMAI.fold for expandable supporting text when useful.
- Place the approved storyboard pose by planning; camera by frame generation; headphones by audio review; clapperboard by editing; checklist by final review; idea by skill decisions; caution by troubleshooting; celebration by completion.
- Use the existing avatar engine, visible-state motion, reduced-motion support and keyboard-accessible tips. Do not add page-specific animation code or preload all avatar sheets.
- Avoid adjacent instructor blocks on the same side; retain the existing alternating alignment behavior.
- Use relevant decorative SVG icons around large library/section headings. Mark decorative graphics aria-hidden and keep text labels readable.
- Use native details/summary for long prompts, troubleshooting and supporting references. Copy buttons must copy the full prompt. Never turn missing materials into invented placeholders.
- Use meaningful checkbox checkpoints with device-local persistence. Explain that progress is saved on this device.
- Include scenario-based skill checks with explanations and a way to retry. Preserve keyboard navigation, focus visibility and reduced-motion behavior.

## 8. Register resources and scheduled access

library/schedule.js is the sole website release source. Session guides, playbooks, local homework workspaces, official homework links and session-specific prompt/checklist entries use the same start time. Keep the next class in both the homepage teaser and Upcoming Sessions. Leave genuinely missing materials in Unreleased Content.

Tools belong under AI Tools as concise use cases, without repeated lesson-link clutter. Put full prompts, practice recipes, checklists and session references in their own expandable entries. Full prompts require exact source anchors. New tools use data-resource-tool and a unique section ID. Full prompts use pre elements with unique IDs. Resource data is generated from lesson content and structured content records; do not manually edit generated index.html resource blocks.

Run npm run build. Confirm the resource catalog updates and no duplicate tool/prompt appears. Use God Sheet and God Prompt as names; do not replace the underlying resource URLs or contents merely to rename them.

## 9. Validate before asking for review

Run npm run build, npm run qa:cohesion, npm run qa:release, and npm run qa:visual. Check every public page at 390px, 820px and 1440px. Verify header/footer identity, Back to Home, section links, source anchors, image decoding, avatar textures, no page overflow, prompt copying, checkbox persistence and quiz feedback. Use controlled browser clocks to verify before release, the countdown crossing zero, automatic unlock, and after release for session/playbook/homework. Check that future Google Doc links navigate to the website lock screen.

Inspect screenshots, not just test output. Review at least homepage libraries, one full guide, one full playbook, homework workspace, locked pages and all avatar poses. Report loading measurements as local measurements, not production speed guarantees. Test network-throttled hosted performance after an authorized deployment.

## 10. Deliver a concrete review package

Provide the local preview URL, official homework Doc URL, files changed, validation results and known limitations. List any missing source input or sharing restriction. Explain how the deliverable teaches the stated student outcome. Do not publish, push, merge or deploy until the user authorizes it. After approval, rebuild, verify generated files are current, deploy through the established project workflow and smoke-test the actual hosted URLs.


## Topic illustration contract

Assign one session visual key in library/schedule.js. Reuse it across the session guide, playbook, homework card and HTML workspace, current-class banner, teaser and locked preview. The shared renderer handles placement, labels and resource badges. New-session scaffolding accepts visual and defaults to the neutral production illustration. Untitled future sessions use production; do not invent a topic. For a genuinely new subject, add its topic to library/visuals.js and the allowed keys in scripts/new-session.cjs and scripts/check-site.cjs, then create one lightweight, true SVG workflow illustration under assets/illustrations/. Do not embed raster images in SVG. Match orange, charcoal and cream, a 560 × 320 viewBox and the existing stroke style. Include meaningful alt text and a short three-stage workflow label. Preserve the homepage photographic hero and instructor avatars. For Google Docs homework, use the matching topic artwork as a modest cover illustration when authoring, preserving an explicit supplied template; the website renderer does not edit Google Docs. Verify exact topic mapping, keyboard access, mobile sizing and release guards. Run npm run build; it enforces every registered session visual and rebuilds the shared bundle.
