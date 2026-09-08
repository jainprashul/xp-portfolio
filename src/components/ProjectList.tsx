import { useState } from 'react'
import style from './ProjectList.module.css'
import ProjectDetail from './ProjectDetail'
import { useModal } from './context/ModalContext'
import { Project, Projects } from '@/constants/projects'

const featured = Projects.filter((p) => p.tier === 'featured')
const flagship = Projects.filter((p) => p.tier === 'flagship')
const archive = Projects.filter((p) => p.tier === 'archive')

function ProjectList() {
    const [showArchive, setShowArchive] = useState(false)

    return (
        <div className={style.container}>
            <section className={style.tier}>
                <h3 className={style.tierTitle}>Featured Systems &amp; AI Platforms</h3>
                <p className={style.tierSubtitle}>Highway9 Networks — Staff Engineer, R&amp;D UX</p>
                <div className={style.projects}>
                    {featured.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </div>
            </section>

            <section className={style.tier}>
                <h3 className={style.tierTitle}>Flagship Products &amp; Developer Tools</h3>
                <div className={style.projects}>
                    {flagship.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </div>
            </section>

            <section className={style.tier}>
                <button
                    type="button"
                    className={style.archiveToggle}
                    onClick={() => setShowArchive((open) => !open)}
                    aria-expanded={showArchive}
                >
                    {showArchive ? 'Hide archive' : 'Show archive'} ({archive.length})
                </button>
                {showArchive && (
                    <div className={style.projects}>
                        {archive.map((project) => (
                            <ProjectCard key={project.title} project={project} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default ProjectList

type ProjectCardProps = {
    project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
    const { icon, title, subtitle, description, image, tags, company } = project
    const firstImage = image[0]
    const { openModal } = useModal()

    return (
        <div
            className={style.projectCard}
            onClick={() => {
                openModal(title, <ProjectDetail project={project} />)
            }}
        >
            <div className={style.projectMeta}>
                <img className={style.icon} src={icon} alt="" />
                <div>
                    <span className={style.projectcard__title}>{title}</span>
                    {company && <div className={style.company}>{company}</div>}
                    <div className={style.projectcard__tags}>
                        {tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                        ))}
                    </div>
                    <div className={style.projectcard__description}>
                        {subtitle ?? description}
                    </div>
                </div>
            </div>

            {firstImage && (
                <div className={style.projectcard__image}>
                    <img src={firstImage} alt="" />
                </div>
            )}
        </div>
    )
}
