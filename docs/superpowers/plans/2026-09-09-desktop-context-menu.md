# Desktop Context Menu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline) or superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a reusable `useContextMenu` hook and XP-styled `ContextMenu`, wired to desktop empty space, desktop icons, and taskbar/start.

**Architecture:** Local hook per host owns open/position/close; shared presentational `ContextMenu` renders item trees with submenus; hosts supply item lists. Desktop state drives View/Arrange/Refresh; Extras toast used for Pin/Properties feedback.

**Tech Stack:** React 18, TypeScript, CSS modules, `createPortal`, existing Modal/Extras contexts.

## Global Constraints

- XP visual chrome (not Fluent acrylic)
- Win11-inspired item sets per approved spec
- Desktop layout only (no mobile long-press)
- Pin is cosmetic (toast); no persistence
- No new test runner — verify with `npm run build`

## File map

| File | Role |
|------|------|
| `src/hooks/useContextMenu.ts` | Generic right-click state + listeners |
| `src/components/shared/ContextMenu.tsx` | Menu UI + item model types |
| `src/components/shared/ContextMenu.module.css` | XP menu styles |
| `src/components/Desktop.tsx` | Empty-space menu + desktop chrome state |
| `src/components/DesktopNav.tsx` | Icon size/sort/refresh + per-icon menus |
| `src/components/shared/Icon.tsx` | Optional context menu attachment |
| `src/components/BottomNav.tsx` | Start / apps / task chip menus |
| `src/components/context/ExtrasContext.tsx` | Export `showToast` for feedback |

---

### Task 1: Hook + ContextMenu UI

**Files:**
- Create: `src/hooks/useContextMenu.ts`
- Create: `src/components/shared/ContextMenu.tsx`
- Create: `src/components/shared/ContextMenu.module.css`

**Interfaces:**
- Produces: `useContextMenu()`, `ContextMenu`, `ContextMenuItem`, `ContextMenuPosition`

- [x] **Step 1:** Implement `useContextMenu` with `open`/`close`/`onContextMenu`/`menuProps`, Escape + pointerdown-outside + scroll close
- [x] **Step 2:** Implement `ContextMenu` with portal, viewport clamp, separators, disabled, nested submenu
- [x] **Step 3:** `npm run build` — types clean for new files
- [ ] **Step 4:** Commit `feat: add useContextMenu hook and ContextMenu UI` (deferred — commit when requested)

### Task 2: Expose toast + Desktop empty-space menu

**Files:**
- Modify: `src/components/context/ExtrasContext.tsx`
- Modify: `src/components/Desktop.tsx`
- Modify: `src/components/Desktop.module.css`
- Modify: `src/components/DesktopNav.tsx`

**Interfaces:**
- Consumes: Task 1 APIs
- Produces: `showToast` on Extras; Desktop passes `iconSize`, `sortBy`, `refreshKey` to DesktopNav

- [ ] **Step 1:** Add `showToast` to Extras context value
- [ ] **Step 2:** Desktop owns view/sort/refresh state + empty-space context menu items
- [ ] **Step 3:** DesktopNav applies size/sort/refreshKey animation
- [ ] **Step 4:** Build + commit `feat: add desktop empty-space context menu`

### Task 3: Icon context menus

**Files:**
- Modify: `src/components/shared/Icon.tsx`
- Modify: `src/components/DesktopNav.tsx`

- [ ] **Step 1:** Icon accepts optional `contextMenuItems` and wires hook + ContextMenu
- [ ] **Step 2:** DesktopNav supplies Open / Open in new window / Pin / Properties per icon
- [ ] **Step 3:** Build + commit `feat: add desktop icon context menus`

### Task 4: Taskbar / Start context menus

**Files:**
- Modify: `src/components/BottomNav.tsx`

- [ ] **Step 1:** Start, app icons, minimized chip get context menus per spec
- [ ] **Step 2:** Wire Restore/Minimize/Close via `useModal` when titles match
- [ ] **Step 3:** Build + commit `feat: add taskbar context menus`

## Spec coverage

- Desktop View / Arrange / Refresh / Settings — Task 2
- Icon Open / Pin / Properties — Task 3
- Taskbar Start / apps / chip — Task 4
- Generic hook + XP chrome — Task 1
- Mobile out of scope — honored (no MobileNav wiring)
