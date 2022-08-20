import { expect, test } from "@playwright/test";
import { waitForGraphqlResponse } from "../__utils__/utils";

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
    loadMoreButtonLocator.click(),
    page.waitForTimeout(600),
    waitForGraphqlResponse(page),
  ]);

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

  const $langSelect = await trendingLocator.locator(
    "data-testid=LanguageSelect"
  );

  await $langSelect.selectOption("JavaScript");
  await waitForGraphqlResponse(page);

  let labels = await trendingLocator
    .locator("data-testid=RepoListItem >> text=JavaScript")
    .elementHandles();

  await expect(labels).toHaveLength(10);
});
