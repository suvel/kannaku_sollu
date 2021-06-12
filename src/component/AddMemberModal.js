import React from 'react'
import Modal from './Modal'
import Form,
{ FormTitle, FormInputGroup, FormAction, Row, Col, FormInput } from './Form'
import Button from './Button'
import './AddMemberModal.scss'

const AddMemberModal = () => {
    return (
        <Modal>
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
                        <Button name={"Cancel"} variant={"outlined"} />
                    </FormAction>
                </Form>
            </div>
        </Modal>
    )
}

export default AddMemberModal
