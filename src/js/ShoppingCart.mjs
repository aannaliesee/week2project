import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image || item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <button class="removeFromCart" data-id="${item.Id}">X</button>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  async init() {
        const itemsToDelete = document.querySelectorAll(".removeFromCart");
        for (let i = 0; i < itemsToDelete.length; i++){
            itemsToDelete[i].addEventListener("click", this.removeFromcart.bind(this));
        }
    
    //document.getElementById("removeFromCart").addEventListener("click", this.removeFromcart.bind(this));
    }
  
  removeFromcart(e) {
    const dataId = e.currentTarget.dataset.id;
    const products = getLocalStorage("so-cart");
    for (let i = 0; i < products.length; i++){
        if (products[i].Id === dataId){
            products.splice(i,1);
            break;
        }
    }
setLocalStorage("so-cart", products);
this.renderCartContents();
window.location.reload();
}

  

  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    if (cartItems === null || cartItems.length < 1) {
        let htmlItems = "<p class='no-items-error'>Sorry. There are currently no items in the cart.</p>";
        document.querySelector(this.parentSelector).innerHTML = htmlItems;
    } else {
        document.getElementById("cart-total").style.display = "inline";
        let total = 0;
        for (let i = 0; i< cartItems.length; i++) {
            total += cartItems[i].FinalPrice;
        }
        total.toFixed(2);
        document.querySelector("#cart-total").innerHTML += total;
        let htmlItems = cartItems.map((item) => cartItemTemplate(item));
        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    }
    }
}