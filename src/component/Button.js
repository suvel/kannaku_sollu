import React from 'react'
import './Button.scss'

const Button = ({ name, variant = 'solid' }) => {
    return (
        <button className={`btn ${variant}`}>
            {name}
        </button>
    )
}

export default Button
