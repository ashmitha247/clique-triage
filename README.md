# Clique — Investigation Triage Workspace

**Clique** is an incident triage workspace that assembles build logs, repository context, dependency updates, and community reports into a single investigation replay — helping developers decide what to look at first.

> **Product overview:** See **[docs/PRODUCT_OVERVIEW.md](docs/PRODUCT_OVERVIEW.md)** — design, data sources, architecture, demo scenarios, and limitations.

---

## What exists today (MVP)

The current demo is a **triage pipeline** plus a **guided investigation walkthrough** (click Next through 4 steps):

```text
failed_build.log
      ↓  Go log slicer
isolated_error.json
      ↓  Python triage engine + hybrid RAG (BM25 + TF-IDF + RRF)
investigation_workspace.json
      ↓  React/Vite SPA
Guided demo: Gather → Eliminate → Rank → Investigation lead
```

**No LLM calls in the MVP.** Ranking combines **hybrid RAG retrieval** (BM25 + TF-IDF + RRF over `mock_internet/rag_corpus.json`) with deterministic git elimination rules. Gemini synthesis is roadmap.

---

## Roadmap (next layer)

**Gemini synthesis over ranked evidence** — after the deterministic engine produces a workspace JSON, an LLM summarizes the ranked leads and generates a human-readable investigation narrative. The MVP deliberately separates *evidence assembly* from *language synthesis* so the demo is reproducible and auditable.

---

## The problem

When CI fails, engineers face **information overload**, not information access. The bottleneck is manually opening tabs for logs, git history, dependency manifests, and community issues.

Clique automates the **assembly and elimination** phase before debugging begins.

---

## Architecture

```text
[ Pipeline Failure ] ──► [ Go Log Slicer ] ──► [ Python Heuristic Core ] ──► [ React Investigation Replay ]
```

| Stage | Role |
|-------|------|
| Go log slicer | Extract traceback + exception from raw CI logs |
| Python triage + RAG | Rank leads via hybrid retrieval, discard noise, write workspace JSON |
| React console | Guided walkthrough — landing + 4 steps with Next/Back, elimination hero on step 3 |

External evidence in the demo comes from `mock_internet/external_evidence.json`. Git history uses real `git log` when available, otherwise `data/git_log_fixture.json`.

---

## Run locally

```bash
cd capstone/services/clique-triage
bash run-dev.sh
```

| URL | Purpose |
|-----|---------|
| [http://localhost:5173/](http://localhost:5173/) | Product landing → **Start investigation** → 4-step walkthrough |
| [http://localhost:5173/?demo=1](http://localhost:5173/?demo=1) | Full presentation (prelude slides + demo story + walkthrough) |
| [http://localhost:5173/?demo=1&pdf=1](http://localhost:5173/?demo=1&pdf=1) | PDF export preview (print or `npm run pdf:preview`) |

---

## Live demo

**https://clique-demo-six.vercel.app/**

Same experience as local root URL: landing page → **Start investigation** → Gather / Eliminate / Rank / Investigation lead.

The Vercel project is **not** linked to this GitHub repo. Pushing code here does **not** redeploy or change the live URL. Do not run `vercel --prod` unless you intentionally want a new production deploy.

### Generate PDF deck (local only)

```bash
cd capstone/services/clique-triage/frontend
npm run pdf:preview
```

Writes `capstone/services/clique-triage/docs/Clique-Presentation.pdf` (regenerated locally; not required for the live demo link).

**Docs:** [docs/MAINTAINER_DEMO.md](docs/MAINTAINER_DEMO.md) · [docs/PRODUCT_OVERVIEW.md](docs/PRODUCT_OVERVIEW.md)

**Requirements:** Python 3, Go (optional — run separately), Node.js 18+ inside WSL.

**Optional Streamlit prototype** (legacy, not the demo path):

```bash
cd capstone/services/clique-triage
bash run.sh
```

---

## Repository layout

```text
capstone/services/clique-triage/
├── cmd/log_slicer/          Go — log ingestion
├── triage_engine.py         Python — ranking engine
├── data/                    Demo logs + workspace output
├── rag/                       Hybrid RAG (BM25 + TF-IDF + RRF)
├── mock_internet/             RAG corpus + external evidence fixtures
├── frontend/                React investigation replay
├── frontend/scripts/        PDF export (local)
├── run-dev.sh               Primary dev entrypoint
└── app.py                   Legacy Streamlit UI
```

---

## Positioning

**vs Dependabot:** Dependabot notifies about updates. Clique asks: *could an external change explain this specific failure?*

**vs Copilot/Cursor:** IDE tools excel at local code. Clique gathers external evidence so your IDE gets the right context.
