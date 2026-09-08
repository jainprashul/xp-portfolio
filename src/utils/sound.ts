const STORAGE_KEY = 'xp-portfolio-sound-enabled'

let audioCtx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return null
    audioCtx = new Ctx()
  }
  return audioCtx
}

export function isSoundEnabled(): boolean {
  try {
    // Default on when unset; only opt-out persists as 'false'
    return localStorage.getItem(STORAGE_KEY) !== 'false'
  } catch {
    return true
  }
}

export function setSoundEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? 'true' : 'false')
  } catch {
    // ignore quota / private mode
  }
}

function beep(frequency: number, durationMs: number, type: OscillatorType = 'sine', gain = 0.04): void {
  if (!isSoundEnabled()) return
  const ctx = getCtx()
  if (!ctx) return

  void ctx.resume()
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.type = type
  osc.frequency.value = frequency
  g.gain.value = gain
  osc.connect(g)
  g.connect(ctx.destination)
  const now = ctx.currentTime
  g.gain.setValueAtTime(gain, now)
  g.gain.exponentialRampToValueAtTime(0.001, now + durationMs / 1000)
  osc.start(now)
  osc.stop(now + durationMs / 1000)
}

export function playClick(): void {
  beep(640, 40, 'triangle', 0.03)
}

export function playWindowOpen(): void {
  beep(420, 60, 'sine', 0.035)
  setTimeout(() => beep(560, 50, 'sine', 0.028), 40)
}

export function playWindowClose(): void {
  beep(560, 40, 'sine', 0.03)
  setTimeout(() => beep(380, 50, 'sine', 0.025), 35)
}
