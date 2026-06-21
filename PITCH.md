# Clique — Investigation Triage Workspace
**Hackathon pitch · MVP vs roadmap · Judge handout**

*Not “AI-Assisted” in the MVP — ranking and elimination are deterministic. AI synthesis is roadmap (RAG course).*

---

## One sentence

When CI fails, Clique **assembles and ranks investigation evidence** from logs, repository changes, dependencies, and community signals — then **replays the investigation** so developers know what to inspect first, not what Dependabot already told them changed.

---

## The problem (30 seconds)

Modern failures often aren’t “I can’t read the error.” They’re:

> “Something external changed. I don’t know if it caused *this* failure.”

Engineers still manually jump between CI logs, git history, manifests, release notes, GitHub issues, and forums **before** they can form a useful hypothesis.

**The insight that changed the project (from real interviews):**  
Tools like Dependabot already answer *“What updated?”*  
They do **not** answer *“Could that update explain the build I’m staring at right now?”*

Both maintainers we spoke with confirmed that gap. We label them **Maintainer A** and **Maintainer B** below (anonymous until we have permission to name them publicly).

That gap is Clique.

---

## Validated by maintainers

Two LinkedIn conversations with active maintainers **informed** the thesis — supporting evidence, not market research. We did not invent the problem from a demo scenario alone.

**If a judge asks “which maintainers?” — keep it simple:**

| | **Maintainer A** | **Maintainer B** |
|---|------------------|------------------|
| **Who** | Contributor to CNCF ecosystem tooling | Engineer responsible for production deployments |
| **Relevant because** | Sees upstream dependency breaks in CI | Operates the full deploy loop day-to-day |

Do **not** say “industry validation” or “market research” with two interviews. Say: *“Two early conversations pointed us at the investigation gap; the demo shows the workflow we built from that.”*

### Maintainer A — CNCF / kuberef (DevOps / Python)

| Topic | What she said |
|-------|---------------|
| **When breaks happen** | External dependency updates can break kuberef instantly — e.g. Kubernetes Python client or PyYAML minor patches when the test runner pulls new upstream during CI. |
| **Signal to investigate** | “When a clean PR breaks out of nowhere, it is an indicator in itself to look at recent external update logs.” |
| **What automation covers** | CI failure alerts and lockfiles can surface *that* something updated — but: “figuring out the root cause and connecting the update to breaking change/runtime behaviour can be time consuming.” |
| **Where she looks** | Internal logs and tracebacks in the pipeline **or** direct resources — “Slack, Discord, SO, Github Issues/Releases.” |

### Maintainer B — full-stack production deployer

| Topic | What they said |
|-------|----------------|
| **Frequency** | External tool failures are rare unless there is a big update; APIs and packages are often backward compatible. |
| **Workflow** | Builds locally first; Vercel/Railway email on deploy issues. Updates deps for bugs or routine maintenance — not because a release dropped. |
| **The hard part** | “Finding the issue is always the most time taking part.” |
| **Cursor** | Helps when context is within reach; has not yet hit a non-obvious CI failure from a dependency update. |
| **Ideal UI** | “small blocks, each block shows logs of one particular service.” |
| **Dependabot** | Uses GitHub dependency bot for outdated deps — but it does not connect an update to a specific failure. |

**Maintainer A (direct):**

> When a clean PR breaks out of nowhere, it is an indicator in itself to look at recent external update logs.

> figuring out the root cause and connecting the update to breaking change/runtime behaviour can be time consuming.

**Maintainer B (direct):**

> Finding the issue is always the most time taking part.

### What the interviews validate (and what they don’t)

| Thesis | Validated? | Evidence |
|--------|------------|----------|
| **Detecting updates** is the product | ❌ No | Dependabot, Renovate, CI failure alerts, and lockfiles already exist. The full-stack deployer maintainer uses the dependency bot but it does not fix the investigation. |
| **Connecting an update to a failure** is time-consuming | ✅ Yes | CNCF/kuberef maintainer: root cause + runtime linkage is “time consuming.” Full-stack deployer maintainer: “Finding the issue is always the most time taking part.” |
| **Multi-source investigation** is normal | ✅ Yes | Pipeline logs/tracebacks **plus** Slack, Discord, Stack Overflow, GitHub Issues/Releases (CNCF/kuberef maintainer). |
| **Cursor helps locally** but does not replace external investigation | ✅ Yes | Full-stack deployer maintainer uses Cursor when repo context is in reach; external/community sources still matter for non-obvious dependency failures. |
| **Every build needs triage** | ❌ No | Full-stack deployer maintainer: external breaks are rare; backward compatibility is common. **Clique targets the investigation-heavy cases** — clean PR breaks, traceback + timeline mismatch, multi-source hunt — not every green-to-red notification. |

**UI nuance:** The full-stack deployer maintainer’s “small blocks per service” is a **future dashboard direction**. Today’s demo is an **investigation replay** (one ranked lead at a time), not a multi-service log wall — by design for the hackathon narrative.

---

## What Clique is

An **investigation triage workspace** that:

1. **Ingests** build signals (logs, tracebacks)
2. **Gathers** repository, dependency, and community context
3. **Ranks** investigation leads
4. **Eliminates** noise with explicit reasons
5. **Presents** a forensic replay — not a dashboard dump

Clique does **not** claim automatic root cause.  
Clique helps developers decide **what deserves investigation first**.

---

## What Clique is NOT

| Not this | Why |
|----------|-----|
| Dependency monitor | Dependabot / Renovate already notify |
| Auto root-cause detector | Undefensible; we rank evidence |
| Autonomous debugging agent | We assemble context; humans decide |
| Replacement for Cursor | Cursor = repo intelligence; Clique = investigation intelligence |

---

## Cursor vs Clique (judge question #1)

**Scenario A — Cursor wins**  
`NameError: user_id is not defined` → local bug, Cursor fixes it. Clique adds little. **That’s fine.**

**Scenario B — Investigation problem**  
`TypeError: Client.__init__() got unexpected keyword argument 'proxies'`  
Cursor explains the constructor. The engineer asks: *“Why today? Nobody touched this file.”*  
Now they need release notes, issues, dependency timelines, and elimination of unrelated commits. **That’s Clique.**

**Handoff:**  
Clique → *“Most likely investigation lead: vendor_sdk v8.1.4 release — start here.”*  
Cursor → *“How should I update payment_gateway.py for the new API?”*

**One-line defense (Copilot / Cursor / Claude + pasted log):**

> Before I can ask Cursor for a fix, I first have to know what evidence matters. **Cursor helps solve a problem. Clique helps define the problem.**

---

## Why not paste everything into ChatGPT?

You can — **after** you collect logs, release notes, issues, and timelines.  
Gathering and organizing that context is the expensive part. Clique automates **evidence assembly before the AI conversation**.

**Why ranking? Why not just search GitHub yourself?**

> The challenge isn’t finding information. It’s deciding **which information deserves attention** when there are dozens of possible signals.

Then point at the elimination panel: **12 examined → 3 ranked → 1 lead.**

---

# MVP vs roadmap (be honest with judges)

## What works in the demo TODAY

```text
failed_build.log
      ↓  Go log slicer (CLI)
isolated_error.json
      ↓  Python heuristic engine (deterministic rules)
investigation_workspace.json
      ↓  React investigation replay (8 steps, one focus at a time)
Browser @ localhost:5173
```

| Layer | Tech | Status |
|-------|------|--------|
| Log ingestion | **Go** — `cmd/log_slicer/main.go` | ✅ Built |
| Ranking & elimination | **Python** — `triage_engine.py` | ✅ Built (rules, no LLM) |
| External evidence | **JSON fixtures** — `mock_internet/` | ✅ Demo data (reproducible) |
| Git context | **subprocess git** or `git_log_fixture.json` | ✅ Built |
| UI | **React + Vite + Framer Motion** | ✅ Built (cinematic replay) |
| CI | **GitHub Actions** — log slicer test | ✅ Built |
| RAG retrieval | BM25 / embeddings / hybrid | 🔜 Roadmap (RAG course) |
| LLM synthesis | **Gemini** over ranked JSON | 🔜 Roadmap (RAG course) |
| Failure-triggered CI pipeline | Actions on `workflow_failure` | 🔜 Roadmap (Actions course) |

**Critical honesty:** The MVP is **deterministic and explainable**. Every ranking decision traces back to visible evidence — traceback overlap, file type, temporal proximity, dependency chain. No hallucinated leads.

---

## Roadmap (how three course projects compose Clique)

Your coursework maps cleanly onto Clique layers. This is the integration story judges should hear.

### 1. Go CLI course → Ingestion & live evidence fetch

**Skills:** REPL, HTTP clients, in-memory cache, CLI ergonomics  
**Already in Clique:** `log_slicer` — line parser, JSON output, single binary  
**Next (Go CLI patterns):**

| Hoopla / Pokedex pattern | Clique application |
|--------------------------|-------------------|
| HTTP to external API | Fetch PyPI release JSON, GitHub issue search |
| In-memory cache | Cache release notes & issue bodies per investigation |
| CLI commands | `clique ingest --log build.log`, `clique triage` |

The log slicer is **Chapter 1–3 of your Go path applied to CI logs**, not Pokémon.

---

### 2. RAG course (Hoopla) → Retrieval & synthesis layer

**Skills:** preprocessing, TF-IDF, BM25, embeddings, chunking, hybrid search, reranking, Gemini augmented generation  
**Already in Clique:** Python ranks with **rule-based** traceback overlap + temporal proximity (prototype of retrieval logic)  
**Next (Hoopla pipeline applied to incident evidence):**

```text
Failure traceback + service name
      ↓  Query expansion (LLM — optional)
      ↓  Hybrid retrieval
           • BM25 over release notes + changelogs + issue titles  (keyword)
           • Embeddings over issue bodies + release paragraphs     (semantic)
      ↓  Rerank top-k chunks
      ↓  Feed ranked chunks + workspace JSON → Gemini
      ↓  Investigation summary with citations
```

| Hoopla chapter | Clique evidence source |
|----------------|---------------------|
| BM25 / keyword | GitHub issue titles, commit messages, changelog headings |
| Semantic search | Release note paragraphs, long issue threads |
| Chunking | Split release notes & migration guides |
| Hybrid + RRF | Combine lexical traceback tokens + semantic “proxy removal” |
| Augmented generation | Gemini explains **already-ranked** leads (does not pick them) |
| Evaluation | Precision@k on fixture investigations |

**Key pitch line:** *RAG is not the product. RAG is how we scale evidence retrieval beyond fixtures.*

Replace `mock_internet/external_evidence.json` with indexed corpora over time; keep the same `investigation_workspace.json` contract so the React replay unchanged.

---

### 3. GitHub Actions course (sidpalas capstone) → Trigger & delivery

**Skills:** matrix tests, path filters, artifacts, build/push, workflow composition, Release Please  
**Already in Clique:** `.github/workflows/log-slicer.yml` — build & verify Go parser on push  
**Next (capstone patterns applied):**

```yaml
# Target: on failure, produce investigation artifact
on:
  workflow_run:
    workflows: ["Test"]
    types: [completed]

jobs:
  triage:
    if: ${{ github.event.workflow_run.conclusion == 'failure' }}
    steps:
      - uses: actions/checkout@v4
      - run: go build -o log_slicer && ./log_slicer
      - run: python3 triage_engine.py
      - uses: actions/upload-artifact@v4
        with:
          name: investigation-workspace
          path: capstone/services/clique-triage/data/investigation_workspace.json
```

| Capstone workflow | Clique use |
|-------------------|-----------|
| **Test** (`test.yaml`, matrix + path filters) | Run triage only when relevant services change |
| **Build/push** | Containerize triage engine as reusable action |
| **Artifacts** | Persist workspace JSON from failed runs |
| **GitOps update** | Optional: post investigation link to PR comment |
| **Release Please** | Version the triage CLI independently |
| **OTel / timing** | Measure triage duration in CI |

**Key pitch line:** *Actions delivers the investigation artifact; Clique UI replays it.*

You do **not** need Namespace runners or a full microservices capstone deploy to demo Clique — but showing you know **workflow_run + artifacts** proves production thinking.

---

# Evidence model (internal taxonomy — not UI tiles)

Four pillars classify evidence **in the engine**. The UI shows **one replay step at a time**.

| Pillar | Sources | Example in demo |
|--------|---------|-----------------|
| **Build** | CI logs, tracebacks | `TypeError: … 'proxies'` |
| **Repository** | git commits, file paths | `payment_gateway.py`, discarded `.css` / `.md` |
| **Dependency** | manifests, releases, graph | `vendor_sdk v8.1.4` |
| **Community** | issues, discussions | GitHub Issue #482 |

---

# Demo scenario (memorize this)

## Strongest slide (lead with this)

Not architecture. Not the tech stack. **The elimination panel:**

```text
Evidence examined: 12

Discarded:
✗ checkout.css
✗ README.md
✗ express release

Deprioritized:
− payment_gateway.py

Ranked:
✓ vendor_sdk release
✓ Issue #482
✓ Issue #483
```

A judge immediately gets: *“The system isn’t magically finding the answer. It’s narrowing the search space.”*  
That works for non-engineers too.

---

**Failure:**

```text
TypeError: Client.__init__() got unexpected keyword argument 'proxies'
```

**The story judges should remember — not “it found the answer,” but “it ruled out the noise”:**

```text
Evidence examined: 12

Discarded:
✗ checkout.css          (styling-only commit)
✗ README.md             (documentation-only)
✗ express 4.21.0        (not in dependency chain)

Deprioritized:
− payment_gateway.py    (stable across 14 builds)

Ranked:
✓ vendor_sdk v8.1.4 release
✓ Issue #482
✓ Issue #483 (similar report)

→ Most likely investigation lead:
  vendor_sdk v8.1.4 release

  Supporting evidence:
  • Issue #482
  • Issue #483
  • Timing correlation
```

**After “Investigate” — replay beats:**

1. Parsing build logs → exception extracted (red pulse)
2. Dependency chain → `vendor_sdk → httpx → client.py`
3. Ecosystem signals → release notes, issue #482, community match
4. **Elimination (hero moment)** — sidebar fills with discarded items; ranked list stays visible
5. Connections → Community Issue #482 glows
6. **Most likely investigation lead** → `vendor_sdk v8.1.4 release` + supporting evidence bullets
7. Evidence strength → match signal bars
8. Timeline → Release → Issue → Build Failed → Investigation Generated

**60-second version:** Trigger → parsing → **elimination sidebar filling up** → constellation glow → investigation lead. Say out loud: *“Here’s where I’d spend the next 15 minutes — not ‘we found root cause.’”*

---

## “Isn’t this planted evidence?” (judge attack — prepare for this)

Yes, the demo uses **fixtures** for reproducibility. Acknowledge it directly.

Then pivot immediately:

> “The product value isn’t magic retrieval. It’s **structured elimination**. In a real run, Clique examines git commits, lockfile diffs, release feeds, and issue search results — and discards the majority before ranking what’s left.”

The elimination panel is the antidote to “of course it found it.” Show **12 examined → 3 discarded → 1 deprioritized → 3 ranked → 1 lead**.

---

# Run the demo

```bash
cd capstone/services/clique-triage
bash run-dev.sh
# → http://localhost:5173
```

Requires: Python 3, Go (optional fallback to fixture JSON), Node 20 in WSL.

---

# How often does this happen? (the judge killer question)

Judges may not ask “does the tech work?” — they ask **“how many failures actually need this workflow?”**

**Wrong answer:** “Every build failure.”  
That’s false. Most failures are:

```text
Syntax error
Missing env variable
Failed unit test
Local bug Cursor can fix in-repo
```

**Right answer:**

> Clique targets the **expensive minority** of failures where engineers must **leave the repository** and gather **external evidence** before forming a hypothesis.

Signals that put a failure in that bucket:

| Signal | Example |
|--------|---------|
| Clean PR breaks with no obvious local cause | Green main → red on docs-only adjacent change |
| Traceback points at a **dependency**, not app code | `site-packages/vendor_sdk/client.py` |
| Timeline mismatch | Release or issue predates the failure by hours, not the commit that touched app code |
| Multi-source hunt | Maintainer A: logs **plus** Slack, Discord, SO, GitHub Issues/Releases |

Maintainer B (full-stack): external breaks are **rare** — backward compatibility is common.  
Maintainer A (CNCF): upstream Python/K8s deps can break CI **more often**.

Clique is not for every red build. It’s for the ones where investigation time dominates debugging time.

---

# Judge Q&A cheat sheet

| Question | Answer |
|----------|--------|
| Did you talk to real users? | Yes — **Maintainer A** (CNCF/kuberef, DevOps/Python) and **Maintainer B** (full-stack production deployer). See table above. Anonymous until we have naming permission. |
| **How often does this happen?** | **Not every failure.** Most are syntax errors, missing env vars, or failed unit tests — Cursor handles those. Clique targets the **expensive minority**: clean PR breaks, traceback + timeline mismatch, multi-source hunts where engineers must leave the repo and gather external evidence before forming a hypothesis. Maintainer B said external breaks are rare; Maintainer A sees them more in fast-moving deps. |
| Why “Investigation Triage” not “AI-Assisted”? | MVP is deterministic. No Gemini in the demo. AI summarizes **already-ranked** evidence on the roadmap. |
| Where’s the AI? | MVP ranks deterministically. Gemini summarizes ranked evidence next (RAG course). |
| Where’s RAG? | Roadmap replaces fixtures with BM25 + embedding retrieval (Hoopla pipeline). |
| Why not Dependabot? | They notify updates; we investigate a **specific failure**. |
| Why not Cursor / Copilot / Claude with the log pasted? | Before you ask Cursor for a fix, you need to know what evidence matters. **Cursor helps solve a problem. Clique helps define the problem.** |
| Why ranking? I'll search GitHub myself. | Finding info is easy. **Deciding what deserves attention** when there are dozens of signals is hard. Point to: 12 examined → 3 ranked → 1 lead. |
| Is this the root cause? | No — **most likely investigation lead** + supporting evidence. We rank; humans investigate and decide. |
| Isn’t the demo rigged? | Fixtures for reproducibility. Value = elimination workflow, not oracle retrieval. See section above. |
| Is data live? | Demo uses fixtures for reproducibility; Go HTTP + RAG index is the scale path. |
| Where’s the backend? | Go + Python CLI pipeline producing JSON — no server required for MVP. |

---

# Mistakes we already corrected

1. ~~“We detect dependency updates”~~ → Weak; Dependabot exists  
2. ~~“We find root cause”~~ → We rank and eliminate  
3. ~~“Cursor can’t do this”~~ → Cursor wins on local bugs; we win on investigation  
4. ~~Leading with RAG/BM25/agents~~ → Lead with **workflow and elimination replay**  
5. ~~Dashboard with all cards at once~~ → **Arc-style one focus per screen**  
6. ~~Claiming AI in README without code~~ → MVP vs roadmap split documented  
7. ~~“AI-Assisted” branding~~ → **Investigation Triage Workspace**; AI is roadmap  
8. ~~“Leading hypothesis” / root cause framing~~ → **Most likely investigation lead** + supporting evidence  
9. ~~“Same inputs → same workspace”~~ → **Deterministic and explainable** — every rank traces to visible evidence  
10. ~~Overselling two interviews~~ → **Supporting conversations**, not “industry validation”  

---

# Technology stack (final)

| Concern | MVP | Roadmap (your courses) |
|---------|-----|------------------------|
| Log parsing | Go stdlib CLI | + cache, live HTTP fetch (Go CLI course) |
| Evidence ranking | Python heuristics | + hybrid RAG retrieval (Hoopla) |
| Narrative / summary | React replay copy | + Gemini over workspace JSON (RAG ch. 10) |
| Trigger | Manual `run-dev.sh` | + Actions on failure + artifacts (Actions capstone) |
| UI | React, Vite, Framer Motion | Same contract; richer replay |

---

# Closing line

**Clique reduces investigation time before debugging time.**  
It gathers the context you would paste into ChatGPT — eliminates what doesn’t matter — and tells you **where to spend the next 15 minutes** before you open Cursor.

---

*Repository: [ashmitha247/clique-triage](https://github.com/ashmitha247/clique-triage)*  
*Course foundations: DevOps Directive — GitHub Actions, RAG (Hoopla), Go CLI*

---

## Next plan (hackathon execution)

Practical ordered checklist before/during submission:

1. **Repo credibility** — commit + push frontend, PITCH.md, run-dev.sh (if not done)
2. **Demo path** — run-dev.sh → localhost:5173, NOT Streamlit
3. **60-second pitch script** — problem (30s) → click Investigate → **elimination sidebar** → **investigation lead** (not hypothesis)
4. **Judge slides order** — Problem → **Elimination panel (strongest slide)** → Maintainer A/B (supporting, not proof) → How often? → MVP demo → Roadmap → Cursor handoff
5. **Optional before judging** — ask maintainers permission to name them later; wire workflow_run Actions artifact (roadmap slide only if not built)
6. **What NOT to claim** — RAG/Gemini live in demo; say roadmap
