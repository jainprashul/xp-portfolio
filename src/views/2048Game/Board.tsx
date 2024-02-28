import React, { useCallback } from 'react'
import style from './Game.module.css'
import MobileSwiper from '@/components/shared/MobileSwiper'
import Grid from './Grid'
import Tile from './Tile'
import { useInterval } from '@/hooks/useInterval'

type Props = {
    size?: number
}

const Board = ({ size = 8 }: Props) => {

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        console.log(e.key)
        e.preventDefault()

        switch (e.code) {
            case 'ArrowUp':
                console.log('up')
                break;
            case 'ArrowDown':
                console.log('down')
                break;
            case 'ArrowLeft':
                console.log('left')
                break;
            case 'ArrowRight':
                console.log('right')
                break;
        }
    }, [])

    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown])


    const [position, setPosition] = React.useState([0, 0])

    useInterval(() => {
        const random = Math.floor(Math.random() * 8)
        const random2 = Math.floor(Math.random() * 8)
        setPosition([random, random2])
    }, 2000)

    return (
        <MobileSwiper onSwipe={() => {
            console.log('swiped')
        }}>
            <div className={style.board}>
                <Tile value={128} position={position} size={size} />
                <Grid size={size} />
            </div>
        </MobileSwiper>
    )
}

export default Board


