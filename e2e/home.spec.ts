import { expect, test } from "@playwright/test";

test("home page lets a runner choose a duration", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Ride into a story." }),
  ).toBeVisible();
  await expect(page.getByRole("radio", { name: /30 min/i })).toBeChecked();
  await page.getByRole("radio", { name: /20 min/i }).click();
  await expect(page.getByRole("radio", { name: /20 min/i })).toBeChecked();
  await expect(
    page.getByRole("button", { name: /start the story/i }),
  ).toBeVisible();
});
