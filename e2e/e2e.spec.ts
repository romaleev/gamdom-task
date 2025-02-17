import { test, expect } from '@playwright/test'
import i18n from '#root/client/src/i18n'
import { API_URL } from '#root/client/src/api/eventApi' // Import i18next translation function

const { t } = i18n
const event_id = 1

test.describe('Betting Dashboard E2E', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:4200/')
	})

	test('should allow a user to place a bet successfully', async ({ page }) => {
		// Wait for event list to load
		await page.waitForSelector(`[data-test="event-${event_id}"]`) // ✅ Wait for first event by index

		// Click on the first odd (1st odd button of first event)
		await page.locator(`[data-test="event-odd-${event_id}-0"]`).click()

		// Verify bet selection in the BetSlip
		await expect(page.locator(`[data-test="event-name-${event_id}"]`)).toBeVisible()

		// Enter stake
		await page.locator(`[data-test="betslip-stake-amount"]`).fill('10')

		// Click "Place Bet" (translated)
		await page.locator(`[data-test="betslip-place-bet"]`).click()

		// Wait for loading spinner
		await expect(page.locator('[role="progressbar"]')).toBeVisible()
		await page.waitForTimeout(1000) // Simulate API delay

		// Verify success snackbar message (translated)
		await expect(page.locator(`[data-test="snackbar-message"]`)).toHaveText(t('betSlip.betSuccess'))

		// Ensure snackbar disappears after auto-hide duration
		await page.waitForTimeout(3500)
		await expect(page.locator(`text=${t('betSlip.betSuccess')}`)).not.toBeVisible()
	})

	test('should show an error for invalid stake', async ({ page }) => {
		// Click on the first odd (1st odd button of first event)
		await page.locator(`[data-test="event-odd-${event_id}-0"]`).click()

		// Click "Place Bet" without entering a stake
		await page.locator(`[data-test="betslip-place-bet"]`).click()

		// Ensure stake input is focused
		const stakeInput = page.locator(`[data-test="betslip-stake-amount"]`)
		await expect(stakeInput).toBeFocused()
	})

	test('should show an error snackbar when the /api/events endpoint fails', async ({ page }) => {
		// **🔹 Mock API Failure: Return 500 for /api/events**
		await page.route(`http://localhost:4200${API_URL}/`, async (route) => {
			await route.fulfill({
				status: 500,
				body: JSON.stringify({ error: 'Internal Server Error' }),
			})
		})

		await page.goto('http://localhost:4200/')

		// **🔹 Verify that the loading spinner disappears**
		await expect(page.locator('[role="progressbar"]')).not.toBeVisible()

		// **🔹 Verify the error snackbar message appears**
		await expect(page.locator(`[data-test="snackbar-message"]`)).toHaveText(
			t('eventList.loadError'),
		)

		// **🔹 Ensure the snackbar disappears after timeout**
		await page.waitForTimeout(3500)
		await expect(page.locator(`[data-test="snackbar-message"]`)).not.toBeVisible()
	})

	test('should keep the UI updated after a bet is placed', async ({ page }) => {
		// Click on the first odd (1st odd button of first event)
		await page.locator(`[data-test="event-odd-${event_id}-0"]`).click()

		await page.locator(`[data-test="betslip-stake-amount"]`).fill('20')

		// Click "Place Bet"
		await page.locator(`[data-test="betslip-place-bet"]`).click()

		// Wait for the snackbar to confirm bet placement
		await expect(page.locator(`[data-test="snackbar-message"]`)).toHaveText(t('betSlip.betSuccess'))

		// Click on the first odd (1st odd button of first event)
		await page.locator(`[data-test="event-odd-${event_id}-0"]`).click()

		// Verify bet slip is cleared
		await expect(page.locator(`text=${t('betSlip.select')}`)).toBeVisible()
	})
})
