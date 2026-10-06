# Build My AI Movie visual QA

Run from repository root:

```bash
npm install
npx playwright install chromium
npm run qa:visual
```

The harness checks the published site at mobile and desktop viewports for horizontal overflow, viewport-width violations, mobile navigation availability, and captures full-page screenshots in qa/artifacts/.

