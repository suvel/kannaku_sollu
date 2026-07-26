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
        </section>

        <div className="grid grid-cols-2 gap-inline-gap">
          {products.map((product) => (
            <div
              key={product.id}
              data-testid={`product-card-${product.id}`}
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
                  ₹{product.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeProduct(product.id)}
                data-testid={`remove-product-${product.id}`}
                className="font-label-bold text-label-bold text-error uppercase mt-auto hover:opacity-70"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => setIsAddItemOpen(true)}
            data-testid="add-item-button"
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
                {products.length} items
              </span>
            </div>
          </div>
          <div className="bg-secondary-container/30 px-card-padding py-4 receipt-notched flex justify-between items-center">
            <span className="font-headline-md text-headline-md text-primary">TOTAL</span>
            <span className="font-headline-md text-headline-md text-secondary">₹{subtotal.toFixed(2)}</span>
          </div>
        </section>

        <div className="mt-8">
          <button
            onClick={() => navigate("/members")}
            className="fixed bottom-24 right-4 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform z-40"
          >
            <span className="material-symbols-outlined text-2xl">arrow_forward</span>
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
