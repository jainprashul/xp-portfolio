import { Suspense, lazy, useState } from 'react'
import { winMenu } from '../assets/asset'
import ContextsProvider from '../components/context/ContextsProvider'
import { useWindowSize } from '../hooks/useWindowSize'
import Mobile from '../components/mobile'
import BootScreen, { shouldShowBoot } from '../components/BootScreen'
const Desktop = lazy(() => import('../components/Desktop'))
const BottomNav = lazy(() => import('../components/BottomNav'))

function Portfolio() {
  const { height, width } = useWindowSize()
  const minResolution = width >= 1024 && height >= 680
  const [booting, setBooting] = useState(() => shouldShowBoot())

  const shell = !minResolution ? <MobileView /> : (
    <div className="App">
      <DesktopView />
    </div>
  )

  return (
    <>
      {booting && <BootScreen onDone={() => setBooting(false)} />}
      {shell}
    </>
  )
}

export default Portfolio

function DesktopView() {
  return (
    <Suspense
      fallback={
        <div className="loading">
          <img className="icon" src={winMenu} alt="" />
        </div>
      }
    >
      <ContextsProvider>
        <Desktop />
        <BottomNav />
      </ContextsProvider>
    </Suspense>
  )
}

function MobileView() {
  const { height, width } = useWindowSize()
  const isLandscape = width > height

  return (
    <div className="App">
      <div className="mobile">
        {isLandscape && (
          <div className="landscapeBanner" role="status">
            Rotate for the best experience — you can keep browsing in landscape.
          </div>
        )}
        <ContextsProvider>
          <Mobile />
        </ContextsProvider>
      </div>
    </div>
  )
}
