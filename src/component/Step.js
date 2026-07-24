import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import "./Step.scss";

const Step = ({
  number,
  description,
  children,
  goToNxtStep,
  currentStep,
  show,
}) => {
  const showWhatNxtBtn = number < 4 && currentStep == number;

  return (
    show && (
      <div key={number} className={`step step${number}`}>
        <motion.div
          className="step__desc"
          initial={{ opacity: 0, x: -500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          {description}
        </motion.div>
        <div className="step__head">
          <motion.div
            className="step__stringno"
            initial={{ opacity: 0, x: -500 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            {`Step ${number}`}
          </motion.div>
          <motion.div
            className="step__bigno"
            initial={{ opacity: 0, y: -500 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="step__no">{number}</div>
          </motion.div>
        </div>
        <motion.div
          className="step__main"
          initial={{ opacity: 0, y: -500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          {children}
          <div className={`step__next-action show_${showWhatNxtBtn}`}>
            <Button
              name={"What Next 🤷‍♀️?"}
              onClick={() => goToNxtStep(number + 1)}
              variant={"solid"}
            />
          </div>
        </motion.div>
      </div>
    )
  );
};

export default Step;
