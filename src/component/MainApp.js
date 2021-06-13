import React, { useState, useMemo } from 'react'
import Step from './Step'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import AddProductModal from './AddProductModal'
import AddMemberModal from './AddMemberModal'
import AddToBillModal from './AddToBillModal'
import './MainApp.scss'

const MainApp = () => {

    const [showAddProdModal, setShowAddProdModal] = useState(false);
    const [showAddMemModal, setShowAddMemModal] = useState(false);
    const [showAddToBillModal, setShowAddToBillModal] = useState(false);

    const stepsObject = useMemo(() => {
        return [
            {
                no: 1,
                description: "Let’s start adding Products 🎉",
                component: (
                    <>
                        <Step1 toggleAddPrdModal={setShowAddProdModal} />
                        <AddProductModal
                            show={showAddProdModal}
                            toggleShow={setShowAddProdModal}
                        />
                    </>
                )
            },
            {
                no: 2,
                description: "Greater!..😊, now add the Members.",
                component: (
                    <>
                        <Step2 toggleAddMemberModal={setShowAddMemModal} />
                        <AddMemberModal
                            show={showAddMemModal}
                            toggleShow={setShowAddMemModal}
                        />
                    </>
                )
            },
            {
                no: 3,
                description: "OK!..., Let’s now starting billing them🤑.",
                component: (
                    <>
                        <Step3 toggleAddToBillModal={setShowAddToBillModal} />
                        <AddToBillModal
                            show={showAddToBillModal}
                            toggleShow={setShowAddToBillModal}
                        />
                    </>
                )
            },
            {
                no: 4,
                description: "Let’s make some money ...💸",
                component: (
                    <Step4 />
                )
            }
        ]
    }, [showAddProdModal, showAddMemModal, showAddToBillModal])

    return (
        stepsObject?.map(step => {
            return (
                <Step
                    number={step.no}
                    description={step.description}
                >
                    {step.component}
                </Step>
            )
        })
    )
}

export default MainApp
