const puppeteer = require('puppeteer')

module.exports = (() => {
  let browser
  let launching

  return async () => {
    let unlock

    // eslint-disable-next-line no-unused-expressions
    launching && launching.then && (await launching)

    // eslint-disable-next-line no-return-assign
    launching = new Promise(resolve => (unlock = resolve))

    if (!browser || !(await isBrowserAvailable(browser))) {
      browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        args: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          '-—disable-dev-tools',
        ],
        dumpio: true,
        devtools: false,
      })
      console.log(`Launch done: ${await browser.version()}`)
    }

    unlock()
    return browser
  }
})()

async function isBrowserAvailable(browser) {
  try {
    await browser.version()
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}
