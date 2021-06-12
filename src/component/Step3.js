import React, { useContext } from 'react'
import './Step3.scss'
import Table from './Table'
import Button from './Button'
import {AppContext} from '../context/AppProvider'

const Step3 = ({ toggleAddToBillModal }) => {

    const { state } = useContext(AppContext);

    const columns = React.useMemo(
        () => [
            {
                Header: 'MEMBER',
                accessor: 'memName'
            },
            {
                Header: 'PROD EXP',
                accessor: 'prodExp'
            },
            {
                Header: 'TOTAL',
                accessor: 'total'
            },
        ],
        []
    )

    return (
        <div className="step3">
            <Table style={{ width: "600px" }} columns={columns} data={state?.bills} />
            <div className='step3__action'>
                <Button
                    onClick={() => toggleAddToBillModal(true)}
                    name={"Add"}
                    variant={"solid"}
                />
                <Button name={"Remove"} variant={"outlined"} />
            </div>
        </div>
    )
}

export default Step3
