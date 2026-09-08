import { useCallback, useEffect, useMemo, useState } from 'react'

export type ContextMenuPosition = { x: number; y: number }

export type UseContextMenuResult = {
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

export function useContextMenu(): UseContextMenuResult {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<ContextMenuPosition>({ x: 0, y: 0 })

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const open = useCallback((x: number, y: number) => {
    setPosition({ x, y })
    setIsOpen(true)
  }, [])

  const onContextMenu = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      open(event.clientX, event.clientY)
    },
    [open],
  )

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    const onPointerDown = () => close()
    const onScroll = () => close()

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('scroll', onScroll, true)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [isOpen, close])

  const menuProps = useMemo(
    () => ({
      open: isOpen,
      position,
      onClose: close,
    }),
    [isOpen, position, close],
  )

  return { isOpen, position, open, close, onContextMenu, menuProps }
}
