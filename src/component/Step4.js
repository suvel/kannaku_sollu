import "./Step4.scss";
import Button from "./Button";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";

const generateBill = (billName, bills, products) => {
  const curDate = new Date();
  const dateString = `${curDate.getDate()}-${
    curDate.getMonth() + 1
  }-${curDate.getFullYear()}`;

  const getBillDetails = () => {
    let billString = ``;
    let billTotal = 0;
    bills.forEach((bill, index) => {
      billString = billString.concat(`
            [${index + 1}]
            \n
             _Member Name_:\t${bill.memName}\n
             _Products_:\t${bill.prodExp}\n
             _Member total_:\t${bill.total}\n
            \n
            `);
      billTotal = billTotal + bill.total;
    });
    return {
      billString,
      billTotal,
    };
  };

  const { billString, billTotal } = getBillDetails();

  const getProductDictionary = () => {
    let prdString = ``;
    products.forEach((prd) => {
      prdString = prdString.concat(` \t[${prd.icon}]: ${prd.prdName}\n`);
    });
    return prdString;
  };

  return `${billName}\n
        date:${dateString}\n${billString}\n
        [Bill Total]\n\t${billTotal}\n
        products dictionary:\n\n${getProductDictionary()}`;
};

const Step4 = () => {
  const { state } = useContext(AppContext);
  const [billDetail, setBillDetail] = useState({
    name: state.billName,
    shares: state.shares,
    products: state.products,
  });

  const handelReprint = () => {
    setBillDetail({
      name: state.billName,
      shares: state.shares,
      products: state.products,
    });
  };

  const handelCopyBill = () => {
    let range = document.createRange();
    range.selectNode(document.getElementById("bill-text"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("copied!");
  };

  return (
    <div className="bill-print">
      <div className="bill-print__action">
        <Button onClick={handelCopyBill} name={"Copy"} variant={"solid"} />
        <Button
          onClick={handelReprint}
          name={"Re-print"}
          variant={"outlined"}
        />
      </div>
      <div id="bill-text" className="bill-pint__text">
        {generateBill(billDetail.name, billDetail.shares, billDetail.products)}
      </div>
    </div>
  );
};

export default Step4;
