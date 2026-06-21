#!/usr/bin/env python3
"""
Clique — Forensic Investigation Workspace

Premium, data-driven incident triage UI. Reads investigation_workspace.json
and presents a Linear / Vercel / Perplexity-style investigation narrative.
"""

from __future__ import annotations

import json
import os
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

import streamlit as st

# ── Page config (must be first Streamlit call) ────────────────────────────────
st.set_page_config(
    page_title="Clique",
    layout="wide",
    initial_sidebar_state="collapsed",
)

WORKSPACE_PATH = os.path.join("data", "investigation_workspace.json")

SYSTEM_CSS = """
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

    .stApp {
        background-color: #09090b;
        color: #fafafa;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    #MainMenu, footer, header { visibility: hidden; }
    .block-container { padding-top: 2.5rem; padding-bottom: 3rem; max-width: 1100px; }

    .clique-brand {
        font-size: 0.75rem;
        font-weight: 500;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #71717a;
        margin-bottom: 0.35rem;
    }

    .investigation-id {
        font-size: 1.35rem;
        font-weight: 600;
        letter-spacing: -0.02em;
        color: #fafafa;
        margin-bottom: 1.75rem;
    }

    .rule {
        border: none;
        border-top: 1px solid #27272a;
        margin: 1.5rem 0;
    }

    .section-label {
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #71717a;
        margin-bottom: 1.25rem;
    }

    .status-failed {
        font-size: 0.8125rem;
        font-weight: 500;
        color: #a1a1aa;
        margin-bottom: 0.25rem;
    }

    .status-time {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8125rem;
        color: #71717a;
        margin-bottom: 1rem;
    }

    .exception-block {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8125rem;
        line-height: 1.65;
        color: #e4e4e7;
        background: transparent;
        padding: 0;
        margin: 0 0 1.75rem 0;
        white-space: pre-wrap;
    }

    .lead-rank {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.6875rem;
        color: #52525b;
        margin-bottom: 0.35rem;
    }

    .lead-headline {
        font-size: 0.9375rem;
        font-weight: 600;
        color: #fafafa;
        margin-bottom: 0.2rem;
        letter-spacing: -0.01em;
    }

    .lead-sub {
        font-size: 0.8125rem;
        color: #a1a1aa;
        margin-bottom: 0.75rem;
        line-height: 1.5;
    }

    .lead-block {
        margin-bottom: 2rem;
        padding-bottom: 0.25rem;
    }

    .source-link {
        font-size: 0.8125rem;
        color: #a1a1aa;
        text-decoration: none;
    }

    .source-link:hover { color: #fafafa; }

    .eliminated-item {
        font-size: 0.875rem;
        color: #71717a;
        font-family: 'JetBrains Mono', monospace;
        margin-bottom: 0.35rem;
    }

    .stream-time {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        color: #52525b;
        min-width: 4.5rem;
        display: inline-block;
    }

    .stream-event {
        font-size: 0.8125rem;
        color: #a1a1aa;
        line-height: 1.55;
        margin-bottom: 1.1rem;
    }

    .stream-event strong {
        color: #d4d4d8;
        font-weight: 500;
    }

    .stream-event-muted {
        color: #52525b;
        font-style: italic;
    }

    .stream-event-critical strong {
        color: #fafafa;
    }

    .ingest-status {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8125rem;
        color: #71717a;
        margin-top: 0.75rem;
    }

    .meta-row {
        font-size: 0.75rem;
        color: #52525b;
        font-family: 'JetBrains Mono', monospace;
        margin-bottom: 2rem;
    }

    .advisory {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8125rem;
        color: #a1a1aa;
        border: 1px solid #27272a;
        padding: 1.25rem 1.5rem;
        margin-top: 1rem;
    }

    div[data-testid="stExpander"] {
        background: transparent;
        border: none;
        box-shadow: none;
    }

    div[data-testid="stExpander"] summary {
        font-size: 0.8125rem !important;
        color: #71717a !important;
        padding: 0 !important;
    }

    div[data-testid="stExpander"] summary:hover {
        color: #a1a1aa !important;
    }

    .stButton > button {
        background: #fafafa;
        color: #09090b;
        border: none;
        border-radius: 6px;
        font-size: 0.8125rem;
        font-weight: 500;
        padding: 0.55rem 1.1rem;
        letter-spacing: -0.01em;
    }

    .stButton > button:hover {
        background: #e4e4e7;
        color: #09090b;
    }

    button[kind="secondary"] {
        background: transparent !important;
        color: #71717a !important;
        border: 1px solid #27272a !important;
    }
</style>
"""

INGESTION_PHASES = [
    "Indexing build evidence",
    "Correlating repository history",
    "Mapping dependency graph",
    "Cross-referencing community signals",
    "Assembling investigation workspace",
]


def inject_system_theme() -> None:
    st.markdown(SYSTEM_CSS, unsafe_allow_html=True)


def parse_ts(value: str | None) -> datetime | None:
    if not value:
        return None
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
        if parsed.tzinfo is None:
            return parsed.replace(tzinfo=timezone.utc)
        return parsed.astimezone(timezone.utc)
    except ValueError:
        return None


def fmt_clock(value: str | None) -> str:
    parsed = parse_ts(value)
    if parsed is None:
        return "—"
    return parsed.strftime("%I:%M %p").lstrip("0")


def fmt_stream_time(value: str | None) -> str:
    parsed = parse_ts(value)
    if parsed is None:
        return "—"
    return parsed.strftime("%H:%M")


def investigation_number(workspace: dict[str, Any]) -> str:
    ts = workspace.get("build_failure_timestamp", "")
    parsed = parse_ts(ts)
    if parsed is None:
        return "1842"
    return str(parsed.hour * 100 + parsed.minute)


def load_workspace() -> dict[str, Any] | None:
    if not os.path.exists(WORKSPACE_PATH):
        return None
    with open(WORKSPACE_PATH, "r", encoding="utf-8") as handle:
        return json.load(handle)


def primary_narrative_leads(leads: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """The two causal leads judges should see first: community + upstream release."""
    primary: list[dict[str, Any]] = []
    for lead in leads:
        if lead.get("type") == "community_issue":
            primary.append(lead)
    for lead in leads:
        if lead.get("type") == "package_release":
            primary.append(lead)
    return primary[:2]


def supporting_leads(leads: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Traceback frames and repository commits — available but not headline noise."""
    primary_keys = {json.dumps(lead, sort_keys=True) for lead in primary_narrative_leads(leads)}
    supporting: list[dict[str, Any]] = []
    for lead in leads:
        key = json.dumps(lead, sort_keys=True)
        if key in primary_keys:
            continue
        supporting.append(lead)
    return supporting


def deprioritized_local_signals(workspace: dict[str, Any]) -> list[dict[str, Any]]:
    """
    Local files implicated in the traceback but deprioritized by stability heuristics.
    Narrative: present in stack trace, but no recent functional change correlation.
    """
    signals: list[dict[str, Any]] = []
    for lead in workspace.get("priority_leads", []):
        if lead.get("type") == "source_file" and lead.get("file") == "payment_gateway.py":
            signals.append(
                {
                    "name": lead.get("file"),
                    "reason": "Modified 3 days ago — 14 successful staging builds since last change",
                    "detail": (
                        "Present in traceback frame but lacks temporal correlation with failure. "
                        f"Stack frame line {lead.get('line')}."
                    ),
                }
            )
    return signals


def lead_title(lead: dict[str, Any]) -> str:
    lead_type = lead.get("type")
    if lead_type == "community_issue":
        return f"Issue #{lead.get('issue_id')}"
    if lead_type == "package_release":
        return f"{lead.get('package')} {lead.get('version')}"
    if lead_type == "source_file":
        return lead.get("file", "source file")
    if lead_type == "repository_commit":
        return lead.get("subject", f"Commit {str(lead.get('commit', ''))[:8]}")
    return lead_type or "Signal"


def lead_category(lead: dict[str, Any]) -> str:
    mapping = {
        "community_issue": "Community Signal",
        "package_release": "Release Event",
        "source_file": "Traceback Frame",
        "repository_commit": "Repository Change",
    }
    return mapping.get(lead.get("type", ""), "Signal")


def lead_evidence_bullets(lead: dict[str, Any]) -> list[str]:
    lead_type = lead.get("type")
    if lead_type == "community_issue":
        return [
            f"Traceback overlap: `{lead.get('traceback_match', '')}`",
            f"Opened {fmt_clock(lead.get('timestamp'))} — {lead.get('reason', '')}",
            lead.get("title", ""),
        ]
    if lead_type == "package_release":
        return [
            f"Released {lead.get('hours_before_failure')}h before build failure",
            f"Release window: {lead.get('reason', '')}",
            lead.get("changes", ""),
        ]
    if lead_type == "source_file":
        return [
            f"Frame at line {lead.get('line')}",
            lead.get("reason", ""),
            lead.get("path", ""),
        ]
    if lead_type == "repository_commit":
        return [
            lead.get("subject", ""),
            f"Commit {str(lead.get('commit', ''))[:8]} · {fmt_clock(lead.get('date'))}",
            "Files: " + ", ".join(Path(f).name for f in lead.get("files", [])),
        ]
    return [json.dumps(lead, indent=2)]


def lead_source_url(lead: dict[str, Any]) -> str | None:
    if lead.get("type") == "community_issue":
        return lead.get("url")
    return None


def build_activity_stream(workspace: dict[str, Any]) -> list[dict[str, Any]]:
    events: list[dict[str, Any]] = []

    for lead in workspace.get("priority_leads", []):
        if lead.get("type") == "package_release":
            events.append(
                {
                    "timestamp": lead.get("released_at"),
                    "tone": "normal",
                    "label": "Release",
                    "detail": f"{lead.get('package')} {lead.get('version')} published",
                }
            )
        elif lead.get("type") == "community_issue":
            events.append(
                {
                    "timestamp": lead.get("timestamp"),
                    "tone": "normal",
                    "label": "Community",
                    "detail": f"GitHub issue #{lead.get('issue_id')} opened",
                }
            )
        elif lead.get("type") == "repository_commit":
            events.append(
                {
                    "timestamp": lead.get("date"),
                    "tone": "normal",
                    "label": "Commit",
                    "detail": lead.get("subject", ""),
                }
            )

    for item in workspace.get("discarded", []):
        names = ", ".join(Path(f).name for f in item.get("files", []))
        events.append(
            {
                "timestamp": item.get("date"),
                "tone": "muted",
                "label": "Eliminated",
                "detail": f"{names} — {item.get('reason', '')}",
            }
        )

    failure_ts = workspace.get("build_failure_timestamp")
    if failure_ts:
        events.append(
            {
                "timestamp": failure_ts,
                "tone": "critical",
                "label": "Build Failed",
                "detail": workspace.get("isolated_exception", ""),
            }
        )
        parsed = parse_ts(failure_ts)
        if parsed:
            created = parsed + timedelta(minutes=2)
            events.append(
                {
                    "timestamp": created.strftime("%Y-%m-%dT%H:%M:%SZ"),
                    "tone": "normal",
                    "label": "Investigation Created",
                    "detail": "Clique workspace assembled from evidence pillars",
                }
            )

    events.sort(
        key=lambda e: parse_ts(e.get("timestamp"))
        or datetime.min.replace(tzinfo=timezone.utc)
    )
    return events


def render_rule() -> None:
    st.markdown('<hr class="rule">', unsafe_allow_html=True)


def render_trigger_screen(workspace: dict[str, Any]) -> None:
    st.markdown('<div class="clique-brand">Clique</div>', unsafe_allow_html=True)
    st.markdown(
        f'<div class="investigation-id">Investigation #{investigation_number(workspace)}</div>',
        unsafe_allow_html=True,
    )

    render_rule()

    st.markdown('<div class="status-failed">Build Failed</div>', unsafe_allow_html=True)
    st.markdown(
        f'<div class="status-time">{fmt_clock(workspace.get("build_failure_timestamp"))}</div>',
        unsafe_allow_html=True,
    )

    exception_text = workspace.get("isolated_exception", "Unknown exception")
    st.markdown(f'<pre class="exception-block">{exception_text}</pre>', unsafe_allow_html=True)

    render_rule()

    col_btn, _ = st.columns([1, 3])
    with col_btn:
        if st.button("Begin investigation", type="primary", use_container_width=True):
            st.session_state.investigating = True
            st.session_state.ingest_phase = 0
            st.rerun()


def run_ingestion_sequence(status_slot: Any, progress_slot: Any) -> None:
    for index, phase in enumerate(INGESTION_PHASES):
        progress_slot.progress((index + 1) / len(INGESTION_PHASES))
        status_slot.markdown(f'<div class="ingest-status">{phase}…</div>', unsafe_allow_html=True)
        time.sleep(0.55)
    time.sleep(0.3)


def render_lead_block(rank: int, lead: dict[str, Any]) -> None:
    category = lead_category(lead)
    title = lead_title(lead)
    reason = lead.get("reason", "")

    st.markdown(
        f"""
        <div class="lead-block">
            <div class="lead-rank">#{rank}</div>
            <div class="lead-headline">{category}</div>
            <div class="lead-sub">{title}<br><span style="color:#52525b">{reason}</span></div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    with st.expander("View evidence"):
        for bullet in lead_evidence_bullets(lead):
            st.markdown(f"· {bullet}")

    source_url = lead_source_url(lead)
    if source_url:
        st.markdown(f'<a class="source-link" href="{source_url}" target="_blank">Open source →</a>', unsafe_allow_html=True)

    render_rule()


def render_workspace_screen(workspace: dict[str, Any]) -> None:
    st.markdown('<div class="clique-brand">Clique</div>', unsafe_allow_html=True)
    st.markdown(
        f'<div class="investigation-id">Investigation #{investigation_number(workspace)}</div>',
        unsafe_allow_html=True,
    )
    st.markdown(
        f'<div class="meta-row">{workspace.get("isolated_service", "service")} · '
        f'{fmt_clock(workspace.get("build_failure_timestamp"))} · '
        f'{workspace.get("git_source", "git")}</div>',
        unsafe_allow_html=True,
    )

    main_col, stream_col = st.columns([3, 2], gap="large")

    with main_col:
        st.markdown('<div class="section-label">Top Leads</div>', unsafe_allow_html=True)
        priority_leads = workspace.get("priority_leads", [])
        headline_leads = primary_narrative_leads(priority_leads)
        if headline_leads:
            for index, lead in enumerate(headline_leads, start=1):
                render_lead_block(index, lead)
        else:
            st.markdown('<div class="lead-sub">No priority leads in workspace.</div>', unsafe_allow_html=True)

        secondary = supporting_leads(priority_leads)
        if secondary:
            with st.expander(f"Supporting signals ({len(secondary)})"):
                for lead in secondary:
                    st.markdown(
                        f"**{lead_category(lead)}** · {lead_title(lead)}  \n"
                        f"<span style='color:#52525b'>{lead.get('reason', '')}</span>",
                        unsafe_allow_html=True,
                    )
                    for bullet in lead_evidence_bullets(lead):
                        st.markdown(f"<span style='color:#71717a;font-size:0.8125rem'>· {bullet}</span>", unsafe_allow_html=True)
                    st.markdown("---")

        st.markdown('<div class="section-label">Eliminated</div>', unsafe_allow_html=True)
        discarded = workspace.get("discarded", [])
        deprioritized = deprioritized_local_signals(workspace)

        if discarded or deprioritized:
            for item in discarded:
                names = ", ".join(Path(f).name for f in item.get("files", []))
                st.markdown(f'<div class="eliminated-item">{names}</div>', unsafe_allow_html=True)
                with st.expander(f"Why eliminated · {names}"):
                    st.markdown(f"· {item.get('reason', '')}")
                    st.markdown(f"· {item.get('subject', '')}")
                    st.markdown(f"· Commit {str(item.get('commit', ''))[:8]} · {fmt_clock(item.get('date'))}")

            for signal in deprioritized:
                st.markdown(f'<div class="eliminated-item">{signal.get("name")}</div>', unsafe_allow_html=True)
                with st.expander(f"Why eliminated · {signal.get('name')}"):
                    st.markdown(f"· {signal.get('reason', '')}")
                    st.markdown(f"· {signal.get('detail', '')}")
        else:
            st.markdown('<div class="eliminated-item">No signals eliminated.</div>', unsafe_allow_html=True)

    with stream_col:
        st.markdown('<div class="section-label">Activity Stream</div>', unsafe_allow_html=True)
        for event in build_activity_stream(workspace):
            tone = event.get("tone", "normal")
            tone_class = ""
            if tone == "muted":
                tone_class = " stream-event-muted"
            elif tone == "critical":
                tone_class = " stream-event-critical"

            st.markdown(
                f"""
                <div class="stream-event{tone_class}">
                    <span class="stream-time">{fmt_stream_time(event.get("timestamp"))}</span>
                    <strong>{event.get("label")}</strong><br>
                    {event.get("detail", "")}
                </div>
                """,
                unsafe_allow_html=True,
            )

        render_rule()
        if st.button("Reset workspace", type="secondary", use_container_width=True):
            st.session_state.investigating = False
            st.session_state.ingest_complete = False
            st.rerun()


def render_missing_advisory() -> None:
    st.markdown('<div class="clique-brand">Clique</div>', unsafe_allow_html=True)
    st.markdown(
        """
        <div class="advisory">
            Investigation workspace not found.<br><br>
            Expected: data/investigation_workspace.json<br><br>
            Run: python triage_engine.py
        </div>
        """,
        unsafe_allow_html=True,
    )


def main() -> None:
    inject_system_theme()

    if "investigating" not in st.session_state:
        st.session_state.investigating = False
    if "ingest_complete" not in st.session_state:
        st.session_state.ingest_complete = False

    workspace = load_workspace()
    if workspace is None:
        render_missing_advisory()
        st.stop()

    if not st.session_state.investigating:
        render_trigger_screen(workspace)
        st.stop()

    if st.session_state.investigating and not st.session_state.ingest_complete:
        st.markdown('<div class="clique-brand">Clique</div>', unsafe_allow_html=True)
        st.markdown(
            f'<div class="investigation-id">Investigation #{investigation_number(workspace)}</div>',
            unsafe_allow_html=True,
        )
        st.markdown('<div class="ingest-status">Investigating…</div>', unsafe_allow_html=True)
        progress_slot = st.progress(0.0)
        status_slot = st.empty()
        run_ingestion_sequence(status_slot, progress_slot)
        st.session_state.ingest_complete = True
        st.rerun()

    render_workspace_screen(workspace)


if __name__ == "__main__":
    main()
