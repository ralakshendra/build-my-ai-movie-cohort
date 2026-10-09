# Prompt Vault banner

Uses the user-supplied hero image from 9 October 2026 and the approved copy:

SEARCH · CUSTOMIZE · COPY

Prompt Vault

Your central library of AI moviemaking prompts, workflows, and proven recipes.
Everything organized to help you create faster.

The current unpublished Vault supplies its real totals: 58 official prompts, 70 practice recipes and 15 sessions. The hero component accepts those counts from the generator rather than freezing them.

## Implementation and dependency

`scripts/prompt-vault-hero.cjs` supplies semantic, selectable hero markup. `styles/pages/prompt-vault-banner.css` provides scoped desktop and mobile layouts. The supplied artwork is served as 126,672-byte desktop and 57,780-byte mobile WebP files, preserving its original composition.

The Prompt Vault generator, page and 15-session content are part of existing unpublished work in the maintained checkout. They are absent from main at this revision's base commit, a572b27. This isolated banner commit intentionally does not release the broader site improvements.

The generator integration is already implemented in that checkout. When releasing the Vault, require `./prompt-vault-hero.cjs` with `{ official: totalOfficial, practice: totalPractice, sessions: schedule.length }`, replace its original hero section with the returned markup, and load `styles/pages/prompt-vault-banner.css` after the shared styles. Keep the existing shared guidance panel outside the inner `.prompt-vault-banner`. Do not edit generated HTML by hand.

## Verification

- Full build: 49 public pages, 15 sessions, no errors or warnings.
- Browser checks at 320, 390, 820 and 1440 pixels: no horizontal overflow, correct copy/counts, decoded responsive image and working keyboard skip link.
- Desktop and mobile screenshots inspected; portrait, copy and counts remain clear. Guidance sits below the banner.
- Scheduled release boundaries: 45 authored routes passed.
- Owner review: 49 pages open in review; ordinary preview retains its schedule locks.
- Full-site cohesion: all 136 page/viewport combinations passed.
- The shared brand's muted `!important` lead color required a scoped override. Final copy uses bright text, a stronger dark image gradient, separate sentence spacing and a nonbreaking “create faster.” phrase. The final banner was rechecked at all four widths after this correction. Do not infer hosted performance from local checks.

Deployment remains pending the user's choice to release the unpublished Vault together with this banner or save the banner for the pending site release.
