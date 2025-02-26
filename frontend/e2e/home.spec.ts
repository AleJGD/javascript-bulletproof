import { test, expect } from "@playwright/test";

test("Home page should match screenshot", async ({ page }) => {
  await page.goto("http://localhost:5173");

  // Take and compare a screenshot
  expect(await page.screenshot()).toMatchSnapshot("home-page.png", {
    maxDiffPixels: 50,
  });
});
