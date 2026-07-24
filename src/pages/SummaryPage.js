import { Link } from "react-router-dom";
import TopAppBar from "../components/TopAppBar";
import BottomNavBar from "../components/BottomNavBar";

const FINAL_TOTALS = [
  { name: "Amanda", amount: "$42.50" },
  { name: "Jordan", amount: "$38.25" },
  { name: "Sarah", amount: "$47.70" },
];

function SummaryPage() {
  return (
    <div className="min-h-screen pb-32 pt-20">
      <TopAppBar total="$128.45" />
      <main className="px-container-margin max-w-[768px] mx-auto py-10 text-center">
        <span
          className="material-symbols-outlined text-6xl text-secondary mb-4"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
        <h1 className="font-headline-lg text-headline-lg mb-2">Ledger Finalized</h1>
        <p className="text-on-surface-variant mb-8">
          All expenses have been assigned and taxes calculated.
        </p>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-card-padding text-left mb-8 shadow-sm">
          <h3 className="font-label-bold uppercase mb-4 text-secondary">Final Totals</h3>
          <div className="space-y-4">
            {FINAL_TOTALS.map((entry) => (
              <div key={entry.name} className="flex justify-between font-data-mono">
                <span>{entry.name}</span>
                <span>{entry.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <Link
          to="/"
          className="inline-block bg-primary text-on-primary px-8 py-3 rounded-xl font-label-bold uppercase"
        >
          Start New Ledger
        </Link>
      </main>
      <BottomNavBar />
    </div>
  );
}

export default SummaryPage;
