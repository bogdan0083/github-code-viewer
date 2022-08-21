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

  expect(resultSideEntryNames).toEqual(expectedSideEntryNames);
  expect(resultMainEntryNames).toEqual(expectedMainEntryNames);
});

test("shows 'back' folder button", async ({ page }) => {
  await page.goto(ROOT_ENTRY_URL + "/src/core", { waitUntil: "networkidle" });

  await expect(
    await page.locator("data-testid=RepoSideView >> text='..'")
  ).toBeVisible();
});

test("returns to  root after 'back' button click", async ({ page }) => {
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

test("renders README.md", async ({ page }) => {
  await page.goto(ROOT_ENTRY_URL_WITH_README, { waitUntil: "networkidle" });

  await expect(
    await page.locator("data-testid=RepoFileView >> css=.hljs-tag").first()
  ).toBeVisible();
});
