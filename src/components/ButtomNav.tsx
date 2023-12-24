import style from './BottomNav.module.css';
import Icon from './Icon';
import { calender, info, mail, project, sun, winMenu } from '../assets/asset';
import React from 'react';

const BottomNav = () => {
  return (
    <div className={style.bg}>
      <WeatherBox />
      <div className={style.navIcons}>
        <Icon icon={winMenu} />
        <Icon icon={project} />
        <Icon icon={mail} />
        <Icon icon={calender} />
        <Icon icon={info} />
      </div>
      <DateBox />
    </div>
  )
}

function DateBox() {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString())
  const [date, setDate] = React.useState(new Date().toLocaleDateString())

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
      setDate(new Date().toLocaleDateString())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={style.date}>
      {time}
      <br />
      {date}
    </div>
  )
}

function WeatherBox() {
  return (
    <div className={style.weather}>
      <img src={sun} alt="weather" width={30} height={30} />
      <div className="">
        <div className={style.temp}>16°C</div>
        <div className={style.city}>Chhindwara</div>
      </div>
    </div>
  )
}

export default BottomNav