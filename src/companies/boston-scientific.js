const searchUrl =
  'https://jobs.bostonscientific.com/search/?q=Engineer&locationsearch=MN'

const lastPageSelector = '.pagination li:nth-last-child(2)'
const jobDetailsSelector = '.jobdetail-phone'

module.exports = page => ({
  async gotoFirstPage() {
    await page.goto(`${searchUrl}&startrow=0`)
  },
  async getLastPageNumber() {
    return Number(await page.$eval(lastPageSelector, el => el.innerText))
  },
  async scrapeJobDetails() {
    return page.$$eval(jobDetailsSelector, jobDetails => {
      const cleanText = text => text.replace(/\\n/g, '').trim()

      return jobDetails.map(row => {
        const {href, innerText: rawTitle} = row.querySelector('.jobTitle-link')
        const {innerText: rawLocation} = row.querySelector('.jobLocation')

        const company = 'Boston Scientific'
        const title = cleanText(rawTitle)
        const location = cleanText(rawLocation)

        return {company, title, location, href}
      })
    })
  },
  async gotoNextPage(currentPageNumber) {
    await page.goto(`${searchUrl}&startrow=${currentPageNumber * 25}`)
  },
})
