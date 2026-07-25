import { createContext, useContext, useState } from "react";

const MembersContext = createContext(null);

export function MembersProvider({ children }) {
  const [members, setMembers] = useState([
    { id: "self", name: "You", avatar: null, initial: "U" },
    {
      id: "sarah",
      name: "Sarah Miller",
      avatar: null,
      initial: "SM",
    },
    { id: "marcus", name: "Marcus Wong", avatar: null, initial: "MW" },
  ]);

  const removeMember = (id) => {
    if (id === "self") return;
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
