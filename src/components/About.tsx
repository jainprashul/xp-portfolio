import { me } from '@/assets/asset'
import style from './About.module.css'

const About = () => {
    const years = new Date().getFullYear() - 2019

    return (
        <div className={style.container}>
            <div className={style.borderBottom}>
                <img src={me} alt="Prashul Jain" className={style.avatar} />
            </div>
            <p>
                Hi, I&apos;m Prashul Jain — Staff Engineer, R&amp;D UX at Highway9 Networks.
                I build operator-facing systems for cloud-native enterprise networking across React/TypeScript UIs, Go services, and Kubernetes packaging.
            </p>
            <p>
                Recent focus: AI assistant platforms, infra visualization (Helm/k8s graphs), realtime SaaS performance, and developer automation.
            </p>
            <p>Working from around {years} years in design and development of applications.</p>
            <p>I&apos;m a Computer Science graduate from Priyadarshini College of Engineering.</p>
            <p>I love to read, travel, and play video games.</p>
            <p>
                Feel free to reach out at <a href="tel:+919406707245">+91-9406707245</a> or{' '}
                <a href="mailto:jainprashul@gmail.com">jainprashul@gmail.com</a>
            </p>
        </div>
    )
}

export default About
