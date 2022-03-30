import React, { useContext } from "react";
import "./Step2.scss";
import Table from "./Table";
import Button from "./Button";
import { AppContext, reducerActTypes } from "../context/AppProvider";
import RemoveBtn from "./RemoveBtn";

const Step2 = ({ toggleAddMemberModal }) => {
  const { state, dispatch } = useContext(AppContext);

  const removeMember = (member) => {
    const memRowData = member.row.original;
    const memId = memRowData.id;
    const newMembers = state.members.filter((mem) => mem.id !== memId);
    dispatch({ type: reducerActTypes.SET_MEMBER, value: newMembers });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "NAME",
        accessor: "memName",
      },
      {
        Header: "ACTION",
        Cell: ({ cell }) => <RemoveBtn onClick={() => removeMember(cell)} />,
      },
    ],
    [state.members]
  );

  return (
    <div className="step2">
      <Table columns={columns} data={state?.members} />
      <div className="step2__action">
        <Button
          onClick={() => toggleAddMemberModal(true)}
          name={"Add"}
          variant={"solid"}
        />
        {/* <Button name={"Remove"} variant={"outlined"} /> */}
      </div>
    </div>
  );
};

export default Step2;
