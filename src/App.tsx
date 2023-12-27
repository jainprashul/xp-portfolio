

import './App.css'
import BottomNav from './components/ButtomNav'
import Desktop from './components/Desktop'
import { ModalProvider } from './components/context/ModalContext'

function App() {

  return (
    <>
      <ModalProvider>
        <Desktop />
        <BottomNav />
      </ModalProvider>
    </>
  )
}

export default App
