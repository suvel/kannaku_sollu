import React from "react";
import brandLogo from "../asset/brand/logo.png";
import "./BrandLogo.scss";

const BrandLogo = () => {
  return (
    <div className="landingComponent">
      <img src={brandLogo} />
    </div>
  );
};

export default BrandLogo;
