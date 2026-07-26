const { test, expect } = require("@playwright/test");
const { resetAppState } = require("./helpers");

test.describe("Members management", () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
    await page.getByTestId("nav-tab-members").click();
  });

  test("self member cannot be removed", async ({ page }) => {
    await expect(page.getByTestId("member-card-self")).toBeVisible();
    await expect(page.getByTestId("remove-member-self")).toBeDisabled();
  });

  test("adding a member increases the member list", async ({ page }) => {
    await expect(page.locator('[data-testid^="member-card-"]')).toHaveCount(1);

    await page.getByTestId("add-member-button").click();
    await page.getByTestId("member-name-input").fill("Priya Shah");
    await page.getByTestId("add-member-submit").click();

    await expect(page.locator('[data-testid^="member-card-"]')).toHaveCount(2);
    await expect(page.getByText("Priya Shah")).toBeVisible();
  });

  test("removing a non-self member decreases the member list", async ({ page }) => {
    await page.getByTestId("add-member-button").click();
    await page.getByTestId("member-name-input").fill("Priya Shah");
    await page.getByTestId("add-member-submit").click();
    await expect(page.locator('[data-testid^="member-card-"]')).toHaveCount(2);

    const removeButton = page.locator('[data-testid^="remove-member-"]:not([disabled])');
    await removeButton.click();
    await page.getByTestId("confirm-dialog-confirm").click();

    await expect(page.locator('[data-testid^="member-card-"]')).toHaveCount(1);
    await expect(page.getByText("Priya Shah")).toHaveCount(0);
  });

  test("cancelling the remove confirmation keeps the member", async ({ page }) => {
    await page.getByTestId("add-member-button").click();
    await page.getByTestId("member-name-input").fill("Priya Shah");
    await page.getByTestId("add-member-submit").click();
    await expect(page.locator('[data-testid^="member-card-"]')).toHaveCount(2);

    const removeButton = page.locator('[data-testid^="remove-member-"]:not([disabled])');
    await removeButton.click();
    await expect(page.getByTestId("confirm-dialog")).toBeVisible();
    await page.getByTestId("confirm-dialog-cancel").click();

    await expect(page.locator('[data-testid^="member-card-"]')).toHaveCount(2);
    await expect(page.getByText("Priya Shah")).toBeVisible();
  });
});
