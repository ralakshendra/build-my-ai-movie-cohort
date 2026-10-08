# Avatar and homework placement review

Updated 8 October 2026. See `FIXES_REVIEW_2026-10-08.md` for the complete website changes, evidence and preview instructions.

## Approved library coverage

All 25 approved poses are represented:

pointing, storyboard, reference-board, laptop, camera, headphones, microphone, clapperboard, idea, checklist, caution, wave, celebrate, surprised, thumbs-up, palette, product, encouragement, trophy, applause, confident, curious, open-welcome, laugh and ready.

Their presence does not require placing every pose on every page. Each placement supports the local task. The product/drink avatar appears only in the coconut advertisement lesson. One instructor handles each skill/progress section. Static neighboring sections use different poses, and the shared engine faces each instructor toward its content.

## Interaction states

| Section/state | Pose and behavior |
| --- | --- |
| Skill check untouched | Idea; guidance to select an answer. |
| Wrong answer | Caution; pause and review the relevant concept. |
| Correct answer | Thumbs-up; feedback on the answer. |
| Perfect completed check | Applause; final completion feedback. |
| Partial/failed completed check | Caution; actual score and further review guidance. |
| Progress at zero | Checklist; next step guidance. |
| Progress partially complete | Confident; actual progress feedback. |
| Progress complete | Trophy; completion feedback. |

Tips open with click, Enter or Space and expose their expanded state and controlled tip to assistive technology. Restored progress updates both text and pose. Reduced-motion preferences are respected.

## Layout repairs

- The supplied Week 3 Day 1 pipeline screenshot now has one reference-board instructor in a single guidance panel. Useful source text remains.
- The Week 3 Day 1 playbook hero shows the complete portrait in a desktop two-column layout and a phone stack.
- Duplicate Playbook buttons and back-to-back closing instructor panels were consolidated.
- Locked and error pages each contain one instructor.
- Fixed page-level flips that opposed the shared orientation were removed.

## Homework navigation

Session → Playbook → official Google Homework Doc.

Only playbook pages contain direct Homework Doc links. Session and homepage assignment links lead to the appropriate playbook. Existing official URLs and Docs content are unchanged. No new homework URL was invented.

## Evidence

The current local review covers 16 pages, eight skill checks, ten progress sections and all 25 approved poses. Phone and desktop skill/progress states and keyboard tips were exercised. A separate composition pass checked 48 page/width combinations, including 320 pixels, and 402 avatar directions with no adjacent repeated poses, nested panels or overflow.

Detailed evidence lives outside the packaged source in the workspace's `qa/avatar-review/` folder. The complete site report describes the other website checks and preserved backups.
