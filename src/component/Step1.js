import React, { useContext } from 'react'
import './Step1.scss'
import Table from './Table'
import Button from './Button'
import { AppContext } from '../context/AppProvider'

const Step1 = ({ toggleAddPrdModal }) => {
    const { state } = useContext(AppContext);

    const columns = React.useMemo(
        () => [
            {
                Header: 'ICON',
                accessor: 'icon'
            },
            {
                Header: 'PROD NAME',
                accessor: 'prdName'
            },
            {
                Header: 'PRICE',
                accessor: 'prdPrice'
            },
        ],
        []
    )

    const data = React.useMemo(
        () => state?.products || [],
        [state]
    )

    return (
        <div className="step1">
            <Table style={{ width: "600px" }} columns={columns} data={data} />
            <div className='step1__action'>
                <Button onClick={() => toggleAddPrdModal(true)} name={"Add"} variant={"solid"} />
                <Button name={"Remove"} variant={"outlined"} />
            </div>
        </div>
    )
}

export default Step1
