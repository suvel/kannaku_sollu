import { createContext, useContext, useState } from "react";
import { INITIAL_MEMBERS, SELF_MEMBER_ID } from "../constants";

const MembersContext = createContext(null);

export function MembersProvider({ children }) {
  const [members, setMembers] = useState(INITIAL_MEMBERS);

  const removeMember = (id) => {
    if (id === SELF_MEMBER_ID) return;
    setMembers(members.filter((m) => m.id !== id));
  };

  const addMember = ({ name }) => {
    const initial = name
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    setMembers([...members, { id: Date.now(), name, avatar: null, initial }]);
  };

  return (
    <MembersContext.Provider value={{ members, addMember, removeMember }}>
      {children}
    </MembersContext.Provider>
  );
}

export function useMembers() {
  return useContext(MembersContext);
}
