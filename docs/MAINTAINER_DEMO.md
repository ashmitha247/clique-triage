# Maintainer demo kit

Send this link to **Maintainer A** (CNCF) and **Maintainer B** (production deployer) when asking for a short screen recording.

---

## Demo link

**Live (after you deploy):** `https://YOUR-VERCEL-URL.vercel.app`  
**Local fallback:**

```bash
git clone https://github.com/ashmitha247/clique-triage.git
cd clique-triage/capstone/services/clique-triage
bash run-dev.sh
# Open http://localhost:5173
```

---

## What to tell them (30 seconds)

> We're building a tool that helps developers know **what to investigate first** when CI fails — not every failure, just the messy ones where you jump between logs, git, releases, and GitHub issues.  
> Could you click through this 60-second demo and tell us if the elimination step matches how you'd triage?

---

## 60-second recording script

Narrate while clicking **Start investigation** → **Next** through each step:

| Step | Say this | Click |
|------|----------|-------|
| Landing | "CI failed and I don't know where to start." | **Start investigation** |
| 1 — Failure | "Here's the build error. Most tools stop here." | **Next** |
| 2 — Evidence | "Clique pulled logs, git, releases, and issues — RAG ranked the relevant docs." | **Next** |
| 3 — Elimination | **Pause 3 seconds.** "It crossed out CSS and README — not the cause. Twelve examined, three ranked." | **Next** |
| 4 — Lead | "I'd start with vendor_sdk 8.1.4 — not root cause, just where to spend 15 minutes." | **See handoff** |
| Done | "Then I'd open the issue or paste this into Cursor." | Stop recording |

**Money shot:** Step 3 — full elimination panel with Discarded / Ranked lists visible.

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

Demo (60 sec): [YOUR VERCEL URL]
Repo: https://github.com/ashmitha247/clique-triage

If you can screen-record clicking Start → Next through the 4 steps (especially step 3 — elimination panel), that would help us a lot. No prep needed — just narrate what you'd do.

Optional: does this match how you'd triage a dependency break?

Thanks!
```

---

## Recording tips

- Use the **guided flow** — click Next slowly, don't wait for auto-advance (there isn't any).
- **Step 3:** show the full sidebar before clicking Next — judges and maintainers need to see `Evidence examined: 12`.
- End on **Step 4** ("Start here") — sounds like advice, not "we found root cause."
- Optional: click **Play elimination replay** on step 3 for a more dynamic clip.

---

## Deploy instructions (for you)

```bash
cd capstone/services/clique-triage
bash run-dev.sh          # refresh JSON once, then Ctrl+C
cd frontend
npm run build
npx vercel dist --yes    # or: vercel deploy dist --prod
```

Paste the production URL above and in README / InnovateZ PDF.
