import { useEffect, useState } from 'react'
import style from './Mobile.module.css'
import { MobileNav } from '../BottomNav'
import useWeather from '@/hooks/useWeather'
import AnalyticsWidget from '../shared/AnalyticsWidget'
import MobileHome from './MobileHome'

const Mobile = () => {
  return (
    <div className={style.shell}>
      <StatusBar />
      <div className={style.scrollArea}>
        <WeatherBox />
        <AnalyticsWidget variant="mobile" />
        <MobileHome />
      </div>
      <MobileNav />
    </div>
  )
}

export default Mobile

function StatusBar() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  )

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className={style.statusBar} aria-hidden>
      <span>{time}</span>
      <span className={style.statusBrand}>Prashul OS</span>
      <span>LTE</span>
    </div>
  )
}

function WeatherBox() {
  const { icon, city, temp, humidity, windSpeed } = useWeather()

  return (
    <div className={style.weather}>
      <div className={style.iconBox}>
        <img className={style.weatherIcon} src={icon} alt="" width={60} height={60} />
        <div className={style.temp}>{temp?.toFixed(1)}°C</div>
      </div>
      <div className={style.weatherInfo}>
        <div className={style.city}>{city}</div>
        <div className={style.humidity}>Humidity: {humidity}%</div>
        <div className={style.wind}>Wind: {windSpeed} km/h</div>
      </div>
    </div>
  )
}
