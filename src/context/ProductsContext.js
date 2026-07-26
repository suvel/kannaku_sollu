import { createContext, useContext, useState } from "react";
import { INITIAL_PRODUCTS } from "../constants";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

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
