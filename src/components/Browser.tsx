import React from 'react'
import style from './Browser.module.css'

const Browser = () => {

    const [url, setUrl] = React.useState('https://en.wikipedia.org/')
    const [history, setHistory] = React.useState<string[]>([url])
    const [index, setIndex] = React.useState(1)

    const iframeRef = React.useRef<HTMLIFrameElement>(null)

    return (
        <div className={style.browser}>
            <div className={style.browserBar}>
                <div className={style.browserBarButtons}>
                    {/* caret backward */}
                    <div onClick={() => {
                            iframeRef.current?.contentWindow?.history.back()
                            setUrl(iframeRef.current?.contentWindow?.location.href || '')
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                            <path d="M11.354 3.646a.5.5 0 0 1 0 .708L7.707 8l3.647 3.646a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0z" />
                        </svg>
                    </div>
                    {/* caret forward */}
                    <div onClick={() => {
                        if (index < history.length - 1) {
                            setIndex(index + 1)
                            iframeRef.current?.contentWindow?.history.forward()
                            setUrl(iframeRef.current?.contentWindow?.location.href || '')
                        }
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                        <path d="M4.646 3.646a.5.5 0 0 0 0 .708L8.293 8l-3.647 3.646a.5.5 0 1 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0z" />
                    </svg>
                    </div>

                    {/* refresh */}
                    <div onClick={() => {
                        iframeRef.current?.contentWindow?.location.reload()
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 0 10A5 5 0 0 0 8 3zM6.5 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H7a.5.5 0 0 1-.5-.5z" />
                        <path d="M8 4.5a.5.5 0 0 0-1 0V7a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 0-1H8z" />
                    </svg>
                    </div>



                    


                </div>
                <div className={style.browserBarAddress}>
                    <input type="text" placeholder="Search or enter address" value={url} onChange={(e) => {
                        setUrl(e.target.value)
                    }} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            console.log('enter', url)
                            const _url = url.startsWith('http') ? url : `https://${url}`
                            iframeRef.current?.setAttribute('src', _url)
                            setHistory([...history, _url])
                            setIndex(index + 1)
                        }
                    }} />

                </div>
            </div>
            <div className={style.browserContent}>
                <iframe ref={iframeRef} title="Browser" src={'https://en.wikipedia.org/'} allow='autoplay' allowFullScreen={true} sandbox='allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox' />
            </div>
        </div>

    )
}

export default Browser