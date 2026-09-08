import { Suspense, lazy, useMemo, useState } from 'react'
import DesktopNav, { type DesktopIconSize, type DesktopSortBy } from './DesktopNav'
import style from './Desktop.module.css'
import AnalyticsWidget from './shared/AnalyticsWidget'
import { indiaFlag } from '@/assets/asset'
import { useContextMenu } from '@/hooks/useContextMenu'
import ContextMenu, { type ContextMenuItem } from './shared/ContextMenu'
import { useModal } from './context/ModalContext'
import Loading from './shared/Loading'

const Wallpapers = lazy(() => import('./Wallpapers'))

const Desktop = () => {
  const { openModal } = useModal()
  const { onContextMenu, menuProps } = useContextMenu()
  const [iconSize, setIconSize] = useState<DesktopIconSize>('medium')
  const [sortBy, setSortBy] = useState<DesktopSortBy>('default')
  const [refreshKey, setRefreshKey] = useState(0)

  const items = useMemo<ContextMenuItem[]>(
    () => [
      {
        id: 'view',
        label: 'View',
        children: [
          {
            id: 'view-large',
            label: 'Large icons',
            onSelect: () => setIconSize('large'),
          },
          {
            id: 'view-medium',
            label: 'Medium icons',
            onSelect: () => setIconSize('medium'),
          },
          {
            id: 'view-small',
            label: 'Small icons',
            onSelect: () => setIconSize('small'),
          },
        ],
      },
      {
        id: 'arrange',
        label: 'Arrange icons',
        children: [
          {
            id: 'arrange-name',
            label: 'Name',
            onSelect: () => setSortBy('name'),
          },
          {
            id: 'arrange-type',
            label: 'Type',
            onSelect: () => setSortBy('type'),
          },
        ],
      },
      {
        id: 'refresh',
        label: 'Refresh',
        onSelect: () => setRefreshKey((k) => k + 1),
      },
      { id: 'sep-desktop', separator: true },
      {
        id: 'settings',
        label: 'Change wallpaper / Settings',
        onSelect: () =>
          openModal(
            'Settings',
            <Suspense fallback={<Loading />}>
              <Wallpapers />
            </Suspense>,
          ),
      },
    ],
    [openModal],
  )

  return (
    <div className={style.desktop} onContextMenu={onContextMenu}>
      <AnalyticsWidget variant="desktop" />
      <DesktopNav iconSize={iconSize} sortBy={sortBy} refreshKey={refreshKey} />
      <Copyright />
      <ContextMenu {...menuProps} items={items} />
    </div>
  )
}

export default Desktop

function Copyright() {
  return (
    <div className={style.copyRight}>
      <div>
        © {new Date().getFullYear()} - Prashul Jain <br /> <span>Make in India Initiative</span>
      </div>

      <img src={indiaFlag} alt="india flag" width={70} />
    </div>
  )
}
