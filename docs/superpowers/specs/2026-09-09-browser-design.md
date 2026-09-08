# Browser Harden Design

**Date:** 2026-09-09  
**Status:** Approved  
**Approach:** Harden current Browser (Approach A)

## Goal

Make the portfolio `Browser` a reliable single-document OS-style browser for real web iframes and PDF embeds: working history, clear address-bar behavior, loading/timeout fallbacks, bookmarks, and accessible chrome — without changing call-site APIs.

## Non-goals

- Tabs, download manager, search engine
- Proxying or rewriting sites that block embedding
- Reading cross-origin iframe `location` after in-page navigations
- Curated React “fake websites” instead of real iframes
- Redesigning modal chrome outside Browser

## Decisions

- Real-web iframes with graceful fallbacks when embedding fails or is slow
- Single document (no tabs)
- Default home: `https://en.wikipedia.org/`
- Bookmarks: Wikipedia, Resume (`./resume.pdf`), Calendly (`https://calendly.com/jainprashul/30min`), GitHub (`https://github.com/jainprashul`)
- Call sites unchanged: `<Browser website={...} />`

## Architecture

### `browserUtils.ts`

Pure helpers:

- `normalizeUrl(input)` — trim; keep relative/`./` paths; prepend `https://` when no scheme
- `isPdfUrl(url)` — path ends with `.pdf` (ignore query/hash)
- `pushHistory(stack, index, url)` — truncate forward entries, append, return `{ stack, index }`

### `Browser.tsx`

State:

- `committedUrl` — what the viewport shows
- `addressDraft` — address field text; commits only on Enter / Go
- `history: string[]` + `historyIndex` — owned by React (never `iframe.contentWindow.history`)
- `status: 'idle' | 'loading' | 'loaded' | 'blocked'`
- `slowLoad` — soft timeout banner flag
- `viewportKey` — remount iframe/embed on refresh

Navigation:

- Back / Forward move `historyIndex` and set `committedUrl` from the stack
- Refresh bumps `viewportKey`
- Home navigates to Wikipedia via the same navigate helper
- Enter in address bar: normalize → push history → set committed URL

Viewport:

- PDF → `<embed>`
- Else → sandboxed `<iframe>` (`allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox`)
- Soft timeout (~8–10s): banner with Open in new tab; do not tear down iframe
- Blocked/error panel: message, Try again, Open in new tab

### Chrome UI

- Back / Forward / Refresh / Home as real `<button>`s with `aria-label`s
- Address input with `aria-label="Address"`
- Bookmarks strip under toolbar (four chips calling navigate)
- Loading indicator in the bar; disabled styles for back/forward

## Data flow

1. Seed from `website` prop: history `[normalize(website)]` at index `0`.
2. User navigates (address, bookmark, home) → `navigate` updates history and committed URL → status `loading`.
3. Viewport `onLoad` → status `loaded`; clear slow banner.
4. Soft timeout while still loading → show slow banner without unloading.
5. Try again remounts viewport; Open in new tab uses `window.open(..., 'noopener,noreferrer')`.

## Edge cases

- Cross-origin iframe history APIs are unused (unreliable).
- PDF vs HTML is chosen from **committed** URL, not the initial prop.
- Editing the address draft does not navigate until Enter.
- Relative resume path `./resume.pdf` must keep working.

## Testing (manual)

- Edge default Wikipedia; Resume PDF; Calendly from taskbar.
- Type URL + Enter; edit draft without navigating until Enter.
- Back/forward through 2–3 URLs; disabled states at ends.
- Soft timeout banner appears if load is slow; Open in new tab works.
- Mobile modal content area still fills correctly.

## File touch list

- `docs/superpowers/specs/2026-09-09-browser-design.md` (this file)
- `src/components/browserUtils.ts` (new)
- `src/components/Browser.tsx`
- `src/components/Browser.module.css`
- Call sites (`BottomNav`, `WinMenu`, `DesktopNav`, `MobileHome`) — smoke only, no API change
