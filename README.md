# Clique

> Reduce the search space before debugging.

Clique is an investigation triage tool for CI failures. Instead of trying to automatically fix a broken build, Clique gathers evidence from logs, git history, releases, and community reports, then produces an **Investigation Packet** that helps developers decide where to start investigating.

| | |
|---|---|
| **Live demo** | https://clique-demo-six.vercel.app/ |
| **Run locally** | `cd capstone/services/clique-triage && bash run-dev.sh` |
| **Source** | `capstone/services/clique-triage/` (all application code lives here) |

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

Research such as TOSEM 2023, FSE 2024, and Breaking-Good 2024 shows that identifying a failure is often easier than identifying its cause.

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

### Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│              run-dev.sh  (entry orchestrator)                │
└────────────────────────────┬─────────────────────────────────┘
                             │
     ┌───────────────────────┼───────────────────────┐
     │                       │                       │
┌────▼─────────┐   ┌─────────▼──────────┐   ┌───────▼────────┐
│ Go Log       │   │ Python Triage        │   │ React SPA      │
│ Slicer       │   │ Engine               │   │ (Vite :5173)   │
│ cmd/log_     │   │ triage_engine.py     │   │ frontend/      │
│ slicer/      │   │                      │   │                │
└────┬─────────┘   │  ├─ git analysis     │   │  /  → 4 steps  │
     │             │  ├─ release match     │   │  /?demo=1 deck │
     │             │  └─ rag/retriever.py │   └───────▲────────┘
     │             └─────────┬────────────┘           │
     │                       │                        │
     └───────────┬───────────┘                        │
                 │ investigation_workspace.json        │
                 └─────────────────────────────────────┘
                      (synced to frontend/public/)
```


### Data flow

```text
data/failed_build.log
    │
    ▼  cmd/log_slicer/main.go
data/isolated_error.json          { service, exception, traceback }
    │
    ├── mock_internet/external_evidence.json  (releases, issues)
    ├── mock_internet/rag_corpus.json         (retrieval corpus)
    └── git log OR data/git_log_fixture.json
    │
    ▼  triage_engine.py
    │    HybridRetriever.search()       → rag hits
    │    git elimination rules          → discarded[]
    │    strength / temporal scoring    → priority_leads[]
    │
data/investigation_workspace.json   Investigation Packet
    │
    ▼  cp → frontend/public/investigation_workspace.json
    │
    ▼  transformWorkspace.ts → React components
    │    Gather → Eliminate → Rank → Investigation lead
    │
Browser @ localhost:5173
```

### Stage summary

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

The repo root is intentionally thin — **README, LICENSE, CI, and one service directory**. All product code is under `capstone/services/clique-triage/` (~110+ source files).

```text
clique-triage/                              ← repo root
├── README.md                               Project overview (this file)
├── LICENSE                                 MIT
├── .gitignore
├── .github/
│   └── workflows/
│       └── log-slicer.yml                  CI: build Go slicer, run pipeline, assert JSON output
│
└── capstone/services/clique-triage/        ← start here for source code
    ├── run-dev.sh                          Primary entry: pipeline + Vite dev server
    ├── run.sh                              Legacy Streamlit runner (not the demo path)
    ├── go.mod
    ├── requirements.txt
    ├── triage_engine.py                    Python ranking, elimination, RAG orchestration
    ├── app.py                              Legacy Streamlit UI
    │
    ├── cmd/log_slicer/
    │   └── main.go                         Go CLI — parse CI log → isolated_error.json
    │
    ├── rag/
    │   ├── __init__.py
    │   └── retriever.py                    Hybrid BM25 + TF-IDF + RRF retrieval
    │
    ├── mock_internet/                      Demo fixtures (reproducible external evidence)
    │   ├── external_evidence.json          Releases, issues, similar reports
    │   └── rag_corpus.json                 Retrieval corpus for hybrid RAG
    │
    ├── data/                               Pipeline inputs & outputs
    │   ├── failed_build.log                Sample CI log
    │   ├── git_log_fixture.json            Git history when real git unavailable
    │   ├── isolated_error.json             Go slicer output
    │   └── investigation_workspace.json    Investigation Packet (triage output)
    │
    └── frontend/                           React + Vite SPA
        ├── package.json
        ├── vercel.json                     Static deploy config
        ├── index.html
        ├── public/
        │   └── investigation_workspace.json  Static copy served to UI
        └── src/
            ├── App.tsx                     Routing: landing, ?demo=1
            ├── components/
            │   ├── LandingScreen.tsx       Product landing
            │   ├── GuidedShell.tsx         4-step walkthrough shell
            │   ├── EvidenceGatheredStep.tsx
            │   ├── EliminationStep.tsx     Hero elimination panel
            │   ├── InvestigationLeadStep.tsx
            │   ├── HandoffStep.tsx
            │   ├── demo/                   Presentation deck (~40 slide components)
            │   │   ├── PresentationShell.tsx
            │   │   ├── OriginScreen.tsx, UnderTheHoodFlow.tsx, …
            │   │   └── product-story/      GitHub/Cursor scenario mockups
            │   └── …                       Supporting UI components
            ├── demo/
            │   ├── presentationNarrative.ts  Slide copy & narrative
            │   ├── maintainerResearch.ts     Validation quotes & citations
            │   └── presentationStepMeta.ts
            ├── lib/
            │   └── transformWorkspace.ts   JSON → UI view models
            ├── styles/
            │   └── globals.css
            └── types/
                └── workspace.ts            Investigation Packet types
```

**Where to look first**

| If you want to… | Open |
|-----------------|------|
| Run the full demo | `run-dev.sh` |
| See log parsing | `cmd/log_slicer/main.go` |
| See ranking + elimination | `triage_engine.py` |
| See hybrid retrieval | `rag/retriever.py` |
| See the 4-step UI | `frontend/src/components/EliminationStep.tsx` |
| See the presentation deck | `frontend/src/demo/presentationNarrative.ts` |
| See demo data | `data/` and `mock_internet/` |

Service-level quickstart: [capstone/services/clique-triage/README.md](capstone/services/clique-triage/README.md)

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
