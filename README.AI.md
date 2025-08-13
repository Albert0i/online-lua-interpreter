# 🧠 Online Lua Interpreter  
*A web-based Lua script editor and executor using Node.js, Redis, and TailwindCSS.*

---

## 🪞 Prologue

In an era where developer tools are increasingly moving to the browser, the idea of an **Online Lua Interpreter** is both timely and powerful. Lua, a lightweight and embeddable scripting language, has long been a favorite in game development, embedded systems, and configuration scripting. Yet, its online tooling has lagged behind more mainstream languages.

This project bridges that gap—offering a minimalist, performant, and extensible Lua scripting environment directly in the browser. Built with **Node.js**, **Redis**, and **TailwindCSS**, it’s not just a playground—it’s a serious tool for prototyping, debugging, and learning Lua.

---

## 🧩 I. Features

### ✍️ Write and Run Lua Scripts
Users can write Lua code in a resizable, syntax-aware text area. The interface is intentionally minimal—no distractions, just code. Upon clicking "Run", the script is sent to the backend, executed via Redis's Lua engine, and the output is returned in real-time.

### 🗝️ Pass KEYS and ARGV Parameters
Redis Lua scripts often rely on `KEYS` and `ARGV` arrays. This interpreter provides dedicated input boxes for both, allowing users to simulate real-world Redis script execution with custom parameters.

### 📡 View Output in Real-Time
The output area updates instantly after execution, showing return values, errors, or logs. This feedback loop is essential for debugging and learning.

### 💾 Save, Load, and Delete Scripts
Users can persist scripts to Redis, retrieve them later, and delete them when no longer needed. This transforms the tool from a one-off executor into a lightweight Lua IDE.

---

## 🛠️ II. Setup

### 🔧 Clone & Install

```bash
git clone https://github.com/Albert0i/online-lua-interpreter
cd online-lua-interpreter
npm install
```

### 🔐 Environment Configuration

Create a `.env` file with your Redis credentials:

```env
HOST=localhost
PORT=3000

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_USERNAME=default
REDIS_PASSWORD=123456
```

### 🚀 Run the Server

```bash
npm run dev
```

Open your browser to `http://localhost:3000` and start scripting.

---

## 🖼️ UI Overview

![alt screen1](img/screen1.JPG)

The interface is split into three main zones:

- **Script Editor**: A large text area for writing Lua code.
- **KEYS / ARGV Inputs**: Small textboxes for Redis parameters.
- **Output Area**: Displays results or errors after execution.

Buttons include:

- **Run**: Executes the script.
- **Reset**: Clears all fields.
- **Save / Load / Delete**: Manage scripts in Redis.

---

## 🧪 III. Under the Hood

### 🧬 Node.js + Express
The backend is powered by Express, handling routes for script execution, storage, and retrieval. It parses incoming Lua code, KEYS, and ARGV, and sends them to Redis using `node-redis`.

### 🧠 Redis Lua Execution
Redis supports Lua scripting natively. The interpreter uses `EVAL` or `EVALSHA` to run scripts. This allows for atomic operations and direct interaction with Redis data.

### 🎨 TailwindCSS
The frontend uses Tailwind via CDN for rapid styling. The layout is responsive, clean, and customizable. Buttons, inputs, and text areas are styled with utility classes for consistency.

### 🧱 EJS Templating
EJS renders the HTML server-side, allowing dynamic injection of saved scripts, output messages, and UI state.

---

## 🧭 IV. Use Cases

### 🔍 Debugging Redis Scripts
Redis Lua scripts can be tricky to debug. This tool allows developers to test scripts in isolation, with custom KEYS and ARGV, before deploying them to production.

### 📚 Learning Lua
Beginners can experiment with Lua syntax, control structures, and functions without installing anything. The real-time feedback makes it ideal for tutorials and workshops.

### 🧪 Prototyping Algorithms
Need to test a sorting algorithm or a data transformation? Write it in Lua and run it instantly. The interpreter is fast enough for iterative experimentation.

### 🧰 Building Redis Utilities
Developers building Redis-based tools can use this interpreter to prototype Lua scripts that will later be embedded in their apps.

---

## 🧱 V. Architecture

### 📦 Folder Structure

```
online-lua-interpreter/
├── public/
│   └── styles.css
├── views/
│   └── index.ejs
├── routes/
│   └── interpreter.js
├── app.js
├── .env
└── package.json
```

### 🔄 Execution Flow

1. User writes Lua code and inputs KEYS/ARGV.
2. Clicks "Run".
3. Frontend sends POST request to `/run`.
4. Backend parses inputs and calls Redis `EVAL`.
5. Redis executes the script and returns output.
6. Output is displayed in the UI.

---

## 🧠 VI. Redis Lua Primer

Lua in Redis is powerful because it allows atomic execution of multiple commands. Here's a simple example:

```lua
-- Increment a key
local key = KEYS[1]
local increment = tonumber(ARGV[1])
local current = tonumber(redis.call("GET", key) or "0")
redis.call("SET", key, current + increment)
return current + increment
```

This script:

- Takes a key name and increment value.
- Reads the current value.
- Adds the increment.
- Stores and returns the new value.

Using the interpreter, you can test this with:

- `KEYS`: `counter`
- `ARGV`: `5`

---

## 📚 VII. Bibliography

1. [Online Demo](https://lua-interpreter.onrender.com/)
2. [Lua Online Compiler & Interpreter](https://onecompiler.com/lua)
3. [JDoodle Lua Compiler](https://www.jdoodle.com/execute-lua-online)
4. [TutorialsPoint Lua Compiler](https://www.tutorialspoint.com/compilers/online-lua-compiler.htm)

---

## 🧠 VIII. Comparisons

| Feature               | Online Lua Interpreter | OneCompiler | JDoodle | TutorialsPoint |
|----------------------|------------------------|-------------|---------|----------------|
| Redis Lua Support     | ✅ Yes                 | ❌ No       | ❌ No   | ❌ No          |
| KEYS / ARGV Inputs    | ✅ Yes                 | ❌ No       | ❌ No   | ❌ No          |
| Save / Load Scripts   | ✅ Yes                 | ✅ Yes      | ✅ Yes  | ✅ Yes         |
| UI Customization      | ✅ TailwindCSS         | ❌ Limited  | ❌ Basic| ❌ Basic       |
| Backend Integration   | ✅ Node.js + Redis     | ❌ None     | ❌ None | ❌ None        |

---

## 🧪 IX. Future Enhancements

- **Syntax Highlighting**: Integrate CodeMirror or Monaco for better editing.
- **Authentication**: Allow users to log in and manage their scripts.
- **Versioning**: Track changes to scripts over time.
- **Redis Browser**: Visualize Redis keys and values alongside the interpreter.
- **Mobile Optimization**: Improve layout for small screens.

---

## 🧠 X. Developer Notes

### 🧼 Reset Function

```js
function handleReset() {
  document.getElementById('keysInput')?.value = '';
  document.getElementById('argvInput')?.value = '';
  document.getElementById('scriptEditor')?.value = '';
}
```

### 🧪 Run Script

```js
async function runScript() {
  const script = document.getElementById('scriptEditor').value;
  const keys = document.getElementById('keysInput').value.split(',');
  const argv = document.getElementById('argvInput').value.split(',');

  const response = await fetch('/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ script, keys, argv })
  });

  const result = await response.json();
  document.getElementById('outputArea').textContent = result.output;
}
```

---

## 🧠 XI. Why Lua?

Lua is:

- **Fast**: Compiled to bytecode and executed efficiently.
- **Embeddable**: Easily integrated into C/C++ apps.
- **Minimal**: Small footprint, ideal for embedded systems.
- **Flexible**: Supports functional, procedural, and data-driven paradigms.

Its use in Redis makes it a natural choice for server-side scripting.

---

## 🧠 XII. Community & Contributions

This project is open-source. Contributions are welcome—whether it’s improving the UI, adding features, or writing documentation. Fork it, build on it, and share your ideas.

---

## 🧠 XIII. Epilogue

The **Online Lua Interpreter** is more than a tool—it’s a philosophy. It embodies minimalism, clarity, and control. It empowers developers to experiment, learn, and build with Lua in a modern

