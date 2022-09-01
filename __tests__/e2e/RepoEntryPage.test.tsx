import { expect, test } from "@playwright/test";
import { parseEntryNames, waitForGraphqlResponse } from "../__utils__/utils";
import { getTreeEntries } from "../__fixtures__/treeEntry";

test.describe.configure({ mode: "parallel" });

let ROOT_ENTRY_URL = "/hello/world/tree/master";
let ROOT_ENTRY_URL_WITH_README = "/hello/world/blob/master/README.md";

const SIDE_REPO_ENTRIES_SELECTOR =
  "data-testid=RepoSideView >> data-testid=RepoEntry";
const MAIN_REPO_ENTRIES_SELECTOR =
  "data-testid=RepoDirectoryView >> data-testid=RepoEntry";

test("shows 404 page when path is not found", async ({ page }) => {
  await page.goto("/not-found");
  await expect(page).toHaveTitle(/404/i);
});

test("renders RepoEntryPage", async ({ page }) => {
  await page.goto(ROOT_ENTRY_URL);
  await expect(page).toHaveTitle(/hello\/world/i);
});

test("renders with the same entries on both sides", async ({ page }) => {
  await page.goto(ROOT_ENTRY_URL, { waitUntil: "networkidle" });

  const resultSideEntryNames = await parseEntryNames(
    page,
    SIDE_REPO_ENTRIES_SELECTOR
  );
  const resultMainEntryNames = await parseEntryNames(
    page,
    MAIN_REPO_ENTRIES_SELECTOR
  );

  const expectedEntryNames = getTreeEntries("/").map((entry) => entry.name);

  expect(resultSideEntryNames).toEqual(resultMainEntryNames);
  expect(resultSideEntryNames).toEqual(expectedEntryNames);
  expect(resultMainEntryNames).toEqual(expectedEntryNames);
});

test("renders with different entries on both sides", async ({ page }) => {
  await page.goto(ROOT_ENTRY_URL + "/src", { waitUntil: "networkidle" });

  const resultSideEntryNames = await parseEntryNames(
    page,
    SIDE_REPO_ENTRIES_SELECTOR
  );
  const resultMainEntryNames = await parseEntryNames(
    page,
    MAIN_REPO_ENTRIES_SELECTOR
  );

  const expectedSideEntryNames = getTreeEntries("/").map((entry) => entry.name);
  const expectedMainEntryNames = getTreeEntries("src").map(
    (entry) => entry.name
  );

  await expect(resultSideEntryNames).toEqual(expectedSideEntryNames);
  await expect(resultMainEntryNames).toEqual(expectedMainEntryNames);
});

test("shows 'back' folder button", async ({ page }) => {
  await page.goto(ROOT_ENTRY_URL + "/src/core", { waitUntil: "networkidle" });

  await expect(
    await page.locator("data-testid=RepoSideView >> text='..'")
  ).toBeVisible();
});

test("returns to root after 'back' button click", async ({ page }) => {
  await page.goto(ROOT_ENTRY_URL + "/src/core", { waitUntil: "networkidle" });

  const resultSideEntryNamesBeforeClick = await parseEntryNames(
    page,
    SIDE_REPO_ENTRIES_SELECTOR
  );

  const resultMainEntryNamesBeforeClick = await parseEntryNames(
    page,
    MAIN_REPO_ENTRIES_SELECTOR
  );

  const expectedSideEntryNamesBeforeClick = getTreeEntries("src").map(
    (entry) => entry.name
  );
  const expectedMainEntryNamesBeforeClick = getTreeEntries("src/core").map(
    (entry) => entry.name
  );

  expect(resultSideEntryNamesBeforeClick).toEqual(
    expectedSideEntryNamesBeforeClick
  );
  expect(resultMainEntryNamesBeforeClick).toEqual(
    expectedMainEntryNamesBeforeClick
  );

  await Promise.all([
    page.waitForTimeout(1000),
    waitForGraphqlResponse(page),
    page.locator("data-testid=RepoSideView >> text='..'").click(),
  ]);

  const resultSideEntryNamesAfterClick = await parseEntryNames(
    page,
    SIDE_REPO_ENTRIES_SELECTOR
  );

  const resultMainEntryNamesAfterClick = await parseEntryNames(
    page,
    MAIN_REPO_ENTRIES_SELECTOR
  );

  const expectedEntryNamesAfterClick = getTreeEntries("/").map(
    (entry) => entry.name
  );

  expect(resultSideEntryNamesAfterClick).toEqual(expectedEntryNamesAfterClick);
  expect(resultMainEntryNamesAfterClick).toEqual(expectedEntryNamesAfterClick);
});

test("renders file views", async ({ page }) => {
  await page.goto(ROOT_ENTRY_URL_WITH_README, { waitUntil: "networkidle" });
  const markdownPreviewHeadingLocator = page.locator(
    'data-testid=MarkdownPreview >> h2:has-text("This Repo is For Vue 2")'
  );
  const markdownToggleButtonLocator = page.locator(
    "data-testid=MarkdownTogglePreviewButton"
  );
  const rawMarkdownHighlightLocator = page
    .locator("data-testid=RepoFileView >> css=.hljs-tag")
    .first();

  // wait for markdown preview to be sanitized and parsed.
  await page.waitForTimeout(300);

  const firstResultSideEntryNames = await parseEntryNames(
    page,
    SIDE_REPO_ENTRIES_SELECTOR
  );

  const firstExpectedEntryNames = getTreeEntries("/").map(
    (entry) => entry.name
  );

  await expect(markdownPreviewHeadingLocator).toBeVisible();

  // Let's toggle markdown preview to see raw md file
  await markdownToggleButtonLocator.click();
  await page.waitForTimeout(100);

  await expect(rawMarkdownHighlightLocator).toBeVisible();

  await expect(markdownPreviewHeadingLocator).toBeHidden();

  expect(firstResultSideEntryNames).toEqual(firstExpectedEntryNames);

  // Toggle markdown back to preview
  await markdownToggleButtonLocator.click();
  await page.waitForTimeout(100);

  await expect(rawMarkdownHighlightLocator).toBeHidden();

  await expect(markdownPreviewHeadingLocator).toBeVisible();

  // Click multiple entries down the tree and wait for response
  await Promise.all([
    waitForGraphqlResponse(page),
    page.locator("data-testid=RepoSideView >> text='src'").click(),
  ]);

  await Promise.all([
    waitForGraphqlResponse(page),
    page.locator("data-testid=RepoDirectoryView >> text='core'").click(),
  ]);

  await Promise.all([
    waitForGraphqlResponse(page),
    page.locator("data-testid=RepoDirectoryView >> text='vdom'").click(),
  ]);

  await Promise.all([
    waitForGraphqlResponse(page),
    page
      .locator("data-testid=RepoDirectoryView >> text='create-element.ts'")
      .click(),
  ]);

  await expect(
    page
      .locator("data-testid=RepoFileView >> css=.hljs-keyword")
      .first()
  ).toBeVisible();
});

test("renders github link", async ({ page }) => {
  await page.goto(ROOT_ENTRY_URL + "/src/core", { waitUntil: "networkidle" });

  await expect(
    await page.locator(
      "data-testid=RepoDirectoryView >> data-testid=Topline >> css=[href^='https://github.com']"
    )
  ).toBeVisible();
});

test("renders breadcrumbs for directory view", async ({ page }) => {
  await page.goto(ROOT_ENTRY_URL + "/src/core/vdom", {
    waitUntil: "networkidle",
  });

  await expect(
    await page.locator(
      "data-testid=RepoDirectoryView >> data-testid=RepoBreadcrumbs"
    )
  ).toBeVisible();

  const breadcrumbsLocator = await page.locator("data-testid=RepoBreadcrumbs");

  const items = breadcrumbsLocator.locator("> *");
  await expect(await items.elementHandles()).toHaveLength(4);
  expect(await items.allTextContents()).toEqual(["/", "src", "core", "vdom"]);
});

test("renders breadcrumbs for file view", async ({ page }) => {
  await page.goto(ROOT_ENTRY_URL + "/src/core/vdom/create-element.ts", {
    waitUntil: "networkidle",
  });

  await expect(
    await page.locator(
      "data-testid=RepoDirectoryView >> data-testid=RepoBreadcrumbs"
    )
  ).toBeVisible();

  const breadcrumbsLocator = await page.locator("data-testid=RepoBreadcrumbs");

  const items = breadcrumbsLocator.locator("> *");
  await expect(await items.elementHandles()).toHaveLength(5);
  expect(await items.allTextContents()).toEqual([
    "/",
    "src",
    "core",
    "vdom",
    "create-element.ts",
  ]);
});

test("goes to root entry on breadcrumb first item click", async ({ page }) => {
  await page.goto(ROOT_ENTRY_URL + "/src/core/vdom", {
    waitUntil: "networkidle",
  });

  const breadcrumbsLocator = await page.locator("data-testid=RepoBreadcrumbs");

  const items = breadcrumbsLocator.locator("> *");

  await items.first().click();

  await waitForGraphqlResponse(page);

  await expect(await items.elementHandles()).toHaveLength(1);

  const resultSideEntryNames = await parseEntryNames(
    page,
    SIDE_REPO_ENTRIES_SELECTOR
  );
  const resultMainEntryNames = await parseEntryNames(
    page,
    MAIN_REPO_ENTRIES_SELECTOR
  );

  const expectedEntryNames = getTreeEntries("/").map((entry) => entry.name);

  expect(resultSideEntryNames).toEqual(resultMainEntryNames);
  expect(resultSideEntryNames).toEqual(expectedEntryNames);
  expect(resultMainEntryNames).toEqual(expectedEntryNames);
});
