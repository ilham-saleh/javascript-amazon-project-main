class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;

    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [
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
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingProduct;

    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingProduct = item;
      }
    });

    if (matchingProduct) {
      matchingProduct.quantity++;
    } else {
      this.cartItems.push({
        productId,
        quantity: 1,
        deliveryOptionId: "1",
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = this.cartItems.filter(
      (cartItem) => cartItem.productId !== productId
    );

    this.cartItems = newCart;

    this.saveToStorage();
  }

  totalCartQuantity() {
    const totalQuantity = this.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    return totalQuantity;
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const matchingProduct = this.cartItems.find(
      (item) => item.productId === productId
    );

    matchingProduct.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}

export const cart = new Cart("cart");
// console.log(cart);

// const cartOOP = new Cart("cart-oop");
// const businessCart = new Cart("cart-business");

// console.log(businessCart);
// console.log(cartOOP);
