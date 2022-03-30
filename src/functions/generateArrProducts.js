import Product from "../entity/product";

const generateArrProducts = (prodArr) => {
  let newProds = [];

  prodArr.forEach((prod) => {
    const product = new Product(prod.prdName, prod.icon, prod.prdPrice);
    newProds.push(product.getProduct());
  });

  return newProds;
};

export default generateArrProducts;
