import style from './WinMenu.module.css'
import Icon from './shared/Icon'
import { useModal } from './context/ModalContext'
import { calender, call, edge, github, insta, me, pdf, project, share, whatsapp } from '@/assets/asset'
import Browser from './Browser'
import ProjectList from './ProjectList'
import { useEffect, useState } from 'react'
import { isSoundEnabled, setSoundEnabled } from '@/utils/sound'
import { useExtras } from './context/ExtrasContext'


const WinMenu = () => {
  const { openModal } = useModal()
  const years = new Date().getFullYear() - 2019
  const [soundOn, setSoundOn] = useState(true)
  const { unlockStaffMode, triggerBsod } = useExtras()

  useEffect(() => {
    setSoundOn(isSoundEnabled())
  }, [])

  return (
    <div className={style.container}>
      <div>
        <Icon
          icon={edge}
          onClick={() => {
            openModal('Edge - Browser', <Browser />)
          }}
        />
        <Icon
          icon={project}
          onClick={() => {
            openModal('Projects', <ProjectList />)
          }}
        />
        <Icon
          icon={calender}
          onClick={() => {
            window.open('https://calendly.com/jainprashul/30min')
          }}
        />

        <Icon
          icon={pdf}
          onClick={() => {
            window.open('./resume.pdf')
          }}
        />

        <Icon
          icon={github}
          onClick={() => {
            window.open('https://github.com/jainprashul')
          }}
        />
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
        <div className={style.content}>{years}+ Years</div>

        <div className={style.title}>Skills</div>
        <div className={style.content}>
          TypeScript, React, Go
          <br />
          Kubernetes, Helm, Docker
          <br />
          GitHub Actions, WebSockets
          <br />
          JWT/Auth, Node.js, Python
          <br />
          AWS, GCP, Redux
        </div>
      </div>

      <div className={style.extras}>
        <div className={style.title}>Extras</div>
        <label className={style.toggleRow}>
          <span>UI sounds</span>
          <input
            type="checkbox"
            checked={soundOn}
            onChange={(e) => {
              const next = e.target.checked
              setSoundEnabled(next)
              setSoundOn(next)
            }}
          />
        </label>
        <button type="button" className={style.extraBtn} onClick={unlockStaffMode}>
          Unlock Staff mode
        </button>
        <button type="button" className={style.extraBtn} onClick={triggerBsod}>
          Fake BSOD (joke)
        </button>
      </div>

      <div className={style.footer}>
        <div className={style.name}>
          <img className={style.avatar} src={me} alt="me" width={100} height={100} />
          <div>
            <span className={style.title}>Prashul Jain</span>
            <br />
            <span className={style.subname}>Staff Engineer, R&amp;D UX</span>
          </div>
        </div>

        <div className={style.social}>
          <img
            src={call}
            alt=""
            width={20}
            height={20}
            onClick={() => {
              window.open('tel:+91-9406707245')
            }}
          />

          <img
            src={whatsapp}
            alt=""
            width={20}
            height={20}
            onClick={() => {
              window.open('https://wa.me/919406707245')
            }}
          />

          <img
            src={insta}
            alt=""
            width={20}
            height={20}
            onClick={() => {
              window.open('https://www.instagram.com/lazy_perfectionist/')
            }}
          />

          <img
            src={share}
            alt=""
            width={20}
            height={20}
            onClick={() => {
              navigator.share({
                title: 'Prashul Jain',
                text: 'Staff Engineer | Systems UX & AI Tooling',
                url: 'https://jainprashul.vercel.app',
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default WinMenu
