import React from 'react'
import Step from './Step'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import './MainApp.scss'

const MainApp = () => {
    return (
        <>
            <Step
                number={1}
                description={"Let’s start adding Products 🎉"}
            >
                <Step1 />
            </Step>
            <Step
                number={2}
                description={"Greate!..😊, now add the Members."}
            >
                <Step2 />
            </Step>
            <Step
                number={3}
                description={"OK!..., Let’s now starting billing them🤑."}
            >
                <Step3 />

            </Step>
            <Step
                number={4}
                description={"Let’s make some money ...💸"}
            >
                <Step4 />

            </Step>
        </>
    )
}

export default MainApp
