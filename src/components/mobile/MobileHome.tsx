import { Suspense, lazy } from 'react'
import Icon from '../shared/Icon'
import { game, github, linkedin, pdf, project, settings, steam, winMenu } from '@/assets/asset'
import style from './Mobile.module.css'
import { useModal } from '../context/ModalContext'
import ProjectList from '../ProjectList'
import Browser from '../Browser'
import Loading from '../shared/Loading'
import TechStack from '../TechStack'
import Gaming from '../Gaming'
import Notepad from '../Notepad'
import About from '../About'
import WinMenu from '../WinMenu'
import { usePopover } from '../context/PopOverContext'

const Wallpapers = lazy(() => import('../Wallpapers'))

const NOTEPAD_ICON = 'https://img.icons8.com/color/48/000000/notepad.png'

const MobileHome = () => {
  const { openModal } = useModal()
  const { openPopover } = usePopover()

  return (
    <div className={style.home}>
      <p className={style.homeLabel}>Apps</p>
      <div className={style.appGrid}>
        <Icon
          icon={project}
          title="Projects"
          size={52}
          tourId="tour-projects"
          onClick={() => openModal('Projects', <ProjectList />)}
        />
        <Icon
          icon={pdf}
          title="Resume"
          size={52}
          tourId="tour-resume"
          onClick={() => openModal('Resume', <Browser website="./resume.pdf" />)}
        />
        <Icon
          icon={steam}
          title="My Stack"
          size={52}
          onClick={() => openModal('My Tech Stack', <TechStack />)}
        />
        <Icon
          icon={game}
          title="Games"
          size={52}
          tourId="tour-games"
          onClick={() => openModal('Games', <Gaming />)}
        />
        <Icon
          icon={NOTEPAD_ICON}
          title="Notepad"
          size={52}
          tourId="tour-notepad"
          onClick={() => openModal('Notepad', <Notepad />)}
        />
        <Icon
          icon={settings}
          title="Wallpapers"
          size={52}
          onClick={() =>
            openModal(
              'Settings',
              <Suspense fallback={<Loading />}>
                <Wallpapers />
              </Suspense>,
            )
          }
        />
        <Icon
          icon={github}
          title="Github"
          size={52}
          isShortcut
          onClick={() => window.open('https://github.com/jainprashul')}
        />
        <Icon
          icon={linkedin}
          title="LinkedIn"
          size={52}
          isShortcut
          onClick={() => window.open('https://www.linkedin.com/in/jainprashul/')}
        />
      </div>

      <p className={style.homeLabel}>Quick open</p>
      <div className={style.quickRow}>
        <button
          type="button"
          className={style.quickChip}
          onClick={() => openModal('Projects', <ProjectList />, { filterTags: ['React'] })}
        >
          React projects
        </button>
        <button
          type="button"
          className={style.quickChip}
          onClick={() => openModal('Projects', <ProjectList />, { filterTags: ['TypeScript'] })}
        >
          TypeScript
        </button>
        <button type="button" className={style.quickChip} onClick={() => openModal('About Me', <About />)}>
          About
        </button>
      </div>
    </div>
  )
}

export default MobileHome
