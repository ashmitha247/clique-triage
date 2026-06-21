# Evidence capture checklist (InnovateZ submission)

Complete these after the guided UI is deployed. **You** record and export — this doc is the checklist.

---

## 1. Verify locally (5 min)

```bash
cd capstone/services/clique-triage
bash run-dev.sh
```

Open http://localhost:5173/?demo=1 and walk through:

- [ ] **Act 1 — Research:** Huda Naaz + Ajeet cards, insight strip, **Next: Our approach**
- [ ] **Act 2 — Architecture:** Built vs Roadmap flow, **Next: See the product**
- [ ] **Act 3 — Landing:** "Act 3 — Live walkthrough" subtitle (demo mode only)
- [ ] Steps 1–4 advance with **Next** / **Back** only (no auto-advance)
- [ ] Step 3 shows full elimination panel immediately
- [ ] Step 4 shows investigation lead + supporting evidence
- [ ] Done screen has handoff checklist + Restart (returns to Research in demo mode)
- [ ] **Judge demo mode** badge visible top-right

Normal `/` (no `?demo=1`) should skip Acts 1–2 and start at landing.

---

## 2. Hero screenshot (required)

On **Step 3 — Clique ruled out what doesn't matter**, capture:

```text
Evidence examined: 12
Discarded: ✗ checkout.css, ✗ README.md, ✗ express…
Ranked: ✓ vendor_sdk release, ✓ Issue #482, ✓ Issue #483
```

Save as `screenshots/step3-elimination.png` and paste into PDF appendix as **first screenshot**.

**Optional:** Screenshots of Act 1 (maintainer cards) and Act 2 (architecture flow) for PDF appendix.

---

## 3. Your 90–120 second screen recording

Follow [MAINTAINER_DEMO.md](./MAINTAINER_DEMO.md) **3-act script** at `/?demo=1`. Tools: Loom, OBS, or Windows Game Bar.

- [ ] Record at 1080p if possible
- [ ] Narrate Acts 1–2 (~40s total)
- [ ] Pause 3 seconds on step 3
- [ ] Upload to YouTube (unlisted) or attach to PDF / form if allowed

---

## 4. Deploy demo URL

```bash
cd capstone/services/clique-triage/frontend
npm run build
npx vercel dist --prod
```

- [ ] Paste **`https://YOUR-URL.vercel.app/?demo=1`** in Google Form
- [ ] Update README demo link
- [ ] Update INNOVATEZ PDF submission links section
- [ ] Send product URL (`/`) to maintainers with MAINTAINER_DEMO template

---

## 5. Maintainer recordings (optional boost)

- [ ] Send link to Huda Naaz + Ajeet (product-only `/`)
- [ ] Receive 30–60s clip back
- [ ] Optionally embed link in PDF: "Validated by maintainer walkthrough"

---

## 6. Export PDF

Source: [INNOVATEZ_2026_SUBMISSION.md](./INNOVATEZ_2026_SUBMISSION.md)

- [ ] Re-export after UI screenshots updated
- [ ] Lead PDF with step 3 screenshot + one-line value prop
- [ ] Mention 3-act judge demo (`/?demo=1`) + guided walkthrough (4 steps, user-controlled)
- [ ] Upload single PDF to InnovateZ Google Form

---

## 7. Google Form fields

| Field | Value |
|-------|--------|
| GitHub | https://github.com/ashmitha247/clique-triage |
| Demo URL | Your Vercel link with `/?demo=1` |
| PDF | Exported submission doc |

---

## Success test

Ask someone non-technical to watch your 90–120s video. They should answer:

1. What problem does Clique solve? (maintainer quotes + investigation gap)
2. What's built vs roadmap? (RAG built, Gemini roadmap)
3. What did Clique do in the product walkthrough?
4. What would you do with the output?

If all four — submit.
