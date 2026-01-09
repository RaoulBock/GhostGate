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
```

---

## 🔧 Installation

- git clone https://github.com/your-username/secure-exchange-tunnel.git
- cd secure-exchange-tunnel
- npm install

---

## 🚀 Usage

### Option 1: tunnel.js (Simple & Fixed Configuration)

Use this option when you have *one known internal service* and want minimal setup.

#### 1. Configure

Edit tunnel.js and update the values below:

```js
const PORT = 1234;

target: https://example.domain.local:1234
host: example.domain.local
```

#### 2. Run

```js

node tunne.js
```

#### 2. Output Example

```bash
🔁 Proxy running on http://localhost:1234 -> https://example.domain.local:1234
https://random-name.tunnelmole.net
```

You can now access your internal service using the generated TunnelMole URL

### Option 2: secure-exchange.js (CLI-Based – Recommended)

This option is more flexible and ideal for scripts, automation, or multiple environments.

#### 1. (Optional) Make Executable

```bash
chmod +x secure-exchange.js
```

#### 2. Run with Arguments

```bash
node secure-exchange.js \
  --target https://internal.service.local:8443 \
  --host internal.service.local \
  --port 3000
```

- --target   HTTPS service you want to expose
- --host     Host header (domain only, no port)
- --port     Local port the proxy listens on

#### 3. Output Example

```bash
🚀 Proxy running on http://localhost:3000 -> https://internal.service.local:8443
https://secure-link.tunnelmole.net
```

---

### Example use Cases

- ✔ Test Stripe / PayPal webhooks locally
- ✔ Share internal admin dashboards
- ✔ Expose services behind NAT or firewalls
- ✔ Demo local projects publicly

### 🔒 Security Notes

- * SSL verification is disabled to support self-signed certificates
- * TunnelMole URLs are public and temporary
- * Not recommended for production use without additional security

### 🛠️ Built With

- * Node.js
- * http-proxy
- * TunnelMole

### 📄 License

MIT License

### ⭐️ Support

If you find this project useful, give it a ⭐ on GitHub and share it with others.