# ♿ Accessibility Audit Report — Uncanny Coffee Hour
**Date:** April 7, 2026
**Standard:** WCAG 2.1 AA
**Scope:** Full JSX component tree, HTML base, SCSS

---

## Summary

| Severity | Count |
|---|---|
| 🔴 High | 2 |
| 🟡 Medium | 5 |
| 🔵 Low / Informational | 5 |
| ✅ Passing | 10 |

---

## 🔴 High

### 1. No focus trap in GameModal

**File:** `src/components/Games/GameModal.jsx`

When a modal dialog opens, keyboard focus must be trapped inside it. Currently the modal has `role="dialog"` and `aria-modal="true"`, and ESC closes it — but focus is never moved into the modal on open, and a keyboard user can tab freely to elements behind it. This is a significant barrier for screen reader and keyboard-only users.

**What to do:** On mount, move focus to the first focusable element inside the modal. On close, return focus to the trigger element. The cleanest solution is to add a `useEffect` and `ref`:

```jsx
// GameModal.jsx
const modalRef = useRef(null);

useEffect(() => {
  if (isOpen && modalRef.current) {
    const focusable = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();
  }
}, [isOpen]);

// Then attach: <div className="game-modal-content" ref={modalRef} ...>
```

For a full focus trap (preventing Tab from escaping), consider adding a `keydown` listener that cycles focus within the modal's focusable elements.

---

### 2. Audio player scrubber has no accessible label

**File:** `src/components/AudioPlayer/AudioPlayer.jsx`

The `<input type="range">` progress bar has no label. Screen readers will announce it as just "slider" with no context about what it controls or what the current position means.

**What to do:** Add `aria-label` and `aria-valuetext` to give context:

```jsx
<input
  type="range"
  min="0"
  max={duration || 0}
  value={progress}
  onChange={handleProgressChange}
  className="progress-bar"
  aria-label="Episode progress"
  aria-valuetext={`${formatTime(progress)} of ${formatTime(duration)}`}
  style={{ backgroundSize: `${(progress / duration) * 100}% 100%` }}
/>
```

---

## 🟡 Medium

### 3. Multiple `<h1>` elements on the same page

**Files:** `src/pages/About.jsx`, `src/pages/Home.jsx`

The About page has four `<h1>` tags used as section headers ("Uncanny Coffee Hour", "About the Show", "Friends and recommendations", "What is a podcast"). The Home page similarly uses `<h1>` for the Whispering Well section alongside the page's main `<h1>`. There should be exactly one `<h1>` per page — additional section titles should use `<h2>`.

**What to do:** In `About.jsx`, keep the first `<h1>` as the page title and convert all others to `<h2>`:

```jsx
// Keep:
<h1>{t('app.title')}</h1>

// Change these to h2:
<h2>{t('aboutpage.about')}</h2>
<h2>{t('aboutpage.friendo_title')}</h2>
<h2>{t('aboutpage.what_podcast')}</h2>
```

In `Home.jsx`, change the Whispering Well heading:
```jsx
// Change:
<h1>{t("homepage.whisperwellhead")}</h1>
// To:
<h2>{t("homepage.whisperwellhead")}</h2>
```

---

### 4. Hamburger button missing `aria-expanded`

**File:** `src/components/Header/Header.jsx`

The hamburger `<button>` has `aria-label="Menu"` but doesn't communicate its open/closed state to assistive technologies. `aria-expanded` should be set on the toggle button.

**What to do:**

```jsx
<button
  className={`hamburger ${isMobileOpen ? 'active' : ''}`}
  onClick={toggleMobile}
  aria-label="Menu"
  aria-expanded={isMobileOpen}
  aria-controls="mobile-nav"
>
```

And add a matching `id` to the mobile nav:
```jsx
<div id="mobile-nav" className={`mobile-nav-overlay ${isMobileOpen ? 'open' : ''}`}>
```

---

### 5. `<nav>` elements have no distinguishing labels

**File:** `src/components/Header/Header.jsx`

There are two `<nav>` elements on the page (desktop and mobile). When a screen reader lists landmark regions, it will show two unlabelled "navigation" entries, which is confusing.

**What to do:** Add `aria-label` to each:

```jsx
<nav className="header-nav desktop-nav" aria-label="Main navigation">
// ...
<nav className="mobile-links" aria-label="Mobile navigation">
```

---

### 6. GameModal missing `aria-labelledby`

**File:** `src/components/Games/GameModal.jsx`

The game modal has `role="dialog"` and `aria-modal="true"` but no `aria-labelledby` to announce what the dialog is about when opened. (The instruction modal in `Games.jsx` does this correctly with `aria-labelledby="modal-title"`.)

**What to do:** Pass the game title into GameModal and use it:

```jsx
// In GameModal, accept a title prop and add a hidden (or visible) heading:
<div className="game-modal-content" ref={modalRef} aria-labelledby="game-modal-title">
  <h2 id="game-modal-title" className="sr-only">{title}</h2>
  ...
```

Then pass it from Games.jsx:
```jsx
<GameModal isOpen={!!activeGame} onClose={closeGame} title={t(`${activeGame.id}.title`)}>
```

---

### 7. Home page inline `<audio>` has no captions track

**File:** `src/pages/Home.jsx`

The audio element for the latest episode player has no `<track kind="captions">` element, unlike the `AudioPlayer` component which correctly includes one. Both should be consistent.

**What to do:**
```jsx
<audio ref={audioRef} src={latestEpisode.audioUrl} onEnded={() => setIsPlaying(false)}>
  <track kind="captions" />
</audio>
```

---

## 🔵 Low / Informational

### 8. Form inputs use implicit label association

**File:** `src/pages/SubmitStory.jsx`

The story form wraps inputs inside `<label>` elements (implicit association), which works but has uneven support in older assistive technologies. Explicit `htmlFor`/`id` pairing is the most robust approach.

**What to do:**
```jsx
<label htmlFor="field-name">
  <span>{t('storypage.form_name')}</span>
  <input id="field-name" type="text" name="name" ... />
</label>

<label htmlFor="field-story">
  <span>{t('storypage.form_story')}</span>
  <textarea id="field-story" name="story" ... />
</label>
```

---

### 9. Generic alt text on episode cover and bio images

**Files:** `src/pages/Home.jsx`, `src/components/Team/Bio.jsx`

`alt="Episode Art"` on the Home player doesn't describe what the image actually shows, and `alt="${member.name} ${i + 1}"` produces strings like "Bob 2" which aren't meaningful.

**What to do:** In `Home.jsx`, use the episode title:
```jsx
alt={latestEpisode?.title ? `Cover art for ${latestEpisode.title}` : 'Episode cover art'}
```
In `Bio.jsx`, a descriptive generic is fine since individual photo descriptions aren't known at runtime:
```jsx
alt={`Photo of ${member.name}`}
```

---

### 10. `prefers-reduced-motion` mixin is not used on all animated elements

**File:** `src/styles/_mixins.scss`

The project has a `prefers-reduced-motion: no-preference` mixin, but the waveform bars on the Home player (50 animated `<span>` elements) and the SaucerGame likely animate without checking this preference. Users who request reduced motion (e.g., those with vestibular disorders) may experience discomfort.

**What to do:** Ensure all CSS animations and transitions are wrapped in the mixin or in `@media (prefers-reduced-motion: no-preference)` blocks. Animations should be off by default or instant, only enabled when the user has no preference against them.

---

### 11. SaucerGame has no screen reader alternative

**File:** `src/components/Games/SaucerGame.jsx`

The game uses DOM-rendered emoji characters controlled by keyboard input, with no screen reader equivalent or description of game state. This is typical for browser games, but worth noting.

**Minimal improvement:** Add a `role="application"` wrapper with `aria-label="Saucer game"` and a brief `aria-describedby` description, and ensure the start/retry buttons are clearly labelled.

---

## ✅ Passing Checks

The following are done well and should be preserved:

- **Skip link** — `<a href="#main-content">` in `App.jsx` paired with `<main id="main-content">` ✅
- **`lang` attribute dynamically updated** — `LanguageSwitcher` sets `document.documentElement.lang` on change ✅
- **Hero image is correctly decorative** — `alt=""` on the background hero image ✅
- **Friend icons are correctly decorative** — `alt=""` on icon images in About page ✅
- **`aria-expanded` on language dropdown** — Correctly reflects open/closed state ✅
- **ESC key closes GameModal** — Keyboard dismissal implemented ✅
- **Game tiles have full keyboard support** — `role="button"`, `tabIndex`, and `onKeyDown` with Enter/Space ✅
- **Team section uses `aria-labelledby`** with a visually-hidden heading ✅
- **Play/Pause buttons have `aria-label`** — Throughout AudioPlayer and Home player ✅
- **`prefers-reduced-motion` mixin exists** in SCSS — Foundation is there ✅

---

## Priority Action List

1. 🔴 **Add focus trap to GameModal** — move focus on open, return it on close
2. 🔴 **Label the audio player scrubber** with `aria-label` and `aria-valuetext`
3. 🟡 **Fix heading hierarchy** — one `<h1>` per page, demote section headings in About & Home
4. 🟡 **Add `aria-expanded` + `aria-controls` to hamburger button**
5. 🟡 **Add `aria-label` to both `<nav>` elements**
6. 🟡 **Add `aria-labelledby` to GameModal**
7. 🟡 **Add `<track kind="captions">` to Home page audio element**
8. 🔵 Use explicit `htmlFor`/`id` on SubmitStory form fields
9. 🔵 Improve alt text on episode cover and bio images
10. 🔵 Audit animated elements for `prefers-reduced-motion` coverage
