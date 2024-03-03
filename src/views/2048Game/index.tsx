import style from './Game.module.css'
import Score from './Score'
import GameProvider from '@/views/2048Game/GameContext'
import Board from './Board'


const Game2048 = () => {
    return (
        <GameProvider>
            <div className={style.container}>
                <div className={style.game}>
                    <header className={style.header}>
                        <h1>2048</h1>
                        <Score />
                    </header>
                    <main>
                        <Board />
                    </main>
                </div>

            </div>
        </GameProvider>
    )
}

export default Game2048