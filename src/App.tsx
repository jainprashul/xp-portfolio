

import { Suspense , lazy} from 'react'
import './App.css'
import { ModalProvider } from './components/context/ModalContext'
import { winMenu } from './assets/asset'
const Desktop = lazy(() => import('./components/Desktop'))
const BottomNav = lazy(() => import('./components/BottomNav'))

function App() {

  return (
    <Suspense fallback={<>
      <div className="loading">
        <img className='icon' src={winMenu} alt="" />
        {/* <span className="loading-text">Loading</span> */}
      </div>
    </>}>
      <ModalProvider>
        <Desktop />
        <BottomNav />
      </ModalProvider>
    </Suspense>
  )
}

export default App
