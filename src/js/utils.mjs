// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}


export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback) { parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path){
  let response = await fetch(path);
  let text = await response.text();
  return text;
}

export async function loadHeaderFooter() {
  let header_temp = await loadTemplate("/partials/header.html");
  let header_id = document.getElementById("main-header");

  let footer_temp = await loadTemplate("/partials/footer.html");
  let footer_id = document.getElementById("main-footer");

  renderWithTemplate(header_temp, header_id);
  renderWithTemplate(footer_temp, footer_id);
}

export function amountInCart() {
  //const products = getLocalStorage("so-cart") || [];
  const products = getAmount("amount") || [];
  const amount = products.length;
  const header = document.getElementById("cartAmount");
  header.innerHTML = amount;
}

export function getAmount(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setAmount(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  if (scroll) window.scrollTo(0, 0);

}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}