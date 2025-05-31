import { type } from "os";
import { Product } from "../data/products.js";

describe("Test suite: Products", () => {
  beforeEach(() => {
    console.log("Before each test");
  });

  it("should create a new products data", () => {
    const expected = {
      id: "product-1",
      name: "Test Product",
      image: "test-image.jpg",
      priceCents: 1000,
      rating: { stars: 4.5, count: 100 },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
      type: "clothing",
      sizeChartLink: "https://example.com/size-chart",
    };

    const product = new Product(expected);
    expect(product.id).toEqual(expected.id);
    expect(product.name).toEqual(expected.name);
    expect(product.keywords).toEqual(expected.keywords);
    expect(product.sizeChartLink).toEqual(expected.sizeChartLink);
  });
});
