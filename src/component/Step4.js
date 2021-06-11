import './Step4.scss'
const Step4 = () => {
    return (<div className='bill-print'>
        {
            `Grocerry Bill\n
            \n
            date:\t12-06-2021\n
            \n
            [1]\n 
            \n
             _Member Name_:\tDrake Remorey\n
             _Products_:\t2x🍎+3x🍪\n
             _Member total_:\t180\n
            \n
            [2]\n 
            \n
             _Member Name_:\tMark Stain\n
             _Products_:\t1x🍎+3x🍪\n
             _Member total_:\t130\n
            \n
            [Bill Total]\n
            320
            \n
            products dictionary:
            \n
            \t[🍎]: Apple
            \t[🍪]: Cookie

            `
        }
    </div>)
}

export default Step4