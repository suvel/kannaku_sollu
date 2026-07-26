import { createContext, useContext, useEffect, useState } from "react";
import { useMembers } from "./MembersContext";
import { useProducts } from "./ProductsContext";

const LedgerContext = createContext(null);

const INITIAL_LEDGER_ITEMS = [
  { id: 1, memberId: "sarah", productId: 1, icon: "🍔", name: "Double Burger", qty: 1, price: "₹14.50" },
  { id: 2, memberId: "marcus", productId: 2, icon: "🍟", name: "Truffle Fries", qty: 2, price: "₹16.50" },
  { id: 3, memberId: "self", productId: 4, icon: "🥗", name: "Greek Salad", qty: 0.5, price: "₹6.25" },
];

export function LedgerProvider({ children }) {
  const [ledgerItems, setLedgerItems] = useState(INITIAL_LEDGER_ITEMS);
  const { members } = useMembers();
  const { products } = useProducts();

  useEffect(() => {
    if (members.length <= 1 && products.length === 0) {
      setLedgerItems([]);
    }
  }, [members.length, products.length]);

  const addLedgerItem = (item) => {
    setLedgerItems((prev) => {
      const idx = prev.findIndex(
        (li) => li.memberId === item.memberId && li.productId === item.productId
      );
      if (idx === -1) {
        return [...prev, { id: Date.now(), ...item }];
      }
      const existing = prev[idx];
      const mergedQty = existing.qty + item.qty;
      const mergedPrice =
        parseFloat(String(existing.price).replace("₹", "")) +
        parseFloat(String(item.price).replace("₹", ""));
      const next = [...prev];
      next[idx] = { ...existing, qty: mergedQty, price: `₹${mergedPrice.toFixed(2)}` };
      return next;
    });
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
