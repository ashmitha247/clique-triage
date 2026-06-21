#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if [[ -x "${VIRTUAL_ENV:-}/bin/streamlit" ]]; then
  STREAMLIT="${VIRTUAL_ENV}/bin/streamlit"
elif [[ -x "../../.venv/bin/streamlit" ]]; then
  STREAMLIT="../../.venv/bin/streamlit"
else
  STREAMLIT="streamlit"
fi

WSL_IP="$(hostname -I 2>/dev/null | awk '{print $1}')"

echo ""
echo "  Clique Streamlit prototype (legacy) — port 8501"
echo "  Primary demo: bash run-dev.sh → http://localhost:5173"
echo "  WSL fallback: http://${WSL_IP:-127.0.0.1}:8501"
echo ""

exec "$STREAMLIT" run app.py \
  --server.address 0.0.0.0 \
  --server.port 8501 \
  --server.headless true
