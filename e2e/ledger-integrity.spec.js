const { test, expect } = require("@playwright/test");
const { resetAppState } = require("./helpers");

test.describe("Ledger integrity across member/product removal", () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test("removing a product with assigned ledger entries warns with the correct count and removes those entries", async ({
    page,
  }) => {
    await page.getByTestId("nav-tab-products").click();
    await page.getByTestId("add-item-button").click();
    await page.getByTestId("item-name-input").fill("Snack");
    await page.getByTestId("item-price-input").fill("10.00");
    await page.getByTestId("add-item-submit").click();

    await page.getByTestId("nav-tab-members").click();
    await page.getByTestId("add-member-button").click();
    await page.getByTestId("member-name-input").fill("Priya");
    await page.getByTestId("add-member-submit").click();

    await page.getByTestId("nav-tab-split").click();
    await page.getByTestId("assign-button").click(); // self -> ₹10
    await page.getByTestId("assign-member-select").selectOption({ label: "Priya" });
    await page.getByTestId("assign-button").click(); // Priya -> ₹10
    await expect(page.getByTestId("total-assigned")).toHaveText("₹20.00");

    await page.getByTestId("nav-tab-products").click();
    await page.locator('[data-testid^="remove-product-"]').click();
    await expect(page.getByTestId("confirm-dialog")).toContainText("2 ledger entries");
    await page.getByTestId("confirm-dialog-confirm").click();

    await page.getByTestId("nav-tab-split").click();
    await expect(page.getByTestId("total-assigned")).toHaveText("₹0.00");
    await expect(page.locator('[data-testid^="remove-ledger-item-"]')).toHaveCount(0);
  });

  test("removing a member with assigned ledger entries warns with the correct count and removes those entries", async ({
    page,
  }) => {
    await page.getByTestId("nav-tab-products").click();
    await page.getByTestId("add-item-button").click();
    await page.getByTestId("item-name-input").fill("Snack");
    await page.getByTestId("item-price-input").fill("10.00");
    await page.getByTestId("add-item-submit").click();

    await page.getByTestId("nav-tab-members").click();
    await page.getByTestId("add-member-button").click();
    await page.getByTestId("member-name-input").fill("Priya");
    await page.getByTestId("add-member-submit").click();

    await page.getByTestId("nav-tab-split").click();
    await page.getByTestId("assign-member-select").selectOption({ label: "Priya" });
    await page.getByTestId("assign-button").click();
    await expect(page.getByTestId("total-assigned")).toHaveText("₹10.00");

    await page.getByTestId("nav-tab-members").click();
    await page.locator('[data-testid^="remove-member-"]:not([disabled])').click();
    await expect(page.getByTestId("confirm-dialog")).toContainText("1 ledger entry");
    await page.getByTestId("confirm-dialog-confirm").click();

    await page.getByTestId("nav-tab-split").click();
    await expect(page.getByTestId("total-assigned")).toHaveText("₹0.00");
  });

  test("emptying the product list while more than one member exists leaves the member list and ledger state consistent", async ({
    page,
  }) => {
    await page.getByTestId("nav-tab-members").click();
    await page.getByTestId("add-member-button").click();
    await page.getByTestId("member-name-input").fill("Priya");
    await page.getByTestId("add-member-submit").click();
    await expect(page.locator('[data-testid^="member-card-"]')).toHaveCount(2);

    await page.getByTestId("nav-tab-products").click();
    await page.getByTestId("add-item-button").click();
    await page.getByTestId("item-name-input").fill("Snack");
    await page.getByTestId("item-price-input").fill("10.00");
    await page.getByTestId("add-item-submit").click();

    await page.getByTestId("nav-tab-split").click();
    await page.getByTestId("assign-button").click(); // self -> ₹10
    await expect(page.getByTestId("total-assigned")).toHaveText("₹10.00");

    await page.getByTestId("nav-tab-products").click();
    await page.locator('[data-testid^="remove-product-"]').click();
    await page.getByTestId("confirm-dialog-confirm").click();
    await expect(page.locator('[data-testid^="product-card-"]')).toHaveCount(0);

    await page.getByTestId("nav-tab-members").click();
    await expect(page.locator('[data-testid^="member-card-"]')).toHaveCount(2);
    await expect(page.getByText("Priya")).toBeVisible();

    await page.getByTestId("nav-tab-split").click();
    await expect(page.getByTestId("total-assigned")).toHaveText("₹0.00");
  });

  test("removing all non-self members while a product remains leaves the product list and the self member's ledger entry intact", async ({
    page,
  }) => {
    await page.getByTestId("nav-tab-members").click();
    await page.getByTestId("add-member-button").click();
    await page.getByTestId("member-name-input").fill("Priya");
    await page.getByTestId("add-member-submit").click();

    await page.getByTestId("nav-tab-products").click();
    await page.getByTestId("add-item-button").click();
    await page.getByTestId("item-name-input").fill("Snack");
    await page.getByTestId("item-price-input").fill("10.00");
    await page.getByTestId("add-item-submit").click();

    await page.getByTestId("nav-tab-split").click();
    await page.getByTestId("assign-button").click(); // self -> ₹10
    await expect(page.getByTestId("total-assigned")).toHaveText("₹10.00");

    await page.getByTestId("nav-tab-members").click();
    await page.locator('[data-testid^="remove-member-"]:not([disabled])').click();
    await page.getByTestId("confirm-dialog-confirm").click();
    await expect(page.locator('[data-testid^="member-card-"]')).toHaveCount(1); // members.length now 1

    await page.getByTestId("nav-tab-products").click();
    await expect(page.locator('[data-testid^="product-card-"]')).toHaveCount(1); // products.length still 1

    await page.getByTestId("nav-tab-split").click();
    await expect(page.getByTestId("total-assigned")).toHaveText("₹10.00"); // self's entry must survive
  });

  test("emptying both members and products together correctly clears the ledger", async ({
    page,
  }) => {
    await page.getByTestId("nav-tab-members").click();
    await page.getByTestId("add-member-button").click();
    await page.getByTestId("member-name-input").fill("Priya");
    await page.getByTestId("add-member-submit").click();

    await page.getByTestId("nav-tab-products").click();
    await page.getByTestId("add-item-button").click();
    await page.getByTestId("item-name-input").fill("Snack");
    await page.getByTestId("item-price-input").fill("10.00");
    await page.getByTestId("add-item-submit").click();

    await page.getByTestId("nav-tab-split").click();
    await page.getByTestId("assign-button").click();
    await expect(page.getByTestId("total-assigned")).toHaveText("₹10.00");

    await page.getByTestId("nav-tab-members").click();
    await page.locator('[data-testid^="remove-member-"]:not([disabled])').click();
    await page.getByTestId("confirm-dialog-confirm").click();

    await page.getByTestId("nav-tab-products").click();
    await page.locator('[data-testid^="remove-product-"]').click();
    await page.getByTestId("confirm-dialog-confirm").click();

    await page.getByTestId("nav-tab-split").click();
    await expect(page.getByTestId("total-assigned")).toHaveText("₹0.00");
    await expect(page.getByTestId("finalize-fab")).toBeDisabled();
  });
});
