import React from 'react'
import ModalProvider from './ModalContext'
import PopoverProvider from './PopOverContext'
import AnalyticsProvider from './AnalyticsContext'


type Props = {
  children: React.ReactNode
}

const ContextsProvider = (props: Props) => {
  return (
    <ModalProvider>
      <PopoverProvider>
        <AnalyticsProvider>
          {props.children}
        </AnalyticsProvider>
      </PopoverProvider>
    </ModalProvider>
  )
}

export default ContextsProvider