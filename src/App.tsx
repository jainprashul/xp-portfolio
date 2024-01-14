

import { Suspense, lazy } from 'react'
import './App.css'
import { rotate, winMenu } from './assets/asset'
import ContextsProvider from './components/context/ContextsProvider'
import { useWindowSize } from './hooks/useWindowSize'
import Mobile from './components/mobile'
const Desktop = lazy(() => import('./components/Desktop'))
const BottomNav = lazy(() => import('./components/BottomNav'))

function App() {

  const { height, width } = useWindowSize()
  const minResolution = width >= 1024 && height >= 680;

  if (!minResolution) {
    return <MobileView />
  }

  return (
    <div className="App">
      <DesktopView />
    </div>
  )
}

export default App

function DesktopView() {
  return (
    <Suspense fallback={<>
      <div className="loading">
        <img className='icon' src={winMenu} alt="" />
      </div>
    </>}>
      <ContextsProvider>
        <Desktop />
        <BottomNav />
      </ContextsProvider>
    </Suspense>
  )
}

function MobileView() {

  const { height, width } = useWindowSize()

  // if width is greater than height, then it's landscape mode
  const isLandscape = width > height;



  if (isLandscape) {
    return <div className="App">
      <div className="mobile">
        <h5 className='title'>
          This app is not compatible on your device. Please use a tablet or desktop device.
        </h5>
        <p className='subtitle'>
          (Minimum resolution: 1024px x 720px)
        </p>
      </div>
    </div>
  }


  return (
    <div className="App">
      <div className="mobile">
        <ContextsProvider>
          {/* <img className='icon-rotate' src={rotate} alt="" />
          <h5 className='title'>
            Please rotate your device to landscape mode to view this app.
          </h5> */}
          <Mobile />
        </ContextsProvider>
      </div>
    </div>
  )
}