import React from 'react'
import './Step1.scss'
import Table from './Table'
import Button from './Button'

const Step1 = () => {

    const columns = React.useMemo(
        () => [
            {
                Header: '#',
                accessor: 'sno'
            },
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
        () => [
            {
                'sno': '1',
                'icon': '🍪',
                'prdName': 'Butter Biscuit',
                'prdPrice': '10',
            },
            {
                'sno': '2',
                'icon': '🍎',
                'prdName': 'Apple',
                'prdPrice': '20',
            },
            {
                'sno': '3',
                'icon': '🚬',
                'prdName': 'Cigaret',
                'prdPrice': '18',
            },
            {
                'sno': '4',
                'icon': '☕',
                'prdName': 'Coffee',
                'prdPrice': '10',
            },
        ],
        []
    )

    return (
        <div className="step1">
            <Table style={{ width: "600px" }} columns={columns} data={data} />
            <div className='step1__action'>
                <Button name={"Add"} variant={"solid"} />
                <Button name={"Remove"} variant={"outlined"} />
            </div>
        </div>
    )
}

export default Step1
