import { Suspense, lazy, useEffect, useState } from 'react'
import { winMenu } from '../assets/asset'
import ContextsProvider from '../components/context/ContextsProvider'
import { useWindowSize } from '../hooks/useWindowSize'
import Mobile from '../components/mobile'
import BootScreen, { shouldShowBoot } from '../components/BootScreen'
import GuidedTour from '../components/GuidedTour'
const Desktop = lazy(() => import('../components/Desktop'))
const BottomNav = lazy(() => import('../components/BottomNav'))

const LANDSCAPE_DISMISS_KEY = 'xp-portfolio-landscape-banner-dismissed'

function Portfolio() {
  const { height, width } = useWindowSize()
  const minResolution = width >= 1024 && height >= 680
  const [booting, setBooting] = useState(() => shouldShowBoot())

  const shell = !minResolution ? (
    <MobileView />
  ) : (
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
        <GuidedTour />
      </ContextsProvider>
    </Suspense>
  )
}

function MobileView() {
  const { height, width } = useWindowSize()
  const isLandscape = width > height
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    try {
      setShowBanner(isLandscape && sessionStorage.getItem(LANDSCAPE_DISMISS_KEY) !== '1')
    } catch {
      setShowBanner(isLandscape)
    }
  }, [isLandscape])

  const dismissBanner = () => {
    try {
      sessionStorage.setItem(LANDSCAPE_DISMISS_KEY, '1')
    } catch {
      // ignore
    }
    setShowBanner(false)
  }

  return (
    <div className={`App ${isLandscape ? 'mobileLandscape' : ''}`}>
      <div className="mobile">
        {showBanner && (
          <div className="landscapeBanner" role="status">
            <span>Rotate for the best experience — you can keep browsing in landscape.</span>
            <button type="button" className="landscapeDismiss" onClick={dismissBanner}>
              Dismiss
            </button>
          </div>
        )}
        <ContextsProvider>
          <Mobile />
          <GuidedTour />
        </ContextsProvider>
      </div>
    </div>
  )
}
