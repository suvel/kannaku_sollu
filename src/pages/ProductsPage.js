import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopAppBar from "../components/TopAppBar";
import BottomNavBar from "../components/BottomNavBar";
import AddItemModal from "../components/AddItemModal";
import ConfirmDialog from "../components/ConfirmDialog";
import LedgerSummaryCard from "../components/LedgerSummaryCard";
import { useProducts } from "../context/ProductsContext";
import { useLedger } from "../context/LedgerContext";

function ProductsPage() {
  const navigate = useNavigate();
  const { products, addProduct, removeProduct } = useProducts();
  const { ledgerItems, removeLedgerItemsByProduct } = useLedger();
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [productPendingRemoval, setProductPendingRemoval] = useState(null);

  const cancelRemoveProduct = () => setProductPendingRemoval(null);

  const confirmRemoveProduct = () => {
    if (!productPendingRemoval) return;
    removeLedgerItemsByProduct(productPendingRemoval.id);
    removeProduct(productPendingRemoval.id);
    setProductPendingRemoval(null);
  };

  const affectedProductEntryCount = productPendingRemoval
    ? ledgerItems.filter((item) => item.productId === productPendingRemoval.id).length
    : 0;

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
                onClick={() => setProductPendingRemoval(product)}
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
                onClick={() => setProductPendingRemoval(product)}
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

        <LedgerSummaryCard ledgerItems={ledgerItems} />

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
      <ConfirmDialog
        open={productPendingRemoval !== null}
        title={productPendingRemoval ? `Remove ${productPendingRemoval.name}?` : ""}
        message={
          productPendingRemoval
            ? affectedProductEntryCount === 0
              ? "Are you sure you want to remove this item?"
              : `This will permanently delete ${affectedProductEntryCount} ledger ${
                  affectedProductEntryCount === 1 ? "entry" : "entries"
                } calculated for this item. This cannot be undone.`
            : ""
        }
        onConfirm={confirmRemoveProduct}
        onClose={cancelRemoveProduct}
      />
      <BottomNavBar />
    </div>
  );
}

export default ProductsPage;
