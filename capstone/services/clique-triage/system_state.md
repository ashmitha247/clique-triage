# System State: Clique Investigation Workspace
**Last Updated:** 2026-06-21
**Status:** Investigation Replay Ready — Deterministic pipeline + React cinematic UI

---

## Architecture

```text
failed_build.log → Go log_slicer → isolated_error.json
                                 ↓
mock_internet + git fixture → triage_engine.py → investigation_workspace.json
                                 ↓
React/Vite SPA → 8-step investigation replay (Arc-style, one focus at a time)
```

**MVP:** Deterministic heuristics. No LLM in pipeline.
**Roadmap:** Gemini synthesis layer over ranked workspace JSON.

---

## Run

```bash
cd capstone/services/clique-triage
bash run-dev.sh   # primary — port 5173
```

---

## Implemented

- Go log slicer (`cmd/log_slicer/main.go`)
- Python triage engine (`triage_engine.py`)
- React investigation replay (`frontend/`)
- Legacy Streamlit prototype (`app.py`)
