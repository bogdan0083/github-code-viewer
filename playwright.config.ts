import type {PlaywrightTestConfig} from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./__tests__/e2e",
  retries: 3,
  webServer: {
    command: "NODE_ENV=test next dev -p 3005",
    url: "http://localhost:3005/",
    reuseExistingServer: !process.env.CI,
  },
  use: {
    headless: true,
    browserName: "firefox",
    baseURL: "http://localhost:3005",
    viewport: {width: 1280, height: 720},
    ignoreHTTPSErrors: true,
    video: "on-first-retry",
  },
};
export default config;
