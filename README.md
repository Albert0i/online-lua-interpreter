# 🧠 Online Redis Lua Interpreter

An elegant, single-page web app for writing, executing, and debugging Redis Lua scripts in real time. Built with Node.js, Express, EJS, TailwindCSS, and node-redis, this tool bridges backend logic with a polished frontend interface—designed for developers who want clarity, control, and speed.

---

## 🚀 Overview

Redis Lua scripting is powerful—but testing and debugging scripts can be tedious. This interpreter provides a clean, browser-based environment to:

- Write and run Lua scripts directly against a Redis instance
- View structured output and error messages
- Reset, copy, and tweak scripts with minimal friction
- Explore Redis data structures interactively

Whether you're prototyping atomic operations, experimenting with `EVAL`, or teaching Redis scripting, this tool streamlines the workflow.

---

## 🧰 Tech Stack

| Layer        | Technology        | Purpose                                      |
|--------------|-------------------|----------------------------------------------|
| Backend      | Node.js + Express | API routing, Redis integration               |
| Frontend     | EJS + TailwindCSS | Layout, templating, responsive UI            |
| Redis Client | node-redis        | Lua script execution, key scanning, HGETALL  |
| UI Features  | Vanilla JS        | Clipboard, dynamic resizing, async fetch     |

---

## 🎯 Features

### ✍️ Lua Script Editor
- Write Redis Lua scripts in a resizable textarea
- Syntax-aware formatting (coming soon)
- Supports `EVAL`, `EVALSHA`, and custom key/arg injection

### 📤 Run & Reset
- Execute scripts with a single click
- Reset editor to default template
- Output area shows structured results or error stack

### 📋 Clipboard Integration
- Copy script or output with one click
- Useful for sharing or saving test cases

### 🧪 Redis Key Explorer
- Scan Redis keys with pattern matching
- Filter by type (e.g. HASH, LIST)
- View contents of hashes in real time

### 🧼 Minimal UI
- Clean layout with dark theme
- Responsive design for desktop and mobile
- Logo and favicon branding included

---

## 🧑‍💻 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/online-lua-interpreter.git
cd online-lua-interpreter
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Redis

Update your Redis credentials in `app.js` or `.env`:

```js
const client = createClient({
  socket: {
    host: 'localhost',
    port: 6379
  },
  password: 'your-password',
  // username: 'your-username' // optional if ACLs are enabled
});
```

### 4. Run the Server

```bash
npm start
```

Visit `http://localhost:3000` in your browser.

---

## 🧪 Example Lua Script

```lua
local keys = redis.call("KEYS", "OLI:scripts:*")
local result = {}

for i, key in ipairs(keys) do
  local hash = redis.call("HGETALL", key)
  result[key] = {}

  for j = 1, #hash, 2 do
    result[key][hash[j]] = hash[j + 1]
  end
end

return result
```

This script scans all `OLI:scripts:*` hashes and returns their contents as nested tables.

---

## 📦 API Endpoints

### `GET /api/scripts`
Returns all Redis hash keys matching `OLI:scripts:*`.

### `POST /api/save-user`
Accepts a JSON payload:

```json
{
  "key": "user:1001",
  "fields": {
    "name": "Iong",
    "role": "developer"
  }
}
```

Saves the fields to Redis using `HSET`.

### `POST /api/eval`
Executes a Lua script against Redis. Payload:

```json
{
  "script": "return redis.call('PING')",
  "keys": [],
  "args": []
}
```

Returns the result or error.

---

## 🧠 Design Philosophy

This project is built with a few core principles:

- **Clarity over complexity**: The UI is minimal, the code is readable, and the logic is explicit.
- **Incremental development**: Each feature is modular and testable.
- **Developer empathy**: Everything from layout to error handling is designed to reduce friction.
- **Visual identity**: Branding elements like favicon and logo reinforce the tool’s personality.

---

## 🛠 Development Notes

### Redis Connection Handling

- Uses `node-redis@4.x` with reconnect strategy
- Monitors lifecycle events (`connect`, `ready`, `reconnecting`, `error`)
- Graceful shutdown via `client.quit()`

### Lua Script Execution

- Scripts are passed via `EVAL`
- Keys and args are injected dynamically
- Output is parsed and formatted for readability

### UI Layout

- Header includes title, subtitle, and logo (left and right)
- Editor and output areas are resizable
- Buttons use Tailwind utility classes for styling

---

## 🧪 Testing & Debugging

### Redis CLI

Use the CLI to verify Redis state:

```bash
redis-cli
> HGETALL user:1001
```

### Logging

Verbose logs are printed on reconnect, error, and script execution:

```js
client.on('error', err => console.error('Redis error:', err));
client.on('reconnecting', delay => console.log(`Reconnecting in ${delay}ms`));
```

---

## 📁 Project Structure

```
/public/         → favicon.ico, logo.png
/views/          → EJS templates
/src/routes/     → Express API routes
/src/scripts/    → Lua script templates (optional)
app.js           → Express server setup
```

---

## 🧩 Future Enhancements

- Syntax highlighting with CodeMirror or Monaco
- Lua sandboxing and dry-run mode
- Redis command explorer
- Script history and versioning
- Export results to JSON or clipboard
- Dark/light theme toggle

---

## 🤝 Contributing

Pull requests are welcome! If you have ideas for improving the interpreter, feel free to fork and submit a PR.

### To contribute:

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Submit a pull request

---

## 📜 License

MIT License. See `LICENSE` file for details.

---

## 🙌 Acknowledgments

- Redis for its powerful scripting engine
- Lua for its elegant simplicity
- TailwindCSS for rapid UI prototyping
- node-redis for clean client integration

---

## 💬 Contact

Built by **Iong** — methodical, minimal, and always iterating.

If you find this tool useful or want to collaborate, feel free to reach out or star the repo.
