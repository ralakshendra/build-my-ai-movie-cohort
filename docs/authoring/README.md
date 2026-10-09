# New session authoring kit

Use this kit whenever a new class is added or an existing class is revised. It covers **a session guide, playbook, Prompt Vault and one native Google Docs homework document**.

| Deliverable | Student purpose | Destination |
| --- | --- | --- |
| Session guide | Understand the lesson, demonstrations, decisions and common failures | `sessions/<session-id>/index.html` |
| Playbook | Do the work, review outputs, practise decisions and track progress | `sessions/<session-id>/playbook.html` |
| Prompt Vault | Copy, adapt and troubleshoot the session prompts | `sessions/<session-id>/prompt-vault.html` |
| Homework Google Doc | Record answers, asset links, proof, reflection and submission | The verified official Google Doc |

Student navigation is **Session → Playbook → Prompt Vault → Homework Google Doc**. Session guides and playbooks link to the Prompt Vault. Each Prompt Vault follows the session release lock and provides one-click copying, editable bracket fields, official prompts, practice recipes and a troubleshooting template. The canonical Homework Doc includes its session Prompt Vault link. Do not create an HTML homework worksheet.

## Start here

1. Read [AGENTS.md](../../AGENTS.md). Current explicit user instructions take precedence; preserve official source facts and links.
2. Fill [SESSION_BRIEF.md](templates/SESSION_BRIEF.md) with the new lesson's material.
3. Paste [MASTER_NEW_SESSION_PROMPT.md](MASTER_NEW_SESSION_PROMPT.md) into the authoring task with the completed brief and source files.
4. Use the supporting specifications below while building the four connected deliverables.
5. Complete [CONTENT_REVIEW_CHECKLIST.md](templates/CONTENT_REVIEW_CHECKLIST.md) and hand over the actual pages and native Doc for review.

For a narrower task, use the relevant prompt in [COPYABLE_PROMPTS.md](COPYABLE_PROMPTS.md). Those prompts also work for a revision without creating a new lesson.

## Supporting specifications

| File | What it governs |
| --- | --- |
| [BRAND_AND_WEBSITE_CONTRACT.md](BRAND_AND_WEBSITE_CONTRACT.md) | Exact brand identity, visual system, layout, accessibility, metadata and shared architecture |
| [SESSION_GUIDE_SPEC.md](SESSION_GUIDE_SPEC.md) | Guide sections, teaching format, examples, source prompts and guide-to-playbook navigation |
| [PLAYBOOK_SPEC.md](PLAYBOOK_SPEC.md) | Practical tasks, outputs, review criteria, progress, skill checks and homework navigation |
| [HOMEWORK_GOOGLE_DOC_SPEC.md](HOMEWORK_GOOGLE_DOC_SPEC.md) | Native document structure, template preservation, formatting, answers and submission |
| [HOMEWORK_OPERATIONS.md](HOMEWORK_OPERATIONS.md) | Approved prototype, Drive folder, backups, canonical Doc registry and duplicate handling |
| [AVATAR_GUIDE.md](AVATAR_GUIDE.md) | All 25 approved poses, meaningful placement, orientation and interaction states |
| [RESOURCE_AND_RELEASE_GUIDE.md](RESOURCE_AND_RELEASE_GUIDE.md) | Source data, Resource Library registration, schedule, generation and review routes |
| [templates/SESSION_SPEC.template.json](templates/SESSION_SPEC.template.json) | Fillable input shape for the shared session generator |
| [templates/HOMEWORK_OUTLINE.md](templates/HOMEWORK_OUTLINE.md) | Fillable homework structure to turn into a native Google Doc |

The JSON template and homework outline are authoring inputs, not finished student materials. Replace every placeholder from current source material. Do not run the generator or publish a document containing them.

## Source ownership

| Information | Authoritative location |
| --- | --- |
| New lesson facts and complete official prompts | Supplied notes, transcript, recording, source documents and approved brief |
| Brand and shared page behavior | Existing shared sources, `AGENTS.md` and this kit |
| Release time, routes and official homework URL | `library/schedule.js` |
| New lesson practice recipes, checklist and quiz | `content/<session-id>.json`, synchronized with the generated runtime lesson data |
| Older playbook practice recipes and checklist | Existing `sessionData.homework` and `sessionData.checklist` |
| Student homework answers | The student's native Google Doc copy, following the official document's instructions |

An older lesson is a design reference. Its dates, task counts, claims, tool settings, prompts, document URLs, products and deliverables are not facts for the new lesson.

## Standard workflow

**Inspect → extract sources → define one outcome → prepare homework → build the guide/playbook/Prompt Vault → register resources → review → authorized release.**

Use the shared generator for an unregistered lesson ID. An already registered future placeholder requires deliberate handling: the current generator refuses any existing schedule ID. Follow the procedure in [RESOURCE_AND_RELEASE_GUIDE.md](RESOURCE_AND_RELEASE_GUIDE.md), preserving the registered dates and identity.

The scaffold supplies shared structure and behavior. It does not supply a complete lesson design or approve the content. Expand it with the topic's actual demonstrations, purposeful artwork, review criteria and troubleshooting.

## Maintaining this kit

- Update the owning specification when a shared component or authoring rule changes; update the master prompt only when its workflow changes.
- Keep old entry points as links to this kit. Do not maintain competing copies of the same full prompt.
- Read current source code before applying exact hooks or commands. Do not assume a documented future capability already exists.
- Treat QA results as evidence for the checked revision, not a permanent guarantee for later lessons.
- Prepare a concrete review result before asking to merge or publish. Follow the repository's review and authorization rule.
