import React, { useContext } from 'react'
import './Step2.scss'
import Table from './Table'
import Button from './Button'
import { AppContext } from '../context/AppProvider'

const Step2 = ({ toggleAddMemberModal }) => {

    const { state } = useContext(AppContext)

    const columns = React.useMemo(
        () => [
            {
                Header: 'NAME',
                accessor: 'memName'
            },
        ],
        []
    )

    return (
        <div className="step2">
            <Table style={{ width: "600px" }} columns={columns} data={state?.members} />
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
