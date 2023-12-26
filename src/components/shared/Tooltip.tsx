import React from 'react'
import style from './Tooltip.module.css'

type Props = {
    title : string,
    children?: React.ReactNode
}

const Tooltip = (props: Props) => {
  return (
    <div className={style.tooltip}>
      {Boolean(props.title) && <span className={style.tooltiptext}>{props.title}</span>}
        {props.children}
    </div>
  )
}

export default Tooltip