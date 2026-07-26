const { test, expect } = require("@playwright/test");
const { resetAppState } = require("./helpers");

test.describe("Summary edge cases: duplicate names & zero-assigned members", () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test("two members with identical names each retain their own distinct ledger total in Final Totals", async ({
    page,
  }) => {
    await page.getByTestId("nav-tab-members").click();
    await page.getByTestId("add-member-button").click();
    await page.getByTestId("member-name-input").fill("Priya");
    await page.getByTestId("add-member-submit").click();
    await page.getByTestId("add-member-button").click();
    await page.getByTestId("member-name-input").fill("Priya");
    await page.getByTestId("add-member-submit").click();
    await expect(page.locator('[data-testid^="member-card-"]')).toHaveCount(3); // self + 2x Priya

    await page.getByTestId("nav-tab-products").click();
    await page.getByTestId("add-item-button").click();
    await page.getByTestId("item-name-input").fill("Snack");
    await page.getByTestId("item-price-input").fill("10.00");
    await page.getByTestId("add-item-submit").click();
    await page.getByTestId("add-item-button").click();
    await page.getByTestId("item-name-input").fill("Drink");
    await page.getByTestId("item-price-input").fill("6.00");
    await page.getByTestId("add-item-submit").click();

    await page.getByTestId("nav-tab-split").click();
    const memberSelect = page.getByTestId("assign-member-select");
    const optionValues = await memberSelect
      .locator("option")
      .evaluateAll((opts) => opts.map((o) => ({ label: o.textContent, value: o.value })));
    const priyaValues = optionValues.filter((o) => o.label === "Priya").map((o) => o.value);
    expect(priyaValues.length).toBe(2); // both members named "Priya" are present in the select

    await memberSelect.selectOption(priyaValues[0]);
    await page.getByTestId("assign-item-select").selectOption({ label: "🛒 Snack" });
    await page.getByTestId("assign-button").click();

    await memberSelect.selectOption(priyaValues[1]);
    await page.getByTestId("assign-item-select").selectOption({ label: "🛒 Drink" });
    await page.getByTestId("assign-button").click();

    await page.getByTestId("finalize-fab").click();

    // Both rows currently render the identical label "Priya" with no distinguishing suffix/id.
    // The assertions below only verify the underlying amounts are correctly kept separate per
    // member id -- worth a manual/product review of whether the display should disambiguate them.
    const priyaRows = page.locator(".flex.justify-between.font-data-mono", { hasText: "Priya" });
    await expect(priyaRows).toHaveCount(2);
    await expect(priyaRows.nth(0)).toContainText("₹10.00");
    await expect(priyaRows.nth(1)).toContainText("₹6.00");
  });

  test("a member with zero assigned items is silently excluded from Final Totals and the share text", async ({
    page,
  }) => {
    await page.getByTestId("nav-tab-members").click();
    await page.getByTestId("add-member-button").click();
    await page.getByTestId("member-name-input").fill("GhostGuest");
    await page.getByTestId("add-member-submit").click();

    await page.getByTestId("nav-tab-products").click();
    await page.getByTestId("add-item-button").click();
    await page.getByTestId("item-name-input").fill("Snack");
    await page.getByTestId("item-price-input").fill("10.00");
    await page.getByTestId("add-item-submit").click();

    await page.getByTestId("nav-tab-split").click();
    await page.getByTestId("assign-button").click(); // assigns to self (default activeMember); GhostGuest gets nothing

    await page.getByTestId("finalize-fab").click();
    await expect(page.getByRole("heading", { name: "Ledger Finalized" })).toBeVisible();

    const finalTotals = page.locator("h3:has-text('Final Totals') ~ div").first();
    await expect(finalTotals).not.toContainText("GhostGuest");

    const whatsappLink = page.getByRole("link", { name: "WhatsApp" });
    const href = await whatsappLink.getAttribute("href");
    const decodedShareText = decodeURIComponent(href.split("text=")[1]);
    expect(decodedShareText).not.toContain("GhostGuest");
  });
});
