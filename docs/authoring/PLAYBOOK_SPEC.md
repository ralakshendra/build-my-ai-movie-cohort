# Playbook specification

The playbook is the student's practical production path. It uses the session guide's facts to help the student build, check, revise and submit one defined result.

## Required section sequence

| Section | Required content |
| --- | --- |
| Hero | Same session identity and outcome, approved related artwork, Start Task action and a clear Session Guide link |
| Homework entry | Verified official Homework Doc link near the beginning; a short explanation of what the student will record there |
| Mission and preparation | Deliverable, relevant effort/prerequisites, references/files to bring, actual tools and project setup |
| Practical tasks | Source-grounded steps, expected artifacts, acceptance criteria, failure fixes and what to carry forward |
| Prompt toolkit | Complete supplied prompts with clear attribution and copy behavior; practice recipes separately labelled |
| Progress review | One primary checklist using the same text as the structured content record and one progress companion |
| Skill check | Production decisions with explanations, working feedback and one skill companion |
| Finish / submission | Actual submission instructions, official Homework Doc action, final quality check and return-to-guide action |

Use a stable `#share` submission section. This lets homepage assignment cards and session links reach the correct playbook destination without linking directly to the Google Doc.

## Task format

Each task should answer these questions:

- **What am I making?** One concrete intermediate output.
- **What do I need?** Exact references, prior approved output and tool mode.
- **What do I do?** A numbered action sequence using the demonstrated workflow.
- **Which prompt applies?** An exact official prompt, if supplied; otherwise label the instructions as a practice recipe.
- **What should I save?** A named artifact, link or organized file set, using source-backed naming rules.
- **How do I know it works?** Specific observable review criteria.
- **What do I fix first?** A practical source-grounded failure response.
- **What comes next?** The dependency and next task.

Do not force every lesson into the previous session's task count. Do not invent export settings, aspect ratios, duration, required tools, submission channels or output quantities. Source-backed requirements remain exact; useful unsupplied suggestions must be labelled as suggestions.

## Data and persistence

For new scaffold lessons, maintain `content/<id>.json` and the corresponding `window.BMAI_LESSON` in `lesson-data.js`. Keep `homework` practice records, `checklist` and `quiz` synchronized with the visible playbook. Runtime lesson data excludes `start`/`end`; release behavior reads the shared schedule.

Older playbooks use `sessionData.homework[].prompt` and `sessionData.checklist`. Update those existing sources deliberately; do not introduce a second lesson data object or page-specific persistence engine.

Shared checklist identities come from the canonical checklist text. Use matching `data-index` values on the primary checklist. Reordering unchanged tasks should retain their completion; a materially changed criterion may represent a new task. Preserve storage keys and migration behavior, and do not clear a student's saved progress to make a screenshot look clean.

The main percentage must count the primary production checklist, not optional exercises or quiz radio controls. Each companion should target its real checklist or scope.

### Shared progress markup

Use the generated structure and adapt the actual checklist. This example shows hooks, not finished lesson text:

```html
<section id="checklistSection" data-progress-scope>
  <h2>Production review</h2>
  <aside class="studio-companion" data-companion="progress"
         data-progress-target="#checklistSection">
    <div class="studio-avatar checklist" aria-label="Alexx Roy reviewing progress"></div>
    <p class="studio-companion-copy" aria-live="polite">Review the first output, then tick it.</p>
  </aside>
  <div class="checklist">
    <label><input type="checkbox" data-index="0">[Exact checklist[0] text]</label>
  </div>
</section>
```

Do not copy the placeholder into a student page. Follow the shared engine's checklist → confident → trophy states for zero, partial and complete progress.

## Skill-check contract

Questions should test a meaningful choice from the lesson. Give one correct answer and a useful explanation. Distractors should reflect real mistakes, not joke answers. Use enough questions to cover the important decisions; do not impose a fixed number unsupported by the lesson.

New pages use the shared renderer:

```html
<section id="skillcheck" data-skill-scope>
  <h2>Make the production call</h2>
  <aside class="studio-companion" data-companion="skill">
    <div class="studio-avatar idea" aria-label="Alexx Roy guiding the skill check"></div>
    <p class="studio-companion-copy" aria-live="polite">Choose a production decision and check the feedback.</p>
  </aside>
  <div data-library-quiz></div>
</section>
```

Load the populated `lesson-data.js` before the shared bundle. Keep one skill companion within each skill scope. The shared quiz engine supplies fieldsets, radio labels, answer state and live feedback. Do not layer a second renderer or observer onto it.

Required avatar states: untouched = idea; wrong = caution; correct = thumbs-up; perfect completed check = applause; partial/failed result = caution with the actual result. Empty selections and changed answers must not keep stale celebration or success text. Preserve applicable retry behavior on older quizzes.

## Homework and submission

- Direct Homework Doc links occur only on playbooks, at the beginning and final submission area. They must match the session's registered official Doc.
- Homework answers, uploads and reflection belong in the native Doc or its prescribed submission destination. Do not add a separate HTML homework form or workspace.
- Playbook practice tasks, progress checklists and skill checks remain on the website. They do not imply Google Docs answers and browser checkmarks synchronize.
- Use the supplied submission destination and instructions. If absent, disclose the missing input rather than inventing a group URL or asking students to submit to the site.
- Keep complete official prompts separate from answers and practice recipes. Provide useful filenames/organization only where supplied or clearly presented as optional advice.

Review restored progress, resource checklist sharing, wrong/correct/complete skill feedback, answer changes, keyboard tips, prompt copying, mobile layout and the actual Homework Doc destination.
