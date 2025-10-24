import localtunnel from "localtunnel";

const port = 7108;
const subdomain = "dcappimperial";

async () => {
  try {
    const tunnel = await localtunnel({
      port,
      subdomain,
    });

    console.log("Tunnel started");
    console.log(`Public URI ${tunnel.url}`);
    console.log("Forwarding -> https://dc-bc-app.imperial.local");

    // tunnel.on("close", () => {
    //   console.log("Tunnel closed");
    // });
  } catch (error) {
    console.error("ERROR Starting tunnel", error);
  }
};
