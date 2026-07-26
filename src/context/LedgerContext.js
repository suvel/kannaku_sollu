import { createContext, useContext, useEffect, useState } from "react";
import { useMembers } from "./MembersContext";
import { useProducts } from "./ProductsContext";
import { CURRENCY_SYMBOL, INITIAL_LEDGER_ITEMS } from "../constants";

const LedgerContext = createContext(null);

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
      console.log({prev, item})
      const idx = prev.findIndex(
        (li) => li.memberId === item.memberId && li.productId === item.productId
      );
      if (idx === -1) {
        return [...prev, { id: Date.now(), ...item }];
      }
      const existing = prev[idx]||0;
      const mergedQty = existing.qty + item.qty;
      const mergedPrice =
        parseFloat(String(existing.price).replace(CURRENCY_SYMBOL, "")) +
        parseFloat(String(item.price).replace(CURRENCY_SYMBOL, ""));
      const next = [...prev];
      next[idx] = { ...existing, qty: mergedQty, price: `${CURRENCY_SYMBOL}${mergedPrice.toFixed(2)}` };
      return next;
    });
  };

  const removeLedgerItem = (id) => {
    setLedgerItems((prev) => prev.filter((item) => item.id !== id));
  };

  const removeLedgerItemsByMember = (memberId) => {
    setLedgerItems((prev) => prev.filter((item) => item.memberId !== memberId));
  };

  const removeLedgerItemsByProduct = (productId) => {
    setLedgerItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  return (
    <LedgerContext.Provider
      value={{
        ledgerItems,
        addLedgerItem,
        removeLedgerItem,
        removeLedgerItemsByMember,
        removeLedgerItemsByProduct,
      }}
    >
      {children}
    </LedgerContext.Provider>
  );
}

export function useLedger() {
  return useContext(LedgerContext);
}
