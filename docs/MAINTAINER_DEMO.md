# Maintainer demo kit

Send this link to **Huda Naaz** (kuberef) and **Ajeet** (Open Sox) when asking for a short screen recording.

---

## Demo link

**Judge / InnovateZ recording (5-act prelude + product):** `https://YOUR-VERCEL-URL.vercel.app/?demo=1`  
**Product-only (maintainers):** `https://YOUR-VERCEL-URL.vercel.app`  
**Local fallback:**

```bash
git clone https://github.com/ashmitha247/clique-triage.git
cd clique-triage/capstone/services/clique-triage
bash run-dev.sh
# Judge video: http://localhost:5173/?demo=1
# Product walkthrough: http://localhost:5173
```

---

## Doubts cleared before the product demo

Each prelude slide answers one judge question. Use the **same clean-PR / external dependency scenario** on every slide.

| Slide | Doubt answered | On-screen anchor |
|-------|----------------|------------------|
| **Intro** | Who is this for? What's the niche? | Niche bullets + Huda (CNCF/kuberef) + Ajeet (Open Sox) + Cursor positioning |
| **Research** | Q3: Cursor is in the repo — why did maintainers struggle? | Quotes (only here) + external dependency pain callout |
| **Today** | Q2: Why hunt releases/issues after Cursor? | Zoned flow + narrow-gap line + niche card (no quotes) |
| **Approach** | Q1: What do I get — isn't that just Cursor? | Outcome card + judge callout + **Roadmap strip** |
| **Product** | Proof | Light landing bridge → elimination panel (step 3) |

**Running scenario (narrate on every slide):**

> Clean PR — lockfile bump only. CI fails with `proxies` TypeError. Which **external dependency** change caused this?

---

## What to tell them (30 seconds)

> When CI fails on a clean PR, a senior engineer with Cursor and web search can often get close — with time. Clique's bet is automatic evidence gathering, auditable elimination, and a repeatable investigation packet — today on fixtures, tomorrow on CI via Action + MCP.

For maintainers, send the **product-only** URL (`/`). For InnovateZ judges, record at **`/?demo=1`**.

---

## Judge recording script (~2–3 min prelude + product)

Open **`/?demo=1`**. Click **Next** while narrating — no auto-advance.

### Act 0 — Intro (~25s) · declare the niche

| Point at | Say this |
|----------|----------|
| Headline | "Investigation triage for **external dependency** CI failures — a narrow niche, not every red build." |
| Niche bullets | Read 2–3 bullets: clean PR, traceback in dependency, upstream release explains why today." |
| Huda card | "Huda Naaz — open source maintainer in the CNCF community, maintainer of kuberef. Fast-moving external deps — she sees this more often." |
| Ajeet card | "Ajeet — maintainer of Open Sox. External dependency breaks are rare for him — but when they hit, finding the issue is the slow part. Install-once CI automation helps on that rare day." |
| Cursor line | "Cursor is still the fix step. We target the hunt before Cursor — especially stacks like Huda's." |
| Scenario strip | "Same demo scenario throughout — clean PR, lockfile bump, proxies error." |

**Click:** Next: Research Insights

### Act 1 — Research (~20s) · clears Q3

| Point at | Say this |
|----------|----------|
| Scenario strip | "Clean PR, red build — the failure is in CI, but the cause may be outside the repo." |
| **Where Cursor stops being enough** | "Cursor can read your logs and diff and try to fix. On a clean PR, the break often comes from an upstream release — and you still hunt that evidence before Cursor has something solid." |
| Huda | "When a clean PR breaks, look at external update logs — connecting that to this failure takes time." |
| Ajeet callout | "Ajeet said it plainly: Cursor helps when context is in reach — your repo or what you've pasted in." |
| Pain callout | "The pain is assembling **external dependency** evidence before Cursor has a useful clue." |

**Click:** Next: Today's Workflow

### Act 2 — Today (~25s) · clears Q2

| Point at | Say this |
|----------|----------|
| Outside repo zone | "External dependency releases and issues — you hunt these manually today." |
| **The expensive step** | "Which dependency release explains this — still manual hunting." |
| **Narrow gap line** | "Clique narrows the gap between 'something in the dependency graph changed' and 'here's where to spend fifteen minutes.'" |
| Niche sidebar | "Same niche — skip Clique for in-repo bugs; use Cursor." |
| Clique replaces line | "Clique doesn't replace Cursor. It replaces hunting **external dependency** evidence." |
| Outcome teaser | "Next — what Clique actually gives you." |

**Click:** Next: Our Approach

### Act 3 — Approach (~30s) · clears Q1

| Point at | Say this |
|----------|----------|
| What you get card | "Automatic assembly of **external dependency** evidence — starting point, ruled out, verify next." |
| Judge callout | "Yes, Cursor + web search can get close. What a single chat doesn't standardize: team record, elimination trail. What Clique does first: collect dependency evidence, rule out noise, rank a packet — then Cursor fixes." |
| **Roadmap strip** | "CI fails → Action triggers → pipeline produces JSON → PR comment or MCP for Cursor. Today: fixtures. Tomorrow: headless on CI." |
| Workflow animation | **Pause on timeline + elimination.** |
| Handoff strip | "Direct to Cursor: variable outcome. Clique → Cursor: packet in, focused fix out." |

**Click:** Next: See the product

### Act 4 — Product landing + walkthrough (~45–60s)

| Step | Say this | Click |
|------|----------|-------|
| Landing (light bridge) | "Proof of the Outcome card — external dependency break, elimination, ranked lead." | **Start investigation** |
| 1 — Failure | "Here's the build error. Most tools stop here." | **Next** |
| 2 — Evidence | "Clique gathered logs, git, releases, and issues — ranked the relevant signals." | **Next** |
| 3 — Elimination | **Pause 3 seconds.** "This is what agents don't show: twelve examined, nine discarded with reasons. Three ranked." | **Next** |
| 4 — Lead | "Start with vendor_sdk 8.1.4 — where to spend fifteen minutes, not root cause." | **See handoff** |
| Done | "Paste this lead into Cursor and fix." | Stop recording |

**Money shot:** Step 3 — full elimination panel with Discarded / Ranked lists visible.

**Restart on Done** returns to Act 0 (Intro) in demo mode.

---

## Narration cheat sheet (beside monitor)

| When clicking Next from… | One line |
|--------------------------|----------|
| Intro | "Niche declared: external dependency CI failures — Huda often, Ajeet rarely but painful." |
| Research | "External dependency evidence — the pain before Cursor." |
| Today | "We narrow the hunt gap — no duplicate quotes here." |
| Approach | "Web search parity honest — roadmap explains CI + MCP delivery." |
| Product step 3 | **Pause.** "Twelve examined, nine discarded — the differentiator." |

---

## 60-second product-only script (maintainers)

Same as Act 4 above, starting at `/` (no prelude slides).

---

## Judge killer Q&A (rehearse these)

| Question | Answer |
|----------|--------|
| **Doesn't Cursor have web search? Doesn't Copilot live in the repo?** | Yes — for in-repo bugs that's often enough. People search **again** when: AI gave a generic answer and they need to **verify against release notes**; the break is in a **dependency repo Copilot never indexed**; git has **noise commits** AI didn't rule out; they need a **repeatable starting point** next CI failure — not a new chat. Clique targets that verification gap on **external dependency** breaks. |
| **How do I actually use this in my repo?** | **Today:** clone → add `data/failed_build.log` → `bash run-dev.sh` → open localhost:5173. **Roadmap:** one GitHub workflow on CI failure → packet on the PR → investigate from the ranked lead. Point at **How you'd use Clique in a repo** on Approach slide. |
| **Why not skip Clique and go straight to Cursor?** | For in-repo bugs, yes. Clique is for **external dependency** breaks on clean PRs — automates the hunt, then hands Cursor a packet. |
| **Who is this actually for?** | **Huda (CNCF/kuberef):** fast-moving external deps, sees this more often. **Ajeet (Open Sox):** rare but painful — install-once CI value on the day you need it. |
| **Isn't the demo rigged?** | Fixtures for reproducibility. Value = elimination workflow for **external dependency** failures. |
| **Where's the AI / Cognee?** | MVP is deterministic — no LLM, no Cognee. Gemini summarizes ranked JSON on roadmap. |
| **Standalone product or feature?** | Integration layer: GitHub Action on failure → workspace JSON → MCP for Cursor. Not another chat app. |

**If they push on web search:** "Same lead, maybe — if you have time to prompt well. Different product: a standardized packet your team and CI can reproduce."

**If they push on frequency:** "Not every red build — the expensive minority where investigation time dominates. That's what our maintainers described."

---

## How to say it when recording (expanded)

Use this on the **Approach** slide after reading the judge callout, or if a judge asks *"why not just Cursor?"* / *"how often would anyone use this?"* at the end. Aim for **45–60 seconds** if you have time; the short version is the last paragraph.

### 1. Start honest — Cursor wins most of the time

> "First, we're not claiming every CI failure needs Clique. If it's a typo, a missing env var, or a test you broke in your diff — skip us. Open Cursor, fix it in-repo, done. That's the majority of red builds, and Cursor is strictly better for that."

> "We built Clique for a **narrower moment**: the build goes red, your PR looks clean, the traceback points at a dependency or something outside your diff, and you catch yourself thinking — *why today? nothing I changed should have caused this.* That's the expensive minority our maintainers described."

### 2. Name the niche — Huda's world vs Ajeet's world

> "We talked to two maintainers, and they actually disagreed on **frequency** — which is important."

**Huda Naaz (kuberef, CNCF / DevOps / Python):**

> "Huda maintains kuberef in a fast-moving ecosystem — Kubernetes Python clients, PyYAML patches, upstream deps that can shift under you during CI even when your PR looks fine. For her, a clean PR that breaks *is* a signal: look at external update logs. Connecting that upstream change to *this* runtime failure is time-consuming — logs and tracebacks on one side, Slack, Discord, GitHub releases and issues on the other. **Clique is built for Huda's moment** — dependency-dense stacks where investigation time dominates debugging time."

**Ajeet (Open Sox):**

> "Ajeet was more honest in the other direction: external dependency ghost-breaks are **rare** for him. APIs are usually backward compatible. He uses Cursor when context is in reach, Dependabot for outdated deps — but Dependabot tells you *what* updated, not *whether that update explains this failure*. He hasn't hit the nightmare clean-PR dependency break yet — but when he does, he said finding the issue is always the most time-consuming part."

> "So we're not pitching 'every maintainer needs this every day.' We're pitching: **when this failure mode hits, the hunt is brutal** — and today that hunt is manual tabs before Cursor is useful."

### 3. Why Clique → Cursor, not Cursor alone

> "You can paste the log into Cursor, turn on web search, and spend fifteen minutes prompting. You might get the same lead — vendor_sdk 8.1.4, check the release notes. We're not claiming exclusive information."

> "What's different is **what happens before the fix**:"

| Cursor alone | Clique → Cursor |
|--------------|-----------------|
| One private chat thread | A **standardized investigation packet** (JSON + UI) |
| Outcome varies by prompt and mood | Same inputs → same elimination trail (deterministic today) |
| Rarely shows *what was ruled out* | **Twelve examined, nine discarded with reasons** — visible |
| You redo the hunt on the next red build | Roadmap: **runs on CI failure**, packet waiting before you open the IDE |
| You guess what to @ mention | Ranked lead + verify steps → **paste into Cursor** to implement |

> "Clique isn't an extra chat app competing with Cursor. It's the **tab-hopping automated** — releases, issues, git noise crossed out — so Cursor gets a focused upstream packet instead of a vague 'fix my build.'"

### 4. The install-once story (Ajeet's occasional value)

> "For someone like Ajeet — who might not need this weekly — the product still makes sense **once it's infrastructure**, not a website you remember to open."

> "Today the demo is manual: run the pipeline, walk the UI. **Roadmap:** a GitHub Action on `workflow_failure` → same `investigation_workspace.json` → PR comment, Slack, or MCP tool in Cursor. You install it once on the repo. Most builds: nothing happens, or Cursor handles it. **Once in a while** — that clean PR, that lockfile bump, that upstream surprise — Clique has already assembled the packet while CI was still red. You're not starting from zero at 11pm."

> "That's the bet: **low frequency, high pain when it hits** — and automation means you don't have to remember the tool exists on the rare day you need it."

### 5. Close the loop before Act 4

> "So: skip Clique for simple in-repo bugs. Use Clique → Cursor when the break doesn't match the PR and the answer lives upstream. **Huda's stack** sees that more often; **Ajeet's stack** sees it rarely — but when it lands, twenty minutes of hunting becomes a ranked starting point and a handoff. Let me show you what that packet looks like."

**Click:** Next: See the product

### Short version (15 seconds — if you're tight on time)

> "Skip Clique for in-repo bugs — use Cursor. We target the expensive minority: clean PR, upstream break, manual hunt before fix. Huda sees it in fast-moving deps; Ajeet says it's rare but brutal when it hits. Clique automates that hunt and shows what was ruled out; Cursor fixes with the packet we assembled. Install-once on CI means it helps on the rare day you need it — not every day."

### Where to point on screen while saying this

| Beat | Point at |
|------|----------|
| "Skip us for in-repo bugs" | Research or Today — **In your repo** zone |
| "Huda's moment / clean PR" | **Scenario strip** on every slide |
| "Ajeet — rare but painful" | Ajeet quote card (Research) or Today callout |
| "Not another chat" | Approach **Why Clique → Cursor** section in judge callout |
| "Twelve examined, nine ruled out" | **Pause** on product step 3 — elimination panel |
| "Install once on CI" | Approach **tech column** — GitHub Actions trigger (Roadmap pill) |

---

## Optional questions (reply in DM)

1. Does ruling out non-functional commits match how you triage?
2. Would a ranked investigation lead be useful before you open an IDE?
3. What's missing for you to actually use this?

---

## Email / DM template

```text
Hi — quick favour for a hackathon submission (InnovateZ).

We built Clique: when CI fails, it gathers evidence from logs, git, releases, and issues, rules out noise, and ranks what to investigate first.

Demo (60 sec): [YOUR VERCEL URL]/?demo=1
Repo: https://github.com/ashmitha247/clique-triage

If you can screen-record clicking Start → Next through the 4 steps (especially step 3 — elimination panel), that would help us a lot. No prep needed — just narrate what you'd do.

Optional: does this match how you'd triage a dependency break?

Thanks!
```

---

## Recording tips

- **Judges:** use `/?demo=1` — prelude clears Cursor doubts before the product walkthrough.
- Use the **guided flow** — click Next slowly, don't wait for auto-advance (there isn't any).
- **Step 3:** show the full sidebar before clicking Next — judges need to see `Evidence examined: 12`.
- **Approach slide:** let workflow steps animate; pause on timeline + elimination.
- End on **Step 4** ("Start here") — sounds like advice, not "we found root cause."

---

## Deploy instructions (for you)

```bash
cd capstone/services/clique-triage
bash run-dev.sh          # refresh JSON once, then Ctrl+C
cd frontend
npm run build
npx vercel dist --yes    # or: vercel deploy dist --prod
```

Paste **`/?demo=1`** production URL in InnovateZ form. Use bare `/` for maintainer outreach.
