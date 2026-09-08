import React, { useCallback, useMemo, useRef, useState } from 'react'
import Modal from '../shared/Modal'
import { playClick, playWindowClose, playWindowOpen } from '@/utils/sound'
import { useWindowSize } from '@/hooks/useWindowSize'

export type ModalMeta = {
  filterTags?: string[]
  initialSearch?: string
}

type ModalContextType = {
  openModal: (title: string, content: React.ReactNode, meta?: ModalMeta) => void
  closeModal: () => void
  minimizeModal: () => void
  restoreModal: () => void
  toggleMaximize: () => void
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  minimizedTitle: string | null
  meta: ModalMeta | null
}

const modalContext = React.createContext<ModalContextType | null>(null)

export const useModal = () => {
  const context = React.useContext(modalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

type Props = {
  children: React.ReactNode
}

type HistoryEntry = {
  title: string
  content: React.ReactNode
  meta: ModalMeta | null
}

const ModalProvider = ({ children }: Props) => {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState<React.ReactNode>(null)
  const [meta, setMeta] = useState<ModalMeta | null>(null)
  const history = useRef<HistoryEntry[]>([])
  const [historyDepth, setHistoryDepth] = useState(0)
  const { width } = useWindowSize()
  const isMobile = width > 0 && width < 1024

  const clearModal = useCallback(() => {
    setVisible(false)
    setClosing(false)
    setMinimized(false)
    setMaximized(false)
    setModalTitle('')
    setModalContent(null)
    setMeta(null)
    history.current = []
    setHistoryDepth(0)
  }, [])

  const goBack = useCallback(() => {
    if (history.current.length > 1) {
      history.current.pop()
      const previous = history.current[history.current.length - 1]
      if (!previous) return
      setModalTitle(previous.title)
      setModalContent(previous.content)
      setMeta(previous.meta)
      setHistoryDepth(history.current.length)
      playClick()
    }
  }, [])

  const openModal = useCallback((title: string, content: React.ReactNode, nextMeta?: ModalMeta) => {
    const isFreshWindow = history.current.length === 0
    setClosing(false)
    setMinimized(false)
    // In-window navigation (e.g. Projects → Project Detail) must keep maximize chrome.
    // Only reset maximize when opening a brand-new modal.
    if (isFreshWindow) {
      setMaximized(false)
    }
    setVisible(true)
    setModalTitle(title)
    setModalContent(content)
    setMeta(nextMeta ?? null)
    history.current.push({ title, content, meta: nextMeta ?? null })
    setHistoryDepth(history.current.length)
    if (isFreshWindow) {
      playWindowOpen()
    } else {
      playClick()
    }
  }, [])

  const closeModal = useCallback(() => {
    if (!visible && !minimized) return
    if (minimized) {
      playWindowClose()
      clearModal()
      return
    }
    playWindowClose()
    setClosing(true)
  }, [clearModal, minimized, visible])

  const onCloseAnimationEnd = useCallback(() => {
    clearModal()
  }, [clearModal])

  const minimizeModal = useCallback(() => {
    if (!visible) return
    playClick()
    setMinimized(true)
    setVisible(false)
    setClosing(false)
  }, [visible])

  const restoreModal = useCallback(() => {
    if (!minimized && !modalContent) return
    playWindowOpen()
    setMinimized(false)
    setClosing(false)
    setVisible(true)
  }, [minimized, modalContent])

  const toggleMaximize = useCallback(() => {
    playClick()
    setMaximized((v) => !v)
  }, [])

  const value = useMemo<ModalContextType>(
    () => ({
      openModal,
      closeModal,
      minimizeModal,
      restoreModal,
      toggleMaximize,
      isOpen: visible && !minimized,
      isMinimized: minimized,
      isMaximized: maximized,
      minimizedTitle: minimized ? modalTitle : null,
      meta,
    }),
    [
      openModal,
      closeModal,
      minimizeModal,
      restoreModal,
      toggleMaximize,
      visible,
      minimized,
      maximized,
      modalTitle,
      meta,
    ],
  )

  return (
    <modalContext.Provider value={value}>
      {children}
      <Modal
        open={visible && !minimized}
        closing={closing}
        maximized={maximized && !isMobile}
        mobileSheet={isMobile}
        onClose={closeModal}
        onMinimize={isMobile ? undefined : minimizeModal}
        onToggleMaximize={isMobile ? undefined : toggleMaximize}
        onCloseAnimationEnd={onCloseAnimationEnd}
        title={modalTitle}
        back={historyDepth > 1}
        goBack={goBack}
      >
        {modalContent}
      </Modal>
    </modalContext.Provider>
  )
}

export default ModalProvider
