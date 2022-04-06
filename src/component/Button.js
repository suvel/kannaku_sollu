import React from "react";
import "./Button.scss";

const Button = ({ name, variant = "solid",customClass, ...props }) => {
  return (
    <button className={`btn ${variant} ${customClass}`} {...props}>
      {name}
    </button>
  );
};

export default Button;
