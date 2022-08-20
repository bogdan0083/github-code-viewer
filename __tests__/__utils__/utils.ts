import { Page } from "@playwright/test";

export const waitForGraphqlResponse = async (page: Page) => {
  return await Promise.all([
    page.waitForLoadState("networkidle"),
    page.waitForResponse((resp) => resp.url().includes("graphql")),
  ]);
};
