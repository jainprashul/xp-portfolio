import React from 'react'
import ModalProvider from './ModalContext'
import PopoverProvider from './PopOverContext'


type Props = {
  children: React.ReactNode
}

const ContextsProvider = (props: Props) => {
  return (
    <ModalProvider>
      <PopoverProvider>
        {props.children}
      </PopoverProvider>
    </ModalProvider>
  )
}

export default ContextsProvider