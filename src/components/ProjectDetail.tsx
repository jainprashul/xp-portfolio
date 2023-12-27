import style from './ProjectDetail.module.css';
import { Project } from '@/constants/projects';

type Props = {
    project: Project
}

const ProjectDetail = (props: Props) => {
    return (
        <>
            <div className={style.projectDetail}>
                <div className={style.meta}>
                    <img className={style.icon} src={props.project.icon} alt={props.project.title} />
                    <div>
                        <h1 className={style.title}>{props.project.title}</h1>
                        <h5 className={style.category}>{props.project.category}</h5>

                        <div className={style.tags}>
                            {props.project.tags.map((tag, index) => (
                                <span key={index}>{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <p className={style.subtitle}>{props.project.subtitle}</p>
            </div>

            <h3 className={style.sectionTitle}>About the project</h3>
            <div className={style.description}>
                {props.project.description}
            </div>

            <a className={style.link} href={props.project.link} target="_blank" rel="noreferrer">View Project</a>

            <h3 className={style.sectionTitle}>Product Images</h3>

            <div className={style.images}>
                {props.project.image.map((image, index) => (
                    <img className={style.image} key={index} src={image} alt="" />
                ))}
            </div>

            <h3 className={style.sectionTitle}>Specifications</h3>

            <div className={style.specs}>
                <div className={style.spec}>
                    <div className={style.title}>Role</div>
                    <div className={style.content}>Full Stack Developer</div>
                </div>
                <div className={style.spec}>
                    <div className={style.title}>Team Size</div>
                    <div className={style.content}>1</div>
                </div>

                <div className={style.spec}>
                    <div className={style.title}>Duration</div>
                    <div className={style.content}>8 Month</div>
                </div>

                <div className={style.spec}>
                    <div className={style.title}>Status</div>
                    <div className={style.content}>Completed</div>
                </div>

                <div className={style.spec}>
                    <div className={style.title}>Technologies</div>
                    
                        {props.project.tags.map((technology, index) => (
                            <div className={style.content} key={index}>{technology} </div>
                        ))}
                    </div>
                    </div>
        
        </>
    )
}

export default ProjectDetail