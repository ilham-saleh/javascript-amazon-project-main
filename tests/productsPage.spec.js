import { test, expect } from "@playwright/test";

test("product page loads and cart updates", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/amazon.html");
  await page.click(".add-to-cart-button");
  await expect(page.locator(".js-cart-quantity")).toHaveCount(1);
});

// below is just examples how Playwright works

// test("product page adds multiple items to cart", async ({ page }) => {
//   await page.goto("http://127.0.0.1:5500/amazon.html");

//   // Add first product
//   await page.click(".add-to-cart-button");
//   await expect(page.locator(".js-cart-quantity")).toHaveText("1");

//   // Add second product
//   await page.click(".add-to-cart-button");
//   await expect(page.locator(".js-cart-quantity")).toHaveText("2");
// });

// test("link takes to cart page", async ({ page }) => {
//   await page.getByRole("link", { name: "Cart" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
// });
