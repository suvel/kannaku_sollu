import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopAppBar from "../components/TopAppBar";
import BottomNavBar from "../components/BottomNavBar";
import AddItemModal from "../components/AddItemModal";
import { useProducts } from "../context/ProductsContext";

function ProductsPage() {
  const navigate = useNavigate();
  const { products, addProduct, removeProduct } = useProducts();
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  const subtotal = products.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="min-h-screen pb-32 pt-20">
      <TopAppBar />
      <main className="px-container-margin max-w-[768px] mx-auto">
        <section className="mb-6 flex justify-between items-end mt-4">
          <div>
            <p className="font-label-bold text-label-bold text-secondary uppercase tracking-widest">
              Step 01
            </p>
            <h1 className="font-headline-lg text-headline-lg">Inventory List</h1>
          </div>
          <div className="text-right">
            <p className="font-label-xs text-label-xs text-on-surface-variant uppercase">
              Current Session
            </p>
            <p className="font-data-mono text-data-mono">#ORD-2024-X9</p>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-inline-gap">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-card-padding flex flex-col items-center text-center shadow-sm relative group hover:border-secondary transition-colors"
            >
              <button
                onClick={() => removeProduct(product.id)}
                className="absolute top-2 right-2 text-on-surface-variant hover:text-error transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
              <div className="text-4xl mb-3">{product.emoji}</div>
              <div className="w-full">
                <p className="font-label-bold text-label-bold truncate uppercase mb-1">
                  {product.name}
                </p>
                <p className="font-data-mono text-data-mono text-secondary mb-3">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeProduct(product.id)}
                className="font-label-bold text-label-bold text-error uppercase mt-auto hover:opacity-70"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => setIsAddItemOpen(true)}
            className="border-2 border-dashed border-outline-variant rounded-xl p-card-padding flex flex-col items-center justify-center text-on-surface-variant hover:border-secondary hover:text-secondary transition-all group min-h-[160px]"
          >
            <span className="material-symbols-outlined text-3xl mb-2 group-hover:scale-110 transition-transform">
              add_circle
            </span>
            <p className="font-label-bold text-label-bold uppercase">Add Item</p>
          </button>
        </div>

        <section className="mt-section-margin bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          <div className="bg-secondary text-on-primary px-card-padding py-2 font-label-bold text-label-bold uppercase">
            Quick Ledger Summary
          </div>
          <div className="p-card-padding space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-body-md text-body-md text-on-surface-variant">
                Subtotal ({products.length} items)
              </span>
              <span className="font-data-mono text-data-mono">${subtotal.toFixed(2)}</span>
            </div>
            <div className="dashed-divider"></div>
            <div className="flex justify-between items-center">
              <span className="font-body-md text-body-md text-on-surface-variant">
                Service Fee (10%)
              </span>
              <span className="font-data-mono text-data-mono">$9.12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-body-md text-body-md text-on-surface-variant">
                Tax (VAT 21%)
              </span>
              <span className="font-data-mono text-data-mono">$28.08</span>
            </div>
          </div>
          <div className="bg-secondary-container/30 px-card-padding py-4 receipt-notched flex justify-between items-center">
            <span className="font-headline-md text-headline-md text-primary">TOTAL</span>
            <span className="font-headline-md text-headline-md text-secondary">$128.45</span>
          </div>
        </section>

        <div className="mt-8">
          <button
            onClick={() => navigate("/members")}
            className="w-full bg-primary text-on-primary rounded-xl py-4 font-label-bold text-lg uppercase shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            Continue to Members
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </main>
      <AddItemModal
        open={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        onAdd={(payload) => {
          addProduct(payload);
          setIsAddItemOpen(false);
        }}
      />
      <BottomNavBar />
    </div>
  );
}

export default ProductsPage;
