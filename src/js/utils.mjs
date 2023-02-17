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
  const products = getLocalStorage("so-cart") || [];
  const amount = products.length.toString();
  if (amount == 0) {
    document.querySelector(".cartAmount").innerHTML = "0";
  } else {
  document.querySelector(".cartAmount").innerHTML = amount;
  }
}