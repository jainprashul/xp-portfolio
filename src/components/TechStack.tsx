import style from './TechStack.module.css'
import { vite } from '@/assets/asset'
import { useModal } from './context/ModalContext'
import ProjectList from './ProjectList'

type Skill = {
  name: string
  icon: string
  /** Tags used to filter Projects (OR match) */
  filterTags: string[]
}

const TechStack = () => {
  const { openModal } = useModal()

  const openFiltered = (skill: Skill) => {
    openModal('Projects', <ProjectList />, { filterTags: skill.filterTags })
  }

  const coreStack: Skill[] = [
    { name: 'TypeScript', icon: 'https://img.icons8.com/color/48/000000/typescript.png', filterTags: ['TypeScript'] },
    { name: 'React', icon: 'https://img.icons8.com/color/48/000000/react-native.png', filterTags: ['React'] },
    { name: 'Go', icon: 'https://img.icons8.com/color/48/000000/golang.png', filterTags: ['Go'] },
    { name: 'Node.js', icon: 'https://img.icons8.com/color/48/000000/nodejs.png', filterTags: ['Node.js'] },
    { name: 'Redux', icon: 'https://img.icons8.com/color/48/000000/redux.png', filterTags: ['Redux'] },
    { name: 'Kubernetes', icon: 'https://img.icons8.com/color/48/000000/kubernetes.png', filterTags: ['Kubernetes'] },
    { name: 'Docker', icon: 'https://img.icons8.com/color/48/000000/docker.png', filterTags: ['Docker'] },
    { name: 'GitHub Actions', icon: 'https://img.icons8.com/color/48/000000/github.png', filterTags: ['GitHub Actions', 'CI'] },
    { name: 'WebSockets', icon: 'https://img.icons8.com/color/48/000000/javascript--v1.png', filterTags: ['WebSockets'] },
    { name: 'Helm', icon: 'https://img.icons8.com/color/48/000000/kubernetes.png', filterTags: ['Helm', 'Kubernetes'] },
  ]

  const backendCloud: Skill[] = [
    { name: 'Python', icon: 'https://img.icons8.com/color/48/000000/python--v1.png', filterTags: ['Python'] },
    { name: 'PostgreSQL', icon: 'https://img.icons8.com/color/48/000000/postgreesql.png', filterTags: ['PostgreSQL'] },
    { name: 'MongoDB', icon: 'https://img.icons8.com/color/48/000000/mongodb.png', filterTags: ['MongoDB'] },
    { name: 'JWT / Auth', icon: 'https://img.icons8.com/color/48/000000/key-security.png', filterTags: ['JWT/Auth', 'JWT'] },
    { name: 'REST APIs', icon: 'https://img.icons8.com/color/48/000000/api-settings.png', filterTags: ['REST'] },
    { name: 'GCP', icon: 'https://img.icons8.com/color/48/000000/google-cloud-platform.png', filterTags: ['GCP'] },
    { name: 'AWS', icon: 'https://img.icons8.com/color/48/000000/amazon-web-services.png', filterTags: ['AWS'] },
    { name: 'Vite', icon: vite, filterTags: ['Vite', 'React'] },
  ]

  const systemsPlatform: Skill[] = [
    { name: 'Infra Visualization', icon: 'https://img.icons8.com/color/48/000000/flow-chart.png', filterTags: ['Graph Visualization', 'Kubernetes', 'Helm'] },
    { name: 'AI Platforms', icon: 'https://img.icons8.com/color/48/000000/artificial-intelligence.png', filterTags: ['AI Systems', 'AI'] },
    { name: 'Perf Profiling', icon: 'https://img.icons8.com/color/48/000000/speed.png', filterTags: ['Performance'] },
    { name: 'UI Systems', icon: 'https://img.icons8.com/color/48/000000/figma--v1.png', filterTags: ['React', 'TypeScript'] },
    { name: 'CI Automation', icon: 'https://img.icons8.com/color/48/000000/travis-ci.png', filterTags: ['GitHub Actions', 'CI'] },
  ]

  return (
    <div>
      <h5 className={style.heading}>Languages and Frameworks</h5>
      <p className={style.text}>
        I build systems that reduce complexity in data and infrastructure. My work focuses on turning static
        configurations, fragmented workflows, and raw telemetry into tools engineers can actually reason about—using
        React, TypeScript, Go, and Kubernetes.
      </p>
      <p className={style.hint}>Click a skill to open matching projects.</p>

      <h6 className={style.subtitle}>Core daily stack</h6>
      <div className={style.languages}>
        {coreStack.map((language) => (
          <button
            type="button"
            className={style.language}
            key={language.name}
            onClick={() => openFiltered(language)}
          >
            <img src={language.icon} alt="" width={48} height={48} />
            <div>{language.name}</div>
          </button>
        ))}
      </div>

      <h6 className={style.subtitle}>Backend, data &amp; cloud</h6>
      <div className={style.languages}>
        {backendCloud.map((language) => (
          <button
            type="button"
            className={style.language}
            key={language.name}
            onClick={() => openFiltered(language)}
          >
            <img src={language.icon} alt="" width={48} height={48} />
            <div>{language.name}</div>
          </button>
        ))}
      </div>

      <h5 className={style.heading}>Systems &amp; platform engineering</h5>
      <p className={style.text}>
        Day-to-day work sits at the boundary of UX, systems design, and automation—AI assistant platforms, Helm/k8s
        visualization, realtime SaaS performance, and CI tooling.
      </p>

      <div className={style.languages}>
        {systemsPlatform.map((tool) => (
          <button type="button" className={style.language} key={tool.name} onClick={() => openFiltered(tool)}>
            <img src={tool.icon} alt="" width={48} height={48} />
            <div>{tool.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TechStack
