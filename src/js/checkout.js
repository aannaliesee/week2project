import { loadHeaderFooter, amountInCart } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
const checkout = new CheckoutProcess("so-cart", ".checkoutSummary");
checkout.init();
amountInCart();
document.querySelector("#checkoutButton").addEventListener("click", (e) => {
    e.preventDefault();
    var myForm = document.forms[0];
    var chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if(chk_status)
    checkout.checkout();
});
