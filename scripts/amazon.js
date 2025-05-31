import { addToCart, totalCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

const productGrid = document.querySelector(".products-grid");
productGrid.innerHTML = ""; // Clear any hardcoded HTML first

products.forEach((product) => {
  const stars = Math.floor(product.rating.stars * 10); // 4.5 → 45, 4 → 40
  const price = formatCurrency(product.priceCents);

  const productHTML = `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}" alt="${
    product.name
  }" />
        </div>
  
        <div class="product-name limit-text-to-2-lines link-primary">
          ${product.name}
        </div>
  
        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getImageUrl()}.png" />
          <div class="product-rating-count link-primary">(${
            product.rating.count
          })</div>
        </div>
  
        <div class="product-price">$${price}</div>
  
        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
             ${[...Array(10)]
               .map(
                 (_, i) =>
                   `<option value="${i + 1}" ${i === 0 ? "selected" : ""}>${
                     i + 1
                   }</option>`
               )
               .join("")}
          </select>
        </div>

        ${product.displaySizeChartLink()}
  
        <div class="product-spacer"></div>
  
        <div class="added-to-cart">
          <img src="images/icons/checkmark.png" />
          Added
        </div>
  
        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${
          product.id
        }">Add to Cart</button>
      </div>
    `;

  productGrid.innerHTML += productHTML;

  updateCartQuantity();
});

function updateCartQuantity() {
  // let totalQuantity = 0;
  const totalQuantity = totalCartQuantity();

  document.querySelector(".js-cart-quantity").innerHTML = totalQuantity;
}

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", (event) => {
    const productId = button.dataset.productId;

    addToCart(productId);

    updateCartQuantity();
  });
});
