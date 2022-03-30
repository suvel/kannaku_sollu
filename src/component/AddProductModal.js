import React, { useState, useContext } from "react";
import Modal from "./Modal";
import Button from "./Button";
import "./AddProductModal.scss";
import Form, {
  FormTitle,
  FormInputGroup,
  FormAction,
  Row,
  Col,
  FormInput,
} from "./Form";
import { AppContext, reducerActTypes } from "../context/AppProvider";

const initFormData = {
  icon: "",
  prdName: "",
  prdPrice: "",
};

const AddProductModal = ({ show, toggleShow }) => {
  const { state, dispatch } = useContext(AppContext);

  const [formData, setFormData] = useState(initFormData);

  const closeModal = () => {
    toggleShow(false);
    setFormData(initFormData);
  };

  const handelFormDataChange = (e, type) => {
    const value = e.target.value;
    setFormData((val) => ({ ...val, [type]: value }));
  };

  const handelSubmit = () => {
    const newProducts = [...state.products, formData];
    dispatch({ type: reducerActTypes.SET_PRODUCT, value: newProducts });
    closeModal();
  };

  return (
    <Modal show={show}>
      <div className="add-product-modal___container">
        <Form>
          <FormTitle>Add Product</FormTitle>
          <FormInputGroup>
            <Row>
              <Col>
                <FormInput
                  label="NAME"
                  component={
                    <input
                      value={formData.name}
                      onChange={(e) => {
                        handelFormDataChange(e, "prdName");
                      }}
                    />
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <FormInput
                  label="ICON"
                  component={
                    <input
                      value={formData.icon}
                      onChange={(e) => {
                        handelFormDataChange(e, "icon");
                      }}
                    />
                  }
                />
              </Col>
              <Col>
                <FormInput
                  label="PRICE"
                  component={
                    <input
                      value={formData.price}
                      onChange={(e) => {
                        handelFormDataChange(e, "prdPrice");
                      }}
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

export default AddProductModal;
