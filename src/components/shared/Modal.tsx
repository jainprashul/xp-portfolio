import React from 'react'
import style from './Modal.module.css'
type Props = {
    open: boolean,
    title?: string,
    onClose: () => void,
    children?: React.ReactNode
    footer?: React.ReactNode
    goBack?: () => void
    back?: boolean;

}

const Modal = ({ open, onClose, children, title = '', footer, goBack, back = false }: Props) => {
    if (!open) return null
    return (
        <>
            <div className={style.modalOverlay}></div>
            <div className={style.modal} style={{ display: open ? '' : 'none' }}>
                <div className={style.modalContainer}>
                    <div className={style.modalHeader}>
                        <div>
                        {back && <span className={style.goBack} onClick={goBack}>&#8592;</span>} &nbsp;
                        <span>{title}</span>
                        </div>
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