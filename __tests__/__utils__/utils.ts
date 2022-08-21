import { Page } from "@playwright/test";

export const waitForGraphqlResponse = async (page: Page) => {
  return await Promise.all([
    page.waitForLoadState("networkidle"),
    page.waitForResponse((resp) => resp.url().includes("graphql")),
  ]);
};

export const parseEntryNames = async (
  page: Page,
  selector: string
): Promise<string[]> => {
  let locator = await page.locator(selector);
  let handles = await locator.elementHandles();

  let names = await Promise.all(handles.map((handle) => handle.innerText()));
  return names.filter((name) => name.trim() !== "..");
};
