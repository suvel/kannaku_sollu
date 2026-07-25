import { createContext, useContext, useState } from "react";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([
    { id: 1, emoji: "🍔", name: "Double Burger", price: 14.5 },
    { id: 2, emoji: "🍟", name: "Truffle Fries", price: 8.25 },
    { id: 3, emoji: "🍕", name: "Margherita XL", price: 24.0 },
    { id: 4, emoji: "🥗", name: "Greek Salad", price: 12.5 },
    { id: 5, emoji: "🍷", name: "House Wine", price: 32.0 },
  ]);

  const removeProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const addProduct = ({ emoji, name, price }) => {
    setProducts([...products, { id: Date.now(), emoji, name, price }]);
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
