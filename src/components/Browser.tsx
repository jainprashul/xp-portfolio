import React from 'react'
import style from './Browser.module.css'
import { isPdfUrl, normalizeUrl, pushHistory } from './browserUtils'

type LoadStatus = 'idle' | 'loading' | 'loaded' | 'blocked'

type Props = {
  website?: string
}

const HOME_URL = 'https://en.wikipedia.org/'
const LOAD_TIMEOUT_MS = 9000

// const BOOKMARKS = [
//   { id: 'wikipedia', label: 'Wikipedia', url: HOME_URL },
//   { id: 'resume', label: 'Resume', url: './resume.pdf' },
//   { id: 'calendly', label: 'Calendly', url: 'https://calendly.com/jainprashul/30min' },
//   { id: 'github', label: 'GitHub', url: 'https://github.com/jainprashul' },
// ] as const

const IFRAME_SANDBOX =
  'allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox'

const Browser = ({ website = HOME_URL }: Props) => {
  const initialUrl = normalizeUrl(website)

  const [committedUrl, setCommittedUrl] = React.useState(initialUrl)
  const [addressDraft, setAddressDraft] = React.useState(initialUrl)
  const [historyState, setHistoryState] = React.useState({
    stack: [initialUrl],
    index: 0,
  })
  const [status, setStatus] = React.useState<LoadStatus>('loading')
  const [slowLoad, setSlowLoad] = React.useState(false)
  const [viewportKey, setViewportKey] = React.useState(0)

  const { stack: historyStack, index: historyIndex } = historyState
  const canGoBack = historyIndex > 0
  const canGoForward = historyIndex < historyStack.length - 1
  const showPdf = isPdfUrl(committedUrl)

  const openExternal = () => {
    window.open(committedUrl, '_blank', 'noopener,noreferrer')
  }

  const applyUrl = (url: string) => {
    setCommittedUrl(url)
    setAddressDraft(url)
    setStatus('loading')
    setSlowLoad(false)
  }

  const navigate = (rawUrl: string) => {
    const url = normalizeUrl(rawUrl)
    if (!url) {
      return
    }

    setHistoryState((prev) => pushHistory(prev.stack, prev.index, url))
    applyUrl(url)
    setViewportKey((key) => key + 1)
  }

  const goBack = () => {
    if (!canGoBack) {
      return
    }
    const nextIndex = historyIndex - 1
    const url = historyStack[nextIndex]
    if (!url) {
      return
    }
    setHistoryState({ stack: historyStack, index: nextIndex })
    applyUrl(url)
    setViewportKey((key) => key + 1)
  }

  const goForward = () => {
    if (!canGoForward) {
      return
    }
    const nextIndex = historyIndex + 1
    const url = historyStack[nextIndex]
    if (!url) {
      return
    }
    setHistoryState({ stack: historyStack, index: nextIndex })
    applyUrl(url)
    setViewportKey((key) => key + 1)
  }

  const refresh = () => {
    setStatus('loading')
    setSlowLoad(false)
    setViewportKey((key) => key + 1)
  }

  const goHome = () => {
    navigate(HOME_URL)
  }

  const commitAddress = () => {
    navigate(addressDraft)
  }

  const handleViewportLoad = () => {
    setStatus('loaded')
    setSlowLoad(false)
  }

  const handleViewportError = () => {
    setStatus('blocked')
    setSlowLoad(false)
  }

  React.useEffect(() => {
    if (status !== 'loading') {
      return
    }

    const timer = window.setTimeout(() => {
      setSlowLoad(true)
    }, LOAD_TIMEOUT_MS)

    return () => {
      window.clearTimeout(timer)
    }
  }, [status, viewportKey])

  return (
    <div className={style.browser}>
      <div className={style.browserBar}>
        <div className={style.browserBarButtons}>
          <button
            type="button"
            className={style.chromeButton}
            aria-label="Back"
            disabled={!canGoBack}
            onClick={goBack}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M11.354 3.646a.5.5 0 0 1 0 .708L7.707 8l3.647 3.646a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0z" />
            </svg>
          </button>
          <button
            type="button"
            className={style.chromeButton}
            aria-label="Forward"
            disabled={!canGoForward}
            onClick={goForward}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4.646 3.646a.5.5 0 0 0 0 .708L8.293 8l-3.647 3.646a.5.5 0 1 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0z" />
            </svg>
          </button>
          <button
            type="button"
            className={style.chromeButton}
            aria-label="Refresh"
            onClick={refresh}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.104.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg>
          </button>
          <button
            type="button"
            className={style.chromeButton}
            aria-label="Home"
            onClick={goHome}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5z" />
            </svg>
          </button>
        </div>

        <div className={style.browserBarAddress}>
          {status === 'loading' && (
            <span className={style.loadingDot} aria-hidden="true" />
          )}
          <input
            type="text"
            placeholder="Search or enter address"
            aria-label="Address"
            value={addressDraft}
            onChange={(event) => setAddressDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                commitAddress()
              }
            }}
          />
          <button
            type="button"
            className={style.goButton}
            aria-label="Go"
            onClick={commitAddress}
          >
            Go
          </button>
        </div>
      </div>

      {/* <div className={style.bookmarks} role="navigation" aria-label="Bookmarks">
        {BOOKMARKS.map((bookmark) => (
          <button
            key={bookmark.id}
            type="button"
            className={style.bookmarkChip}
            onClick={() => navigate(bookmark.url)}
          >
            {bookmark.label}
          </button>
        ))}
      </div> */}

      {slowLoad && status === 'loading' && (
        <div className={style.slowBanner} role="status">
          <span>Taking longer than usual…</span>
          <button type="button" className={style.bannerAction} onClick={openExternal}>
            Open in new tab
          </button>
        </div>
      )}

      <div className={style.browserContent}>
        {status === 'blocked' ? (
          <div className={style.blockedPanel} role="alert">
            <p>This page could not be displayed here. It may block embedding.</p>
            <div className={style.blockedActions}>
              <button type="button" className={style.bannerAction} onClick={refresh}>
                Try again
              </button>
              <button type="button" className={style.bannerAction} onClick={openExternal}>
                Open in new tab
              </button>
            </div>
          </div>
        ) : showPdf ? (
          <embed
            key={viewportKey}
            src={committedUrl}
            type="application/pdf"
            width="100%"
            height="100%"
            title="PDF document"
            onLoad={handleViewportLoad}
            onError={handleViewportError}
          />
        ) : (
          <iframe
            key={viewportKey}
            title="Browser"
            src={committedUrl}
            allow="autoplay"
            allowFullScreen
            sandbox={IFRAME_SANDBOX}
            onLoad={handleViewportLoad}
            onError={handleViewportError}
          />
        )}
      </div>
    </div>
  )
}

export default Browser
