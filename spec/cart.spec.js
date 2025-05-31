import "../test/setup.js"; // Import the test setup file
import { cart } from "../data/cart-class.js";

describe("Test Suite: Cart", () => {
  beforeEach(() => {
    cart.cartItems = []; // Clear the cart before each test
    cart.saveToStorage();
  });

  it("should add a new item to the cart", () => {
    const expected = [
      {
        productId: "product-1",
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];
    cart.addToCart("product-1");
    expect(cart.cartItems).toEqual(expected);
    expect(cart.cartItems.length).toBe(1);
    expect(cart.cartItems[0].productId).toBe("product-1");
    expect(cart.cartItems[0].quantity).toBe(1);
  });

  it("should increase the quantity of an existing item in the cart", () => {
    const expected = [
      {
        productId: "product-1",
        quantity: 2,
        deliveryOptionId: "1",
      },
    ];
    cart.addToCart("product-1");
    cart.addToCart("product-1");
    expect(cart.cartItems).toEqual(expected);
    expect(cart.cartItems.length).toBe(1);
    expect(cart.cartItems[0].productId).toBe("product-1");
    expect(cart.cartItems[0].quantity).toBe(2);
  });
});
