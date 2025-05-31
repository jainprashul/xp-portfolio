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
    id? : string | number
}

const Tile = ({size , value, position, id }: Props) => {

    const [scale, setScale] = React.useState(1)

    const ref = React.useRef<HTMLDivElement>(null)

    const dim = useResizeObserver(ref)

    const prevValue = usePreviousProps(value)

    const hasChanged = prevValue !== value

    /**
     * Converts a tile's position in the grid to pixel values for CSS positioning.
     * 
     * @param position - An array containing the [x, y] coordinates of the tile in the grid.
     * @returns An object with `left` and `top` properties, representing the CSS pixel values.
     * The `left` and `top` values are calculated based on the tile size, gap between tiles,
     * and the dimensions of the game board container.
     * The calculation ensures tiles are positioned correctly within the grid layout.
     * It takes into account the `dim` (dimensions of the container) and `pixel` (gap size)
     * to accurately determine the visual placement of each tile.
     * The `maxWindowSize` and `size` (grid size) are used to establish a base unit for dimensions,
     * ensuring responsiveness and correct scaling of tile positions.
     * 
     * Example: if a tile is at position [0, 1] (first column, second row),
     * this function will compute its `left` and `top` CSS properties in pixels.
     * based on the input `position` array and the `dim` object's width and height.
     */
    const positionToPixels = (position: [number, number] | undefined): { left: string; top: string } => {
        if (!position || typeof position[0] === 'undefined' || typeof position[1] === 'undefined') {
            console.warn('positionToPixels called with undefined or invalid position:', position);
            return { left: '0px', top: '0px' }; 
        }
        const width = parseInt(dim?.width.toFixed() ?? '0') || maxWindowSize / size
        const height = parseInt(dim?.height.toFixed() ?? '0') || maxWindowSize / size
        const x = position[0] * width + position[0] * (pixel - 1)
        const y = position[1] * height + position[1] * (pixel - 1)
        return {
            left: x + 'px',
            top: y + 'px',
        };
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
            <span style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                fontSize: '10px'
            
            }}
            >{id}</span>
        </div>
    )
}

export default Tile