import { Suspense, lazy } from 'react'
import Icon from './shared/Icon'
import { fullscreen, github, linkedin, pdf, project, settings, steam } from '../assets/asset'
import style from './Desktop.module.css'
import { useModal } from './context/ModalContext'
import ProjectList from './ProjectList'
import Browser from './Browser'
import Loading from './shared/Loading'
import TechStack from './TechStack'
const Wallpapers = lazy(() => import('./Wallpapers'))

const DesktopNav = () => {
  const { openModal } = useModal()

  return (
    <div className={style.iconlist}>
      <Icon icon={github} title='Github' size={60} isShortcut onClick={() => {
        window.open('https://github.com/jainprashul')
        // openModal('Github', <Browser website='https://github.com/jainprashul' />)

      }} />

      <Icon icon={pdf} title='Resume' size={60} isShortcut onClick={() => {
        // window.open('./resume.pdf')
        openModal('Resume', <Browser website='./resume.pdf' />)
      }} />

      <Icon icon={project} title='Projects' size={60} onClick={() => {
        openModal('Projects', <ProjectList />)
      }} />

      <Icon icon={linkedin} title='Linkedin' size={60} isShortcut onClick={() => {
        window.open('https://www.linkedin.com/in/jainprashul/')
      }} />


      <Icon icon={fullscreen} title='Fullscreen' size={60} onClick={() => {
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          document.documentElement.requestFullscreen()
        }
      }} />

      <Icon icon={settings} title='Settings' size={60} onClick={() => {
        openModal('Settings', <Suspense fallback={<Loading />}><Wallpapers /></Suspense>)
      }} />

      <Icon icon={steam} title='My Stack' size={60} onClick={() => {
        openModal('My Tech Stack', <TechStack />)

      }} />
    </div>
  )
}

export default DesktopNav

