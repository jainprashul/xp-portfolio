import { shortcut } from '../../assets/asset'
import style from './Icon.module.css'
import Tooltip from './Tooltip'
import { useRef, useState } from 'react'
import { playClick } from '@/utils/sound'

type Props = {
  icon: string
  size?: number
  color?: string
  title?: string
  tooltip?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  isShortcut?: boolean
  tourId?: string
}

const Icon = ({
  icon: name,
  size = 40,
  title,
  isShortcut = false,
  tooltip,
  onClick,
  tourId,
}: Props) => {
  const [shake, setShake] = useState(false)
  const lastClick = useRef(0)

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const now = Date.now()
    const delta = now - lastClick.current
    lastClick.current = now
    // Awkward mid-double-click rhythm → subtle shake (delight)
    if (delta > 80 && delta < 180) {
      setShake(true)
      window.setTimeout(() => setShake(false), 400)
    }
    playClick()
    onClick?.(e)
  }

  return (
    <Tooltip title={tooltip ?? ''}>
      <div
        className={`${style.icon} ${title ? style.ico : style.nav} ${shake ? style.shake : ''}`}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick(e as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>)
          }
        }}
        role="button"
        tabIndex={0}
        data-tour={tourId}
      >
        <div className={style.iconWrapper}>
          <img src={name} alt={title || tooltip || 'icon'} width={size} height={size} />
          {isShortcut && <img className={style.shortcut} src={shortcut} alt="" width={15} height={15} />}
        </div>
        {Boolean(title) && <span>{title}</span>}
      </div>
    </Tooltip>
  )
}

export default Icon
