export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: "1",
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: "2",
  },
];

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingProduct;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingProduct = item;
    }
  });

  if (matchingProduct) {
    matchingProduct.quantity++;
  } else {
    cart.push({
      productId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = cart.filter((cartItem) => cartItem.productId !== productId);

  cart = newCart;

  saveToStorage();
}

export function totalCartQuantity() {
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return totalQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const matchingProduct = cart.find((item) => item.productId === productId);

  matchingProduct.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
