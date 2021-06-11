import React from 'react'
import './Step.scss'

const Step = ({ number, description, children }) => {
    return (
        <div class={`step step${number}`}>
            <div class="step__desc">
                {description}
            </div>
            <div class="step__head">
                <div class="step__stringno">
                    {`Step ${number}`}
                </div>
                <div class="step__bigno">
                    <div className="step__no">{number}</div>
                </div>
            </div>
            <div class="step__main">
                {children}
            </div>
        </div>
    )
}

export default Step
