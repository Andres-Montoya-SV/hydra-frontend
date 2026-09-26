import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/browser",
  fullyParallel: false,
  use: {
    baseURL: "http://localhost:3100",
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
    },
  },
  webServer: [
    {
      command: "node tests/mock-backend.mjs",
      url: "http://127.0.0.1:4100",
      reuseExistingServer: false,
    },
    {
      command: "npm run start -- --port 3100 --hostname 127.0.0.1",
      url: "http://localhost:3100",
      reuseExistingServer: false,
      env: {
        HYDRA_API_URL: "http://127.0.0.1:4100",
        APP_ORIGIN: "http://localhost:3100",
        SESSION_SECRET: "test-secret-32-characters-long-no-production",
      },
    },
  ],
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1050 } } },
    {
      name: "mobile",
      use: { viewport: { width: 390, height: 844 }, isMobile: true },
    },
  ],
});
