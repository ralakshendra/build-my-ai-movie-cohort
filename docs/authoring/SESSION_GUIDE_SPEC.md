# Session guide specification

The guide teaches the current lesson: what was demonstrated, why each decision matters, and how to recognize a useful result. The paired playbook turns that understanding into practice.

## Required section sequence

Adapt section names and count to the source while retaining these functions.

| Section | Required content | Format |
| --- | --- | --- |
| Hero / overview | Current week/day, title, stage, one outcome, approved topic hero, instructor identity and Open Playbook action | Clear hero with one primary action |
| Preparation | Prerequisites, prior outputs to bring, tools/accounts actually needed and project organization | Short checklist or compact cards |
| Workflow map | The actual lesson's stages and the relationship between inputs and outputs | Ordered sequence; stable section anchors |
| Lesson sections | Demonstration, reason for the decision, exact supplied settings, input references, expected output and next step | Numbered sections with purposeful visuals |
| Prompt toolkit | Complete official prompts and attribution where supplied; no invented replacement | Expandable full text in anchored `pre` blocks |
| Decisions and troubleshooting | What a failure looks like, likely cause supported by the lesson, and the first useful fix | Short cases, comparisons or native folds |
| Production review | Observable criteria for a usable output; optional guide checkpoints if relevant | Clear criteria; shared persistence if interactive |
| Recap and next action | What the student should now understand and what the playbook will ask them to make | Open Playbook action at the end |

Place the initial Playbook link immediately where a student can find it. Do not put a direct Homework Doc link in the header, hero, lesson body or footer. It is acceptable to explain that homework is reached through the playbook.

## Teaching format for each major step

1. **Goal:** the production decision this step resolves.
2. **Bring in:** references, files, prior approved output and actual tool mode.
3. **Demonstration:** the sourced actions in their meaningful order.
4. **Why:** one clear explanation of the choice.
5. **Expected result:** an observable result, not “make it professional.”
6. **If it fails:** a supported first adjustment; avoid wasting another generation before checking the input.
7. **Carry forward:** the exact file/reference needed in the next step.

If a tool setting, model version, prompt or class claim is absent from source, disclose the gap in authoring notes. Do not invent an official instruction. Clearly label any useful editorial recommendation so it is distinguishable from the demonstration. Verify time-sensitive technical claims when adding them; do not quietly update an official prompt to a newer model.

## Source prompts and examples

- Preserve full official prompt text and attribution. HTML-escape it without changing its wording or internal line breaks.
- Give each full prompt a unique stable ID and a descriptive surrounding heading.
- Reserve lesson `pre` blocks for genuinely full reusable prompts. The resource generator treats sufficiently long `pre` text as a prompt; do not put practice instructions or unrelated configuration examples there and accidentally publish them as official prompts.
- Put recipes and explanations in paragraphs/lists. A practice recipe is a workflow instruction, not an official generation prompt.
- Use a real example when supplied. Caption what students should notice. Do not fabricate a before/after image, demonstrated result or performance claim.
- Keep official source links. Replace prior-session links only with verified current destinations.

## Instructor and interaction placement

Use [AVATAR_GUIDE.md](AVATAR_GUIDE.md) to plan one instructor per useful guidance block. Use camera for framing, reference-board for continuity, headphones for listening and other meaningful roles. Long guides should include at least four distinct newer expressive poses as well as task-specific poses where useful, without redundant stacked panels.

A guide may contain checkpoints or a skill check when that helps the actual lesson. Connect them to the shared engines and use the same scope/state contract as the playbook. Do not add a new quiz engine just because the guide has a different visual layout.

## Relationship to the other deliverables

For every taught production stage, identify its paired playbook task. The playbook should apply the guide, not repeat it word for word. The Homework Doc captures the student's work and evidence. Keep terminology, inputs, output requirements and acceptance criteria consistent across all three.

## Guide review questions

- Does the guide explain the supplied lesson rather than a generic AI filmmaking workflow?
- Are every title, date, product, model, prompt, source URL and output requirement current?
- Can the student find the playbook at the beginning and end?
- Are there zero direct Homework Doc links on the guide?
- Can a learner tell which text is an official prompt, a demonstration and a recommendation?
- Are visuals, avatar roles and useful troubleshooting related to the adjacent content?
- Does the page meet the shared shell, mobile and keyboard contract?
