import React from 'react'
import './Modal.scss'

const Modal = ({ children, show }) => {
    return (
        <div className={`modal__container show-${show}`} >
            {children}
        </div >
    )
}

export default Modal
