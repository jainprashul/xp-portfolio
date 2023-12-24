import Icon from './Icon'
import { fullscreen, github, linkedin, pdf, project, steam } from '../assets/asset'
import style from './Desktop.module.css'

const DesktopNav = () => {
  return (
    <div className={style.iconlist}>
        <div onClick={()=> {
          window.open('https://github.com/jainprashul')
        }}> <Icon icon={github} title='Github' size={60} />
        </div>
        <div onClick={()=> {
          window.open('./resume.pdf')
        }}><Icon icon={pdf} title='Resume' size={60} /></div>
        <Icon icon={project} title='Projects' size={60} />

        <div onClick={()=> {
          window.open('https://www.linkedin.com/in/jainprashul/')
        }}> <Icon icon={linkedin} title='Linkedin' size={60} />
        </div>

        <div onClick={()=> {
          window.document.body.requestFullscreen();
        }}> <Icon icon={fullscreen} title='Fullscreen' size={60} />
        </div>

        
        <Icon icon={steam} title='Steam' size={60} />
    </div>
  )
}

export default DesktopNav