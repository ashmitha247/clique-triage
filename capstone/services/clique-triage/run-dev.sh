#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

# Prefer Linux Node (nvm) — Windows npm on WSL paths serves the wrong directory (404).
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [[ -s "$NVM_DIR/nvm.sh" ]]; then
  # shellcheck disable=SC1091
  . "$NVM_DIR/nvm.sh"
  nvm use 20 >/dev/null 2>&1 || nvm use default >/dev/null 2>&1 || true
fi

if ! command -v node >/dev/null 2>&1 || node -v 2>/dev/null | grep -q "windows"; then
  echo "ERROR: Linux Node.js is required inside WSL."
  echo ""
  echo "Install once:"
  echo "  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash"
  echo "  source ~/.bashrc && nvm install 20"
  echo ""
  exit 1
fi

echo ""
echo "=========================================="
echo "  Clique Investigation Console"
echo "=========================================="
echo ""
echo "  Node: $(node -v) ($(command -v node))"
echo ""

echo "[1/5] Running Go log slicer..."
if command -v go >/dev/null 2>&1; then
  go build -o log_slicer cmd/log_slicer/main.go
  ./log_slicer
else
  echo "  (Go not found — using existing data/isolated_error.json)"
fi

echo "[2/5] Installing Python dependencies..."
python3 -m pip install -q -r requirements.txt 2>/dev/null || true

echo "[3/5] Running triage engine (Go output + hybrid RAG retrieval)..."
python3 triage_engine.py

echo "[4/5] Syncing workspace JSON to frontend..."
mkdir -p frontend/public
cp data/investigation_workspace.json frontend/public/investigation_workspace.json

echo "[5/5] Starting Vite dev server..."
echo ""
echo "  Judge demo:  http://localhost:5173/?demo=1"
echo "  Product:     http://localhost:5173/"
echo ""
echo "  From Windows, use localhost — NOT 10.255.255.254 (often times out)."
WSL_IP="$(hostname -I 2>/dev/null | awk '{print $1}')"
if [[ -n "$WSL_IP" ]]; then
  echo "  WSL fallback (if localhost hangs): http://${WSL_IP}:5173/?demo=1"
fi
echo "=========================================="
echo ""

cd frontend

# Reinstall if node_modules was created by Windows npm (broken esbuild/vite on WSL paths).
if [[ -d node_modules ]] && [[ ! -x node_modules/.bin/vite ]]; then
  rm -rf node_modules
fi

if [[ ! -d node_modules ]]; then
  npm install
fi

# Keep port 5173 predictable — kill leftover Vite from a previous run-dev.sh
if command -v lsof >/dev/null 2>&1; then
  OLD_PIDS="$(lsof -t -i:5173 -sTCP:LISTEN 2>/dev/null || true)"
  if [[ -n "$OLD_PIDS" ]]; then
    echo "Stopping stale dev server on port 5173..."
    kill $OLD_PIDS 2>/dev/null || true
    sleep 1
  fi
fi

exec npm run dev -- --host 0.0.0.0 --port 5173 --strictPort
