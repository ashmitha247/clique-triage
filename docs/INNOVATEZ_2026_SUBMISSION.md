# Clique — InnovateZ 2026 Next Round Submission

**Team project:** Clique (Investigation Triage Workspace)  
**Document version:** June 2026  
**Format:** Single PDF source — export this file to PDF for Google Form upload

---

## Executive summary (read this first)

**What Clique does in one line:**  
Clique **reduces the search space** before debugging — it gathers evidence from multiple sources, eliminates noise, ranks what survives, and shows the developer **where to spend the next 15 minutes**.

**Who needs it (not every failure):**  
Clique targets **investigation-heavy failures** — cases where engineers must **leave the repository** and gather evidence from logs, git history, release notes, and community discussions **before** they can form a useful starting point. Syntax errors, missing env vars, and local unit-test failures are out of scope; Cursor handles those.

**What works today:** Pipeline — **Input** (CI log + git + RAG corpus) → **Processing** (parse, **hybrid RAG retrieve**, eliminate, rank) → **Output** (elimination replay + investigation lead). **No Gemini in demo** — RAG retrieval is live; LLM synthesis is next.

**Where AI fits (honest):** Ranking and elimination are built and auditable now. **Gemini + RAG** sit on the roadmap as the synthesis and retrieval layers over the same JSON contract — see Section 2b.

**Strongest proof point for judges:** Screenshot the **elimination panel** (`Evidence examined: 12`, discarded list filling, ranked survivors) — not the architecture diagram.

---

## Submission links (also enter in Google Form)

| Item | Link / note |
|------|-------------|
| **GitHub repository (required)** | https://github.com/ashmitha247/clique-triage |
| **MVP / demo (preferred)** | Deploy: `cd capstone/services/clique-triage/frontend && npm run build && npx vercel dist --prod`. Local: `bash run-dev.sh` → http://localhost:5173 — **Start investigation**, click **Next** through 4 guided steps. |
| **Primary demo path** | Guided walkthrough @ port **5173** (`run-dev.sh`). Step 3 elimination panel = hero screenshot. Legacy Streamlit on 8501 is **not** the demo. |

---

# 1. Problem and User Flow

## Problem (specific, not generic)

**Weak framing:** “Helps developers investigate build failures.”  
**Strong framing:**

> Clique targets **investigation-heavy failures** where engineers must **leave the repository** and gather evidence from **multiple external sources** before they know what to investigate first.

Most CI failures do **not** need this workflow:

```text
Syntax error          → fix in IDE
Missing env variable  → fix config
Failed unit test      → fix code
```

Clique is for the **expensive minority**:

```text
Clean PR breaks with no obvious local cause
Traceback points at a dependency, not app code
Timeline mismatch (release/issue hours before failure)
Engineer must hunt across logs + git + releases + GitHub issues
```

Tools like Dependabot answer *“What updated?”* They do not answer *“Could that update explain **this** failure?”*

## User journey — Input → Processing → Output

| Stage | What happens |
|-------|----------------|
| **Input** | CI build log + recent git commits + external evidence (releases, issues) |
| **Processing** | Parse traceback → match issues → score releases by time window → eliminate non-functional commits → rank survivors |
| **Output** | Investigation replay: elimination sidebar, ranked leads, **most likely investigation lead** + supporting evidence |

Clique does **not** claim root cause. It claims: **we reduced the search space.**

```text
1. Build fails           → raw CI log
2. Engineer clicks       → “Investigate”
3. Processing replays    → parsing → dependency → ecosystem → elimination
4. Output                → 12 examined, most discarded, 3 ranked, 1 lead
5. Human handoff         → developer investigates the lead (Cursor/IDE)
```

# 2. Under-the-Hood Design

## 2a. MVP today — Input → Processing → Output

```text
INPUT
  failed_build.log              (CI traceback)
  git log / git_log_fixture     (recent commits)
  external_evidence.json        (releases + issues — fixture in demo)

PROCESSING
  Parse traceback               → which files appear in the stack?
  Hybrid RAG retrieval          → BM25 + TF-IDF + RRF over rag_corpus.json
  Temporal window (6 hours)     → filter release leads by failure proximity
  File-type elimination         → discard .css / .md / image-only commits
  Strength sort                 → high → medium → low

OUTPUT
  investigation_workspace.json    (ranked leads + discarded items)
  React replay                  → elimination sidebar + investigation lead
```

**No LLM in the live demo.** Every ranking decision maps to a visible rule above. This satisfies InnovateZ’s request for concrete execution evidence.

---

## 2b. AI hackathon — where Go CLI, RAG, and GitHub Actions fit

This project composes three DevOps Directive courses into one architecture. **Be honest with judges about what is built vs. planned.**

| Course / layer | Built in MVP (demo today) | Roadmap (next sprint) | Role in Clique |
|----------------|---------------------------|------------------------|----------------|
| **Go CLI** | ✅ `log_slicer` — Go binary parses CI log → JSON. CI workflow builds it on every push. | HTTP client + in-memory cache to fetch PyPI/GitHub live (Pokedex/CLI patterns) | **Ingestion** — turn raw logs and external APIs into structured evidence |
| **RAG (Hoopla)** | ✅ **Built** — `rag/retriever.py` hybrid BM25 + TF-IDF + RRF over `mock_internet/rag_corpus.json`. Outputs auditable `rag_retrieval` block in workspace JSON. UI shows RAG hits in ecosystem phase. | Live PyPI/GitHub fetch into corpus; embedding layer; **Gemini summarizes ranked JSON** | **Retrieval** — find relevant release notes and issues from noisy corpora |
| **GitHub Actions** | ✅ `.github/workflows/log-slicer.yml` — build & verify Go parser on push/PR | `workflow_run` on test failure → run triage → upload `investigation_workspace.json` artifact | **Trigger + delivery** — investigation runs when CI fails |

### Why the MVP is deterministic first (AI hackathon strategy)

Judges asked for **how it works**, not buzzwords. Clique separates:

```text
Layer 1 (BUILT):  Evidence assembly + elimination + ranking  → auditable JSON
Layer 2 (ROADMAP): RAG retrieval replaces fixtures            → live corpora
Layer 3 (ROADMAP): Gemini narrates the ranked workspace        → human-readable summary
```

**RAG is not missing from the design — it replaces the fixture layer.** The `investigation_workspace.json` schema is the stable contract so the React UI unchanged when RAG goes live.

**Gemini is not in the demo path** because the MVP proves the workflow (elimination + ranking) without hallucination risk. Gemini’s job is to **explain already-ranked evidence**, not invent leads.

### If a judge asks: “Where’s the AI?”

> “The AI layer summarizes and retrieves — but only **after** deterministic ranking produces an auditable workspace. We built the ranking and elimination core first so every lead is traceable. RAG + Gemini plug into the same JSON contract; the demo uses fixtures where RAG will live.”

---

## 2c. Step-by-step pipeline (technical detail)

```text
INPUT:  data/failed_build.log  (raw CI log, ~15 lines in demo)

STEP 1 — Go log slicer (cmd/log_slicer/main.go)
  • Scans for "Traceback (most recent call last):"
  • Collects lines until TypeError/ValueError/KeyError line
  • Writes data/isolated_error.json:
      { service, exception, traceback }

STEP 2 — Python triage engine (triage_engine.py)
  • Reads isolated_error.json
  • Reads mock_internet/external_evidence.json (releases + issues)
  • Loads git history: subprocess `git log` OR data/git_log_fixture.json
  • Produces data/investigation_workspace.json:
      { priority_leads[], discarded[], build_failure_timestamp, ... }

STEP 3 — Frontend (React + Vite)
  • run-dev.sh copies workspace JSON → frontend/public/
  • transformWorkspace.ts enriches UI model (elimination counts, investigation lead)
  • App.tsx state machine replays 8 phases (one focus screen at a time)

OUTPUT: Investigation replay in browser — elimination sidebar, ranked leads,
        most likely investigation lead + supporting evidence bullets
```

## Step 1: Log ingestion (Go)

**File:** `capstone/services/clique-triage/cmd/log_slicer/main.go`

| Behavior | Detail |
|----------|--------|
| Input | `data/failed_build.log` |
| Trigger | Line contains `Traceback (most recent call last):` |
| Capture | All traceback lines until exception type line |
| Exception extract | First line matching `TypeError:`, `ValueError:`, or `KeyError:` |
| Service label | Hard-coded `payment_gateway` for demo scenario |
| Output | `data/isolated_error.json` |

**No ML, no API calls** — stdlib file I/O and string matching only.

## Step 2: Triage engine (Python) — scoring and elimination

**File:** `capstone/services/clique-triage/triage_engine.py`

### 2a. Traceback source leads

- Regex: `File "([^"]+)", line (\d+)` over traceback text  
- Each unique filename → `source_file` lead, strength **high**  
- Reason: `"present in isolated exception traceback"`

### 2b. Community issue scoring

- Input: `external_evidence.community_issues[]`  
- Match rule: `issue.traceback_contains` substring present in `(exception + traceback)` (case-insensitive)  
- Match → `community_issue` lead, strength **high**, reason `"traceback overlap"`  
- Demo: Issue #482 matches `TypeError: Client.__init__() got unexpected keyword argument 'proxies'`

### 2c. Package release scoring (temporal proximity)

- Constant: `TEMPORAL_PROXIMITY_HOURS = 6`  
- Parse build failure timestamp from log `[CRITICAL] YYYY-MM-DDTHH:MM:SSZ`  
- Include release if: `failure_time - 6h ≤ release_time ≤ failure_time`  
- Match → `package_release` lead, strength **high**, reason `"temporal proximity"`  
- Also stores `hours_before_failure` for timeline UI  
- Demo: `vendor_sdk 8.1.4` at 09:06, failure at 11:45 → included. `express 4.19.2` at 14:22 previous day → excluded by window

### 2d. Git commit classification (elimination logic)

- Source: last 5 commits via `git log --pretty=format:... --name-only`, or fixture if demo files missing  
- **Eliminated extensions:** `.css`, `.md`, image formats (`.png`, `.jpg`, …)  
- Commits touching only eliminated files → `discarded[]` with reason e.g. `"non-functional asset (.css)"`  
- Commits with functional files → `repository_commit` lead, strength **medium**  
- Demo discards: `checkout.css` commit, `README.md` commit

### 2e. Merge and rank

- Dedupe by type-specific keys (file name, issue id, package+version, commit hash)  
- Sort by strength: `high` → `medium` → `low`  
- Write single `investigation_workspace.json`

### 2f. Validation / guardrails

- Missing required input files → exit code 1 with stderr message  
- Git subprocess failure → fallback to fixture (logged in `git_source` field)  
- No hallucinated leads — only structures present in inputs appear in output

## Step 3: Frontend post-processing

**File:** `frontend/src/lib/transformWorkspace.ts`

| Transform | Purpose |
|-----------|---------|
| `buildEvidenceSummary()` | Computes “Evidence examined: N” for elimination sidebar |
| Synthetic elimination | UI adds `express 4.21.0 release` as ruled-out decoy (not in dependency chain) |
| Deprioritization | `payment_gateway.py` marked deprioritized (“stable across 14 builds”) |
| `buildInvestigationLead()` | Primary lead + supporting bullets for verdict screen |
| Phase navigation | App.tsx — guided 4-step walkthrough with Next/Back (no auto-advance) |

## Models / APIs used (MVP)

| Component | Technology | API calls |
|-----------|------------|-----------|
| Log slicer | Go 1.21+ stdlib | None |
| Triage engine | Python 3.10+ stdlib | None |
| Frontend | React 18, Vite, Framer Motion | None (fetches static JSON) |
| CI | GitHub Actions | Builds/tests Go slicer only |

**Roadmap (not in MVP):** Gemini summarization over ranked JSON; hybrid RAG (BM25 + embeddings) over release notes and issues; GitHub Actions `workflow_run` trigger on CI failure.

---

# 3. Data Sources

## Live / real sources (when available)

| Source | How used | MVP status |
|--------|----------|------------|
| **Local git repository** | `git log -n 5` for recent commits and changed files | Used if fixture scenario files detected; else fixture |
| **CI build log file** | `data/failed_build.log` — realistic pipeline log with traceback | ✅ Demo input |
| **Filesystem JSON I/O** | All pipeline stages read/write local JSON | ✅ |

## Mock / fixture sources (demo reproducibility)

| File | Contents | Influences output |
|------|----------|-------------------|
| `data/failed_build.log` | Simulated CI log with `[CRITICAL]` timestamp and Python traceback | Exception text, failure time, service name |
| `data/isolated_error.json` | Go slicer output (or pre-seeded if Go unavailable) | Traceback parsing, community issue matching |
| `mock_internet/external_evidence.json` | `public_releases[]`, `community_issues[]` | Release temporal scoring; issue traceback overlap |
| `data/git_log_fixture.json` | 5 commits including CSS, MD, and functional changes | `discarded[]` vs `repository_commit` leads |

### external_evidence.json structure (excerpt)

```json
{
  "public_releases": [
    { "package": "vendor_sdk", "version": "8.1.4", "timestamp": "2026-06-21T09:06:00Z", "changes": "..." },
    { "package": "express", "version": "4.19.2", "timestamp": "2026-06-20T14:22:00Z", "changes": "..." }
  ],
  "community_issues": [
    { "issue_id": "482", "traceback_contains": "TypeError: Client.__init__() got unexpected keyword argument 'proxies'", ... },
    { "issue_id": "483", "traceback_contains": "proxies parameter deprecation path", ... }
  ]
}
```

**Note:** Issue #483 does not match the demo exception verbatim — it appears in UI as “similar report” via frontend enrichment, not Python scoring. Issue #482 is the scored match.

## External APIs (roadmap — not called in MVP)

| Planned source | Planned use |
|----------------|-------------|
| PyPI JSON API | Live package release metadata |
| GitHub REST API | Issue search, release notes |
| Gemini API | Summarize ranked workspace JSON (post-ranking only) |

## User research (supporting, not “market validation”)

Two informal maintainer conversations (CNCF ecosystem contributor; production deploy engineer) informed the problem framing. Names withheld pending permission. See `PITCH.md` for quotes.

---

# 4. Value Beyond a Generic LLM

## The question judges will ask

> “Why can’t I just paste the error into ChatGPT?”

**Lead with this (no AI buzzwords):**

> Because the challenge isn’t generating an explanation. The challenge is **gathering and prioritizing evidence** scattered across logs, repository history, release notes, and community discussions. Clique assembles that evidence first, then hands a **ranked investigation workspace** to the developer.

Then point at the elimination panel: **12 examined → 3 ranked → 1 lead.**

## Supporting points

1. **The log is not the full input.** Clique correlates the traceback with git commit file types, lockfile-adjacent commits, release timestamps, and community issue text — from **multiple structured sources**, not one paste buffer.

2. **Elimination is domain-specific.** Commits touching `.css` / `.md` are automatically discarded as non-functional. Releases outside a 6-hour pre-failure window are excluded. These rules encode **incident-triage heuristics**, not generic summarization.

3. **Ranking is explicit and traceable.** Each lead carries `type`, `strength`, and `reason` fields (e.g. `"traceback overlap"`, `"temporal proximity"`, `"non-functional asset (.css)"`). An LLM chat has no built-in schema for auditable elimination.

4. **Workflow automation.** `run-dev.sh` runs Go → Python → JSON sync → replay without manual tab-gathering. The output is a **decision-support artifact** (`investigation_workspace.json`), not prose.

5. **Cursor/Claude solve different problems.** IDE AI helps fix code once you know what to fix. Clique helps decide **what evidence deserves attention** when dozens of signals exist.

**One-line defense:**

> Before I can ask Cursor for a fix, I need to know what evidence matters. Cursor helps solve a problem. Clique helps define the problem.

## What Gemini / RAG add (roadmap — not live in demo)

After deterministic ranking produces `investigation_workspace.json`:

- **RAG** retrieves release notes and issue threads (replacing `mock_internet/`)
- **Gemini** writes a narrative summary **over the ranked JSON only** — it does not choose leads

The MVP proves Layer 1. Layers 2–3 are the AI hackathon extension path with a fixed contract.

---

# 5. Architecture and Technical Design

## System diagram

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                         CLIQUE MVP ARCHITECTURE                          │
└─────────────────────────────────────────────────────────────────────────┘

  ┌──────────────┐     ┌─────────────────┐     ┌──────────────────────────┐
  │ failed_build │     │  Go log_slicer  │     │   isolated_error.json    │
  │    .log      │────▶│  (cmd/main.go)  │────▶│  service, exception,     │
  │  (CI input)  │     │  traceback parse│     │  traceback               │
  └──────────────┘     └─────────────────┘     └────────────┬─────────────┘
                                                              │
  ┌──────────────────────┐  ┌────────────────────┐           │
  │ external_evidence    │  │ git log (live) OR  │           │
  │ .json (mock internet)│  │ git_log_fixture    │           │
  └──────────┬───────────┘  └─────────┬──────────┘           │
             │                        │                      │
             └────────────┬───────────┘                      │
                          ▼                                  ▼
                 ┌─────────────────────────────────────────────────┐
                 │           Python triage_engine.py               │
                 │  • traceback file extraction                    │
                 │  • community issue substring match              │
                 │  • release temporal window (6h)                 │
                 │  • git commit elimination (.css/.md/images)     │
                 │  • merge + strength sort                        │
                 └────────────────────┬────────────────────────────┘
                                      │
                                      ▼
                 ┌─────────────────────────────────────────────────┐
                 │      investigation_workspace.json               │
                 │  priority_leads[] | discarded[] | metadata      │
                 └────────────────────┬────────────────────────────┘
                                      │ cp (run-dev.sh)
                                      ▼
                 ┌─────────────────────────────────────────────────┐
                 │     React SPA (Vite, port 5173)                 │
                 │  Guided UI: landing + 4 steps + handoff          │
                 │  Elimination sidebar | Investigation lead       │
                 └─────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ROADMAP (dashed — not in MVP)                                           │
  │  GitHub Actions workflow_run → artifact upload                          │
  │  Go HTTP fetch (PyPI/GitHub) → replace mock_internet                    │
  │  RAG index (BM25 + embeddings) → retrieval layer                        │
  │  Gemini API → narrative summary over ranked JSON only                   │
  └─────────────────────────────────────────────────────────────────────────┘
```

## Component summary (brief)

| Layer | MVP status | Role |
|-------|------------|------|
| Ingestion | ✅ Go CLI | Log → structured JSON |
| Ranking | ✅ Python rules | Match, eliminate, rank |
| UI | ✅ Static replay | Input → output visualization |
| CI | ✅ Actions (build test) | Verify ingestion on push |
| RAG | ✅ Hybrid BM25 + TF-IDF + RRF | Retrieve from corpus |
| Gemini | 🔜 Roadmap | Summarize ranked JSON |
| Failure trigger | 🔜 Roadmap | `workflow_run` artifact |

*Cut tech-stack version numbers from the PDF if space is tight — keep Input → Processing → Output.*

## Repository layout

```text
capstone/services/clique-triage/
├── cmd/log_slicer/main.go       # Go ingestion
├── triage_engine.py             # Python ranking + elimination
├── data/                        # Input log, outputs, fixtures
├── mock_internet/               # Simulated external evidence
├── frontend/                    # React investigation replay
├── run-dev.sh                   # Primary entry: pipeline + dev server
├── .github/workflows/log-slicer.yml
└── docs/INNOVATEZ_2026_SUBMISSION.md  # This document
```

---

# 6. Demo Scenario and Limitations

## Demo scenario A (primary — dependency break)

### Input

**File:** `data/failed_build.log` (excerpt)

```text
[CRITICAL] 2026-06-21T11:45:34Z - Integration pipeline runner intercepted a fatal transaction validation crash.
[ERROR] Traceback (most recent call last):
  File ".../payment_gateway.py", line 42, in initialize_client
    self.client = VendorClient(..., proxies=self.config.get('proxy_routes'))
  File ".../vendor_sdk/client.py", line 114, in __init__
TypeError: Client.__init__() got unexpected keyword argument 'proxies'
```

### Processing (automated)

1. Go slicer → exception + full traceback JSON  
2. Python engine → 7 priority leads, 2 discarded commits  
3. Frontend → 12 evidence items examined (including UI decoys), 4 elimination animations, 3 ranked survivors  

### Output (useful because)

```text
Evidence examined: 12

Discarded:
  ✗ checkout.css
  ✗ README.md
  ✗ express 4.21.0 release

Deprioritized:
  − payment_gateway.py

Ranked:
  ✓ vendor_sdk v8.1.4 release
  ✓ Issue #482
  ✓ Issue #483 (similar report)

Most likely investigation lead:
  vendor_sdk v8.1.4 release

Supporting evidence:
  • Issue #482
  • Issue #483 (similar report)
  • Timing correlation
```

**Why useful:** Engineer skips manually ruling out styling/docs commits and unrelated releases; starts investigation at the dependency release that temporally aligns with the failure.

### Run commands

```bash
git clone https://github.com/ashmitha247/clique-triage.git
cd clique-triage/capstone/services/clique-triage
bash run-dev.sh
# Open http://localhost:5173 → click "Investigate"
```

## Demo scenario B (negative case — not Clique’s job)

**Input:** `NameError: user_id is not defined` in application code  
**Expected:** Cursor/IDE fixes directly; Clique adds little value  
**Talking point:** Clique targets investigation-heavy external failures, not local bugs

---

## Honest build status

| Feature | Status |
|---------|--------|
| Go log traceback extraction | ✅ Working |
| Python heuristic ranking + git elimination | ✅ Working |
| Mock external evidence (releases, issues) | ✅ Working (fixture) |
| React guided investigation walkthrough | ✅ Working |
| Elimination sidebar with examined count | ✅ Working |
| Investigation lead + supporting evidence screen | ✅ Working |
| GitHub Actions CI for Go slicer | ✅ Working |
| Live PyPI / GitHub API fetch | 🔜 Not built |
| RAG retrieval (BM25 / embeddings) | 🔜 Not built |
| Gemini / LLM summarization | 🔜 Not built |
| CI failure auto-trigger (`workflow_run`) | 🔜 Not built |
| Streamlit UI (`run.sh`, port 8501) | ⚠️ Legacy prototype — not submission demo |
| Production cloud deploy | ⚠️ Optional — static build works; live URL can be added via Vercel |

## Known limitations

- **Fixtures:** External evidence is mocked for reproducible demo; not live web fetch  
- **Single scenario:** Log slicer optimized for demo traceback format  
- **No authentication:** Local-only pipeline; no multi-tenant storage  
- **Frontend decoys:** `express 4.21.0` elimination and Issue #483 “similar report” are UI enrichment items — partially mocked for narrative clarity  
- **No LLM:** Submission MVP is intentionally non-AI for auditability  

---

# 7. MVP / Demo Evidence

## Submission priority (if deadline is tight)

1. **Repository matches documentation** — code pushed, `run-dev.sh` works  
2. **PDF exported** — this document, polished  
3. **Elimination screenshot** — hero image (`Evidence examined: 12`, discarded list)  
4. **Demo video or Vercel link** — 60-second walkthrough  
5. Architecture diagram  
6. Tech stack details — **cut first if pages are crowded**

## Option A — Live demo link (preferred)

Deploy the static frontend after building:

```bash
cd capstone/services/clique-triage
bash run-dev.sh          # generates fresh workspace JSON locally first
cd frontend && npm run build
# Deploy frontend/dist/ to Vercel, Netlify, or GitHub Pages
```

Pre-build workspace JSON is committed at `frontend/public/investigation_workspace.json` so a static deploy works without running Python on the host.

**Form field:** paste deployed URL (e.g. `https://clique-triage.vercel.app`)

## Option B — PDF screenshots (alternate)

If no live URL, attach screenshots of this flow in the PDF appendix:

| # | Screenshot | Shows |
|---|------------|-------|
| **1 (required)** | **Elimination phase** | **Sidebar: Evidence examined 12, Discarded filling, Ranked list** |
| 2 | Trigger screen | Failed build + “Investigate” button |
| 3 | Investigation lead screen | Most likely investigation lead + supporting evidence |
| 4 | Terminal | `run-dev.sh` pipeline completing |

*Capture after running `bash run-dev.sh` locally.*

---

# Submission checklist

- [x] Single PDF covering all sections (export this document)
- [x] GitHub repository link: https://github.com/ashmitha247/clique-triage
- [ ] MVP demo link (optional — deploy `frontend/dist` or include screenshots)
- [x] Under-the-hood explanation with specific scoring rules (not generic “we use AI”)
- [x] Data sources listed with mock vs live distinction
- [x] Value beyond LLM answered directly
- [x] Architecture diagram included
- [x] Demo scenario with input → processing → output
- [x] Limitations stated honestly (no LLM, fixtures, roadmap items)

---

**Contact / repo:** https://github.com/ashmitha247/clique-triage  
**Setup:** See `README.md` in repository root and `capstone/services/clique-triage/run-dev.sh`
