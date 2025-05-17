export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

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
    });
  }
}

export function removeFromCart(productId) {
  const newCart = cart.filter((cartItem) => cartItem.productId !== productId);

  cart = newCart;
}
