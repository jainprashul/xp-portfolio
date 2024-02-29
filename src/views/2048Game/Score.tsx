import style from './Game.module.css'
import { useGame } from './GameContext'

const Score = () => {
  const {score} = useGame()
  return (
    <div className={style.scorecard}>
    <div>Score</div>
    <div>{score}</div>
</div>
  )
}

export default Score