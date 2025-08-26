
### 🍪 Why `getCookie` and `setCookie` Work Without `domain`

#### ✅ 1. **Default Domain Behavior**
- When you set a cookie via JavaScript without specifying `domain`, the browser automatically assigns the cookie to the **current domain** (i.e. the domain of the page you're on).
- This means it works seamlessly on both `localhost` and production domains like `example.com`.

```js
document.cookie = "theme=dark; path=/";
```

This sets the cookie for the current domain—whether it's `localhost`, `127.0.0.1`, or `yourdomain.com`.

---

#### ✅ 2. **Same-Origin Access**
- `document.cookie` only accesses cookies that match the current origin (domain + protocol + port).
- So when you call `getCookie()`, you're only seeing cookies that belong to the current page’s domain and path scope.

---

#### ✅ 3. **Security Restrictions Prevent Overreach**
- You **can’t** read or write cookies for other domains (e.g. `google.com`) from your site.
- That’s why the browser doesn’t require you to specify a domain—it already knows the only domain you’re allowed to touch.

---

### ⚠️ Why This Matters for `deleteCookie`

When deleting a cookie, the browser will only remove it if:
- The `name` matches
- The `path` matches
- The `domain` matches (or is omitted and matches current domain)
- The cookie is not `HttpOnly`

So if the original cookie was set with a specific `domain`, and you omit it during deletion, the browser won’t recognize it as the same cookie—and it won’t delete it.

---

### 🧭 Summary Table

| Action         | Domain Required? | Why It Works |
|----------------|------------------|--------------|
| `setCookie()`  | ❌ (optional)     | Defaults to current domain |
| `getCookie()`  | ❌               | Only reads cookies from current domain |
| `deleteCookie()` | ⚠️ Sometimes   | Must match domain/path of original cookie |

