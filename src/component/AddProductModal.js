import React from 'react'
import Modal from './Modal'
import Button from './Button'
import './AddProductModal.scss'
import Form,
{ FormTitle, FormInputGroup, FormAction, Row, Col, FormInput } from './Form'
const AddProductModal = ({ show, toggleShow }) => {
    return (
        <Modal show={show}>
            <div className='add-product-modal___container'>
                <Form>
                    <FormTitle>
                        Add Product
                    </FormTitle>
                    <FormInputGroup>
                        <Row>
                            <Col>
                                <FormInput label='NAME' component={<input />} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormInput label='ICON' component={<input />} />
                            </Col>
                            <Col>
                                <FormInput label='PRICE' component={<input />} />
                            </Col>
                        </Row>
                    </FormInputGroup>
                    <FormAction>
                        <Button name={"Submit"} variant={"solid"} />
                        <Button
                            onClick={() => toggleShow(false)}
                            name={"Cancel"}
                            variant={"outlined"}
                        />
                    </FormAction>
                </Form>
            </div>
        </Modal >
    )
}

export default AddProductModal
