import { loadHeaderFooter, amountInCart } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
const checkout = new CheckoutProcess("so-cart", ".checkoutSummary");
checkout.init();
//amountInCart();
