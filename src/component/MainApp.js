import React, { useState, useMemo } from "react";
import Step from "./Step";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import AddProductModal from "./AddProductModal";
import AddMemberModal from "./AddMemberModal";
import AddToBillModal from "./AddToBillModal";
import WelcomeModal from "./WelcomeModal";
import "./MainApp.scss";

const MainApp = () => {
  const [showAddProdModal, setShowAddProdModal] = useState(false);
  const [showAddMemModal, setShowAddMemModal] = useState(false);
  const [showAddToBillModal, setShowAddToBillModal] = useState(false);
  const [showStep, setShowStep] = useState(1);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  const stepsObject = useMemo(() => {
    const canStepShown = (stepNum) => {
      return showStep >= stepNum;
    };

    return [
      {
        no: 1,
        show: canStepShown(1),
        description: "Let’s start adding Products 🎉",
        component: (
          <>
            <Step1 toggleAddPrdModal={setShowAddProdModal} />
            <AddProductModal
              show={showAddProdModal}
              toggleShow={setShowAddProdModal}
            />
          </>
        ),
      },
      {
        no: 2,
        show: canStepShown(2),
        description: "Greater!..😊, now add the Members.",
        component: (
          <>
            <Step2 toggleAddMemberModal={setShowAddMemModal} />
            <AddMemberModal
              show={showAddMemModal}
              toggleShow={setShowAddMemModal}
            />
          </>
        ),
      },
      {
        no: 3,
        show: canStepShown(3),
        description: "OK!..., Let’s now starting billing them🤑.",
        component: (
          <>
            <Step3 toggleAddToBillModal={setShowAddToBillModal} />
            <AddToBillModal
              show={showAddToBillModal}
              toggleShow={setShowAddToBillModal}
            />
          </>
        ),
      },
      {
        no: 4,
        show: canStepShown(4),
        description: "Let’s make some money ...💸",
        component: <Step4 />,
      },
    ];
  }, [showAddProdModal, showAddMemModal, showAddToBillModal, showStep]);

  const handelGoingNxtStep = (nxtStepNumber) => {
    setShowStep(nxtStepNumber);
    document
      .getElementById(`step-${nxtStepNumber}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {stepsObject?.map((step, index) => {
        return (
          <div key={index} id={`step-${step.no}`}>
            <Step
              number={step.no}
              description={step.description}
              goToNxtStep={handelGoingNxtStep}
              show={step.show}
              currentStep={showStep}
            >
              {step.component}
            </Step>
          </div>
        );
      })}
      <WelcomeModal show={showWelcomeModal} toggleShow={setShowWelcomeModal} />
    </>
  );
};

export default MainApp;
