const { test, expect } = require("@playwright/test");
const { resetAppState } = require("./helpers");

test.describe("Summary gating & full happy path", () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test("Summary is unreachable at reset state and direct navigation redirects away", async ({
    page,
  }) => {
    await expect(page.getByTestId("nav-tab-summary")).toHaveAttribute("aria-disabled", "true");
    await expect(page.getByTestId("finalize-fab")).toBeDisabled();

    await page.goto("/#/summary");

    await expect(page.getByRole("heading", { name: "Inventory List" })).toBeVisible();
  });

  test("adding a single product makes Summary reachable (self member alone is enough)", async ({
    page,
  }) => {
    await page.getByTestId("nav-tab-products").click();
    await page.getByTestId("add-item-button").click();
    await page.getByTestId("item-name-input").fill("Test Snack");
    await page.getByTestId("item-price-input").fill("10.00");
    await page.getByTestId("add-item-submit").click();

    await expect(page.getByTestId("nav-tab-summary")).not.toHaveAttribute(
      "aria-disabled",
      "true"
    );

    await page.getByTestId("nav-tab-split").click();
    await expect(page.getByTestId("finalize-fab")).toBeEnabled();
  });

  test("full walkthrough: add members/products, assign items, verify summary totals", async ({
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
    await page.getByTestId("add-item-button").click();
    await page.getByTestId("item-name-input").fill("Drink");
    await page.getByTestId("item-price-input").fill("5.00");
    await page.getByTestId("add-item-submit").click();

    await page.getByTestId("nav-tab-split").click();

    // Snack (₹10.00) to self "You" at default qty 1.0 => ₹10.00
    await page.getByTestId("assign-member-select").selectOption({ label: "You" });
    await page.getByTestId("assign-item-select").selectOption({ label: "🛒 Snack" });
    await page.getByTestId("assign-button").click();

    // Drink (₹5.00) to Priya at default qty 1.0 => ₹5.00
    await page.getByTestId("assign-member-select").selectOption({ label: "Priya" });
    await page.getByTestId("assign-item-select").selectOption({ label: "🛒 Drink" });
    await page.getByTestId("assign-button").click();

    await expect(page.getByTestId("total-assigned")).toHaveText("₹15.00");

    await page.getByTestId("finalize-fab").click();

    await expect(page.getByRole("heading", { name: "Ledger Finalized" })).toBeVisible();
    const finalTotals = page.locator("h3:has-text('Final Totals') ~ div").first();
    await expect(finalTotals).toContainText("You");
    await expect(finalTotals).toContainText("₹10.00");
    await expect(finalTotals).toContainText("Priya");
    await expect(finalTotals).toContainText("₹5.00");
  });

  test("Copy button copies the share text to clipboard and flips to a Copied state", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    await page.getByTestId("nav-tab-products").click();
    await page.getByTestId("add-item-button").click();
    await page.getByTestId("item-name-input").fill("Snack");
    await page.getByTestId("item-price-input").fill("10.00");
    await page.getByTestId("add-item-submit").click();

    await page.getByTestId("nav-tab-split").click();
    await page.getByTestId("assign-button").click();
    await page.getByTestId("finalize-fab").click();

    // accessible name is "content_copy Copy" (icon ligature text + label), so match by substring
    const copyButton = page.getByRole("button", { name: "Copy" });
    await copyButton.click();
    await expect(page.getByRole("button", { name: "Copied!" })).toBeVisible();

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain("🧾 Split Summary");
    expect(clipboardText).toContain("Total: ₹10.00");
  });

  test("WhatsApp share link href is correctly percent-encoded", async ({ page }) => {
    await page.getByTestId("nav-tab-members").click();
    await page.getByTestId("add-member-button").click();
    await page.getByTestId("member-name-input").fill("Anu & Ravi");
    await page.getByTestId("add-member-submit").click();

    await page.getByTestId("nav-tab-products").click();
    await page.getByTestId("add-item-button").click();
    await page.getByTestId("item-name-input").fill("Snack");
    await page.getByTestId("item-price-input").fill("10.00");
    await page.getByTestId("add-item-submit").click();

    await page.getByTestId("nav-tab-split").click();
    await page.getByTestId("assign-member-select").selectOption({ label: "Anu & Ravi" });
    await page.getByTestId("assign-button").click();
    await page.getByTestId("finalize-fab").click();

    const whatsappLink = page.getByRole("link", { name: "WhatsApp" });
    const href = await whatsappLink.getAttribute("href");
    expect(href).toMatch(/^https:\/\/wa\.me\/\?text=/);

    const rawParam = href.split("text=")[1];
    expect(rawParam).not.toContain("&"); // must be percent-encoded, not a raw query-breaking "&"
    expect(decodeURIComponent(rawParam)).toContain("Anu & Ravi");
  });
});
