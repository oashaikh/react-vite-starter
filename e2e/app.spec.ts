import { test, expect } from "@playwright/test";

test("app renders", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /react \+ vite starter/i })).toBeVisible();
});

test("counter increments and resets", async ({ page }) => {
  await page.goto("/");
  const count = page.getByTestId("count");

  await expect(count).toHaveText("0");
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await expect(count).toHaveText("2");

  await page.getByRole("button", { name: "reset" }).click();
  await expect(count).toHaveText("0");
});
