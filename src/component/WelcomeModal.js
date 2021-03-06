import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import "./WelcomeModal.scss";

const WelcomeModal = ({ show, toggleShow }) => {
  const handelCloseModal = () => {
    toggleShow(false);
  };

  return (
    <Modal show={show}>
      <div className="welcome-modal__container">
        <div className="welcome-modal__content">
          Welcomeπ to Kannaku Sollu , here we have simplifed the way you bill
          your friendsπ¨βπ«π¨βπ§π¨βπ€π¨βππ°π¦ΈββοΈ.
        </div>
        <div className="welcome-modal__action">
          <Button onClick={handelCloseModal} name="Start Billing" />
        </div>
      </div>
    </Modal>
  );
};

export default WelcomeModal;
