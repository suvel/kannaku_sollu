/*
calculateTotal is used for calculating the total cost that a member has to pay. 
The function takes two arguments: expStr and products.

exapmle:
expStr = '1x🍎+2x🚬'
products = [
    {
        "id": "l1n5l9ap",
        "icon": "🍪",
        "prdName": "Butter Biscuit",
        "prdPrice": "10"
    },
    {
        "id": "l1n5l9aq",
        "icon": "🍎",
        "prdName": "Apple",
        "prdPrice": "20"
    },
    {
        "id": "l1n5l9ar",
        "icon": "🚬",
        "prdName": "Cigaret",
        "prdPrice": "18"
    },
]
*/

const calculateTotal = (expStr, products) => {
  const items = expStr.split("+");
  let sum = 0;

  items.forEach((item) => {
    const [qty, prd] = item.split("x");
    const prdCost = products.find((product) => product.icon == prd).prdPrice;
    sum = sum + qty * prdCost;
  });
  return sum;
};

export default calculateTotal;
