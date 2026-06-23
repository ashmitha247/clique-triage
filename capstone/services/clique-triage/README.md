# Clique — Investigation Triage

Go log extraction, Python hybrid-RAG triage, and a React investigation walkthrough.

## Quick links

| | |
|---|---|
| **Live demo** | https://clique-demo-six.vercel.app/ |
| **Root README** | [../../../README.md](../../../README.md) |

## Run locally

```bash
bash run-dev.sh
```

| URL | Purpose |
|-----|---------|
| http://localhost:5173/ | Product landing → 4-step walkthrough |
| http://localhost:5173/?demo=1 | Full presentation deck + walkthrough |

## Pipeline

```text
failed_build.log → Go log slicer → isolated_error.json
                 → Python triage + RAG → investigation_workspace.json
                 → React SPA
```

## Layout

```text
├── cmd/log_slicer/main.go    Go — traceback extraction
├── triage_engine.py            Python — ranking + elimination
├── rag/retriever.py            Hybrid RAG (BM25 + TF-IDF + RRF)
├── mock_internet/              Demo evidence + RAG corpus
├── data/                       Logs, fixtures, workspace JSON
├── frontend/src/
│   ├── components/             4-step walkthrough + presentation deck
│   ├── demo/                   Slide narrative & citations
│   └── lib/                    Workspace transforms
├── run-dev.sh                  Primary dev entrypoint
└── app.py                      Legacy Streamlit (not the demo path)
```
