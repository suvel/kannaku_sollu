import React, { useContext, useState } from "react";
import Modal from "./Modal";
import Form, {
  FormTitle,
  FormInputGroup,
  FormAction,
  Row,
  Col,
  FormInput,
} from "./Form";
import Button from "./Button";
import { AppContext, reducerActTypes } from "../context/AppProvider";
import "./AddMemberModal.scss";
import Member from "../entity/member";

const AddMemberModal = ({ show, toggleShow }) => {
  const [memName, setMemName] = useState("");
  const { state, dispatch } = useContext(AppContext);

  const handelSubmit = () => {
    const newMember = new Member(memName);
    const members = [...state.members, newMember.getMember()];
    dispatch({ type: reducerActTypes.SET_MEMBER, value: members });
    toggleShow(false);
    setMemName("");
  };

  const handelMemNameChange = (e) => {
    const value = e.target.value;
    setMemName(value);
  };

  return (
    <Modal show={show}>
      <div className="add-member-modal___container">
        <Form>
          <FormTitle>Add Member</FormTitle>
          <FormInputGroup>
            <Row>
              <Col>
                <FormInput
                  label="NAME"
                  component={
                    <input value={memName} onChange={handelMemNameChange} />
                  }
                />
              </Col>
            </Row>
          </FormInputGroup>
          <FormAction>
            <Button onClick={handelSubmit} name={"Submit"} variant={"solid"} />
            <Button
              onClick={() => toggleShow(false)}
              name={"Cancel"}
              variant={"outlined"}
            />
          </FormAction>
        </Form>
      </div>
    </Modal>
  );
};

export default AddMemberModal;
