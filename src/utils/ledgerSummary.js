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
    (sum, item) => sum + parseFloat(String(item.price).replace("₹", "")),
    0
  );
}

export function getGrandTotal(ledgerItems) {
  return ledgerItems.reduce(
    (sum, item) => sum + parseFloat(String(item.price).replace("₹", "")),
    0
  );
}

export function getItemLegend(ledgerItems) {
  const seen = new Map();
  ledgerItems.forEach((item) => {
    if (!seen.has(item.productId)) {
      const unitPrice = parseFloat(String(item.price).replace("₹", "")) / item.qty;
      seen.set(item.productId, {
        icon: item.icon,
        name: item.name,
        price: `₹${unitPrice.toFixed(2)}`,
      });
    }
  });
  return Array.from(seen.values());
}

export function buildWhatsAppSummary(members, ledgerItems) {
  const lines = members
    .filter((member) => getMemberLedgerItems(ledgerItems, member.id).length > 0)
    .map(
      (member) =>
        `👤 ${member.name}: ${getMemberExpression(ledgerItems, member.id)} = ₹${getMemberTotal(ledgerItems, member.id).toFixed(2)}`
    );

  return [
    "🧾 Split Summary",
    "",
    ...lines,
    "",
    `💰 Total: ₹${getGrandTotal(ledgerItems).toFixed(2)}`,
  ].join("\n");
}
