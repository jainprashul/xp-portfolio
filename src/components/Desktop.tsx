import DesktopNav from './DesktopNav'
import style from './Desktop.module.css'
import AnalyticsWidget from './shared/AnalyticsWidget'
import { indiaFlag } from '@/assets/asset'

const Desktop = () => {
  return (
    <div className={style.desktop}>
      <AnalyticsWidget variant="desktop" />
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

      <img src={indiaFlag} alt="india flag" width={70} />
    </div>
  )

}

