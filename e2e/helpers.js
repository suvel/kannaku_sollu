const { expect } = require("@playwright/test");

/**
 * Removes all products and all members except "self", then verifies on the
 * Split page that Total Assigned is ₹0.00 and Summary navigation is disabled.
 * Run before each major test case per the app's reset precondition.
 */
async function resetAppState(page) {
  await page.goto("/");
  const removeProductButtons = page.locator('[data-testid^="remove-product-"]');
  while ((await removeProductButtons.count()) > 0) {
    await removeProductButtons.first().click();
    await page.getByTestId("confirm-dialog-confirm").click();
  }
  await expect(page.locator('[data-testid^="product-card-"]')).toHaveCount(0);

  await page.getByTestId("nav-tab-members").click();
  const removeMemberButtons = page.locator('[data-testid^="remove-member-"]:not([disabled])');
  while ((await removeMemberButtons.count()) > 0) {
    await removeMemberButtons.first().click();
    await page.getByTestId("confirm-dialog-confirm").click();
  }
  await expect(page.locator('[data-testid^="member-card-"]')).toHaveCount(1);

  await page.getByTestId("nav-tab-split").click();
  await expect(page.getByTestId("total-assigned")).toHaveText("₹0.00");
  await expect(page.getByTestId("finalize-fab")).toBeDisabled();
  await expect(page.getByTestId("nav-tab-summary")).toHaveAttribute("aria-disabled", "true");
}

module.exports = { resetAppState };
