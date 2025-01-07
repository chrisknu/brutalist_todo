/**
 * @param {puppeteer.Browser} browser
 * @param {{url: string, options: LHCI.CollectCommand.Options}} context
 */
module.exports = async (browser, context) => {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  // Navigate to the page
  await page.goto(context.url);

  // Wait for the page to be fully loaded
  await page.waitForSelector('body', { timeout: 10000 });

  // Ensure no JavaScript errors on the page
  page.on('pageerror', (error) => {
    console.error('Page error:', error.message);
  });

  // Ensure no failed requests
  page.on('requestfailed', (request) => {
    console.error('Request failed:', request.url());
  });

  // Close the page when done
  await page.close();
};
