import style from './BottomNav.module.css';
import Icon from './shared/Icon';
import { calender, call1, chrome, contacts, edge, gmail, info, mail, message, winMenu } from '../assets/asset';
import React from 'react';
import { useModal } from './context/ModalContext';
import Browser from './Browser';
import { usePopover } from './context/PopOverContext';
import About from './About';
import WinMenu from './WinMenu';

import useWeather from '@/hooks/useWeather';

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
  const { icon, city , temp } = useWeather();

  return (
    <div className={style.weather}>
      <img src={icon} alt="weather" width={30} height={30} />
      <div className="">
        <div className={style.temp}>{temp?.toFixed(1)}°C</div>
        <div className={style.city}>{city}</div>
      </div>
    </div>
  )
}

export default BottomNav

export function MobileNav() {
  return (
    <div className={style.mobileNav}>
      <Icon icon={call1} size={56} onClick={() => {
        window.open('tel:+919406707245')
      }} />
      <Icon icon={message} size={50} onClick={() => {
        window.open('sms:+919406707245')
      }} />
      <Icon icon={gmail} size={50} onClick={() => {
        window.open('mailto:jainprashul.now.sh')
      }} />
      <Icon icon={contacts} size={50} onClick={() => {
        window.open('https://contacts.google.com/')
      }} />
    </div>
  )
}