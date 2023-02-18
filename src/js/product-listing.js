import { loadHeaderFooter, getParam, amountInCart } from "./utils.mjs";

import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();
//amountInCart();
const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const list = new ProductList(category, dataSource, element);



list.init();

