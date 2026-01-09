# Secure Exchange Tunnel 🔐🌍

A lightweight Node.js utility that *securely proxies local or internal HTTPS services* and exposes them to the internet using *TunnelMole*.  
Perfect for *testing webhooks, **sharing internal dashboards, or **exposing services behind firewalls* without complex configuration.

This project provides *two ways to run the tunnel*:
- A *simple fixed configuration* (tunnel.js)
- A *flexible CLI-based tool* (secure-exchange.js)

---

## ✨ Features

- 🔁 Reverse proxy using http-proxy
- 🔐 Works with self-signed HTTPS certificates
- 🌍 Public exposure via *TunnelMole*
- 🧰 CLI support for dynamic configuration
- ⚡ Minimal setup, fast to use

---

## 📦 Requirements

- *Node.js* v24.12.0+
- *TunnelMole CLI* installed globally  
  ```bash
  npm install -g tunnelmole

---

## 📁 Project Structure

```bash
.
├── tunnel.js
├── secure-exchange.js
├── package.json
└── README.md