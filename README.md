# Clique

> Reduce the search space before debugging.

Clique is an investigation triage tool for CI failures. Instead of trying to automatically fix a broken build, Clique gathers evidence from logs, git history, releases, and community reports, then produces an **Investigation Packet** that helps developers decide where to start investigating.

| | |
|---|---|
| **Live demo** | https://clique-demo-six.vercel.app/ |
| **Product overview** | [docs/PRODUCT_OVERVIEW.md](docs/PRODUCT_OVERVIEW.md) |
| **Pitch & Q&A** | [PITCH.md](PITCH.md) |
| **Run locally** | `cd capstone/services/clique-triage && bash run-dev.sh` |

---

## Live demo

**https://clique-demo-six.vercel.app/**

| URL | Purpose |
|-----|---------|
| `/` | Product landing → **Start investigation** → 4-step walkthrough |
| `/?demo=1` | Full presentation (prelude slides + demo story + walkthrough) |

---

## Problem

Many CI failures are straightforward:

* Syntax errors
* Missing environment variables
* Broken unit tests

Modern coding assistants can usually help with these.

Clique targets a different category of failure:

* A clean PR suddenly breaks CI
* The traceback points to a dependency rather than your code
* An upstream package may have changed
* Developers must leave the repository and investigate across CI logs, git history, release notes, GitHub issues, and community discussions

Research such as TOSEM 2023, FSE 2024, and Breaking-Good 2024 shows that identifying a failure is often easier than identifying its cause. See [docs/PRODUCT_OVERVIEW.md](docs/PRODUCT_OVERVIEW.md) for citations and maintainer validation.

---

## What Clique does

Clique assembles an **Investigation Packet** containing:

* Ranked investigation leads
* Supporting evidence
* Similar reports
* Timeline correlations
* Eliminated candidates and reasons

Clique does **not** claim root cause. Its goal is to reduce the search space and provide a structured starting point for investigation.

The React UI replays that packet as a guided walkthrough: **Gather → Eliminate → Rank → Investigation lead**. Step 3 (elimination) is the strongest proof point — what was examined, ruled out, and why.

---

## How it works

```text
CI Failure
    ↓
Go Log Extraction
    ↓
Error Snapshot (isolated_error.json)
    ↓
Hybrid Retrieval + Rule-Based Triage
    ↓
Rank & Eliminate
    ↓
Investigation Packet (investigation_workspace.json)
    ↓
React Investigation UI
```

| Stage | Role |
|-------|------|
| Go log slicer | Parse CI log → exception + stack trace |
| Python triage engine | Git analysis, release correlation, hybrid retrieval, elimination |
| Hybrid RAG | BM25 + TF-IDF + Reciprocal Rank Fusion over `mock_internet/rag_corpus.json` |
| React UI | Landing + 4-step walkthrough; elimination panel on step 3 |

**No LLM calls in the MVP.** Ranking and retrieval are deterministic and auditable. Gemini-powered packet summaries are on the roadmap.

External evidence in the demo uses fixtures (`mock_internet/`) for reproducibility. Git history uses real `git log` when available, otherwise `data/git_log_fixture.json`.

---

## Repository structure

```text
.
├── README.md                          ← start here
├── PITCH.md                           ← pitch & Q&A
├── LICENSE
├── docs/                              ← product documentation
│   ├── PRODUCT_OVERVIEW.md
│   └── MAINTAINER_DEMO.md
├── .github/workflows/log-slicer.yml   ← CI pipeline smoke test
└── capstone/services/clique-triage/   ← application source
    ├── cmd/log_slicer/                Go log parser
    ├── triage_engine.py               Ranking and elimination engine
    ├── rag/                           Hybrid retrieval components
    ├── mock_internet/                 Demo evidence + RAG corpus
    ├── data/                          Logs and generated JSON
    ├── frontend/                      React demo UI
    ├── run-dev.sh                     Local demo runner
    └── docs/                          Generated PDF (local, gitignored)
```

---

## Running locally

**Requirements:** Python 3, Go, Node.js 18+

```bash
git clone https://github.com/ashmitha247/clique-triage.git
cd clique-triage/capstone/services/clique-triage
bash run-dev.sh
```

| URL | Purpose |
|-----|---------|
| http://localhost:5173/ | Same as live demo (landing + 4 steps) |
| http://localhost:5173/?demo=1 | Full presentation + walkthrough |
| http://localhost:5173/?demo=1&pdf=1 | PDF export preview |

**Generate PDF deck (local):**

```bash
cd capstone/services/clique-triage/frontend
npm run pdf:preview
```

Output: `capstone/services/clique-triage/docs/Clique-Presentation.pdf` (gitignored — regenerate locally).

---

## Current status

### Built today

* Go log extraction pipeline
* Investigation packet generation
* Hybrid retrieval (BM25 + TF-IDF + Reciprocal Rank Fusion)
* Rule-based ranking and elimination
* React investigation walkthrough
* GitHub Actions validation workflow

### Roadmap

* CI-triggered packet generation on repository failures
* GitHub Action delivery workflow
* Live GitHub Issues integration
* Live release-note retrieval
* Dependency graph analysis
* Gemini-powered packet summaries
* Open in Cursor workflow

---

## Why not just use ChatGPT?

Clique focuses on evidence assembly before remediation.

An LLM can help fix code once the relevant evidence is known. Clique helps determine **which evidence deserves attention in the first place**.

Before asking an AI assistant for a fix, developers often need to understand where the failure may have originated. Clique automates that investigation step.

**vs Dependabot:** Dependabot notifies about updates. Clique asks: *could an external change explain this specific failure?*

**vs Copilot/Cursor:** IDE tools excel at local code. Clique gathers external evidence so your IDE gets the right context.

---

## Demo notes

The current demo uses saved fixtures for reproducibility. The investigation engine is real. Live ecosystem integrations are part of the roadmap and will use the same Investigation Packet format demonstrated today.

> The Vercel project is not linked to this GitHub repo. Pushing here does not redeploy the live site.

---

## Tech stack

* Go
* Python
* React + Vite
* GitHub Actions
* BM25, TF-IDF, Reciprocal Rank Fusion (RRF)

---

## License

[MIT](LICENSE) — Copyright (c) 2026 ashmitha247
