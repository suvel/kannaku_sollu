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

  test("TopAppBar total should reflect the actual assigned ledger total, not a hardcoded placeholder", async ({ page }) => {
    await expect(page.getByTestId("total-assigned")).toHaveText("₹0.00");
    await expect(page.locator("header")).toContainText("TOTAL: ₹0.00");

    await page.getByTestId("assign-button").click();

    await expect(page.getByTestId("total-assigned")).toHaveText("₹10.00");
    await expect(page.locator("header")).toContainText("TOTAL: ₹10.00");
  });

  test("active member chip should show the member's real running total, not a hardcoded value", async ({ page }) => {
    await page.getByTestId("nav-tab-members").click();
    await page.getByTestId("add-member-button").click();
    await page.getByTestId("member-name-input").fill("Priya");
    await page.getByTestId("add-member-submit").click();
    await page.getByTestId("nav-tab-split").click();

    await page.getByTestId("assign-member-select").selectOption({ label: "Priya" });
    await page.getByTestId("assign-item-select").selectOption({ label: "🛒 Test Snack" });
    await page.getByTestId("assign-button").click();
    await expect(page.getByTestId("total-assigned")).toHaveText("₹10.00");

    const priyaChip = page.locator(".flex-shrink-0.w-32.p-3.rounded-xl", { hasText: "Priya" });
    await expect(priyaChip).toContainText("₹10.00");
  });

  test("quantity stepper floors at 0.5 and never goes below it", async ({ page }) => {
    const decrementBtn = page.locator("button:has-text('remove_circle')");
    const qtyDisplay = page.locator("span.font-data-mono.text-body-lg");

    await expect(qtyDisplay).toHaveText("1.0");
    await decrementBtn.click();
    await expect(qtyDisplay).toHaveText("0.5");
    await decrementBtn.click();
    await expect(qtyDisplay).toHaveText("0.5");
    await decrementBtn.click();
    await expect(qtyDisplay).toHaveText("0.5");
  });

  test("quantity increment has no upper bound, and the assign calculation stays correct at large multiples", async ({ page }) => {
    const incrementBtn = page.locator("button:has-text('add_circle')");
    const qtyDisplay = page.locator("span.font-data-mono.text-body-lg");

    for (let i = 0; i < 20; i++) {
      await incrementBtn.click();
    }
    await expect(qtyDisplay).toHaveText("11.0");

    await page.getByTestId("assign-button").click();
    await expect(page.getByTestId("total-assigned")).toHaveText("₹110.00");
  });

  test("assigning the same member+item twice merges quantity and price in the ledger", async ({ page }) => {
    const incrementBtn = page.locator("button:has-text('add_circle')");
    await incrementBtn.click();
    await page.getByTestId("assign-button").click();
    await expect(page.getByTestId("total-assigned")).toHaveText("₹15.00");

    await page.getByTestId("assign-button").click();
    await expect(page.getByTestId("total-assigned")).toHaveText("₹30.00");
  });
});
