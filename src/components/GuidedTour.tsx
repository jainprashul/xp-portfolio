import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import style from './GuidedTour.module.css'
import { useWindowSize } from '@/hooks/useWindowSize'

const STORAGE_KEY = 'xp-portfolio-tour-seen'

type Step = {
  target: string
  title: string
  body: string
}

const DESKTOP_STEPS: Step[] = [
  {
    target: '[data-tour="tour-projects"]',
    title: 'Projects',
    body: 'Open case studies for Staff systems, AI platforms, and flagship products.',
  },
  {
    target: '[data-tour="tour-start"]',
    title: 'Start menu',
    body: 'Contact info, extras (sounds, staff mode), and quick app shortcuts live here.',
  },
  {
    target: '[data-tour="tour-resume"]',
    title: 'Resume',
    body: 'Open the latest resume in the built-in browser window.',
  },
  {
    target: '[data-tour="tour-games"]',
    title: 'Games',
    body: 'Take a break with 2048 while you browse.',
  },
  {
    target: '[data-tour="tour-notepad"]',
    title: 'Notepad',
    body: 'Interview scratch pad — notes stay in this browser only.',
  },
]

const MOBILE_STEPS: Step[] = [
  {
    target: '[data-tour="tour-projects"]',
    title: 'Projects',
    body: 'Browse featured systems and filter by stack tags.',
  },
  {
    target: '[data-tour="tour-resume"]',
    title: 'Resume',
    body: 'Open the resume sheet anytime from the home grid.',
  },
]

type Rect = { top: number; left: number; width: number; height: number }

function GuidedTour() {
  const { width } = useWindowSize()
  const isMobile = width > 0 && width < 1024
  const steps = isMobile ? MOBILE_STEPS : DESKTOP_STEPS

  const [active, setActive] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [rect, setRect] = useState<Rect | null>(null)

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') return
    } catch {
      // ignore
    }
    const timer = window.setTimeout(() => setActive(true), 900)
    return () => window.clearTimeout(timer)
  }, [])

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }
    setActive(false)
  }, [])

  const step = steps[stepIndex]

  const measure = useCallback(() => {
    if (!step) return
    const el = document.querySelector(step.target)
    if (!el) {
      setRect(null)
      return
    }
    const r = el.getBoundingClientRect()
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
  }, [step])

  useLayoutEffect(() => {
    if (!active) return
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, true)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure, true)
    }
  }, [active, measure, stepIndex])

  if (!active || !step) return null

  const next = () => {
    if (stepIndex >= steps.length - 1) {
      dismiss()
      return
    }
    setStepIndex((i) => i + 1)
  }

  const tipStyle =
    rect == null
      ? { top: '40%', left: '50%', transform: 'translateX(-50%)' }
      : {
          top: Math.min(rect.top + rect.height + 12, window.innerHeight - 160),
          left: Math.min(Math.max(12, rect.left), window.innerWidth - 280),
        }

  return (
    <div className={style.root}>
      <div className={style.scrim} onClick={dismiss} />
      {rect && (
        <div
          className={style.spotlight}
          style={{
            top: rect.top - 6,
            left: rect.left - 6,
            width: rect.width + 12,
            height: rect.height + 12,
          }}
        />
      )}
      <div className={style.tip} style={tipStyle} role="dialog" aria-label={step.title}>
        <div className={style.stepCount}>
          {stepIndex + 1} / {steps.length}
        </div>
        <h4 className={style.title}>{step.title}</h4>
        <p className={style.body}>{step.body}</p>
        <div className={style.actions}>
          <button type="button" className={style.skip} onClick={dismiss}>
            Skip
          </button>
          <button type="button" className={style.next} onClick={next}>
            {stepIndex >= steps.length - 1 ? 'Done' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default GuidedTour
