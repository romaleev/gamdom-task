import { defineConfig } from '@playwright/test'

export default defineConfig({
	testDir: './common/e2e',
	timeout: 30000, // 60 seconds timeout
	fullyParallel: true,
	reporter: [['html', { outputFolder: 'playwright-report' }]],
	use: {
		headless: true, // Set to false to see the browser UI
		viewport: { width: 1280, height: 720 },
		actionTimeout: 10000,
		trace: 'on',
		video: 'on',
		screenshot: 'only-on-failure',
	},
	projects: [
		{
			name: 'local',
			outputDir: 'test-results/local',
			use: {
				baseURL: 'http://localhost:4200',
			},
		},
		{
			name: 'docker',
			outputDir: 'test-results/docker',
			use: {
				baseURL: 'http://localhost:4300',
			},
		},
	],
})
