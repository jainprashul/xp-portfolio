import style from './BottomNav.module.css'
import Icon from './shared/Icon'
import { calender, call1, contacts, edge, gmail, info, mail, message, project, winMenu } from '../assets/asset'
import React, { Suspense, lazy, useMemo, useRef } from 'react'
import { useModal } from './context/ModalContext'
import Browser from './Browser'
import { usePopover } from './context/PopOverContext'
import About from './About'
import WinMenu from './WinMenu'
import ProjectList from './ProjectList'
import useWeather from '@/hooks/useWeather'
import { useContextMenu } from '@/hooks/useContextMenu'
import ContextMenu, { type ContextMenuItem } from './shared/ContextMenu'
import Loading from './shared/Loading'

const Wallpapers = lazy(() => import('./Wallpapers'))

const BottomNav = () => {
  return (
    <div className={style.bg}>
      <WeatherBox />
      <Menu />
      <DateBox />
    </div>
  )
}

function openSettings(openModal: ReturnType<typeof useModal>['openModal']) {
  openModal(
    'Settings',
    <Suspense fallback={<Loading />}>
      <Wallpapers />
    </Suspense>,
  )
}

function Menu() {
  const {
    openModal,
    closeModal,
    minimizeModal,
    restoreModal,
    isMinimized,
    isOpen,
    minimizedTitle,
    windowTitle,
  } = useModal()
  const { openPopover } = usePopover()
  const startAnchorRef = useRef<HTMLDivElement>(null)

  const startMenu = useContextMenu()
  const edgeMenu = useContextMenu()
  const mailMenu = useContextMenu()
  const calMenu = useContextMenu()
  const aboutMenu = useContextMenu()
  const chipMenu = useContextMenu()

  const isEdgeActive = windowTitle === 'Edge - Browser'
  const isCalActive = windowTitle === 'Calender - Schedule a meeting'
  const isAboutActive = windowTitle === 'About Me'

  const startItems = useMemo<ContextMenuItem[]>(
    () => [
      {
        id: 'open-start',
        label: 'Open',
        onSelect: () => {
          if (startAnchorRef.current) openPopover(startAnchorRef.current, <WinMenu />)
        },
      },
      {
        id: 'settings',
        label: 'Settings',
        onSelect: () => openSettings(openModal),
      },
    ],
    [openModal, openPopover],
  )

  const edgeItems = useMemo<ContextMenuItem[]>(() => {
    const items: ContextMenuItem[] = [
      {
        id: 'open',
        label: 'Open',
        onSelect: () => openModal('Edge - Browser', <Browser />),
      },
    ]
    if (isEdgeActive) {
      items.push({ id: 'win-sep', separator: true })
      if (isMinimized) items.push({ id: 'restore', label: 'Restore', onSelect: restoreModal })
      else if (isOpen) items.push({ id: 'minimize', label: 'Minimize', onSelect: minimizeModal })
      items.push({ id: 'close', label: 'Close', onSelect: closeModal })
    }
    return items
  }, [isEdgeActive, isMinimized, isOpen, openModal, closeModal, minimizeModal, restoreModal])

  const mailItems = useMemo<ContextMenuItem[]>(
    () => [
      {
        id: 'open',
        label: 'Open',
        onSelect: () => window.open('mailto:jainprashul@gmail.com'),
      },
    ],
    [],
  )

  const calItems = useMemo<ContextMenuItem[]>(() => {
    const items: ContextMenuItem[] = [
      {
        id: 'open',
        label: 'Open',
        onSelect: () =>
          openModal('Calender - Schedule a meeting', <Browser website="https://calendly.com/jainprashul/30min" />),
      },
    ]
    if (isCalActive) {
      items.push({ id: 'win-sep', separator: true })
      if (isMinimized) items.push({ id: 'restore', label: 'Restore', onSelect: restoreModal })
      else if (isOpen) items.push({ id: 'minimize', label: 'Minimize', onSelect: minimizeModal })
      items.push({ id: 'close', label: 'Close', onSelect: closeModal })
    }
    return items
  }, [isCalActive, isMinimized, isOpen, openModal, closeModal, minimizeModal, restoreModal])

  const aboutItems = useMemo<ContextMenuItem[]>(() => {
    const items: ContextMenuItem[] = [
      {
        id: 'open',
        label: 'Open',
        onSelect: () => openModal('About Me', <About />),
      },
    ]
    if (isAboutActive) {
      items.push({ id: 'win-sep', separator: true })
      if (isMinimized) items.push({ id: 'restore', label: 'Restore', onSelect: restoreModal })
      else if (isOpen) items.push({ id: 'minimize', label: 'Minimize', onSelect: minimizeModal })
      items.push({ id: 'close', label: 'Close', onSelect: closeModal })
    }
    return items
  }, [isAboutActive, isMinimized, isOpen, openModal, closeModal, minimizeModal, restoreModal])

  const chipItems = useMemo<ContextMenuItem[]>(
    () => [
      { id: 'restore', label: 'Restore', onSelect: restoreModal },
      { id: 'close', label: 'Close', onSelect: closeModal },
    ],
    [restoreModal, closeModal],
  )

  return (
    <>
      <div className={style.navIcons}>
        <div ref={startAnchorRef} onContextMenu={startMenu.onContextMenu}>
          <Icon
            icon={winMenu}
            tooltip="Show Menu"
            tourId="tour-start"
            onClick={(e) => {
              openPopover(e.currentTarget, <WinMenu />)
            }}
          />
        </div>
        <div onContextMenu={edgeMenu.onContextMenu}>
          <Icon
            icon={edge}
            tooltip="Open Browser"
            onClick={() => {
              openModal('Edge - Browser', <Browser />)
            }}
          />
        </div>
        <div onContextMenu={mailMenu.onContextMenu}>
          <Icon
            icon={mail}
            tooltip="Send me an Email"
            onClick={() => {
              window.open('mailto:jainprashul@gmail.com')
            }}
          />
        </div>
        <div onContextMenu={calMenu.onContextMenu}>
          <Icon
            icon={calender}
            tooltip="Schedule Meeting"
            onClick={() => {
              openModal('Calender - Schedule a meeting', <Browser website="https://calendly.com/jainprashul/30min" />)
            }}
          />
        </div>
        <div onContextMenu={aboutMenu.onContextMenu}>
          <Icon
            icon={info}
            tooltip="About Me"
            tourId="tour-about"
            onClick={() => {
              openModal('About Me', <About />)
            }}
          />
        </div>
        {isMinimized && minimizedTitle && (
          <button
            type="button"
            className={style.taskChip}
            onClick={restoreModal}
            onContextMenu={chipMenu.onContextMenu}
            title="Restore window"
          >
            {minimizedTitle}
          </button>
        )}
      </div>
      <ContextMenu {...startMenu.menuProps} items={startItems} />
      <ContextMenu {...edgeMenu.menuProps} items={edgeItems} />
      <ContextMenu {...mailMenu.menuProps} items={mailItems} />
      <ContextMenu {...calMenu.menuProps} items={calItems} />
      <ContextMenu {...aboutMenu.menuProps} items={aboutItems} />
      <ContextMenu {...chipMenu.menuProps} items={chipItems} />
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
