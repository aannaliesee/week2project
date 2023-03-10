import { setLocalStorage, setAmount, getAmount } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails("main");
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
  addToCart() {
    const amountInCart = getAmount("amount") || [];
    amountInCart.push(this.product);
    setAmount("amount", amountInCart);
    const products = getLocalStorage("so-cart") || [];
    let itemCheck = 0;
    for (let i = 0; i<products.length; i++) {
      if (products[i].Id == this.product.Id) {
        let x = localStorage.getItem(this.product.Id);
        if (x<1) {
          x=2;
        }else {
          x++;
        }
        localStorage.setItem(this.product.Id, x);
        itemCheck++;
      }
    }
    if (itemCheck < 1){
      products.push(this.product);
      setLocalStorage("so-cart", products);
    }
    const backIcon = document.getElementById("backpackIcon");
    const growing = [
      { transform: "scale(1)" },
      { transform: "scale(2)" },
    ];
    const timing = {
      duration: 500,
      iterations: 3,
    };
    window.scrollTo(0, 0);
    backIcon.animate(growing, timing);
    setTimeout(() => {window.location.reload(); }, 1000);
  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}