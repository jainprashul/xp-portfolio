import DesktopNav from './DesktopNav'
import style from './Desktop.module.css'

const Desktop = () => {
  return (
    <div className={style.desktop}>
      <DesktopNav />
      <Copyright />
    </div>
  )
}

export default Desktop

function Copyright() {
  return (
    <div className={style.copyRight}>
      <div>© {new Date().getFullYear()} - Prashul Jain <br /> <span>Make in India Initiative</span></div>

      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png" alt="india flag" width={70} />
    </div>
  )

}

