import { expect, test } from "@playwright/test";
import { waitForGraphqlResponse } from "../__utils__/utils";

test.describe.configure({ mode: "parallel" });

test("renders search form", async ({ page }) => {
  await page.goto("/");

  let searchInputLocator = await page.locator(
    "data-testid=SearchForm >> data-testid=SearchInput"
  );

  await expect(page.locator("data-testid=SearchForm")).toBeVisible();
  await expect(
    page.locator("data-testid=SearchForm >> button[type=submit]")
  ).toBeDisabled();
  await expect(searchInputLocator).toBeVisible();
  await expect(searchInputLocator).toBeEmpty();

  await searchInputLocator.type("react", { delay: 100 });
  await expect(searchInputLocator).toHaveValue("react");
});

test("types in search form and renders search results", async ({page}) => {
  await page.goto("/");

  let submitButtonLocator = await page.locator(
    "data-testid=SearchForm >> button[type=submit]"
  );
  let searchInputLocator = await page.locator(
    "data-testid=SearchForm >> data-testid=SearchInput"
  );

  let searchResultsLocator = await page.locator(
    "data-testid=SearchForm >> data-testid=SearchResultsItem"
  );

  await Promise.all([
    waitForGraphqlResponse(page),
    searchInputLocator.type("react"),
  ]);

  await page.waitForTimeout(1000);

  await expect(searchInputLocator).toHaveValue("react");
  await expect(await searchResultsLocator.elementHandles()).toHaveLength(5);
  await expect(submitButtonLocator).toBeEnabled();
});

test("types in search form, click submit button and navigates to search page", async ({
                                                                                        page,
                                                                                      }) => {
  await page.goto("/");

  let submitButtonLocator = await page.locator(
    "data-testid=SearchForm >> button[type=submit]"
  );

  let searchInputLocator = await page.locator(
    "data-testid=SearchForm >> data-testid=SearchInput"
  );

  await Promise.all([
    waitForGraphqlResponse(page),
    searchInputLocator.type("react", {delay: 100}),
  ]);

  await page.waitForTimeout(1000);

  await Promise.all([
    page.waitForNavigation({waitUntil: "networkidle"}),
    submitButtonLocator.click(),
  ]);

  await expect(page.url()).toMatch(/\/search\?q=react/);
});

test("types in search form, clicks search result item and navigates to repo page", async ({
                                                                                            page,
                                                                                          }) => {
  await page.goto("/");

  let searchInputLocator = await page.locator(
    "data-testid=SearchForm >> data-testid=SearchInput"
  );

  let searchResultsLocator = await page.locator(
    "data-testid=SearchForm >> data-testid=SearchResultsItem"
  );

  await Promise.all([
    waitForGraphqlResponse(page),
    searchInputLocator.type("react", {delay: 100}),
  ]);

  await page.waitForTimeout(1000);

  await Promise.all([
    page.waitForNavigation({waitUntil: "networkidle"}),
    searchResultsLocator.first().click(),
  ]);

  await expect(page.url()).toMatch(/\/blob\/master\/README\.md/);
});
