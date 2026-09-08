import React, { useCallback, useEffect, useRef, useState } from 'react'
import style from './Modal.module.css'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type Props = {
  open: boolean
  closing?: boolean
  maximized?: boolean
  title?: string
  onClose: () => void
  onMinimize?: () => void
  onToggleMaximize?: () => void
  onCloseAnimationEnd?: () => void
  children?: React.ReactNode
  footer?: React.ReactNode
  goBack?: () => void
  back?: boolean
  mobileSheet?: boolean
}

const Modal = ({
  open,
  closing = false,
  maximized = false,
  onClose,
  onMinimize,
  onToggleMaximize,
  onCloseAnimationEnd,
  children,
  title = '',
  footer,
  goBack,
  back = false,
  mobileSheet = false,
}: Props) => {
  const reducedMotion = usePrefersReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null)

  useEffect(() => {
    if (!open || maximized || closing) {
      setOffset({ x: 0, y: 0 })
    }
  }, [open, maximized, closing, title])

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (maximized || mobileSheet || reducedMotion) return
      const target = e.target as HTMLElement
      if (target.closest('button') || target.closest(`.${style.windowControls}`)) return
      e.currentTarget.setPointerCapture(e.pointerId)
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX: offset.x,
        origY: offset.y,
      }
    },
    [maximized, mobileSheet, offset.x, offset.y, reducedMotion],
  )

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return
    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY
    const taskbar = 60
    const maxY = window.innerHeight - taskbar - 80
    const nextX = dragRef.current.origX + dx
    const nextY = Math.min(Math.max(dragRef.current.origY + dy, -window.innerHeight / 2 + 40), maxY / 2)
    setOffset({ x: nextX, y: nextY })
  }, [])

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current) {
      dragRef.current = null
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {
        // ignore
      }
    }
  }, [])

  if (!open && !closing) return null

  const containerClass = [
    style.modalContainer,
    maximized || mobileSheet ? style.maximized : '',
    mobileSheet ? style.mobileSheet : '',
  ]
    .filter(Boolean)
    .join(' ')

  const modalClass = [
    style.modal,
    closing ? style.closing : style.opening,
    reducedMotion ? style.noMotion : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <div
        className={`${style.modalOverlay} ${closing ? style.overlayClosing : ''}`}
        onClick={onClose}
      />
      <div className={modalClass} onAnimationEnd={() => {
        if (closing) onCloseAnimationEnd?.()
      }}>
        <div
          ref={containerRef}
          className={containerClass}
          style={
            maximized || mobileSheet
              ? undefined
              : { transform: `translate(${offset.x}px, ${offset.y}px)` }
          }
        >
          <div
            className={style.modalHeader}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div className={style.titleGroup}>
              {back && (
                <button type="button" className={style.goBack} onClick={goBack} aria-label="Go back">
                  &#8592;
                </button>
              )}
              <span>{title}</span>
            </div>
            <div className={style.windowControls}>
              {onMinimize && !mobileSheet && (
                <button
                  type="button"
                  className={style.controlBtn}
                  onClick={onMinimize}
                  aria-label="Minimize"
                  title="Minimize"
                >
                  &#8211;
                </button>
              )}
              {onToggleMaximize && !mobileSheet && (
                <button
                  type="button"
                  className={style.controlBtn}
                  onClick={onToggleMaximize}
                  aria-label={maximized ? 'Restore' : 'Maximize'}
                  title={maximized ? 'Restore' : 'Maximize'}
                >
                  {maximized ? '❐' : '☐'}
                </button>
              )}
              <button
                type="button"
                className={`${style.controlBtn} ${style.close}`}
                onClick={onClose}
                aria-label="Close"
                title="Close"
              >
                &times;
              </button>
            </div>
          </div>
          <div className={style.modalContent}>{children}</div>
          {footer && <div className={style.modalFooter}>{footer}</div>}
        </div>
      </div>
    </>
  )
}

export default Modal
