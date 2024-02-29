import style from './Game.module.css'

type Props = {
    size: number
}

const Grid = ({ size }: Props) => {
    const cells = Array.from({ length: size * size }, (_, i) => i)

    return (
        <div className={style.grid} 
             style={{ 
                gridTemplateColumns: `repeat(${size}, 1fr` , 
                gridTemplateRows: `repeat(${size}, 1fr`,
            }}>
            {cells.map((cell) => (
                <div key={cell} data-size={size} className={style.cell}>
                </div>
            ))}
        </div>
    )
}

export default Grid