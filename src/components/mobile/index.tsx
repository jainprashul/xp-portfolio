import React from 'react'
import style from './Mobile.module.css'
import { MobileNav } from '../BottomNav'
import DesktopNav from '../DesktopNav'
import useWeather from '@/hooks/useWeather'


const Mobile = () => {
  return (
    <>
      <WeatherBox />
      <DesktopNav />
      <MobileNav />

    </>

  )
}

export default Mobile

function WeatherBox() {
  const { icon, city, temp, humidity, windSpeed } = useWeather();

  return (
    <div className={style.weather}>
      <div className={style.iconBox}>
        <img className={style.weatherIcon} src={icon} alt="weather" width={60} height={60} />
        <div className={style.temp}>{temp?.toFixed(1)}°C
        <br />
        
        </div>
        
      </div>
      <div className={style.weatherInfo}>
        <div className={style.city}>{city}</div>
        <div className={style.humidity}>Humidity: {humidity}%</div>
        <div className={style.wind}>Wind: {windSpeed} km/h</div>

        
      </div>
    </div>
  )
}
