import style from './TechStack.module.css'
import { vite } from '@/assets/asset'


const TechStack = () => {
    const coreStack = [
        { name: 'TypeScript', icon: 'https://img.icons8.com/color/48/000000/typescript.png' },
        { name: 'React', icon: 'https://img.icons8.com/color/48/000000/react-native.png' },
        { name: 'Go', icon: 'https://img.icons8.com/color/48/000000/golang.png' },
        { name: 'Node.js', icon: 'https://img.icons8.com/color/48/000000/nodejs.png' },
        { name: 'Redux', icon: 'https://img.icons8.com/color/48/000000/redux.png' },
        { name: 'Kubernetes', icon: 'https://img.icons8.com/color/48/000000/kubernetes.png' },
        { name: 'Docker', icon: 'https://img.icons8.com/color/48/000000/docker.png' },
        { name: 'GitHub Actions', icon: 'https://img.icons8.com/color/48/000000/github.png' },
        { name: 'WebSockets', icon: 'https://img.icons8.com/color/48/000000/javascript--v1.png' },
        { name: 'Helm', icon: 'https://img.icons8.com/color/48/000000/kubernetes.png' },
    ]

    const backendCloud = [
        { name: 'Python', icon: 'https://img.icons8.com/color/48/000000/python--v1.png' },
        { name: 'PostgreSQL', icon: 'https://img.icons8.com/color/48/000000/postgreesql.png' },
        { name: 'MongoDB', icon: 'https://img.icons8.com/color/48/000000/mongodb.png' },
        { name: 'JWT / Auth', icon: 'https://img.icons8.com/color/48/000000/key-security.png' },
        { name: 'REST APIs', icon: 'https://img.icons8.com/color/48/000000/api-settings.png' },
        { name: 'GCP', icon: 'https://img.icons8.com/color/48/000000/google-cloud-platform.png' },
        { name: 'AWS', icon: 'https://img.icons8.com/color/48/000000/amazon-web-services.png' },
        { name: 'Vite', icon: vite },
    ]

    const systemsPlatform = [
        { name: 'Infra Visualization', icon: 'https://img.icons8.com/color/48/000000/flow-chart.png' },
        { name: 'AI Platforms', icon: 'https://img.icons8.com/color/48/000000/artificial-intelligence.png' },
        { name: 'Perf Profiling', icon: 'https://img.icons8.com/color/48/000000/speed.png' },
        { name: 'UI Systems', icon: 'https://img.icons8.com/color/48/000000/figma--v1.png' },
        { name: 'CI Automation', icon: 'https://img.icons8.com/color/48/000000/continuous-integration.png' },
    ]

    return (
        <div>
            <h5 className={style.heading}>Languages and Frameworks</h5>
            <p className={style.text}>
                I build systems that reduce complexity in data and infrastructure. My work focuses on turning static configurations, fragmented workflows, and raw telemetry into tools engineers can actually reason about—using React, TypeScript, Go, and Kubernetes.
            </p>

            <h6 className={style.subtitle}>Core daily stack</h6>
            <div className={style.languages}>
                {coreStack.map((language) => (
                    <div className={style.language} key={language.name}>
                        <img src={language.icon} alt={language.name} width={48} height={48} />
                        <div>{language.name}</div>
                    </div>
                ))}
            </div>

            <h6 className={style.subtitle}>Backend, data &amp; cloud</h6>
            <div className={style.languages}>
                {backendCloud.map((language) => (
                    <div className={style.language} key={language.name}>
                        <img src={language.icon} alt={language.name} width={48} height={48} />
                        <div>{language.name}</div>
                    </div>
                ))}
            </div>

            <h5 className={style.heading}>Systems &amp; platform engineering</h5>
            <p className={style.text}>
                Day-to-day work sits at the boundary of UX, systems design, and automation—AI assistant platforms, Helm/k8s visualization, realtime SaaS performance, and CI tooling.
            </p>

            <div className={style.languages}>
                {systemsPlatform.map((tool) => (
                    <div className={style.language} key={tool.name}>
                        <img src={tool.icon} alt={tool.name} width={48} height={48} />
                        <div>{tool.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TechStack
