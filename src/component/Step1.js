import React, { useContext } from "react";
import "./Step1.scss";
import Table from "./Table";
import Button from "./Button";
import { AppContext, reducerActTypes } from "../context/AppProvider";
import RemoveBtn from "./RemoveBtn";

const Step1 = ({ toggleAddPrdModal }) => {
  const { state, dispatch } = useContext(AppContext);

  const removeProduct = (product) => {
    const prdRowData = product.row.original;
    const prodId = prdRowData.id;
    const newProducts = state.products.filter((prd) => prd.id !== prodId);

    dispatch({ type: reducerActTypes.SET_PRODUCT, value: newProducts });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ICON",
        accessor: "icon",
      },
      {
        Header: "PROD NAME",
        accessor: "prdName",
      },
      {
        Header: "PRICE",
        accessor: "prdPrice",
      },
      {
        Header: "ACTION",
        Cell: ({ cell }) => <RemoveBtn onClick={() => removeProduct(cell)} />,
      },
    ],
    [state.products]
  );

  const data = React.useMemo(() => state?.products || [], [state]);

  return (
    <div className="step1">
      <Table style={{ width: "600px" }} columns={columns} data={data} />
      <div className="step1__action">
        <Button
          onClick={() => toggleAddPrdModal(true)}
          name={"Add"}
          variant={"solid"}
        />
      </div>
    </div>
  );
};

export default Step1;
