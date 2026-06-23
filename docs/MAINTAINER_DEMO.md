# Maintainer demo kit

Send this link to **Huda Naaz** (kuberef) and **Ajeet Singh** (Open Sox) when asking for a short screen recording.

---

## Demo link

**Full presentation recording (10-act prelude + product + limitations):** https://clique-demo-six.vercel.app/?demo=1  
**Product-only (maintainers):** https://clique-demo-six.vercel.app  
**Local fallback:**

```bash
git clone https://github.com/ashmitha247/clique-triage.git
cd clique-triage/capstone/services/clique-triage
bash run-dev.sh
# Full presentation: http://localhost:5173/?demo=1
# Product walkthrough: http://localhost:5173
```

---

## Presentation sections (top nav on every prelude slide)

| PDF section | Prelude slides | Doubt answered |
|-------------|----------------|----------------|
| **Problem** (5 slides) | Origin → Web research → Maintainer validation → Niche & scope → Huda's workflow today | Is the problem real? Who validated it? What's the niche? |
| **Under-Hood** (2 slides) | Approach (plain English) → Under the hood (technical) | What do I get? How does it work exactly? |
| **Sources** | Data sources | Where does every claim come from? |
| **vs LLM** | Value beyond generic LLM | Why not paste into ChatGPT? |
| **Architecture** | Engine built · extension next | What's proven vs roadmap? |
| **Demo** | Huda POV landing → 4 product steps → Limitations | Proof + honest scope |

**Running scenario (narrate on every slide):**

> Clean PR — lockfile bump only. CI fails with `proxies` TypeError. Which **external dependency** change caused this?

---

## What to tell them (30 seconds)

> When CI fails on a clean PR, a senior engineer with Cursor and web search can often get close — with time. Clique's bet is automatic evidence gathering, auditable elimination, and a repeatable investigation packet — today on fixtures, tomorrow on CI via Action + MCP.

For maintainers, send the **product-only** URL (`/`). For the full walkthrough, record at **`/?demo=1`**.

---

## Full presentation recording script (~4–5 min prelude + product)

Open **`/?demo=1`**. Click **Next** while narrating — no auto-advance. Watch the top nav: **Problem · Under-Hood · Sources · vs LLM · Architecture · Demo**.

### PDF §1 — Problem · 1/5 — Origin (~20s)

| Point at | Say this |
|----------|----------|
| Headline | "I started with a curiosity — not a product pitch." |
| Origin bullets | "Clean PR, red CI, traceback in a dependency. The diff doesn't explain it. I wondered how external dependency updates relate to failures that don't match the PR." |
| Scenario strip | "Same kuberef scenario throughout — lockfile bump, proxies error." |

**Click:** Next: Web research

### PDF §1 — Problem · 2/5 — Web research (~25s)

| Point at | Say this |
|----------|----------|
| Citation cards | "Empirical papers — not vibes. Breaking changes show up in minor/patch releases more than SemVer promises." |
| FSE / EMSE cards | "Rare at population level — expensive when it lands. Backward compatibility is common but not guaranteed." |
| TOSEM CI finding | "CI status change helps confirm provider-caused breaks — investigation needs external correlation." |
| Close line | "Web research suggested the problem is real but narrow — I needed to talk to maintainers, not just papers." |

**Click:** Next: Maintainer validation

### PDF §1 — Problem · 3/5 — Maintainer validation (~25s)

| Point at | Say this |
|----------|----------|
| Huda quote | "When a clean PR breaks, look at external update logs — connecting that to this failure takes time." |
| Ajeet quote | "External breaks are rare. Finding the issue is always the slow part. Cursor helps when context is in reach." |
| Validation matrix | "What they validated vs what they did NOT prove — supporting evidence, not market sizing." |

**Click:** Next: Niche & scope

### PDF §1 — Problem · 4/5 — Niche & scope (~30s)

| Point at | Say this |
|----------|----------|
| Causation line | "Most upstream updates are harmless. Correlation, not causation — CI failed, an update happened nearby, here's evidence to investigate whether they're related." |
| Investigation workflow | "CI failed → update nearby? → collect evidence → packet." |
| Comparable extensions table | "Failed Build Issue, GithubActionsAI, CI Fix Coach, Fix with Copilot — complements, not replacements. Clique assembles upstream evidence before chat." |

**Click:** Next: Huda's workflow today

### PDF §1 — Problem · 5/5 — Huda's workflow today (~25s)

| Point at | Say this |
|----------|----------|
| Outside-repo zone | "Releases and issues — hunted manually today." |
| Expensive step callout | "Huda's expensive step: connecting external update logs to **this** runtime failure." |
| Outcome teaser | "With Clique: a ranked packet — not a fix." |

**Click:** Next: Approach (plain English)

### PDF §2 — Under-Hood · 1/2 — Approach plain (~25s)

| Point at | Say this |
|----------|----------|
| Outcome card | "Automatic assembly of external dependency evidence — starting point, ruled out, verify next." |
| Judge callout | "Yes, Cursor + web search can get close. Clique standardizes the elimination trail and repeatable packet." |
| Complement handoff | "Clique narrows; Cursor fixes." |

**Click:** Next: Under the hood

### PDF §2 — Under-Hood · 2/2 — Under the hood (~30s)

| Point at | Say this |
|----------|----------|
| Workflow animation | **Pause on timeline + elimination.** |
| Pipeline bullets | "CI log → Go log_slicer → Python triage_engine → hybrid RAG → elimination rules → investigation_workspace.json → UI replay." |
| Scoring rules | "6-hour temporal window, traceback overlap, git file-type elimination, RRF retrieval. No LLM in MVP." |

**Click:** Next: Data sources

### PDF §3 — Sources (~20s)

| Point at | Say this |
|----------|----------|
| Sources table | "Every row is explicit: fixture file, live git, paper URL, or maintainer conversation." |
| Mock labels | "mock_internet/ for reproducibility — live PyPI/GitHub on roadmap." |

**Click:** Next: Value beyond generic LLM

### PDF §4 — vs LLM (~20s)

| Point at | Say this |
|----------|----------|
| Direct answer | "Paste-into-chat doesn't assemble multi-source evidence or show what was ruled out." |
| Comparison table | "Multi-source ingest, elimination trail, repeatability, causation guardrail." |
| Concession line | "70–90% parity with good prompting on a single log — different product when you need the packet." |

**Click:** Next: Architecture

### PDF §5 — Architecture (~25s)

| Point at | Say this |
|----------|----------|
| Built today panel | "Engine is built — pipeline, JSON packet, UI replay. Demo-proven on fixtures." |
| Roadmap panel | "Extension is wiring — GitHub Action on failure, PR comment, optional MCP." |
| Key message | "The hard part I proved is the investigation packet. The extension is one YAML file." |

**Click:** Next: Huda's demo

### PDF §6 — Demo · Huda POV product (~45–60s)

| Step | Say this | Click |
|------|----------|-------|
| Landing (light bridge) | "What Huda would see investigating a kuberef CI failure. Today: clone + run-dev.sh. Extension install = roadmap." | **Start investigation** |
| 1 — Failure | "Build error. Most tools stop here." | **Next** |
| 2 — Evidence | "Logs, git, releases, issues — ranked signals." | **Next** |
| 3 — Elimination | **Pause 3 seconds.** "Twelve examined, nine discarded with reasons. Three ranked." | **Next** |
| 4 — Lead | "Start with vendor_sdk 8.1.4 — where to spend fifteen minutes." | **See limitations** |

**Money shot:** Step 3 — full elimination panel with Discarded / Ranked lists visible.

### PDF §6 — Demo · Limitations (~20s)

| Point at | Say this |
|----------|----------|
| Built today | "Engine + UI replay on fixtures." |
| Mocked | "mock_internet/, fixture git." |
| Roadmap | "GitHub Action, MCP, live fetch, Gemini summary." |
| Scope close | "Minor scope today. Feasible extension tomorrow." |

**Click:** Restart demo (returns to Origin)

**Non-demo mode (`/`):** Done screen shows **Restart demo** only — no prelude or limitations slides.

---

## Narration cheat sheet (beside monitor)

| When clicking Next from… | One line |
|--------------------------|----------|
| Origin | "Curiosity frame — clean PR, external dependency break." |
| Web research | "Papers say real but narrow." |
| Maintainer validation | "Huda + Ajeet validated pain, not market size." |
| Niche & scope | "Correlation not causation; complements not replacements." |
| Huda today | "Expensive step = connect update logs to this failure." |
| Approach plain | "Packet before fix — honest Cursor parity." |
| Under the hood | "Deterministic pipeline — pause on elimination." |
| Data sources | "Every claim has a source row." |
| vs LLM | "Assembly + elimination trail, not another chat." |
| Architecture | "Engine built, extension wiring next." |
| Product step 3 | **Pause.** "Twelve examined, nine discarded — the differentiator." |
| Limitations | "Honest scope — restart if you want to replay." |

---

## 60-second product-only script (maintainers)

Same as PDF §6 product steps above, starting at `/` (no prelude slides).

---

## Judge killer Q&A (rehearse these)

| Question | Answer |
|----------|--------|
| **Aren't dependency updates usually backward compatible?** | Yes — most are. Clique targets the expensive minority: clean PR, traceback in `site-packages`, upstream release in a noisy window. |
| **Doesn't Cursor have web search?** | Yes — for in-repo bugs. Clique targets external dependency verification: release notes, timing, elimination trail — a repeatable packet. |
| **How do I actually use this in my repo?** | **Today:** clone → `bash run-dev.sh` → localhost:5173. **Roadmap:** GitHub workflow on CI failure → packet on PR. |
| **Why not skip Clique and go straight to Cursor?** | For in-repo bugs, yes. Clique automates the upstream hunt, then hands Cursor a packet. |
| **Who is this for?** | **Huda (kuberef):** fast-moving deps. **Ajeet Singh (Open Sox):** rare but painful — install-once CI value. |
| **Isn't the demo rigged?** | Fixtures for reproducibility. Value = elimination workflow for external dependency failures. |
| **Where's the AI?** | MVP is deterministic. Gemini summarizes ranked JSON on roadmap. |
| **Standalone product or feature?** | Integration layer: Action on failure → JSON → MCP for Cursor. |

---

## Email / DM template

```text
Hi — quick favour.

We built Clique: when CI fails, it gathers evidence from logs, git, releases, and issues, rules out noise, and ranks what to investigate first.

Demo (60 sec): [YOUR VERCEL URL]/?demo=1
Repo: https://github.com/ashmitha247/clique-triage

If you can screen-record clicking Start → Next through the 4 steps (especially step 3 — elimination panel), that would help us a lot. No prep needed — just narrate what you'd do.

Optional: does this match how you'd triage a dependency break?

Thanks!
```

---

## Recording tips

- **Full presentation:** use `/?demo=1` — presentation sections in nav before product walkthrough.
- Click **Next** slowly — no auto-advance.
- **Step 3:** show full sidebar before clicking Next — `Evidence examined: 12`.
- **Under the hood slide:** pause on workflow animation at elimination.
- End on **Limitations** — honest scope, then Restart.

---

## Deploy instructions (for you)

```bash
cd capstone/services/clique-triage
bash run-dev.sh          # refresh JSON once, then Ctrl+C
cd frontend
npm run build
npx vercel dist --yes    # or: vercel deploy dist --prod
```

Use **`/?demo=1`** for the full presentation URL. Use bare `/` for maintainer outreach.
