import React from 'react'
import Modal from './Modal'
import Form,
{ FormTitle, FormInputGroup, FormAction, Row, Col, FormInput } from './Form'
import Button from './Button'
import './AddToBillModal.scss'

const AddToBillModal = ({ show, toggleShow }) => {
    return (
        <Modal show={show}>
            <div className='add-to-bill-modal___container'>
                <Form>
                    <FormTitle>
                        Add To Bill
                    </FormTitle>
                    <FormInputGroup>
                        <Row>
                            <Col>
                                <FormInput
                                    label='MEMBER'
                                    component={
                                        <select>

                                        </select>
                                    } />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormInput
                                    label='PRODUCT EXPRESSION'
                                    component={
                                        <select>
                                        </select>
                                    } />
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
        </Modal>
    )
}

export default AddToBillModal
