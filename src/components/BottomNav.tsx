import style from './BottomNav.module.css'
import Icon from './shared/Icon'
import { calender, call1, contacts, edge, gmail, info, mail, message, project, winMenu } from '../assets/asset'
import React from 'react'
import { useModal } from './context/ModalContext'
import Browser from './Browser'
import { usePopover } from './context/PopOverContext'
import About from './About'
import WinMenu from './WinMenu'
import ProjectList from './ProjectList'
import useWeather from '@/hooks/useWeather'

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
  const { openModal, isMinimized, minimizedTitle, restoreModal } = useModal()
  const { openPopover } = usePopover()

  return (
    <>
      <div className={style.navIcons}>
        <Icon
          icon={winMenu}
          tooltip="Show Menu"
          tourId="tour-start"
          onClick={(e) => {
            openPopover(e.currentTarget, <WinMenu />)
          }}
        />
        <Icon
          icon={edge}
          tooltip="Open Browser"
          onClick={() => {
            openModal('Edge - Browser', <Browser />)
          }}
        />
        <Icon
          icon={mail}
          tooltip="Send me an Email"
          onClick={() => {
            window.open('mailto:jainprashul@gmail.com')
          }}
        />
        <Icon
          icon={calender}
          tooltip="Schedule Meeting"
          onClick={() => {
            openModal('Calender - Schedule a meeting', <Browser website="https://calendly.com/jainprashul/30min" />)
          }}
        />
        <Icon
          icon={info}
          tooltip="About Me"
          tourId="tour-about"
          onClick={() => {
            openModal('About Me', <About />)
          }}
        />
        {isMinimized && minimizedTitle && (
          <button type="button" className={style.taskChip} onClick={restoreModal} title="Restore window">
            {minimizedTitle}
          </button>
        )}
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
  const { icon, city, temp } = useWeather()

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
  const { openModal } = useModal()

  return (
    <nav className={style.mobileDock} aria-label="Phone dock">
      <div className={style.mobileDockInner}>
        <Icon
          icon={call1}
          size={44}
          tooltip="Call"
          onClick={() => {
            window.open('tel:+919406707245')
          }}
        />
        <Icon
          icon={message}
          size={40}
          tooltip="SMS"
          onClick={() => {
            window.open('sms:+919406707245')
          }}
        />
        <Icon
          icon={project}
          size={40}
          tooltip="Projects"
          tourId="tour-projects-dock"
          onClick={() => {
            openModal('Projects', <ProjectList />)
          }}
        />
        <Icon
          icon={gmail}
          size={40}
          tooltip="Email"
          onClick={() => {
            window.open('mailto:jainprashul@gmail.com')
          }}
        />
        <Icon
          icon={contacts}
          size={40}
          tooltip="About"
          onClick={() => {
            openModal('About Me', <About />)
          }}
        />
      </div>
    </nav>
  )
}
