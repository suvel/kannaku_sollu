const { test, expect } = require("@playwright/test");
const { resetAppState } = require("./helpers");

test.describe("Split / assign flow", () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);

    await page.getByTestId("nav-tab-products").click();
    await page.getByTestId("add-item-button").click();
    await page.getByTestId("item-name-input").fill("Test Snack");
    await page.getByTestId("item-price-input").fill("10.00");
    await page.getByTestId("add-item-submit").click();

    await page.getByTestId("nav-tab-split").click();
  });

  test("assigning an item updates the ledger and total assigned", async ({ page }) => {
    await expect(page.getByTestId("total-assigned")).toHaveText("₹0.00");

    // default quantity is 1.0, so 10.00 * 1.0 = 10.00
    await page.getByTestId("assign-button").click();

    await expect(page.getByTestId("total-assigned")).toHaveText("₹10.00");
    await expect(page.getByTestId("finalize-fab")).toBeEnabled();
  });

  test("removing a ledger item decreases total assigned back to zero", async ({ page }) => {
    await page.getByTestId("assign-button").click();
    await expect(page.getByTestId("total-assigned")).toHaveText("₹10.00");

    await page.getByText("Show more").click();
    await page.locator('[data-testid^="remove-ledger-item-"]').click();

    await expect(page.getByTestId("total-assigned")).toHaveText("₹0.00");
  });
});
