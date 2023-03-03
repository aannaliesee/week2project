import { getAmount, setAmount, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const extService = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const theItems = items.map((item) => {
      console.log(item);
      return {
          id: item.Id,
          price: item.FinalPrice,
          name: item.Name,
          quantity: 1,
      };
  });
  return theItems;
}

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
      this.list = getAmount("amount");
      this.calculateItemSummary();
      this.calculateOrdertotal();
    }
    calculateItemSummary() {
      // calculate and display the total amount of the items in the cart, and the number of items.
      const itemAmount = document.getElementById("quantity");
      itemAmount.innerHTML = this.list.length;
      let total = 0;
        for (let i = 0; i < this.list.length; i++) {
            total += this.list[i].FinalPrice;
        }
        const cartTotal = document.getElementById("cartTotal");
        this.subtotal = total;
        cartTotal.innerHTML = this.subtotal.toFixed(2);
    }
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      this.tax = this.subtotal * .06;
      for (let i = 0; i < this.list.length; i++){
        if (i < 1){
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
      document.getElementById("tax").innerHTML = "$" + this.tax.toFixed(2);
      document.getElementById("orderTotal").innerHTML = "$" + this.orderTotal.toFixed(2);
    }
    async checkout() {
        const formElement = document.forms["checkout"];
        const json = formDataToJSON(formElement);
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        try {
            const res = await extService.checkout(json);
            console.log(res);
            for (let i = 0; i < this.list.length; i++){
                localStorage.setItem(this.list[i].Id, []);
            }
            setLocalStorage("so-cart", []);
            setAmount("amount", []);
            location.assign("../checkout/success.html");
        } catch (err) {
            removeAllAlerts();
            for (let message in err.message) {
                alertMessage(err.message[message]);
            }
            console.log(err);
        }
       
    }
}
