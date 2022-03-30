import getUniquieId from "../functions/getUniqueId";

class Product {
  constructor(prdName, icon, prdPrice) {
    this.icon = icon;
    this.prdName = prdName;
    this.prdPrice = prdPrice;
  }
  getProduct() {
    return {
      id: getUniquieId(),
      icon: this.icon,
      prdName: this.prdName,
      prdPrice: this.prdPrice,
    };
  }
}

export default Product;
