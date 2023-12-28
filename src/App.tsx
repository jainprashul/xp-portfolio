

import { Suspense, lazy } from 'react'
import './App.css'
import { winMenu } from './assets/asset'
import ContextsProvider from './components/context/ContextsProvider'
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
      <ContextsProvider>
        <Desktop />
        <BottomNav />
      </ContextsProvider>
    </Suspense>
  )
}

export default App
