import { G2048 } from '@/assets/asset'
import style from './Gaming.module.css'
import { useModal } from './context/ModalContext'
import Game2048 from '@/views/2048Game'

const Gaming = () => {
  const { openModal } = useModal()

  return (
    <div>
      <h5 className={style.heading}>Games</h5>
      <ul className={style.gamelist}>
        <li
          className={style.gameitem}
          onClick={() => {
            openModal('2048', <Game2048 />)
          }}
        >
          <img src={G2048} alt="2048" />
          <span>2048</span>
        </li>
      </ul>
    </div>
  )
}

export default Gaming
