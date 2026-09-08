import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ContextMenuPosition } from '@/hooks/useContextMenu'
import style from './ContextMenu.module.css'

export type ContextMenuItem = {
  id: string
  label?: string
  onSelect?: () => void
  disabled?: boolean
  separator?: boolean
  children?: ContextMenuItem[]
}

type Props = {
  open: boolean
  position: ContextMenuPosition
  onClose: () => void
  items: ContextMenuItem[]
}

function clampPosition(
  x: number,
  y: number,
  width: number,
  height: number,
  pad = 4,
): ContextMenuPosition {
  const maxX = window.innerWidth - width - pad
  const maxY = window.innerHeight - height - pad
  return {
    x: Math.max(pad, Math.min(x, maxX)),
    y: Math.max(pad, Math.min(y, maxY)),
  }
}

function MenuList({
  items,
  onClose,
  submenu = false,
  flipLeft = false,
}: {
  items: ContextMenuItem[]
  onClose: () => void
  submenu?: boolean
  flipLeft?: boolean
}) {
  const [openChildId, setOpenChildId] = useState<string | null>(null)

  return (
    <ul
      className={`${submenu ? style.submenu : style.menu} ${submenu && flipLeft ? style.submenuFlip : ''}`}
      role="menu"
      onPointerDown={(e) => e.stopPropagation()}
    >
      {items.map((item) => {
        if (item.separator) {
          return <li key={item.id} className={style.separator} role="separator" />
        }

        const hasChildren = Boolean(item.children?.length)
        const isChildOpen = openChildId === item.id

        return (
          <li
            key={item.id}
            role="none"
            onMouseEnter={() => {
              if (hasChildren && !item.disabled) setOpenChildId(item.id)
              else setOpenChildId(null)
            }}
          >
            <button
              type="button"
              role="menuitem"
              className={`${style.item} ${isChildOpen ? style.itemOpen : ''}`}
              disabled={item.disabled}
              aria-haspopup={hasChildren || undefined}
              aria-expanded={hasChildren ? isChildOpen : undefined}
              onClick={() => {
                if (hasChildren || item.disabled) return
                item.onSelect?.()
                onClose()
              }}
            >
              <span className={style.label}>{item.label}</span>
              {hasChildren && <span className={style.chevron} aria-hidden>▶</span>}
            </button>
            {hasChildren && isChildOpen && item.children && (
              <SubmenuPortal items={item.children} onClose={onClose} />
            )}
          </li>
        )
      })}
    </ul>
  )
}

/** Submenu positioned by CSS; flips if it would overflow right. */
function SubmenuPortal({ items, onClose }: { items: ContextMenuItem[]; onClose: () => void }) {
  const [flipLeft, setFlipLeft] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = wrapRef.current?.querySelector(`.${style.submenu}`) as HTMLElement | null
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.right > window.innerWidth - 4) setFlipLeft(true)
  }, [items])

  return (
    <div ref={wrapRef}>
      <MenuList items={items} onClose={onClose} submenu flipLeft={flipLeft} />
    </div>
  )
}

const ContextMenu = ({ open, position, onClose, items }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState(position)

  useEffect(() => {
    if (open) setCoords(position)
  }, [open, position])

  useLayoutEffect(() => {
    if (!open || !menuRef.current) return
    const rect = menuRef.current.getBoundingClientRect()
    setCoords(clampPosition(position.x, position.y, rect.width, rect.height))
  }, [open, position, items])

  if (!open) return null

  return createPortal(
    <div
      ref={menuRef}
      style={{ position: 'fixed', left: coords.x, top: coords.y, zIndex: 11000 }}
    >
      <MenuList items={items} onClose={onClose} />
    </div>,
    document.body,
  )
}

export default ContextMenu
