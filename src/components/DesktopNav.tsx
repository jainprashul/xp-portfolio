import { Suspense, lazy, useMemo } from 'react'
import Icon from './shared/Icon'
import { fullscreen, game, github, linkedin, notepadIcon, pdf, project, settings, steam } from '../assets/asset'
import style from './Desktop.module.css'
import { useModal } from './context/ModalContext'
import { useExtras } from './context/ExtrasContext'
import ProjectList from './ProjectList'
import Browser from './Browser'
import Loading from './shared/Loading'
import TechStack from './TechStack'
import Gaming from './Gaming'
import Notepad from './Notepad'
import type { ContextMenuItem } from './shared/ContextMenu'

const Wallpapers = lazy(() => import('./Wallpapers'))

export type DesktopIconSize = 'large' | 'medium' | 'small'
export type DesktopSortBy = 'default' | 'name' | 'type'

type DesktopIconDef = {
  id: string
  title: string
  icon: string
  isShortcut?: boolean
  tourId?: string
  kind: 'shortcut' | 'app'
  open: () => void
}

const SIZE_MAP: Record<DesktopIconSize, number> = {
  large: 72,
  medium: 60,
  small: 44,
}

type Props = {
  iconSize?: DesktopIconSize
  sortBy?: DesktopSortBy
  refreshKey?: number
}

const DesktopNav = ({
  iconSize = 'medium',
  sortBy = 'default',
  refreshKey = 0,
}: Props) => {
  const { openModal } = useModal()
  const { showToast } = useExtras()
  const size = SIZE_MAP[iconSize]

  const icons = useMemo<DesktopIconDef[]>(() => {
    const list: DesktopIconDef[] = [
      {
        id: 'github',
        title: 'Github',
        icon: github,
        isShortcut: true,
        kind: 'shortcut',
        open: () => window.open('https://github.com/jainprashul'),
      },
      {
        id: 'resume',
        title: 'Resume',
        icon: pdf,
        isShortcut: true,
        tourId: 'tour-resume',
        kind: 'shortcut',
        open: () => openModal('Resume', <Browser website="./resume.pdf" />),
      },
      {
        id: 'projects',
        title: 'Projects',
        icon: project,
        tourId: 'tour-projects',
        kind: 'app',
        open: () => openModal('Projects', <ProjectList />),
      },
      {
        id: 'linkedin',
        title: 'Linkedin',
        icon: linkedin,
        isShortcut: true,
        kind: 'shortcut',
        open: () => window.open('https://www.linkedin.com/in/jainprashul/'),
      },
      {
        id: 'fullscreen',
        title: 'Fullscreen',
        icon: fullscreen,
        kind: 'app',
        open: () => {
          if (document.fullscreenElement) document.exitFullscreen()
          else document.documentElement.requestFullscreen()
        },
      },
      {
        id: 'settings',
        title: 'Settings',
        icon: settings,
        kind: 'app',
        open: () =>
          openModal(
            'Settings',
            <Suspense fallback={<Loading />}>
              <Wallpapers />
            </Suspense>,
          ),
      },
      {
        id: 'stack',
        title: 'My Stack',
        icon: steam,
        kind: 'app',
        open: () => openModal('My Tech Stack', <TechStack />),
      },
      {
        id: 'games',
        title: 'Games',
        icon: game,
        tourId: 'tour-games',
        kind: 'app',
        open: () => openModal('Games', <Gaming />),
      },
      {
        id: 'notepad',
        title: 'Notepad',
        icon: notepadIcon,
        tourId: 'tour-notepad',
        kind: 'app',
        open: () => openModal('Notepad', <Notepad />),
      },
    ]

    if (sortBy === 'default') return list
    const sorted = [...list]
    if (sortBy === 'name') {
      sorted.sort((a, b) => a.title.localeCompare(b.title))
    } else {
      sorted.sort((a, b) => {
        if (a.kind === b.kind) return a.title.localeCompare(b.title)
        return a.kind === 'shortcut' ? -1 : 1
      })
    }
    return sorted
  }, [openModal, sortBy])

  const menuFor = (item: DesktopIconDef): ContextMenuItem[] => [
    {
      id: 'open',
      label: 'Open',
      onSelect: item.open,
    },
    {
      id: 'open-new',
      label: 'Open in new window',
      onSelect: item.open,
    },
    {
      id: 'pin',
      label: 'Pin to taskbar',
      onSelect: () => showToast(`Pinned “${item.title}” to taskbar (cosmetic)`),
    },
    { id: 'sep', separator: true },
    {
      id: 'props',
      label: 'Properties',
      onSelect: () =>
        showToast(
          `${item.title} — ${item.isShortcut || item.kind === 'shortcut' ? 'Shortcut' : 'Application'}`,
        ),
    },
  ]

  return (
    <div className={style.iconlist} key={refreshKey}>
      {icons.map((item) => (
        <Icon
          key={item.id}
          icon={item.icon}
          title={item.title}
          size={size}
          isShortcut={item.isShortcut}
          tourId={item.tourId}
          onClick={item.open}
          contextMenuItems={menuFor(item)}
        />
      ))}
    </div>
  )
}

export default DesktopNav
