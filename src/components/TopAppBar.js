function TopAppBar({ total = "₹0.00" }) {
  return (
    <header className="fixed top-0 w-full h-16 border-b border-outline-variant bg-background z-50">
      <div className="flex justify-between items-center px-container-margin w-full max-w-[768px] mx-auto h-full">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            account_balance_wallet
          </span>
          <span className="font-headline-md text-headline-md tracking-tighter text-primary">
            PRECISION LEDGER
          </span>
        </div>
        <div className="font-data-mono text-data-mono text-secondary font-bold">
          TOTAL: {total}
        </div>
      </div>
    </header>
  );
}

export default TopAppBar;
