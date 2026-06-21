# 🕵️‍♂️ Clique // AI-Assisted Incident Triage Workspace

**Clique** is an incident triage workspace that automatically assembles build logs, repository context, dependency updates, and community reports into a single investigation view, helping developers decide what to look at first.

---

## ⚡ The Incident Triage Moat

When a continuous integration (CI) pipeline crashes, engineers face an **information overload problem**, not an information access problem. The bottleneck is the 15–20 minutes spent manually opening browser tabs to aggregate:
1. Unformatted CI console logs.
2. The Git commit tree to inspect concurrent changes.
3. Local dependency manifests (`package.json`, `requirements.txt`).
4. Upstream package registries and open community GitHub issues.

**Clique automates the manual assembly phase.** It acts as a deterministic upstream filter—gathering the context, pruning noise via strict elimination logic, and presenting ranked investigation leads *before* an engineer starts debugging.

---

## 📐 System Architecture & Evidence Pillars

```text
[ Pipeline Failure ] ──► [ Go Log Slicer ] ──► [ Python Heuristic Core ] ──► [ Gemini Summary Gate ] ──► [ Streamlit Cockpit ]
```

Build Pillar: High-speed compiled Go tokenizer isolates multi-line exception tracebacks.

Repository Pillar: Automated Git sub-process auditing evaluates recent commit stability.

Dependency Pillar: Manifest parsing cross-references local packages against upstream breaking changes.

Community Pillar: Live correlation against public defect trackers and vendor changelogs.

---

## 🚀 Running the Workspace Cockpit locally

```bash
cd capstone/services/clique-triage
streamlit run app.py
```

---

## 🛡️ Defensible Positioning

Why not Dependabot? Dependabot is a static notifier answering: "What package updates exist?" Clique is an active triage tool answering: "Could an external update explain my current build failure?"

Why not Cursor / Copilot? IDE assistants possess incredible local repository intelligence for generating fixes. However, if an external background dependency breaks on the web, an IDE will try to blindly rewrite your local, perfectly valid code. Clique gathers the external evidence required to give your IDE the correct context in the first place.
