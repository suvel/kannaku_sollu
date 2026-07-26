import { CURRENCY_SYMBOL } from "../constants";
import {
  formatQty,
  getMemberLedgerItems,
  getMemberExpression,
  getMemberTotal,
  getGrandTotal,
  getItemLegend,
  buildWhatsAppSummary,
} from "./ledgerSummary";

const price = (amount) => `${CURRENCY_SYMBOL}${amount.toFixed(2)}`;

const ledgerItems = [
  { id: 1, memberId: "sarah", productId: 1, icon: "🌯", name: "C.Roll", qty: 2, price: price(200) },
  { id: 2, memberId: "marcus", productId: 2, icon: "🍟", name: "Truffle Fries", qty: 2, price: price(60) },
  { id: 3, memberId: "sarah", productId: 2, icon: "🍟", name: "Truffle Fries", qty: 1, price: price(30) },
];

describe("formatQty", () => {
  // Positive test case 1: whole number qty formats without a decimal
  it("renders whole numbers without a decimal", () => {
    expect(formatQty(2)).toBe("2");
  });

  // Positive test case 2: fractional qty formats with 1 decimal place
  it("renders fractional numbers with 1 decimal place", () => {
    expect(formatQty(1.5)).toBe("1.5");
  });

  // Negative test case 1: negative whole number qty
  it("renders negative whole numbers without a decimal", () => {
    expect(formatQty(-2)).toBe("-2");
  });

  // Negative test case 2: negative fractional qty
  it("renders negative fractional numbers with 1 decimal place", () => {
    expect(formatQty(-1.5)).toBe("-1.5");
  });
});

describe("getMemberLedgerItems", () => {
  // Positive test case 1: member with multiple ledger items
  it("returns only the items belonging to the given member", () => {
    expect(getMemberLedgerItems(ledgerItems, "sarah")).toEqual([ledgerItems[0], ledgerItems[2]]);
  });

  // Positive test case 2: member with a single ledger item
  it("returns the single item belonging to another member", () => {
    expect(getMemberLedgerItems(ledgerItems, "marcus")).toEqual([ledgerItems[1]]);
  });

  // Negative test case 1: member id not present in the ledger
  it("returns an empty array when the member has no items", () => {
    expect(getMemberLedgerItems(ledgerItems, "nobody")).toEqual([]);
  });

  // Negative test case 2: empty ledger
  it("returns an empty array when the ledger itself is empty", () => {
    expect(getMemberLedgerItems([], "sarah")).toEqual([]);
  });
});

describe("getMemberExpression", () => {
  // Positive test case 1: member with multiple ledger items
  it("joins multiple items for a member with '+'", () => {
    expect(getMemberExpression(ledgerItems, "sarah")).toBe("2x🌯+1x🍟");
  });

  // Positive test case 2: member with a single ledger item
  it("renders a single item for a member without joining", () => {
    expect(getMemberExpression(ledgerItems, "marcus")).toBe("2x🍟");
  });

  // Negative test case 1: member id not present in the ledger
  it("returns an empty string when the member has no items", () => {
    expect(getMemberExpression(ledgerItems, "nobody")).toBe("");
  });

  // Negative test case 2: empty ledger
  it("returns an empty string when the ledger itself is empty", () => {
    expect(getMemberExpression([], "sarah")).toBe("");
  });
});

describe("getMemberTotal", () => {
  // Positive test case 1: member with multiple ledger items
  it("sums the prices of a member's items", () => {
    expect(getMemberTotal(ledgerItems, "sarah")).toBe(230);
  });

  // Positive test case 2: member with a single ledger item
  it("returns the price of a member's single item", () => {
    expect(getMemberTotal(ledgerItems, "marcus")).toBe(60);
  });

  // Negative test case 1: member id not present in the ledger
  it("returns 0 when the member has no items", () => {
    expect(getMemberTotal(ledgerItems, "nobody")).toBe(0);
  });

  // Negative test case 2: empty ledger
  it("returns 0 when the ledger itself is empty", () => {
    expect(getMemberTotal([], "sarah")).toBe(0);
  });
});

describe("getGrandTotal", () => {
  // Positive test case 1: multiple items across members
  it("sums the prices of all items", () => {
    expect(getGrandTotal(ledgerItems)).toBe(290);
  });

  // Positive test case 2: a single item
  it("returns the price of a single item", () => {
    expect(getGrandTotal([ledgerItems[1]])).toBe(60);
  });

  // Negative test case 1: empty ledger
  it("returns 0 for an empty ledger", () => {
    expect(getGrandTotal([])).toBe(0);
  });

  // Negative test case 2: items priced at zero
  it("returns 0 when all items are priced at zero", () => {
    const zeroPricedItems = [
      { ...ledgerItems[0], price: price(0) },
      { ...ledgerItems[1], price: price(0) },
    ];
    expect(getGrandTotal(zeroPricedItems)).toBe(0);
  });
});

describe("getItemLegend", () => {
  // Positive test case 1: dedupes by productId and computes unit price
  it("dedupes by productId and computes unit price", () => {
    expect(getItemLegend(ledgerItems)).toEqual([
      { icon: "🌯", name: "C.Roll", price: price(100) },
      { icon: "🍟", name: "Truffle Fries", price: price(30) },
    ]);
  });

  // Positive test case 2: single item ledger
  it("returns a single legend entry for a single item", () => {
    expect(getItemLegend([ledgerItems[1]])).toEqual([
      { icon: "🍟", name: "Truffle Fries", price: price(30) },
    ]);
  });

  // Negative test case 1: empty ledger
  it("returns an empty array for an empty ledger", () => {
    expect(getItemLegend([])).toEqual([]);
  });

  // Negative test case 2: duplicate entries for the same product keep only the first
  it("keeps only the first entry when duplicate productIds are present", () => {
    const duplicateProductItems = [
      { id: 10, memberId: "sarah", productId: 5, icon: "🥤", name: "Soda", qty: 2, price: price(20) },
      { id: 11, memberId: "marcus", productId: 5, icon: "🥤", name: "Soda", qty: 5, price: price(100) },
    ];
    expect(getItemLegend(duplicateProductItems)).toEqual([
      { icon: "🥤", name: "Soda", price: price(10) },
    ]);
  });

  // Negative test case 3: qty of 0 is not guarded against and produces an Infinity unit price.
  // Not reachable via the current UI (quantity floor is 0.5, AddItemModal rejects price <= 0),
  // but documents a real gap if ledger items are ever created through another path.
  it("computes an Infinity unit price when an item has qty 0 (documents a missing zero-guard)", () => {
    const zeroQtyItem = {
      id: 20,
      memberId: "sarah",
      productId: 9,
      icon: "🥤",
      name: "FreeSample",
      qty: 0,
      price: price(5),
    };
    expect(getItemLegend([zeroQtyItem])).toEqual([
      { icon: "🥤", name: "FreeSample", price: `${CURRENCY_SYMBOL}Infinity` },
    ]);
  });
});

describe("buildWhatsAppSummary", () => {
  const members = [
    { id: "sarah", name: "Sarah Miller" },
    { id: "marcus", name: "Marcus Wong" },
    { id: "unused", name: "No Items" },
  ];

  // Positive test case 1: member with multiple items and the grand total line
  it("includes a member's expression, total, and the grand total", () => {
    const summary = buildWhatsAppSummary(members, ledgerItems);

    expect(summary).toContain(`Sarah Miller: 2x🌯+1x🍟 = ${price(230)}`);
    expect(summary).toContain(`Total: ${price(290)}`);
  });

  // Positive test case 2: member with a single item
  it("includes a member with a single item", () => {
    const summary = buildWhatsAppSummary(members, ledgerItems);

    expect(summary).toContain(`Marcus Wong: 2x🍟 = ${price(60)}`);
  });

  // Negative test case 1: member with no ledger items is excluded
  it("excludes members who have no ledger items", () => {
    const summary = buildWhatsAppSummary(members, ledgerItems);

    expect(summary).not.toContain("No Items");
  });

  // Negative test case 2: empty ledger excludes all members and totals zero
  it("excludes all members and totals zero for an empty ledger", () => {
    const summary = buildWhatsAppSummary(members, []);

    expect(summary).not.toContain("Sarah Miller");
    expect(summary).not.toContain("Marcus Wong");
    expect(summary).toContain(`Total: ${price(0)}`);
  });
});
