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
import VariableExpressionInput from "./VariableExpressionInput";
import { AppContext, reducerActTypes } from "../context/AppProvider";
import "./AddToBillModal.scss";

const calculateTotal = (expStr, products) => {
  const items = expStr.split("+");
  let sum = 0;

  items.forEach((item) => {
    const [qty, prd] = item.split("x");
    debugger;
    const prdCost = products.find((product) => product.icon == prd).prdPrice;
    sum = sum + qty * prdCost;
  });

  return sum;
};

const AddToBillModal = ({ show, toggleShow }) => {
  const { state, dispatch } = useContext(AppContext);

  const [prdExp, setPrdExp] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getMembersOptions = () => {
    return (state?.members).map((mem, index) => {
      return <option value={index}>{`${mem.memName}`}</option>;
    });
  };

  const handelSubmit = () => {
    const newShareObj = {
      memId:state.members[selectedIndex].id,
      memName: state.members[selectedIndex].memName,
      prodExp: prdExp,
      total: calculateTotal(prdExp, state.products),
    };

    const newShares = [...state.shares, newShareObj];

    dispatch({ type: reducerActTypes.SET_SHARE, value: newShares });
    //reset
    setPrdExp("");
    setSelectedIndex(0);

    toggleShow(false);
  };

  return (
    <Modal show={show}>
      <div className="add-to-bill-modal___container">
        <Form>
          <FormTitle>Add To Bill</FormTitle>
          <FormInputGroup>
            <Row>
              <Col>
                <FormInput
                  label="MEMBER"
                  component={
                    <select
                      value={selectedIndex}
                      onChange={(e) => {
                        setSelectedIndex(e.target.value);
                      }}
                    >
                      <option value="" selected>
                        Select Member
                      </option>
                      {getMembersOptions()}
                    </select>
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <FormInput
                  label="PRODUCT EXPRESSION"
                  component={
                    <VariableExpressionInput
                      options={state.products.map((prd) => prd.icon)}
                      value={prdExp}
                      onChange={setPrdExp}
                    />
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

export default AddToBillModal;
