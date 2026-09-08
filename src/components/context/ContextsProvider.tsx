import React from 'react'
import ModalProvider from './ModalContext'
import PopoverProvider from './PopOverContext'
import AnalyticsProvider from './AnalyticsContext'
import ExtrasProvider from './ExtrasContext'

type Props = {
  children: React.ReactNode
}

const ContextsProvider = (props: Props) => {
  // Extras must wrap Modal/Popover: their Popup/Modal trees render as
  // siblings of `children`, outside nested providers.
  return (
    <ExtrasProvider>
      <ModalProvider>
        <PopoverProvider>
          <AnalyticsProvider>
            {props.children}
          </AnalyticsProvider>
        </PopoverProvider>
      </ModalProvider>
    </ExtrasProvider>
  )
}

export default ContextsProvider