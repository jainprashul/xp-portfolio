import React, { useCallback, useRef } from 'react'
import style from './Game.module.css'
import MobileSwiper, { SwipeInput } from '@/components/shared/MobileSwiper'
import Grid from './Grid'
import { useGame } from './GameContext'
import Tile from './Tile'



const Board = () => {

    const { getTiles , moveTiles , startGame, boardSize } = useGame()

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        console.log(e.key)
        e.preventDefault()

        switch (e.code) {
            case 'ArrowUp':
                console.log('up')
                moveTiles('MOVE_UP')
                break;
            case 'ArrowDown':
                console.log('down')
                moveTiles('MOVE_DOWN')
                break;
            case 'ArrowLeft':
                console.log('left')
                moveTiles('MOVE_LEFT')
                break;
            case 'ArrowRight':
                console.log('right')
                moveTiles('MOVE_RIGHT')
        }
    }, [moveTiles])

    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown])

    const handleSwipe = useCallback(({ deltaX , deltaY , direction } : SwipeInput) => {
        console.log('swiped', direction, deltaX, deltaY);
        switch (direction) {
            case 'up':
                moveTiles('MOVE_UP')
                break;
            case 'down':
                moveTiles('MOVE_DOWN')
                break;
            case 'left':
                moveTiles('MOVE_LEFT')
                break;
            case 'right':
                moveTiles('MOVE_RIGHT')
        }
    }, [moveTiles])

    const renderTiles = () => {
        const tiles = getTiles()
        return tiles.map((tile) => {
            return <Tile key={tile.id} {...tile} size={boardSize} />
        })
    }


    const initialized = useRef(false);

    React.useEffect(() => {
        if (!initialized.current) {
            startGame();
            initialized.current = true;
        }
    }, [startGame]);


    return (
        <MobileSwiper onSwipe={handleSwipe}>
            <div className={style.board}>
                {renderTiles()}
                <Grid size={boardSize} />
            </div>
        </MobileSwiper>
    )
}

export default Board


