import { useState } from "react";
import { Link } from "react-router-dom";
import TopAppBar from "../components/TopAppBar";
import BottomNavBar from "../components/BottomNavBar";
import { useMembers } from "../context/MembersContext";
import { useLedger } from "../context/LedgerContext";
import {
  buildWhatsAppSummary,
  getGrandTotal,
  getItemLegend,
  getMemberExpression,
  getMemberLedgerItems,
  getMemberTotal,
} from "../utils/ledgerSummary";

function SummaryPage() {
  const { members } = useMembers();
  const { ledgerItems } = useLedger();
  const [copied, setCopied] = useState(false);

  const finalTotals = members
    .filter((member) => getMemberLedgerItems(ledgerItems, member.id).length > 0)
    .map((member) => ({
      id: member.id,
      name: member.name,
      expression: getMemberExpression(ledgerItems, member.id),
      amount: `₹${getMemberTotal(ledgerItems, member.id).toFixed(2)}`,
    }));

  const itemLegend = getItemLegend(ledgerItems);
  const grandTotal = `₹${getGrandTotal(ledgerItems).toFixed(2)}`;
  const shareText = buildWhatsAppSummary(members, ledgerItems);
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable/denied — no fallback UI, WhatsApp button still works independently
    }
  };

  return (
    <div className="min-h-screen pb-32 pt-20">
      <TopAppBar total={grandTotal} />
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
            {finalTotals.map((entry) => (
              <div key={entry.id}>
                <div className="flex justify-between font-data-mono">
                  <span>{entry.name}</span>
                  <span>{entry.amount}</span>
                </div>
                {entry.expression && (
                  <p className="font-label-xs text-outline mt-1">{entry.expression}</p>
                )}
              </div>
            ))}
          </div>

          {itemLegend.length > 0 && (
            <div className="mt-6 pt-4 border-t border-outline-variant">
              <h4 className="font-label-xs uppercase text-outline mb-2">Item Legend</h4>
              <div className="space-y-1">
                {itemLegend.map((item) => (
                  <div
                    key={item.icon + item.name}
                    className="flex justify-between font-label-xs text-outline"
                  >
                    <span>
                      {item.icon} {item.name}
                    </span>
                    <span>{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-center mb-8">
          <button
            type="button"
            onClick={handleCopy}
            className="bg-primary text-on-primary font-label-bold h-12 px-6 rounded-xl flex items-center gap-2 hover:bg-on-background transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined">
              {copied ? "check" : "content_copy"}
            </span>
            {copied ? "Copied!" : "Copy"}
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-on-primary font-label-bold h-12 px-6 rounded-xl flex items-center gap-2 hover:bg-on-background transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined">share</span>
            WhatsApp
          </a>
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
