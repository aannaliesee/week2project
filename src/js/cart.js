import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const shopCart = new ShoppingCart("so-cart", ".product-list");
shopCart.renderCartContents();

/*function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems === null) {
    let htmlItems = `<p class="no-items-error">Sorry. There are currently no items in the cart.</p>`;
    document.querySelector(".product-list").innerHTML = htmlItems;
  } else {
    document.getElementById("cart-total").style.display = "inline";
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].FinalPrice;
    }
    document.querySelector("#cart-total").innerHTML += total;
    let htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

*/
