import React from 'react'
import style from './Modal.module.css'
type Props = {
    open: boolean,
    title?: string,
    onClose: () => void,
    children?: React.ReactNode
    footer?: React.ReactNode
}

const Modal = ({ open, onClose, children, title = '', footer }: Props) => {
    if (!open) return null
    return (
        <>
            <div className={style.modalOverlay}></div>
            <div className={style.modal} style={{ display: open ? '' : 'none' }}>
                <div className={style.modalContainer}>
                    <div className={style.modalHeader}>
                        <span>{title}</span>
                        <span className={style.close} onClick={onClose}>&times;</span>
                    </div>
                    <div className={style.modalContent}>
                        {children}
                    </div>

                    <div className={style.modalFooter}>
                        {footer}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal