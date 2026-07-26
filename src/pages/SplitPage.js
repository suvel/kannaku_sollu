import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopAppBar from "../components/TopAppBar";
import BottomNavBar from "../components/BottomNavBar";
import LedgerSummaryCard from "../components/LedgerSummaryCard";
import { useMembers } from "../context/MembersContext";
import { useProducts } from "../context/ProductsContext";
import { useLedger } from "../context/LedgerContext";
import { formatQty, getGrandTotal, getMemberExpression, getMemberLedgerItems, getMemberTotal } from "../utils/ledgerSummary";
import { CURRENCY_SYMBOL, ROUTES } from "../constants";

function SplitPage() {
  const navigate = useNavigate();
  const { members } = useMembers();
  const { products } = useProducts();
  const { ledgerItems, addLedgerItem, removeLedgerItem } = useLedger();
  const [quantity, setQuantity] = useState(1.0);
  const [activeMember, setActiveMember] = useState(members[0]?.id ?? "");
  const [selectedItem, setSelectedItem] = useState(products[0]?.id ?? "");
  const [expandedGroups, setExpandedGroups] = useState({});

  const handleAssign = () => {
    const member = members.find((m) => m.id === activeMember);
    const product = products.find((p) => p.id === selectedItem);
    if (!member || !product) return;
    const price = product.price * quantity;
    const newItem = {
      memberId: member.id,
      productId: product.id,
      icon: product.emoji,
      name: product.name,
      qty: quantity,
      price: `${CURRENCY_SYMBOL}${price.toFixed(2)}`,
    };
    addLedgerItem(newItem);
  };

  const canFinalize = members.length > 0 && products.length > 0;

  const memberReceiptGroups = members
    .map((member) => ({
      key: member.id,
      member,
      items: getMemberLedgerItems(ledgerItems, member.id),
    }))
    .filter((group) => group.items.length > 0);

  const orphanItems = ledgerItems.filter(
    (item) => !members.some((m) => m.id === item.memberId)
  );

  const receiptGroups = orphanItems.length
    ? [...memberReceiptGroups, { key: "unassigned", member: null, items: orphanItems }]
    : memberReceiptGroups;

  return (
    <div className="min-h-screen pb-32 pt-20">
      <TopAppBar total={`${CURRENCY_SYMBOL}${getGrandTotal(ledgerItems).toFixed(2)}`} />
      <main className="px-container-margin max-w-[768px] mx-auto">
        <section className="mt-4 mb-section-margin">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="font-label-bold text-label-bold uppercase text-on-surface-variant">
              Active Members
            </h2>
            <span className="font-data-mono text-xs text-secondary">{members.length} Selected</span>
          </div>
          <div className="flex gap-inline-gap overflow-x-auto hide-scrollbar py-2 -mx-container-margin px-container-margin">
            {members.map((member) => {
              const isActive = activeMember === member.id;
              return (
                <div
                  key={member.id}
                  onClick={() => setActiveMember(member.id)}
                  className={`flex-shrink-0 w-32 p-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? "bg-secondary-container/20 border-2 border-secondary shadow-sm"
                      : "bg-surface-container-lowest border border-outline-variant hover:bg-surface-container-low"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full overflow-hidden border ${
                      isActive ? "border-secondary" : "border-outline-variant"
                    } ${
                      member.avatar
                        ? "bg-surface-container-highest"
                        : "bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-label-bold"
                    }`}
                  >
                    {member.avatar ? (
                      <img className="w-full h-full object-cover" src={member.avatar} alt={member.name} />
                    ) : (
                      member.initial
                    )}
                  </div>
                  <span
                    className={`font-label-bold text-label-bold ${
                      isActive ? "text-secondary" : "text-on-surface-variant"
                    }`}
                  >
                    {member.name}
                  </span>
                  <span
                    className={`font-data-mono text-[10px] ${
                      isActive ? "text-on-secondary-container" : "text-outline"
                    }`}
                  >
                    {CURRENCY_SYMBOL}0.00
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-section-margin">
          <div className="bg-surface-container-low p-card-padding rounded-xl border border-outline-variant">
            <h2 className="font-label-bold text-label-bold uppercase text-on-surface-variant mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">bolt</span>
              Quick Add Expression
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-inline-gap">
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-2 relative">
                  <label className="absolute -top-2 left-2 px-1 bg-surface-container-lowest text-label-xs font-label-bold text-outline-variant uppercase">
                    Member
                  </label>
                  <select
                    value={activeMember}
                    onChange={(e) => {
                      const found = members.find((m) => String(m.id) === e.target.value);
                      if (found) setActiveMember(found.id);
                    }}
                    data-testid="assign-member-select"
                    className="w-full bg-transparent border-none focus:ring-0 font-body-md text-on-surface pt-2"
                  >
                    {members.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-2 relative flex items-center">
                  <label className="absolute -top-2 left-2 px-1 bg-surface-container-lowest text-label-xs font-label-bold text-outline-variant uppercase">
                    Item
                  </label>
                  <select
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(Number(e.target.value))}
                    data-testid="assign-item-select"
                    className="w-full bg-transparent border-none focus:ring-0 font-body-md text-on-surface pt-2"
                  >
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.emoji} {product.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-inline-gap">
                <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-2 relative flex items-center justify-between">
                  <label className="absolute -top-2 left-2 px-1 bg-surface-container-lowest text-label-xs font-label-bold text-outline-variant uppercase">
                    Quantity
                  </label>
                  <button
                    onClick={() => setQuantity(Math.max(0.5, quantity - 0.5))}
                    className="p-1 text-secondary material-symbols-outlined pt-2"
                  >
                    remove_circle
                  </button>
                  <span className="font-data-mono text-body-lg pt-2">{quantity.toFixed(1)}</span>
                  <button
                    onClick={() => setQuantity(quantity + 0.5)}
                    className="p-1 text-secondary material-symbols-outlined pt-2"
                  >
                    add_circle
                  </button>
                </div>
                <button
                  onClick={handleAssign}
                  data-testid="assign-button"
                  className="bg-primary text-on-primary font-label-bold h-12 px-6 rounded-xl flex items-center gap-2 hover:bg-on-background transition-colors active:scale-95"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  ASSIGN
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-section-margin">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="font-label-bold text-label-bold uppercase text-on-surface-variant">
              Current Ledger
            </h2>
          </div>
          <div className="space-y-4">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-secondary px-4 py-2 flex justify-between items-center"/>
              <div className="p-4 space-y-4">
                {receiptGroups.map((group, groupIdx) => {
                  const isExpanded = !!expandedGroups[group.key];
                  return (
                  <div key={group.key}>
                    <div className="flex items-baseline justify-between">
                      <span className="font-label-bold text-secondary uppercase text-xs">
                        {group.member ? group.member.name : "Member Removed"}
                      </span>
                      </div>
                      <div>
                      {group.member && (
                        <span className="font-data-mono text-[10px] text-outline">
                          {getMemberExpression(ledgerItems, group.member.id)} · {CURRENCY_SYMBOL}
                          {getMemberTotal(ledgerItems, group.member.id).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-end mb-2">
                      <button
                        onClick={() =>
                          setExpandedGroups((prev) => ({ ...prev, [group.key]: !prev[group.key] }))
                        }
                        className="font-label-xs text-[9px] text-secondary uppercase flex items-center gap-0.5"
                      >
                        {isExpanded ? "Show less" : "Show more"}
                        <span className="material-symbols-outlined text-xs">
                          {isExpanded ? "expand_less" : "expand_more"}
                        </span>
                      </button>
                    </div>
                    {isExpanded && (
                    <div className="space-y-3">
                      {group.items.map((item, idx) => {
                        const memberMissing = !group.member;
                        const productMissing = !products.some((p) => p.id === item.productId);
                        const isBroken = memberMissing || productMissing;
                        return (
                          <div key={item.id}>
                            <div
                              className={`flex justify-between items-center group ${
                                isBroken ? "bg-error/10 border border-error rounded-lg px-2 -mx-2 py-1" : ""
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-xl">{item.icon}</span>
                                <div>
                                  <p className="font-label-bold text-on-surface uppercase">{item.name}</p>
                                  <p className="font-label-xs text-outline">Qty: {formatQty(item.qty)}</p>
                                  {isBroken && (
                                    <p className="font-label-xs text-error uppercase">
                                      {memberMissing && productMissing
                                        ? "Member & item removed"
                                        : memberMissing
                                        ? "Member removed"
                                        : "Item removed"}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-data-mono text-on-surface">{item.price}</p>
                                <button
                                  onClick={() => removeLedgerItem(item.id)}
                                  data-testid={`remove-ledger-item-${item.id}`}
                                  className="text-error opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <span className="material-symbols-outlined text-sm">close</span>
                                </button>
                              </div>
                            </div>
                            {idx < group.items.length - 1 && <div className="dashed-divider"></div>}
                          </div>
                        );
                      })}
                    </div>
                    )}
                    {groupIdx < receiptGroups.length - 1 && <div className="dashed-divider mt-3"></div>}
                  </div>
                  );
                })}
              </div>
            </div>
            <LedgerSummaryCard ledgerItems={ledgerItems} totalTestId="total-assigned" />
          </div>
        </section>
      </main>
      <button
        onClick={() => canFinalize && navigate(ROUTES.SUMMARY)}
        disabled={!canFinalize}
        data-testid="finalize-fab"
        className="fixed bottom-24 right-container-margin w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:bg-on-background active:scale-90 transition-all z-40 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:active:scale-100"
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
          check
        </span>
      </button>
      <BottomNavBar />
    </div>
  );
}

export default SplitPage;
