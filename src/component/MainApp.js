import React, { useState } from 'react'
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

    const [showAddPrdModal, setShowAddPrdModal] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [showAddToBillModal, setShowAddToBillModal] = useState(false);

    return (
        <>
            <Step
                number={1}
                description={"Let’s start adding Products 🎉"}
            >
                <Step1 toggleAddPrdModal={setShowAddPrdModal} />
                <AddProductModal
                    show={showAddPrdModal}
                    toggleShow={setShowAddPrdModal}
                />
            </Step>
            <Step
                number={2}
                description={"Greate!..😊, now add the Members."}
            >
                <Step2 toggleAddMemberModal={setShowAddMemberModal} />
                <AddMemberModal
                    show={showAddMemberModal}
                    toggleShow={setShowAddMemberModal}
                />
            </Step>
            <Step
                number={3}
                description={"OK!..., Let’s now starting billing them🤑."}
            >
                <Step3 toggleAddToBillModal={setShowAddToBillModal} />
                <AddToBillModal
                    show={showAddToBillModal}
                    toggleShow={setShowAddToBillModal}
                />
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
