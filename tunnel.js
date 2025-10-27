// tunnel.js
import localtunnel from "localtunnel";

const port = 7108; // your local app port
const subdomain = "dcappimperial"; // optional (try custom name, else random)

(async () => {
  try {
    const tunnel = await localtunnel({
      port,
      subdomain,
    });

    console.log(`🚀 Tunnel started!`);
    console.log(`Public URL: ${tunnel.url}`);
    console.log(`Forwarding -> https://dc-bc-app.imperial.local:${port}`);

    tunnel.on("close", () => {
      console.log("❌ Tunnel closed");
    });
  } catch (err) {
    console.error("Error starting tunnel:", err);
  }
})();
