import React from 'react'
import './Step3.scss'
import Table from './Table'
import Button from './Button'

const Step3 = () => {

    const columns = React.useMemo(
        () => [
            {
                Header: '#',
                accessor: 'sno'
            },
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

    const data = React.useMemo(
        () => [
            {
                'sno': 1,
                'memName': 'Mark Stain',
                'prodExp': '2x🍎+3x🍪',
                'total': 70
            },
            {
                'sno': 2,
                'memName': 'Drake Remorey',
                'prodExp': '1x☕+2x🚬+1x🍪',
                'total': 38
            },
        ],
        []
    )

    return (
        <div className="step3">
            <Table style={{ width: "600px" }} columns={columns} data={data} />
            <div className='step3__action'>
                <Button name={"Add"} variant={"solid"} />
                <Button name={"Remove"} variant={"outlined"} />
            </div>
        </div>
    )
}

export default Step3
