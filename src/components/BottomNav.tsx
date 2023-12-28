import style from './BottomNav.module.css';
import Icon from './shared/Icon';
import { calender, edge, info, mail, sun, winMenu } from '../assets/asset';
import React from 'react';
import { useModal } from './context/ModalContext';
import Browser from './Browser';
import { usePopover } from './context/PopOverContext';
import About from './About';
import WinMenu from './WinMenu';

const BottomNav = () => {
  return (
    <div className={style.bg}>
      <WeatherBox />
      <Menu />
      <DateBox />
    </div>
  )
}

function Menu() {
  const { openModal } = useModal()
  const { openPopover } = usePopover()

  return (
    <>
      <div className={style.navIcons}>
        <Icon icon={winMenu} tooltip='Show Menu' onClick={(e) => {
          openPopover(e.currentTarget, <WinMenu />)
        }} />
        <Icon icon={edge} tooltip='Open Browser' onClick={() => {
          openModal('Edge - Browser', <Browser />)
        }} />
        <Icon icon={mail} tooltip='Send me an Email' onClick={() => {
          window.open('mailto:jainprashul@gmail.com')
        }} />
        <Icon icon={calender} tooltip='Schedule Meeting' onClick={() => {
          openModal('Calender - Schedule a meeting', <Browser website='https://calendly.com/jainprashul/30min' />)
          // window.open('https://calendly.com/jainprashul/30min')
        }} />
        <Icon icon={info} tooltip='About Me' onClick={(e) => {
          openPopover(e.currentTarget, <About />)
        }} />
      </div>
    </>
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