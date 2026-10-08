# Avatar selection and interaction guide

The website has 25 approved pose names in `avatar-motion.js`. Their assets and presentation are owned by the shared avatar styles. Reuse this library generously where an instructor helps the student make a decision.

## Complete pose library

| Pose class | Appropriate role |
| --- | --- |
| `open-welcome` | Introduce a lesson or welcome a student's ideas |
| `wave` | Entry, navigation or finding the next relevant resource |
| `idea` | Define one scene purpose, plan the concept, or begin a skill check |
| `curious` | Inspect details, compare options or ask a production question |
| `surprised` | Opening-frame attention or a meaningful creative reveal |
| `palette` | Color family, lighting mood and visual direction |
| `reference-board` | Character/location references, continuity and connected visual decisions |
| `storyboard` | Framing plan and shot relationships; this is the framing cutout, not the reference-board sheet pose |
| `pointing` | Direct attention to the next step, a real visual or a relevant action |
| `camera` | Framing, source image quality and shot review |
| `laptop` | Project setup, production workflow, exports and saving files |
| `microphone` | Voiceover, narration, delivery and writing for the ear |
| `headphones` | Music, sound, sync and listening checks |
| `clapperboard` | Edit decisions, sequence, pacing and production handoff |
| `checklist` | Review criteria or progress at zero completed checkpoints |
| `ready` | Preparedness, the next production step or a scheduled locked page |
| `confident` | Practical execution or partially completed progress |
| `caution` | Incorrect answers, a failed/partial skill result, or a specific troubleshooting pause |
| `encouragement` | Revising a first pass, recovering from a problem, or an error-page next step |
| `thumbs-up` | A correct answer or approval of a reviewed output |
| `applause` | Perfect completed skill check or a justified completion moment |
| `trophy` | Complete progress or a final portfolio result |
| `celebrate` | Saving and reflecting on an actually completed production result |
| `laugh` | A relevant creative discovery or a light moment supported by the lesson |
| `product` | **The coconut drink advertisement lesson only**; never a generic product-ad decoration |

The full library should remain represented across the whole website. Each new page need not contain all 25 poses. Choose roles for the content, distribute unused relevant poses across new sections, and do not add decoration solely to satisfy a pose count. Long pages should use at least four distinct newer expressive poses alongside relevant task-specific poses, with sufficient space between guidance moments.

## Placement rules

1. Plan the instructor's purpose before selecting a pose. The nearby text or image must explain that purpose.
2. Use one instructor per guidance, skill or progress block. Do not nest guidance panels, pair redundant avatars, or put a second figure beside one that already does the job.
3. Avoid the same static pose in consecutive sections. Choose a meaningful alternative, combine redundant guidance, or remove the unnecessary placement.
4. Keep the instructor and its relevant content close enough to read as a unit. Do not leave a broad empty card between them.
5. Let the shared engine orient approved cutouts toward their text/image. Do not add a competing transform/scale flip in page CSS or flip a whole panel including its text.
6. Preserve cinematic hero artwork as artwork. Do not overlay another avatar on an authored instructor hero or swap the hero for a generic topic vector.
7. Give each interactive instructor a task-specific `data-avatar-tip` when the default tip is too generic. Do not repeat an unrelated quote on every pose.
8. Keep cutouts within their container, preserve their square background area/aspect, and check small widths as well as desktop. Look at the actual gaze, not just a data attribute claiming a direction.

Shared guidance markup:

```html
<aside class="studio-guidance camera">
  <div class="studio-guidance-visual">
    <div class="studio-avatar camera" aria-label="Alexx Roy reviewing framing"
         data-avatar-tip="[One current, task-specific tip]"></div>
  </div>
  <div class="studio-guidance-copy">
    <h3>[Current production decision]</h3>
    <p>[Why this decision matters and what to review]</p>
  </div>
</aside>
```

Replace the placeholders. The shared engine makes the avatar keyboard/click interactive and supplies its tip. Do not add a second button handler or fake a tooltip with an image title alone.

## Native pose direction

The source art for reference-board, headphones, caution and wave is oriented left in the current shared mapping; many other poses gesture right or face front. `avatar-motion.js` chooses the flip from the current content position. Its independent CSS `scale` preserves motion transforms. Treat that mapping as shared source knowledge; do not hardcode a per-page mirror to compensate for an incorrect shared mapping.

Do not mirror text, screenshots, logos, or the full cinematic hero image just to change an instructor's direction. Native homework Docs use static image placement, as described in [HOMEWORK_GOOGLE_DOC_SPEC.md](HOMEWORK_GOOGLE_DOC_SPEC.md).

## Interaction states

| Interaction | Pose | Required feedback |
| --- | --- | --- |
| Untouched/empty skill check | `idea` | Select an answer; no success claim |
| Incorrect answer | `caution` | Read the explanation and revise the decision |
| Correct answer | `thumbs-up` | Actual answer feedback |
| Perfect completed check | `applause` | The actual final result |
| Partial/failed completed check | `caution` | Actual score/result and useful next review |
| No completed primary checkpoints | `checklist` | What to review first |
| Some completed checkpoints | `confident` | Actual partial progress |
| All primary checkpoints complete | `trophy` | Actual completion guidance |

Do not randomly choose a celebratory pose for an incorrect answer to avoid repetition. Meaningful dynamic states take precedence over static pose variety. Answer changes, retry and restored saved progress must update the pose, tip, accessible label and feedback together.

Skill blocks require `data-skill-scope` and one `data-companion="skill"`. Progress requires one correctly targeted `data-companion="progress"` (or the existing `lesson-progress` hook where already used). Reuse the shared engine for both website pages whenever they contain these interactions.

## Motion, assets and review

- Motion uses the existing lifecycle: visible-state entry/reaction and reduced-motion support. Do not introduce page-specific animation engines.
- Fetch textures near the viewport. Do not preload every pose sheet or decode the whole library on entry.
- Use existing `.studio-avatar.<pose>` classes. Do not use asset filenames as invented pose names or draw new variants without an approved need.
- Test a visible instructor with click, Enter and Space. Its expanded state, controlled tip and current message should agree.
- Inspect correct, incorrect, empty, partial, complete and restored states. Check that an overlay does not intercept taps or cover a quiz answer.
- Review actual screenshots for gaze, gesture, unnecessary pairs, adjacent repeated static poses, tiny sprite bleed, cropping and empty space.
- When adding a pose to the approved library, update shared source, this table and relevant review coverage deliberately; do not silently create a page-only pose.
