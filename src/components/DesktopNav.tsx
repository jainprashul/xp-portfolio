import Icon from './shared/Icon'
import { fullscreen, github, linkedin, pdf, project, steam } from '../assets/asset'
import style from './Desktop.module.css'
import { useModal } from './context/ModalContext'
import ProjectList from './ProjectList'

const DesktopNav = () => {  return (
    <div className={style.iconlist}>
      <Icon icon={github} title='Github' size={60} isShortcut onClick={() => {
        window.open('https://github.com/jainprashul')
      }} />

      <Icon icon={pdf} title='Resume' size={60} isShortcut onClick={() => {
        window.open('./resume.pdf')
      }} />

      <Project />

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

      <Icon icon={steam} title='Steam' size={60} />
    </div>
  )
}

export default DesktopNav


function Project() {
  const { openModal } = useModal()
  
  return (
    <>
      <Icon icon={project} title='Projects' size={60} onClick={() => {
        openModal('Projects', <ProjectList />)
      }} />
    </>
  )
}