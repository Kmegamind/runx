import { expect, test } from "@playwright/test";

test("home page lets a runner choose a duration and start", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Run your way." }),
  ).toBeVisible();
  await expect(page.getByRole("radio", { name: "30 MIN" })).toBeChecked();

  await page.getByRole("radio", { name: "45 MIN" }).click();
  await page.getByRole("button", { name: "Start my run" }).click();

  await expect(page.getByText("45 minute run started")).toBeVisible();
});
