import httpProxy from "http-proxy";
import { spawn } from "child_process";

const proxy = httpProxy.createProxyServer({
  target: "https://dc-bc-app.imperial.local:7108",
  changeOrigin: true,
  secure: false, // ignore self-signed certs
  headers: {
    host: "dc-bc-app.imperial.local",
  },
});

proxy.listen(7108, () => {
  console.log("🔁 Proxy running on http://localhost:7108 -> https://dc-bc-app.imperial.local:7108");

  // Start Tunnelmole CLI
  const tmole = spawn("tmole", ["7108"]);

  tmole.stdout.on("data", (data) => console.log(data.toString()));
  tmole.stderr.on("data", (data) => console.error(data.toString()));
});