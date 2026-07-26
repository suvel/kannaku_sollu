export const CURRENCY_SYMBOL = "₹";

export const SELF_MEMBER_ID = "self";

export const ROUTES = {
  PRODUCTS: "/",
  MEMBERS: "/members",
  SPLIT: "/split",
  SUMMARY: "/summary",
};

export const NAV_TABS = [
  { to: ROUTES.PRODUCTS, icon: "inventory_2", label: "Products" },
  { to: ROUTES.MEMBERS, icon: "group", label: "Members" },
  { to: ROUTES.SPLIT, icon: "rotate_90_degrees_ccw", label: "Split" },
  { to: ROUTES.SUMMARY, icon: "receipt_long", label: "Summary" },
];

export const EMOJI_CATEGORIES = {
  Food: [
    "🍔", "🍟", "🍕", "🌭", "🥪", "🌮",
    "🌯", "🥗", "🍝", "🍣", "🍱", "🍜",
    "🍲", "🥘", "🍛", "🍤", "🍗", "🥩",
    "🧀", "🥐", "🍩", "🍪", "🍦", "🍫",
    "🍰", "🥞", "🧇", "🥤", "☕", "🍷",
    "🍺", "🍹",
  ],
  Grocery: [
    "🥦", "🍅", "🥑", "🌽", "🥕", "🧅",
    "🧄", "🥔", "🍌", "🍊", "🍋", "🥭",
    "🍓", "🍒", "🍎", "🍇", "🍉", "🍈",
    "🥛", "🥚", "🧈", "🍞", "🥫", "🍚",
    "🍯", "🧂", "🌾", "🛢️", "🧃", "🛒",
  ],
  Things: [
    "📱", "💻", "🖥️", "⌚", "🎧", "📷",
    "🎮", "🖨️", "🔌", "💡", "🔑", "📚",
    "📖", "✏️", "🖊️", "📎", "🧾", "💼",
    "🎒", "👕", "👟", "🧥", "🧢", "👜",
    "🧴", "🧼", "🪒", "🧻", "🧹", "🧺",
    "🔧", "🔨", "🧰", "🎁", "🧸", "⚽",
  ],
};

export const DEFAULT_ITEM_EMOJI = "🛒";

export const DEFAULT_EMOJI_CATEGORY = "Food";

export const ITEM_NAME_PLACEHOLDER = "Item name";

export const ITEM_PRICE_PLACEHOLDER = "0.00";

export const MEMBER_NAME_PLACEHOLDER = "Member name";

export const INITIAL_MEMBERS = [
  { id: SELF_MEMBER_ID, name: "You", avatar: null, initial: "U" },
  { id: "sarah", name: "Sarah Miller", avatar: null, initial: "SM" },
  { id: "marcus", name: "Marcus Wong", avatar: null, initial: "MW" },
];

export const INITIAL_PRODUCTS = [
  { id: 1, emoji: "🌯", name: "C.Roll", price: 100.0 },
  { id: 2, emoji: "🍟", name: "Truffle Fries", price: 30.0 },
];

export const INITIAL_LEDGER_ITEMS = [
  { id: 1, memberId: "sarah", productId: 1, icon: "🌯", name: "C.Roll", qty: 2, price: `${CURRENCY_SYMBOL}200.00` },
  { id: 2, memberId: "marcus", productId: 2, icon: "🍟", name: "Truffle Fries", qty: 2, price: `${CURRENCY_SYMBOL}60.00` },

];
