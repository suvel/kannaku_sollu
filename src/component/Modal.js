import React from 'react'
import './Modal.scss'

const Modal = ({ children }) => {
    return (
        <div className='modal__container'>
            {children}
        </div>
    )
}

export default Modal
