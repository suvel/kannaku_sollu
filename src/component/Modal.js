import React from 'react'
import './Modal.scss'
import { animated, config, useTransition } from 'react-spring'
const Modal = ({ children, show }) => {

    const transitions = useTransition(show, {
        from: { opacity: 0, transform: 'scale(0) translate(-100%, -100%)' },
        enter: { opacity: 1, transform: 'scale(1) translate(-50%, -50%)' },
        leave: { opacity: 0, transform: 'scale(0) translate(-100%, -100%)' },
        config: config.gentle,
    })
    return transitions(
        (styles, item) => item && (
            <animated.div style={styles} className={`modal__container`} >
                {children}
            </animated.div >
        )
    )
}

export default Modal
