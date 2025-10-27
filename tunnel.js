// tunnel.js
import { spawn } from "child_process";

const port = 7108;
const subdomain = "dcappimperial"; // change if it's already taken

console.log("🚀 Starting LocalTunnel...");

const tunnel = spawn("npx", [
  "localtunnel",
  "--port",
  port.toString(),
  "--subdomain",
  subdomain,
  "--no-auth", // disables password prompt
]);

tunnel.stdout.on("data", (data) => {
  const output = data.toString();
  console.log(output);

  // Extract and show the public URL nicely
  const match = output.match(/https:\/\/[^\s]+\.loca\.lt/);
  if (match) {
    console.log(🌍 Public URL: ${match[0]});
    console.log(🔁 Forwarding -> http://localhost:${port});
  }
});

tunnel.stderr.on("data", (data) => {
  console.error("⚠ Error:", data.toString());
});

tunnel.on("close", (code) => {
  console.log(❌ Tunnel closed (exit code ${code}));
});