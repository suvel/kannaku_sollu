const { test, expect } = require("@playwright/test");
const { resetAppState } = require("./helpers");

test.describe("Products management", () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
    await page.getByTestId("nav-tab-products").click();
  });

  test("adding a product increases the product list", async ({ page }) => {
    await expect(page.locator('[data-testid^="product-card-"]')).toHaveCount(0);

    await page.getByTestId("add-item-button").click();
    await page.getByTestId("item-name-input").fill("Mango Lassi");
    await page.getByTestId("item-price-input").fill("6.50");
    await page.getByTestId("add-item-submit").click();

    await expect(page.locator('[data-testid^="product-card-"]')).toHaveCount(1);
    await expect(page.getByText("Mango Lassi")).toBeVisible();
  });

  test("removing a product decreases the product list", async ({ page }) => {
    await page.getByTestId("add-item-button").click();
    await page.getByTestId("item-name-input").fill("Mango Lassi");
    await page.getByTestId("item-price-input").fill("6.50");
    await page.getByTestId("add-item-submit").click();
    await expect(page.locator('[data-testid^="product-card-"]')).toHaveCount(1);

    await page.locator('[data-testid^="remove-product-"]').first().click();
    await page.getByTestId("confirm-dialog-confirm").click();

    await expect(page.locator('[data-testid^="product-card-"]')).toHaveCount(0);
  });

  test("cancelling the remove confirmation keeps the product", async ({ page }) => {
    await page.getByTestId("add-item-button").click();
    await page.getByTestId("item-name-input").fill("Mango Lassi");
    await page.getByTestId("item-price-input").fill("6.50");
    await page.getByTestId("add-item-submit").click();
    await expect(page.locator('[data-testid^="product-card-"]')).toHaveCount(1);

    await page.locator('[data-testid^="remove-product-"]').first().click();
    await expect(page.getByTestId("confirm-dialog")).toBeVisible();
    await page.getByTestId("confirm-dialog-cancel").click();

    await expect(page.locator('[data-testid^="product-card-"]')).toHaveCount(1);
  });
});
