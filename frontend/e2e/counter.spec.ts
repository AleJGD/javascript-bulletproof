import { test, expect } from "@playwright/test";

test("should increment counter when button is clicked", async ({ page }) => {
  await page.goto("http://localhost:5173"); // Adjust port if needed

  const counter = page.locator('[data-testid="counter"]');
  const button = page.locator("button");

  await expect(counter).toHaveText("Counter: 0");

  await button.click();
  await button.click();

  await expect(counter).toHaveText("Counter: 2");
});
