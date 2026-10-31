import { defineConfig, devices } from "@playwright/test";

// E2E runs against the production build at a phone-sized viewport (375 px).
export default defineConfig({
  testDir: "tests/e2e",
  use: {
    baseURL: "http://localhost:3000",
    ...devices["Pixel 7"],
    viewport: { width: 375, height: 812 },
  },
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
