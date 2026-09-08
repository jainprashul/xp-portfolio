import { useCallback, useEffect, useState } from 'react'
import { winMenu } from '@/assets/asset'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import style from './BootScreen.module.css'

const SESSION_KEY = 'xp-portfolio-boot-seen'
const BOOT_MS = 1200

type Props = {
  onDone: () => void
}

function BootScreen({ onDone }: Props) {
  const reducedMotion = usePrefersReducedMotion()
  const [fading, setFading] = useState(false)

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // ignore
    }
    setFading(true)
    const delay = reducedMotion ? 0 : 250
    window.setTimeout(onDone, delay)
  }, [onDone, reducedMotion])

  useEffect(() => {
    const timer = window.setTimeout(finish, reducedMotion ? 200 : BOOT_MS)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        finish()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
    }
  }, [finish, reducedMotion])

  return (
    <div
      className={`${style.boot} ${fading ? style.fadeOut : ''}`}
      onClick={finish}
      role="dialog"
      aria-label="Booting portfolio"
    >
      <img className={style.logo} src={winMenu} alt="" />
      <div className={style.progressTrack} aria-hidden>
        <div className={style.progressBar} />
      </div>
      <p className={style.hint}>Click or press Esc to skip</p>
    </div>
  )
}

export function shouldShowBoot(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) !== '1'
  } catch {
    return true
  }
}

export default BootScreen
