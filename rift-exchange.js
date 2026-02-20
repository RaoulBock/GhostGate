#!/usr/bin/env node
import httpProxy from "http-proxy";
import { spawn } from "child_process";
import fs from "fs";

// ===============================
// CONFIG
// ===============================
const RESTART_INTERVAL = 12 * 60 * 60 * 1000; // 12 hours
const HANG_TIMEOUT = 60 * 1000; // 1 minute without output = restart

// ===============================
// ARGUMENT PARSING
// ===============================
const args = process.argv.slice(2);
const options = {};

args.forEach((arg, index) => {
  if (arg.startsWith("--")) {
    const key = arg.replace("--", "");
    options[key] = args[index + 1];
  }
});

const required = ["target", "host", "port"];
for (const key of required) {
  if (!options[key]) {
    console.error(`❌ Missing required argument: --${key}`);
    process.exit(1);
  }
}

const { target, host, port } = options;

// ===============================
// PROXY
// ===============================
const proxy = httpProxy.createProxyServer({
  target,
  changeOrigin: true,
  secure: false,
  headers: { host },
});

// ===============================
// TUNNEL CONTROL
// ===============================
let tmoleProcess = null;
let hangTimer = null;
let restartTimer = null;
let isRestarting = false;

function resetHangTimer() {
  clearTimeout(hangTimer);

  hangTimer = setTimeout(() => {
    console.log("⚠️ Tunnel hang detected. Restarting...");
    restartTunnel();
  }, HANG_TIMEOUT);
}

function startTunnel() {
  console.log("🚀 Starting TunnelMole...");

  tmoleProcess = spawn("tmole", [port]);

  tmoleProcess.stdout.on("data", (data) => {
    const output = data.toString().trim();
    console.log(output);

    resetHangTimer();

    // Extract https URL
    //const match = output.match(/https:\/\/[^\s]+/);
    const match = output.match(/https:\/\/[a-zA-Z0-9-]+\.tunnelmole\.net/);
    if (match) {
      const tunnelUrl = match[0];

      try {
        fs.writeFileSync("tunnel.txt", tunnelUrl);
        console.log("✅ Tunnel URL saved to tunnel.txt");
      } catch (err) {
        console.error("❌ Failed to write tunnel file:", err.message);
      }
    }
  });

  tmoleProcess.stderr.on("data", (data) => {
    console.error(data.toString().trim());
    resetHangTimer();
  });

  tmoleProcess.on("close", (code) => {
    console.log(`⚠️ TunnelMole exited with code ${code}`);

    if (!isRestarting) {
      console.log("♻️ Auto-restarting tunnel...");
      startTunnel();
    }
  });

  resetHangTimer();
}

function restartTunnel() {
  if (isRestarting) return;

  isRestarting = true;

  console.log("♻️ Restarting tunnel safely...");

  clearTimeout(hangTimer);

  if (tmoleProcess) {
    tmoleProcess.removeAllListeners();
    tmoleProcess.kill();
    tmoleProcess = null;
  }

  setTimeout(() => {
    isRestarting = false;
    startTunnel();
  }, 2000); // small delay before restart
}

// ===============================
// START EVERYTHING
// ===============================
proxy.listen(port, () => {
  console.log(`🌍 Proxy running on http://localhost:${port} -> ${target}`);

  startTunnel();

  // Scheduled 12-hour restart
  restartTimer = setInterval(() => {
    console.log("⏰ 12-hour scheduled restart...");
    restartTunnel();
  }, RESTART_INTERVAL);
});
