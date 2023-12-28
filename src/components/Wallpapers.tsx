import style from './Wallpapers.module.css'
import { random, wallpapers } from '@/assets/asset'


const Wallpapers = () => {

    function changeWallpaper(url: string) {
        document.body.style.backgroundImage = `url(${url})`
    }

  return (
    <>
        <h2 className={style.heading}>Wallpapers</h2>
        
        <div className={style.wallpaperContainer}>
            {wallpapers.map((wallpaper, index) => {
                return (
                    <div key={index} className={style.wallpaper} onClick={() => changeWallpaper(wallpaper)}>
                        <img src={wallpaper} alt="wallpaper"  />
                    </div>
                )
            })}

            <div className={style.wallpaper} onClick={() => changeWallpaper('https://source.unsplash.com/random')}>
                <div className={style.random}>
                <img src={random}  alt="wallpaper"/>
                </div>

            </div>
        
        </div>

        

    </>
  )
}

export default Wallpapers