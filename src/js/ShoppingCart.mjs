import { getLocalStorage, setLocalStorage, getAmount, setAmount } from "./utils.mjs";

function cartItemTemplate(item) {
  let qty = localStorage.getItem(item.Id) || 1;
  let price = 0;
  let button = "X";
  if (qty<2){
    price = item.FinalPrice;
  }else {
    price = (item.FinalPrice * qty).toFixed(2);
    button = "-";
  }
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image || item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <button class="removeFromCart" data-id="${item.Id}">${button}</button>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${qty}</p>
  <p class="cart-card__price">$${price}</p>
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
    let itemCount = localStorage.getItem(dataId) || 1;
    if (itemCount < 2) {
      const products = getLocalStorage("so-cart");
      for (let i = 0; i < products.length; i++){
        if (products[i].Id === dataId){
            products.splice(i,1);
            break;
        }
      }
      setLocalStorage("so-cart", products);
    }
      const theProducts = getAmount("amount");
    for (let i = 0; i < theProducts.length; i++){
        if (theProducts[i].Id === dataId){
            theProducts.splice(i,1);
            break;
        }
    }
      setAmount("amount", theProducts);
      itemCount--;
      localStorage.setItem(dataId, itemCount);
    
    
this.renderCartContents();
window.location.reload();
}

  

  renderCartContents() {
    const cartAmount = getAmount("amount");
    const cartItems = getLocalStorage(this.key);
    if (cartItems === null || cartItems.length < 1) {
        let htmlItems = "<p class='no-items-error'>Sorry. There are currently no items in the cart.</p>";
        document.querySelector(this.parentSelector).innerHTML = htmlItems;
    } else {
        document.getElementById("cart-total").style.display = "inline";
        let total = 0;
        for (let i = 0; i< cartAmount.length; i++) {
            total += cartAmount[i].FinalPrice;
        }
        document.querySelector("#cart-total").innerHTML += total.toFixed(2);
        let htmlItems = cartItems.map((item) => cartItemTemplate(item));
        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    }
    }
}