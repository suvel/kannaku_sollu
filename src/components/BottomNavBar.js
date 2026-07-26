import { Link, useLocation } from "react-router-dom";
import { useMembers } from "../context/MembersContext";
import { useProducts } from "../context/ProductsContext";

const TABS = [
  { to: "/", icon: "inventory_2", label: "Products" },
  { to: "/members", icon: "group", label: "Members" },
  { to: "/split", icon: "rotate_90_degrees_ccw", label: "Split" },
  { to: "/summary", icon: "receipt_long", label: "Summary" },
];

function BottomNavBar() {
  const location = useLocation();
  const { members } = useMembers();
  const { products } = useProducts();
  const canReachSummary = members.length > 0 && products.length > 0;

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 h-20 border-t border-outline-variant bg-background">
      <div className="max-w-[768px] mx-auto flex justify-around items-center h-full px-container-margin pb-safe">
        {TABS.map((tab) => {
          const isActive = location.pathname === tab.to;

          if (tab.to === "/summary" && !canReachSummary) {
            return (
              <span
                key={tab.to}
                data-testid={`nav-tab-${tab.label.toLowerCase()}`}
                aria-disabled="true"
                className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 opacity-40 cursor-not-allowed"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                  {tab.icon}
                </span>
                <span className="font-label-bold text-label-bold">{tab.label}</span>
              </span>
            );
          }

          return (
            <Link
              key={tab.to}
              to={tab.to}
              data-testid={`nav-tab-${tab.label.toLowerCase()}`}
              className={`flex flex-col items-center justify-center ${
                isActive
                  ? "text-secondary bg-secondary-container/20 rounded-full px-4 py-1 scale-95 transition-transform duration-200"
                  : "text-on-surface-variant px-4 py-1 hover:text-secondary transition-colors"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {tab.icon}
              </span>
              <span className="font-label-bold text-label-bold">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNavBar;
