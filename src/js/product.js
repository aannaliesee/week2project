import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");

const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);

loadHeaderFooter();

product.init();


/*export function addProductToCart(product) {
  const products = getLocalStorage("so-cart") && [];
  products.push(product);
  setLocalStorage("so-cart", products);
  }



// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);*/
