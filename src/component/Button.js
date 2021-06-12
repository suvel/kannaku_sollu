import React from 'react'
import './Button.scss'

const Button = ({ name, variant = 'solid', ...props }) => {
    return (
        <button className={`btn ${variant}`} {...props}>
            {name}
        </button>
    )
}

export default Button
