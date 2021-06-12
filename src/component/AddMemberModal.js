import React from 'react'
import Modal from './Modal'
import Form,
{ FormTitle, FormInputGroup, FormAction, Row, Col, FormInput } from './Form'
import Button from './Button'
import './AddMemberModal.scss'

const AddMemberModal = ({ show, toggleShow }) => {
    return (
        <Modal show={show}>
            <div className='add-member-modal___container'>
                <Form>
                    <FormTitle>
                        Add Member
                    </FormTitle>
                    <FormInputGroup>
                        <Row>
                            <Col>
                                <FormInput label='NAME' component={<input />} />
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

export default AddMemberModal
