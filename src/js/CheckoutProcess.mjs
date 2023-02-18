import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.subtotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
      this.calculateOrdertotal();
    }
    calculateItemSummary() {
      // calculate and display the total amount of the items in the cart, and the number of items.
      const itemAmount = document.getElementById("quantity");
      itemAmount.innerHTML = this.list.length;
      let total = 0;
        for (let i = 0; i< this.list.length; i++) {
            total += this.list[i].FinalPrice;
        }
        const cartTotal = document.getElementById("cartTotal");
        this.subtotal = total;
        cartTotal.innerHTML = this.subtotal.toFixed(2);
    }
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      this.tax = this.subtotal * .06;
      for (let i=0; i < this.list.length; i++){
        if (i<1){
            this.shipping += 10;
        } else {
            this.shipping += 2;
        }
      }
      this.orderTotal = this.subtotal + this.tax + this.shipping;
      // display the totals.
      this.displayOrderTotals();
    }
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      document.getElementById("shipping").innerHTML = "$" + this.shipping;
      document.getElementById("tax").innerHTML = "$" + this.tax;
      document.getElementById("orderTotal").innerHTML = "$" + this.orderTotal;
    }
    
  }