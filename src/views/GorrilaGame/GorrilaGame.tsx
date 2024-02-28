import React from 'react'
import './Game.css'
import { Game } from './Game'

const GorrilaGame = () => {

    const canvas = React.useRef<HTMLCanvasElement>(null)

    React.useEffect(() => {
        const canvasElement = canvas.current
        if (canvasElement) {
          const newGame = new Game(canvasElement)
        }
    }, [canvas])


    return (
        <div className='game-container'>
            
        <canvas ref={canvas} id='game-canvas'></canvas>
    
    </div>)
}

export default GorrilaGame