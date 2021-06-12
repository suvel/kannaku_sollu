import './Form.scss'

const Form = ({ children }) => {
    return (<div className='form'>{children}</div>)
}

const FormTitle = ({ children }) => {
    return (<div className='form__title'>{children}</div>)
}

const FormInputGroup = ({ children }) => {
    return (<div className='form__input-group'>{children}</div>)
}

const FormAction = ({ children }) => {
    return (<div className='form__action'>{children}</div>)
}

const Row = ({ children }) => {
    return (<div className='row'>{children}</div>)
}

const Col = ({ children }) => {
    return (<div className='col'>{children}</div>)
}

const FormInput = ({ label: labelValue, component }) => {
    return (
        <>
            <label>{labelValue}</label>
            {component}
        </>
    )
}

export { FormTitle, FormInputGroup, FormAction, Row, Col, FormInput }

export default Form