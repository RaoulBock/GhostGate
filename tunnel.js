import httpProxy from "http-proxy";
import { spawn } from "child_process";

const PORT = 1234;

const proxy = httpProxy.createProxyServer({
  target: `https://example.domain.local:${PORT}`, // Change to web service link and port
  changeOrigin: true,
  secure: false, // ignore self-signed certs
  headers: {
    host: "example.domain.local", // Change to host domain without port
  },
});

proxy.listen(PORT, () => {
  console.log(
    `🔁 Proxy running on http://localhost:${PORT} -> https://example.domain.local:${PORT}` // Change to web service link and port
  );

  // Start Tunnelmole CLI
  const tmole = spawn("tmole", [`${PORT}`]);

  tmole.stdout.on("data", (data) => console.log(data.toString()));
  tmole.stderr.on("data", (data) => console.error(data.toString()));
});
