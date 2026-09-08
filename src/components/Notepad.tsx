import { useEffect, useRef, useState } from 'react'
import style from './Notepad.module.css'

const STORAGE_KEY = 'xp-portfolio-notepad'

const Notepad = () => {
  const [text, setText] = useState('')
  const areaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    try {
      setText(localStorage.getItem(STORAGE_KEY) ?? '')
    } catch {
      // ignore
    }
    areaRef.current?.focus()
  }, [])

  const save = (value: string) => {
    setText(value)
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // ignore
    }
  }

  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const lines = text.length === 0 ? 0 : text.split(/\n/).length

  return (
    <div className={style.wrap}>
      <div className={style.toolbar}>
        <p className={style.hint}>Interview scratch pad — saved in this browser only.</p>
      </div>
      <textarea
        ref={areaRef}
        className={style.area}
        value={text}
        onChange={(e) => save(e.target.value)}
        placeholder="Notes, talking points, question backlog…"
        spellCheck
        aria-label="Notepad"
      />
      <div className={style.footer}>
        <span className={style.stats}>
          {words} words · {lines} lines · {text.length} chars
        </span>
        <button type="button" className={style.clear} onClick={() => save('')} disabled={!text}>
          Clear
        </button>
      </div>
    </div>
  )
}

export default Notepad
