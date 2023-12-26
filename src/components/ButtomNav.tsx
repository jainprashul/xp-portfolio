import style from './BottomNav.module.css';
import Icon from './shared/Icon';
import { calender, edge, info, mail, sun, winMenu } from '../assets/asset';
import React from 'react';

const BottomNav = () => {
  return (
    <div className={style.bg}>
      <WeatherBox />
      <div className={style.navIcons}>
        <Icon icon={winMenu} tooltip='Show Menu'  />
        <Icon icon={edge} isShortcut tooltip='Open Google' />
        <Icon icon={mail} isShortcut tooltip='Send me an Email' onClick={() => {
          window.open('mailto:jainprashul@gmail.com')
        }} />
        <Icon icon={calender} tooltip='Schedule Meeting' onClick={() => {
          window.open('https://calendly.com/jainprashul/30min')
        }} />
        <Icon icon={info} tooltip='About Me' />
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