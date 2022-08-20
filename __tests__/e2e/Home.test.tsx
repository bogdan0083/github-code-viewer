import { expect, test } from "@playwright/test";
import { waitForGraphqlResponse } from "../__utils__/utils";

// @TODO: Refactor using a Page Object Model pattern
// @see https://playwright.dev/docs/test-pom

test.describe.configure({ mode: "parallel" });

test("sender home page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/github code viewer/i);
});

test("render header", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("data-testid=header")).toBeVisible();
});

test("render footer", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("data-testid=footer")).toBeVisible();
});

test("render trending RepoListView", async ({ page }) => {
  await page.goto("/");
  const trendingLocator = await page
    .locator("data-testid=RepoListView")
    .first();

  await waitForGraphqlResponse(page);

  await expect(trendingLocator).toBeVisible();
  await expect(trendingLocator.locator("data-testid=RepoList")).toBeVisible();
  await expect(trendingLocator).toHaveText(/trending this week/i);
});

test("paginates trending RepoListView", async ({ page }) => {
  await page.goto("/");
  const trendingLocator = await page
    .locator("data-testid=RepoListView")
    .first();

  const loadMoreButtonLocator = trendingLocator.locator("button");

  await waitForGraphqlResponse(page);

  expect(
    await trendingLocator.locator("data-testid=RepoListItem").elementHandles()
  ).toHaveLength(10);

  await Promise.all([
    waitForGraphqlResponse(page),
    loadMoreButtonLocator.click(),
  ]);

  await page.waitForTimeout(1000);

  expect(
    await trendingLocator.locator("data-testid=RepoListItem").elementHandles()
  ).toHaveLength(20);

  await expect(loadMoreButtonLocator).toBeHidden();
});

test("changes trending RepoListView language", async ({ page }) => {
  await page.goto("/");

  const trendingLocator = await page
    .locator("data-testid=RepoListView")
    .first();

  let labelsLocator = await trendingLocator.locator(
    "data-testid=RepoListItem >> text=JavaScript"
  );

  const $langSelect = await trendingLocator.locator(
    "data-testid=LanguageSelect"
  );

  await Promise.all([
    waitForGraphqlResponse(page),
    $langSelect.selectOption("JavaScript"),
  ]);

  await page.waitForTimeout(1000);

  let labels = await labelsLocator.elementHandles();
  expect(labels).toHaveLength(10);
});
