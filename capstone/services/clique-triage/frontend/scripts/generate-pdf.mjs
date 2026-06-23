#!/usr/bin/env node
/**
 * Renders ?demo=1&pdf=1 and writes docs/Clique-Presentation.pdf
 *
 * Usage (dev server must be running on port 5173):
 *   bash run-dev.sh   # in another terminal
 *   npm run pdf
 *
 * Or build + preview automatically:
 *   npm run pdf:preview
 */
import { spawn } from "node:child_process";
import { copyFile, mkdir } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(__dirname, "..");
const outputDir = path.resolve(frontendDir, "..", "docs");
const outputPath = path.join(outputDir, "Clique-Presentation.pdf");
const deckUrl = "http://127.0.0.1:5173/?demo=1&pdf=1";

const WINDOWS_CHROME =
  "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe";

function waitForServer(url, timeoutMs = 120_000) {
  const target = new URL(url);
  const started = Date.now();

  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(
        { hostname: target.hostname, port: target.port, path: target.pathname + target.search },
        (res) => {
          res.resume();
          if (res.statusCode && res.statusCode < 500) {
            resolve();
            return;
          }
          retry();
        },
      );
      req.on("error", retry);
      req.setTimeout(4_000, () => {
        req.destroy();
        retry();
      });
    };

    const retry = () => {
      if (Date.now() - started > timeoutMs) {
        reject(new Error(`Timed out waiting for ${url}`));
        return;
      }
      setTimeout(tick, 500);
    };

    tick();
  });
}

function runPreview() {
  return new Promise((resolve, reject) => {
    const child = spawn("npm", ["run", "preview", "--", "--host", "127.0.0.1", "--port", "5173"], {
      cwd: frontendDir,
      stdio: "ignore",
      shell: true,
    });
    child.on("error", reject);
    resolve(child);
  });
}

async function printWithWindowsChrome() {
  const { readdir, access } = await import("node:fs/promises");
  const users = await readdir("/mnt/c/Users");
  const skip = new Set(["Public", "Default", "Default User", "All Users", "desktop.ini", "WsiAccount"]);
  const user =
    (process.env.WIN_USER && users.includes(process.env.WIN_USER) && process.env.WIN_USER) ||
    (users.includes("vijay") ? "vijay" : null) ||
    users.find((name) => !skip.has(name) && !name.startsWith(".")) ||
    "vijay";
  const filename = "Clique-Presentation.pdf";
  const tempPdfWin = `C:\\Users\\${user}\\AppData\\Local\\Temp\\${filename}`;
  const tempPdfUnix = `/mnt/c/Users/${user}/AppData/Local/Temp/${filename}`;

  await new Promise((resolve, reject) => {
    const args = [
      "--headless",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--virtual-time-budget=30000",
      `--print-to-pdf=${tempPdfWin}`,
      deckUrl,
    ];
    const child = spawn(WINDOWS_CHROME, args, { stdio: "inherit", shell: false });
    child.on("error", reject);
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`Chrome exited ${code}`))));
  });

  await access(tempPdfUnix);
  await copyFile(tempPdfUnix, outputPath);
}

async function printWithPlaywright() {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(deckUrl, { waitUntil: "networkidle" });
    await page.waitForSelector(".pdf-export-deck", { timeout: 60_000 });
    await page.waitForTimeout(1_500);
    await page.pdf({
      path: outputPath,
      printBackground: true,
      format: "A4",
      landscape: true,
      margin: { top: "0.35in", right: "0.35in", bottom: "0.35in", left: "0.35in" },
    });
  } finally {
    await browser.close();
  }
}

async function main() {
  const usePreview = process.argv.includes("--preview");
  let previewProc = null;

  if (usePreview) {
    console.log("Building frontend…");
    await new Promise((resolve, reject) => {
      const build = spawn("npm", ["run", "build"], { cwd: frontendDir, stdio: "inherit", shell: true });
      build.on("exit", (code) => (code === 0 ? resolve() : reject(new Error("build failed"))));
    });
    previewProc = await runPreview();
  }

  console.log(`Waiting for ${deckUrl}…`);
  await waitForServer(deckUrl);
  await mkdir(outputDir, { recursive: true });

  if (process.platform === "linux" && WINDOWS_CHROME) {
    const { access } = await import("node:fs/promises");
    try {
      await access(WINDOWS_CHROME);
      console.log("Printing with Windows Chrome (WSL)…");
      await printWithWindowsChrome();
      console.log(`Wrote ${outputPath}`);
      if (previewProc) previewProc.kill("SIGTERM");
      return;
    } catch {
      // fall through to Playwright
    }
  }

  console.log("Printing with Playwright…");
  try {
    await printWithPlaywright();
    console.log(`Wrote ${outputPath}`);
  } finally {
    if (previewProc) previewProc.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
