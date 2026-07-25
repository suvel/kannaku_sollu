import { createContext, useContext, useState } from "react";

const LedgerContext = createContext(null);

const INITIAL_LEDGER_ITEMS = [
  { id: 1, memberId: "sarah", productId: 1, icon: "🍔", name: "Double Burger", qty: "1.0 @ Sarah Miller", price: "$14.50" },
  { id: 2, memberId: "marcus", productId: 2, icon: "🍟", name: "Truffle Fries", qty: "2.0 @ Marcus Wong", price: "$16.50" },
  { id: 3, memberId: "self", productId: 4, icon: "🥗", name: "Greek Salad", qty: "0.5 @ You", price: "$6.25" },
];

export function LedgerProvider({ children }) {
  const [ledgerItems, setLedgerItems] = useState(INITIAL_LEDGER_ITEMS);

  const addLedgerItem = (item) => {
    setLedgerItems((prev) => [...prev, { id: Date.now(), ...item }]);
  };

  const removeLedgerItem = (id) => {
    setLedgerItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <LedgerContext.Provider value={{ ledgerItems, addLedgerItem, removeLedgerItem }}>
      {children}
    </LedgerContext.Provider>
  );
}

export function useLedger() {
  return useContext(LedgerContext);
}
