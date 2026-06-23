# Clique — Investigation Triage

Capstone service: Go log extraction, Python hybrid-RAG triage, and a React investigation walkthrough.

## Live demo

**https://clique-demo-six.vercel.app/**

Opens the product landing → **Start investigation** → 4-step guided walkthrough (Gather → Eliminate → Rank → Investigation lead).

> Production is deployed separately via Vercel CLI. This repo is **not** connected to Vercel Git auto-deploy. Pushing to GitHub does not change the live URL.

## Run locally

```bash
bash run-dev.sh
```

| URL | Purpose |
|-----|---------|
| http://localhost:5173/ | Same as live demo (landing + walkthrough) |
| http://localhost:5173/?demo=1 | Full presentation (prelude + demo story + walkthrough) |
| http://localhost:5173/?demo=1&pdf=1 | Scrollable PDF export view |

## Generate PDF deck (local)

```bash
cd frontend
npm run pdf:preview
```

Output: `docs/Clique-Presentation.pdf` (gitignored — regenerate locally).

## Layout

```text
├── cmd/log_slicer/       Go — traceback extraction
├── triage_engine.py      Python — hybrid RAG + ranking
├── data/                 Fixtures + workspace JSON
├── mock_internet/        RAG corpus + external evidence
├── frontend/             React/Vite SPA
├── run-dev.sh            Primary dev entrypoint
└── docs/                 Generated PDF (local)
```

See the [repository README](../../README.md) for architecture, positioning, and docs.
