# 🔒 Security Scan Report — Uncanny Coffee Hour
**Date:** April 7, 2026
**Scope:** Full project source, dist output, server-side files, environment config

---

## Summary

| Severity | Count |
|---|---|
| 🔴 High | 1 |
| 🟡 Medium | 2 |
| 🔵 Low / Informational | 3 |
| ✅ Passing | 7 |

---

## 🔴 High

### 1. `VITE_` prefix on Buzzsprout API token in `.env`

**File:** `.env`
**Finding:** The `.env` file contains `VITE_BUZZSPROUT_TOKEN=...`. In Vite, any variable prefixed with `VITE_` is **automatically inlined into the public JavaScript bundle** at build time — meaning it would be readable by anyone who views your site's source. While the token isn't currently used in any frontend code, having this naming convention is a latent trap: any developer who adds `import.meta.env.VITE_BUZZSPROUT_TOKEN` to a component will immediately expose it to the public.

**What to do:** Rename it to remove the `VITE_` prefix. Since this token is only used by the Python fetch script, it has no reason to be VITE-prefixed:

```
# .env — change this:
VITE_BUZZSPROUT_TOKEN=your_token    ← dangerous naming

# to this:
BUZZSPROUT_API_TOKEN=your_token     ← already present, this is the right one
```

Then remove the `VITE_BUZZSPROUT_TOKEN` line entirely. The Python script already reads `BUZZSPROUT_API_TOKEN` correctly.

---

## 🟡 Medium

### 2. Unescaped HTML rendered from API data (`dangerouslySetInnerHTML`)

**File:** `src/pages/Episodes.jsx`, line 94
**Finding:** Episode descriptions fetched from the Buzzsprout API are rendered directly as raw HTML:

```jsx
dangerouslySetInnerHTML={{ __html: ep.description }}
```

The risk is relatively low because Buzzsprout is a trusted source and the data is baked in at build time (not fetched live in the browser). However, if Buzzsprout's platform were ever compromised, or if the `episodes.json` file were tampered with, malicious `<script>` tags or other payloads could run in users' browsers (XSS).

**What to do:** Sanitize the HTML with [DOMPurify](https://github.com/cure53/DOMPurify) before rendering:

```bash
npm install dompurify
```

```jsx
import DOMPurify from 'dompurify';

// Then in the component:
dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(ep.description) }}
```

---

### 3. CORS wildcard on `submit.php`

**File:** `dist/submit.php`, line 2
**Finding:** The PHP handler sets:

```php
header("Access-Control-Allow-Origin: *");
```

This allows any website on the internet to POST to your story submission endpoint, not just your own domain. While the honeypot field and server-side sanitization reduce the risk of malicious content, this still makes it easy for anyone to programmatically spam your inbox.

**What to do:** Lock the CORS header to your own domain:

```php
header("Access-Control-Allow-Origin: https://uncannycoffeehour.com");
```

---

## 🔵 Low / Informational

### 4. No rate limiting on `submit.php`

**File:** `dist/submit.php`
**Finding:** A determined attacker (or automated script) can bypass the honeypot and flood the endpoint with story submissions, spamming your email. There is no rate limiting in place.

**What to do:** Consider adding server-level rate limiting (e.g., in your `.htaccess` or nginx config), or add a CAPTCHA (hCaptcha is a privacy-friendly option). A simple PHP session-based cooldown could also help.

---

### 5. No Content Security Policy (CSP) headers

**Finding:** There are no CSP headers defined in the PHP handler or (presumably) the server config. A CSP tells browsers which scripts and resources are allowed to run, providing a strong second line of defence against XSS even if an injection occurs.

**What to do:** Add to your server config or a `.htaccess` file (adjust based on which CDNs/scripts you use):

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://www.googletagmanager.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline';
```

---

### 6. GA Tracking ID is semi-public via `VITE_GA_TRACKING_ID`

**File:** `.env`, `src/components/GoogleAnalytics/GoogleAnalytics.jsx`
**Finding:** The Google Analytics tracking ID (`G-XXXXXXX`) is exposed in the frontend bundle via `import.meta.env.VITE_GA_TRACKING_ID`. This is very common and generally accepted — GA tracking IDs are designed to be public (they appear in your page source whenever GA loads). No action required, but be aware this ID will be visible to anyone who inspects your site.

---

## ✅ Passing Checks

These are things you're doing right — worth noting so they don't accidentally get removed.

- **`.env` is in `.gitignore`** — your credentials will not be committed to git
- **No hardcoded secrets in source code** — no API keys or tokens found in `src/` or `fetch_episodes.py`
- **Buzzsprout API token is NOT in the built JS bundle** — despite being in `.env`, it's not referenced in any frontend code, so it stays server-side only
- **PHP form sanitizes user input properly** — `htmlspecialchars()` and `strip_tags()` are both applied to name and story fields
- **Honeypot bot trap on story form** — the hidden `bot_field` is a good lightweight anti-spam measure
- **External links use `rel="noopener noreferrer"`** — prevents tab-napping attacks from the Shop page links
- **No `eval()` usage anywhere** — none found in any source files

---

## Priority Action List

1. 🔴 **Remove `VITE_BUZZSPROUT_TOKEN` from `.env`** (the duplicate with the dangerous prefix)
2. 🟡 **Install DOMPurify and wrap the `dangerouslySetInnerHTML` call** in Episodes.jsx
3. 🟡 **Restrict CORS in `submit.php`** to your domain only
4. 🔵 Add rate limiting or CAPTCHA to the Whispering Well form
5. 🔵 Add a Content Security Policy header to your server config
