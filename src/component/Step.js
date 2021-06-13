import React from 'react'
import Button from './Button'
import './Step.scss'

const Step = ({ number, description, children, goToNxtStep, show, currentStep }) => {

    const showWhatNxtBtn = number < 4 && currentStep == number;

    return (
        <div class={`step step${number} show_${show}`}>
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
                <div className={`step__next-action show_${showWhatNxtBtn}`}>
                    <Button
                        name={'What Next 🤷‍♀️?'}
                        onClick={() => goToNxtStep(number + 1)}
                        variant={'solid'}
                    />
                </div>
            </div>
        </div >
    )
}

export default Step
