import style from './WinMenu.module.css'
import Icon from './shared/Icon'
import { useModal } from './context/ModalContext'
import { calender, call, edge, github, insta, me, pdf, project, share, whatsapp, } from '@/assets/asset'
import Browser from './Browser'
import ProjectList from './ProjectList'


const WinMenu = () => {
  const { openModal } = useModal()
  return (
    <div className={style.container}>
      <div>
        <Icon icon={edge} onClick={() => {
          openModal('Edge - Browser', <Browser />)
        }} />
        <Icon icon={project} onClick={() => {
          openModal('Projects', <ProjectList />)
        }} />
        <Icon icon={calender} onClick={() => {
          window.open('https://calendly.com/jainprashul/30min')
        }} />

        <Icon icon={pdf} onClick={() => {
          window.open('./resume.pdf')
        }} />

        <Icon icon={github} onClick={() => {
          window.open('https://github.com/jainprashul')
        }} />
      </div>
      <div className={style.about}>
        <div className={style.title}>Phone</div>
        <div className={style.content}>+91-9406707245</div>
      </div>

      <div className={style.about}>
        <div className={style.title}>Email</div>
        <div className={style.content}> jainprashul@gmail.com</div>
      </div>

      <div className={style.about}>
        <div className={style.title}>Address</div>
        <div className={style.content}>Nagpur, Maharashtra, India</div>
      </div>

      <div className={style.about}>
        <div className={style.title}>Experience</div>
        <div className={style.content}>{new Date().getFullYear() - 2019}+ Years</div>

        <div className={style.title}>Skills</div>
        <div className={style.content}>React , React Native <br /> Nodejs , Express <br /> Typescript , Javascript <br /> Python <br /> HTML , CSS , REST, Git, Linux<br /> MongoDB, Firebase, Postgres <br />GCP, Docker, Kubernetes
        </div>
      </div>

      <div className={style.footer}>
        <div className={style.name}>
          <img className={style.avatar} src={me} alt="me" width={100} height={100} />
          <div>
            <span className={style.title}>Prashul Jain</span>
            <br />
            <span className={style.subname}>Senior Full Stack Developer</span>
          </div>
        </div>

        <div className={style.social}>
          <img src={call} alt="" width={20} height={20} onClick={() => {
            window.open('tel:+91-9406707245')
          }} />

          <img src={whatsapp} alt="" width={20} height={20} onClick={() => {
            window.open('https://wa.me/919406707245')
          }} />

          <img src={insta} alt="" width={20} height={20} onClick={() => {
            window.open('https://www.instagram.com/lazy_perfectionist/')
          }} />

          <img src={share} alt="" width={20} height={20} onClick={() => {
            navigator.share({
              title: 'Prashul Jain',
              text: 'Full Stack Developer',
              url: 'https://jainprashul.github.io/',
            })
          }} />


        
        </div>
          

      </div>


    </div>
  )
}

export default WinMenu