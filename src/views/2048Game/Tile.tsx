import React from 'react'
import style from './Game.module.css'
import usePreviousProps from '@/hooks/usePreviousProps'
import useResizeObserver from '@/hooks/useResizeObserver'

const pixel = 8;
const maxWindowSize = pixel * 64;

export type TileMeta = {
    id?: number | string,
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

    /**
     * The function `positionToPixels` calculates the pixel position based on a given position and
     * dimensions.
     * @param position - The `position` parameter is an array containing two numbers representing the x
     * and y coordinates of a position.
     * @returns An object with `left` and `top` properties representing the calculated pixel positions
     * based on the input `position` array and the `dim` object's width and height.
     */
    const positionToPixels = (position : [number, number]) => {
        const width = parseInt(dim?.width.toFixed() ?? '0') || maxWindowSize / size
        const height = parseInt(dim?.height.toFixed() ?? '0') || maxWindowSize / size
        return {
            left: position[0] * width + position[0] * (pixel - 1),
            top: position[1] * height + position[1] * (pixel - 1),
        }
    }

    // console.log('dim', dim, scale, hasChanged, positionToPixels(position))/

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
                ...positionToPixels(position)
            }}>
            {value}
        </div>
    )
}

export default Tile