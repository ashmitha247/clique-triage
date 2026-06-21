# Evidence capture checklist (InnovateZ submission)

Complete these after the guided UI is deployed. **You** record and export — this doc is the checklist.

---

## 1. Verify locally (5 min)

```bash
cd capstone/services/clique-triage
bash run-dev.sh
```

Open http://localhost:5173 and walk through:

- [ ] Landing explains what Clique does
- [ ] Steps 1–4 advance with **Next** / **Back** only (no auto-advance)
- [ ] Step 3 shows full elimination panel immediately
- [ ] Step 4 shows investigation lead + supporting evidence
- [ ] Done screen has handoff checklist + Restart

---

## 2. Hero screenshot (required)

On **Step 3 — Clique ruled out what doesn't matter**, capture:

```text
Evidence examined: 12
Discarded: ✗ checkout.css, ✗ README.md, ✗ express…
Ranked: ✓ vendor_sdk release, ✓ Issue #482, ✓ Issue #483
```

Save as `screenshots/step3-elimination.png` and paste into PDF appendix as **first screenshot**.

---

## 3. Your 60-second screen recording

Follow [MAINTAINER_DEMO.md](./MAINTAINER_DEMO.md) script. Tools: Loom, OBS, or Windows Game Bar.

- [ ] Record at 1080p if possible
- [ ] Pause 3 seconds on step 3
- [ ] Upload to YouTube (unlisted) or attach to PDF / form if allowed

---

## 4. Deploy demo URL

```bash
cd capstone/services/clique-triage/frontend
npm run build
npx vercel dist --prod
```

- [ ] Paste URL in Google Form
- [ ] Update README demo link
- [ ] Update INNOVATEZ PDF submission links section
- [ ] Send URL to maintainers with MAINTAINER_DEMO template

---

## 5. Maintainer recordings (optional boost)

- [ ] Send link to Maintainer A + B
- [ ] Receive 30–60s clip back
- [ ] Optionally embed link in PDF: "Validated by maintainer walkthrough"

---

## 6. Export PDF

Source: [INNOVATEZ_2026_SUBMISSION.md](./INNOVATEZ_2026_SUBMISSION.md)

- [ ] Re-export after UI screenshots updated
- [ ] Lead PDF with step 3 screenshot + one-line value prop
- [ ] Mention guided walkthrough (4 steps, user-controlled)
- [ ] Upload single PDF to InnovateZ Google Form

---

## 7. Google Form fields

| Field | Value |
|-------|--------|
| GitHub | https://github.com/ashmitha247/clique-triage |
| Demo URL | Your Vercel link |
| PDF | Exported submission doc |

---

## Success test

Ask someone non-technical to watch your 60s video. They should answer:

1. What problem does Clique solve?
2. What did Clique do?
3. What would you do with the output?

If all three — submit.
