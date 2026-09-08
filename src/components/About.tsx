import { me } from '@/assets/asset'
import style from './About.module.css'

const focusAreas = [
  'AI assistant platforms',
  'Infra visualization (Helm / k8s)',
  'Realtime SaaS performance',
  'Developer automation',
] as const

const About = () => {
  const years = new Date().getFullYear() - 2019

  return (
    <div className={style.container}>
      <header className={style.header}>
        <img src={me} alt="Prashul Jain" className={style.avatar} />
        <div className={style.identity}>
          <h2 className={style.name}>Prashul Jain</h2>
          <p className={style.role}>Staff Engineer, R&amp;D UX · Highway9 Networks</p>
          <p className={style.tagline}>
            I turn static configs, fragmented workflows, and raw telemetry into tools engineers can actually reason
            about.
          </p>
        </div>
      </header>

      <section className={style.section}>
        <h3 className={style.heading}>What I do</h3>
        <p className={style.text}>
          I build operator-facing systems for cloud-native enterprise networking — React/TypeScript UIs, Go services,
          and Kubernetes packaging — with a focus on reducing complexity in data and infrastructure.
        </p>
      </section>

      <section className={style.section}>
        <h3 className={style.heading}>Recent focus</h3>
        <ul className={style.chips}>
          {focusAreas.map((item) => (
            <li key={item} className={style.chip}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className={style.section}>
        <h3 className={style.heading}>Background</h3>
        <p className={style.text}>
          About {years} years in design and development of applications. Computer Science graduate from Priyadarshini
          College of Engineering.
        </p>
      </section>

      <section className={style.section}>
        <h3 className={style.heading}>Outside work</h3>
        <p className={style.text}>I love to read, travel, and play video games.</p>
      </section>

      <footer className={style.footer}>
        <h3 className={style.heading}>Reach out</h3>
        <div className={style.contactRow}>
          <a className={style.contactLink} href="tel:+919406707245">
            +91-9406707245
          </a>
          <a className={style.contactLink} href="mailto:jainprashul@gmail.com">
            jainprashul@gmail.com
          </a>
        </div>
      </footer>
    </div>
  )
}

export default About
