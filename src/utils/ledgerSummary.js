export function formatQty(qty) {
  const num = Number(qty);
  return Number.isInteger(num) ? String(num) : num.toFixed(1);
}

export function getMemberLedgerItems(ledgerItems, memberId) {
  return ledgerItems.filter((item) => item.memberId === memberId);
}

export function getMemberExpression(ledgerItems, memberId) {
  const items = getMemberLedgerItems(ledgerItems, memberId);
  if (items.length === 0) return "";
  return items.map((item) => `${formatQty(item.qty)}x${item.icon}`).join("+");
}

export function getMemberTotal(ledgerItems, memberId) {
  return getMemberLedgerItems(ledgerItems, memberId).reduce(
    (sum, item) => sum + parseFloat(String(item.price).replace("$", "")),
    0
  );
}
