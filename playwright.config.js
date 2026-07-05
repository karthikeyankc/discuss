import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './test/browser',
    use: {
        baseURL: 'http://127.0.0.1:9876',
        screenshot: 'only-on-failure',
    },
    webServer: {
        command: 'node test/browser-server.js',
        url: 'http://127.0.0.1:9876/health',
        reuseExistingServer: !process.env.CI,
        stdout: 'pipe',
        stderr: 'pipe',
    },
    projects: [
        { name: 'chromium', use: { browserName: 'chromium' } },
    ],
});
