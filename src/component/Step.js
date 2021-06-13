import React from 'react'
import Button from './Button'
import { useSpring, animated } from 'react-spring'
import './Step.scss'

const Step = ({ number, description, children, goToNxtStep, currentStep, show }) => {

    const showWhatNxtBtn = number < 4 && currentStep == number;

    const slowL2RAnimationStyle = useSpring({
        repeat: true,
        cancel: currentStep < number,
        to: [
            { opacity: 1, transform: 'translateX(0px)' },
        ],
        from: { opacity: 0, transform: 'translateX(-500px)' },
        delay: 500
    })

    const fastL2RAnimationStyle = useSpring({
        repeat: true,
        cancel: currentStep < number,
        to: [
            { opacity: 1, transform: 'translateX(0px)' },
        ],
        from: { opacity: 0, transform: 'translateX(-500px)' },
        delay: 250
    })

    const fastT2BAnimationStyle = useSpring({
        repeat: true,
        cancel: currentStep < number,
        to: [
            { opacity: 1, transform: 'translateY(0px)' },
        ],
        from: { opacity: 0, transform: 'translateY(-500px)' },
        delay: 250
    })

    return (
        show &&
        <div key={number} class={`step step${number}`}>
            <animated.div style={slowL2RAnimationStyle} class="step__desc">
                {description}
            </animated.div>
            <div class="step__head">
                <animated.div style={fastL2RAnimationStyle} class="step__stringno">
                    {`Step ${number}`}
                </animated.div>
                <animated.div style={fastT2BAnimationStyle} class="step__bigno">
                    <div className="step__no">{number}</div>
                </animated.div>
            </div>
            <animated.div style={fastT2BAnimationStyle} class="step__main">
                {children}
                <div className={`step__next-action show_${showWhatNxtBtn}`}>
                    <Button
                        name={'What Next 🤷‍♀️?'}
                        onClick={() => goToNxtStep(number + 1)}
                        variant={'solid'}
                    />
                </div>
            </animated.div>
        </div >
    )
}

export default Step
