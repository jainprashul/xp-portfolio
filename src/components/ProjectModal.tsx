import Modal from './shared/Modal'
import style from './ProjectModal.module.css'

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void
}

const ProjectModal = ({ open, setOpen }: Props) => {
    return (
        <div>
            <Modal open={open} onClose={() => setOpen(false)} title='My Projects'>
                <div className={style.projects}>

                <ProjectCard
                    title='Project 1'
                    description='This is a project description'
                    icon='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    image='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    link='jainamdesai.com'
                    tags={['React', 'Typescript', 'Node']}
                />

                <ProjectCard
                    title='Project 2'
                    description='This is a project description'
                    icon='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    image='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    link='
                https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    tags={['React', 'Typescript', 'Node']}
                />
                <ProjectCard
                    title='Project 2'
                    description='This is a project description'
                    icon='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    image='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    link='
                https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    tags={['React', 'Typescript', 'Node']}
                />
                <ProjectCard
                    title='Project 2'
                    description='This is a project description'
                    icon='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    image='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    link='
                https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    tags={['React', 'Typescript', 'Node']}
                />
                <ProjectCard
                    title='Project 2'
                    description='This is a project description'
                    icon='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    image='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    link='
                https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    tags={['React', 'Typescript', 'Node']}
                />
                <ProjectCard
                    title='Project 2'
                    description='This is a project description'
                    icon='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    image='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    link='
                https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    tags={['React', 'Typescript', 'Node']}
                />
                <ProjectCard
                    title='Project 2'
                    description='This is a project description'
                    icon='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    image='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    link='
                https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    tags={['React', 'Typescript', 'Node']}
                />
                <ProjectCard
                    title='Project 2'
                    description='This is a project description'
                    icon='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    image='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    link='
                https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    tags={['React', 'Typescript', 'Node']}
                />
                <ProjectCard
                    title='Project 2'
                    description='This is a project description'
                    icon='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    image='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    link='
                https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    tags={['React', 'Typescript', 'Node']}
                />
                <ProjectCard
                    title='Project 2'
                    description='This is a project description'
                    icon='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    image='https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    link='
                https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png'
                    tags={['React', 'Typescript', 'Node']}
                />
                </div>

            </Modal>
        </div>
    )
}

export default ProjectModal


type ProjectCardProps = {
    title: string,
    description: string,
    icon: string,
    image: string,
    link: string,
    tags: string[]
}
function ProjectCard({ title, description, icon, image, tags }: ProjectCardProps) {
    return (
        <div className={style.projectCard}>
            <div className={style.projectMeta}>
                <img className={style.icon} src={icon} alt="" />
                <div >
                <span className={style.projectcard__title}>{title}</span>
                <div className={style.projectcard__tags}>
                    {tags.map((tag, index) => (<span key={index}>{tag}</span>))}
                </div>
                <div className={style.projectcard__description}>
                    {description}
                </div>
                </div>
            </div>

            <div className={style.projectcard__image}>
                <img src={image} alt="" />
            </div>
        </div>
    )
}