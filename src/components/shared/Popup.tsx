import React from 'react'
import style from './Popup.module.css'

type Props = {
  open: boolean,
  onClose: () => void,
  anchorEl: HTMLElement | null,
  anchorOrigin?: Origin,
  children?: React.ReactNode
}

const Popup = ({
  open,
  onClose,
  anchorEl,
  anchorOrigin = {
    vertical: 'top',
    horizontal: 'center'
  },
  children
}: Props) => {

  const [position, setPosition] = React.useState({ x: 0, y: 0 })

  const popupRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (anchorEl && popupRef.current) {
      const rect = anchorEl.getBoundingClientRect()
      const popupRect = popupRef.current.getBoundingClientRect()
      console.log(rect)
      const { x, y } = getPostion(rect, popupRect!, anchorOrigin)
      setPosition({ x, y })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl, anchorOrigin.horizontal, anchorOrigin.vertical])

  const handleClose = () => {
    onClose()
  }

  if (!open) return null;
  return (
    <>
      <div className={style.popupOverlay} onClick={handleClose} />
      <div className={style.popup} ref={popupRef} style={{
        left: position.x,
        top: position.y
      }}>
        <div className={style.popupContainer}>
          {children}
        </div>
      </div>
    </>
  )
}

export default Popup

type Origin = {
  vertical: 'top' | 'bottom' | 'center',
  horizontal: 'left' | 'right' | 'center'
}



function getPostion(rect: DOMRect, popupRef: DOMRect, anchorOrigin: Origin, gap = 10) {
  const { vertical, horizontal } = anchorOrigin;
  let x = rect.x;
  let y = rect.y;

  if (vertical === 'top') {
    y = y - popupRef.height - gap;
  } else if (vertical === 'bottom') {
    y = rect.bottom + gap;
  } else {
    y = y + rect.height / 2 - popupRef.height / 2;
  }

  if (horizontal === 'left') {
    x = x - popupRef.width - gap;
  } else if (horizontal === 'right') {
    x = x + rect.width + gap;
  } else {
    x = x + rect.width / 2 - popupRef.width / 2;
  }







  return { x, y }
}