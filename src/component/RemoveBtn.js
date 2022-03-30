import React from "react";
import "./RemoveBtn.scss";

const RemoveBtn = ({ onClick }) => {
  return (
    <button className="remove-btn" onClick={onClick}>
      ❌
    </button>
  );
};

export default RemoveBtn;
