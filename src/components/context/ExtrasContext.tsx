import React, { useCallback, useEffect, useMemo, useState } from 'react'
import style from './Extras.module.css'

type ExtrasContextType = {
  unlockStaffMode: () => void
  triggerBsod: () => void
  staffMode: boolean
}

const extrasContext = React.createContext<ExtrasContextType | null>(null)

export const useExtras = () => {
  const context = React.useContext(extrasContext)
  if (!context) {
    throw new Error('useExtras must be used within an ExtrasProvider')
  }
  return context
}

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

type Props = {
  children: React.ReactNode
}

const ExtrasProvider = ({ children }: Props) => {
  const [staffMode, setStaffMode] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [bsod, setBsod] = useState(false)
  const buffer = React.useRef<string[]>([])

  const showToast = useCallback((message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 2800)
  }, [])

  const unlockStaffMode = useCallback(() => {
    setStaffMode(true)
    document.documentElement.dataset.staffMode = 'true'
    showToast('Staff mode unlocked')
    window.setTimeout(() => {
      setStaffMode(false)
      delete document.documentElement.dataset.staffMode
    }, 8000)
  }, [showToast])

  const triggerBsod = useCallback(() => {
    setBsod(true)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      buffer.current = [...buffer.current, key].slice(-KONAMI.length)
      const matched = KONAMI.every((k, i) => buffer.current[i] === k)
      if (matched) {
        buffer.current = []
        unlockStaffMode()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [unlockStaffMode])

  const value = useMemo(
    () => ({
      unlockStaffMode,
      triggerBsod,
      staffMode,
    }),
    [unlockStaffMode, triggerBsod, staffMode],
  )

  return (
    <extrasContext.Provider value={value}>
      {children}
      {toast && (
        <div className={style.toast} role="status">
          {toast}
        </div>
      )}
      {staffMode && <div className={style.terminalOverlay} aria-hidden />}
      {bsod && (
        <div className={style.bsod} role="alertdialog" aria-label="Fake blue screen">
          <div className={style.bsodInner}>
            <div className={style.bsodFace}>:(</div>
            <p>Your PC ran into a problem that it could fake for fun.</p>
            <p className={style.bsodCode}>ERROR_STAFF_ENGINEER_JOKE</p>
            <button type="button" className={style.bsodBtn} onClick={() => setBsod(false)}>
              Return to desktop
            </button>
          </div>
        </div>
      )}
    </extrasContext.Provider>
  )
}

export default ExtrasProvider
