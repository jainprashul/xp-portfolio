import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import style from './ProjectList.module.css'
import ProjectDetail from './ProjectDetail'
import { useModal } from './context/ModalContext'
import { Project, Projects } from '@/constants/projects'

function matchesFilters(project: Project, selectedTags: string[], search: string): boolean {
  const q = search.trim().toLowerCase()
  const searchOk =
    !q ||
    project.title.toLowerCase().includes(q) ||
    (project.company?.toLowerCase().includes(q) ?? false) ||
    (project.subtitle?.toLowerCase().includes(q) ?? false)

  const tagsOk =
    selectedTags.length === 0 ||
    selectedTags.some((tag) =>
      project.tags.some((t) => t.toLowerCase() === tag.toLowerCase() || t.toLowerCase().includes(tag.toLowerCase())),
    )

  return searchOk && tagsOk
}

function ProjectList() {
  const { meta } = useModal()
  const allTags = useMemo(() => {
    const set = new Set<string>()
    Projects.forEach((p) => p.tags.forEach((t) => set.add(t)))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [])

  const [selectedTags, setSelectedTags] = useState<string[]>(() => meta?.filterTags ?? [])
  const [search, setSearch] = useState(() => meta?.initialSearch ?? '')
  const [showArchive, setShowArchive] = useState(false)
  const [focusIndex, setFocusIndex] = useState(0)

  useEffect(() => {
    if (meta?.filterTags?.length) setSelectedTags(meta.filterTags)
    if (meta?.initialSearch) setSearch(meta.initialSearch)
  }, [meta])

  const filtered = useMemo(
    () => Projects.filter((p) => matchesFilters(p, selectedTags, search)),
    [selectedTags, search],
  )

  const featured = filtered.filter((p) => p.tier === 'featured')
  const flagship = filtered.filter((p) => p.tier === 'flagship')
  const archive = filtered.filter((p) => p.tier === 'archive')
  const flatCards = [...featured, ...flagship, ...(showArchive ? archive : [])]

  useEffect(() => {
    if (archive.length && (selectedTags.length || search.trim())) {
      setShowArchive(true)
    }
  }, [archive.length, selectedTags, search])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!flatCards.length) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        setFocusIndex((i) => Math.min(i + 1, flatCards.length - 1))
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        setFocusIndex((i) => Math.max(i - 1, 0))
      }
    },
    [flatCards.length],
  )

  useEffect(() => {
    setFocusIndex(0)
  }, [selectedTags, search, showArchive])

  return (
    <div className={style.container} onKeyDown={onKeyDown}>
      <div className={style.toolbar}>
        <input
          className={style.search}
          type="search"
          placeholder="Search title or company…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search projects"
        />
        {(selectedTags.length > 0 || search) && (
          <button
            type="button"
            className={style.clearBtn}
            onClick={() => {
              setSelectedTags([])
              setSearch('')
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      <div className={style.tagRow} role="listbox" aria-label="Filter by tag" aria-multiselectable>
        {allTags.map((tag) => {
          const active = selectedTags.includes(tag)
          return (
            <button
              key={tag}
              type="button"
              role="option"
              aria-selected={active}
              className={`${style.tagChip} ${active ? style.tagChipActive : ''}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          )
        })}
      </div>

      {flatCards.length === 0 && <p className={style.empty}>No projects match these filters.</p>}

      {featured.length > 0 && (
        <section className={style.tier}>
          <h3 className={style.tierTitle}>Featured Systems &amp; AI Platforms</h3>
          <p className={style.tierSubtitle}>Highway9 Networks — Staff Engineer, R&amp;D UX</p>
          <div className={style.projects}>
            {featured.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                focused={focusIndex === i}
                onFocusCard={() => setFocusIndex(i)}
              />
            ))}
          </div>
        </section>
      )}

      {flagship.length > 0 && (
        <section className={style.tier}>
          <h3 className={style.tierTitle}>Flagship Products &amp; Developer Tools</h3>
          <div className={style.projects}>
            {flagship.map((project, i) => {
              const idx = featured.length + i
              return (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={idx}
                  focused={focusIndex === idx}
                  onFocusCard={() => setFocusIndex(idx)}
                />
              )
            })}
          </div>
        </section>
      )}

      {archive.length > 0 && (
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
              {archive.map((project, i) => {
                const idx = featured.length + flagship.length + i
                return (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={idx}
                    focused={focusIndex === idx}
                    onFocusCard={() => setFocusIndex(idx)}
                  />
                )
              })}
            </div>
          )}
        </section>
      )}
    </div>
  )
}

export default ProjectList

type ProjectCardProps = {
  project: Project
  index: number
  focused: boolean
  onFocusCard: () => void
}

function ProjectCard({ project, index, focused, onFocusCard }: ProjectCardProps) {
  const { icon, title, subtitle, description, image, tags, company } = project
  const firstImage = image[0]
  const { openModal } = useModal()
  const ref = useRef<HTMLDivElement>(null)
  const [hoverPreview, setHoverPreview] = useState(false)

  useEffect(() => {
    if (focused) ref.current?.focus()
  }, [focused])

  const open = () => openModal(title, <ProjectDetail project={project} />)

  return (
    <div
      ref={ref}
      className={`${style.projectCard} ${style.stagger} ${focused ? style.projectCardFocused : ''}`}
      style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
      tabIndex={0}
      role="button"
      onFocus={onFocusCard}
      onMouseEnter={() => firstImage && setHoverPreview(true)}
      onMouseLeave={() => setHoverPreview(false)}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          open()
        }
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
          <div className={style.projectcard__description}>{subtitle ?? description}</div>
        </div>
      </div>

      {firstImage && (
        <div className={`${style.projectcard__image} ${hoverPreview ? style.imagePreview : ''}`}>
          <img src={firstImage} alt="" />
        </div>
      )}
    </div>
  )
}
