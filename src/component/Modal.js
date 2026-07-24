import React from "react";
import "./Modal.scss";
import { AnimatePresence, motion } from "framer-motion";

const gentleTransition = { type: "spring", mass: 1, stiffness: 120, damping: 14 };

const Modal = ({ children, show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="modal__container"
          initial={{ opacity: 0, scale: 0, x: "-100%", y: "-100%" }}
          animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
          exit={{ opacity: 0, scale: 0, x: "-100%", y: "-100%" }}
          transition={gentleTransition}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
