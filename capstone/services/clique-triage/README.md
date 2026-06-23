# Clique — Investigation Triage

Go log extraction, Python hybrid-RAG triage, and a React investigation walkthrough.

## Quick links

| | |
|---|---|
| **Live demo** | https://clique-demo-six.vercel.app/ |
| **Root README** | [../../../README.md](../../../README.md) |
| **Pitch & Q&A** | [../../../PITCH.md](../../../PITCH.md) |

## Run locally

```bash
bash run-dev.sh
```

| URL | Purpose |
|-----|---------|
| http://localhost:5173/ | Product landing → 4-step walkthrough |
| http://localhost:5173/?demo=1 | Full presentation deck + walkthrough |
| http://localhost:5173/?demo=1&pdf=1 | PDF export preview |

## Pipeline

```text
failed_build.log → Go log slicer → isolated_error.json
                 → Python triage + RAG → investigation_workspace.json
                 → React SPA
```

## Layout

```text
├── cmd/log_slicer/     Go — traceback extraction
├── triage_engine.py      Python — ranking + elimination
├── rag/                  Hybrid RAG (BM25 + TF-IDF + RRF)
├── mock_internet/        RAG corpus + external evidence fixtures
├── data/                 Demo logs + workspace output
├── frontend/             React/Vite SPA
├── run-dev.sh            Primary dev entrypoint
└── app.py                Legacy Streamlit (not the demo path)
```

## PDF export

```bash
cd frontend && npm run pdf:preview
```

Output: `docs/Clique-Presentation.pdf` (gitignored — regenerate locally).
