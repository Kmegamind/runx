import { expect, test } from "@playwright/test";

test("home page loads and shows the RunX heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "RunX" })).toBeVisible();
});
