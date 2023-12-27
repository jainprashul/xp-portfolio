

import style from './ProjectList.module.css'

import ProjectDetail from './ProjectDetail'
import { useModal } from './context/ModalContext'
import { Project, Projects } from '@/constants/projects'


function ProjectList() {
    return (
        <div className={style.projects}>
            {
                Projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        project={project}
                    />
                ))
            }
        </div>
    )
}


export default ProjectList


type ProjectCardProps = {
    project: Project
}
function ProjectCard({ project }: ProjectCardProps) {
    const { icon, title, subtitle , description , image, tags } = project
    const [firstImage] = image;
    const { openModal } = useModal()
    return (
        <>
            <div className={style.projectCard} onClick={() => {
                openModal(title, <ProjectDetail project={project} />)
            } }>
                <div className={style.projectMeta}>
                    <img className={style.icon} src={icon} alt="" />
                    <div >
                        <span className={style.projectcard__title}>{title}</span>
                        <div className={style.projectcard__tags}>
                            {tags.map((tag, index) => (<span key={index}>{tag}</span>))}
                        </div>
                        <div className={style.projectcard__description}>
                            {subtitle ?? description}
                        </div>
                    </div>
                </div>

                <div className={style.projectcard__image}>
                    <img src={firstImage} alt="Project Image" />
                </div>
            </div>
        </>
    )
}