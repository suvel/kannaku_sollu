import React, { useContext } from "react";
import "./Step3.scss";
import Table from "./Table";
import Button from "./Button";
import { AppContext, reducerActTypes } from "../context/AppProvider";

const Step3 = ({ toggleAddToBillModal }) => {
  const { state, dispatch } = useContext(AppContext);

  const columns = React.useMemo(
    () => [
      {
        Header: "MEMBER",
        accessor: "memName",
      },
      {
        Header: "PROD EXP",
        accessor: "prodExp",
      },
      {
        Header: "TOTAL",
        accessor: "total",
      },
    ],
    []
  );

  const calculateTotal = (expStr, products) => {
    const items = expStr.split("+");
    let sum = 0;

    items.forEach((item) => {
      const [qty, prd] = item.split("x");
      debugger;
      const prdCost = products.find((product) => product.icon == prd).prdPrice;
      sum = sum + qty * prdCost;
    });
    return sum;
  };

  const handelBillingRefresh = () => {
    const curMembers = state.members;
    const curProducts = state.products;
    const shares = state.shares;

    let newShares = [];

    //removing unavailable members
    shares.forEach((share) => {
      const memberExist = curMembers.find((mem) => mem.id === share.memId);
      if (memberExist) {
        newShares.push({
          ...share,
        });
      }
    });

    //clearing unavailable products
    newShares.forEach((share) => {
      const productExpString = share.prodExp;
      const productsInExp = productExpString.split("+");

      let newProdExp = [];

      productsInExp.forEach((prod) => {
        const [qty, prd] = prod.split("x");
        const prdExist = curProducts.find((prod) => prod.icon === prd);
        if (prdExist) {
          newProdExp.push(prod);
        }
      });

      share.prodExp = newProdExp.join("+");
      share.total = calculateTotal(share.prodExp, curProducts);
    });

    dispatch({ type: reducerActTypes.SET_SHARE, value: newShares });
  };

  return (
    <div className="step3">
      <Button
        name={"Refresh"}
        variant={"outlined"}
        onClick={handelBillingRefresh}
      />
      <Table columns={columns} data={state?.shares} />
      <div className="step3__action">
        <Button
          onClick={() => toggleAddToBillModal(true)}
          name={"Add"}
          variant={"solid"}
        />
        {/* <Button name={"Remove"} variant={"outlined"} /> */}
      </div>
    </div>
  );
};
export default Step3;
