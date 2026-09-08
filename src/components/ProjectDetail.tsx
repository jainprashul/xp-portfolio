import { useEffect, useRef, useState } from 'react'
import style from './ProjectDetail.module.css'
import { Project, ProjectSection } from '@/constants/projects'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type Props = {
  project: Project
}

const ProjectDetail = ({ project }: Props) => {
  const hasImages = project.image.length > 0
  const sections = project.sections ?? []
  const showToc = sections.length >= 2

  return (
    <div className={`${style.layout} ${showToc ? style.layoutWithToc : ''}`}>
      {showToc && (
        <nav className={style.toc} aria-label="Case study sections">
          <div className={style.tocTitle}>On this page</div>
          <a href="#about">About</a>
          {sections.map((section) => (
            <a key={section.title} href={`#${slugify(section.title)}`}>
              {section.title}
            </a>
          ))}
          <a href="#specs">Specifications</a>
        </nav>
      )}

      <div className={style.main}>
        <div className={style.projectDetail}>
          <div className={style.meta}>
            <img className={style.icon} src={project.icon} alt={project.title} />
            <div>
              <h1 className={style.title}>{project.title}</h1>
              {project.category && <h5 className={style.category}>{project.category}</h5>}
              {project.company && <div className={style.company}>{project.company}</div>}
              <div className={style.tags}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
          {project.subtitle && <p className={style.subtitle}>{project.subtitle}</p>}
        </div>

        <div className={style.links}>
          {project.link && (
            <a className={style.linkBtn} href={project.link} target="_blank" rel="noreferrer">
              View Project
            </a>
          )}
          {project.github && (
            <a className={style.linkBtn} href={project.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
        </div>

        <RevealSection id="about">
          <h3 className={style.sectionTitle}>About the project</h3>
          <div className={style.description}>{project.description}</div>
        </RevealSection>

        {sections.map((section) => (
          <CaseStudySection key={section.title} section={section} />
        ))}

        {hasImages && (
          <RevealSection id="images">
            <h3 className={style.sectionTitle}>Product Images</h3>
            <div className={style.images}>
              {project.image.map((image, index) => (
                <img className={style.image} key={index} src={image} alt="" />
              ))}
            </div>
          </RevealSection>
        )}

        <RevealSection id="specs">
          <h3 className={style.sectionTitle}>Specifications</h3>
          <div className={style.specs}>
            <div className={style.spec}>
              <div className={style.title}>Role</div>
              <div className={style.content}>{project.role ?? 'Full Stack Developer'}</div>
            </div>
            {project.company && (
              <div className={style.spec}>
                <div className={style.title}>Company</div>
                <div className={style.content}>{project.company}</div>
              </div>
            )}
            <div className={style.spec}>
              <div className={style.title}>Duration</div>
              <div className={style.content}>{project.duration}</div>
            </div>
            <div className={style.spec}>
              <div className={style.title}>Technologies</div>
              {project.tags.map((technology) => (
                <div className={style.content} key={technology}>
                  {technology}
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>
    </div>
  )
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function RevealSection({ id, children }: { id: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const [visible, setVisible] = useState(reduced)

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <section
      id={id}
      ref={ref}
      className={`${style.reveal} ${visible ? style.revealVisible : ''}`}
    >
      {children}
    </section>
  )
}

function CaseStudySection({ section }: { section: ProjectSection }) {
  const items = Array.isArray(section.content) ? section.content : null
  const id = slugify(section.title)

  return (
    <RevealSection id={id}>
      <h3 className={style.sectionTitle}>{section.title}</h3>
      {items ? (
        <ul className={style.sectionList}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <div className={style.description}>{section.content}</div>
      )}
    </RevealSection>
  )
}

export default ProjectDetail
