import { G2048 } from '@/assets/asset'
import style from './Gaming.module.css'

const games = [
    {
        name : "2048",
        icon : G2048,
        route : "/2048game"
    }
]

const Gaming = () => {
  return (
    <div>
        <h5 className={style.heading}>Gaming</h5>
        <ul className={style.gamelist}>
            {games.map((game, index) => (
            <li key={index} className={style.gameitem} onClick={() => {
                window.open(game.route)
            }}>
                <img src={game.icon
                } alt={game.name} />
                <span>{game.name}</span>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default Gaming