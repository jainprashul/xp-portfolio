# Desktop Context Menu Design

**Date:** 2026-09-09  
**Status:** Approved for planning  
**Approach:** Hook + presentational menu (Approach A)

## Goal

Add right-click context menus across the desktop shell (empty desktop, icons, taskbar/start) using a reusable hook and XP-styled menu UI. Menu *contents* follow a Windows 11–inspired item set; visual chrome matches the existing XP portfolio theme.

## Non-goals

- Windows 11 Fluent/acrylic visual redesign of the menu
- Mobile long-press context menus (v1 is desktop layout only)
- Real pin-to-taskbar persistence or OS-level behavior
- Extending or heavily reworking the existing `Popup` component for this use case

## Architecture

### `useContextMenu` (`src/hooks/useContextMenu.ts`)

Generic hook for any right-click host. Responsibilities:

- `preventDefault` on contextmenu
- Store open state and pointer position (`clientX` / `clientY`)
- Clamp position to the viewport after the menu measures itself
- Close on Escape, outside pointer down, and scroll (so only one menu stays open in practice)
- Expose a small API for hosts and the menu component

Suggested API:

```ts
type ContextMenuPosition = { x: number; y: number }

type UseContextMenuResult = {
  isOpen: boolean
  position: ContextMenuPosition
  open: (x: number, y: number) => void
  close: () => void
  onContextMenu: (event: React.MouseEvent) => void
  menuProps: {
    open: boolean
    position: ContextMenuPosition
    onClose: () => void
  }
}
```

### `ContextMenu` (`src/components/shared/ContextMenu.tsx` + CSS module)

Presentational menu:

- Fixed positioning at `position`
- XP chrome: raised/solid borders, `var(--surface-*)` colors, hover highlight, separators
- Supports items, disabled state, separators, and nested submenus (open right; flip left near viewport edge)
- Renders via portal or fixed root so it is not clipped by desktop overflow

### Item model

```ts
type ContextMenuItem = {
  id: string
  label: string
  onSelect?: () => void
  disabled?: boolean
  separator?: boolean
  children?: ContextMenuItem[]
}
```

Hosts own their item lists; the hook and component stay agnostic.

## Menu contents & behavior

### Desktop empty space

| Item | Behavior |
|------|----------|
| View → Large / Medium / Small icons | Cosmetic icon size toggle on desktop icons |
| Arrange icons → Name / Type | Cosmetic reorder of `DesktopNav` icons |
| Refresh | Brief restagger / fade of desktop icons |
| — | Separator |
| Change wallpaper / Settings | Open existing Settings modal (`Wallpapers`) |

### Desktop icons

| Item | Behavior |
|------|----------|
| Open | Same as left-click |
| Open in new window | Same open path where applicable; external links open normally |
| Pin to taskbar | Cosmetic feedback only (toast or brief message); no persistence |
| — | Separator |
| Properties | Lightweight info (title, shortcut/app name) |

`Icon` gains an optional context-menu items prop (or wrapper wiring) so existing click handlers stay intact.

### Taskbar / Start

| Target | Items |
|--------|--------|
| Start | Open menu (same as click); Settings |
| App icons | Open; when that app’s modal is active: Restore / Minimize / Close as applicable |
| Minimized task chip | Restore; Close |

## Data flow

1. Host attaches `onContextMenu` from the hook to the target element.
2. Hook opens at pointer coords and suppresses the browser menu.
3. Host renders `<ContextMenu {...menuProps} items={items} />`.
4. Selecting an enabled item runs `onSelect`, then closes the menu.
5. Escape, outside click, or scroll closes without selecting.

## Edge cases

- Clamp menu (and submenus) fully into the viewport.
- Guided tour / overlay pointer capture wins if it already blocks events.
- Mobile layout: do not attach custom context menus in v1.
- Multiple hosts each use their own hook instance; document-level close listeners prevent stale open menus when clicking elsewhere.

## Visual design

- Match existing XP UI chrome (not Fluent acrylic).
- Sharp-to-slightly-rounded corners consistent with current surfaces.
- Separator lines and hover row highlight.
- Optional item icons are out of scope for v1.

## Testing (manual)

- Right-click desktop empty space → View / Sort / Refresh / Settings work; Settings opens Wallpapers.
- Right-click a desktop icon → Open matches left-click; Properties shows; Pin gives feedback.
- Right-click Start, taskbar apps, and minimized chip → listed actions work.
- Escape and outside click close the menu; browser native menu does not appear on those targets.
- Near viewport edges, menu and submenu stay on-screen.

## File touch list (expected)

- `src/hooks/useContextMenu.ts` (new)
- `src/components/shared/ContextMenu.tsx` + `ContextMenu.module.css` (new)
- `src/components/Desktop.tsx` / `Desktop.module.css`
- `src/components/DesktopNav.tsx` (icon size / sort / refresh coordination)
- `src/components/shared/Icon.tsx` (optional context menu support)
- `src/components/BottomNav.tsx`
- Possibly a tiny toast/feedback helper if Pin/Properties need UI beyond an alert or existing Extras toast pattern
