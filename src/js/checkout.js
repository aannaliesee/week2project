import { loadHeaderFooter, amountInCart } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
const checkout = new CheckoutProcess("so-cart", ".checkoutSummary");
checkout.init();
//amountInCart();
document.querySelector("#checkoutButton").addEventListener("click", (e) => {
    e.preventDefault();
    checkout.checkout();
})
