# Clique — Investigation Triage Workspace

When CI fails, engineers drown in tabs — logs, git history, release notes, community threads. **Clique** assembles that evidence, eliminates noise, ranks what survives, and replays the investigation so you know **what to look at first**.

| | |
|---|---|
| **Live demo** | https://clique-demo-six.vercel.app/ |
| **Product overview** | [docs/PRODUCT_OVERVIEW.md](docs/PRODUCT_OVERVIEW.md) |
| **Pitch & Q&A** | [PITCH.md](PITCH.md) |
| **Run locally** | `cd capstone/services/clique-triage && bash run-dev.sh` |

---

## Table of contents

- [What exists today](#what-exists-today-mvp)
- [The problem](#the-problem)
- [Architecture](#architecture)
- [Run locally](#run-locally)
- [Live demo](#live-demo)
- [Documentation](#documentation)
- [Repository layout](#repository-layout)
- [Positioning](#positioning)

---

## What exists today (MVP)

A **triage pipeline** plus a **guided investigation walkthrough** (4 steps, user-controlled):

```text
failed_build.log
      ↓  Go log slicer
isolated_error.json
      ↓  Python triage engine + hybrid RAG (BM25 + TF-IDF + RRF)
investigation_workspace.json
      ↓  React/Vite SPA
Guided demo: Gather → Eliminate → Rank → Investigation lead
```

**No LLM calls in the MVP.** Ranking combines **hybrid RAG retrieval** (BM25 + TF-IDF + RRF over `mock_internet/rag_corpus.json`) with deterministic git elimination rules. Gemini synthesis is on the roadmap.

---

## The problem

When CI fails, engineers face **information overload**, not information access. The bottleneck is manually opening tabs for logs, git history, dependency manifests, and community issues.

Clique automates the **assembly and elimination** phase before debugging begins.

---

## Architecture

```text
[ Pipeline Failure ] ──► [ Go Log Slicer ] ──► [ Python Triage + RAG ] ──► [ React Investigation Replay ]
```

| Stage | Role |
|-------|------|
| Go log slicer | Extract traceback + exception from raw CI logs |
| Python triage + RAG | Rank leads via hybrid retrieval, discard noise, write workspace JSON |
| React console | Landing + 4-step walkthrough; elimination panel is the hero on step 3 |

External evidence in the demo comes from `mock_internet/external_evidence.json`. Git history uses real `git log` when available, otherwise `data/git_log_fixture.json`.

---

## Run locally

**Requirements:** Python 3, Go, Node.js 18+

```bash
git clone https://github.com/ashmitha247/clique-triage.git
cd clique-triage/capstone/services/clique-triage
bash run-dev.sh
```

| URL | Purpose |
|-----|---------|
| http://localhost:5173/ | Product landing → **Start investigation** → 4-step walkthrough |
| http://localhost:5173/?demo=1 | Full presentation (prelude slides + demo story + walkthrough) |
| http://localhost:5173/?demo=1&pdf=1 | PDF export preview |

**Generate PDF deck (local):**

```bash
cd capstone/services/clique-triage/frontend
npm run pdf:preview
```

Output: `capstone/services/clique-triage/docs/Clique-Presentation.pdf` (gitignored — regenerate locally).

---

## Live demo

**https://clique-demo-six.vercel.app/**

Same as local root URL: landing → **Start investigation** → Gather / Eliminate / Rank / Investigation lead.

> The Vercel project is not linked to this GitHub repo. Pushing here does not redeploy the live site.

---

## Documentation

| Document | Audience |
|----------|----------|
| [docs/PRODUCT_OVERVIEW.md](docs/PRODUCT_OVERVIEW.md) | Design, data sources, architecture, demo scenario, limitations |
| [PITCH.md](PITCH.md) | Problem framing, maintainer validation, judge Q&A |
| [docs/MAINTAINER_DEMO.md](docs/MAINTAINER_DEMO.md) | Recording script for the full presentation |
| [docs/README.md](docs/README.md) | Documentation index |

---

## Repository layout

```text
.
├── README.md                          ← start here
├── PITCH.md                           ← pitch & Q&A
├── docs/                              ← product documentation
├── .github/workflows/log-slicer.yml   ← CI: pipeline smoke test
└── capstone/services/clique-triage/   ← application (all source code)
    ├── cmd/log_slicer/                Go — log ingestion
    ├── triage_engine.py               Python — ranking + elimination
    ├── rag/                           Hybrid RAG (BM25 + TF-IDF + RRF)
    ├── mock_internet/                 RAG corpus + external evidence fixtures
    ├── data/                          Demo logs + workspace output
    ├── frontend/                      React/Vite SPA
    ├── run-dev.sh                     Primary dev entrypoint
    └── app.py                         Legacy Streamlit (not the demo path)
```

Service-level quickstart: [capstone/services/clique-triage/README.md](capstone/services/clique-triage/README.md)

---

## Positioning

**vs Dependabot:** Dependabot notifies about updates. Clique asks: *could an external change explain this specific failure?*

**vs Copilot/Cursor:** IDE tools excel at local code. Clique gathers external evidence so your IDE gets the right context.

---

## License

[MIT](LICENSE) — Copyright (c) 2026 ashmitha247
