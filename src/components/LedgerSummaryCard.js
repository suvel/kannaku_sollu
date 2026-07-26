import { getGrandTotal } from "../utils/ledgerSummary";
import { CURRENCY_SYMBOL } from "../constants";

function LedgerSummaryCard({ ledgerItems, totalTestId }) {
  const total = getGrandTotal(ledgerItems);

  return (
    <section className="mt-section-margin bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden shadow-sm">
      <div className="bg-secondary text-on-primary px-card-padding py-2 font-label-bold text-label-bold uppercase">
        Quick Ledger Summary
      </div>
      <div className="p-card-padding space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-body-md text-body-md text-on-surface-variant">
            {ledgerItems.length} ledger {ledgerItems.length === 1 ? "entry" : "entries"}
          </span>
        </div>
      </div>
      <div className="bg-secondary-container/30 px-card-padding py-4 receipt-notched flex justify-between items-center">
        <span className="font-headline-md text-headline-md text-primary">TOTAL</span>
        <span data-testid={totalTestId} className="font-headline-md text-headline-md text-secondary">
          {CURRENCY_SYMBOL}{total.toFixed(2)}
        </span>
      </div>
    </section>
  );
}

export default LedgerSummaryCard;
