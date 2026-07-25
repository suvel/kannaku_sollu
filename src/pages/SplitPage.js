import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopAppBar from "../components/TopAppBar";
import BottomNavBar from "../components/BottomNavBar";
import { useMembers } from "../context/MembersContext";

const LEDGER_ITEMS = [
  { icon: "🍔", name: "Artisan Burger", qty: "1.0 @ Amanda", price: "$24.00" },
  { icon: "🍺", name: "Craft IPA", qty: "2.0 @ Jordan", price: "$18.00" },
  { icon: "🥗", name: "Kale Salad", qty: "0.5 @ Taylor", price: "$11.50" },
];

function SplitPage() {
  const navigate = useNavigate();
  const { members } = useMembers();
  const [quantity, setQuantity] = useState(1.5);
  const [activeMember, setActiveMember] = useState(members[0]?.name ?? "");

  return (
    <div className="min-h-screen pb-32 pt-20">
      <TopAppBar total="$248.50" />
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
              const isActive = activeMember === member.name;
              return (
                <div
                  key={member.id}
                  onClick={() => setActiveMember(member.name)}
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
                    $0.00
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
                    onChange={(e) => setActiveMember(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 font-body-md text-on-surface pt-2"
                  >
                    {members.map((member) => (
                      <option key={member.id} value={member.name}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-2 relative flex items-center">
                  <label className="absolute -top-2 left-2 px-1 bg-surface-container-lowest text-label-xs font-label-bold text-outline-variant uppercase">
                    Item
                  </label>
                  <select className="w-full bg-transparent border-none focus:ring-0 font-body-md text-on-surface pt-2">
                    <option value="burger">🍔 Artisan Burger</option>
                    <option value="beer">🍺 Craft IPA</option>
                    <option value="salad">🥗 Kale Salad</option>
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
                <button className="bg-primary text-on-primary font-label-bold h-12 px-6 rounded-xl flex items-center gap-2 hover:bg-on-background transition-colors active:scale-95">
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
            <div className="flex items-center gap-2">
              <span className="font-label-xs font-label-bold text-outline uppercase">
                Unassigned:
              </span>
              <span className="font-data-mono text-error">$142.00</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-secondary px-4 py-2 flex justify-between items-center">
                <span className="font-label-bold text-on-primary uppercase text-[10px] tracking-widest">
                  Receipt #0412
                </span>
                <span className="font-data-mono text-xs text-secondary-fixed">2023.10.14</span>
              </div>
              <div className="p-4 space-y-3">
                {LEDGER_ITEMS.map((item, idx) => (
                  <div key={item.name}>
                    <div className="flex justify-between items-center group">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <div>
                          <p className="font-label-bold text-on-surface uppercase">{item.name}</p>
                          <p className="font-label-xs text-outline">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-data-mono text-on-surface">{item.price}</p>
                        <button className="text-error opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                    </div>
                    {idx < LEDGER_ITEMS.length - 1 && <div className="dashed-divider"></div>}
                  </div>
                ))}
              </div>
              <div className="bg-surface-container-low p-4 notch-footer">
                <div className="flex justify-between items-center">
                  <span className="font-label-bold text-on-surface-variant uppercase text-xs">
                    Total Assigned
                  </span>
                  <span className="font-data-mono text-secondary-fixed-dim bg-on-secondary-fixed-variant px-2 py-0.5 rounded">
                    $53.50
                  </span>
                </div>
              </div>
            </div>
            <button className="w-full h-16 border-2 border-dashed border-outline-variant rounded-xl flex items-center justify-center gap-2 text-outline-variant hover:text-secondary hover:border-secondary transition-all group">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
                add_circle
              </span>
              <span className="font-label-bold uppercase">Insert New Sub-Ledger</span>
            </button>
          </div>
        </section>
      </main>
      <button
        onClick={() => navigate("/summary")}
        className="fixed bottom-24 right-container-margin w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:bg-on-background active:scale-90 transition-all z-40"
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
