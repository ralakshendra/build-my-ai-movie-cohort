# Build My AI Movie visual QA

Run from repository root:

```bash
npm install
npx playwright install chromium
npm run qa:visual
```

The harness checks the target site at mobile and desktop viewports for horizontal overflow, viewport-width violations, mobile navigation availability, and captures full-page screenshots in qa/artifacts/. Set `BMAI_BASE_URL=http://127.0.0.1:8766/` to run it against the local preview.

For owner review, run `npm run preview` and open `http://127.0.0.1:8766/__review__/`. This local-only page lists every public HTML page and opens future lessons without website locks. The ordinary preview at `http://127.0.0.1:8766/` retains the release schedule. Before release, run `npm run qa:review` and `npm run qa:release` while the local server is running.

