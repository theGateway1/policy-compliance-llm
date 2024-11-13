const puppeteer = require("puppeteer");
const HttpStatus = require("http-status-codes");

/**
 * Internal function to scrape visible text from a web page using its URL
 * @param {String} url - URL of web page
 */
async function scrapeText(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Extract visible text
    const text = await page.evaluate(() => document.body.innerText);

    return text;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return null;
  } finally {
    await browser.close();
  }
}

/**
 * Route middleware to get visible text from a web page
 * @param {String} req.query.compliancePolicyURL - The compliance policy URL
 * @param {String} req.query.webPageURL - The web page URL
 */

exports.getWebPageData = async (req, res, next) => {
  const { compliancePolicyURL, webPageURL } = req.query;

  // Check if both URLs are provided
  if (!compliancePolicyURL) {
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
      error: "Please provide the compliance policy URL",
    });
  }

  if (!webPageURL) {
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
      error: "Please provide the web page URL",
    });
  }

  try {
    const [compliancePolicy, webPage] = await Promise.all([
      scrapeText(compliancePolicyURL),
      scrapeText(webPageURL),
    ]);

    req.compliancePolicy = compliancePolicy;
    req.webPage = webPage;

    next();
  } catch (error) {
    // Handle error in fetching URL
    return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: `Error fetching URLs: ${error.message}`,
    });
  }
};
