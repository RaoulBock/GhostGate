# Node.js Tunnel with Tunnelmole

This project allows you to expose your *local HTTPS server* to the internet using [Tunnelmole](https://tunnelmole.com/) with optional reverse proxy support for custom host headers, similar to ngrok. Perfect for testing APIs like Business Central or other local services from anywhere.

---

## Features

- Expose your local HTTPS server to the internet with a public HTTPS URL.
- Supports custom host headers via a local reverse proxy.
- No password prompts (unlike LocalTunnel defaults).
- Works on Linux, macOS, and Windows.
- Simple Node.js setup — no paid accounts needed.

---

## Requirements

- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)
- Local HTTPS server running on your machine (e.g., https://localhost.local:7108)
- Internet connection

---

## Installation

1. Clone this repository:

```bash
git clone https://github.com/RaoulBock/my-tunnel.git
cd node-tunnel
```

2. Install dependencies
```bash
npm install
```

3. Install Tunnelmole globally (or locally)
```bash
npm install -g tunnelmole
# or local version
# npm install tunnelmole --save-dev
```
---

## Usage - Tunnel with HTTPS + Custom Host Header

- If your app requires HTTPS or a specific host header, use the Nodejs proxy script:

```bash
node tunnel.js

# This will Start a local HTTP proxy on "http://localhost:7108".
# Forward traffic to your HTTPS server "https://localhost.local:7108".
# Set the correct host header automatically.
# Start a tunnelmole tunnel and give you a public HTTPS URL.

```

