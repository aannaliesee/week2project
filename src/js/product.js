import ExternalServices from "./ExternalServices.mjs";
import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { amountInCart } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ExternalServices("tents");

const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);

loadHeaderFooter();
//amountInCart();

product.init();



/*export function addProductToCart(product) {
  const products = getLocalStorage("so-cart") && [];
  products.push(product);
  setLocalStorage("so-cart", products);
  }



// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);*/


//==========================================//
  //Added by AM for product comment//
  //get comment from form with id 
const commentForm = document.querySelector("comment-form");

//add an event listener to comment form 
commentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // execute this function when the button is clicked

    //get cpmment test from form input

const commentTextInput = document.getElementById("#comment-text");
const commentText = commentTextInput.value.trim();

//create javascriipt object to represent comment 
const newComment = {
    text: commentText
};

// Check if there is any existing comment data stored in local storage
//const productId = ${productId};
  let comments = JSON.parse(localStorage.getItem(`product-${productId}-comments`));
  if (!comments) {
    comments = [];
  }

//add new comment object to array
comments.push(newComment);

//save updated array of comments to local storage
localStorage.setItem(`product-${productId}-comments`, JSON.stringify(comments));

  // Clear the comment form inputs ???
  commentTextInput.value = "";

displayComments();
});

//display comments on page 

function displayComments() {
    const commentsContainer = document.querySelector("#comments-container");

    //retrieve comment from local storage

    let comments = JSON.parse(localStorage.getItem(`product-${productId}-comments`));
    if (!comments){
        comments = [];
    }

    //html for each comment and ad it to comments
    let commentsHTML = "";
    for (const comment of comments){
        commentsHTML += `
        <div class="comment">
        <p>${comment.text}</p>
        </div>
        `;
    }
    commentsContainer.innerHTML = commentsHTML;
}

displayComments();