import React from "react";
import Button from "./Button";
import "./RefreshButton.scss";

const RefreshButton = ({ ...props }) => {
  return (
    <Button
      name={"🔁 Refresh"}
      variant={"outlined"}
      customClass={"refresh-btn"}
      {...props}
    />
  );
};

export default RefreshButton;
