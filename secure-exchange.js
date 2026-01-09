#!/usr/bin/env node
import httpProxy from "http-proxy";
import { spawn } from "child_process";

// --- Parse Command Line Arguments ---
const args = process.argv.slice(2);
const options = {};

args.forEach((arg, index) => {
  if (arg.startsWith("--")) {
    const key = arg.replace("--", "");
    const value = args[index + 1];
    options[key] = value;
  }
});

if (process.argv.includes("--help")) {
  console.log(`
GhostGate v1.2.0

Secure HTTPS tunneling using TunnelMole

Usage:
  ghostgate --target <url> --host <hostname> --port <number>

Options:
  --target   HTTPS service to expose
  --host     Host header (no port)
  --port     Local proxy port
  --help     Show this help message
`);
  process.exit(0);
}

// --- Validate Required Arguments ---
const required = ["target", "host", "port"];
for (const key of required) {
  if (!options[key]) {
    console.error(`❌ Missing required argument: --${key}`);
    console.log(
      `Usage: node tunnel.js --target <url> --host <hostname> --port <number>`
    );
    process.exit(1);
  }
}

const { target, host, port } = options;

const proxy = httpProxy.createProxyServer({
  target,
  changeOrigin: true,
  secure: false, // ignore self-signed certs
  headers: { host },
});

proxy.listen(port, () => {
  console.log(`🚀 Proxy running on http://localhost:${port} -> ${target}`);

  // --- Start TunnelMole ---
  const tmole = spawn("tmole", [port]);

  tmole.stdout.on("data", (data) => console.log(data.toString().trim()));
  tmole.stderr.on("data", (data) => console.error(data.toString().trim()));
  tmole.on("close", (code) =>
    console.log(`TunnelMole exited with code ${code}`)
  );
});
