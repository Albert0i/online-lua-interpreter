# 🐚 Lua Primer: A Comprehensive Guide for Embedded Scripting

Lua is a lightweight, embeddable scripting language with a minimalist syntax and powerful metaprogramming capabilities. It’s widely used in game engines, embedded systems, and tools like Redis for atomic scripting.

---

## 📘 1. Language Overview

- **Designed for embedding**: Lua is often integrated into host applications.
- **Interpreted**: Runs in a virtual machine; no compilation needed.
- **Extensible**: Tables and metatables allow custom behaviors.
- **Functional + Imperative**: Supports closures, recursion, and procedural logic.

---

## 🔤 2. Syntax & Types

### ✍️ Comments
```lua
-- Single-line comment

--[[
   Multi-line comment
]]
```

### 📦 Primitive Types

| Type     | Example            | Notes                          |
|----------|--------------------|--------------------------------|
| `nil`    | `local x = nil`    | Absence of value               |
| `boolean`| `true`, `false`    | Logical values                 |
| `number` | `local n = 3.14`   | All numbers are floats         |
| `string` | `"hello"`          | Immutable, supports concat     |
| `function`| `function() ... end` | First-class citizens       |
| `table`  | `{}`               | Core data structure            |

### 🔢 Type Checking
```lua
print(type("hello"))  --> string
```

---

## 🧮 3. Variables & Scope

### 🧷 Declaration
```lua
local x = 10      -- local scope
y = 20            -- global by default
```

### 🔁 Scope Rules
- Functions and blocks create new scopes.
- Always prefer `local` for safety and performance.

---

## 🧠 4. Control Flow

### 🔀 Conditionals
```lua
if x > 0 then
  print("Positive")
elseif x == 0 then
  print("Zero")
else
  print("Negative")
end
```

### 🔄 Loops

#### Numeric `for`
```lua
for i = 1, 5 do
  print(i)
end
```

#### Generic `for` (iterator)
```lua
for k, v in pairs({a = 1, b = 2}) do
  print(k, v)
end
```

#### `while` and `repeat`
```lua
while x < 100 do
  x = x * 2
end

repeat
  x = x - 1
until x == 0
```

---

## 🧰 5. Tables: Arrays, Maps, Objects

Tables are the only data structure in Lua.

### 📦 Creation
```lua
local t = {name = "Albatross", speed = 12}
```

### 🔍 Access
```lua
print(t.name)        -- dot syntax
print(t["speed"])    -- bracket syntax
```

### 🔧 Mutation
```lua
t.altitude = 3000
```

### 🔁 Iteration
```lua
for key, value in pairs(t) do
  print(key, value)
end
```

### 📚 Array-style
```lua
local arr = {"a", "b", "c"}
for i = 1, #arr do
  print(arr[i])
end
```

---

## 🧩 6. Functions & Closures

### 🧠 Declaration
```lua
function greet(name)
  return "Hello, " .. name
end
```

### 🧬 Anonymous & Closure
```lua
local function adder(x)
  return function(y) return x + y end
end

local add5 = adder(5)
print(add5(3))  -- 8
```

### 🔄 Recursion
```lua
function factorial(n)
  if n == 0 then return 1 end
  return n * factorial(n - 1)
end
```

---

## 🧙‍♂️ 7. Metatables & Metamethods

Metatables allow custom behavior for tables.

### 🧪 Example: Operator Overloading
```lua
local mt = {
  __add = function(a, b)
    return {val = a.val + b.val}
  end
}

local a = {val = 10}
local b = {val = 20}
setmetatable(a, mt)
setmetatable(b, mt)

local c = a + b
print(c.val)  -- 30
```

### 🔮 Common Metamethods

| Metamethod   | Purpose                     |
|--------------|-----------------------------|
| `__index`    | Fallback for missing keys   |
| `__newindex` | Custom assignment behavior  |
| `__add`      | `+` operator                |
| `__call`     | Callable table              |
| `__tostring` | Custom string representation|

---

## 🧵 8. Modules & Namespaces

Lua doesn’t have built-in modules, but you can simulate them:

```lua
local M = {}

function M.say_hi()
  print("Hi from module")
end

return M
```

Usage:
```lua
local mod = require("mod")
mod.say_hi()
```

---

## 🔗 9. Redis Lua Scripting

Lua scripts in Redis are atomic and sandboxed.

### 🧪 Example
```lua
local key = KEYS[1]
local value = ARGV[1]

redis.call("SET", key, value)
return redis.call("GET", key)
```

### 🧷 Notes
- Use `KEYS[]` for keys, `ARGV[]` for arguments.
- Avoid long loops or blocking operations.
- Scripts are cached by SHA1 hash.

### 🧠 Common Redis Lua Patterns

#### Conditional Set
```lua
if redis.call("EXISTS", KEYS[1]) == 0 then
  redis.call("SET", KEYS[1], ARGV[1])
end
```

#### Atomic Increment
```lua
local current = redis.call("GET", KEYS[1])
current = tonumber(current) or 0
redis.call("SET", KEYS[1], current + 1)
```

---

## 🛠️ 10. Tooling & Ecosystem

- **LuaJIT**: High-performance JIT compiler
- **luarocks**: Package manager
- **Fennel**: Lisp-like syntax for Lua
- **LOVE2D**: Game engine using Lua
- **Redis**: Embeds Lua for atomic scripts

---

## 🧼 11. Idioms & Best Practices

- Always use `local` unless global is intentional.
- Use tables for modules, objects, and namespaces.
- Prefer `pairs()` for maps, `ipairs()` for arrays.
- Embrace closures and functional patterns.
- Keep scripts short and readable—Lua rewards clarity.
