import React from 'react'
import style from './Game.module.css'
import usePreviousProps from '@/hooks/usePreviousProps'
import useResizeObserver from '@/hooks/useResizeObserver'

const pixel = 8;

export type TileMeta = {
    id: number,
    position: [number, number],
    value: number,
    mergeWith?: number,
}

type Props = {
    size : number
    value: number,
    position: [number, number],
}

const Tile = ({size , value, position }: Props) => {

    const [scale, setScale] = React.useState(1)

    const ref = React.useRef<HTMLDivElement>(null)

    const dim = useResizeObserver(ref)

    const prevValue = usePreviousProps(value)

    const hasChanged = prevValue !== value

    const positionToCoords = (position : [number, number]) => {
        const width = dim?.width || 0
        const height = dim?.height || 0
        return {
            left: position[0] * width + position[0] * (pixel - 1),
            top: position[1] * height + position[1] * (pixel - 1),
        }
    }

    React.useEffect(() => {
        if (hasChanged) {
            setScale(1.1)
            setTimeout(() => {
                setScale(1)
            }, 100)
        }
    }, [hasChanged, scale])





    return (
        <div 
        data-size={size}
        ref={ref}
            
         className={`${style.tile} ${style[`tile${value}`]}`} 
            style={{
                scale: scale,
                zIndex: value,
                ...positionToCoords(position)
            }}>
            {value}
        </div>
    )
}

export default Tile