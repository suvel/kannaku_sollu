import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopAppBar from "../components/TopAppBar";
import BottomNavBar from "../components/BottomNavBar";

const MEMBERS = [
  {
    id: "amanda",
    name: "AMANDA",
    amount: "$0.00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuADobcrp_ddKDmQz_r3_elEoya4SqZP0gsA-VZf_rYLNN9716MNpe_z_XksF8ze_Y-jjpM86y2ijGnHVMuZ9wvlBX31uZT2iynrAltpPnxFAGGrJd9s-k--vPP8WZFoLteaFFUpjaZngcFkD2x1nxuf5_5UDFgocAY9gHoGtBasGFCT1VIu56eH8hPImnRgJ6gkG5qigAkBRyjMSKW5mUUV56oD1yOpXheL6AHV4SJJk1H_au5gmZDOQbjDADAAMjZazn54C9RZxgeJ",
  },
  {
    id: "jordan",
    name: "JORDAN",
    amount: "$0.00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSa_rsDxWJ147oFcSG4SXniDmtItxbeCtCpd1T-c4WEkluQWpIH1vaIaFRkuIMmdF1dNvckCr9CO2wBkQ0lGhbmYmnaX0Ym9c4HCDh0TMnaZNxiCppX-JI0W3iHjlEPC0p8LUGkJMTeYhurY6sUnCJ4ffHyyNjIXeelVqC4fs3auYcSfqN_k2IvIGxMXAsXCe8J5k7wfvmRbPvIsBr-Mh-i0MdWK9kvBlbsFx7HCi4k1NYZk14fhd1GzX2LUqklfq9HZkAwFLg8Rqp",
  },
  {
    id: "sarah",
    name: "SARAH",
    amount: "$0.00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZ141LRqxMFn6HyIjRApvjA1pgrIvdbjCpADkyuI-NxW7kcu7XgwV1VhGaKCxg-wM4n5lVjIqRz3Fxp-6uHXGE_OZYj3rKv60qo2xRB1PBE5RSQYmXI723z55FP8oI-aNgjcYzxxCmt1vw_peo4DkZMNQDJ1D1OxpvUUEHve6GMH1u9uQntW1aE4aDy3kJYgkTnxqZVo2XQD8XCIiIOqkiLUzAx7sonpfVBFLdXCRMZKxkTn6iH0esXjFOaMvu6zvCzYBk8TNXDbpx",
  },
  {
    id: "taylor",
    name: "TAYLOR",
    amount: "$0.00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAp0oVdNsmKEcbhQppwCAvJTKSo_YGuHlBEvHNC7-T3T0KFMWwrpn5oQTJ0jz5o0MdpX-MGVYWKNJcTUO_atpFjwiEKRj1Vnn9h7RQITrkmDahKoQiznq9AfXOQOxtbFTQPPwA6wx9gEL9NFb47FMlW3NPZAZKwG6EOhasc1uxKqXafzOnGz6T7wXqkvZZFasflEYyJXl_j-6ddDdU-nfG0pz7ieC9ZY6AxwaM0P3JSK21d7O5JDlIy4xPVZKYHhLaNq9cVH5a73oHn",
  },
];

const LEDGER_ITEMS = [
  { icon: "🍔", name: "Artisan Burger", qty: "1.0 @ Amanda", price: "$24.00" },
  { icon: "🍺", name: "Craft IPA", qty: "2.0 @ Jordan", price: "$18.00" },
  { icon: "🥗", name: "Kale Salad", qty: "0.5 @ Taylor", price: "$11.50" },
];

function SplitPage() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1.5);
  const [activeMember, setActiveMember] = useState("AMANDA");

  return (
    <div className="min-h-screen pb-32 pt-20">
      <TopAppBar total="$248.50" />
      <main className="px-container-margin max-w-[768px] mx-auto">
        <section className="mt-4 mb-section-margin">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="font-label-bold text-label-bold uppercase text-on-surface-variant">
              Active Members
            </h2>
            <span className="font-data-mono text-xs text-secondary">6 Selected</span>
          </div>
          <div className="flex gap-inline-gap overflow-x-auto hide-scrollbar py-2 -mx-container-margin px-container-margin">
            {MEMBERS.map((member) => {
              const isActive = activeMember === member.name;
              return (
                <div
                  key={member.id}
                  onClick={() => setActiveMember(member.name)}
                  className={`flex-shrink-0 w-28 p-3 rounded-xl flex flex-col items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? "bg-secondary-container/20 border-2 border-secondary shadow-sm"
                      : "bg-surface-container-lowest border border-outline-variant hover:bg-surface-container-low"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full overflow-hidden border ${
                      isActive ? "border-secondary" : "border-outline-variant"
                    } bg-surface-container-highest`}
                  >
                    <img className="w-full h-full object-cover" src={member.img} alt={member.name} />
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
                    {member.amount}
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
                  <select className="w-full bg-transparent border-none focus:ring-0 font-body-md text-on-surface pt-2">
                    <option>{activeMember.charAt(0) + activeMember.slice(1).toLowerCase()}</option>
                    <option>Jordan</option>
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
