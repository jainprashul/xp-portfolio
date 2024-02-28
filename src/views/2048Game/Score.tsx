import React from 'react'
import style from './Game.module.css'

type Props = {
    score : number
}

const Score = (props: Props) => {
  return (
    <div className={style.scorecard}>
    <div>Score</div>
    <div>{props.score}</div>
</div>
  )
}

export default Score