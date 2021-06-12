import React from 'react'
import './Step2.scss'
import Table from './Table'
import Button from './Button'

const Step2 = ({ toggleAddMemberModal }) => {

    const columns = React.useMemo(
        () => [
            {
                Header: 'NAME',
                accessor: 'memName'
            },
        ],
        []
    )

    const data = React.useMemo(
        () => [
            {
                'memName': 'Mark Stain',
            },
            {
                'memName': 'Drake Remorey',
            },
        ],
        []
    )

    return (
        <div className="step2">
            <Table style={{ width: "600px" }} columns={columns} data={data} />
            <div className='step2__action'>
                <Button
                    onClick={() => toggleAddMemberModal(true)}
                    name={"Add"}
                    variant={"solid"}
                />
                <Button name={"Remove"} variant={"outlined"} />
            </div>
        </div>
    )
}

export default Step2
