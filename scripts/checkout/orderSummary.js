import {
  cart,
  removeFromCart,
  saveToStorage,
  updateDeliveryOption,
  totalCartQuantity,
} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import renderPaymentSummary from "./paymentSummary.js";

const totalQuantityHeader = document.querySelector(
  ".checkout-header-middle-section"
);

export default function renderorderSummary() {
  const orderSummaryContainer = document.querySelector(".order-summary");
  orderSummaryContainer.innerHTML = "";

  function deliveryDateDayJS(option) {
    let today = dayjs();
    let deliveryDate = today.add(option.deliveryDay, "day");

    // Skip weekends: If delivery lands on Saturday or Sunday, shift to Monday
    while (
      deliveryDate.format("dddd") === "Saturday" ||
      deliveryDate.format("dddd") === "Sunday"
    ) {
      deliveryDate = deliveryDate.add(1, "day");
    }

    const formattedDate = deliveryDate.format("dddd, MMMM, D");

    return formattedDate;
  }

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    const deliveryDate = deliveryDateDayJS(deliveryOption);

    let html = `
              <div class="cart-item-container cart-item-container-${
                matchingProduct.id
              }">
            <div class="delivery-date">Delivery date: ${deliveryDate}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">$${formatCurrency(
                  matchingProduct.priceCents
                )}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label js-quantity-label-${
                    matchingProduct.id
                  }">${cartItem.quantity}</span> </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${
                    matchingProduct.id
                  }">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delet-link" data-product-id="${
                    matchingProduct.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryoptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
  `;
    orderSummaryContainer.innerHTML += html;
  });

  document.querySelectorAll(".js-delet-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      removeFromCart(productId);

      const container = document.querySelector(
        `.cart-item-container-${productId}`
      );
      container.remove();
      updateCartQuantityHeader();
      renderPaymentSummary();
    });
  });

  function updateCartQuantityHeader() {
    const totalQuantity = totalCartQuantity();
    totalQuantityHeader.innerHTML = `Checkout (<a href="checkout.html">${totalQuantity} Item${
      totalQuantity !== 1 ? "s" : ""
    }</a>)`;
  }

  updateCartQuantityHeader();

  const quantityUpdateLink = document.querySelectorAll(
    ".js-update-quantity-link"
  );
  quantityUpdateLink.forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      const updateQuantitySpan = document.querySelector(
        `.js-quantity-label-${productId}`
      );

      if (link.innerText.toLowerCase() === "save") {
        const input = updateQuantitySpan.querySelector("input");
        const newQuantity = Number(input.value);

        const matchingItem = cart.find((item) => item.productId === productId);
        if (matchingItem && newQuantity > 0) {
          matchingItem.quantity = newQuantity;
        }
        saveToStorage();

        updateQuantitySpan.innerHTML = newQuantity;
        link.innerHTML = "Update";

        updateCartQuantityHeader();
        renderPaymentSummary();
      } else {
        const currentQuantity = updateQuantitySpan.innerText;
        updateQuantitySpan.innerHTML = "";

        const input = document.createElement("input");
        input.setAttribute("type", "number");
        input.classList.add("update-quantity-input");
        input.value = currentQuantity;

        updateQuantitySpan.appendChild(input);
        link.innerHTML = "Save";
      }
    });
  });

  function deliveryoptionsHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((option) => {
      const deliveryDate = deliveryDateDayJS(option);

      const priceString =
        option.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(option.priceCents)} -`;

      const isChecked = option.id === cartItem.deliveryOptionId;

      html += `
  <div class="delivery-option">
    <input
      type="radio"
      ${isChecked ? "checked" : ""}
      class="delivery-option-input js-delivery-radio"
      name="delivery-option-${matchingProduct.id}"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${option.id}"
    />
    <div>
      <div class="delivery-option-date">${deliveryDate}</div>
      <div class="delivery-option-price">${priceString} Shipping</div>
    </div>
  </div>
`;
    });

    return html;
  }

  document.querySelectorAll(".js-delivery-radio").forEach((input) => {
    input.addEventListener("change", () => {
      const { productId, deliveryOptionId } = input.dataset;
      updateDeliveryOption(productId, deliveryOptionId);

      renderorderSummary();
      renderPaymentSummary();
    });
  });
}
