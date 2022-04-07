import React, { useContext } from "react";
import "./Step3.scss";
import Table from "./Table";
import Button from "./Button";
import RefreshButton from "./RefreshButton";
import { AppContext, reducerActTypes } from "../context/AppProvider";
import calculateTotal from "../functions/calculateTotal";

const Step3 = ({ toggleAddToBillModal }) => {
  const { state, dispatch, notify } = useContext(AppContext);

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

  const notifyRemovedMembers = (shares) => {
    const removedMemberNames = shares.map((share) => share.memName);
    removedMemberNames.forEach((name) => notify(`${name} removed`));
  };

  const handelBillingRefresh = () => {
    const curMembers = state.members;
    const curProducts = state.products;
    const shares = state.shares;

    let newShares = [];
    let removedShare = [];

    const curMembersIds = curMembers.map((member) => member.id);

    //removing unavailable members
    shares.forEach((share) => {
      if (curMembersIds.includes(share.memId)) {
        newShares.push(share);
      } else {
        removedShare.push(share);
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

    if (removedShare && removedShare.length > 0) {
      notifyRemovedMembers(removedShare);
    }

    dispatch({ type: reducerActTypes.SET_SHARE, value: newShares });
  };

  return (
    <div className="step3">
      <RefreshButton onClick={handelBillingRefresh} />
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
