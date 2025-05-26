import "../test/setup.js"; // Import the test setup file
import { cart, addToCart } from "../data/cart.js";

describe("Test Suite: Cart", () => {
  beforeEach(() => {
    cart.length = 0; // Clear the cart before each test
  });

  it("should add a new item to the cart", () => {
    const expected = [
      {
        productId: "product-1",
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];
    addToCart("product-1");
    expect(cart).toEqual(expected);
    expect(cart.length).toBe(1);
    expect(cart[0].productId).toBe("product-1");
    expect(cart[0].quantity).toBe(1);
  });

  it("should increase the quantity of an existing item in the cart", () => {
    const expected = [
      {
        productId: "product-1",
        quantity: 2,
        deliveryOptionId: "1",
      },
    ];
    addToCart("product-1");
    addToCart("product-1");
    expect(cart).toEqual(expected);
    expect(cart.length).toBe(1);
    expect(cart[0].productId).toBe("product-1");
    expect(cart[0].quantity).toBe(2);
  });
});
