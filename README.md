# Clique — AI-Assisted Investigation Workspace

**Clique** is an incident triage workspace that assembles build logs, repository context, dependency updates, and community reports into a single investigation replay — helping developers decide what to look at first.

> **Judges / demo:** See **[PITCH.md](PITCH.md)** for the full hackathon narrative, MVP vs roadmap, maintainer interview validation, and how GitHub Actions + RAG + Go CLI coursework maps to Clique.

---

## What exists today (MVP)

The current demo is a **deterministic triage pipeline** plus a **cinematic React investigation replay**:

```text
failed_build.log
      ↓  Go log slicer
isolated_error.json
      ↓  Python heuristic engine
investigation_workspace.json
      ↓  React/Vite SPA
Investigation replay (8 steps, one focus at a time)
```

**No LLM calls in the MVP.** Ranking, elimination, and evidence correlation are rule-based heuristics over structured inputs.

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
| Python triage engine | Rank leads, discard noise, write workspace JSON |
| React console | Forensic replay UI — progressive discovery, not a dashboard |

External evidence in the demo comes from `mock_internet/external_evidence.json`. Git history uses real `git log` when available, otherwise `data/git_log_fixture.json`.

---

## Run locally

```bash
cd capstone/services/clique-triage
bash run-dev.sh
```

Open [http://localhost:5173](http://localhost:5173).

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
├── mock_internet/           Simulated external evidence
├── frontend/                React investigation replay
├── run-dev.sh               Primary dev entrypoint
└── app.py                   Legacy Streamlit UI
```

---

## Positioning

**vs Dependabot:** Dependabot notifies about updates. Clique asks: *could an external change explain this specific failure?*

**vs Copilot/Cursor:** IDE tools excel at local code. Clique gathers external evidence so your IDE gets the right context.
